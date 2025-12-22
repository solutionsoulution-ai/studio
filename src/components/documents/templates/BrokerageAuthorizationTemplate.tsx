
import React from 'react';
import Image from 'next/image';
import { brokerageAuthorizationClauses } from '@/data/documents/brokerage-authorization-clauses';
import DocumentWrapper from './DocumentWrapper';
import ArticleHeader from './ArticleHeader';

interface BrokerageAuthorizationTemplateProps {
    formData: any;
    lang: 'fr' | 'en' | 'de';
}

const BrokerageAuthorizationTemplate: React.FC<BrokerageAuthorizationTemplateProps> = ({ formData, lang }) => {
    const clauses = brokerageAuthorizationClauses.fr; // Using 'fr' as a base
    const articles = brokerageAuthorizationClauses.articles;
    const signer1 = { signatureUrl: "https://i.postimg.cc/HWfMw9wD/signature-8.png" };
    const signer2 = { signatureUrl: "https://i.postimg.cc/BQ4Sf8sD/signature-6.png" };

    const replacePlaceholders = (text: string) => {
        if (!text) return '';
        return text
            .replace(/{ref}/g, formData.ref || '___________')
            .replace(/{issue_date}/g, formData.issue_date ? new Date(formData.issue_date).toLocaleDateString(lang) : '___________');
    };
    
    const FileTextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>;
    const UserCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>;
    const UmbrellaIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12a10.06 10.06 1 0 0-20 0Z"/><path d="M12 12v8a2 2 0 0 0 4 0"/><path d="M12 2v1"/></svg>;
    const ShieldCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>;
    const BanknoteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>;
    const MessageSquareWarningIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>;

    return (
        <DocumentWrapper
            title={clauses.title}
            hideDepartment
            lang={lang}
        >
            <div style={{ border: "2px solid hsl(var(--primary))", padding: '2rem', borderRadius: '8px', backgroundColor: 'hsl(var(--muted))' }}>
                <div className="text-center mb-8">
                    <p className="font-semibold text-lg text-primary">{clauses.authority}</p>
                    <p className="text-sm text-slate-500">{replacePlaceholders(clauses.registration_number)}</p>
                </div>

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold uppercase text-primary">{clauses.title}</h2>
                    <p className="text-xs">{clauses.subtitle}</p>
                </div>
                
                <p className="text-xs leading-relaxed mb-6 text-center">{clauses.intro}</p>

                <div className="text-center bg-white p-4 rounded-md border border-slate-200 mb-8">
                    <p className="text-xl font-bold">{clauses.company_name}</p>
                    <p className="text-xs text-slate-500">{clauses.company_address}</p>
                </div>

                <div className="space-y-4 text-sm mt-8">
                    <article>
                        <ArticleHeader title={articles.status.title} icon={<FileTextIcon />} />
                        <div className="bg-white p-4 rounded-md border border-slate-200 text-xs">
                             <p className="font-semibold text-sm mb-1">{articles.status.value}</p>
                             <p>{articles.status.description}</p>
                        </div>
                    </article>
                    <article>
                        <ArticleHeader title={articles.activities.title} icon={<UserCheckIcon />}/>
                        <p className="text-xs leading-relaxed border border-dashed border-slate-300 p-3 rounded-md">{articles.activities.description}</p>
                    </article>
                    <article>
                         <ArticleHeader title={articles.insurance.title} icon={<UmbrellaIcon />}/>
                         <p className="text-xs leading-relaxed border border-dashed border-slate-300 p-3 rounded-md">{articles.insurance.content}</p>
                    </article>
                     <article>
                         <ArticleHeader title={articles.conduct.title} icon={<ShieldCheckIcon />}/>
                         <p className="text-xs leading-relaxed border border-dashed border-slate-300 p-3 rounded-md">{articles.conduct.content}</p>
                    </article>
                    <article>
                         <ArticleHeader title={articles.lcbft.title} icon={<BanknoteIcon />}/>
                         <p className="text-xs leading-relaxed border border-dashed border-slate-300 p-3 rounded-md">{articles.lcbft.content}</p>
                    </article>
                     <article>
                         <ArticleHeader title={articles.claims.title} icon={<MessageSquareWarningIcon />}/>
                         <p className="text-xs leading-relaxed border border-dashed border-slate-300 p-3 rounded-md">{articles.claims.content}</p>
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

export default BrokerageAuthorizationTemplate;
