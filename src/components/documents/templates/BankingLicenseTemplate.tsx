
import React from 'react';
import Image from 'next/image';
import { bankingLicenseClauses } from '@/data/documents/banking-license-clauses';
import DocumentWrapper from './DocumentWrapper';
import ArticleHeader from './ArticleHeader';

interface BankingLicenseTemplateProps {
    formData: any;
    lang: 'fr' | 'en' | 'de';
}

const BankingLicenseTemplate: React.FC<BankingLicenseTemplateProps> = ({ formData, lang }) => {
    const clauses = bankingLicenseClauses.fr; // Using 'fr' as a base, assuming other languages follow suit
    const articles = bankingLicenseClauses.articles;
    const signer1 = { signatureUrl: "https://i.postimg.cc/HWfMw9wD/signature-8.png" };
    const signer2 = { signatureUrl: "https://i.postimg.cc/BQ4Sf8sD/signature-6.png" };

    const replacePlaceholders = (text: string) => {
        if (!text) return '';
        return text
            .replace(/{ref}/g, formData.ref || '___________')
            .replace(/{issue_date}/g, formData.issue_date ? new Date(formData.issue_date).toLocaleDateString(lang) : '___________');
    };
    
    return (
        <DocumentWrapper
            title={clauses.title}
            hideDepartment
            lang={lang}
        >
            <div style={{ border: "2px solid hsl(var(--primary))", padding: '2rem', borderRadius: '8px', backgroundColor: 'hsl(var(--muted))' }}>
                <div className="text-center mb-8">
                    <p className="font-semibold text-lg text-primary">{clauses.authority}</p>
                    <p className="text-sm text-slate-500">{replacePlaceholders(clauses.decision)}</p>
                </div>

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold uppercase text-primary">{clauses.title}</h2>
                    <p className="text-xs">{clauses.subtitle}</p>
                </div>
                
                <p className="text-xs leading-relaxed mb-6">{clauses.intro}</p>

                <ArticleHeader title={clauses.grant_to} />
                <div className="bg-white p-4 rounded-md border border-slate-200 mb-6">
                    <p className="text-xl font-bold text-center">{clauses.company_name}</p>
                    <p className="text-xs text-slate-500 text-center">{clauses.company_address}</p>
                    <p className="text-sm font-semibold text-center mt-2">{clauses.status}</p>
                </div>


                <div className="space-y-4 text-sm mt-8">
                    <article>
                         <ArticleHeader title={articles.scope.title}/>
                         <div className="bg-white p-4 rounded-md border border-slate-200 text-xs space-y-2">
                             <p>{articles.scope.intro}</p>
                             <ul className="list-disc list-inside space-y-1 pl-2">
                                <li>{articles.scope.item1}</li>
                                <li>{articles.scope.item2}</li>
                                <li>{articles.scope.item3}</li>
                            </ul>
                         </div>
                    </article>
                    <article>
                        <ArticleHeader title={articles.prudential.title}/>
                         <p className="text-xs leading-relaxed border border-dashed border-slate-300 p-3 rounded-md">{articles.prudential.content}</p>
                    </article>
                    <article>
                         <ArticleHeader title={articles.internal_control.title}/>
                         <p className="text-xs leading-relaxed border border-dashed border-slate-300 p-3 rounded-md">{articles.internal_control.content}</p>
                    </article>
                    <article>
                         <ArticleHeader title={articles.lcbft.title}/>
                         <p className="text-xs leading-relaxed border border-dashed border-slate-300 p-3 rounded-md">{articles.lcbft.content}</p>
                    </article>
                     <article>
                         <ArticleHeader title={articles.customer_protection.title}/>
                         <p className="text-xs leading-relaxed border border-dashed border-slate-300 p-3 rounded-md">{articles.customer_protection.content}</p>
                    </article>
                     <article>
                        <ArticleHeader title={articles.reporting.title}/>
                         <p className="text-xs leading-relaxed border border-dashed border-slate-300 p-3 rounded-md">{articles.reporting.content}</p>
                    </article>
                </div>
                
                <p className="text-xs italic text-center text-slate-500 mt-8 mb-8">{clauses.validity}</p>

                <div className="mt-12 flex justify-between items-end">
                    <div className="text-xs">
                        <p>{replacePlaceholders(clauses.location_and_date)}</p>
                    </div>
                     <div className="flex gap-8">
                        <div className="text-center">
                            {signer1.signatureUrl && <Image src={signer1.signatureUrl} alt={`Signature 1`} width={120} height={40} className="mx-auto" />}
                            <div className="border-t border-slate-400 pt-1 mt-1 text-xs">
                                <p className="font-bold">{clauses.signature_label_1}</p>
                            </div>
                        </div>
                         <div className="text-center">
                            {signer2.signatureUrl && <Image src={signer2.signatureUrl} alt={`Signature 2`} width={120} height={40} className="mx-auto" />}
                            <div className="border-t border-slate-400 pt-1 mt-1 text-xs">
                                <p className="font-bold">{clauses.signature_label_2}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DocumentWrapper>
    );
};

export default BankingLicenseTemplate;
