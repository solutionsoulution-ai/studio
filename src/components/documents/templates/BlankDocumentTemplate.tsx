
import React from 'react';
import { Landmark } from 'lucide-react';
import { blankDocumentClauses } from '@/data/documents/blank-document-clauses';

type BlankDocumentTemplateProps = {
  lang: 'fr' | 'en';
};

const BlankDocumentTemplate: React.FC<BlankDocumentTemplateProps> = ({ lang }) => {
  const clauses = blankDocumentClauses[lang] || blankDocumentClauses['fr'];
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-white text-[#09090b] font-sans text-sm p-8 max-w-4xl mx-auto border border-[#f4f4f5] shadow-lg">
      <header className="flex justify-between items-center mb-12 border-b pb-4 border-[#f4f4f5]">
        <div className="flex items-center">
          <Landmark className="h-8 w-8 text-[#3d5afe] mr-3" />
          <h1 className="text-2xl font-bold text-[#09090b]">Capfinfy</h1>
        </div>
        <div className="text-right text-xs text-[#707079]">
          <p>1 Place de la Bourse</p>
          <p>69002 Lyon, France</p>
          <p>contact@capfinfy.com</p>
        </div>
      </header>

      <main>
        <h2 className="text-3xl font-bold text-center text-[#3d5afe] mb-4">{clauses.title}</h2>
        <p className="text-center text-[#707079] mb-10">{clauses.department}</p>
        
        <div className="bg-[#f4f4f5] p-6 rounded-lg mb-8">
            <h3 className="font-bold text-lg mb-2 text-[#09090b]">{clauses.importance.title}</h3>
            <p className="text-[#707079]">{clauses.importance.description}</p>
        </div>

        <div className="space-y-6 text-[#707079] leading-relaxed min-h-[300px]">
            <p>{clauses.placeholder}</p>
        </div>
      </main>

      <footer className="mt-16 pt-6 border-t border-[#f4f4f5] text-center text-xs text-[#707079]">
        <p>{clauses.footer.replace('{current_year}', currentYear.toString())}</p>
        <p className="mt-2 font-semibold text-[#09090b]">Document confidentiel</p>
      </footer>
    </div>
  );
};

export default BlankDocumentTemplate;
