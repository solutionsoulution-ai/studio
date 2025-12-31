
"use client";
import React, { createContext, useContext } from 'react';
import type { Language } from '@/data/documents/languages';
import type { Currency } from './DocumentPageClient';

// This context will hold the form data for the preview to consume.
// The form will be the provider, and the preview will be the consumer.
export const DocumentGeneratorContext = createContext<{
    formData: any;
    lang: Language;
    currency: Currency;
} | null>(null);


export const useDocumentGenerator = () => {
    const context = useContext(DocumentGeneratorContext);
    if (!context) {
        throw new Error('useDocumentGenerator must be used within a DocumentGeneratorContext.Provider');
    }
    return context;
};
