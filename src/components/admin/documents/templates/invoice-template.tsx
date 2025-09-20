
"use client";

import { invoiceClauses } from "@/data/documents/invoice-clauses";
import { FileText } from "lucide-react";
import Image from "next/image";

export interface InvoiceData {
    customer_name?: string;
    customer_address?: string;
    invoice_number?: string;
    invoice_date?: string;
    description?: string;
    amount?: number;
    payment_iban?: string;
}

interface InvoiceTemplateProps {
    data: InvoiceData;
    lang: 'fr' | 'en';
}

export default function InvoiceTemplate({ data, lang }: InvoiceTemplateProps) {
    const clauses = invoiceClauses[lang];

    const formatCurrency = (value: number | undefined) => {
        if (value === undefined) return '...';
        return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
            style: 'currency',
            currency: 'EUR',
        }).format(value);
    };

    const vatAmount = 0.00;
    const totalAmount = data.amount || 0;

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
            <header className="flex justify-between items-start mb-16">
                <div>
                    <h1 className="text-3xl font-bold uppercase text-primary">VylsCapital</h1>
                    <p className="text-gray-600 font-semibold">Département Comptabilité</p>
                    <p className="text-gray-600 text-xs mt-2">10 Place de la Bourse, 69002 Lyon, France</p>
                </div>
                <div className="text-right">
                    <h2 className="text-3xl font-bold uppercase text-gray-500">{clauses.title}</h2>
                    <p className="mt-1">{clauses.invoice_number_label} {data.invoice_number || '...'}</p>
                    <p>{clauses.date_label} {data.invoice_date || '...'}</p>
                </div>
            </header>

            <aside className="border-l-4 border-primary bg-primary/5 p-4 mb-10">
                <h3 className="font-bold text-primary flex items-center gap-2"><FileText size={18} /> Importance de ce document</h3>
                <p className="text-xs mt-2">
                    Une facture est un document comptable essentiel qui atteste d'une transaction commerciale. Elle sert de preuve de la prestation de service ou de la vente, et elle est indispensable pour la gestion de la comptabilité, la déclaration de la TVA et comme justificatif en cas de contrôle fiscal.
                </p>
            </aside>


            <section className="mb-12">
                <h3 className="font-bold border-b-2 border-primary pb-1 mb-2 text-primary">{clauses.bill_to_label}</h3>
                <p className="font-semibold">{data.customer_name || '...'}</p>
                <p className="whitespace-pre-line">{data.customer_address || '...'}</p>
            </section>
            
            <main>
                <table className="w-full border-collapse text-base">
                    <thead className="bg-primary/10">
                        <tr>
                            <th className="border-b-2 border-primary p-2 text-left font-bold text-primary">{clauses.table_headers.description}</th>
                            <th className="border-b-2 border-primary p-2 text-right font-bold text-primary">{clauses.table_headers.amount}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border-b border-border p-2">{data.description || '...'}</td>
                            <td className="border-b border-border p-2 text-right">{formatCurrency(data.amount)}</td>
                        </tr>
                        {/* Add more rows here if needed */}
                        <tr className="h-24">
                           <td className="border-b border-border p-2"></td>
                           <td className="border-b border-border p-2"></td>
                        </tr>
                    </tbody>
                </table>
                
                <div className="flex justify-end mt-4">
                    <div className="w-1/2">
                        <table className="w-full">
                            <tbody>
                                <tr className="text-base">
                                    <td className="p-2 font-semibold">{clauses.subtotal_label}</td>
                                    <td className="p-2 text-right">{formatCurrency(data.amount)}</td>
                                </tr>
                                <tr className="text-base">
                                    <td className="p-2 font-semibold">{clauses.vat_label}</td>
                                    <td className="p-2 text-right">{formatCurrency(vatAmount)}</td>
                                </tr>
                                <tr className="bg-primary text-primary-foreground font-bold text-lg">
                                    <td className="p-2">{clauses.total_label}</td>
                                    <td className="p-2 text-right">{formatCurrency(totalAmount)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <footer className="absolute bottom-16 left-16 right-16 border-t border-border pt-8">
                <div className="flex justify-between items-end">
                    <div>
                        <h3 className="font-bold mb-2 text-primary">{clauses.payment_terms.title}</h3>
                        <p>{clauses.payment_terms.due_date}</p>
                        <p className="mt-2 whitespace-pre-wrap">
                            {clauses.payment_terms.iban_label} <br />
                            <span className="font-mono">{data.payment_iban || '...'}</span>
                        </p>
                    </div>
                     <div className="text-center">
                        <div className="h-20 w-40 mb-1 relative">
                             <Image src="https://i.postimg.cc/D0y9RLyN/signature-2.png" alt="Signature" layout="fill" objectFit="contain" objectPosition="bottom center"/>
                        </div>
                        <div className="border-t border-border pt-1">
                            <p className="font-semibold text-sm">Julien Moreau</p>
                            <p className="text-xs">Directeur Financier, VylsCapital</p>
                        </div>
                    </div>
                </div>
                <p className="mt-8 text-center text-xs text-gray-500">
                    {clauses.footer.thank_you}
                </p>
            </footer>
        </div>
    );
}
