
'use server';

import "@/app/config"; // Load environment variables
import { z } from 'zod';
import { type TransferFormInput, transferFormSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';
import { type ClientProfile, type Transaction, type UserRole } from '@/lib/types';
import { MOCK_DB } from '@/data/mock-db';

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

  const client = MOCK_DB.profiles.find(p => p.email === parsed.data.email);

  if (!client) {
    return { success: false, error: 'Email ou mot de passe incorrect.' };
  }
  
  // For admin, check password against env variable. For clients, simulate success.
  if (client.role === 'admin') {
      if (parsed.data.password !== process.env.ADMIN_PASSWORD) {
          return { success: false, error: 'Email ou mot de passe incorrect.' };
      }
  } else {
      if (client.password !== parsed.data.password) {
          return { success: false, error: 'Email ou mot de passe incorrect.' };
      }
  }
  
  return { success: true, clientId: client.id, role: client.role as UserRole };
}

export async function getClientByIdAction(clientId: string): Promise<{ success: boolean; client?: Omit<ClientProfile, 'password'>; error?: string }> {
    if (!clientId) {
        return { success: false, error: "ID client non fourni." };
    }

    const client = MOCK_DB.profiles.find(p => p.id === clientId);
    
    if (!client) {
        return { success: false, error: "Client non trouvé." };
    }
    
    const clientTransactions = MOCK_DB.transactions.filter(tx => tx.profile_id === clientId);
        
    const now = new Date();
    let clientBalance = client.balance;
    const transactionsToUpdate: Transaction[] = [];

    const updatedTransactions = clientTransactions.map(tx => {
        const txCopy = {...tx};
        if (txCopy.status === 'PENDING' && txCopy.estimatedCompletionDate) {
            const completionDate = new Date(txCopy.estimatedCompletionDate);
            if (now >= completionDate) {
                if (client.is_transfer_blocked) {
                    txCopy.status = 'FAILED';
                } else {
                     if (clientBalance >= Math.abs(txCopy.amount)) {
                        clientBalance += txCopy.amount;
                        txCopy.status = 'COMPLETED';
                    } else {
                        txCopy.status = 'FAILED';
                    }
                }
                transactionsToUpdate.push(txCopy);
            }
        }
        return txCopy;
    });

    if (transactionsToUpdate.length > 0) {
        // In a real scenario, we would update the DB. Here we just update the in-memory mock data.
        MOCK_DB.transactions = MOCK_DB.transactions.map(tx => {
            const updated = transactionsToUpdate.find(utx => utx.id === tx.id);
            return updated || tx;
        });
        const profileIndex = MOCK_DB.profiles.findIndex(p => p.id === client.id);
        if (profileIndex > -1) {
            MOCK_DB.profiles[profileIndex].balance = clientBalance;
        }
        client.balance = clientBalance;
    }
    
    const { password, ...clientWithoutPassword } = client;
    clientWithoutPassword.transactions = updatedTransactions;
    
    return { success: true, client: clientWithoutPassword };
}

export async function createTransferAction(transferDetails: TransferFormInput & { clientId: string }): Promise<{ success: boolean; error?: string }> {
    const client = MOCK_DB.profiles.find(p => p.id === transferDetails.clientId);

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
        id: `tx_${Date.now()}_${Math.random()}`,
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

    MOCK_DB.transactions.push(newTransaction);
    
    revalidatePath('/dashboard');
    return { success: true };
}

