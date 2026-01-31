
"use client";
import React from 'react';

interface DocumentPreviewProps {
  children: React.ReactNode;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ children }) => {

  return (
    <div className="bg-background shadow-lg rounded-lg h-full overflow-hidden">
      <div id="pdf-content" className="p-4 sm:p-8 h-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default DocumentPreview;
