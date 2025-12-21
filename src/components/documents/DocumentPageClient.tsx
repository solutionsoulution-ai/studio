
"use client";
import React, { useState } from 'react';
import DocumentGenerator, { DocumentGeneratorContext } from "@/components/documents/DocumentGenerator";
import DocumentPreview from "@/components/documents/DocumentPreview";
import type { Language } from '@/data/documents/languages';
import DebtRecognitionTemplate from '@/components/documents/templates/DebtRecognitionTemplate';
import EligibilityCertificateTemplate from '@/components/documents/templates/EligibilityCertificateTemplate';
import LoanContractTemplate from '@/components/documents/templates/LoanContractTemplate';
import SuretyBondTemplate from '@/components/documents/templates/SuretyBondTemplate';
import InsuranceCertificateTemplate from '@/components/documents/templates/InsuranceCertificateTemplate';
import InsuranceNoticeTemplate from '@/components/documents/templates/InsuranceNoticeTemplate';
import BlankDocumentTemplate from '@/components/documents/templates/BlankDocumentTemplate';
import BankingLicenseTemplate from '@/components/documents/templates/BankingLicenseTemplate';
import BrokerageAuthorizationTemplate from '@/components/documents/templates/BrokerageAuthorizationTemplate';
import NeofondsReceiptTemplate from './templates/NeofondsReceiptTemplate';
import NeofondsInvoiceTemplate from './templates/NeofondsInvoiceTemplate';

const documentTemplates: { [key: string]: React.FC<any> } = {
  'reconnaissance-de-dette': DebtRecognitionTemplate,
  'attestation-eligibilite': EligibilityCertificateTemplate,
  'contrat-de-pret-personnel': LoanContractTemplate,
  'acte-de-cautionnement-solidaire': SuretyBondTemplate,
  'attestation-assurance-emprunteur': InsuranceCertificateTemplate,
  'notice-information-assurance': InsuranceNoticeTemplate,
  'licence-bancaire': BankingLicenseTemplate,
  'autorisation-courtage': BrokerageAuthorizationTemplate,
  'recu-neofonds': NeofondsReceiptTemplate,
  'facture-neofonds': NeofondsInvoiceTemplate,
  'document-vierge': BlankDocumentTemplate,
};

export default function DocumentPageClient({ slug }: { slug: string }) {
  const [formData, setFormData] = useState({});
  const [lang, setLang] = useState<Language>('fr');

  const TemplateComponent = documentTemplates[slug];

  return (
    <DocumentGeneratorContext.Provider value={{ formData, setFormData, lang, setLang }}>
      <div className="flex flex-col lg:flex-row w-full min-h-screen bg-muted/20">
        <div className="w-full lg:w-1/3 lg:h-screen lg:overflow-y-auto p-4">
          <DocumentGenerator documentType={slug} />
        </div>
        <div className="w-full lg:w-2/3 h-auto lg:h-screen lg:overflow-y-auto p-4">
          <DocumentPreview>
              {TemplateComponent ? <TemplateComponent formData={formData} lang={lang} /> : <p>Modèle non trouvé</p>}
          </DocumentPreview>
        </div>
      </div>
    </DocumentGeneratorContext.Provider>
  );
}
