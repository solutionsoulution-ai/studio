
"use client";

import { loanContractClauses } from "@/data/documents/loan-contract-clauses";
import { useState, useEffect } from 'react';
import { FileText } from "lucide-react";
import Image from "next/image";

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
                    <p className="text-gray-600 font-semibold">Département Juridique & Financier</p>
                </div>
                 <div className="text-right text-xs text-gray-500">
                    <p>{data.lender_address || "10 Place de la Bourse, 69002 Lyon, France"}</p>
                    <p>contact@vylscapital.com</p>
                </div>
            </header>

            <div className="text-center mb-12">
                <h2 className="text-2xl font-bold uppercase">{clauses.title}</h2>
                <p className="mt-2 text-gray-600">Référence du contrat : {contractRef}</p>
            </div>

            <aside className="border-l-4 border-primary bg-primary/5 p-4 mb-10">
                <h3 className="font-bold text-primary flex items-center gap-2"><FileText size={18} /> Importance de ce document</h3>
                <p className="text-xs mt-2">
                    Le contrat de prêt est le document juridique fondamental qui formalise les engagements entre le prêteur et l'emprunteur. Il détaille les conditions, les modalités de remboursement, les droits et les devoirs de chaque partie. Sa signature est un acte engageant qui sécurise la transaction et sert de référence légale en cas de litige.
                </p>
            </aside>

            <section className="mb-8">
                <h3 className="font-bold text-lg mb-4 border-b-2 border-primary pb-2 text-primary">{clauses.parties.title}</h3>
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-semibold text-gray-700">{clauses.parties.lender}</h4>
                        <p>{data.lender_name || "VylsCapital"}</p>
                        <p className="whitespace-pre-line">{data.lender_address || "10 Place de la Bourse, 69002 Lyon, France"}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-700">{clauses.parties.borrower}</h4>
                        <p>{data.borrower_name || "_____________________"}</p>
                        <p className="whitespace-pre-line">{data.borrower_address || "_____________________\n_____________________"}</p>
                    </div>
                </div>
            </section>
            
            <p className="mb-8 text-center italic">{clauses.preamble}</p>

            <main className="space-y-6">
                {Object.entries(clauses.articles).map(([key, article]) => (
                     <article key={key}>
                        <h3 className="font-bold text-base mb-2 text-primary">{article.title}</h3>
                        <p dangerouslySetInnerHTML={{ __html: 
                            article.content
                                .replace(/{lender_name}/g, data.lender_name || 'VylsCapital')
                                .replace(/{borrower_name}/g, data.borrower_name || '_____________________')
                                .replace(/{loan_amount}/g, formatCurrency(data.loan_amount))
                                .replace(/{loan_amount_in_words}/g, data.loan_amount_in_words || '_____________________')
                                .replace(/{loan_date}/g, data.loan_date || '___/___/_____')
                                .replace(/{interest_rate}/g, String(data.interest_rate ?? '...'))
                                .replace(/{loan_term_months}/g, String(data.loan_term_months ?? '...'))
                                .replace(/{monthly_payment}/g, formatCurrency(data.monthly_payment))
                                .replace(/{repayment_start_date}/g, data.repayment_start_date || '___/___/_____')
                                .replace(/\n/g, '<br />')
                            }} 
                        />
                    </article>
                ))}
            </main>

            <footer className="mt-20">
                <p className="mb-8">{clauses.signature_preamble.replace('{borrower_signature_location}', data.borrower_signature_location || '___________').replace('{signature_date}', data.signature_date || '___/___/_____')}</p>
                <div className="grid grid-cols-2 gap-16">
                    <div>
                        <p className="font-semibold mb-2">{clauses.parties.lender} :</p>
                        <div className="h-24 border-b border-gray-400 relative">
                            <Image src="https://i.postimg.cc/2jZhBMkV/signature-1.png" alt="Signature" layout="fill" objectFit="contain" objectPosition="bottom left"/>
                        </div>
                        <p className="mt-2 text-xs font-semibold">Alexandre Dubois</p>
                        <p className="text-xs">Directeur Général, VylsCapital</p>
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
