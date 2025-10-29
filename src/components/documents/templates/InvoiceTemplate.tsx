
import React from 'react';
import Image from 'next/image';
import { Landmark, Phone, Mail } from 'lucide-react';
import { invoiceClauses } from '@/data/documents/invoice-clauses';
import { signatureData } from '@/data/documents/signature-data';

interface InvoiceTemplateProps {
    formData: any;
    lang: 'fr' | 'en';
}

const InvoiceTemplate: React.FC<InvoiceTemplateProps> = ({ formData, lang }) => {
    const clauses = invoiceClauses[lang] || invoiceClauses['fr'];
    const signer = signatureData.finance;
    const items = formData.items || [{ description: 'Frais de dossier', amount: 450 }];
    const subtotal = items.reduce((acc: number, item: any) => acc + (item.amount || 0), 0);
    const vat = 0;
    const total = subtotal + vat;

    return (
        <div className="bg-white text-[#09090b] font-sans p-8 max-w-4xl mx-auto border border-[#f4f4f5] shadow-lg">
            <header className="flex justify-between items-start mb-16">
                <div>
                    <div className="flex items-center mb-4">
                        <Landmark className="h-8 w-8 text-[#3d5afe] mr-3" />
                        <h1 className="text-3xl font-bold text-[#09090b]">Capfinfy</h1>
                    </div>
                    <div className="text-xs text-[#707079]">
                        <p>1 Place de la Bourse, 69002 Lyon, France</p>
                        <p>RCS Lyon 891 785 359 | N° ORIAS : 21008679</p>
                    </div>
                </div>
                <div className="text-right">
                    <h2 className="text-4xl font-bold text-[#3d5afe] uppercase">{clauses.title}</h2>
                    <div className="mt-2 text-sm text-[#707079]">
                        <p>{clauses.invoice_number_label} {formData.ref || '___________'}</p>
                        <p>{clauses.date_label} {formData.date ? new Date(formData.date).toLocaleDateString(lang) : '___________'}</p>
                    </div>
                </div>
            </header>

            <main>
                <div className="mb-12">
                    <h3 className="text-sm font-semibold uppercase text-[#707079] mb-2">{clauses.bill_to_label}</h3>
                    <p className="font-bold text-lg text-[#09090b]">{formData.client_name || '___________'}</p>
                    <p className="text-[#707079]">{formData.client_address || '___________'}</p>
                </div>
                
                <table className="w-full mb-12 text-sm">
                    <thead className="bg-[#f4f4f5]">
                        <tr>
                            <th className="p-3 text-left font-semibold text-[#09090b] uppercase">{clauses.table_headers.description}</th>
                            <th className="p-3 text-right font-semibold text-[#09090b] uppercase">{clauses.table_headers.amount}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item: any, index: number) => (
                            <tr key={index} className="border-b border-[#f4f4f5]">
                                <td className="p-3">{item.description || '___________'}</td>
                                <td className="p-3 text-right">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(item.amount || 0)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <div className="flex justify-end mb-12">
                    <div className="w-full max-w-xs text-sm">
                        <div className="flex justify-between py-2">
                            <span className="text-[#707079]">Sous-total :</span>
                            <span className="font-semibold">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(subtotal)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-[#f4f4f5]">
                             <span className="text-[#707079]">TVA (0%) :</span>
                             <span className="font-semibold">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(vat)}</span>
                        </div>
                        <div className="flex justify-between py-3 mt-2 font-bold text-lg text-[#3d5afe]">
                            <span>{clauses.total_label} :</span>
                            <span>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(total)}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-[#f4f4f5] p-6 rounded-lg text-sm">
                    <h4 className="font-bold text-[#09090b] mb-2">{clauses.payment_terms.title}</h4>
                    <p className="text-[#707079] mb-4">{clauses.payment_terms.due_date}</p>
                    <p className="text-[#707079]">{clauses.payment_terms.iban_label}</p>
                    <p className="font-mono bg-white p-2 rounded border border-[#f4f4f5]">{formData.iban || 'FRXX XXXX XXXX XXXX XXXX XXXX XXX'}</p>
                </div>
                 <div className="mt-16 text-center">
                    {signer.signatureUrl && <Image src={signer.signatureUrl} alt={`Signature de ${signer.name}`} width={120} height={40} className="mx-auto" />}
                    <p className="text-sm font-semibold border-t border-[#707079] mt-2 pt-2 inline-block px-4">{signer.name}</p>
                    <p className="text-xs text-[#707079]">{signer.title[lang]}</p>
                </div>
            </main>

            <footer className="mt-16 pt-8 border-t border-[#f4f4f5] text-center text-xs text-[#707079]">
                 <p className="mb-4">
                    Pour toute question concernant cette facture, veuillez contacter notre service comptabilité.
                 </p>
                <div className="flex justify-center items-center space-x-4">
                    <span className="flex items-center"><Phone className="h-3 w-3 mr-1" /> +33 7 56 98 67 69</span>
                    <span className="flex items-center"><Mail className="h-3 w-3 mr-1" /> contact@capfinfy.com</span>
                </div>
            </footer>
        </div>
    );
};

export default InvoiceTemplate;
