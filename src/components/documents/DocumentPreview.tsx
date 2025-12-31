
"use client";
import React, { useContext } from 'react';
import { DocumentGeneratorContext, useDocumentGenerator } from './DocumentGenerator';

interface DocumentPreviewProps {
  children: React.ReactNode;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ children }) => {
  const context = useContext(DocumentGeneratorContext);

  if (!context) {
    return (
        <div className="bg-background shadow-lg rounded-lg h-full overflow-hidden flex items-center justify-center">
            <p>Chargement des données du formulaire...</p>
        </div>
    );
  }

  const { formData, lang, currency } = context;

  return (
    <div className="bg-background shadow-lg rounded-lg h-full overflow-hidden">
      <div id="pdf-content" className="p-4 sm:p-8 h-full overflow-y-auto">
        {React.cloneElement(children as React.ReactElement, { formData, lang, currency })}
      </div>
    </div>
  );
};

export default DocumentPreview;
