
"use client";

import { loanContractClauses } from "@/data/documents/loan-contract-clauses";
import { useState, useEffect } from 'react';

export interface LoanContractData {
    borrower_name?: string;
    borrower_address?: string;
    lender_name?: string;
    lender_address?: string;
    loan_amount?: number;
    loan_amount_in_words?: string;
    loan_date?: string;
    interest_rate?: number;
    loan_term_months?: number;
    repayment_start_date?: string;
    monthly_payment?: number;
    signature_date?: string;
    borrower_signature_location?: string;
}

interface LoanContractTemplateProps {
    data: LoanContractData;
    lang: 'fr' | 'en';
}

export default function LoanContractTemplate({ data, lang }: LoanContractTemplateProps) {
    const [contractRef, setContractRef] = useState('');

    useEffect(() => {
        // Generate the random part of the contract reference only on the client-side
        const randomPart = Math.floor(1000 + Math.random() * 9000);
        const year = new Date().getFullYear();
        setContractRef(`VYLS-${year}-${randomPart}`);
    }, []);


    const clauses = loanContractClauses[lang];

    const formatCurrency = (value: number | undefined) => {
        if (value === undefined) return '...';
        return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
            style: 'currency',
            currency: 'EUR',
        }).format(value);
    };

    return (
        // A4-like container with Tailwind for styling
        <div id="pdf-preview" className="bg-white text-black text-sm font-serif shadow-2xl p-16 w-[210mm] min-h-[297mm] mx-auto">
            <header className="text-center mb-12">
                <h1 className="text-2xl font-bold uppercase">{clauses.title}</h1>
                <p className="mt-2 text-gray-600">Référence du contrat : {contractRef}</p>
            </header>

            <section className="mb-8">
                <h2 className="font-bold text-lg mb-4">{clauses.parties.title}</h2>
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-semibold">{clauses.parties.lender}</h3>
                        <p>{data.lender_name || "VylsCapital"}</p>
                        <p className="whitespace-pre-line">{data.lender_address || "10 Place de la Bourse, 69002 Lyon, France"}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">{clauses.parties.borrower}</h3>
                        <p>{data.borrower_name || "_____________________"}</p>
                        <p className="whitespace-pre-line">{data.borrower_address || "_____________________\n_____________________"}</p>
                    </div>
                </div>
            </section>
            
            <p className="mb-8">{clauses.preamble}</p>

            <main className="space-y-6">
                {/* Article 1: Objet du Prêt */}
                <article>
                    <h2 className="font-bold text-base mb-2">{clauses.object.title}</h2>
                    <p>
                        {clauses.object.content
                            .replace('{lender_name}', data.lender_name || 'VylsCapital')
                            .replace('{borrower_name}', data.borrower_name || '_____________________')
                            .replace('{loan_amount}', formatCurrency(data.loan_amount))
                            .replace('{loan_amount_in_words}', data.loan_amount_in_words || '_____________________')
                            .replace('{loan_date}', data.loan_date || '___/___/_____')
                        }
                    </p>
                </article>

                {/* Article 2: Taux d'intérêt */}
                <article>
                    <h2 className="font-bold text-base mb-2">{clauses.interest.title}</h2>
                    <p>
                        {clauses.interest.content.replace('{interest_rate}', String(data.interest_rate ?? '...'))}
                    </p>
                </article>
                
                {/* Article 3: Durée et Modalités de Remboursement */}
                <article>
                    <h2 className="font-bold text-base mb-2">{clauses.repayment.title}</h2>
                    <p>
                         {clauses.repayment.content
                            .replace('{loan_term_months}', String(data.loan_term_months ?? '...'))
                            .replace('{monthly_payment}', formatCurrency(data.monthly_payment))
                            .replace('{repayment_start_date}', data.repayment_start_date || '___/___/_____')
                        }
                    </p>
                </article>
                
                {/* Other Clauses */}
                {Object.entries(clauses.other_clauses).map(([key, clause]) => (
                     <article key={key}>
                        <h2 className="font-bold text-base mb-2">{clause.title}</h2>
                        <p>{clause.content}</p>
                    </article>
                ))}

            </main>

            <footer className="mt-20">
                <p className="mb-8">{clauses.signature_preamble.replace('{borrower_signature_location}', data.borrower_signature_location || '___________').replace('{signature_date}', data.signature_date || '___/___/_____')}</p>
                <div className="grid grid-cols-2 gap-16">
                    <div>
                        <p className="font-semibold mb-2">{clauses.parties.lender} :</p>
                        <div className="h-24 border-b border-gray-400"></div>
                        <p className="mt-2 text-xs">{data.lender_name || 'VylsCapital'}</p>
                    </div>
                    <div>
                        <p className="font-semibold mb-2">{clauses.parties.borrower} :</p>
                        <div className="h-24 border-b border-gray-400"></div>
                        <p className="mt-2 text-xs">(Lu et approuvé)</p>
                        <p className="text-xs">{data.borrower_name || '_____________________'}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
