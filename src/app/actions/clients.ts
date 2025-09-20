
'use server';

import { z } from 'zod';
import { type TransferFormInput, transferFormSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { type ClientProfile, type Transaction } from '@/lib/types';

// --- DATABASE HELPERS (Supabase) ---

async function getSupabaseClient() {
    return createClient();
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

  const supabase = await getSupabaseClient();
  const { data: client, error } = await supabase
    .from('profiles')
    .select('id, password')
    .eq('email', parsed.data.email)
    .single();

  if (error || !client) {
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
    
    const supabase = await getSupabaseClient();

    // First, get the client profile
    const { data: client, error: clientError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', clientId)
        .single();
        
    if (clientError || !client) {
        return { success: false, error: "Client non trouvé." };
    }

    // Then, get all transactions for that client
    const { data: transactions, error: txError } = await supabase
        .from('transactions')
        .select('*')
        .eq('profile_id', clientId);

    if (txError) {
        return { success: false, error: "Erreur lors de la récupération des transactions." };
    }
    
    // Process pending transactions
    const now = new Date();
    let newBalance = client.balance;
    let dataWasModified = false;

    const updatedTransactions = (transactions || []).map(tx => {
        if (tx.status === 'PENDING' && tx.estimatedCompletionDate) {
            const completionDate = new Date(tx.estimatedCompletionDate);
            if (now >= completionDate) {
                dataWasModified = true;
                if (client.is_transfer_blocked) {
                    tx.status = 'FAILED';
                    // The reason will be updated in the DB
                } else {
                     if (newBalance >= Math.abs(tx.amount)) {
                        newBalance += tx.amount;
                        tx.status = 'COMPLETED';
                    } else {
                        tx.status = 'FAILED';
                    }
                }
                
                // Update transaction in DB
                supabase.from('transactions').update({ status: tx.status }).eq('id', tx.id).then();
            }
        }
        return tx;
    });

    if (dataWasModified) {
        client.balance = newBalance;
        await supabase.from('profiles').update({ balance: newBalance }).eq('id', client.id);
    }
    
    const { password, ...clientWithoutPassword } = client;
    clientWithoutPassword.transactions = updatedTransactions;
    
    return { success: true, client: clientWithoutPassword };
}

export async function createTransferAction(transferDetails: TransferFormInput & { clientId: string }): Promise<{ success: boolean; error?: string }> {
    const supabase = await getSupabaseClient();
    
    const { data: client, error: clientError } = await supabase
        .from('profiles')
        .select('id, balance, is_transfer_blocked, transfer_block_reason, transfer_processing_time')
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

    const { error: insertError } = await supabase.from('transactions').insert({
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
    });

    if (insertError) {
        return { success: false, error: "Erreur lors de la création du virement: " + insertError.message };
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
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase
        .from('profiles')
        .select('*, transactions(*)')
        .order('created_at', { ascending: false });

    if (error) {
        return { success: false, error: "Erreur Supabase: " + error.message };
    }

    const clientsWithoutPasswords = data.map(c => {
        const { password, ...client } = c;
        return client;
    });

    return { success: true, clients: clientsWithoutPasswords };
}

export async function deleteClientAction(clientId: string): Promise<{ success: boolean; error?: string }> {
    if (!clientId) {
        return { success: false, error: "ID client non fourni." };
    }
    
    const supabase = await getSupabaseClient();
    const { error } = await supabase.from('profiles').delete().eq('id', clientId);

    if (error) {
         return { success: false, error: "Erreur Supabase: " + error.message };
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

    const supabase = await getSupabaseClient();

    // Check if client exists
    const { data: existingClient, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', parsed.data.email)
        .single();

    if (existingClient) {
        return { success: false, error: "Un client avec cet e-mail existe déjà." };
    }
    
    const newClientData: Omit<ClientProfile, 'id' | 'created_at' | 'transactions'> = {
        client_id: `VYL-${randomDigits(3)}-${randomDigits(3)}`,
        email: parsed.data.email,
        password: parsed.data.password, // Plain text, should be hashed
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
    };
    
    const { data: insertedClient, error: insertError } = await supabase
        .from('profiles')
        .insert(newClientData)
        .select('id')
        .single();
    
    if (insertError || !insertedClient) {
        return { success: false, error: "Erreur Supabase: " + insertError?.message };
    }

    const newClientId = insertedClient.id;
    const transactionsToInsert: Omit<Transaction, 'id' | 'created_at'>[] = [];

    if (newClientData.balance > 0) {
        transactionsToInsert.push({
             profile_id: newClientId,
             amount: newClientData.balance,
             reason: "Dépôt initial",
             status: 'COMPLETED' as const,
             recipient_iban: null,
             recipient_name: null
        });
    }
    if (clientData.loan_type) {
         transactionsToInsert.push({
             profile_id: newClientId,
             amount: 0,
             reason: "Demande de Prêt",
             status: 'COMPLETED' as const,
             recipient_iban: null,
             recipient_name: null
        });
    } else if (clientData.contactMessage) {
         transactionsToInsert.push({
             profile_id: newClientId,
             amount: 0,
             reason: `Message de Contact: ${clientData.contactMessage}`,
             status: 'COMPLETED' as const,
             recipient_iban: null,
             recipient_name: null
        });
    }
    
    if (transactionsToInsert.length > 0) {
        await supabase.from('transactions').insert(transactionsToInsert);
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
    const supabase = await getSupabaseClient();
    
    const { data: client, error: clientError } = await supabase
        .from('profiles').select('balance').eq('id', clientId).single();
    
    if (clientError || !client) return { success: false, error: 'Client non trouvé' };

    const transactionAmount = type === 'credit' ? Math.abs(amount) : -Math.abs(amount);

    if (type === 'debit' && client.balance < Math.abs(amount)) {
        return { success: false, error: "Solde insuffisant pour ce débit." };
    }
    
    const newBalance = client.balance + transactionAmount;
    
    const { error: updateError } = await supabase
        .from('profiles').update({ balance: newBalance }).eq('id', clientId);
    
    if(updateError) return { success: false, error: 'Erreur Supabase: ' + updateError.message };
    
    const newTransaction = {
        profile_id: clientId,
        amount: transactionAmount,
        reason: reason,
        recipient_name: "Opération Manuelle Admin",
        status: 'COMPLETED' as const,
        recipient_iban: null,
    };

    const { error: txError } = await supabase.from('transactions').insert(newTransaction);
    if(txError) return { success: false, error: 'Erreur Supabase (transaction): ' + txError.message };
    
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
    
    const supabase = await getSupabaseClient();
    const { error } = await supabase.from('profiles').update({
        is_transfer_blocked: is_transfer_blocked,
        transfer_block_reason: is_transfer_blocked ? transfer_block_reason : null,
    }).eq('id', clientId);

    if(error) return { success: false, error: 'Erreur Supabase: ' + error.message };

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

    const supabase = await getSupabaseClient();
    
    const processingTime = {
        days: unit === 'days' ? duration : undefined,
        hours: unit === 'hours' ? duration : undefined,
        minutes: unit === 'minutes' ? duration : undefined,
    };
    
    const { error } = await supabase.from('profiles').update({
        transfer_processing_time: processingTime
    }).eq('id', clientId);
    
    if(error) return { success: false, error: 'Erreur Supabase: ' + error.message };

    revalidatePath('/admin');
    revalidatePath('/dashboard');
    return { success: true };
}
