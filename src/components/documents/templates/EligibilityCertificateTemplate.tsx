
import React from 'react';
import Image from 'next/image';
import { eligibilityCertificateClauses } from '@/data/documents/eligibility-certificate-clauses';
import { signatureData } from '@/data/documents/signature-data';
import DocumentWrapper from './DocumentWrapper';
import ArticleHeader from './ArticleHeader';
import { useBrand } from '@/context/BrandContext';
import { useDocumentGenerator } from '../DocumentGenerator';

const EligibilityCertificateTemplate: React.FC = () => {
    const { formData, lang } = useDocumentGenerator();
    const { companyInfo } = useBrand();
    const clauses = eligibilityCertificateClauses(companyInfo.name)[lang] || eligibilityCertificateClauses(companyInfo.name)['fr'];
    const signer = signatureData(companyInfo.brandKey).analysis;

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
                 <h2 className="text-sm font-bold uppercase text-primary mb-3">{clauses.beneficiary.title}</h2>
                 <div className="bg-muted p-3 rounded-md text-xs">
                     <p>Nom: {formData.beneficiary_name || ''}</p>
                     <p>Adresse: {formData.beneficiary_address || ''}</p>
                     <p>ID: {formData.beneficiary_id || ''}</p>
                 </div>
            </section>
            
            <section className="space-y-4 text-sm leading-relaxed">
                <article>
                    <ArticleHeader title={clauses.articles.object.title} />
                    <p>{replacePlaceholders(clauses.articles.object.content)}</p>
                    <div className="my-4 text-center bg-muted p-4 rounded-md">
                        <p className="uppercase text-xs text-muted-foreground">{clauses.articles.object.amount_label}</p>
                        <p className="font-bold text-lg text-primary">{replacePlaceholders('{max_amount}')}</p>
                        <p className="italic text-xs">({replacePlaceholders('{max_amount_in_words}')})</p>
                    </div>
                </article>
                 <article>
                    <ArticleHeader title={clauses.articles.scope.title} />
                    <p>{replacePlaceholders(clauses.articles.scope.content)}</p>
                </article>
                 <article>
                    <ArticleHeader title={clauses.articles.validity.title} />
                    <p>{replacePlaceholders(clauses.articles.validity.content)}</p>
                </article>
            </section>

             <div className="mt-8 pt-4 flex justify-end" style={{ pageBreakInside: 'avoid' }}>
                 <div className="text-center">
                    {signer.signatureUrl && <Image src={signer.signatureUrl} alt={`Signature de ${signer.name}`} width={150} height={50} style={{ margin: '0 auto', mixBlendMode: 'darken' }} />}
                    <div className="border-t border-slate-400 pt-2 mt-2 text-xs">
                         <p className="font-bold">{signer.name}</p>
                         <p className="text-muted-foreground">{signer.title[lang]}</p>
                    </div>
                </div>
            </div>

        </DocumentWrapper>
    );
};

export default EligibilityCertificateTemplate;
