
export interface Transaction {
    id: string;
    profile_id: string;
    amount: number;
    reason: string;
    recipient_iban: string | null;
    recipient_name: string | null;
    recipient_bic?: string | null;
    recipient_bank_name?: string | null;
    created_at: string; // ISO 8601 string
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
    estimatedCompletionDate?: string; // ISO 8601 string
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
    created_at: string; // ISO 8601 string
    is_transfer_blocked: boolean;
    transfer_block_reason: string | null;
    transfer_processing_time: {
        days?: number;
        hours?: number;
        minutes?: number;
    };
    transactions?: Transaction[];
}
