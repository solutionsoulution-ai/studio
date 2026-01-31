
import React from 'react';
import { wireAuthorizationClauses } from '@/data/documents/wire-authorization-clauses';
import { signatureData } from '@/data/documents/signature-data';
import DocumentWrapper from '../DocumentWrapper';
import ArticleHeader from './ArticleHeader';
import { useBrand } from '@/context/BrandContext';
import { Language } from '@/data/documents/languages';
import { Currency } from '../DocumentPageClient';

interface WireAuthorizationTemplateProps {
    formData: any;
    lang: Language;
    currency: Currency;
}

const WireAuthorizationTemplate: React.FC<WireAuthorizationTemplateProps> = ({ formData, lang, currency }) => {
    const { companyInfo } = useBrand();
    const clausesData = wireAuthorizationClauses(companyInfo.name);
    const clauses = clausesData[lang] || clausesData['fr'];
    const financeSigner = signatureData().finance;
    const legalSigner = signatureData().legal;

    const replacePlaceholders = (text: string) => {
        if (!text) return '';
        return text
            .replace(/{ref}/g, formData.ref || '___________')
            .replace(/{date}/g, formData.date ? new Date(formData.date).toLocaleDateString(lang) : '___________')
            .replace(/{loan_contract_ref}/g, formData.loan_contract_ref || '___________')
            .replace(/{loan_amount}/g, formData.loan_amount ? new Intl.NumberFormat(lang, { style: 'currency', currency }).format(formData.loan_amount) : '___________')
            .replace(/{loan_amount_in_words}/g, formData.loan_amount_in_words || '___________')
            .replace(/{borrower_name}/g, formData.borrower_name || '___________');
    };

    return (
        <DocumentWrapper
            title={clauses.title}
            department={clauses.header.line2}
            docRef={replacePlaceholders(clauses.reference)}
            docDate={replacePlaceholders(clauses.date)}
            lang={lang}
        >
            <section className="space-y-4 text-sm leading-relaxed">
                <article>
                    <ArticleHeader title={clauses.articles.authorization.title} />
                    <p>{replacePlaceholders(clauses.articles.authorization.content)}</p>
                </article>

                <article>
                    <ArticleHeader title={clauses.articles.bank_details.title} />
                    <div className="bg-muted p-4 rounded-md text-xs grid grid-cols-2 gap-x-6 gap-y-2">
                        <div>
                            <p className="font-semibold text-muted-foreground">{clauses.articles.bank_details.bank_name_label}:</p>
                            <p className="font-mono">{formData.bank_name || '________________'}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-muted-foreground">{clauses.articles.bank_details.account_holder_label}:</p>
                            <p className="font-mono">{formData.account_holder || '________________'}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-muted-foreground">{clauses.articles.bank_details.iban_label}:</p>
                            <p className="font-mono">{formData.iban || '________________'}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-muted-foreground">{clauses.articles.bank_details.bic_swift_label}:</p>
                            <p className="font-mono">{formData.bic_swift || '________________'}</p>
                        </div>
                    </div>
                </article>
                
                <article>
                    <ArticleHeader title={clauses.articles.execution_terms.title} />
                    <p className="text-xs italic">{replacePlaceholders(clauses.articles.execution_terms.content)}</p>
                </article>
                
                <article>
                    <ArticleHeader title={clauses.articles.liability.title} />
                    <p className="text-xs italic">{replacePlaceholders(clauses.articles.liability.content)}</p>
                </article>

                <article>
                    <ArticleHeader title={clauses.articles.proof.title} />
                    <p>{replacePlaceholders(clauses.articles.proof.content)}</p>
                </article>
            </section>

            <div className="mt-16 pt-8 grid grid-cols-2 gap-16 text-xs" style={{ pageBreakInside: 'avoid' }}>
                <div className="text-center">
                     <p className="text-muted-foreground">Pour {companyInfo.name},</p>
                    <div className="h-12 flex items-center justify-center">
                        <img src={financeSigner.signatureUrl} alt={`Signature de ${financeSigner.name}`} style={{ height: '40px', objectFit: 'contain', mixBlendMode: 'darken' }} />
                    </div>
                    <div className="border-t border-slate-400 pt-2">
                         <p className="font-bold">{financeSigner.name}</p>
                         <p className="text-muted-foreground">{financeSigner.title[lang]}</p>
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-muted-foreground">Pour {companyInfo.name},</p>
                    <div className="h-12 flex items-center justify-center">
                        <img src={legalSigner.signatureUrl} alt={`Signature de ${legalSigner.name}`} style={{ height: '40px', objectFit: 'contain', mixBlendMode: 'darken' }} />
                    </div>
                    <div className="border-t border-slate-400 pt-2">
                         <p className="font-bold">{legalSigner.name}</p>
                         <p className="text-muted-foreground">{legalSigner.title[lang]}</p>
                    </div>
                </div>
            </div>
        </DocumentWrapper>
    );
};

export default WireAuthorizationTemplate;
