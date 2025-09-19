
"use client";

import { insuranceCertificateClauses } from "@/data/documents/insurance-certificate-clauses";
import { useState, useEffect } from 'react';

export interface InsuranceCertificateData {
    insured_name?: string;
    lender_name?: string;
    loan_id?: string;
    insured_capital?: number;
    monthly_premium?: number;
    signature_date?: string;
}

interface InsuranceCertificateTemplateProps {
    data: InsuranceCertificateData;
    lang: 'fr' | 'en';
}

export default function InsuranceCertificateTemplate({ data, lang }: InsuranceCertificateTemplateProps) {
    const [docRef, setDocRef] = useState('');

    useEffect(() => {
        const randomPart = Math.floor(10000 + Math.random() * 90000);
        const year = new Date().getFullYear();
        setDocRef(`CERT-ASSUR-${year}-${randomPart}`);
    }, []);

    const clauses = insuranceCertificateClauses[lang];

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
            <header className="mb-12 border-b-2 border-black pb-4">
                <h1 className="text-3xl font-bold uppercase text-gray-800">VylsCapital Assurance</h1>
                <p className="text-gray-600">10 Place de la Bourse, 69002 Lyon, France</p>
            </header>

            <h2 className="text-center text-2xl font-bold uppercase mb-12">{clauses.title}</h2>
            
            <p className="text-right mb-8">
                {clauses.reference.replace('{ref}', docRef)}
            </p>

            <main className="space-y-8">
                <p>
                    {clauses.introduction}
                </p>

                <div className="border-t border-b py-4 space-y-3">
                    <div className="flex justify-between">
                        <span className="font-semibold">{clauses.insured_label}:</span>
                        <span>{data.insured_name || '_____________________'}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="font-semibold">{clauses.beneficiary_label}:</span>
                        <span>{data.lender_name || '_____________________'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">{clauses.loan_id_label}:</span>
                        <span className="font-mono">{data.loan_id || '_____________________'}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="font-semibold">{clauses.capital_label}:</span>
                        <span className="font-bold">{formatCurrency(data.insured_capital)}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="font-semibold">{clauses.premium_label}:</span>
                        <span className="font-bold">{formatCurrency(data.monthly_premium)} / mois</span>
                    </div>
                </div>

                <p>{clauses.coverage_summary}</p>
                <ul className="list-disc list-inside ml-4">
                    <li>{clauses.guarantees.death}</li>
                    <li>{clauses.guarantees.disability}</li>
                    <li>{clauses.guarantees.incapacity}</li>
                </ul>

                 <p>
                    {clauses.conclusion
                        .replace('{signature_date}', data.signature_date || '___/___/_____')
                    }
                </p>
            </main>

            <footer className="mt-24">
                <div className="flex justify-end">
                    <div className="text-center">
                         <div className="h-24 w-48 mb-2">
                           {/* Placeholder for signature image */}
                        </div>
                        <div className="border-t border-gray-400 pt-2">
                             <p className="font-semibold">Le Responsable des Assurances</p>
                            <p className="text-xs">VylsCapital Assurance</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
