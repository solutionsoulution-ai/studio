
"use client";
import React, { useState } from 'react';
import DocumentForm from './DocumentForm';
import DocumentPreview from './DocumentPreview';
import DebtRecognitionTemplate from './templates/DebtRecognitionTemplate';
import EligibilityCertificateTemplate from './templates/EligibilityCertificateTemplate';
import LoanContractTemplate from './templates/LoanContractTemplate';
import SuretyBondTemplate from './templates/SuretyBondTemplate';
import InsuranceCertificateTemplate from './templates/InsuranceCertificateTemplate';
import InsuranceNoticeTemplate from './templates/InsuranceNoticeTemplate';
import InvoiceTemplate from './templates/InvoiceTemplate';
import BlankDocumentTemplate from './templates/BlankDocumentTemplate';
import PaymentReceiptTemplate from './templates/PaymentReceiptTemplate';
import type { Language } from '@/data/documents/languages';

const documentTemplates: { [key: string]: React.FC<any> } = {
  'reconnaissance-de-dette': DebtRecognitionTemplate,
  'attestation-eligibilite': EligibilityCertificateTemplate,
  'contrat-de-pret-personnel': LoanContractTemplate,
  'acte-de-cautionnement-solidaire': SuretyBondTemplate,
  'attestation-assurance-emprunteur': InsuranceCertificateTemplate,
  'notice-information-assurance': InsuranceNoticeTemplate,
  'facture': InvoiceTemplate,
  'recu-de-paiement': PaymentReceiptTemplate,
  'document-vierge': BlankDocumentTemplate,
};

const DocumentGeneratorContext = React.createContext<{
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
    lang: Language;
    setLang: React.Dispatch<React.SetStateAction<Language>>;
} | null>(null);

const useDocumentGenerator = () => {
    const context = React.useContext(DocumentGeneratorContext);
    if (!context) {
        throw new Error('useDocumentGenerator must be used within a DocumentGeneratorProvider');
    }
    return context;
};

const DocumentGeneratorProvider = ({ children }: { children: React.ReactNode }) => {
    const [formData, setFormData] = useState({});
    const [lang, setLang] = useState<Language>('fr');

    return (
        <DocumentGeneratorContext.Provider value={{ formData, setFormData, lang, setLang }}>
            {children}
        </DocumentGeneratorContext.Provider>
    );
};


const DocumentGenerator = ({ documentType }: { documentType: string }) => {
    return (
        <DocumentGeneratorProvider>
            <DocumentForm
                documentType={documentType}
            />
        </DocumentGeneratorProvider>
    );
};

DocumentGenerator.Preview = function DocumentGeneratorPreview({ documentType }: { documentType: string }) {
    const { formData, lang } = useDocumentGenerator();
    const TemplateComponent = documentTemplates[documentType];

    return (
        <DocumentPreview>
            {TemplateComponent ? <TemplateComponent formData={formData} lang={lang} /> : <p>Modèle non trouvé</p>}
        </DocumentPreview>
    );
}

export { useDocumentGenerator };
export default DocumentGenerator;
