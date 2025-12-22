
import React from 'react';
import { insuranceNoticeClauses } from '@/data/documents/insurance-notice-clauses';
import DocumentWrapper from './DocumentWrapper';
import ArticleHeader from './ArticleHeader';

interface InsuranceNoticeTemplateProps {
    formData: any;
    lang: 'fr' | 'en' | 'de';
}

const InsuranceNoticeTemplate: React.FC<InsuranceNoticeTemplateProps> = ({ formData, lang }) => {
    const clauses = insuranceNoticeClauses[lang] || insuranceNoticeClauses['fr'];

    const InfoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>;
    const ShieldCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>;
    const AlertTriangleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>;
    const FileTextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>;

    return (
        <DocumentWrapper 
            title={clauses.title}
            department={clauses.subtitle}
            lang={lang}
        >
            <div className="bg-muted p-4 rounded-md mb-8">
                <h3 className="font-bold text-sm text-primary flex items-center gap-2 mb-2"><InfoIcon/> {clauses.importance.title}</h3>
                <p className="text-xs text-muted-foreground">{clauses.importance.description}</p>
            </div>
            
            <p className="italic text-xs text-slate-500 mb-6">{clauses.introduction}</p>

            <main className="space-y-6 text-sm">
                <article>
                    <ArticleHeader title={clauses.guarantees.title} icon={<ShieldCheckIcon />} />
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
                     <ArticleHeader title={clauses.exclusions.title} icon={<AlertTriangleIcon />} />
                     <p className="text-xs text-muted-foreground pl-7 mb-2">{clauses.exclusions.intro}</p>
                    <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground pl-7">
                        {clauses.exclusions.items.map((item: string, index: number) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </article>
                
                <article>
                    <ArticleHeader title={clauses.waiver.title} icon={<FileTextIcon />} />
                    <p className="text-xs text-muted-foreground pl-7">{clauses.waiver.description}</p>
                </article>

                <article>
                    <ArticleHeader title={clauses.claim.title} icon={<InfoIcon />} />
                    <p className="text-xs text-muted-foreground pl-7">{clauses.claim.description}</p>
                </article>
            </main>
        </DocumentWrapper>
    );
};

export default InsuranceNoticeTemplate;
