
"use client";
import React from 'react';
import DocumentForm from './DocumentForm';
import type { Language } from '@/data/documents/languages';
import type { Currency } from './DocumentPageClient';

// This context will hold the form data for the preview to consume.
// The form will be the provider, and the preview will be the consumer.
export const DocumentGeneratorContext = React.createContext<{
    formData: any;
    lang: Language;
    setLang: React.Dispatch<React.SetStateAction<Language>>;
    currency: Currency;
    setCurrency: React.Dispatch<React.SetStateAction<Currency>>;
} | null>(null);


export const useDocumentGenerator = () => {
    const context = React.useContext(DocumentGeneratorContext);
    if (!context) {
        throw new Error('useDocumentGenerator must be used within a DocumentGeneratorContext.Provider');
    }
    return context;
};

const DocumentGenerator = ({ documentType, initialData, children }: { documentType: string, initialData: any, children: React.ReactNode }) => {
    return (
       <DocumentForm initialData={initialData} documentType={documentType}>
         {children}
       </DocumentForm>
    );
};

export default DocumentGenerator;
