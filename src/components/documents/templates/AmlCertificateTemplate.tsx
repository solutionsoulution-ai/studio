
import React from 'react';
import { amlCertificateClauses } from '@/data/documents/aml-certificate-clauses';
import { signatureData } from '@/data/documents/signature-data';
import DocumentWrapper from './DocumentWrapper';
import ArticleHeader from './ArticleHeader';

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
    
    const ShieldCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>;
    const FileTextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>;
    const AlertTriangleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>;


    return (
        <DocumentWrapper
            title={clauses.title}
            department={clauses.header.line2}
            docRef={replacePlaceholders(clauses.reference)}
            docDate={replacePlaceholders(clauses.date)}
            lang={lang}
        >
            <section className="mb-6">
                <h2 className="text-sm font-bold uppercase text-primary mb-3">{clauses.declarer.title}</h2>
                <div className="bg-muted p-3 rounded-md text-xs">
                    <p><span className="font-semibold">Nom:</span> {formData.client_name || ''}</p>
                    <p><span className="font-semibold">Adresse:</span> {formData.client_address || ''}</p>
                </div>
            </section>

            <section className="space-y-4 text-sm leading-relaxed">
                <article>
                    <ArticleHeader title={clauses.articles.declaration.title} icon={<ShieldCheckIcon />} />
                    <p>{replacePlaceholders(clauses.articles.declaration.content)}</p>
                    <div className="mt-2 border-t border-dashed pt-2">
                        <p className="text-xs font-semibold">{clauses.articles.declaration.origin_label}</p>
                        <p className="text-xs italic bg-muted p-2 rounded-md min-h-[40px]">{formData.funds_origin || '___________________________'}</p>
                    </div>
                </article>

                <article>
                    <ArticleHeader title={clauses.articles.commitment.title} icon={<FileTextIcon />} />
                    <p>{replacePlaceholders(clauses.articles.commitment.content)}</p>
                </article>

                <article className="bg-destructive/10 border-l-4 border-destructive p-3 rounded-r-md">
                    <ArticleHeader title={clauses.articles.warning.title} icon={<AlertTriangleIcon />} className="text-destructive" />
                    <p className="text-xs text-destructive/80">{replacePlaceholders(clauses.articles.warning.content)}</p>
                </article>
            </section>

            <div className="mt-16 pt-8 grid grid-cols-2 gap-16 text-xs items-end">
                <div className="text-center">
                    <div className="h-12 border-b border-slate-400 mb-2"></div>
                    <p className="font-bold">{clauses.signature_label}</p>
                    <p className="text-muted-foreground">Lu et approuvé</p>
                </div>
                 <div className="text-center">
                    <p className="text-muted-foreground">Pour Neofonds,</p>
                    <div className="h-12 flex items-center justify-center">
                        <img src={complianceSigner.signatureUrl} alt={`Signature de ${complianceSigner.name}`} style={{ height: '40px', objectFit: 'contain' }} />
                    </div>
                    <div className="border-t border-slate-400 pt-2">
                         <p className="font-bold">{complianceSigner.name}</p>
                         <p className="text-muted-foreground">{complianceSigner.title[lang]}</p>
                    </div>
                </div>
            </div>
        </DocumentWrapper>
    );
};

export default AmlCertificateTemplate;
