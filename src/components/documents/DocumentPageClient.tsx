
"use client";
import React, { useMemo, useState } from 'react';
import { DocumentGeneratorContext } from "@/components/documents/DocumentGenerator";
import DocumentForm from "@/components/documents/DocumentForm";
import DocumentPreview from "@/components/documents/DocumentPreview";
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
import type { Language } from '@/data/documents/languages';

export type Currency = 'EUR' | 'USD';

const vantexLoanDefaultValues = {
  type_of_loan: 'Prêt Personnel Amortissable',
  contract_ref: 'PR-88210',
  contract_date: '2025-12-30',
  borrower_name: 'Sophie Martin',
  borrower_address: '',
  borrower_id: '',
  loan_amount: 15000,
  loan_amount_in_words: 'quinze mille',
  loan_amount_in_words_dollars: 'fifteen thousand',
  taeg: '4.5%',
  loan_term: 48,
  start_date: '2024-03-05',
  end_date: '',
  monthly_payment: 342.05,
  total_cost: 1418.51,
  total_due: 16418.51,
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

const documentTemplates: { [key: string]: React.FC<any> } = {
  'reconnaissance-de-dette': DebtRecognitionTemplate,
  'attestation-eligibilite': EligibilityCertificateTemplate,
  'contrat-de-pret-personnel': LoanContractTemplate,
  'acte-de-cautionnement-solidaire': SuretyBondTemplate,
  'attestation-assurance-emprunteur': InsuranceCertificateTemplate,
  'notice-information-assurance': InsuranceNoticeTemplate,
  'facture-neofonds': NeofondsInvoiceTemplate,
  'recu-neofonds': NeofondsReceiptTemplate,
  'licence-bancaire': BankingLicenseTemplate,
  'autorisation-courtage': BrokerageAuthorizationTemplate,
  'certificat-non-blanchiment': AmlCertificateTemplate,
  'document-vierge': BlankDocumentTemplate,
};

export default function DocumentPageClient({ slug }: { slug: string }) {
  const { brand } = useBrand();

  const initialData = useMemo(() => {
    if (brand === 'vantex' && slug === 'contrat-de-pret-personnel') {
      return vantexLoanDefaultValues;
    }
    return getDefaultValuesForDoc(slug);
  }, [brand, slug]);
  
  const [formData, setFormData] = useState(initialData);
  const [lang, setLang] = useState<Language>('fr');
  const [currency, setCurrency] = useState<Currency>('EUR');

  const TemplateComponent = documentTemplates[slug];

  const contextValue = useMemo(() => ({
    formData,
    lang,
    currency,
  }), [formData, lang, currency]);
  
  return (
      <DocumentGeneratorContext.Provider value={contextValue}>
        <div className="flex flex-col lg:flex-row w-full min-h-screen bg-muted/20">
          <div className="w-full lg:w-1/3 lg:h-screen lg:overflow-y-auto p-4">
              <DocumentForm 
                  documentType={slug} 
                  initialData={initialData}
                  onFormChange={setFormData}
                  onLangChange={setLang}
                  onCurrencyChange={setCurrency}
              />
          </div>
          <div className="w-full lg:w-2/3 h-auto lg:h-screen lg:overflow-y-auto p-4">
              <DocumentPreview>
                  {TemplateComponent ? <TemplateComponent /> : <p>Modèle non trouvé</p>}
              </DocumentPreview>
          </div>
        </div>
      </DocumentGeneratorContext.Provider>
  );
}