export async function getClientsAction(): Promise<{ success: boolean; clients?: Omit<ClientProfile, 'password'>[]; error?: string }> {
    try {
        const profiles = MOCK_DB.profiles.filter(p => p.role === 'client');
        const transactions = MOCK_DB.transactions;

        const clientsWithTransactions = profiles.map(p => {
            const { password, ...client } = p;
            client.transactions = transactions.filter(tx => tx.profile_id === client.id);
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
        MOCK_DB.transactions = MOCK_DB.transactions.filter(tx => tx.profile_id !== clientId);
        MOCK_DB.profiles = MOCK_DB.profiles.filter(p => p.id !== clientId);
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

const randomDigits = (length: number) => Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
function generateIBAN(countryCode = 'FR') {
    const countryPart = '76';
    const bankCode = randomDigits(5);
    const branchCode = randomDigits(5);
    const accountNumber = randomDigits(11);
    const nationalCheckDigits = randomDigits(2);
    return `${countryCode}${countryPart}${bankCode}${branchCode}${accountNumber}${nationalCheckDigits}`;
}

export async function createClientAction(clientData: any): Promise<{ success: boolean; clientId?: string; error?: string }> {
    const parsed = createClientSchema.safeParse(clientData);
    if (!parsed.success) {
        const issues = parsed.error.issues.map(i => i.message).join(', ');
        return { success: false, error: `Données invalides: ${issues}` };
    }

    const existingClient = MOCK_DB.profiles.find(p => p.email === parsed.data.email);
    if (existingClient) {
        return { success: false, error: "Un client avec cet e-mail existe déjà." };
    }
    
    const newClientId = `user_${Date.now()}`;
    const newClient: ClientProfile = {
        id: newClientId,
        client_id: `VYL-${randomDigits(3)}-${randomDigits(3)}`,
        email: parsed.data.email,
        password: parsed.data.password,
        balance: parsed.data.initialBalance,
        created_at: new Date().toISOString(),
        account_number: generateIBAN(),
        iban: generateIBAN(),
        bic: `${randomDigits(4)}FR${randomDigits(2)}XXX`,
        is_transfer_blocked: false,
        transfer_block_reason: null,
        transfer_processing_time: { minutes: 1 },
        role: 'client',
    };
    
    MOCK_DB.profiles.push(newClient);
    
    if (newClient.balance > 0) {
        const initialTx: Transaction = {
             id: `tx_${Date.now()}`,
             profile_id: newClientId,
             amount: newClient.balance,
             reason: "Dépôt initial",
             status: 'COMPLETED' as const,
             recipient_iban: null,
             recipient_name: null,
             created_at: new Date().toISOString(),
        };
        MOCK_DB.transactions.push(initialTx);
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

    const clientIndex = MOCK_DB.profiles.findIndex(p => p.id === clientId);
    if (clientIndex === -1) return { success: false, error: 'Client non trouvé' };
    
    const client = MOCK_DB.profiles[clientIndex];
    const newBalance = client.balance + transactionAmount;
    if (newBalance < 0) {
         return { success: false, error: "Solde insuffisant pour ce débit." };
    }

    MOCK_DB.profiles[clientIndex].balance = newBalance;

    const newTx: Transaction = {
        id: `tx_${Date.now()}`,
        profile_id: clientId,
        amount: transactionAmount,
        reason: reason,
        recipient_name: "Opération Manuelle Admin",
        status: 'COMPLETED' as const,
        created_at: new Date().toISOString(),
        recipient_iban: null,
    };
    MOCK_DB.transactions.push(newTx);

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
    
    const clientIndex = MOCK_DB.profiles.findIndex(p => p.id === clientId);
    if (clientIndex === -1) return { success: false, error: 'Client non trouvé' };

    MOCK_DB.profiles[clientIndex].is_transfer_blocked = is_transfer_blocked;
    MOCK_DB.profiles[clientIndex].transfer_block_reason = is_transfer_blocked ? transfer_block_reason : null;

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
    
    const clientIndex = MOCK_DB.profiles.findIndex(p => p.id === clientId);
    if (clientIndex === -1) return { success: false, error: 'Client non trouvé' };

    MOCK_DB.profiles[clientIndex].transfer_processing_time = processingTime;
    
    revalidatePath('/admin');
    revalidatePath('/dashboard');
    return { success: true };
}
