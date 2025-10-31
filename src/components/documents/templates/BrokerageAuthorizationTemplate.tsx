
import React from 'react';
import Image from 'next/image';
import { brokerageAuthorizationClauses } from '@/data/documents/brokerage-authorization-clauses';
import { FileText, ShieldCheck, UserCheck, Umbrella, Banknote, MessageSquareWarning } from 'lucide-react';
import DocumentWrapper from './DocumentWrapper';

interface BrokerageAuthorizationTemplateProps {
    formData: any;
    lang: 'fr' | 'en' | 'de';
}

const BrokerageAuthorizationTemplate: React.FC<BrokerageAuthorizationTemplateProps> = ({ formData, lang }) => {
    const clauses = brokerageAuthorizationClauses[lang] || brokerageAuthorizationClauses['fr'];
    const signer1 = { signatureUrl: "https://i.postimg.cc/HWfMw9wD/signature-8.png" };
    const signer2 = { signatureUrl: "https://i.postimg.cc/BQ4Sf8sD/signature-6.png" };

    const replacePlaceholders = (text: string) => {
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
            <div style={{ border: "2px solid hsl(215, 39%, 29%)", padding: '2rem', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
                <div className="text-center mb-8">
                    <p className="font-semibold text-lg text-[hsl(215,39%,29%)]">{clauses.authority}</p>
                    <p className="text-sm text-slate-500">{replacePlaceholders(clauses.registration_number)}</p>
                </div>

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold uppercase text-[hsl(215,39%,29%)]">{clauses.title}</h2>
                    <p className="text-xs">{clauses.subtitle}</p>
                </div>
                
                <p className="text-xs leading-relaxed mb-6 text-center">{clauses.intro}</p>

                <div className="text-center bg-white p-4 rounded-md border border-slate-200 mb-8">
                    <p className="text-xl font-bold">{clauses.company_name}</p>
                    <p className="text-xs text-slate-500">{clauses.company_address}</p>
                </div>

                <div className="space-y-4 text-sm mt-8">
                    <article>
                        <h3 className="font-bold text-sm uppercase text-[hsl(215,39%,29%)] mb-2 flex items-center gap-2"><FileText size={16} />{clauses.articles.status.title}</h3>
                        <div className="bg-white p-4 rounded-md border border-slate-200 text-xs">
                             <p className="font-semibold text-sm mb-1">{clauses.articles.status.value}</p>
                             <p>{clauses.articles.status.description}</p>
                        </div>
                    </article>
                    <article>
                        <h3 className="font-bold text-sm uppercase text-[hsl(215,39%,29%)] mb-2 flex items-center gap-2"><UserCheck size={16} />{clauses.articles.activities.title}</h3>
                        <p className="text-xs leading-relaxed border border-dashed border-slate-300 p-3 rounded-md">{clauses.articles.activities.description}</p>
                    </article>
                    <article>
                         <h3 className="font-bold text-sm uppercase text-[hsl(215,39%,29%)] mb-2 flex items-center gap-2"><Umbrella size={16} />{clauses.articles.insurance.title}</h3>
                         <p className="text-xs leading-relaxed border border-dashed border-slate-300 p-3 rounded-md">{clauses.articles.insurance.content}</p>
                    </article>
                     <article>
                         <h3 className="font-bold text-sm uppercase text-[hsl(215,39%,29%)] mb-2 flex items-center gap-2"><ShieldCheck size={16} />{clauses.articles.conduct.title}</h3>
                         <p className="text-xs leading-relaxed border border-dashed border-slate-300 p-3 rounded-md">{clauses.articles.conduct.content}</p>
                    </article>
                    <article>
                         <h3 className="font-bold text-sm uppercase text-[hsl(215,39%,29%)] mb-2 flex items-center gap-2"><Banknote size={16} />{clauses.articles.lcbft.title}</h3>
                         <p className="text-xs leading-relaxed border border-dashed border-slate-300 p-3 rounded-md">{clauses.articles.lcbft.content}</p>
                    </article>
                     <article>
                         <h3 className="font-bold text-sm uppercase text-[hsl(215,39%,29%)] mb-2 flex items-center gap-2"><MessageSquareWarning size={16} />{clauses.articles.claims.title}</h3>
                         <p className="text-xs leading-relaxed border border-dashed border-slate-300 p-3 rounded-md">{clauses.articles.claims.content}</p>
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
