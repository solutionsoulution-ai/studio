
"use client";

import { eligibilityCertificateClauses } from "@/data/documents/eligibility-certificate-clauses";
import { useState, useEffect } from 'react';
import { Landmark } from "lucide-react";

export interface EligibilityCertificateData {
    beneficiary_name?: string;
    beneficiary_address?: string;
    beneficiary_id_number?: string;
    eligibility_amount?: number;
    validity_end_date?: string;
    analyst_name?: string;
    signature_date?: string;
}

interface EligibilityCertificateTemplateProps {
    data: EligibilityCertificateData;
    lang: 'fr' | 'en';
}

export default function EligibilityCertificateTemplate({ data, lang }: EligibilityCertificateTemplateProps) {
    const [docRef, setDocRef] = useState('');

    useEffect(() => {
        const randomPart = Math.floor(1000 + Math.random() * 9000);
        const year = new Date().getFullYear();
        setDocRef(`AE-${year}-${randomPart}`);
    }, []);

    const clauses = eligibilityCertificateClauses[lang];

    const formatCurrency = (value: number | undefined) => {
        if (value === undefined) return '...';
        return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
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
                    <p className="text-gray-600 font-semibold">Département Analyse de Crédit</p>
                </div>
                 <div className="text-right text-xs text-gray-500">
                    <p>10 Place de la Bourse, 69002 Lyon, France</p>
                    <p>contact@vylscapital.com</p>
                </div>
            </header>

            <div className="text-right mb-12">
                 <p>{clauses.location_and_date.replace('{date}', data.signature_date || '___/___/_____')}</p>
            </div>

            <main className="space-y-6">
                <h2 className="text-center text-2xl font-bold uppercase mb-8">{clauses.title}</h2>
                <p className="text-sm">
                    {clauses.reference.replace('{ref}', docRef)}
                </p>

                <p>
                    {clauses.introduction
                        .replace('{beneficiary_name}', data.beneficiary_name || '_____________________')
                        .replace('{beneficiary_address}', data.beneficiary_address || '_____________________')
                        .replace('{beneficiary_id_number}', data.beneficiary_id_number || '_____________________')
                    }
                </p>
                <p className="font-bold text-base my-4 text-center p-4 bg-gray-100 rounded-md">
                    {clauses.eligibility_statement
                        .replace('{amount}', formatCurrency(data.eligibility_amount))}
                </p>
                <p>
                    {clauses.conditions
                        .replace('{validity_end_date}', data.validity_end_date || '___/___/_____')
                    }
                </p>
                 <p className="text-xs text-gray-600">{clauses.conclusion}</p>
            </main>

            <footer className="absolute bottom-16 right-16">
                <div className="flex justify-end">
                    <div className="text-center">
                        <div className="h-24 w-48 mb-2">
                           {/* Placeholder for signature/stamp image */}
                        </div>
                        <div className="border-t border-gray-400 pt-2">
                             <p className="font-semibold">{data.analyst_name || '_____________________'}</p>
                            <p className="text-xs">{clauses.analyst_title}</p>
                            <p className="text-xs">VylsCapital</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
