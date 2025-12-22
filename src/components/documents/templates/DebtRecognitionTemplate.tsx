import React from 'react';
import { debtRecognitionClauses } from '@/data/documents/debt-recognition-clauses';
import { signatureData } from '@/data/documents/signature-data';
import DocumentWrapper from './DocumentWrapper';
import ArticleHeader from './ArticleHeader';
import { useBrand } from '@/context/BrandContext';

const DebtRecognitionTemplate: React.FC<{ formData: any; lang: 'fr' | 'en' | 'de' }> = ({ formData, lang }) => {
    const { companyInfo } = useBrand();
    const clauses = debtRecognitionClauses(companyInfo.name)[lang] || debtRecognitionClauses(companyInfo.name)['fr'];
    const signer = signatureData(companyInfo.brandKey).legal;

    const replacePlaceholders = (text: string) => {
        if (!text) return '';
        return text
            .replace(/{ref}/g, formData.ref || '')
            .replace(/{date}/g, formData.date ? new Date(formData.date).toLocaleDateString(lang) : '')
            .replace(/{debtor_name}/g, formData.debtor_name || '')
            .replace(/{debtor_address}/g, formData.debtor_address || '')
            .replace(/{debtor_id}/g, formData.debtor_id || '')
            .replace(/{loan_amount}/g, formData.loan_amount ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(formData.loan_amount) : '')
            .replace(/{loan_amount_in_words}/g, formData.loan_amount_in_words || '')
            .replace(/{loan_contract_ref}/g, formData.loan_contract_ref || '')
            .replace(/{loan_term}/g, formData.loan_term || '')
            .replace(/{type_of_loan}/g, formData.type_of_loan || '');
    };

    return (
        <DocumentWrapper 
            title={replacePlaceholders(clauses.title)}
            department={clauses.header.line2}
            docRef={replacePlaceholders(clauses.reference)}
            docDate={replacePlaceholders(clauses.date)}
            lang={lang}
        >
            <section className="mb-6">
                 <h2 className="text-sm font-bold uppercase text-primary mb-3">{clauses.parties.title}</h2>
                 <div className="grid grid-cols-2 gap-6 text-xs">
                     <div>
                         <h3 className="font-semibold underline mb-1">{clauses.parties.creditor_label}</h3>
                         <p>{companyInfo.name}</p>
                         <p>{companyInfo.address}</p>
                     </div>
                     <div>
                         <h3 className="font-semibold underline mb-1">{clauses.parties.debtor_label}</h3>
                         <p>Nom: {formData.debtor_name || ''}</p>
                         <p>Adresse: {formData.debtor_address || ''}</p>
                         <p>ID: {formData.debtor_id || ''}</p>
                     </div>
                 </div>
            </section>
            
            <section className="space-y-4 text-sm leading-relaxed">
                {Object.values(clauses.articles).map((article: any, index: number) => (
                    <article key={index}>
                        <ArticleHeader title={article.title} />
                        <p>{replacePlaceholders(article.content)}</p>
                    </article>
                ))}
            </section>

             <div className="mt-16 pt-8 grid grid-cols-2 gap-16 text-xs" style={{ pageBreakInside: 'avoid' }}>
                <div className="text-center">
                    <div className="h-20"></div>
                    <div className="border-t border-slate-400 pt-2">
                        <p className="font-bold">{clauses.parties.debtor_label}</p>
                        <p className="text-muted-foreground">Lu et approuvé</p>
                    </div>
                </div>
                <div className="text-center">
                    {signer.signatureUrl && <img src={signer.signatureUrl} alt={`Signature de ${signer.name}`} style={{ width: '150px', height: '50px', margin: '0 auto', mixBlendMode: 'darken' }} />}
                    <div className="border-t border-slate-400 pt-2">
                         <p className="font-bold">{clauses.parties.creditor_label}</p>
                         <p className="text-muted-foreground">{signer.name}, {signer.title[lang]}</p>
                    </div>
                </div>
            </div>

        </DocumentWrapper>
    );
};

export default DebtRecognitionTemplate;
