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

interface BankingState {
    balance: number;
    transactions: Transaction[];
    addTransaction: (tx: Omit<Transaction, 'id' | 'date'>) => void;
}

const BankingContext = createContext<BankingState | undefined>(undefined);

export const BankingProvider = ({ children }: { children: ReactNode }) => {
    const [balance, setBalance] = useState<number>(0);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

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
        <BankingContext.Provider value={{ balance, transactions, addTransaction }}>
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
