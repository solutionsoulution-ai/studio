
import React from 'react';
import Image from 'next/image';
import { loanContractClauses } from '@/data/documents/loan-contract-clauses';
import { signatureData } from '@/data/documents/signature-data';
import DocumentWrapper from './DocumentWrapper';
import ArticleHeader from './ArticleHeader';
import { useBrand } from '@/context/BrandContext';

interface LoanContractTemplateProps {
    formData: any;
    lang: 'fr' | 'en' | 'de' | 'lt';
}

const LoanContractTemplate: React.FC<LoanContractTemplateProps> = ({ formData, lang }) => {
    const { companyInfo } = useBrand();
    const clauses = loanContractClauses(companyInfo.city)[lang] || loanContractClauses(companyInfo.city)['fr'];
    const signer = signatureData(companyInfo.brandKey).ceo;

    const replacePlaceholders = (text: string) => {
        if (!text) return '';
        return text
            .replace(/{type_of_loan}/g, formData.type_of_loan || '')
            .replace(/{contract_ref}/g, formData.contract_ref || '')
            .replace(/{contract_date}/g, formData.contract_date ? new Date(formData.contract_date).toLocaleDateString(lang) : '')
            .replace(/{borrower_name}/g, formData.borrower_name || '')
            .replace(/{borrower_address}/g, formData.borrower_address || '')
            .replace(/{borrower_id}/g, formData.borrower_id || '')
            .replace(/{loan_amount}/g, formData.loan_amount ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(formData.loan_amount) : '')
            .replace(/{loan_amount_in_words}/g, formData.loan_amount_in_words || '')
            .replace(/{taeg}/g, formData.taeg || '')
            .replace(/{loan_term}/g, formData.loan_term || '')
            .replace(/{start_date}/g, formData.start_date ? new Date(formData.start_date).toLocaleDateString(lang) : '')
            .replace(/{end_date}/g, formData.end_date ? new Date(formData.end_date).toLocaleDateString(lang) : '')
            .replace(/{total_cost}/g, formData.total_cost ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(formData.total_cost) : '')
            .replace(/{monthly_payment}/g, formData.monthly_payment ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(formData.monthly_payment) : '')
            .replace(/{total_due}/g, formData.total_due ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(formData.total_due) : '')
            .replace(/{contact_email}/g, companyInfo.email);
    };

    return (
        <DocumentWrapper
            title={replacePlaceholders(clauses.title)}
            department={clauses.header.line2}
            docRef={replacePlaceholders(clauses.reference)}
            docDate={replacePlaceholders(clauses.location_and_date)}
            lang={lang}
        >
             <section className="mb-6">
                 <h2 className="text-sm font-bold uppercase text-primary mb-3">{clauses.parties.title}</h2>
                 <div className="grid grid-cols-2 gap-6 text-xs">
                     <div>
                         <h3 className="font-semibold underline mb-1">{clauses.parties.lender_label}</h3>
                         <p>{companyInfo.name}</p>
                         <p>{companyInfo.address}</p>
                     </div>
                     <div>
                         <h3 className="font-semibold underline mb-1">{clauses.parties.borrower_label}</h3>
                         <p>Nom: {formData.borrower_name || ''}</p>
                         <p>Adresse: {formData.borrower_address || ''}</p>
                         <p>ID: {formData.borrower_id || ''}</p>
                     </div>
                 </div>
            </section>

             <section className="space-y-4 text-sm leading-relaxed">
                <article>
                    <ArticleHeader title={clauses.articles.object.title} />
                    <p>{replacePlaceholders(clauses.articles.object.content)}</p>
                </article>
                <article>
                    <ArticleHeader title={clauses.articles.characteristics.title} />
                    <ul className="text-xs bg-muted p-3 rounded-md space-y-1">
                        <li>{replacePlaceholders(clauses.articles.characteristics.amount)}</li>
                        <li>{replacePlaceholders(clauses.articles.characteristics.taeg)}</li>
                        <li>{replacePlaceholders(clauses.articles.characteristics.term)}</li>
                        <li>{replacePlaceholders(clauses.articles.characteristics.availability)}</li>
                    </ul>
                </article>
                <article>
                    <ArticleHeader title={clauses.articles.repayment.title} />
                    <p>{replacePlaceholders(clauses.articles.repayment.intro)}</p>
                    <div className="text-xs bg-muted p-3 rounded-md mt-2 space-y-1">
                        <p>{replacePlaceholders(clauses.articles.repayment.monthly_payment)}</p>
                        <p>{replacePlaceholders(clauses.articles.repayment.total_cost)}</p>
                        <p className="font-semibold">{replacePlaceholders(clauses.articles.repayment.total_due)}</p>
                    </div>
                </article>
                 {Object.entries(clauses.articles).slice(3).map(([key, article]: [string, any]) => (
                    <article key={key}>
                        <ArticleHeader title={article.title} />
                        <p>{replacePlaceholders(article.content)}</p>
                    </article>
                ))}
            </section>
            
            <p className="text-center mt-8 text-xs">{clauses.signature_preamble}</p>
            <div className="mt-10 pt-8 grid grid-cols-2 gap-16 text-xs" style={{ pageBreakInside: 'avoid' }}>
                <div className="text-center">
                    <div className="h-20"></div>
                    <div className="border-t border-slate-400 pt-2">
                        <p className="font-bold">{clauses.parties.borrower_label}</p>
                        <p className="text-muted-foreground">Lu et approuvé</p>
                    </div>
                </div>
                <div className="text-center">
                    {signer.signatureUrl && <Image src={signer.signatureUrl} alt={`Signature de ${signer.name}`} width={150} height={50} style={{ margin: '0 auto', mixBlendMode: 'darken' }} />}
                    <div className="border-t border-slate-400 pt-2">
                         <p className="font-bold">{clauses.parties.lender_label}</p>
                         <p className="text-muted-foreground">{signer.name}, {signer.title[lang]}</p>
                    </div>
                </div>
            </div>

        </DocumentWrapper>
    );
};

export default LoanContractTemplate;
