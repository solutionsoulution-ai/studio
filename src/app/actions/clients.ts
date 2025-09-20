
'use server';

import { z } from 'zod';
import { type TransferFormInput, transferFormSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';
import { type ClientProfile, type Transaction } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import { google } from 'googleapis';
import { Readable } from 'stream';

// --- GOOGLE DRIVE API SETUP ---
const DRIVE_FILE_ID = process.env.GOOGLE_DRIVE_FILE_ID;

async function getDriveClient() {
    const credentials = {
        type: "service_account",
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
    }

    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/drive'],
    });

    const authClient = await auth.getClient();
    return google.drive({ version: 'v3', auth: authClient });
}


// --- DATABASE HELPER ---
async function readData(): Promise<{ profiles: ClientProfile[], transactions: Transaction[] }> {
    if (!DRIVE_FILE_ID) {
        throw new Error("Google Drive file ID is not configured.");
    }
    
    try {
        const drive = await getDriveClient();
        const response = await drive.files.get({
            fileId: DRIVE_FILE_ID,
            alt: 'media',
        });
        
        // Handle potential non-JSON or empty response data
        if (typeof response.data === 'string' && response.data.trim() !== '') {
             return JSON.parse(response.data);
        }
        
        // Return a default structure if the file is empty or data is not a string
        return { profiles: [], transactions: [] };
        
    } catch (error: any) {
        console.error("Error reading from Google Drive:", error.message);
        if (error.code === 404) {
            console.log("File not found, returning default empty structure.");
            return { profiles: [], transactions: [] };
        }
        throw new Error("Could not read data from Google Drive.");
    }
}

async function writeData(data: { profiles: ClientProfile[], transactions: Transaction[] }): Promise<void> {
    if (!DRIVE_FILE_ID) {
        throw new Error("Google Drive file ID is not configured.");
    }

    try {
        const drive = await getDriveClient();
        const fileContent = JSON.stringify(data, null, 2);
        const stream = new Readable();
        stream.push(fileContent);
        stream.push(null);

        await drive.files.update({
            fileId: DRIVE_FILE_ID,
            media: {
                mimeType: 'application/json',
                body: stream,
            },
        });
    } catch (error: any) {
        console.error("Error writing to Google Drive:", error);
        throw new Error("Could not write data to Google Drive.");
    }
}


// --- GENERAL HELPERS ---
const randomDigits = (length: number) => Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');

function generateIBAN(countryCode = 'FR') {
    const countryPart = '76';
    const bankCode = randomDigits(5);
    const branchCode = randomDigits(5);
    const accountNumber = randomDigits(11);
    const nationalCheckDigits = randomDigits(2);
    return `${countryCode}${countryPart}${bankCode}${branchCode}${accountNumber}${nationalCheckDigits}`;
}

function generateBIC() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetters = (length: number) => Array.from({ length }, () => letters.charAt(Math.floor(Math.random() * letters.length))).join('');
    return `${randomLetters(4)}FR${randomLetters(2)}XXX`;
}


// --- VALIDATION SCHEMAS ---
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});


// --- SERVER ACTIONS ---

export async function verifyClientLoginAction(credentials: z.infer<typeof loginSchema>): Promise<{ success: boolean; clientId?: string; error?: string }> {
  const parsed = loginSchema.safeParse(credentials);
  if (!parsed.success) {
    return { success: false, error: 'Données invalides.' };
  }

  const { profiles } = await readData();
  const client = profiles.find(p => p.email === parsed.data.email);

  if (!client || client.password !== parsed.data.password) {
    return { success: false, error: 'Email ou mot de passe incorrect.' };
  }
  
  return { success: true, clientId: client.id };
}


