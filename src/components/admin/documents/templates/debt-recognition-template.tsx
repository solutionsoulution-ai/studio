
"use client";

import { debtRecognitionClauses } from "@/data/documents/debt-recognition-clauses";
import { useState, useEffect } from 'react';
import { Landmark } from "lucide-react";

export interface DebtRecognitionData {
    borrower_name?: string;
    borrower_address?: string;
    lender_name?: string;
    loan_amount?: number;
    loan_amount_in_words?: string;
    loan_date?: string;
    repayment_deadline?: string;
    signature_location?: string;
    signature_date?: string;
}

interface DebtRecognitionTemplateProps {
    data: DebtRecognitionData;
    lang: 'fr' | 'en';
}

export default function DebtRecognitionTemplate({ data, lang }: DebtRecognitionTemplateProps) {
    const [docRef, setDocRef] = useState('');

    useEffect(() => {
        const randomPart = Math.floor(1000 + Math.random() * 9000);
        const year = new Date().getFullYear();
        setDocRef(`RD-${year}-${randomPart}`);
    }, []);

    const clauses = debtRecognitionClauses[lang];

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

    return (
        <div id="pdf-preview" className="bg-white text-black text-sm font-serif shadow-2xl p-16 w-[210mm] min-h-[297mm] mx-auto">
            <header className="flex justify-between items-start mb-12 border-b-2 border-gray-700 pb-4">
                 <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Landmark className="w-8 h-8 text-gray-800" />
                        <h1 className="text-3xl font-bold uppercase text-gray-800">VylsCapital</h1>
                    </div>
                    <p className="text-gray-600 font-semibold">Département Juridique</p>
                </div>
            </header>

            <div className="text-center mb-12">
                <h2 className="text-2xl font-bold uppercase">{clauses.title}</h2>
                <p className="mt-2 text-gray-600">Référence du document : {docRef}</p>
            </div>

            <main className="space-y-6">
                <p className="text-lg">
                    {clauses.introduction
                        .replace('{borrower_name}', data.borrower_name || '_____________________')
                        .replace('{borrower_address}', data.borrower_address || '_____________________')
                    }
                </p>
                <div className="border-y border-gray-200 py-6 my-6">
                    <p className="text-base">
                        {clauses.acknowledgment
                            .replace('{lender_name}', data.lender_name || 'VylsCapital')
                            .replace('{loan_amount}', formatCurrency(data.loan_amount))
                            .replace('{loan_amount_in_words}', data.loan_amount_in_words || '_____________________')
                            .replace('{loan_date}', data.loan_date || '___/___/_____')
                        }
                    </p>
                </div>
                <p>
                    {clauses.repayment.replace('{repayment_deadline}', data.repayment_deadline || '___/___/_____')}
                </p>
                <p className="text-xs text-gray-600">{clauses.interest_clause}</p>
                 <p>{clauses.legal_value}</p>

                <div className="mt-12">
                     <p>
                        {clauses.signature_preamble
                            .replace('{signature_location}', data.signature_location || '___________')
                            .replace('{signature_date}', data.signature_date || '___/___/_____')
                        }
                    </p>
                </div>
            </main>

            <footer className="mt-20">
                <div className="grid grid-cols-2 gap-16">
                    <div>
                        <p className="font-semibold mb-2">{clauses.borrower_signature_label}:</p>
                        <div className="h-24 border-b border-gray-400"></div>
                        <p className="mt-2 text-xs">(Lu et approuvé, bon pour reconnaissance de dette de la somme indiquée ci-dessus)</p>
                        <p className="text-xs mt-2">{data.borrower_name || '_____________________'}</p>
                    </div>
                     <div>
                        <p className="font-semibold mb-2">{clauses.lender_signature_label}:</p>
                        <div className="h-24 border-b border-gray-400"></div>
                         <p className="mt-2 text-xs">(Lu et approuvé)</p>
                        <p className="mt-2 text-xs">{data.lender_name || 'VylsCapital'}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
