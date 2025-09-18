
'use server';

import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';
import type { TransferFormInput } from '@/app/actions';

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
            const txDate = new Date(tx.created_at);
            const now = new Date();
            const processingTime = client?.transfer_processing_time || { minutes: 1 };
            const completionDate = new Date(txDate);
            
            completionDate.setDate(completionDate.getDate() + (processingTime.days || 0));
            completionDate.setHours(completionDate.getHours() + (processingTime.hours || 0));
            completionDate.setMinutes(completionDate.getMinutes() + (processingTime.minutes || 0));

            if (now >= completionDate) {
                // Let's assume it succeeds. A real app would have more logic.
                tx.status = 'COMPLETED'; 
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

    const client = clients[clientIndex];

    if (client.is_transfer_blocked) {
        return { success: false, error: client.transfer_block_reason || "Les virements sont bloqués pour ce compte." };
    }

    if (client.balance < transferDetails.amount) {
        return { success: false, error: "Solde insuffisant." };
    }

    // Update balance
    client.balance -= transferDetails.amount;
    
    // Create new transaction
    const newTransaction: Transaction = {
        id: `txn_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        profile_id: client.id,
        amount: -transferDetails.amount,
        reason: transferDetails.reason,
        recipient_iban: transferDetails.recipientIban,
        recipient_name: transferDetails.recipientName,
        created_at: new Date().toISOString(),
        status: 'PENDING',
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
        // Remove password before sending to client
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
