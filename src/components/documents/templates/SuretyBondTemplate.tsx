import React from 'react';
import Image from 'next/image';
import { suretyBondClauses } from '@/data/documents/surety-bond-clauses';
import { signatureData } from '@/data/documents/signature-data';
import DocumentWrapper from './DocumentWrapper';

interface SuretyBondTemplateProps {
    formData: any;
    lang: 'fr' | 'en' | 'de';
}

const SuretyBondTemplate: React.FC<SuretyBondTemplateProps> = ({ formData, lang }) => {
    const clauses = suretyBondClauses[lang] || suretyBondClauses['fr'];
    const signer = signatureData.legal;

    const replacePlaceholders = (text: string) => {
        return text
            .replace(/{type_of_loan}/g, formData.type_of_loan || 'Personnel')
            .replace(/{act_ref}/g, formData.act_ref || '___________')
            .replace(/{date}/g, formData.date ? new Date(formData.date).toLocaleDateString(lang) : '___________')
            .replace(/{borrower_name}/g, formData.borrower_name || '___________')
            .replace(/{borrower_address}/g, formData.borrower_address || '___________')
            .replace(/{borrower_id}/g, formData.borrower_id || '___________')
            .replace(/{loan_contract_ref}/g, formData.loan_contract_ref || '___________')
            .replace(/{loan_amount}/g, formData.loan_amount ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(formData.loan_amount) : '___________')
            .replace(/{loan_amount_in_words}/g, formData.loan_amount_in_words || '___________')
            .replace(/{loan_term}/g, formData.loan_term || '___________');
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
                 <h2 className="text-sm font-bold uppercase text-[hsl(215,39%,29%)] mb-3">{clauses.parties.title}</h2>
                 <div className="grid grid-cols-2 gap-6 text-xs">
                     <div>
                         <h3 className="font-semibold underline mb-1">{clauses.parties.creditor_label}</h3>
                         <p>Capfinfy</p>
                         <p>1 Place de la Bourse, 69002 Lyon, France</p>
                     </div>
                     <div>
                         <h3 className="font-semibold underline mb-1">{clauses.parties.debtor_label}</h3>
                         <p>Nom: {formData.borrower_name || '___________'}</p>
                         <p>Adresse: {formData.borrower_address || '___________'}</p>
                         <p>ID: {formData.borrower_id || '___________'}</p>
                     </div>
                 </div>
            </section>

            <section className="space-y-4 text-sm leading-relaxed">
                <article>
                    <h3 className="font-bold uppercase text-xs text-[hsl(215,39%,29%)] mb-1">{clauses.articles.object.title}</h3>
                    <p>{replacePlaceholders(clauses.articles.object.content)}</p>
                     <ul className="text-xs bg-slate-100 p-3 rounded-md mt-2 space-y-1">
                        <li>Numéro du contrat de prêt : {formData.loan_contract_ref || '___________'}</li>
                        <li>Montant du capital : {replacePlaceholders('{loan_amount}')}</li>
                        <li>Durée du prêt : {formData.loan_term || '___________'} mois</li>
                    </ul>
                    <p className="mt-2 text-xs italic">{replacePlaceholders(clauses.articles.object.acknowledgment)}</p>
                </article>
                 <article>
                    <h3 className="font-bold uppercase text-xs text-[hsl(215,39%,29%)] mb-1">{clauses.articles.scope.title}</h3>
                    <p>{replacePlaceholders(clauses.articles.scope.content)}</p>
                </article>
                <article>
                    <h3 className="font-bold uppercase text-xs text-[hsl(215,39%,29%)] mb-1">{clauses.articles.solidarity.title}</h3>
                    <p>{replacePlaceholders(clauses.articles.solidarity.content)}</p>
                </article>
                <article className="border-l-4 border-red-400 bg-red-50 p-4 rounded-r-md">
                    <h3 className="font-bold uppercase text-xs text-[hsl(215,39%,29%)] mb-1">{clauses.articles.mention.title}</h3>
                    <p className="text-xs italic text-red-600 mb-2">{clauses.articles.mention.instruction}</p>
                    <div className="border border-dashed border-slate-400 p-3 min-h-[50px] bg-white">
                       <p className="text-xs">{replacePlaceholders(clauses.articles.mention.content)}</p>
                    </div>
                </article>
                 <article>
                    <h3 className="font-bold uppercase text-xs text-[hsl(215,39%,29%)] mb-1">{clauses.articles.information.title}</h3>
                    <p>{replacePlaceholders(clauses.articles.information.content)}</p>
                </article>
            </section>
            
            <div className="mt-16 pt-8 grid grid-cols-2 gap-16 text-xs">
                <div className="text-center">
                    <div className="h-20"></div>
                    <div className="border-t border-slate-400 pt-2">
                        <p className="font-bold">{clauses.parties.debtor_label}</p>
                        <p className="text-[hsl(220,8.9%,46.1%)]">Lu et approuvé</p>
                    </div>
                </div>
                <div className="text-center">
                    {signer.signatureUrl && <Image src={signer.signatureUrl} alt={`Signature de ${signer.name}`} width={150} height={50} className="mx-auto" />}
                    <div className="border-t border-slate-400 pt-2">
                         <p className="font-bold">{clauses.parties.creditor_label}</p>
                         <p className="text-[hsl(220,8.9%,46.1%)]">{signer.name}, {signer.title[lang]}</p>
                    </div>
                </div>
            </div>

        </DocumentWrapper>
    );
};

export default SuretyBondTemplate;
