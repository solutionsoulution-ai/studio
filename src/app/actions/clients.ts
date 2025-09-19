

'use server';

import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';
import { type TransferFormInput, transferFormSchema } from '@/lib/schemas';


const dataFilePath = path.join(process.cwd(), 'src', 'data', 'clients.json');

// Types (non-exportés)
interface Transaction {
    id: string;
    profile_id: string;
    amount: number;
    reason: string;
    recipient_iban: string | null;
    recipient_name: string | null;
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
    transactions: Transaction[];
}

// Helpers
async function readData(): Promise<ClientProfile[]> {
  try {
    const jsonData = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error reading data file:", error);
    return [];
  }
}

async function writeData(data: ClientProfile[]): Promise<void> {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error("Error writing data file:", error);
  }
}

const randomDigits = (length: number) => Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');

function generateIBAN(countryCode = 'FR') {
    // Ceci est une simplification et ne produit pas d'IBAN valides selon la norme.
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


// Validation Schemas
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Server Actions

/**
 * Verifies client login credentials.
 * @returns { success: boolean; clientId?: string; error?: string }
 */
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

  // NOTE: In a real app, passwords should be hashed.
  // This is a simplified check for the prototype.
  if (client.password !== parsed.data.password) {
    return { success: false, error: 'Email ou mot de passe incorrect.' };
  }

  return { success: true, clientId: client.id };
}


/**
 * Fetches a client's profile and processes pending transactions.
 * @param clientId - The ID of the client to fetch.
 * @returns { success: boolean; client?: ClientProfile; error?: string }
 */
export async function getClientByIdAction(clientId: string): Promise<{ success: boolean; client?: Omit<ClientProfile, 'password'>; error?: string }> {
    if (!clientId) {
        return { success: false, error: "ID client non fourni." };
    }

    let clients = await readData();
    let client = clients.find(c => c.id === clientId);

    if (!client) {
        return { success: false, error: "Client non trouvé." };
    }

    let dataWasModified = false;

    // Simulate time passing to process PENDING transactions
    client.transactions.forEach(tx => {
        if (tx.status === 'PENDING') {
            const completionDate = tx.estimatedCompletionDate ? new Date(tx.estimatedCompletionDate) : new Date();
            const now = new Date();

            if (now >= completionDate) {
                // If account is blocked, fail the transaction. Otherwise, complete it and debit the balance.
                if (client.is_transfer_blocked) {
                    tx.status = 'FAILED';
                    tx.reason = `[Échec] ${tx.reason} - ${client.transfer_block_reason || 'Compte bloqué'}`
                } else {
                    // Check balance before completing
                    if (client.balance >= Math.abs(tx.amount)) {
                        client.balance += tx.amount; // tx.amount is negative for a debit
                        tx.status = 'COMPLETED';
                    } else {
                        tx.status = 'FAILED';
                        tx.reason = `[Échec] ${tx.reason} - Solde insuffisant au moment du traitement`;
                    }
                }
                dataWasModified = true;
            }
        }
    });

    if (dataWasModified) {
        const clientIndex = clients.findIndex(c => c.id === clientId);
        if (clientIndex !== -1) {
            clients[clientIndex] = client;
            await writeData(clients);
        }
    }
    
    // Omit password from the returned client object
    const { password, ...clientWithoutPassword } = client;

    return { success: true, client: clientWithoutPassword };
}

/**
 * Creates a new transfer transaction.
 * @param transferDetails - The details of the transfer.
 * @returns { success: boolean; error?: string }
 */
