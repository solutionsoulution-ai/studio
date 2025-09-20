
'use server';

import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';
import { type TransferFormInput, transferFormSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';

// Types
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
    password?: string; // Should be hashed, but keeping as-is for now
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
    transactions?: Transaction[]; // Optional on profile, but loaded separately
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

// Helpers
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

// Validation Schemas
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Server Actions

export async function verifyClientLoginAction(credentials: z.infer<typeof loginSchema>): Promise<{ success: boolean; clientId?: string; error?: string }> {
  const supabase = createClient();
  const parsed = loginSchema.safeParse(credentials);
  if (!parsed.success) {
    return { success: false, error: 'Données invalides.' };
  }

  const { data: client, error } = await supabase
    .from('profiles')
    .select('id, password')
    .eq('email', parsed.data.email)
    .single();

  if (error || !client) {
    console.error('Login error:', error);
    return { success: false, error: 'Email ou mot de passe incorrect.' };
  }

  // NOTE: This is plain text password comparison. In a real app, use a library like bcrypt.
  if (client.password !== parsed.data.password) {
    return { success: false, error: 'Email ou mot de passe incorrect.' };
  }

  return { success: true, clientId: client.id };
}

export async function getClientByIdAction(clientId: string): Promise<{ success: boolean; client?: Omit<ClientProfile, 'password'>; error?: string }> {
    const supabase = createClient();
    if (!clientId) {
        return { success: false, error: "ID client non fourni." };
    }

    const { data: client, error: clientError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', clientId)
        .single();
    
    if (clientError || !client) {
        return { success: false, error: clientError?.message || "Client non trouvé." };
    }

    const { data: transactions, error: txError } = await supabase
        .from('transactions')
        .select('*')
        .eq('profile_id', clientId)
        .order('created_at', { ascending: false });
        
    if (txError) {
        return { success: false, error: txError.message };
    }

    let dataWasModified = false;
    const now = new Date();
    let newBalance = client.balance;

    const updatedTransactions = transactions.map(tx => {
        if (tx.status === 'PENDING') {
            const completionDate = new Date(tx.estimatedCompletionDate);
            if (now >= completionDate) {
                dataWasModified = true;
                if (client.is_transfer_blocked) {
                    tx.status = 'FAILED';
                    tx.reason = `[Échec] ${tx.reason} - ${client.transfer_block_reason || 'Compte bloqué'}`;
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
        // Batch update transactions
        const { error: updateTxError } = await supabase.from('transactions').upsert(updatedTransactions.filter(tx => tx.status !== 'PENDING'));
        if (updateTxError) console.error("Error updating transactions:", updateTxError);

        // Update balance
        const { error: updateProfileError } = await supabase.from('profiles').update({ balance: newBalance }).eq('id', clientId);
        if (updateProfileError) console.error("Error updating balance:", updateProfileError);

        client.balance = newBalance;
    }
    
    const { password, ...clientWithoutPassword } = client;
    return { success: true, client: { ...clientWithoutPassword, transactions: updatedTransactions } };
}

export async function createTransferAction(transferDetails: TransferFormInput & { clientId: string }): Promise<{ success: boolean; error?: string }> {
    const supabase = createClient();
    
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
    
    completionDate.setDate(completionDate.getDate() + (processingTime.days || 0));
    completionDate.setHours(completionDate.getHours() + (processingTime.hours || 0));
    completionDate.setMinutes(completionDate.getMinutes() + (processingTime.minutes || 0));
    
    const newTransaction = {
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

    const { error } = await supabase.from('transactions').insert(newTransaction);
    if (error) {
        return { success: false, error: error.message };
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
    const supabase = createClient();
    const { data, error } = await supabase
        .from('profiles')
        .select(`
            *,
            transactions (
                id,
                reason,
                created_at
            )
        `)
        .order('created_at', { ascending: false });

    if (error) {
        return { success: false, error: error.message };
    }
    return { success: true, clients: data };
}

export async function deleteClientAction(clientId: string): Promise<{ success: boolean; error?: string }> {
    const supabase = createClient();
    if (!clientId) {
        return { success: false, error: "ID client non fourni." };
    }
    
    const { error } = await supabase.from('profiles').delete().eq('id', clientId);
    if (error) {
        return { success: false, error: error.message };
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
    const supabase = createClient();
    const parsed = createClientSchema.safeParse(clientData);
    if (!parsed.success) {
        const issues = parsed.error.issues.map(i => i.message).join(', ');
        return { success: false, error: `Données invalides: ${issues}` };
    }

    const { data: existingClient, error: existingClientError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', parsed.data.email)
        .single();

    if (existingClient) {
        return { success: false, error: "Un client avec cet e-mail existe déjà." };
    }
    
    const newClientData = {
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

    const { data: newClient, error } = await supabase
        .from('profiles')
        .insert(newClientData)
        .select('id')
        .single();

    if (error || !newClient) {
        return { success: false, error: error?.message || "Erreur lors de la création du client." };
    }
    
    const transactionsToInsert = [];
    if (newClientData.balance > 0) {
        transactionsToInsert.push({
             profile_id: newClient.id,
             amount: newClientData.balance,
             reason: "Dépôt initial",
             status: 'COMPLETED' as const,
        });
    }
    if (clientData.loan_type) {
         transactionsToInsert.push({
             profile_id: newClient.id,
             amount: 0,
             reason: "Demande de Prêt",
             status: 'COMPLETED' as const,
        });
    } else if (clientData.contactMessage) {
         transactionsToInsert.push({
             profile_id: newClient.id,
             amount: 0,
             reason: `Message de Contact: ${clientData.contactMessage}`,
             status: 'COMPLETED' as const,
        });
    }

    if (transactionsToInsert.length > 0) {
        const { error: txError } = await supabase.from('transactions').insert(transactionsToInsert);
        if (txError) {
            console.error("Error creating initial transactions:", txError);
            // Optionally delete the created profile if transactions fail
        }
    }

    revalidatePath('/admin');
    return { success: true, clientId: newClient.id };
}

const adjustBalanceSchema = z.object({
  clientId: z.string(),
  amount: z.coerce.number().refine(val => val !== 0, "Le montant ne peut pas être zéro."),
  reason: z.string().min(3, "Le motif est requis (min 3 caractères)."),
  type: z.enum(['credit', 'debit']),
});

export async function adjustClientBalanceAction(adjustmentData: z.infer<typeof adjustBalanceSchema>): Promise<{ success: boolean; error?: string }> {
    const supabase = createClient();
    const parsed = adjustBalanceSchema.safeParse(adjustmentData);
    if (!parsed.success) {
        return { success: false, error: 'Données invalides' };
    }

    const { clientId, amount, reason, type } = parsed.data;

    const { data: client, error: clientError } = await supabase.from('profiles').select('balance').eq('id', clientId).single();
    if (clientError || !client) return { success: false, error: 'Client non trouvé' };

    const transactionAmount = type === 'credit' ? Math.abs(amount) : -Math.abs(amount);

    if (type === 'debit' && client.balance < Math.abs(amount)) {
        return { success: false, error: "Solde insuffisant pour ce débit." };
    }
    
    const newBalance = client.balance + transactionAmount;
    
    const { error: updateError } = await supabase.from('profiles').update({ balance: newBalance }).eq('id', clientId);
    if (updateError) return { success: false, error: updateError.message };
    
    const { error: txError } = await supabase.from('transactions').insert({
        profile_id: clientId,
        amount: transactionAmount,
        reason: reason,
        recipient_name: "Opération Manuelle Admin",
        status: 'COMPLETED' as const
    });
    if (txError) return { success: false, error: txError.message };

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
    const supabase = createClient();
    const parsed = blockSettingsSchema.safeParse(settingsData);
    if (!parsed.success) return { success: false, error: 'Données invalides' };
    
    const { clientId, is_transfer_blocked, transfer_block_reason } = parsed.data;

    const { error } = await supabase
        .from('profiles')
        .update({ is_transfer_blocked, transfer_block_reason: is_transfer_blocked ? transfer_block_reason : null })
        .eq('id', clientId);
        
    if (error) return { success: false, error: error.message };

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
    const supabase = createClient();
    const parsed = transferSettingsSchema.safeParse(settingsData);
    if (!parsed.success) return { success: false, error: 'Données invalides' };
    
    const { clientId, duration, unit } = parsed.data;
    
    const newProcessingTime = {
        days: unit === 'days' ? duration : 0,
        hours: unit === 'hours' ? duration : 0,
        minutes: unit === 'minutes' ? duration : 0,
    };
    
    const { error } = await supabase
        .from('profiles')
        .update({ transfer_processing_time: newProcessingTime })
        .eq('id', clientId);
        
    if (error) return { success: false, error: error.message };

    revalidatePath('/admin');
    revalidatePath('/dashboard');
    return { success: true };
}
