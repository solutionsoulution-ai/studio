"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

type TransactionType = 'credit' | 'debit';

export interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: TransactionType;
}

interface UserData {
    name: string;
    email: string;
    memberSince: string;
}

interface AccountData {
    iban: string;
    bic: string;
}

// L'état de l'application est maintenant plus complet
interface BankingState {
    user: UserData;
    account: AccountData;
    balance: number;
    transactions: Transaction[];
    addTransaction: (tx: Omit<Transaction, 'id' | 'date'>) => void;
}

const BankingContext = createContext<BankingState | undefined>(undefined);

// Fonction pour récupérer les données injectées par WordPress
const getInitialData = () => {
    if (typeof window !== 'undefined' && (window as any).vylsBankingData) {
        return (window as any).vylsBankingData;
    }
    return null;
}

export const BankingProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserData>({ name: 'Chargement...', email: '', memberSince: '' });
    const [account, setAccount] = useState<AccountData>({ iban: '', bic: '' });
    const [balance, setBalance] = useState<number>(0);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialisation unique des données
    useEffect(() => {
        if (!isInitialized) {
            const initialData = getInitialData();
            if (initialData && initialData.user && initialData.account) {
                setUser(initialData.user);
                setAccount({ iban: initialData.account.iban, bic: initialData.account.bic });
                setBalance(initialData.account.initialBalance || 0);
                setTransactions(initialData.account.initialTransactions || []);
            } else {
                // Données par défaut si rien n'est injecté
                setUser({ name: 'Client Démo', email: 'demo@vylsfond.com', memberSince: new Date().toLocaleDateString('fr-FR') });
                setAccount({ iban: 'FR00 0000 0000 0000 0000 0000 000', bic: 'DEMOFRPP' });
                setBalance(0);
                setTransactions([]);
            }
            setIsInitialized(true);
        }
    }, [isInitialized]);

    const addTransaction = (tx: Omit<Transaction, 'id' | 'date'>) => {
        const newTransaction: Transaction = {
            ...tx,
            id: uuidv4(),
            date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }),
        };

        setTransactions(prev => [...prev, newTransaction]);
        setBalance(prev => prev + newTransaction.amount);
    };

    // On affiche un loader tant que les données ne sont pas prêtes
    if (!isInitialized) {
        return <div className="flex items-center justify-center min-h-screen">Chargement de votre espace personnel...</div>;
    }

    return (
        <BankingContext.Provider value={{ user, account, balance, transactions, addTransaction }}>
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
