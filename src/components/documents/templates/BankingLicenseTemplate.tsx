
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
    
    const LandmarkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>;
    const FileTextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>;
    const BarChartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>;
    const FileWarningIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>;
    const BanknoteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>;
    const ShieldCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>;


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

                <ArticleHeader title={clauses.grant_to} icon={<LandmarkIcon />} />
                <div className="bg-white p-4 rounded-md border border-slate-200 mb-6">
                    <p className="text-xl font-bold text-center">{clauses.company_name}</p>
                    <p className="text-xs text-slate-500 text-center">{clauses.company_address}</p>
                    <p className="text-sm font-semibold text-center mt-2">{clauses.status}</p>
                </div>


                <div className="space-y-4 text-sm mt-8">
                    <article>
                         <ArticleHeader title={articles.scope.title} icon={<FileTextIcon />}/>
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
                        <ArticleHeader title={articles.prudential.title} icon={<BarChartIcon />}/>
                         <p className="text-xs leading-relaxed border border-dashed border-slate-300 p-3 rounded-md">{articles.prudential.content}</p>
                    </article>
                    <article>
                         <ArticleHeader title={articles.internal_control.title} icon={<FileWarningIcon />}/>
                         <p className="text-xs leading-relaxed border border-dashed border-slate-300 p-3 rounded-md">{articles.internal_control.content}</p>
                    </article>
                    <article>
                         <ArticleHeader title={articles.lcbft.title} icon={<BanknoteIcon />}/>
                         <p className="text-xs leading-relaxed border border-dashed border-slate-300 p-3 rounded-md">{articles.lcbft.content}</p>
                    </article>
                     <article>
                         <ArticleHeader title={articles.customer_protection.title} icon={<ShieldCheckIcon />}/>
                         <p className="text-xs leading-relaxed border border-dashed border-slate-300 p-3 rounded-md">{articles.customer_protection.content}</p>
                    </article>
                     <article>
                        <ArticleHeader title={articles.reporting.title} icon={<FileTextIcon />}/>
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
