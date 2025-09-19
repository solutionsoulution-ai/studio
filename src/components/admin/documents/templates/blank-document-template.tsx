
"use client";

import { FileText } from "lucide-react";
import Image from "next/image";

export interface BlankDocumentData {
    customer_name?: string;
    customer_address?: string;
    invoice_number?: string;
    invoice_date?: string;
    description?: string;
    amount?: number;
    payment_iban?: string;
}

interface BlankDocumentTemplateProps {
    data: BlankDocumentData;
    lang: 'fr' | 'en'; // Lang is kept for consistency, but this template will be English.
}

export default function BlankDocumentTemplate({ data, lang }: BlankDocumentTemplateProps) {
    
    const formatCurrency = (value: number | undefined) => {
        if (value === undefined) return '...';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'EUR',
        }).format(value);
    };

    const vatAmount = 0.00;
    const totalAmount = data.amount || 0;

    return (
        <div id="pdf-preview" className="bg-white text-black text-sm font-serif shadow-2xl p-16 w-[210mm] min-h-[297mm] mx-auto relative">
            <header className="flex justify-between items-start mb-16">
                <div>
                    <h1 className="text-3xl font-bold uppercase text-primary">VylsCapital</h1>
                    <p className="text-gray-600 font-semibold">Accounting Department</p>
                    <p className="text-gray-600 text-xs mt-2">10 Place de la Bourse, 69002 Lyon, France</p>
                </div>
                <div className="text-right">
                    <h2 className="text-3xl font-bold uppercase text-gray-500">Invoice</h2>
                    <p className="mt-1">Invoice No: {data.invoice_number || '...'}</p>
                    <p>Date: {data.invoice_date || '...'}</p>
                </div>
            </header>

            <aside className="border-l-4 border-primary bg-primary/5 p-4 mb-10">
                <h3 className="font-bold text-primary flex items-center gap-2"><FileText size={18} /> Importance of this document</h3>
                <p className="text-xs mt-2">
                    An invoice is an essential accounting document that certifies a commercial transaction. It serves as proof of service or sale, and is indispensable for accounting management, VAT declaration, and as justification in case of a tax audit.
                </p>
            </aside>

            <section className="mb-12">
                <h3 className="font-bold border-b-2 border-primary pb-1 mb-2 text-primary">Bill To:</h3>
                <p className="font-semibold">{data.customer_name || '...'}</p>
                <p className="whitespace-pre-line">{data.customer_address || '...'}</p>
            </section>
            
            <main>
                <table className="w-full border-collapse text-base">
                    <thead className="bg-primary/10">
                        <tr>
                            <th className="border-b-2 border-primary p-2 text-left font-bold text-primary">Description</th>
                            <th className="border-b-2 border-primary p-2 text-right font-bold text-primary">Amount</th>
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
                                    <td className="p-2 font-semibold">Subtotal (VAT Excl.)</td>
                                    <td className="p-2 text-right">{formatCurrency(data.amount)}</td>
                                </tr>
                                <tr className="text-base">
                                    <td className="p-2 font-semibold">VAT (0%)</td>
                                    <td className="p-2 text-right">{formatCurrency(vatAmount)}</td>
                                </tr>
                                <tr className="bg-primary text-primary-foreground font-bold text-lg">
                                    <td className="p-2">Total Due</td>
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
                        <h3 className="font-bold mb-2 text-primary">Payment Terms</h3>
                        <p>Payment due within 30 days from the invoice date.</p>
                        <p className="mt-2">
                            IBAN: <span className="font-mono">{data.payment_iban || '...'}</span>
                        </p>
                        <p className="mt-2">
                            BIC/SWIFT: <span className="font-mono">VYLCFR2LXXX</span>
                        </p>
                    </div>
                     <div className="text-center">
                        <div className="h-20 w-40 mb-1 relative">
                             <Image src="https://i.postimg.cc/D0y9RLyN/signature-2.png" alt="Signature" layout="fill" objectFit="contain" objectPosition="bottom center"/>
                        </div>
                        <div className="border-t border-border pt-1">
                            <p className="font-semibold text-sm">Julien Moreau</p>
                            <p className="text-xs">Chief Financial Officer, VylsCapital</p>
                        </div>
                    </div>
                </div>
                <p className="mt-8 text-center text-xs text-gray-500">
                    Thank you for your business. If you have any questions about this invoice, please contact us at accounting@vylscapital.com.
                </p>
            </footer>
        </div>
    );
}
