
"use client";
import React from 'react';
import { useDocumentGenerator } from './DocumentGenerator';

interface DocumentPreviewProps {
  children: React.ReactNode;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ children }) => {
  const { formData, lang, currency } = useDocumentGenerator();

  return (
    <div className="bg-background shadow-lg rounded-lg h-full overflow-hidden">
      <div id="pdf-content" className="p-4 sm:p-8 h-full overflow-y-auto">
        {/* Pass the latest form data to the template */}
        {React.cloneElement(children as React.ReactElement, { formData, lang, currency })}
      </div>
    </div>
  );
};

export default DocumentPreview;
