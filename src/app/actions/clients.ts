
'use server';

import { z } from 'zod';
import { type TransferFormInput, transferFormSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';
import { type ClientProfile, type Transaction } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/lib/supabase-client';

// --- DATABASE HELPER (Supabase) ---
async function readData(): Promise<{ profiles: ClientProfile[], transactions: Transaction[] }> {
    if (!supabase) throw new Error("Supabase client is not initialized.");
    
    const { data: profiles, error: profilesError } = await supabase.from('profiles').select('*');
    if (profilesError) throw profilesError;

    const { data: transactions, error: transactionsError } = await supabase.from('transactions').select('*');
    if (transactionsError) throw transactionsError;

    return { profiles: profiles || [], transactions: transactions || [] };
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
  if (!supabase) return { success: false, error: "Database not configured." };
  
  const parsed = loginSchema.safeParse(credentials);
  if (!parsed.success) {
    return { success: false, error: 'Données invalides.' };
  }

  const { data: client, error } = await supabase
    .from('profiles')
    .select('id, password')
    .eq('email', parsed.data.email)
    .single();

  if (error || !client || client.password !== parsed.data.password) {
    return { success: false, error: 'Email ou mot de passe incorrect.' };
  }
  
  return { success: true, clientId: client.id };
}


export async function getClientByIdAction(clientId: string): Promise<{ success: boolean; client?: Omit<ClientProfile, 'password'>; error?: string }> {
    if (!supabase) return { success: false, error: "Database not configured." };
    if (!clientId) {
        return { success: false, error: "ID client non fourni." };
    }

    const { data: client, error: clientError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', clientId)
        .single();
    
    if (clientError || !client) {
        return { success: false, error: "Client non trouvé." };
    }
    
    const { data: clientTransactions, error: txError } = await supabase
        .from('transactions')
        .select('*')
        .eq('profile_id', clientId);
        
    if (txError) {
        return { success: false, error: "Erreur lors de la récupération des transactions." };
    }
    
    const now = new Date();
    const transactionsToUpdate = [];

    const updatedTransactions = clientTransactions.map(tx => {
        if (tx.status === 'PENDING' && tx.estimatedCompletionDate) {
            const completionDate = new Date(tx.estimatedCompletionDate);
            if (now >= completionDate) {
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
                transactionsToUpdate.push(supabase.from('transactions').update({ status: tx.status }).eq('id', tx.id));
            }
        }
        return tx;
    });

    if (transactionsToUpdate.length > 0) {
        await Promise.all(transactionsToUpdate);
        await supabase.from('profiles').update({ balance: client.balance }).eq('id', client.id);
    }
    
    const { password, ...clientWithoutPassword } = client;
    clientWithoutPassword.transactions = updatedTransactions;
    
    return { success: true, client: clientWithoutPassword };
}

export async function createTransferAction(transferDetails: TransferFormInput & { clientId: string }): Promise<{ success: boolean; error?: string }> {
    if (!supabase) return { success: false, error: "Database not configured." };
    
    const { data: client, error: clientError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', transferDetails.clientId)
        .single();

    if (clientError || !client) {
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

    const newTransaction: Omit<Transaction, 'id' | 'created_at'> & {id?:string, created_at?: string} = {
        profile_id: transferDetails.clientId,
        amount: -parsed.data.amount,
        reason: parsed.data.reason,
        recipient_iban: parsed.data.recipientIban,
        recipient_name: parsed.data.recipientName,
        recipient_bank_name: parsed.data.recipientBankName,
        recipient_bic: parsed.data.recipientBic,
        status: 'PENDING',
        estimatedCompletionDate: completionDate.toISOString(),
    };

    const { error: insertError } = await supabase.from('transactions').insert([newTransaction]);
    
    if(insertError) {
        return { success: false, error: "Erreur lors de la création du virement." };
    }

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
    if (!supabase) return { success: false, error: "Database not configured." };
    try {
        const { data: profiles, error: profilesError } = await supabase.from('profiles').select('*');
        if (profilesError) throw profilesError;

        const { data: transactions, error: transactionsError } = await supabase.from('transactions').select('*');
        if (transactionsError) throw transactionsError;

        const clientsWithTransactions = (profiles || []).map(p => {
            const { password, ...client } = p;
            client.transactions = (transactions || []).filter(tx => tx.profile_id === client.id);
            return client;
        });

        return { success: true, clients: clientsWithTransactions };
    } catch (error: any) {
        return { success: false, error: "Erreur de lecture: " + error.message };
    }
}

export async function deleteClientAction(clientId: string): Promise<{ success: boolean; error?: string }> {
    if (!supabase) return { success: false, error: "Database not configured." };
    if (!clientId) {
        return { success: false, error: "ID client non fourni." };
    }
    
    try {
        const { error: txError } = await supabase.from('transactions').delete().eq('profile_id', clientId);
        if (txError) throw new Error(`Erreur lors de la suppression des transactions: ${txError.message}`);

        const { error: profileError } = await supabase.from('profiles').delete().eq('id', clientId);
        if (profileError) throw new Error(`Erreur lors de la suppression du client: ${profileError.message}`);

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
    if (!supabase) return { success: false, error: "Database not configured." };
    
    const parsed = createClientSchema.safeParse(clientData);
    if (!parsed.success) {
        const issues = parsed.error.issues.map(i => i.message).join(', ');
        return { success: false, error: `Données invalides: ${issues}` };
    }

    const { data: existingClient, error: findError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', parsed.data.email)
        .single();
    
    if (findError && findError.code !== 'PGRST116') { // PGRST116: row not found, which is good
        return { success: false, error: "Erreur lors de la vérification de l'e-mail." };
    }
    if (existingClient) {
        return { success: false, error: "Un client avec cet e-mail existe déjà." };
    }
    
    const newClient: Omit<ClientProfile, 'id' | 'created_at'> = {
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
        has_loan: false,
        loan_type: null,
        loan_amount: null,
        interest_rate: null,
        loan_term: null,
    };
    
    const { data: insertedClient, error: insertClientError } = await supabase
        .from('profiles')
        .insert([newClient])
        .select('id')
        .single();
    
    if (insertClientError || !insertedClient) {
         return { success: false, error: "Erreur lors de la création du client." };
    }

    const newClientId = insertedClient.id;
    
    if (newClient.balance > 0) {
        const { error: txError } = await supabase.from('transactions').insert({
             profile_id: newClientId,
             amount: newClient.balance,
             reason: "Dépôt initial",
             status: 'COMPLETED' as const,
             recipient_iban: null,
             recipient_name: null
        });
        if (txError) {
             console.error("Error creating initial transaction:", txError.message);
        }
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
    if (!supabase) return { success: false, error: "Database not configured." };
    const parsed = adjustBalanceSchema.safeParse(adjustmentData);
    if (!parsed.success) {
        return { success: false, error: 'Données invalides' };
    }

    const { clientId, amount, reason, type } = parsed.data;
    const transactionAmount = type === 'credit' ? Math.abs(amount) : -Math.abs(amount);

    const { data: client, error: clientError } = await supabase.from('profiles').select('balance').eq('id', clientId).single();
    if (clientError || !client) return { success: false, error: 'Client non trouvé' };

    const newBalance = client.balance + transactionAmount;
    if (newBalance < 0) {
         return { success: false, error: "Solde insuffisant pour ce débit." };
    }

    const { error: updateError } = await supabase.from('profiles').update({ balance: newBalance }).eq('id', clientId);
    if (updateError) return { success: false, error: "Erreur lors de la mise à jour du solde." };

    const { error: txError } = await supabase.from('transactions').insert({
        profile_id: clientId,
        amount: transactionAmount,
        reason: reason,
        recipient_name: "Opération Manuelle Admin",
        status: 'COMPLETED' as const,
        recipient_iban: null,
    });
    if (txError) return { success: false, error: "Erreur lors de la création de la transaction." };

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
    if (!supabase) return { success: false, error: "Database not configured." };
    const parsed = blockSettingsSchema.safeParse(settingsData);
    if (!parsed.success) return { success: false, error: 'Données invalides' };
    
    const { clientId, is_transfer_blocked, transfer_block_reason } = parsed.data;
    
    const { error } = await supabase.from('profiles').update({ 
        is_transfer_blocked, 
        transfer_block_reason: is_transfer_blocked ? transfer_block_reason : null 
    }).eq('id', clientId);

    if (error) return { success: false, error: "Erreur de mise à jour." };

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
    if (!supabase) return { success: false, error: "Database not configured." };
    const parsed = transferSettingsSchema.safeParse(settingsData);
    if (!parsed.success) return { success: false, error: 'Données invalides' };
    
    const { clientId, duration, unit } = parsed.data;
    
    const processingTime = {
        days: unit === 'days' ? duration : 0,
        hours: unit === 'hours' ? duration : 0,
        minutes: unit === 'minutes' ? duration : 0,
    };
    
    const { error } = await supabase.from('profiles').update({ transfer_processing_time: processingTime }).eq('id', clientId);
    if (error) return { success: false, error: "Erreur de mise à jour." };

    revalidatePath('/admin');
    revalidatePath('/dashboard');
    return { success: true };
}