export async function createTransferAction(transferDetails: TransferFormInput & { clientId: string }): Promise<{ success: boolean; error?: string }> {
    const clients = await readData();
    const clientIndex = clients.findIndex(c => c.id === transferDetails.clientId);

    if (clientIndex === -1) {
        return { success: false, error: "Client non trouvé." };
    }
    
    const parsed = transferFormSchema.safeParse(transferDetails);
    if (!parsed.success) {
        return { success: false, error: 'Données de virement invalides.' };
    }

    const client = clients[clientIndex];

    if (client.balance < parsed.data.amount) {
        return { success: false, error: "Solde insuffisant pour initier ce virement." };
    }

    const creationDate = new Date();
    const processingTime = client.transfer_processing_time || { minutes: 1 };
    const completionDate = new Date(creationDate);
    
    completionDate.setDate(completionDate.getDate() + (processingTime.days || 0));
    completionDate.setHours(completionDate.getHours() + (processingTime.hours || 0));
    completionDate.setMinutes(completionDate.getMinutes() + (processingTime.minutes || 0));
    
    // Create new transaction without debiting balance immediately
    const newTransaction: Transaction = {
        id: `txn_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        profile_id: client.id,
        amount: -parsed.data.amount,
        reason: parsed.data.reason,
        recipient_iban: parsed.data.recipientIban,
        recipient_name: parsed.data.recipientName,
        created_at: creationDate.toISOString(),
        status: 'PENDING',
        estimatedCompletionDate: completionDate.toISOString(),
    };

    client.transactions.push(newTransaction);
    clients[clientIndex] = client;
    await writeData(clients);

    return { success: true };
}


// --- Admin Actions ---

const ADMIN_PASSWORD = "XtZ_7@pQn!fS8#mV"; // Hardcoded for prototype

/**
 * Verifies the admin password.
 * @param password - The password to verify.
 * @returns { success: boolean; error?: string }
 */
export async function verifyAdminLoginAction(password: string): Promise<{ success: boolean; error?: string }> {
    if (password === ADMIN_PASSWORD) {
        return { success: true };
    }
    return { success: false, error: "Mot de passe incorrect." };
}

/**
 * Fetches all client profiles for the admin dashboard.
 * @returns { success: boolean; clients?: ClientProfile[]; error?: string }
 */
export async function getClientsAction(): Promise<{ success: boolean; clients?: Omit<ClientProfile, 'password'>[]; error?: string }> {
    try {
        const clients = await readData();
        // Remove password from the returned objects
        const clientsWithoutPasswords = clients.map(c => {
            const { password, ...rest } = c;
            return rest;
        });
        return { success: true, clients: clientsWithoutPasswords };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}


/**
 * Deletes a client profile.
 * @param clientId - The ID of the client to delete.
 * @returns { success: boolean; error?: string }
 */
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
    return { success: true };
}


const createClientSchema = z.object({
    email: z.string().email("L'adresse e-mail est invalide."),
    password: z.string().min(8, "Le mot de passe doit comporter au moins 8 caractères."),
    initialBalance: z.coerce.number().min(0, "Le solde initial ne peut pas être négatif."),
});

/**
 * Creates a new client.
 * @param clientData - The new client's data.
 * @returns { success: boolean; error?: string }
 */
export async function createClientAction(clientData: z.infer<typeof createClientSchema>): Promise<{ success: boolean; error?: string }> {
    const parsed = createClientSchema.safeParse(clientData);
    if (!parsed.success) {
        const issues = parsed.error.issues.map(i => i.message).join(', ');
        return { success: false, error: `Données invalides: ${issues}` };
    }

    const clients = await readData();

    // Check if email already exists
    if (clients.some(c => c.email === parsed.data.email)) {
        return { success: false, error: "Un client avec cet e-mail existe déjà." };
    }

    const newClient: ClientProfile = {
        id: `cly_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        client_id: `VYL-${randomDigits(3)}-${randomDigits(3)}`,
        email: parsed.data.email,
        password: parsed.data.password,
        balance: parsed.data.initialBalance,
        account_number: generateIBAN(),
        iban: generateIBAN(),
        bic: generateBIC(),
        created_at: new Date().toISOString(),
        is_transfer_blocked: false,
        transfer_block_reason: null,
        transfer_processing_time: { minutes: 1 },
        has_loan: false,
        loan_type: null,
        loan_amount: null,
        interest_rate: null,
        loan_term: null,
        transactions: [],
    };
    
    if(newClient.balance > 0) {
        const initialTransaction: Transaction = {
             id: `txn_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
             profile_id: newClient.id,
             amount: newClient.balance,
             reason: "Dépôt initial",
             recipient_iban: null,
             recipient_name: null,
             created_at: new Date().toISOString(),
             status: 'COMPLETED',
        };
        newClient.transactions.push(initialTransaction);
    }

    clients.push(newClient);
    await writeData(clients);

    return { success: true };
}


const adjustBalanceSchema = z.object({
  clientId: z.string(),
  amount: z.coerce.number().refine(val => val !== 0, "Le montant ne peut pas être zéro."),
  reason: z.string().min(3, "Le motif est requis (min 3 caractères)."),
  type: z.enum(['credit', 'debit']),
});

/**
 * Adjusts a client's balance (credit or debit).
 * @param adjustmentData - The adjustment details.
 * @returns { success: boolean; error?: string }
 */
export async function adjustClientBalanceAction(adjustmentData: z.infer<typeof adjustBalanceSchema>): Promise<{ success: boolean; error?: string }> {
    const parsed = adjustBalanceSchema.safeParse(adjustmentData);
    if (!parsed.success) {
        const issues = parsed.error.issues.map(i => i.message).join(', ');
        return { success: false, error: `Données invalides: ${issues}` };
    }

    const { clientId, amount, reason, type } = parsed.data;

    const clients = await readData();
    const clientIndex = clients.findIndex(c => c.id === clientId);

    if (clientIndex === -1) {
        return { success: false, error: "Client non trouvé." };
    }

    const client = clients[clientIndex];
    const transactionAmount = type === 'credit' ? Math.abs(amount) : -Math.abs(amount);

    // Check for sufficient funds on debit
    if (type === 'debit' && client.balance < Math.abs(amount)) {
        return { success: false, error: "Solde insuffisant pour ce débit." };
    }
    
    // Update balance
    client.balance += transactionAmount;
    
    // Create new transaction
    const newTransaction: Transaction = {
        id: `txn_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        profile_id: client.id,
        amount: transactionAmount,
        reason: reason,
        recipient_iban: null,
        recipient_name: "Opération Manuelle Admin",
        created_at: new Date().toISOString(),
        status: 'COMPLETED',
    };

    client.transactions.push(newTransaction);
    clients[clientIndex] = client;
    await writeData(clients);

    return { success: true };
}


const blockSettingsSchema = z.object({
  clientId: z.string(),
  is_transfer_blocked: z.boolean(),
  transfer_block_reason: z.string().nullable(),
});

/**
 * Updates a client's transfer block settings.
 * @param settingsData - The new block settings.
 * @returns { success: boolean; error?: string }
 */
export async function updateClientBlockSettingsAction(settingsData: z.infer<typeof blockSettingsSchema>): Promise<{ success: boolean; error?: string }> {
    const parsed = blockSettingsSchema.safeParse(settingsData);
    if (!parsed.success) {
        const issues = parsed.error.issues.map(i => i.message).join(', ');
        return { success: false, error: `Données invalides: ${issues}` };
    }
    
    const { clientId, is_transfer_blocked, transfer_block_reason } = parsed.data;

    let clients = await readData();
    const clientIndex = clients.findIndex(c => c.id === clientId);

    if (clientIndex === -1) {
        return { success: false, error: "Client non trouvé." };
    }
    
    clients[clientIndex].is_transfer_blocked = is_transfer_blocked;
    clients[clientIndex].transfer_block_reason = is_transfer_blocked ? transfer_block_reason : null;

    await writeData(clients);
    return { success: true };
}


const transferSettingsSchema = z.object({
  clientId: z.string(),
  duration: z.coerce.number().min(0),
  unit: z.enum(['minutes', 'hours', 'days']),
});

/**
 * Updates a client's transfer processing time.
 * @param settingsData - The new transfer processing time settings.
 * @returns { success: boolean; error?: string }
 */
export async function updateClientTransferSettingsAction(settingsData: z.infer<typeof transferSettingsSchema>): Promise<{ success: boolean; error?: string }> {
    const parsed = transferSettingsSchema.safeParse(settingsData);
    if (!parsed.success) {
        const issues = parsed.error.issues.map(i => i.message).join(', ');
        return { success: false, error: `Données invalides: ${issues}` };
    }
    
    const { clientId, duration, unit } = parsed.data;

    let clients = await readData();
    const clientIndex = clients.findIndex(c => c.id === clientId);

    if (clientIndex === -1) {
        return { success: false, error: "Client non trouvé." };
    }

    const newProcessingTime = {
        days: unit === 'days' ? duration : 0,
        hours: unit === 'hours' ? duration : 0,
        minutes: unit === 'minutes' ? duration : 0,
    };
    
    clients[clientIndex].transfer_processing_time = newProcessingTime;

    await writeData(clients);
    return { success: true };
}
