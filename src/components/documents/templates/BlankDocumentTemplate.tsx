
import React from 'react';
import { blankDocumentClauses } from '@/data/documents/blank-document-clauses';
import DocumentWrapper from './DocumentWrapper';

type BlankDocumentTemplateProps = {
  lang: 'fr' | 'en' | 'de';
  formData: any;
};

const BlankDocumentTemplate: React.FC<BlankDocumentTemplateProps> = ({ lang, formData }) => {
  const clauses = blankDocumentClauses[lang] || blankDocumentClauses['fr'];
  const InfoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>;


  return (
    <DocumentWrapper title={clauses.title} department={clauses.department} lang={lang}>
        <div className="bg-muted p-4 rounded-md mb-8">
            <h3 className="font-bold text-sm text-primary flex items-center gap-2 mb-2"><InfoIcon /> {clauses.importance.title}</h3>
            <p className="text-xs text-muted-foreground">{clauses.importance.description}</p>
        </div>

        <div className="space-y-4 text-sm leading-relaxed min-h-[400px]">
            <p>{clauses.placeholder}</p>
        </div>
    </DocumentWrapper>
  );
};

export default BlankDocumentTemplate;