export async function getClientByIdAction(clientId: string): Promise<{ success: boolean; client?: Omit<ClientProfile, 'password'>; error?: string }> {
    if (!clientId) {
        return { success: false, error: "ID client non fourni." };
    }

    const data = await readData();
    const client = data.profiles.find(p => p.id === clientId);

    if (!client) {
        return { success: false, error: "Client non trouvé." };
    }

    const clientTransactions = data.transactions.filter(tx => tx.profile_id === clientId);
    
    const now = new Date();
    let dataWasModified = false;

    const updatedTransactions = clientTransactions.map(tx => {
        if (tx.status === 'PENDING' && tx.estimatedCompletionDate) {
            const completionDate = new Date(tx.estimatedCompletionDate);
            if (now >= completionDate) {
                dataWasModified = true;
                if (client.is_transfer_blocked) {
                    tx.status = 'FAILED';
                } else {
                     if (client.balance >= Math.abs(tx.amount)) {
                        client.balance += tx.amount;
                        tx.status = 'COMPLETED';
                    } else {
                        tx.status = 'FAILED';
                    }
                }
            }
        }
        return tx;
    });

    if (dataWasModified) {
        await writeData(data);
    }
    
    const { password, ...clientWithoutPassword } = client;
    clientWithoutPassword.transactions = updatedTransactions;
    
    return { success: true, client: clientWithoutPassword };
}

export async function createTransferAction(transferDetails: TransferFormInput & { clientId: string }): Promise<{ success: boolean; error?: string }> {
    const data = await readData();
    const clientIndex = data.profiles.findIndex(p => p.id === transferDetails.clientId);

    if (clientIndex === -1) {
        return { success: false, error: "Client non trouvé." };
    }
    
    const client = data.profiles[clientIndex];
    
    const parsed = transferFormSchema.safeParse(transferDetails);
    if (!parsed.success) {
        return { success: false, error: 'Données de virement invalides.' };
    }

    if (client.is_transfer_blocked) {
        return { success: false, error: `Les virements sont bloqués pour ce compte: ${client.transfer_block_reason}` };
    }

    if (client.balance < parsed.data.amount) {
        return { success: false, error: "Solde insuffisant pour initier ce virement." };
    }

    const creationDate = new Date();
    const processingTime = client.transfer_processing_time || { minutes: 1 };
    const completionDate = new Date(creationDate);
    
    if (processingTime.days) completionDate.setDate(completionDate.getDate() + processingTime.days);
    if (processingTime.hours) completionDate.setHours(completionDate.getHours() + processingTime.hours);
    if (processingTime.minutes) completionDate.setMinutes(completionDate.getMinutes() + processingTime.minutes);

    const newTransaction: Transaction = {
        id: uuidv4(),
        profile_id: transferDetails.clientId,
        amount: -parsed.data.amount,
        reason: parsed.data.reason,
        recipient_iban: parsed.data.recipientIban,
        recipient_name: parsed.data.recipientName,
        recipient_bank_name: parsed.data.recipientBankName,
        recipient_bic: parsed.data.recipientBic,
        created_at: creationDate.toISOString(),
        status: 'PENDING',
        estimatedCompletionDate: completionDate.toISOString(),
    };

    data.transactions.push(newTransaction);
    await writeData(data);

    revalidatePath('/dashboard');
    return { success: true };
}

export async function verifyAdminLoginAction(password: string): Promise<{ success: boolean; error?: string }> {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
        console.error("Le mot de passe administrateur n'est pas configuré dans les variables d'environnement.");
        return { success: false, error: "Le serveur n'est pas correctement configuré." };
    }
    if (password === adminPassword) {
        return { success: true };
    }
    return { success: false, error: "Mot de passe incorrect." };
}

export async function getClientsAction(): Promise<{ success: boolean; clients?: Omit<ClientProfile, 'password'>[]; error?: string }> {
    try {
        const data = await readData();
        const clientsWithTransactions = (data.profiles || []).map(p => {
            const { password, ...client } = p;
            client.transactions = (data.transactions || []).filter(tx => tx.profile_id === client.id);
            return client;
        });

        return { success: true, clients: clientsWithTransactions };
    } catch (error: any) {
        return { success: false, error: "Erreur de lecture: " + error.message };
    }
}

