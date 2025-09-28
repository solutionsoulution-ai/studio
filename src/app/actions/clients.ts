
'use server';

import 'dotenv/config'; // Load environment variables
import { z } from 'zod';
import { type TransferFormInput, transferFormSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';
import { type ClientProfile, type Transaction, type UserRole } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

// --- MOCK DATABASE ---
const adminPassword = process.env.ADMIN_PASSWORD || 'adminpassword';
let mockProfiles: ClientProfile[] = [
    {
        id: 'admin-user',
        client_id: 'VYL-ADM-001',
        email: 'admin@vylsfond.com',
        password: adminPassword,
        balance: 0,
        account_number: 'ADMIN-ACCOUNT',
        iban: 'FR0000000000000000000000000',
        bic: 'VYLSFRADMIN',
        created_at: new Date().toISOString(),
        is_transfer_blocked: false,
        transfer_block_reason: null,
        transfer_processing_time: { minutes: 0 },
        role: 'admin',
        transactions: [],
    },
    {
        id: 'client-user-1',
        client_id: 'VYL-123-456',
        email: 'client@vylsfond.com',
        password: 'password123',
        balance: 15320.75,
        account_number: '0123456789',
        iban: 'FR7630004000011234567890123',
        bic: 'BNPAFRPPXXX',
        created_at: new Date('2023-01-15').toISOString(),
        is_transfer_blocked: false,
        transfer_block_reason: null,
        transfer_processing_time: { minutes: 1 },
        role: 'client',
        transactions: [],
    },
    {
        id: 'client-user-2',
        client_id: 'VYL-789-012',
        email: 'blocked@vylsfond.com',
        password: 'password456',
        balance: 500.00,
        account_number: '9876543210',
        iban: 'FR7630002005500000157845Z25',
        bic: 'SOGEFRPPXXX',
        created_at: new Date('2022-11-20').toISOString(),
        is_transfer_blocked: true,
        transfer_block_reason: 'Activité suspecte détectée.',
        transfer_processing_time: { days: 2 },
        role: 'client',
        transactions: [],
    },
];

let mockTransactions: Transaction[] = [
    {
        id: 'tx-1',
        profile_id: 'client-user-1',
        amount: -50.25,
        reason: 'Abonnement Netflix',
        recipient_name: 'NETFLIX',
        created_at: new Date('2024-07-20T10:00:00Z').toISOString(),
        status: 'COMPLETED',
        recipient_iban: 'IE64CLIE93105479885566',
        recipient_bic: null,
        recipient_bank_name: null,
    },
    {
        id: 'tx-2',
        profile_id: 'client-user-1',
        amount: 1800.00,
        reason: 'Salaire Juillet',
        recipient_name: 'VOTRE EMPLOYEUR',
        created_at: new Date('2024-07-28T09:00:00Z').toISOString(),
        status: 'COMPLETED',
        recipient_iban: null,
        recipient_name: null,
    },
    {
        id: 'tx-3',
        profile_id: 'client-user-2',
        amount: -150.00,
        reason: 'Loyer',
        recipient_name: 'Agence Immobilière',
        created_at: new Date('2024-08-01T14:00:00Z').toISOString(),
        status: 'FAILED',
        recipient_iban: 'FR1420041010050500013M02606',
        recipient_bic: null,
        recipient_bank_name: null,
    },
    {
        id: 'tx-4',
        profile_id: 'client-user-1',
        amount: -200,
        reason: 'Virement pour M. Dupont',
        recipient_name: 'M. Dupont',
        created_at: new Date().toISOString(),
        status: 'PENDING',
        estimatedCompletionDate: new Date(Date.now() + 1 * 60000).toISOString(),
        recipient_iban: 'FR1420041010050500013M02606',
        recipient_bic: 'SOGEFRPPXXX',
        recipient_bank_name: 'Société Générale',
    }
];

// --- HELPERS ---
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

export async function verifyClientLoginAction(credentials: z.infer<typeof loginSchema>): Promise<{ success: boolean; clientId?: string; role?: UserRole, error?: string }> {
  const parsed = loginSchema.safeParse(credentials);
  if (!parsed.success) {
    return { success: false, error: 'Données invalides.' };
  }

  const client = mockProfiles.find(p => p.email === parsed.data.email);

  if (!client || client.password !== parsed.data.password) {
    return { success: false, error: 'Email ou mot de passe incorrect.' };
  }
  
  return { success: true, clientId: client.id, role: client.role as UserRole };
}


export async function getClientByIdAction(clientId: string): Promise<{ success: boolean; client?: Omit<ClientProfile, 'password'>; error?: string }> {
    if (!clientId) {
        return { success: false, error: "ID client non fourni." };
    }

    const client = mockProfiles.find(p => p.id === clientId);
    
    if (!client) {
        return { success: false, error: "Client non trouvé." };
    }
    
    const clientTransactions = mockTransactions.filter(tx => tx.profile_id === clientId);
        
    const now = new Date();
    let clientBalance = client.balance;

    const updatedTransactions = clientTransactions.map(tx => {
        if (tx.status === 'PENDING' && tx.estimatedCompletionDate) {
            const completionDate = new Date(tx.estimatedCompletionDate);
            if (now >= completionDate) {
                if (client.is_transfer_blocked) {
                    tx.status = 'FAILED';
                } else {
                     if (clientBalance >= Math.abs(tx.amount)) {
                        clientBalance += tx.amount;
                        tx.status = 'COMPLETED';
                    } else {
                        tx.status = 'FAILED';
                    }
                }
                client.balance = clientBalance; // Update mock client balance
            }
        }
        return tx;
    });
    
    const { password, ...clientWithoutPassword } = client;
    clientWithoutPassword.transactions = updatedTransactions;
    
    return { success: true, client: clientWithoutPassword };
}

export async function createTransferAction(transferDetails: TransferFormInput & { clientId: string }): Promise<{ success: boolean; error?: string }> {
    const client = mockProfiles.find(p => p.id === transferDetails.clientId);

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
        status: 'PENDING',
        created_at: creationDate.toISOString(),
        estimatedCompletionDate: completionDate.toISOString(),
    };

    mockTransactions.push(newTransaction);
    
    revalidatePath('/dashboard');
    return { success: true };
}


