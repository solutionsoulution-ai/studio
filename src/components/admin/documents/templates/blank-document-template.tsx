
"use client";

import { blankDocumentClauses } from "@/data/documents/blank-document-clauses";
import { FileText } from "lucide-react";

export interface BlankDocumentData {
    document_title?: string;
}

interface BlankDocumentTemplateProps {
    data: BlankDocumentData;
    lang: 'fr' | 'en';
}

export default function BlankDocumentTemplate({ data, lang }: BlankDocumentTemplateProps) {
    const clauses = blankDocumentClauses[lang];

    if (!clauses) {
        return (
            <div id="pdf-preview" className="bg-white text-black text-sm font-serif shadow-2xl p-16 w-[210mm] min-h-[297mm] mx-auto flex items-center justify-center">
                <p className="text-center text-lg text-gray-500">
                    La traduction pour la langue sélectionnée n'est pas encore disponible.
                </p>
            </div>
        );
    }

    return (
        <div id="pdf-preview" className="bg-white text-black text-sm font-serif shadow-2xl p-16 w-[210mm] min-h-[297mm] mx-auto relative">
            <header className="flex justify-between items-start mb-12 border-b-2 border-primary pb-4">
                 <div>
                    <h1 className="text-3xl font-bold uppercase text-primary">VylsCapital</h1>
                    <p className="text-gray-600 font-semibold">{clauses.department}</p>
                </div>
            </header>

            <div className="text-center mb-12">
                <h2 className="text-2xl font-bold uppercase">{data.document_title || clauses.title}</h2>
            </div>

            <aside className="border-l-4 border-primary bg-primary/5 p-4 mb-10">
                <h3 className="font-bold text-primary flex items-center gap-2"><FileText size={18} /> {clauses.importance.title}</h3>
                <p className="text-xs mt-2">
                    {clauses.importance.description}
                </p>
            </aside>

            <main className="space-y-6 text-justify">
                <p>
                    {clauses.placeholder}
                </p>
                {/* 
                    Le contenu principal du document sera ajouté ici. 
                    Vous pouvez ajouter des paragraphes, des listes, des tableaux, etc.
                */}
            </main>

            <footer className="absolute bottom-16 left-16 right-16 text-center text-xs text-gray-500 border-t pt-4">
                <p>{clauses.footer}</p>
            </footer>
        </div>
    );
}