export async function deleteClientAction(clientId: string): Promise<{ success: boolean; error?: string }> {
    if (!clientId) {
        return { success: false, error: "ID client non fourni." };
    }
    
    try {
        const data = await readData();
        data.profiles = data.profiles.filter(p => p.id !== clientId);
        data.transactions = data.transactions.filter(tx => tx.profile_id !== clientId);
        await writeData(data);
    } catch(error: any) {
         return { success: false, error: "Erreur de suppression: " + error.message };
    }

    revalidatePath('/admin');
    revalidatePath('/admin/soumissions');
    return { success: true };
}

const createClientSchema = z.object({
    email: z.string().email("L'adresse e-mail est invalide."),
    password: z.string().min(8, "Le mot de passe doit comporter au moins 8 caractères."),
    initialBalance: z.coerce.number().min(0, "Le solde initial ne peut pas être négatif."),
}).passthrough();

export async function createClientAction(clientData: any): Promise<{ success: boolean; clientId?: string; error?: string }> {
    const parsed = createClientSchema.safeParse(clientData);
    if (!parsed.success) {
        const issues = parsed.error.issues.map(i => i.message).join(', ');
        return { success: false, error: `Données invalides: ${issues}` };
    }

    const data = await readData();
    if (!data.profiles) data.profiles = [];
    if (!data.transactions) data.transactions = [];

    const existingClient = data.profiles.find(p => p.email === parsed.data.email);

    if (existingClient) {
        return { success: false, error: "Un client avec cet e-mail existe déjà." };
    }
    
    const newClientId = uuidv4();
    const newClient: ClientProfile = {
        id: newClientId,
        client_id: `VYL-${randomDigits(3)}-${randomDigits(3)}`,
        email: parsed.data.email,
        password: parsed.data.password,
        balance: parsed.data.initialBalance,
        account_number: generateIBAN(),
        iban: generateIBAN(),
        bic: generateBIC(),
        is_transfer_blocked: false,
        transfer_block_reason: null,
        transfer_processing_time: { minutes: 1 },
        has_loan: clientData.has_loan || false,
        loan_type: clientData.loan_type || null,
        loan_amount: clientData.loan_amount || null,
        interest_rate: null,
        loan_term: clientData.loan_term || null,
        first_name: clientData.first_name || '',
        last_name: clientData.last_name || '',
        phone: clientData.phone || '',
        address: clientData.address || '',
        city: clientData.city || '',
        postal_code: clientData.postal_code || '',
        country: clientData.country || '',
        marital_status: clientData.marital_status || '',
        number_of_children: clientData.number_of_children || 0,
        birth_date: clientData.birth_date || '',
        occupation: clientData.occupation || '',
        monthly_income: clientData.monthly_income || 0,
        monthly_expenses: clientData.monthly_expenses || 0,
        identity_document_url: clientData.identity_document_url || '',
        proof_of_address_url: clientData.proof_of_address_url || '',
        proof_of_income_url: clientData.proof_of_income_url || '',
        created_at: new Date().toISOString(),
    };
    
    data.profiles.push(newClient);

    const transactionsToInsert: any[] = [];
    if (newClient.balance > 0) {
        transactionsToInsert.push({
             id: uuidv4(),
             profile_id: newClientId,
             amount: newClient.balance,
             reason: "Dépôt initial",
             status: 'COMPLETED' as const,
             created_at: new Date().toISOString(),
             recipient_iban: null,
             recipient_name: null
        });
    }
    if (clientData.loan_type) {
         transactionsToInsert.push({
             id: uuidv4(),
             profile_id: newClientId,
             amount: 0,
             reason: "Demande de Prêt",
             status: 'COMPLETED' as const,
             created_at: new Date().toISOString(),
             recipient_iban: null,
             recipient_name: null
        });
    } else if (clientData.contactMessage) {
         transactionsToInsert.push({
             id: uuidv4(),
             profile_id: newClientId,
             amount: 0,
             reason: `Message de Contact: ${clientData.contactMessage}`,
             status: 'COMPLETED' as const,
             created_at: new Date().toISOString(),
             recipient_iban: null,
             recipient_name: null
        });
    }
    
    data.transactions.push(...transactionsToInsert);
    await writeData(data);
    
    revalidatePath('/admin');
    return { success: true, clientId: newClientId };
}

