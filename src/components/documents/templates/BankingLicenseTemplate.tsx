
import React from 'react';
import Image from 'next/image';
import { bankingLicenseClauses } from '@/data/documents/banking-license-clauses';
import { ShieldCheck, FileText, BarChart, FileWarning } from 'lucide-react';
import DocumentWrapper from './DocumentWrapper';

interface BankingLicenseTemplateProps {
    formData: any;
    lang: 'fr' | 'en' | 'de';
}

const BankingLicenseTemplate: React.FC<BankingLicenseTemplateProps> = ({ formData, lang }) => {
    const clauses = bankingLicenseClauses[lang] || bankingLicenseClauses['fr'];
    const signer = { signatureUrl: "https://i.postimg.cc/P5tM0G3p/signature-generic.png" }; // Generic institutional signature

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
                    <p className="text-sm text-slate-500">{replacePlaceholders(clauses.decision)}</p>
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

                <p className="text-sm font-semibold text-center mb-6">{clauses.status}</p>

                <div className="space-y-4 text-sm">
                    <article>
                         <h3 className="font-bold text-sm uppercase text-[hsl(215,39%,29%)] mb-2 flex items-center gap-2"><FileText size={16} />{clauses.articles.scope.title}</h3>
                         <div className="bg-white p-4 rounded-md border border-slate-200 text-xs space-y-2">
                             <p>{clauses.articles.scope.intro}</p>
                             <ul className="list-disc list-inside space-y-1 pl-2">
                                <li>{clauses.articles.scope.item1}</li>
                                <li>{clauses.articles.scope.item2}</li>
                                <li>{clauses.articles.scope.item3}</li>
                            </ul>
                         </div>
                    </article>
                    <article>
                         <h3 className="font-bold text-sm uppercase text-[hsl(215,39%,29%)] mb-2 flex items-center gap-2"><FileWarning size={16} />{clauses.articles.obligations.title}</h3>
                         <p className="text-xs leading-relaxed border border-dashed border-slate-300 p-3 rounded-md">{clauses.articles.obligations.content}</p>
                    </article>
                     <article>
                         <h3 className="font-bold text-sm uppercase text-[hsl(215,39%,29%)] mb-2 flex items-center gap-2"><BarChart size={16} />{clauses.articles.reporting.title}</h3>
                         <p className="text-xs leading-relaxed border border-dashed border-slate-300 p-3 rounded-md">{clauses.articles.reporting.content}</p>
                    </article>
                </div>
                
                <p className="text-xs italic text-center text-slate-500 mt-8 mb-8">{clauses.validity}</p>

                <div className="mt-12 flex justify-between items-end">
                    <div className="text-xs">
                        <p>{replacePlaceholders(clauses.location_and_date)}</p>
                    </div>
                    <div className="text-center">
                        {signer.signatureUrl && <Image src={signer.signatureUrl} alt={`Signature`} width={120} height={40} className="mx-auto" />}
                        <div className="border-t border-slate-400 pt-1 mt-1 text-xs">
                            <p className="font-bold">{clauses.signature_label}</p>
                        </div>
                    </div>
                </div>
            </div>
        </DocumentWrapper>
    );
};

export default BankingLicenseTemplate;
