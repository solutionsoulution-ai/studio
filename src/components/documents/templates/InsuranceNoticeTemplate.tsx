import React from 'react';
import { Landmark, FileText, AlertTriangle, ShieldCheck, Info } from 'lucide-react';
import { insuranceNoticeClauses } from '@/data/documents/insurance-notice-clauses';
import DocumentWrapper from './DocumentWrapper';

interface InsuranceNoticeTemplateProps {
    formData: any;
    lang: 'fr' | 'en';
}

const InsuranceNoticeTemplate: React.FC<InsuranceNoticeTemplateProps> = ({ formData, lang }) => {
    const clauses = insuranceNoticeClauses[lang] || insuranceNoticeClauses['fr'];

    return (
        <DocumentWrapper 
            title={clauses.title}
            department={clauses.subtitle}
        >
            <div className="bg-slate-100 p-4 rounded-md mb-8">
                <h3 className="font-bold text-sm text-[hsl(215,39%,29%)] flex items-center gap-2 mb-2"><Landmark size={16}/> {clauses.importance.title}</h3>
                <p className="text-xs text-[hsl(220,8.9%,46.1%)]">{clauses.importance.description}</p>
            </div>
            
            <p className="italic text-xs text-slate-500 mb-6">{clauses.introduction}</p>

            <main className="space-y-6 text-sm">
                <article>
                     <div className="flex items-center mb-2">
                        <ShieldCheck className="h-5 w-5 text-[hsl(215,39%,29%)] mr-2" />
                        <h3 className="text-sm font-bold uppercase text-[hsl(215,39%,29%)]">{clauses.guarantees.title}</h3>
                    </div>
                    <div className="space-y-3 pl-7">
                        <div className="p-3 bg-slate-50 rounded-md">
                            <h4 className="font-semibold text-xs">{clauses.guarantees.items.death.title}</h4>
                            <p className="text-xs text-slate-600">{clauses.guarantees.items.death.description}</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-md">
                            <h4 className="font-semibold text-xs">{clauses.guarantees.items.disability.title}</h4>
                            <p className="text-xs text-slate-600">{clauses.guarantees.items.disability.description}</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-md">
                            <h4 className="font-semibold text-xs">{clauses.guarantees.items.incapacity.title}</h4>
                            <p className="text-xs text-slate-600">{clauses.guarantees.items.incapacity.description}</p>
                        </div>
                    </div>
                </article>

                <article>
                     <div className="flex items-center mb-2">
                        <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                        <h3 className="text-sm font-bold uppercase text-[hsl(215,39%,29%)]">{clauses.exclusions.title}</h3>
                    </div>
                     <p className="text-xs text-slate-500 pl-7 mb-2">{clauses.exclusions.intro}</p>
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 pl-7">
                        {clauses.exclusions.items.map((item: string, index: number) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </article>
                
                <article>
                    <div className="flex items-center mb-1">
                        <FileText className="h-5 w-5 text-[hsl(215,39%,29%)] mr-2" />
                        <h3 className="text-sm font-bold uppercase text-[hsl(215,39%,29%)]">{clauses.waiver.title}</h3>
                    </div>
                    <p className="text-xs text-slate-600 pl-7">{clauses.waiver.description}</p>
                </article>

                <article>
                    <div className="flex items-center mb-1">
                        <Info className="h-5 w-5 text-[hsl(215,39%,29%)] mr-2" />
                        <h3 className="text-sm font-bold uppercase text-[hsl(215,39%,29%)]">{clauses.claim.title}</h3>
                    </div>
                    <p className="text-xs text-slate-600 pl-7">{clauses.claim.description}</p>
                </article>
            </main>
        </DocumentWrapper>
    );
};

export default InsuranceNoticeTemplate;
