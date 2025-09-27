"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
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
    initialBalance?: number;
    initialTransactions?: Transaction[];
}

interface BankingState {
    user: UserData;
    account: AccountData;
    balance: number;
    transactions: Transaction[];
    addTransaction: (tx: Omit<Transaction, 'id' | 'date'>) => void;
}

const BankingContext = createContext<BankingState | undefined>(undefined);

// Accès aux données injectées par WordPress
const getInitialData = () => {
    if (typeof window !== 'undefined' && (window as any).vylsBankingData) {
        return (window as any).vylsBankingData;
    }
    return null;
}

export const BankingProvider = ({ children }: { children: ReactNode }) => {
    const initialData = getInitialData();
    
    const defaultUser: UserData = {
        name: "Client Démo",
        email: "client@example.com",
        memberSince: new Date().toLocaleDateString('fr-FR'),
    };

    const defaultAccount: AccountData = {
        iban: "FR00 0000 0000 0000 0000 0000 000",
        bic: "DEMOFRPP",
        initialBalance: 0,
        initialTransactions: [],
    };
    
    const [user] = useState<UserData>(initialData?.user || defaultUser);
    const [account] = useState<AccountData>(initialData?.account || defaultAccount);
    const [balance, setBalance] = useState<number>(account.initialBalance ?? 0);
    const [transactions, setTransactions] = useState<Transaction[]>(account.initialTransactions ?? []);

    const addTransaction = (tx: Omit<Transaction, 'id' | 'date'>) => {
        const newTransaction: Transaction = {
            ...tx,
            id: uuidv4(),
            date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }),
        };

        setTransactions(prev => [...prev, newTransaction]);
        setBalance(prev => prev + newTransaction.amount);
    };

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