export async function getClientsAction(): Promise<{ success: boolean; clients?: Omit<ClientProfile, 'password'>[]; error?: string }> {
    try {
        const clients = mockProfiles.filter(p => p.role === 'client');

        const clientsWithTransactions = clients.map(p => {
            const { password, ...client } = p;
            client.transactions = mockTransactions.filter(tx => tx.profile_id === client.id);
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
    
    const clientIndex = mockProfiles.findIndex(p => p.id === clientId);

    if (clientIndex === -1) {
        return { success: false, error: "Client non trouvé." };
    }
    
    try {
        // Remove transactions for the client
        mockTransactions = mockTransactions.filter(tx => tx.profile_id !== clientId);
        // Remove the client
        mockProfiles.splice(clientIndex, 1);
    } catch(error: any) {
         return { success: false, error: "Erreur de suppression: " + error.message };
    }

    revalidatePath('/admin');
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

    const existingClient = mockProfiles.find(p => p.email === parsed.data.email);
    
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
        created_at: new Date().toISOString(),
        is_transfer_blocked: false,
        transfer_block_reason: null,
        transfer_processing_time: { minutes: 1 },
        role: 'client',
    };
    
    mockProfiles.push(newClient);
    
    if (newClient.balance > 0) {
        mockTransactions.push({
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
    const transactionAmount = type === 'credit' ? Math.abs(amount) : -Math.abs(amount);

    const client = mockProfiles.find(p => p.id === clientId);
    if (!client) return { success: false, error: 'Client non trouvé' };

    const newBalance = client.balance + transactionAmount;
    if (newBalance < 0) {
         return { success: false, error: "Solde insuffisant pour ce débit." };
    }

    client.balance = newBalance;

    mockTransactions.push({
        id: uuidv4(),
        profile_id: clientId,
        amount: transactionAmount,
        reason: reason,
        recipient_name: "Opération Manuelle Admin",
        status: 'COMPLETED' as const,
        created_at: new Date().toISOString(),
        recipient_iban: null,
    });

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
    
    const client = mockProfiles.find(p => p.id === clientId);
    if (!client) return { success: false, error: 'Client non trouvé' };

    client.is_transfer_blocked = is_transfer_blocked;
    client.transfer_block_reason = is_transfer_blocked ? transfer_block_reason : null;

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
    
    const client = mockProfiles.find(p => p.id === clientId);
    if (!client) return { success: false, error: 'Client non trouvé' };

    client.transfer_processing_time = {
        days: unit === 'days' ? duration : 0,
        hours: unit === 'hours' ? duration : 0,
        minutes: unit === 'minutes' ? duration : 0,
    };
    
    revalidatePath('/admin');
    revalidatePath('/dashboard');
    return { success: true };
}
