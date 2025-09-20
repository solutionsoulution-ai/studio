
'use server';

import { z } from 'zod';
import { type TransferFormInput, transferFormSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';
import { promises as fs } from 'fs';
import path from 'path';

// --- TYPES ---
export interface Transaction {
    id: string;
    profile_id: string;
    amount: number;
    reason: string;
    recipient_iban: string | null;
    recipient_name: string | null;
    recipient_bic?: string | null;
    recipient_bank_name?: string | null;
    created_at: string;
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
    estimatedCompletionDate?: string;
}

export interface ClientProfile {
    id: string;
    client_id: string;
    email: string;
    password?: string;
    balance: number;
    account_number: string;
    iban: string;
    bic: string;
    created_at: string;
    is_transfer_blocked: boolean;
    transfer_block_reason: string | null;
    transfer_processing_time: {
        days?: number;
        hours?: number;
        minutes?: number;
    };
    has_loan: boolean;
    loan_type: string | null;
    loan_amount: number | null;
    interest_rate: number | null;
    loan_term: number | null;
    transactions?: Transaction[];
    first_name?: string;
    last_name?: string;
    phone?: string;
    address?: string;
    city?: string;
    postal_code?: string;
    country?: string;
    marital_status?: string;
    number_of_children?: number;
    birth_date?: string;
    occupation?: string;
    monthly_income?: number;
    monthly_expenses?: number;
    identity_document_url?: string;
    proof_of_address_url?: string;
    proof_of_income_url?: string;
}

// --- DATABASE HELPERS (JSON file) ---

const dataFilePath = path.join(process.cwd(), 'src/data/clients.json');

async function readData(): Promise<ClientProfile[]> {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Could not read data file, returning empty array.", error);
    return [];
  }
}

async function writeData(data: ClientProfile[]): Promise<void> {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error("Could not write to data file. The environment is likely read-only.", error);
    // This will fail in a deployed environment.
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

  const clients = await readData();
  const client = clients.find(c => c.email === parsed.data.email);

  if (!client) {
    return { success: false, error: 'Email ou mot de passe incorrect.' };
  }

  // NOTE: This is plain text password comparison. In a real app, use a library like bcrypt.
  if (client.password !== parsed.data.password) {
    return { success: false, error: 'Email ou mot de passe incorrect.' };
  }

  return { success: true, clientId: client.id };
}

export async function getClientByIdAction(clientId: string): Promise<{ success: boolean; client?: Omit<ClientProfile, 'password'>; error?: string }> {
    if (!clientId) {
        return { success: false, error: "ID client non fourni." };
    }

    const clients = await readData();
    let client = clients.find(c => c.id === clientId);
    
    if (!client) {
        return { success: false, error: "Client non trouvé." };
    }

    let dataWasModified = false;
    const now = new Date();
    let newBalance = client.balance;

    const updatedTransactions = (client.transactions || []).map(tx => {
        if (tx.status === 'PENDING') {
            const completionDate = new Date(tx.estimatedCompletionDate!);
            if (now >= completionDate) {
                dataWasModified = true;
                if (client!.is_transfer_blocked) {
                    tx.status = 'FAILED';
                    tx.reason = `[Échec] ${tx.reason} - ${client!.transfer_block_reason || 'Compte bloqué'}`;
                } else {
                     if (newBalance >= Math.abs(tx.amount)) {
                        newBalance += tx.amount;
                        tx.status = 'COMPLETED';
                    } else {
                        tx.status = 'FAILED';
                        tx.reason = `[Échec] ${tx.reason} - Solde insuffisant`;
                    }
                }
            }
        }
        return tx;
    });

    if (dataWasModified) {
        client.balance = newBalance;
        client.transactions = updatedTransactions;
        const clientIndex = clients.findIndex(c => c.id === clientId);
        if (clientIndex !== -1) {
            clients[clientIndex] = client;
            await writeData(clients);
        }
    }
    
    const { password, ...clientWithoutPassword } = client;
    return { success: true, client: { ...clientWithoutPassword, transactions: updatedTransactions } };
}

export async function createTransferAction(transferDetails: TransferFormInput & { clientId: string }): Promise<{ success: boolean; error?: string }> {
    const clients = await readData();
    const clientIndex = clients.findIndex(c => c.id === transferDetails.clientId);
    const client = clients[clientIndex];
    
    if (!client) {
        return { success: false, error: "Client non trouvé." };
    }
    
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
    
    completionDate.setDate(completionDate.getDate() + (processingTime.days || 0));
    completionDate.setHours(completionDate.getHours() + (processingTime.hours || 0));
    completionDate.setMinutes(completionDate.getMinutes() + (processingTime.minutes || 0));
    
    const newTransaction: Transaction = {
        id: `txn_${Date.now()}`,
        profile_id: client.id,
        amount: -parsed.data.amount,
        reason: parsed.data.reason,
        recipient_iban: parsed.data.recipientIban,
        recipient_name: parsed.data.recipientName,
        recipient_bank_name: parsed.data.recipientBankName,
        recipient_bic: parsed.data.recipientBic,
        created_at: creationDate.toISOString(),
        status: 'PENDING' as const,
        estimatedCompletionDate: completionDate.toISOString(),
    };

    if (!client.transactions) {
        client.transactions = [];
    }
    client.transactions.push(newTransaction);
    
    clients[clientIndex] = client;
    await writeData(clients);

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
    const data = await readData();
    const clientsWithoutPasswords = data.map(c => {
        const { password, ...client } = c;
        return client;
    });
    return { success: true, clients: clientsWithoutPasswords.sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) };
}

