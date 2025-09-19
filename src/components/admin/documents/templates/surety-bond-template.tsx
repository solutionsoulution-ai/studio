
"use client";

import { suretyBondClauses } from "@/data/documents/surety-bond-clauses";
import { useState, useEffect } from 'react';

export interface SuretyBondData {
    lender_name?: string;
    borrower_name?: string;
    guarantor_name?: string;
    loan_contract_id?: string;
    loan_amount?: number;
    loan_term_months?: number;
    loan_date?: string;
    signature_location?: string;
    signature_date?: string;
}

interface SuretyBondTemplateProps {
    data: SuretyBondData;
    lang: 'fr' | 'en';
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
        .replace('{loan_amount}', formatCurrency(data.loan_amount))
        .replace('{loan_term_months}', String(data.loan_term_months || '...'));

    return (
        <div id="pdf-preview" className="bg-white text-black text-sm font-serif shadow-2xl p-16 w-[210mm] min-h-[297mm] mx-auto">
            <header className="text-center mb-12">
                <h1 className="text-2xl font-bold uppercase">{clauses.title}</h1>
                <p className="mt-2 text-gray-600">Référence : {docRef}</p>
            </header>

            <section className="mb-8">
                <h2 className="font-bold text-lg mb-4">{clauses.parties.title}</h2>
                <ul className="space-y-2">
                    <li><strong>{clauses.parties.lender_label}</strong> {data.lender_name || 'VylsCapital'}</li>
                    <li><strong>{clauses.parties.borrower_label}</strong> {data.borrower_name || '_____________________'}</li>
                    <li><strong>{clauses.parties.guarantor_label}</strong> {data.guarantor_name || '_____________________'}</li>
                </ul>
            </section>
            
            <p className="mb-8">{clauses.preamble}</p>

            <main className="space-y-6">
                <article>
                    <h2 className="font-bold text-base mb-2">{clauses.commitment.title}</h2>
                    <p>
                        {clauses.commitment.content
                            .replace('{guarantor_name}', data.guarantor_name || '_____________________')
                            .replace('{borrower_name}', data.borrower_name || '_____________________')
                            .replace('{lender_name}', data.lender_name || 'VylsCapital')
                        }
                    </p>
                </article>

                <article>
                    <h2 className="font-bold text-base mb-2">{clauses.loan_details.title}</h2>
                     <p>
                        {clauses.loan_details.content
                            .replace('{loan_contract_id}', data.loan_contract_id || '_____________________')
                            .replace('{loan_date}', data.loan_date || '___/___/_____')
                            .replace('{loan_amount}', formatCurrency(data.loan_amount))
                            .replace('{loan_term_months}', String(data.loan_term_months || '...'))
                        }
                    </p>
                </article>

                 <article>
                    <h2 className="font-bold text-base mb-2">{clauses.scope.title}</h2>
                    <p>{clauses.scope.content}</p>
                </article>
                
                 <article>
                    <h2 className="font-bold text-base mb-2">{clauses.handwritten_mention.title}</h2>
                    <p className="italic text-xs">{clauses.handwritten_mention.instruction}</p>
                    <div className="mt-2 p-4 border border-dashed border-gray-400 h-48 bg-gray-50 text-gray-500">
                        {handwrittenNoticeText}
                    </div>
                </article>
            </main>

            <footer className="mt-20">
                <p className="mb-8">{clauses.signature_preamble.replace('{location}', data.signature_location || '___________').replace('{date}', data.signature_date || '___/___/_____')}</p>
                <div className="grid grid-cols-2 gap-16">
                     <div>
                        <p className="font-semibold mb-2">{clauses.parties.guarantor_label}:</p>
                        <div className="h-24 border-b border-gray-400"></div>
                        <p className="mt-2 text-xs">{data.guarantor_name || '_____________________'}</p>
                         <p className="text-xs">(Précédé de la mention manuscrite)</p>
                    </div>
                    <div>
                        <p className="font-semibold mb-2">{clauses.parties.lender_label}:</p>
                        <div className="h-24 border-b border-gray-400"></div>
                        <p className="mt-2 text-xs">{data.lender_name || 'VylsCapital'}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
