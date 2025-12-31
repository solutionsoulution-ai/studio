
import React from 'react';
import { amlCertificateClauses } from '@/data/documents/aml-certificate-clauses';
import { signatureData } from '@/data/documents/signature-data';
import DocumentWrapper from '../DocumentWrapper';
import ArticleHeader from './ArticleHeader';
import { useBrand } from '@/context/BrandContext';
import { useDocumentGenerator } from '../DocumentGenerator';

const AmlCertificateTemplate: React.FC = () => {
    const { formData, lang, currency } = useDocumentGenerator();
    const { companyInfo } = useBrand();
    const clausesData = amlCertificateClauses(companyInfo.name);
    const clauses = clausesData[lang] || clausesData['fr'];
    const complianceSigner = signatureData(companyInfo.brandKey).legal; 

    const replacePlaceholders = (text: string) => {
        if (!text) return '';
        return text
            .replace(/{ref}/g, formData.ref || '___________')
            .replace(/{date}/g, formData.date ? new Date(formData.date).toLocaleDateString(lang) : '___________')
            .replace(/{client_name}/g, formData.client_name || '___________')
            .replace(/{client_address}/g, formData.client_address || '___________')
            .replace(/{transaction_amount}/g, formData.transaction_amount ? new Intl.NumberFormat(lang, { style: 'currency', currency: currency }).format(formData.transaction_amount) : '___________')
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
                <h2 className="text-sm font-bold uppercase text-primary mb-3">{clauses.declarer.title}</h2>
                <div className="bg-muted p-3 rounded-md text-xs">
                    <p><span className="font-semibold">Nom:</span> {formData.client_name || ''}</p>
                    <p><span className="font-semibold">Adresse:</span> {formData.client_address || ''}</p>
                </div>
            </section>

            <section className="space-y-4 text-sm leading-relaxed">
                <article>
                    <ArticleHeader title={clauses.articles.declaration.title} />
                    <p>{replacePlaceholders(clauses.articles.declaration.content)}</p>
                    <div className="mt-2 border-t border-dashed pt-2">
                        <p className="text-xs font-semibold">{clauses.articles.declaration.origin_label}</p>
                        <p className="text-xs italic bg-muted p-2 rounded-md min-h-[40px]">{formData.funds_origin || '___________________________'}</p>
                    </div>
                </article>

                <article>
                    <ArticleHeader title={clauses.articles.source_justification.title} />
                    <p className="text-xs italic">{clauses.articles.source_justification.content}</p>
                    <div className="mt-2 space-y-1 text-xs">
                        {clauses.articles.source_justification.options.map((option: string) => (
                             <div key={option} className="flex items-center gap-2">
                                <div className="w-3 h-3 border border-slate-400"></div>
                                <span>{option}</span>
                            </div>
                        ))}
                    </div>
                </article>

                <article>
                    <ArticleHeader title={clauses.articles.commitment.title} />
                    <p>{replacePlaceholders(clauses.articles.commitment.content)}</p>
                </article>

                <article className="bg-destructive/10 border-l-4 border-destructive p-3 rounded-r-md">
                    <ArticleHeader title={clauses.articles.warning.title} className="text-destructive" />
                    <p className="text-xs text-destructive/80">{replacePlaceholders(clauses.articles.warning.content)}</p>
                </article>
            </section>

            <div className="mt-16 pt-8 grid grid-cols-2 gap-16 text-xs items-end" style={{ pageBreakInside: 'avoid' }}>
                <div className="text-center">
                    <div className="h-12 border-b border-slate-400 mb-2"></div>
                    <p className="font-bold">{clauses.signature_label}</p>
                    <p className="text-muted-foreground">Lu et approuvé</p>
                </div>
                 <div className="text-center">
                    <p className="text-muted-foreground">Pour {companyInfo.name},</p>
                    <div className="h-12 flex items-center justify-center">
                        <img src={complianceSigner.signatureUrl} alt={`Signature de ${complianceSigner.name}`} style={{ height: '40px', objectFit: 'contain', mixBlendMode: 'darken' }} />
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
