
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

type TransactionType = 'credit' | 'debit';
type TransferStatus = 'idle' | 'processing' | 'success' | 'failed';

export interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: TransactionType;
}

export interface OngoingTransfer {
    id: string;
    amount: number;
    reason: string;
    startTime: number; // timestamp
    duration: number; // in seconds
    status: TransferStatus;
    blockReason?: string;
}

interface UserData {
    login: string;
    name: string;
    email: string;
    memberSince: string;
}

interface AccountData {
    iban: string;
    bic: string;
    isTransferBlocked: boolean;
    transferBlockReason: string;
    transferDurationSeconds: number;
}

interface BankingState {
    user: UserData;
    account: AccountData;
    balance: number;
    transactions: Transaction[];
    ongoingTransfers: OngoingTransfer[];
    addTransaction: (tx: Omit<Transaction, 'id' | 'date'>) => void;
    initiateTransfer: (amount: number, reason: string) => OngoingTransfer;
    updateTransferStatus: (id: string, status: TransferStatus, blockReason?: string) => void;
    processFinishedTransfers: () => void;
}

const BankingContext = createContext<BankingState | undefined>(undefined);

const getInitialData = () => {
    if (typeof window !== 'undefined' && (window as any).vylsBankingData) {
        return (window as any).vylsBankingData;
    }
    return null;
}

export const BankingProvider = ({ children }: { children: ReactNode }) => {
    const [isInitialized, setIsInitialized] = useState(false);
    const [user, setUser] = useState<UserData>({ login: '', name: 'Chargement...', email: '', memberSince: '' });
    const [account, setAccount] = useState<AccountData>({ iban: '', bic: '', isTransferBlocked: false, transferBlockReason: '', transferDurationSeconds: 5 });
    const [balance, setBalance] = useState<number>(0);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [ongoingTransfers, setOngoingTransfers] = useState<OngoingTransfer[]>([]);

    // Initialisation depuis les données WP puis le localStorage
    useEffect(() => {
        if (isInitialized) return;

        const initialData = getInitialData();
        let userData: UserData;
        let accountData: AccountData;
        let initialBalance: number;
        let initialTransactions: Transaction[];

        if (initialData?.user?.login) {
            userData = initialData.user;
            accountData = initialData.account;
            initialBalance = initialData.account.initialBalance || 0;
            initialTransactions = initialData.account.initialTransactions || [];
        } else {
            // Données par défaut si rien n'est injecté
            userData = { login: 'demo', name: 'Client Démo', email: 'demo@vylsfond.com', memberSince: new Date().toLocaleDateString('fr-FR') };
            accountData = { iban: 'FR00 0000 0000 0000 0000 0000 000', bic: 'DEMOFRPP', isTransferBlocked: false, transferBlockReason: '', transferDurationSeconds: 5 };
            initialBalance = 0;
            initialTransactions = [];
        }

        setUser(userData);
        setAccount(accountData);

        // Maintenant, on vérifie le localStorage pour cet utilisateur
        try {
            const savedStateJSON = localStorage.getItem(`bankingState_${userData.login}`);
            if (savedStateJSON) {
                const savedState = JSON.parse(savedStateJSON);
                setBalance(savedState.balance);
                setTransactions(savedState.transactions);
                setOngoingTransfers(savedState.ongoingTransfers || []);
            } else {
                setBalance(initialBalance);
                setTransactions(initialTransactions);
                setOngoingTransfers([]);
            }
        } catch (error) {
            console.error("Failed to parse state from localStorage:", error);
            setBalance(initialBalance);
            setTransactions(initialTransactions);
        }

        setIsInitialized(true);
    }, [isInitialized]);

    // Sauvegarde dans le localStorage à chaque changement
    useEffect(() => {
        if (!isInitialized || !user.login) return;
        try {
            const stateToSave = { balance, transactions, ongoingTransfers };
            localStorage.setItem(`bankingState_${user.login}`, JSON.stringify(stateToSave));
        } catch (error) {
            console.error("Failed to save state to localStorage:", error);
        }
    }, [balance, transactions, ongoingTransfers, user.login, isInitialized]);

    const addTransaction = (tx: Omit<Transaction, 'id' | 'date'>) => {
        const newTransaction: Transaction = {
            ...tx,
            id: uuidv4(),
            date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }),
        };
        setBalance(prev => prev + newTransaction.amount);
        setTransactions(prev => [newTransaction, ...prev]);
    };

    const initiateTransfer = (amount: number, reason: string): OngoingTransfer => {
        const newTransfer: OngoingTransfer = {
            id: uuidv4(),
            amount,
            reason,
            startTime: Date.now(),
            duration: account.transferDurationSeconds,
            status: account.isTransferBlocked ? 'failed' : 'processing',
            blockReason: account.isTransferBlocked ? account.transferBlockReason : undefined
        };
        setOngoingTransfers(prev => [...prev, newTransfer]);
        return newTransfer;
    };

    const updateTransferStatus = (id: string, status: TransferStatus, blockReason?: string) => {
        setOngoingTransfers(prev => prev.map(t => t.id === id ? { ...t, status, blockReason: blockReason || t.blockReason } : t));
    };

    const processFinishedTransfers = () => {
        const now = Date.now();
        const transfersToProcess = ongoingTransfers.filter(t => t.status === 'processing');
        let stateChanged = false;

        transfersToProcess.forEach(transfer => {
            const elapsedTime = (now - transfer.startTime) / 1000;
            if (elapsedTime >= transfer.duration) {
                addTransaction({
                    description: `Virement sortant - ${transfer.reason}`,
                    amount: -transfer.amount,
                    type: 'debit',
                });
                updateTransferStatus(transfer.id, 'success');
                stateChanged = true;
            }
        });
    };

    if (!isInitialized) {
        return <div className="flex items-center justify-center min-h-screen">Chargement de votre espace personnel...</div>;
    }

    return (
        <BankingContext.Provider value={{ user, account, balance, transactions, addTransaction, ongoingTransfers, initiateTransfer, updateTransferStatus, processFinishedTransfers }}>
            {children}
        </BankingContext.Provider>
    );
};

export const useBankingStore = (): BankingState => {
    const context = useContext(BankingContext);
    if (context === undefined) {
        throw new Error('useBankingStore must be used within a BankingProvider');
    }
    return context;
};
