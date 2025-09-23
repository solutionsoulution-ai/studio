
import type { ClientProfile, Transaction } from '@/lib/types';

// Let's create a more realistic mock database that can be mutated by actions
interface MockDB {
    profiles: ClientProfile[];
    transactions: Transaction[];
}

const now = new Date();

export const MOCK_DB: MockDB = {
    profiles: [
        {
            id: 'admin_user',
            client_id: 'VYL-ADM-001',
            email: 'admin@vylscapital.com',
            // No password for admin, checked via env variable
            balance: 0,
            account_number: 'ADMIN-ACCOUNT',
            iban: 'FR0000000000000000000000000',
            bic: 'VYLSFRADMIN',
            created_at: new Date(2022, 0, 1).toISOString(),
            is_transfer_blocked: true,
            transfer_block_reason: "Compte administratif",
            transfer_processing_time: { minutes: 0 },
            role: 'admin',
            transactions: []
        },
        {
            id: 'client_1',
            client_id: 'VYL-123-456',
            email: 'john.doe@email.com',
            password: 'password123',
            balance: 15340.78,
            account_number: '00123456789',
            iban: 'FR7630004000011234567890123',
            bic: 'BNPAFRPPXXX',
            created_at: new Date(2023, 5, 15).toISOString(),
            is_transfer_blocked: false,
            transfer_block_reason: null,
            transfer_processing_time: { minutes: 1 },
            role: 'client',
        },
        {
            id: 'client_2',
            client_id: 'VYL-789-012',
            email: 'jane.smith@email.com',
            password: 'password456',
            balance: 480.12,
            account_number: '00987654321',
            iban: 'FR7630002005500000123456S02',
            bic: 'SOGEFRPPXXX',
            created_at: new Date(2023, 8, 20).toISOString(),
            is_transfer_blocked: true,
            transfer_block_reason: "Vérification d'identité requise",
            transfer_processing_time: { hours: 24 },
            role: 'client',
        }
    ],
    transactions: [
        // Transactions for John Doe
        {
            id: 'tx_1',
            profile_id: 'client_1',
            amount: 1500.00,
            reason: 'Salaire',
            recipient_name: 'Employeur SARL',
            recipient_iban: 'FR...',
            created_at: new Date(now.getFullYear(), now.getMonth(), 1).toISOString(),
            status: 'COMPLETED',
        },
        {
            id: 'tx_2',
            profile_id: 'client_1',
            amount: -850.50,
            reason: 'Loyer',
            recipient_name: 'Agence Immobilière',
            recipient_iban: 'FR...',
            created_at: new Date(now.getFullYear(), now.getMonth(), 5).toISOString(),
            status: 'COMPLETED',
        },
        {
            id: 'tx_3',
            profile_id: 'client_1',
            amount: -75.00,
            reason: 'Abonnement Internet',
            recipient_name: 'Fournisseur Net',
            recipient_iban: 'FR...',
            created_at: new Date(now.getFullYear(), now.getMonth(), 10).toISOString(),
            status: 'COMPLETED',
        },
        {
            id: 'tx_4',
            profile_id: 'client_1',
            amount: -120.00,
            reason: 'Courses',
            recipient_name: 'Supermarché',
            recipient_iban: 'FR...',
            created_at: new Date(now.getFullYear(), now.getMonth(), 12).toISOString(),
            status: 'COMPLETED',
        },
         {
            id: 'tx_pending_1',
            profile_id: 'client_1',
            amount: -50.00,
            reason: 'Remboursement ami',
            recipient_name: 'Alice Martin',
            recipient_iban: 'FR...',
            created_at: new Date(now.getTime() - 2 * 60000).toISOString(), // 2 minutes ago
            status: 'PENDING',
            estimatedCompletionDate: new Date(now.getTime() + 3 * 60000).toISOString() // in 3 minutes
        },

        // Transactions for Jane Smith
        {
            id: 'tx_5',
            profile_id: 'client_2',
            amount: 2000.00,
            reason: 'Dépôt initial',
            recipient_name: 'Opération manuelle',
            recipient_iban: null,
            created_at: new Date(2023, 8, 20).toISOString(),
            status: 'COMPLETED',
        },
        {
            id: 'tx_6',
            profile_id: 'client_2',
            amount: -500.00,
            reason: 'Achat en ligne',
            recipient_name: 'E-commerce Store',
            recipient_iban: 'FR...',
            created_at: new Date(2023, 9, 1).toISOString(),
            status: 'FAILED',
        },
    ]
};
