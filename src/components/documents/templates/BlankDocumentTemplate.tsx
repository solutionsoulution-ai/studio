import React from 'react';
import { blankDocumentClauses } from '@/data/documents/blank-document-clauses';
import DocumentWrapper from './DocumentWrapper';
import { Landmark } from 'lucide-react';

type BlankDocumentTemplateProps = {
  lang: 'fr' | 'en';
  formData: any;
};

const BlankDocumentTemplate: React.FC<BlankDocumentTemplateProps> = ({ lang, formData }) => {
  const clauses = blankDocumentClauses[lang] || blankDocumentClauses['fr'];

  return (
    <DocumentWrapper title={clauses.title} department={clauses.department}>
        <div className="bg-slate-100 p-4 rounded-md mb-8">
            <h3 className="font-bold text-sm text-[hsl(215,39%,29%)] flex items-center gap-2 mb-2"><Landmark size={16}/> {clauses.importance.title}</h3>
            <p className="text-xs text-[hsl(220,8.9%,46.1%)]">{clauses.importance.description}</p>
        </div>

        <div className="space-y-4 text-sm leading-relaxed min-h-[400px]">
            <p>{clauses.placeholder}</p>
        </div>
    </DocumentWrapper>
  );
};

export default BlankDocumentTemplate;
