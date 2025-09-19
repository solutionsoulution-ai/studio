
"use client";

import { insuranceCertificateClauses } from "@/data/documents/insurance-certificate-clauses";
import { useState, useEffect } from 'react';
import { FileText, ShieldCheck } from "lucide-react";
import Image from "next/image";

export interface InsuranceCertificateData {
    insured_name?: string;
    lender_name?: string;
    loan_id?: string;
    insured_capital?: number;
    monthly_premium?: number;
    signature_date?: string;
    effective_date?: string;
    end_date?: string;
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
        <div id="pdf-preview" className="bg-white text-black text-sm font-serif shadow-2xl p-16 w-[210mm] min-h-[297mm] mx-auto relative">
            <header className="flex justify-between items-start mb-12 border-b-2 border-primary pb-4">
                 <div>
                    <h1 className="text-3xl font-bold uppercase text-primary">VylsCapital</h1>
                    <p className="text-gray-600 font-semibold">VylsCapital Assurance</p>
                </div>
                 <div className="text-right text-xs text-gray-500">
                    <p>10 Place de la Bourse, 69002 Lyon, France</p>
                    <p>assurance@vylscapital.com</p>
                </div>
            </header>

            <h2 className="text-center text-2xl font-bold uppercase mb-12">{clauses.title}</h2>
            
            <p className="text-right mb-8">
                {clauses.reference.replace('{ref}', docRef)}
            </p>

            <aside className="border-l-4 border-primary bg-primary/5 p-4 mb-10">
                <h3 className="font-bold text-primary flex items-center gap-2"><FileText size={18} /> Importance de ce document</h3>
                <p className="text-xs mt-2">
                    Cette attestation est le document officiel qui prouve que votre prêt est couvert par une assurance. Elle est exigée par l'organisme prêteur et vous protège, ainsi que vos proches, contre certains aléas de la vie (décès, invalidité) en garantissant le remboursement du capital restant dû.
                </p>
            </aside>

            <main className="space-y-8">
                <p>
                    {clauses.introduction}
                </p>

                <div className="border-t border-b py-4 my-6 space-y-3 bg-gray-50 p-4 rounded-md">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                        <div className="font-semibold">{clauses.insured_label}:</div>
                        <div className="font-medium">{data.insured_name || '_____________________'}</div>

                        <div className="font-semibold">{clauses.beneficiary_label}:</div>
                        <div>{data.lender_name || '_____________________'}</div>

                        <div className="font-semibold">{clauses.loan_id_label}:</div>
                        <div className="font-mono">{data.loan_id || '_____________________'}</div>

                        <div className="font-semibold">{clauses.capital_label}:</div>
                        <div className="font-bold">{formatCurrency(data.insured_capital)}</div>

                        <div className="font-semibold">{clauses.premium_label}:</div>
                        <div className="font-bold">{formatCurrency(data.monthly_premium)} / mois</div>
                        
                        <div className="font-semibold">{clauses.effective_date_label}:</div>
                        <div>{data.effective_date || '___/___/_____'}</div>

                        <div className="font-semibold">{clauses.end_date_label}:</div>
                        <div>{data.end_date || '___/___/_____'}</div>
                    </div>
                </div>

                <h3 className="font-bold text-base mt-6 flex items-center gap-2 text-primary"><ShieldCheck /> {clauses.coverage_summary}</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                    <li><strong>{clauses.guarantees.death.title} :</strong> {clauses.guarantees.death.description}</li>
                    <li><strong>{clauses.guarantees.disability.title} :</strong> {clauses.guarantees.disability.description}</li>
                    <li><strong>{clauses.guarantees.incapacity.title} :</strong> {clauses.guarantees.incapacity.description}</li>
                </ul>
                <p className="text-xs text-gray-600">{clauses.notice_reference}</p>


                 <p className="mt-8">
                    {clauses.conclusion
                        .replace('{signature_date}', data.signature_date || '___/___/_____')
                    }
                </p>
            </main>

            <footer className="absolute bottom-16 right-16">
                <div className="text-center">
                    <div className="h-24 w-48 mb-2 relative">
                        <Image src="https://i.postimg.cc/bvp368vC/signature-3.png" alt="Signature" layout="fill" objectFit="contain" objectPosition="bottom center"/>
                    </div>
                    <div className="border-t border-gray-400 pt-2">
                        <p className="font-semibold">Isabelle Petit</p>
                        <p className="text-xs">Directrice des Assurances, VylsCapital</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
