
import React from 'react';
import { blankDocumentClauses } from '@/data/documents/blank-document-clauses';
import DocumentWrapper from '../DocumentWrapper';
import { useDocumentGenerator } from '../DocumentGenerator';

const BlankDocumentTemplate: React.FC = () => {
  const { lang } = useDocumentGenerator();
  const clauses = blankDocumentClauses[lang] || blankDocumentClauses['fr'];

  return (
    <DocumentWrapper title={clauses.title} department={clauses.department} lang={lang}>
        <div className="bg-muted p-4 rounded-md mb-8">
            <h3 className="font-bold text-sm text-primary flex items-center gap-2 mb-2">{clauses.importance.title}</h3>
            <p className="text-xs text-muted-foreground">{clauses.importance.description}</p>
        </div>

        <div className="space-y-4 text-sm leading-relaxed min-h-[400px]">
            <p>{clauses.placeholder}</p>
        </div>
    </DocumentWrapper>
  );
};

export default BlankDocumentTemplate;
