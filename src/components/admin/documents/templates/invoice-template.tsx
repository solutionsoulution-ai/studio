
"use client";

import { invoiceClauses } from "@/data/documents/invoice-clauses";

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
        <div id="pdf-preview" className="bg-white text-black text-sm font-serif shadow-2xl p-16 w-[210mm] min-h-[297mm] mx-auto">
            <header className="flex justify-between items-start mb-16">
                <div>
                    <h1 className="text-3xl font-bold uppercase text-gray-800">VylsCapital</h1>
                    <p className="text-gray-600">10 Place de la Bourse, 69002 Lyon, France</p>
                </div>
                <div className="text-right">
                    <h2 className="text-3xl font-bold uppercase text-gray-500">{clauses.title}</h2>
                    <p className="mt-1">{clauses.invoice_number_label} {data.invoice_number || '...'}</p>
                    <p>{clauses.date_label} {data.invoice_date || '...'}</p>
                </div>
            </header>

            <section className="mb-12">
                <h3 className="font-bold border-b pb-1 mb-2">{clauses.bill_to_label}</h3>
                <p className="font-semibold">{data.customer_name || '...'}</p>
                <p className="whitespace-pre-line">{data.customer_address || '...'}</p>
            </section>
            
            <main>
                <table className="w-full border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2 text-left font-bold">{clauses.table_headers.description}</th>
                            <th className="border p-2 text-right font-bold">{clauses.table_headers.amount}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border p-2">{data.description || '...'}</td>
                            <td className="border p-2 text-right">{formatCurrency(data.amount)}</td>
                        </tr>
                    </tbody>
                </table>
                
                <div className="flex justify-end mt-4">
                    <div className="w-1/2">
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td className="p-2 font-semibold">{clauses.subtotal_label}</td>
                                    <td className="p-2 text-right">{formatCurrency(data.amount)}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold">{clauses.vat_label} (0%)</td>
                                    <td className="p-2 text-right">{formatCurrency(vatAmount)}</td>
                                </tr>
                                <tr className="bg-gray-100 font-bold text-base">
                                    <td className="border p-2">{clauses.total_label}</td>
                                    <td className="border p-2 text-right">{formatCurrency(totalAmount)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <footer className="mt-24 border-t pt-8">
                <h3 className="font-bold mb-2">{clauses.payment_terms.title}</h3>
                <p>{clauses.payment_terms.due_date}</p>
                <p className="mt-2">
                    {clauses.payment_terms.iban_label} <span className="font-mono">{data.payment_iban || '...'}</span>
                </p>
                <p className="mt-8 text-center text-xs text-gray-500">
                    {clauses.footer.thank_you}
                </p>
            </footer>
        </div>
    );
}
