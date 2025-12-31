
"use client";
import React from 'react';
import { useDocumentGenerator } from './DocumentGenerator';

interface DocumentPreviewProps {
  children: React.ReactNode;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ children }) => {
  const { formData, lang, currency } = useDocumentGenerator();

  if (!formData) {
    return (
        <div className="bg-background shadow-lg rounded-lg h-full overflow-hidden flex items-center justify-center">
            <p>Chargement des données du formulaire...</p>
        </div>
    );
  }

  return (
    <div className="bg-background shadow-lg rounded-lg h-full overflow-hidden">
      <div id="pdf-content" className="p-4 sm:p-8 h-full overflow-y-auto">
        {React.cloneElement(children as React.ReactElement, { formData, lang, currency })}
      </div>
    </div>
  );
};

export default DocumentPreview;
