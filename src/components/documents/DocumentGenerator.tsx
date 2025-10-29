
"use client";
import React from 'react';
import DocumentForm from './DocumentForm';
import type { Language } from '@/data/documents/languages';

export const DocumentGeneratorContext = React.createContext<{
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
    lang: Language;
    setLang: React.Dispatch<React.SetStateAction<Language>>;
} | null>(null);

export const useDocumentGenerator = () => {
    const context = React.useContext(DocumentGeneratorContext);
    if (!context) {
        throw new Error('useDocumentGenerator must be used within a DocumentGeneratorContext.Provider');
    }
    return context;
};

const DocumentGenerator = ({ documentType }: { documentType: string }) => {
    return (
        <DocumentForm
            documentType={documentType}
        />
    );
};

export default DocumentGenerator;
