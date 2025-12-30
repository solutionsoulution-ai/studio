
"use client";
import React, { useState, useEffect } from 'react';
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
import AmlCertificateTemplate from './templates/AmlCertificateTemplate';
import { useBrand } from '@/context/BrandContext';
import { documentFields } from '@/lib/document-fields';

export type Currency = 'EUR' | 'USD';

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
  'certificat-non-blanchiment': AmlCertificateTemplate,
  'document-vierge': BlankDocumentTemplate,
};

const vantexLoanDefaultValues = {
  type_of_loan: 'Prêt Personnel Amortissable',
  contract_ref: 'PR-88210',
  contract_date: '2025-12-30',
  borrower_name: 'Sophie Martin',
  borrower_address: '',
  borrower_id: '',
  loan_amount: 15000,
  loan_amount_in_words: 'quinze mille',
  taeg: '4.5%',
  loan_term: 48,
  start_date: '2024-03-05',
  end_date: '',
  monthly_payment: 342.05,
  total_cost: 1418.51,
  total_due: 16418.51,
  loan_amount_in_words_dollars: '15 mille dollars'
};

const getDefaultValuesForDoc = (docSlug: string) => {
  const fields = documentFields[docSlug as keyof typeof documentFields] || [];
  const defaultVals: any = {};
  fields.forEach(field => {
    if (field.type === 'group' && field.fields) {
      field.fields.forEach(subField => {
        defaultVals[subField.name] = subField.defaultValue ?? '';
      });
    } else {
      defaultVals[field.name] = field.defaultValue ?? '';
    }
  });
  return defaultVals;
}

export default function DocumentPageClient({ slug }: { slug: string }) {
  const [formData, setFormData] = useState(() => getDefaultValuesForDoc(slug));
  const [lang, setLang] = useState<Language>('fr');
  const [currency, setCurrency] = useState<Currency>('EUR');
  const { brand } = useBrand();

  useEffect(() => {
    if (brand === 'vantex' && slug === 'contrat-de-pret-personnel') {
      setFormData(vantexLoanDefaultValues);
    } else {
      setFormData(getDefaultValuesForDoc(slug));
    }
  }, [brand, slug]);


  const TemplateComponent = documentTemplates[slug];

  return (
    <DocumentGeneratorContext.Provider value={{ formData, setFormData, lang, setLang, currency, setCurrency }}>
      <div className="flex flex-col lg:flex-row w-full min-h-screen bg-muted/20">
        <div className="w-full lg:w-1/3 lg:h-screen lg:overflow-y-auto p-4">
          <DocumentGenerator documentType={slug} />
        </div>
        <div className="w-full lg:w-2/3 h-auto lg:h-screen lg:overflow-y-auto p-4">
          <DocumentPreview>
              {TemplateComponent ? <TemplateComponent formData={formData} lang={lang} currency={currency} /> : <p>Modèle non trouvé</p>}
          </DocumentPreview>
        </div>
      </div>
    </DocumentGeneratorContext.Provider>
  );
}