const adjustBalanceSchema = z.object({
  clientId: z.string(),
  amount: z.coerce.number().refine(val => val !== 0, "Le montant ne peut pas être zéro."),
  reason: z.string().min(3, "Le motif est requis (min 3 caractères)."),
  type: z.enum(['credit', 'debit']),
});

export async function adjustClientBalanceAction(adjustmentData: z.infer<typeof adjustBalanceSchema>): Promise<{ success: boolean; error?: string }> {
    const parsed = adjustBalanceSchema.safeParse(adjustmentData);
    if (!parsed.success) {
        return { success: false, error: 'Données invalides' };
    }

    const { clientId, amount, reason, type } = parsed.data;
    const data = await readData();
    const clientIndex = data.profiles.findIndex(p => p.id === clientId);

    if (clientIndex === -1) {
        return { success: false, error: 'Client non trouvé' };
    }

    const client = data.profiles[clientIndex];
    const transactionAmount = type === 'credit' ? Math.abs(amount) : -Math.abs(amount);

    if (type === 'debit' && client.balance < Math.abs(amount)) {
        return { success: false, error: "Solde insuffisant pour ce débit." };
    }
    
    client.balance += transactionAmount;
    
    data.transactions.push({
        id: uuidv4(),
        profile_id: clientId,
        amount: transactionAmount,
        reason: reason,
        recipient_name: "Opération Manuelle Admin",
        status: 'COMPLETED' as const,
        created_at: new Date().toISOString(),
        recipient_iban: null,
    });

    await writeData(data);
    revalidatePath('/admin');
    revalidatePath('/dashboard');
    return { success: true };
}

const blockSettingsSchema = z.object({
  clientId: z.string(),
  is_transfer_blocked: z.boolean(),
  transfer_block_reason: z.string().nullable(),
});

export async function updateClientBlockSettingsAction(settingsData: z.infer<typeof blockSettingsSchema>): Promise<{ success: boolean; error?: string }> {
    const parsed = blockSettingsSchema.safeParse(settingsData);
    if (!parsed.success) return { success: false, error: 'Données invalides' };
    
    const { clientId, is_transfer_blocked, transfer_block_reason } = parsed.data;
    const data = await readData();
    const client = data.profiles.find(p => p.id === clientId);
    
    if (client) {
        client.is_transfer_blocked = is_transfer_blocked;
        client.transfer_block_reason = is_transfer_blocked ? transfer_block_reason : null;
        await writeData(data);
    } else {
        return { success: false, error: "Client non trouvé." };
    }

    revalidatePath('/admin');
    revalidatePath('/dashboard');
    return { success: true };
}

const transferSettingsSchema = z.object({
  clientId: z.string(),
  duration: z.coerce.number().min(0),
  unit: z.enum(['minutes', 'hours', 'days']),
});

export async function updateClientTransferSettingsAction(settingsData: z.infer<typeof transferSettingsSchema>): Promise<{ success: boolean; error?: string }> {
    const parsed = transferSettingsSchema.safeParse(settingsData);
    if (!parsed.success) return { success: false, error: 'Données invalides' };
    
    const { clientId, duration, unit } = parsed.data;
    
    const processingTime = {
        days: unit === 'days' ? duration : 0,
        hours: unit === 'hours' ? duration : 0,
        minutes: unit === 'minutes' ? duration : 0,
    };
    
    const data = await readData();
    const client = data.profiles.find(p => p.id === clientId);
    
    if(client) {
        client.transfer_processing_time = processingTime;
        await writeData(data);
    } else {
         return { success: false, error: "Client non trouvé." };
    }

    revalidatePath('/admin');
    revalidatePath('/dashboard');
    return { success: true };
}
