
"use client";
import React, { createContext, useContext, useState } from 'react';
import type { Language } from '@/data/documents/languages';
import type { Currency } from './DocumentPageClient';

// Define the shape of the context data
export interface DocumentGeneratorContextType {
    formData: any;
    lang: Language;
    setLang: React.Dispatch<React.SetStateAction<Language>>;
    currency: Currency;
    setCurrency: React.Dispatch<React.SetStateAction<Currency>>;
}

// Create the context with a default null value
export const DocumentGeneratorContext = createContext<DocumentGeneratorContextType | null>(null);

// Custom hook to use the document generator context
export const useDocumentGenerator = () => {
    const context = useContext(DocumentGeneratorContext);
    if (!context) {
        throw new Error('useDocumentGenerator must be used within a DocumentGeneratorContext.Provider');
    }
    return context;
};
