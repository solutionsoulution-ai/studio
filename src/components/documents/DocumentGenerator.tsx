
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

type Language = 'fr' | 'en';

const documentTemplates: { [key: string]: React.FC<any> } = {
  'reconnaissance-de-dette': DebtRecognitionTemplate,
  'attestation-eligibilite': EligibilityCertificateTemplate,
  'contrat-de-pret-personnel': LoanContractTemplate,
  'acte-de-cautionnement-solidaire': SuretyBondTemplate,
  'attestation-assurance-emprunteur': InsuranceCertificateTemplate,
  'notice-information-assurance': InsuranceNoticeTemplate,
  'facture': InvoiceTemplate,
  'document-vierge': BlankDocumentTemplate,
};

const DocumentGenerator = ({ documentType }: { documentType: string }) => {
  const [formData, setFormData] = useState({});
  const [lang, setLang] = useState<Language>('fr');

  const handleFormChange = (data: any) => {
    setFormData(data);
  };
  
  const handleLanguageChange = (newLang: Language) => {
      setLang(newLang);
  }

  const TemplateComponent = documentTemplates[documentType];

  return (
    <div className="container mx-auto py-8">
      <div className="grid lg:grid-cols-2 gap-8 h-full">
        <div className="lg:h-[calc(100vh-10rem)] lg:overflow-y-auto pr-4">
          <DocumentForm 
            documentType={documentType} 
            onFormChange={handleFormChange}
            onLanguageChange={handleLanguageChange}
            initialLang={lang}
          />
        </div>
        <div className="lg:h-[calc(100vh-10rem)]">
          <DocumentPreview>
            {TemplateComponent ? <TemplateComponent formData={formData} lang={lang} /> : <p>Modèle non trouvé</p>}
          </DocumentPreview>
        </div>
      </div>
    </div>
  );
};

export default DocumentGenerator;
