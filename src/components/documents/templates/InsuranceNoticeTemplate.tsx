import React from 'react';
import { FileText, AlertTriangle, ShieldCheck, Info } from 'lucide-react';
import { insuranceNoticeClauses } from '@/data/documents/insurance-notice-clauses';
import DocumentWrapper from './DocumentWrapper';
import ArticleHeader from './ArticleHeader';

interface InsuranceNoticeTemplateProps {
    formData: any;
    lang: 'fr' | 'en' | 'de';
}

const InsuranceNoticeTemplate: React.FC<InsuranceNoticeTemplateProps> = ({ formData, lang }) => {
    const clauses = insuranceNoticeClauses[lang] || insuranceNoticeClauses['fr'];

    return (
        <DocumentWrapper 
            title={clauses.title}
            department={clauses.subtitle}
            lang={lang}
        >
            <div className="bg-muted p-4 rounded-md mb-8">
                <h3 className="font-bold text-sm text-primary flex items-center gap-2 mb-2"><Info size={16}/> {clauses.importance.title}</h3>
                <p className="text-xs text-muted-foreground">{clauses.importance.description}</p>
            </div>
            
            <p className="italic text-xs text-slate-500 mb-6">{clauses.introduction}</p>

            <main className="space-y-6 text-sm">
                <article>
                    <ArticleHeader title={clauses.guarantees.title} icon={<ShieldCheck className="h-4 w-4 text-primary" />} />
                    <div className="space-y-3 pl-7">
                        <div className="p-3 bg-muted rounded-md">
                            <h4 className="font-semibold text-xs">{clauses.guarantees.items.death.title}</h4>
                            <p className="text-xs text-muted-foreground">{clauses.guarantees.items.death.description}</p>
                        </div>
                        <div className="p-3 bg-muted rounded-md">
                            <h4 className="font-semibold text-xs">{clauses.guarantees.items.disability.title}</h4>
                            <p className="text-xs text-muted-foreground">{clauses.guarantees.items.disability.description}</p>
                        </div>
                        <div className="p-3 bg-muted rounded-md">
                            <h4 className="font-semibold text-xs">{clauses.guarantees.items.incapacity.title}</h4>
                            <p className="text-xs text-muted-foreground">{clauses.guarantees.items.incapacity.description}</p>
                        </div>
                    </div>
                </article>

                <article>
                     <ArticleHeader title={clauses.exclusions.title} icon={<AlertTriangle className="h-4 w-4 text-primary" />} />
                     <p className="text-xs text-muted-foreground pl-7 mb-2">{clauses.exclusions.intro}</p>
                    <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground pl-7">
                        {clauses.exclusions.items.map((item: string, index: number) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </article>
                
                <article>
                    <ArticleHeader title={clauses.waiver.title} icon={<FileText className="h-4 w-4 text-primary" />} />
                    <p className="text-xs text-muted-foreground pl-7">{clauses.waiver.description}</p>
                </article>

                <article>
                    <ArticleHeader title={clauses.claim.title} icon={<Info className="h-4 w-4 text-primary" />} />
                    <p className="text-xs text-muted-foreground pl-7">{clauses.claim.description}</p>
                </article>
            </main>
        </DocumentWrapper>
    );
};

export default InsuranceNoticeTemplate;
