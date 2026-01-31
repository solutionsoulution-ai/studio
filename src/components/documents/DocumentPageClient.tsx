
"use client";
import React, { useMemo, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
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
import VantexReceiptTemplate from './templates/VantexReceiptTemplate';
import VantexInvoiceTemplate from './templates/VantexInvoiceTemplate';
import AmlCertificateTemplate from './templates/AmlCertificateTemplate';
import WireAuthorizationTemplate from './templates/WireAuthorizationTemplate';
import { documentFields } from '@/lib/document-fields';
import type { Language } from '@/data/documents/languages';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export type Currency = 'EUR' | 'USD';

const vantexLoanDefaultValues = {
  type_of_loan: 'Prêt Personnel Amortissable',
  contract_ref: 'PR-88210',
  contract_date: '2025-12-30',
  borrower_name: 'Sophie Martin',
  borrower_address: '',
  borrower_id: '',
  loan_amount: 30000,
  loan_amount_in_words: 'trente mille',
  loan_amount_in_words_dollars: 'thirty thousand',
  taeg: '2.00%',
  loan_term: 120,
  availability_days: 10,
  start_date: '2024-03-05',
  monthly_payment: 276.01,
  total_cost: 3121.20,
  total_due: 33648.20,
  reimbursed_fees: 527,
  withdrawal_days: 14,
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
  'facture-vantex': VantexInvoiceTemplate,
  'recu-vantex': VantexReceiptTemplate,
  'licence-bancaire': BankingLicenseTemplate,
  'autorisation-courtage': BrokerageAuthorizationTemplate,
  'certificat-non-blanchiment': AmlCertificateTemplate,
  'autorisation-virement': WireAuthorizationTemplate,
  'document-vierge': BlankDocumentTemplate,
};

export default function DocumentPageClient({ slug }: { slug: string }) {
  const pathname = usePathname();

  const initialData = useMemo(() => {
    if (slug === 'contrat-de-pret-personnel') {
      return vantexLoanDefaultValues;
    }
    return getDefaultValuesForDoc(slug);
  }, [slug]);
  
  const [formData, setFormData] = useState(initialData);
  const [lang, setLang] = useState<Language>('fr');
  const [currency, setCurrency] = useState<Currency>('USD');

  const TemplateComponent = documentTemplates[slug];
  
  const handleFormChange = useCallback((data: any) => {
    setFormData(data);
  }, []);
  
  return (
      <>
        <div className="w-full p-4 bg-background border-b flex justify-between items-center">
            {pathname !== '/validator' ? (
                <Button asChild variant="outline" size="sm">
                    <Link href="/documents">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour à la liste
                    </Link>
                </Button>
            ) : (
                <div />
            )}
            <div className="flex items-center gap-4">
                 <div className="space-y-1">
                  <Label className="text-xs">Langue</Label>
                  <Select onValueChange={(v) => setLang(v as Language)} defaultValue="fr">
                      <SelectTrigger className="h-8 w-32">
                        <SelectValue placeholder="Langue" />
                      </SelectTrigger>
                      <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="lt">Lietuvių</SelectItem>
                      <SelectItem value="nl">Nederlands</SelectItem>
                      </SelectContent>
                  </Select>
                  </div>
                   <div className="space-y-1">
                      <Label className="text-xs">Devise</Label>
                      <Select onValueChange={(v) => setCurrency(v as Currency)} defaultValue="USD">
                          <SelectTrigger className="h-8 w-32">
                              <SelectValue placeholder="Devise" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="EUR">Euro (€)</SelectItem>
                              <SelectItem value="USD">Dollar ($)</SelectItem>
                          </SelectContent>
                      </Select>
                  </div>
            </div>
        </div>
        <div className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-81px)] bg-muted/20">
          <div className="w-full lg:w-1/3 lg:h-[calc(100vh-81px)] lg:overflow-y-auto p-4">
              <DocumentForm 
                  documentType={slug} 
                  initialData={initialData}
                  onFormChange={handleFormChange}
                  lang={lang}
                  currency={currency}
              />
          </div>
          <div className="w-full lg:w-2/3 h-auto lg:h-[calc(100vh-81px)] lg:overflow-y-auto p-4">
              <DocumentPreview>
                  {TemplateComponent ? React.cloneElement(<TemplateComponent />, { formData, lang, currency }) : <p>Modèle non trouvé pour le slug: {slug}</p>}
              </DocumentPreview>
          </div>
        </div>
      </>
  );
}
