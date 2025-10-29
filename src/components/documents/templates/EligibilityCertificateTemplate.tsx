
import React from 'react';
import Image from 'next/image';
import { eligibilityCertificateClauses } from '@/data/documents/eligibility-certificate-clauses';
import { signatureData } from '@/data/documents/signature-data';
import DocumentWrapper from './DocumentWrapper';

interface EligibilityCertificateTemplateProps {
    formData: any;
    lang: 'fr' | 'en' | 'de';
}

const EligibilityCertificateTemplate: React.FC<EligibilityCertificateTemplateProps> = ({ formData, lang }) => {
    const clauses = eligibilityCertificateClauses[lang] || eligibilityCertificateClauses['fr'];
    const signer = signatureData.analysis;

    const validityDate = formData.date ? new Date(new Date(formData.date).setDate(new Date(formData.date).getDate() + 30)).toLocaleDateString(lang) : '';
    
    const replacePlaceholders = (text: string) => {
        return text
            .replace(/{ref}/g, formData.ref || '')
            .replace(/{validity_date}/g, validityDate)
            .replace(/{beneficiary_name}/g, formData.beneficiary_name || '')
            .replace(/{beneficiary_address}/g, formData.beneficiary_address || '')
            .replace(/{beneficiary_id}/g, formData.beneficiary_id || '')
            .replace(/{project_type}/g, formData.project_type || '')
            .replace(/{max_amount}/g, formData.max_amount ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(formData.max_amount) : '')
            .replace(/{max_amount_in_words}/g, formData.max_amount_in_words || '');
    };

    return (
        <DocumentWrapper 
            title={replacePlaceholders(clauses.title)}
            department={clauses.header.line2}
            docRef={replacePlaceholders(clauses.reference)}
            docDate={replacePlaceholders(clauses.validity)}
            lang={lang}
        >
            <section className="mb-6">
                 <h2 className="text-sm font-bold uppercase text-[hsl(215,39%,29%)] mb-3">{clauses.beneficiary.title}</h2>
                 <div className="bg-slate-100 p-3 rounded-md text-xs">
                     <p>Nom: {formData.beneficiary_name || ''}</p>
                     <p>Adresse: {formData.beneficiary_address || ''}</p>
                     <p>ID: {formData.beneficiary_id || ''}</p>
                 </div>
            </section>
            
            <section className="space-y-4 text-sm leading-relaxed">
                <article>
                    <h3 className="font-bold uppercase text-xs text-[hsl(215,39%,29%)] mb-1">{clauses.articles.object.title}</h3>
                    <p>{replacePlaceholders(clauses.articles.object.content)}</p>
                    <div className="my-4 text-center bg-slate-100 p-4 rounded-md">
                        <p className="uppercase text-xs text-[hsl(220,8.9%,46.1%)]">{clauses.articles.object.amount_label}</p>
                        <p className="font-bold text-lg text-[hsl(215,39%,29%)]">{replacePlaceholders('{max_amount}')}</p>
                        <p className="italic text-xs">({replacePlaceholders('{max_amount_in_words}')})</p>
                    </div>
                </article>
                 <article>
                    <h3 className="font-bold uppercase text-xs text-[hsl(215,39%,29%)] mb-1">{clauses.articles.scope.title}</h3>
                    <p>{replacePlaceholders(clauses.articles.scope.content)}</p>
                </article>
                 <article>
                    <h3 className="font-bold uppercase text-xs text-[hsl(215,39%,29%)] mb-1">{clauses.articles.validity.title}</h3>
                    <p>{replacePlaceholders(clauses.articles.validity.content)}</p>
                </article>
            </section>

             <div className="mt-12 pt-4 flex justify-end">
                 <div className="text-center">
                    {signer.signatureUrl && <Image src={signer.signatureUrl} alt={`Signature de ${signer.name}`} width={150} height={50} className="mx-auto" />}
                    <div className="border-t border-slate-400 pt-2 mt-2 text-xs">
                         <p className="font-bold">{signer.name}</p>
                         <p className="text-[hsl(220,8.9%,46.1%)]">{signer.title[lang]}</p>
                    </div>
                </div>
            </div>

        </DocumentWrapper>
    );
};

export default EligibilityCertificateTemplate;
