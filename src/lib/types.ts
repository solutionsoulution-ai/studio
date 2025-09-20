
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