export async function deleteClientAction(clientId: string): Promise<{ success: boolean; error?: string }> {
    if (!clientId) {
        return { success: false, error: "ID client non fourni." };
    }
    
    let clients = await readData();
    const updatedClients = clients.filter(c => c.id !== clientId);

    if (clients.length === updatedClients.length) {
         return { success: false, error: "Client non trouvé." };
    }

    await writeData(updatedClients);

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

    const clients = await readData();
    const existingClient = clients.find(c => c.email === parsed.data.email);

    if (existingClient) {
        return { success: false, error: "Un client avec cet e-mail existe déjà." };
    }
    
    const newClientId = `cly_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    const newClientData: ClientProfile = {
        id: newClientId,
        client_id: `VYL-${randomDigits(3)}-${randomDigits(3)}`,
        email: parsed.data.email,
        password: parsed.data.password, // Plain text, should be hashed
        balance: parsed.data.initialBalance,
        account_number: generateIBAN(),
        iban: generateIBAN(),
        bic: generateBIC(),
        created_at: new Date().toISOString(),
        is_transfer_blocked: false,
        transfer_block_reason: null,
        transfer_processing_time: { minutes: 1 },
        has_loan: clientData.has_loan || false,
        loan_type: clientData.loan_type || null,
        loan_amount: clientData.loan_amount || null,
        interest_rate: null,
        loan_term: clientData.loan_term || null,
        first_name: clientData.first_name,
        last_name: clientData.last_name,
        phone: clientData.phone,
        address: clientData.address,
        city: clientData.city,
        postal_code: clientData.postal_code,
        country: clientData.country,
        marital_status: clientData.marital_status,
        number_of_children: clientData.number_of_children,
        birth_date: clientData.birth_date,
        occupation: clientData.occupation,
        monthly_income: clientData.monthly_income,
        monthly_expenses: clientData.monthly_expenses,
        identity_document_url: clientData.identity_document_url,
        proof_of_address_url: clientData.proof_of_address_url,
        proof_of_income_url: clientData.proof_of_income_url,
        transactions: []
    };
    
    const transactionsToInsert: Transaction[] = [];
    if (newClientData.balance > 0) {
        transactionsToInsert.push({
             id: `txn_${Date.now()}_init`,
             profile_id: newClientId,
             amount: newClientData.balance,
             reason: "Dépôt initial",
             status: 'COMPLETED' as const,
             created_at: new Date().toISOString(),
             recipient_iban: null,
             recipient_name: null
        });
    }
    if (clientData.loan_type) {
         transactionsToInsert.push({
             id: `txn_${Date.now()}_loan`,
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
             id: `txn_${Date.now()}_contact`,
             profile_id: newClientId,
             amount: 0,
             reason: `Message de Contact: ${clientData.contactMessage}`,
             status: 'COMPLETED' as const,
             created_at: new Date().toISOString(),
             recipient_iban: null,
             recipient_name: null
        });
    }
    
    newClientData.transactions = transactionsToInsert;
    clients.push(newClientData);
    await writeData(clients);

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
    const clients = await readData();
    const clientIndex = clients.findIndex(c => c.id === clientId);
    const client = clients[clientIndex];
    
    if (!client) return { success: false, error: 'Client non trouvé' };

    const transactionAmount = type === 'credit' ? Math.abs(amount) : -Math.abs(amount);

    if (type === 'debit' && client.balance < Math.abs(amount)) {
        return { success: false, error: "Solde insuffisant pour ce débit." };
    }
    
    client.balance += transactionAmount;
    
    const newTransaction: Transaction = {
        id: `txn_${Date.now()}_admin`,
        profile_id: clientId,
        amount: transactionAmount,
        reason: reason,
        recipient_name: "Opération Manuelle Admin",
        status: 'COMPLETED' as const,
        created_at: new Date().toISOString(),
        recipient_iban: null
    };

    if (!client.transactions) {
        client.transactions = [];
    }
    client.transactions.push(newTransaction);
    
    clients[clientIndex] = client;
    await writeData(clients);

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
    
    const clients = await readData();
    const clientIndex = clients.findIndex(c => c.id === clientId);
    const client = clients[clientIndex];
    if (!client) return { success: false, error: 'Client non trouvé' };

    client.is_transfer_blocked = is_transfer_blocked;
    client.transfer_block_reason = is_transfer_blocked ? transfer_block_reason : null;

    clients[clientIndex] = client;
    await writeData(clients);

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

    const clients = await readData();
    const clientIndex = clients.findIndex(c => c.id === clientId);
    const client = clients[clientIndex];
    if (!client) return { success: false, error: 'Client non trouvé' };
    
    client.transfer_processing_time = {
        days: unit === 'days' ? duration : 0,
        hours: unit === 'hours' ? duration : 0,
        minutes: unit === 'minutes' ? duration : 0,
    };
    
    clients[clientIndex] = client;
    await writeData(clients);

    revalidatePath('/admin');
    revalidatePath('/dashboard');
    return { success: true };
}
