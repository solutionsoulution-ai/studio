
import React from 'react';
import Image from 'next/image';
import { insuranceCertificateClauses } from '@/data/documents/insurance-certificate-clauses';
import { signatureData } from '@/data/documents/signature-data';
import DocumentWrapper from './DocumentWrapper';

interface InsuranceCertificateTemplateProps {
    formData: any;
    lang: 'fr' | 'en' | 'de';
}

const InsuranceCertificateTemplate: React.FC<InsuranceCertificateTemplateProps> = ({ formData, lang }) => {
    const clauses = insuranceCertificateClauses[lang] || insuranceCertificateClauses['fr'];
    const signer = signatureData.insurance;

    const replacePlaceholders = (text: string) => {
        if (!text) return '';
        return text
            .replace(/{ref}/g, formData.ref || '')
            .replace(/{issue_date}/g, formData.issue_date ? new Date(formData.issue_date).toLocaleDateString(lang) : '')
            .replace(/{insured_name}/g, formData.insured_name || '')
            .replace(/{insured_dob}/g, formData.insured_dob ? new Date(formData.insured_dob).toLocaleDateString(lang) : '')
            .replace(/{insured_address}/g, formData.insured_address || '')
            .replace(/{insured_id}/g, formData.insured_id || '')
            .replace(/{loan_contract_ref}/g, formData.loan_contract_ref || '')
            .replace(/{loan_type}/g, formData.loan_type || '')
            .replace(/{insured_capital}/g, formData.insured_capital ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(formData.insured_capital) : '')
            .replace(/{coverage_duration}/g, formData.coverage_duration || '')
            .replace(/{monthly_premium}/g, formData.monthly_premium ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(formData.monthly_premium) : '');
    };

    return (
        <DocumentWrapper
            title={replacePlaceholders(clauses.title)}
            department={clauses.header.line2}
            docRef={replacePlaceholders(clauses.reference)}
            docDate={replacePlaceholders(clauses.issue_date)}
            lang={lang}
        >
            <section className="mb-6">
                <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="bg-slate-100 p-3 rounded-md">
                        <h3 className="font-bold underline mb-2">{clauses.insured.title}</h3>
                        <p>Nom et Prénom: {formData.insured_name || ''}</p>
                        <p>Date de Naissance: {replacePlaceholders('{insured_dob}')}</p>
                        <p>Adresse: {formData.insured_address || ''}</p>
                        <p>ID: {formData.insured_id || ''}</p>
                    </div>
                     <div className="bg-slate-100 p-3 rounded-md">
                        <h3 className="font-bold underline mb-2">{clauses.beneficiary.title}</h3>
                        <p>{replacePlaceholders(clauses.beneficiary.content)}</p>
                    </div>
                </div>
            </section>
            
            <section className="space-y-4 text-sm leading-relaxed">
                <article>
                    <h3 className="font-bold uppercase text-xs text-[hsl(215,39%,29%)] mb-1">{replacePlaceholders(clauses.object_title)}</h3>
                    <p>{replacePlaceholders(clauses.object_content)}</p>
                </article>

                <article>
                    <h3 className="font-bold uppercase text-xs text-[hsl(215,39%,29%)] mb-1">{clauses.loan_details.title}</h3>
                    <div className="text-xs bg-slate-100 p-3 rounded-md grid grid-cols-2 gap-x-4 gap-y-1">
                        <p>{replacePlaceholders(clauses.loan_details.nature)}</p>
                        <p>{replacePlaceholders(clauses.loan_details.ref)}</p>
                        <p>{replacePlaceholders(clauses.loan_details.amount)}</p>
                        <p>{replacePlaceholders(clauses.loan_details.duration)}</p>
                    </div>
                </article>
                 
                <article>
                    <h3 className="font-bold uppercase text-xs text-[hsl(215,39%,29%)] mb-1">{clauses.guarantees.title}</h3>
                    <p className="text-xs italic mb-2">{clauses.guarantees.intro}</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>{clauses.guarantees.death}</li>
                        <li>{clauses.guarantees.ptia}</li>
                        <li>{clauses.guarantees.itt}</li>
                    </ul>
                </article>
                
                <article>
                    <h3 className="font-bold uppercase text-xs text-[hsl(215,39%,29%)] mb-1">{clauses.premium.title}</h3>
                    <p>{replacePlaceholders(clauses.premium.content)}</p>
                </article>
                
                <article>
                    <h3 className="font-bold uppercase text-xs text-[hsl(215,39%,29%)] mb-1">{clauses.validity.title}</h3>
                    <p>{replacePlaceholders(clauses.validity.content)}</p>
                </article>

            </section>

             <div className="mt-16 pt-8 text-right">
                 <div className="inline-block text-center">
                    {signer.signatureUrl && <Image src={signer.signatureUrl} alt={`Signature de ${signer.name || 'Directrice des Assurances'}`} width={150} height={50} className="mx-auto" />}
                    <div className="border-t border-slate-400 pt-2 mt-2 text-xs">
                         <p className="font-bold">Isabelle Petit</p>
                         <p className="text-[hsl(220,8.9%,46.1%)]">{signer.title[lang]}</p>
                    </div>
                </div>
            </div>

        </DocumentWrapper>
    );
};

export default InsuranceCertificateTemplate;
