
"use client";

import { suretyBondClauses } from "@/data/documents/surety-bond-clauses";
import { useState, useEffect } from 'react';
import { FileText } from "lucide-react";
import Image from "next/image";
import type { Language } from "@/data/documents/languages";

export interface SuretyBondData {
    lender_name?: string;
    borrower_name?: string;
    guarantor_name?: string;
    loan_contract_id?: string;
    loan_amount?: number;
    loan_amount_in_words?: string;
    loan_term_months?: number;
    loan_date?: string;
    signature_location?: string;
    signature_date?: string;
}

interface SuretyBondTemplateProps {
    data: SuretyBondData;
    lang: Language;
}

export default function SuretyBondTemplate({ data, lang }: SuretyBondTemplateProps) {
    const [docRef, setDocRef] = useState('');

    useEffect(() => {
        const randomPart = Math.floor(1000 + Math.random() * 9000);
        const year = new Date().getFullYear();
        setDocRef(`CAUT-${year}-${randomPart}`);
    }, []);

    const clauses = suretyBondClauses[lang];

    const formatCurrency = (value: number | undefined) => {
        if (value === undefined) return '...';
        return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
            style: 'currency',
            currency: 'EUR',
        }).format(value);
    };

    if (!clauses) {
        return (
            <div id="pdf-preview" className="bg-white text-black text-sm font-serif shadow-2xl p-16 w-[210mm] min-h-[297mm] mx-auto flex items-center justify-center">
                <p className="text-center text-lg text-gray-500">
                    La traduction pour la langue sélectionnée n'est pas encore disponible.
                </p>
            </div>
        );
    }

    const handwrittenNoticeText = clauses.handwritten_mention.content
        .replace(/{loan_amount_in_words}/g, data.loan_amount_in_words || '_____________________')
        .replace(/{loan_amount}/g, formatCurrency(data.loan_amount))
        .replace(/{lender_name}/g, data.lender_name || 'VylsCapital')
        .replace(/{borrower_name}/g, data.borrower_name || '_____________________');


    return (
        <div id="pdf-preview" className="bg-white text-black text-sm font-serif shadow-2xl p-16 w-[210mm] min-h-[297mm] mx-auto relative">
            <header className="flex justify-between items-start mb-12 border-b-2 border-primary pb-4">
                 <div>
                    <h1 className="text-3xl font-bold uppercase text-primary">VylsCapital</h1>
                    <p className="text-gray-600 font-semibold">{clauses.department}</p>
                </div>
            </header>
            
            <div className="text-center mb-12">
                <h2 className="text-2xl font-bold uppercase">{clauses.title}</h2>
                <p className="mt-2 text-gray-600">{clauses.reference.replace('{ref}', docRef)}</p>
            </div>

            <aside className="border-l-4 border-primary bg-primary/5 p-4 mb-10">
                <h3 className="font-bold text-primary flex items-center gap-2"><FileText size={18} /> {clauses.importance.title}</h3>
                <p className="text-xs mt-2">
                    {clauses.importance.description}
                </p>
            </aside>

            <section className="mb-8">
                <h3 className="font-bold text-lg mb-4 border-b-2 border-primary pb-2 text-primary">{clauses.parties.title}</h3>
                <ul className="space-y-3 text-base">
                    <li><strong>{clauses.parties.lender_label}</strong> {data.lender_name || 'VylsCapital'}</li>
                    <li><strong>{clauses.parties.borrower_label}</strong> {data.borrower_name || '_____________________'}</li>
                    <li><strong>{clauses.parties.guarantor_label}</strong> {data.guarantor_name || '_____________________'}</li>
                </ul>
            </section>
            
            <p className="mb-8 text-center italic">{clauses.preamble}</p>

            <main className="space-y-6">
                 {Object.entries(clauses.articles).map(([key, article]) => (
                     <article key={key}>
                        <h3 className="font-bold text-base mb-2 text-primary">{article.title}</h3>
                        <p dangerouslySetInnerHTML={{ __html: 
                            article.content
                                .replace(/{guarantor_name}/g, data.guarantor_name || '_____________________')
                                .replace(/{borrower_name}/g, data.borrower_name || '_____________________')
                                .replace(/{lender_name}/g, data.lender_name || 'VylsCapital')
                                .replace(/{loan_contract_id}/g, data.loan_contract_id || '_____________________')
                                .replace(/{loan_date}/g, data.loan_date || '___/___/_____')
                                .replace(/{loan_amount}/g, formatCurrency(data.loan_amount))
                                .replace(/{loan_term_months}/g, String(data.loan_term_months || '...'))
                                .replace(/\n/g, '<br />')
                            }} 
                        />
                    </article>
                ))}
                
                 <article>
                    <h3 className="font-bold text-base mb-2 text-primary">{clauses.handwritten_mention.title}</h3>
                    <p className="italic text-xs">{clauses.handwritten_mention.instruction}</p>
                    <div className="mt-2 p-4 border border-dashed border-border min-h-48 bg-gray-50 text-gray-500 flex items-center justify-center">
                        <p className="text-center">{handwrittenNoticeText}</p>
                    </div>
                </article>
            </main>

            <footer className="mt-20">
                <p className="mb-8">{clauses.signature_preamble.replace('{location}', data.signature_location || '___________').replace('{date}', data.signature_date || '___/___/_____')}</p>
                <div className="grid grid-cols-2 gap-16">
                     <div>
                        <p className="font-semibold mb-2">{clauses.parties.guarantor_label}</p>
                        <div className="h-24 border-b border-border"></div>
                        <p className="mt-2 text-xs">{data.guarantor_name || '_____________________'}</p>
                         <p className="text-xs">{clauses.guarantor_signature_instruction}</p>
                    </div>
                    <div>
                        <p className="font-semibold mb-2">{clauses.parties.lender_label}</p>
                        <div className="h-24 border-b border-border relative">
                           <Image src="https://i.postimg.cc/jSrRkPWD/signature.png" alt="Signature" layout="fill" objectFit="contain" objectPosition="bottom left"/>
                        </div>
                        <p className="mt-2 text-xs font-semibold">David Rousseau</p>
                        <p className="text-xs">{clauses.lender_title}, VylsCapital</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

    