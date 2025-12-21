
import React from 'react';
import { amlCertificateClauses } from '@/data/documents/aml-certificate-clauses';
import { signatureData } from '@/data/documents/signature-data';
import DocumentWrapper from './DocumentWrapper';
import { Landmark, FileText, AlertTriangle, ShieldCheck } from 'lucide-react';

interface AmlCertificateTemplateProps {
    formData: any;
    lang: 'fr' | 'en' | 'de';
}

const AmlCertificateTemplate: React.FC<AmlCertificateTemplateProps> = ({ formData, lang }) => {
    const clauses = amlCertificateClauses[lang] || amlCertificateClauses['fr'];
    const complianceSigner = signatureData.legal; 

    const replacePlaceholders = (text: string) => {
        if (!text) return '';
        return text
            .replace(/{ref}/g, formData.ref || '___________')
            .replace(/{date}/g, formData.date ? new Date(formData.date).toLocaleDateString(lang) : '___________')
            .replace(/{client_name}/g, formData.client_name || '___________')
            .replace(/{client_address}/g, formData.client_address || '___________')
            .replace(/{transaction_amount}/g, formData.transaction_amount ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(formData.transaction_amount) : '___________')
            .replace(/{transaction_amount_in_words}/g, formData.transaction_amount_in_words || '___________')
            .replace(/{transaction_ref}/g, formData.transaction_ref || '___________');
    };

    return (
        <DocumentWrapper
            title={clauses.title}
            department={clauses.header.line2}
            docRef={replacePlaceholders(clauses.reference)}
            docDate={replacePlaceholders(clauses.date)}
            lang={lang}
        >
            <section className="mb-6">
                <h2 className="text-sm font-bold uppercase text-[hsl(215,39%,29%)] mb-3">{clauses.declarer.title}</h2>
                <div className="bg-slate-100 p-3 rounded-md text-xs">
                    <p><span className="font-semibold">Nom:</span> {formData.client_name || ''}</p>
                    <p><span className="font-semibold">Adresse:</span> {formData.client_address || ''}</p>
                </div>
            </section>

            <section className="space-y-4 text-sm leading-relaxed">
                <article>
                    <h3 className="font-bold uppercase text-xs text-[hsl(215,39%,29%)] mb-1 flex items-center gap-2"><ShieldCheck size={14}/> {clauses.articles.declaration.title}</h3>
                    <p>{replacePlaceholders(clauses.articles.declaration.content)}</p>
                    <div className="mt-2 border-t border-dashed pt-2">
                        <p className="text-xs font-semibold">{clauses.articles.declaration.origin_label}</p>
                        <p className="text-xs italic bg-slate-50 p-2 rounded-md min-h-[40px]">{formData.funds_origin || '___________________________'}</p>
                    </div>
                </article>

                <article>
                    <h3 className="font-bold uppercase text-xs text-[hsl(215,39%,29%)] mb-1 flex items-center gap-2"><FileText size={14}/> {clauses.articles.commitment.title}</h3>
                    <p>{replacePlaceholders(clauses.articles.commitment.content)}</p>
                </article>

                <article className="bg-red-50 border-l-4 border-red-400 p-3 rounded-r-md">
                    <h3 className="font-bold uppercase text-xs text-red-700 mb-1 flex items-center gap-2"><AlertTriangle size={14}/> {clauses.articles.warning.title}</h3>
                    <p className="text-xs text-red-800">{replacePlaceholders(clauses.articles.warning.content)}</p>
                </article>
            </section>

            <div className="mt-16 pt-8 grid grid-cols-2 gap-16 text-xs items-end">
                <div className="text-center">
                    <div className="h-12 border-b border-slate-400 mb-2"></div>
                    <p className="font-bold">{clauses.signature_label}</p>
                    <p className="text-slate-500">Lu et approuvé</p>
                </div>
                 <div className="text-center">
                    <p className="text-slate-500">Pour Neofonds,</p>
                    <div className="h-12 flex items-center justify-center">
                        <img src={complianceSigner.signatureUrl} alt={`Signature de ${complianceSigner.name}`} style={{ height: '40px', objectFit: 'contain' }} />
                    </div>
                    <div className="border-t border-slate-400 pt-2">
                         <p className="font-bold">{complianceSigner.name}</p>
                         <p className="text-slate-500">{complianceSigner.title[lang]}</p>
                    </div>
                </div>
            </div>
        </DocumentWrapper>
    );
};

export default AmlCertificateTemplate;
