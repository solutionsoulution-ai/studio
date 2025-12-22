
import React from 'react';
import Image from 'next/image';
import { suretyBondClauses } from '@/data/documents/surety-bond-clauses';
import { signatureData } from '@/data/documents/signature-data';
import DocumentWrapper from './DocumentWrapper';
import ArticleHeader from './ArticleHeader';

interface SuretyBondTemplateProps {
    formData: any;
    lang: 'fr' | 'en' | 'de';
}

const SuretyBondTemplate: React.FC<SuretyBondTemplateProps> = ({ formData, lang }) => {
    const clauses = suretyBondClauses[lang] || suretyBondClauses['fr'];
    const signer = signatureData.legal;

    const replacePlaceholders = (text: string) => {
        if (!text) return '';
        return text
            .replace(/{type_of_loan}/g, formData.type_of_loan || '___________')
            .replace(/{act_ref}/g, formData.act_ref || '___________')
            .replace(/{date}/g, formData.date ? new Date(formData.date).toLocaleDateString(lang) : '___________')
            .replace(/{borrower_name}/g, formData.borrower_name || '___________')
            .replace(/{borrower_address}/g, formData.borrower_address || '___________')
            .replace(/{borrower_id}/g, formData.borrower_id || '___________')
            .replace(/{loan_contract_ref}/g, formData.loan_contract_ref || '___________')
            .replace(/{loan_amount}/g, formData.loan_amount ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(formData.loan_amount) : '___________')
            .replace(/{loan_amount_in_words}/g, formData.loan_amount_in_words || '___________')
            .replace(/{loan_term}/g, formData.loan_term || '___________')
            .replace(/{deposit_amount}/g, formData.deposit_amount ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(formData.deposit_amount) : '___________');
    };

    return (
        <DocumentWrapper
            title={replacePlaceholders(clauses.title)}
            department={clauses.header.line2}
            docRef={replacePlaceholders(clauses.reference)}
            docDate={`Date: ${replacePlaceholders('{date}')}`}
            lang={lang}
        >
            <section className="mb-6">
                 <h2 className="text-sm font-bold uppercase text-primary mb-3">{clauses.parties.title}</h2>
                 <div className="grid grid-cols-2 gap-6 text-xs">
                     <div>
                         <h3 className="font-semibold underline mb-1">{clauses.parties.creditor_label}</h3>
                         <p>Neofonds GmbH</p>
                         <p>Mainzer Landstraße 50, 60325 Frankfurt am Main, Deutschland</p>
                     </div>
                     <div>
                         <h3 className="font-semibold underline mb-1">{clauses.parties.debtor_label}</h3>
                         <p>Nom: {formData.borrower_name || ''}</p>
                         <p>Adresse: {formData.borrower_address || ''}</p>
                         <p>ID: {formData.borrower_id || ''}</p>
                     </div>
                 </div>
            </section>

            <section className="space-y-3 text-sm leading-relaxed">
                <article>
                    <ArticleHeader title={clauses.articles.object.title} />
                    <p className="text-xs">{replacePlaceholders(clauses.articles.object.content)}</p>
                     <ul className="text-xs bg-muted p-2 rounded-md mt-1 space-y-0.5">
                        <li>Numéro du contrat de prêt : {formData.loan_contract_ref || ''}</li>
                        <li>Montant du capital : {replacePlaceholders('{loan_amount}')}</li>
                        <li>Durée du prêt : {formData.loan_term || ''} mois</li>
                    </ul>
                    <p className="mt-1 text-xs italic">{replacePlaceholders(clauses.articles.object.acknowledgment)}</p>
                </article>
                
                <article>
                    <ArticleHeader title={clauses.articles.scope.title} />
                    <p className="text-xs">{replacePlaceholders(clauses.articles.scope.content)}</p>
                </article>

                <article>
                    <ArticleHeader title={clauses.articles.deposit_principle.title} />
                    <p className="text-xs">{replacePlaceholders(clauses.articles.deposit_principle.content)}</p>
                </article>

                <article>
                    <ArticleHeader title={clauses.articles.activation_procedure.title} />
                    <p className="text-xs">{replacePlaceholders(clauses.articles.activation_procedure.content)}</p>
                </article>
                
                <div style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
                    <article>
                        <ArticleHeader title={clauses.articles.restitution.title} />
                        <p className="text-xs">{replacePlaceholders(clauses.articles.restitution.content)}</p>
                    </article>

                    <article className='mt-3'>
                        <ArticleHeader title={clauses.articles.solidarity.title} />
                        <p className="text-xs">{replacePlaceholders(clauses.articles.solidarity.content)}</p>
                    </article>
                </div>


                {/* This is a visual separator that acts as a good page-break point */}
                <div className="py-4">
                    <hr style={{ pageBreakAfter: 'always', visibility: 'hidden' }} />
                </div>


                <article className="border-l-4 border-destructive bg-destructive/10 p-3 rounded-r-md">
                    <ArticleHeader title={clauses.articles.mention.title} className="text-destructive" />
                    <p className="text-xs italic text-destructive mb-1">{clauses.articles.mention.instruction}</p>
                    <div className="border border-dashed border-slate-400 p-2 min-h-[40px] bg-background">
                       <p className="text-xs">{replacePlaceholders(clauses.articles.mention.content)}</p>
                    </div>
                </article>

                 <article>
                    <ArticleHeader title={clauses.articles.information.title} />
                    <p className="text-xs">{replacePlaceholders(clauses.articles.information.content)}</p>
                </article>
            </section>
            
            <div className="mt-8 pt-4 grid grid-cols-2 gap-16 text-xs" style={{ pageBreakInside: 'avoid' }}>
                <div className="text-center">
                    <div className="h-12"></div>
                    <div className="border-t border-slate-400 pt-2">
                        <p className="font-bold">{clauses.parties.debtor_label}</p>
                        <p className="text-muted-foreground">Lu et approuvé</p>
                    </div>
                </div>
                <div className="text-center">
                    {signer.signatureUrl && <Image src={signer.signatureUrl} alt={`Signature de ${signer.name}`} width={120} height={40} className="mx-auto" />}
                    <div className="border-t border-slate-400 pt-2">
                         <p className="font-bold">{clauses.parties.creditor_label}</p>
                         <p className="text-muted-foreground">{signer.name}, {signer.title[lang]}</p>
                    </div>
                </div>
            </div>

        </DocumentWrapper>
    );
};

export default SuretyBondTemplate;
