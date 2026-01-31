
import React from 'react';
import Image from 'next/image';
import { loanContractClauses } from '@/data/documents/loan-contract-clauses';
import { signatureData } from '@/data/documents/signature-data';
import DocumentWrapper from '../DocumentWrapper';
import ArticleHeader from './ArticleHeader';
import { useBrand } from '@/context/BrandContext';
import { Language } from '@/data/documents/languages';
import { Currency } from '../DocumentPageClient';

interface LoanContractTemplateProps {
    formData: any;
    lang: Language;
    currency: Currency;
}

const LoanContractTemplate: React.FC<LoanContractTemplateProps> = ({ formData, lang, currency }) => {
    const { companyInfo } = useBrand();

    const clauses = (loanContractClauses(companyInfo.city)[lang] || loanContractClauses(companyInfo.city)['fr']);
    const signer = signatureData().ceo;

    const formatCurrency = (amount: number) => {
        if (isNaN(amount) || amount === null) return '';
        return new Intl.NumberFormat(lang, { style: 'currency', currency: currency }).format(amount);
    }
    
    const loanAmountInWords = currency === 'USD' ? formData.loan_amount_in_words_dollars : formData.loan_amount_in_words;
    
    const totalDue = (formData.total_due || 0) + (formData.reimbursed_fees || 0);

    const replacePlaceholders = (text: string) => {
        if (!text) return '';
        return text
            .replace(/{type_of_loan}/g, formData.type_of_loan || '___________')
            .replace(/{contract_ref}/g, formData.contract_ref || '___________')
            .replace(/{contract_date}/g, formData.contract_date ? new Date(formData.contract_date).toLocaleDateString(lang) : '___________')
            .replace(/{borrower_name}/g, formData.borrower_name || '___________')
            .replace(/{borrower_address}/g, formData.borrower_address || '___________')
            .replace(/{borrower_id}/g, formData.borrower_id || '___________')
            .replace(/{loan_amount}/g, formatCurrency(formData.loan_amount))
            .replace(/{loan_amount_in_words}/g, loanAmountInWords || '___________')
            .replace(/{taeg}/g, formData.taeg || '___________')
            .replace(/{loan_term}/g, formData.loan_term || '___________')
            .replace(/{availability_days}/g, formData.availability_days || '10')
            .replace(/{start_date}/g, formData.start_date ? new Date(formData.start_date).toLocaleDateString(lang) : '___________')
            .replace(/{total_cost}/g, formatCurrency(formData.total_cost))
            .replace(/{monthly_payment}/g, formatCurrency(formData.monthly_payment))
            .replace(/{total_due}/g, formatCurrency(totalDue))
            .replace(/{reimbursed_fees}/g, formatCurrency(formData.reimbursed_fees))
            .replace(/{withdrawal_days}/g, formData.withdrawal_days || '14')
            .replace(/{contact_email}/g, companyInfo.email);
    };

    const articles = Object.entries(clauses.articles || {});

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
                     </div>
                     <div>
                         <h3 className="font-semibold underline mb-1">{clauses.parties.borrower_label}</h3>
                         <p>Nom: {formData.borrower_name || ''}</p>
                     </div>
                 </div>
            </section>

             <section className="space-y-4 text-sm leading-relaxed">
                {articles.map(([key, article]: [string, any]) => {
                    return (
                        <article key={key}>
                            <ArticleHeader title={article.title} />
                            {key === 'characteristics' ? (
                                <ul className="text-xs bg-muted p-3 rounded-md space-y-1">
                                    <li>{replacePlaceholders(article.amount)}</li>
                                    <li>{replacePlaceholders(article.taeg)}</li>
                                    <li>{replacePlaceholders(article.term)}</li>
                                    <li>{replacePlaceholders(article.availability)}</li>
                                </ul>
                            ) : key === 'repayment' ? (
                                <>
                                    <p>{replacePlaceholders(article.intro)}</p>
                                    <div className="text-xs bg-muted p-3 rounded-md mt-2 space-y-1">
                                        <p>{replacePlaceholders(article.monthly_payment)}</p>
                                        <p>{replacePlaceholders(article.total_cost)}</p>
                                        <p className="font-semibold">{replacePlaceholders(article.total_due)}</p>
                                    </div>
                                </>
                            ) : (
                                <p>{replacePlaceholders(article.content)}</p>
                            )}
                        </article>
                    )
                })}
            </section>
            
            <p className="text-center mt-8 text-xs">{clauses.signature_preamble}</p>
            <div className="mt-10 pt-8 grid grid-cols-2 gap-16 text-xs" style={{ pageBreakInside: 'avoid' }}>
                <div className="text-center">
                    <div className="h-20"></div>
                    <div className="border-t border-slate-400 pt-2">
                        <p className="font-bold">{clauses.parties.borrower_label}</p>
                        <p className="text-muted-foreground">{clauses.parties.read_and_approved}</p>
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
