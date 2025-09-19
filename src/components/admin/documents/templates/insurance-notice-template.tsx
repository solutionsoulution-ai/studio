
"use client";

import { insuranceNoticeClauses } from "@/data/documents/insurance-notice-clauses";
import { FileText } from "lucide-react";
import type { Language } from "@/data/documents/languages";

export interface InsuranceNoticeData {
    company_name?: string;
    company_address?: string;
}

interface InsuranceNoticeTemplateProps {
    data: InsuranceNoticeData;
    lang: Language;
}

export default function InsuranceNoticeTemplate({ data, lang }: InsuranceNoticeTemplateProps) {
    const clauses = insuranceNoticeClauses[lang];

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
        <div id="pdf-preview" className="bg-white text-black text-sm font-serif shadow-2xl p-16 w-[210mm] min-h-[297mm] mx-auto">
            <header className="text-center mb-12">
                <h1 className="text-3xl font-bold uppercase text-primary">{clauses.title}</h1>
                 <p className="text-gray-600 mt-2">{clauses.subtitle}</p>
            </header>
            
            <aside className="border-l-4 border-primary bg-primary/5 p-4 mb-10">
                <h3 className="font-bold text-primary flex items-center gap-2"><FileText size={18} /> {clauses.importance.title}</h3>
                <p className="text-xs mt-2">
                    {clauses.importance.description}
                </p>
            </aside>

            <main className="space-y-6 text-justify">
                <p>{clauses.introduction}</p>

                {/* Garanties */}
                <article>
                    <h2 className="font-bold text-base mb-2 text-primary">{clauses.guarantees.title}</h2>
                    <p>{clauses.guarantees.description}</p>
                    <ul className="list-disc list-inside ml-4 mt-2">
                        <li><strong>{clauses.guarantees.items.death.title}:</strong> {clauses.guarantees.items.death.description}</li>
                        <li><strong>{clauses.guarantees.items.disability.title}:</strong> {clauses.guarantees.items.disability.description}</li>
                        <li><strong>{clauses.guarantees.items.incapacity.title}:</strong> {clauses.guarantees.items.incapacity.description}</li>
                    </ul>
                </article>
                
                {/* Exclusions */}
                 <article>
                    <h2 className="font-bold text-base mb-2 text-primary">{clauses.exclusions.title}</h2>
                    <p>{clauses.exclusions.description}</p>
                    <ul className="list-disc list-inside ml-4 mt-2 text-xs">
                       {clauses.exclusions.items.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                </article>

                {/* Démarches en cas de sinistre */}
                 <article>
                    <h2 className="font-bold text-base mb-2 text-primary">{clauses.claims.title}</h2>
                    <p>{clauses.claims.description}</p>
                </article>

                 {/* Droit de renonciation */}
                 <article>
                    <h2 className="font-bold text-base mb-2 text-primary">{clauses.waiver.title}</h2>
                    <p>{clauses.waiver.description}</p>
                </article>
                
                 {/* Contact */}
                 <article>
                    <h2 className="font-bold text-base mb-2 text-primary">{clauses.contact.title}</h2>
                    <p>
                        {clauses.contact.description
                            .replace('{company_name}', data.company_name || "VylsCapital Assurance")
                            .replace('{company_address}', data.company_address || "10 Place de la Bourse, 69002 Lyon, France")
                        }
                    </p>
                </article>
            </main>
            
            <footer className="absolute bottom-16 left-16 right-16 text-center text-xs text-gray-500 border-t pt-4">
                <p>{clauses.footer}</p>
            </footer>
        </div>
    );
}

    