
import React from 'react';
import { neofondsInvoiceClauses } from '@/data/documents/neofonds-invoice-clauses';
import DocumentWrapper from '../DocumentWrapper';
import { useDocumentGenerator } from '../DocumentGenerator';

const NeofondsInvoiceTemplate: React.FC = () => {
    const { formData, lang } = useDocumentGenerator();
    const clauses = neofondsInvoiceClauses[lang] || neofondsInvoiceClauses['fr'];

    const getItemsFromFormData = (data: any) => {
        const items = [];
        for (let i = 1; i <= 3; i++) {
            const description = data[`item${i}_description`];
            const quantity = data[`item${i}_quantity`];
            const unit_price = data[`item${i}_unit_price`];

            if (description && description.trim() !== '') {
                items.push({
                    description,
                    quantity: Number(quantity) || 1,
                    unit_price: Number(unit_price) || 0,
                });
            }
        }
        if (items.length === 0) {
            return [];
        }
        return items;
    };
    
    const items = getItemsFromFormData(formData);
    const subtotal = items.reduce((acc: number, item: any) => acc + (Number(item.quantity) || 0) * (Number(item.unit_price) || 0), 0);
    const vatRate = formData.vat_rate ? Number(formData.vat_rate) / 100 : 0.19;
    const vat = subtotal * vatRate;
    const total = subtotal + vat;

    const replacePlaceholders = (text: string) => {
        if (!text) return '';
        return text
            .replace(/{ref}/g, formData.ref || '')
            .replace(/{vat_rate}/g, (vatRate * 100).toFixed(0));
    };

    return (
        <DocumentWrapper 
            title={clauses.title}
            hideDepartment
            lang={lang}
        >
            <header className="flex justify-between items-start mb-8 pb-4">
                <div>
                     <h2 className="text-2xl font-bold uppercase text-[hsl(215,39%,29%)]">{clauses.title}</h2>
                     <p className="text-xs text-slate-500">
                         {clauses.invoice_number_label} {formData.ref || ''}
                     </p>
                </div>
            </header>
            
            <section className="mb-8">
                 <h3 className="text-xs font-bold uppercase text-slate-500 mb-1">{clauses.bill_to_label}</h3>
                 <p className="font-bold">{formData.client_name || ''}</p>
                 <p className="text-sm text-slate-600 whitespace-pre-line">{formData.client_address || ''}</p>
            </section>
            
            <section>
                 <table className="w-full text-sm">
                    <thead style={{ backgroundColor: '#f8fafc' }}>
                        <tr>
                            <th className="p-2 text-left font-bold text-xs uppercase">{clauses.table_headers.description}</th>
                            <th className="p-2 w-20 text-center font-bold text-xs uppercase">{clauses.table_headers.quantity}</th>
                            <th className="p-2 w-32 text-right font-bold text-xs uppercase">{clauses.table_headers.unit_price}</th>
                            <th className="p-2 w-32 text-right font-bold text-xs uppercase">{clauses.table_headers.amount}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item: any, index: number) => (
                            <tr key={index} className="border-b border-slate-200">
                                <td className="p-2">{item.description}</td>
                                <td className="p-2 text-center">{item.quantity}</td>
                                <td className="p-2 text-right">{new Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR' }).format(Number(item.unit_price) || 0)}</td>
                                <td className="p-2 text-right font-semibold">{new Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR' }).format((Number(item.quantity) || 1) * (Number(item.unit_price) || 0))}</td>
                            </tr>
                        ))}
                         {items.length === 0 && (
                            <tr className="border-b border-slate-200">
                                <td className="p-2 text-slate-400 italic">Aucun article...</td>
                                <td/><td/><td/>
                            </tr>
                         )}
                    </tbody>
                </table>
            </section>

             <section className="mt-8 flex justify-end">
                <div className="w-full max-w-sm text-sm">
                    <div className="flex justify-between py-1.5 border-b border-slate-200">
                        <span className="text-slate-500">{clauses.subtotal_label}</span>
                        <span>{new Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR' }).format(subtotal)}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-200">
                         <span className="text-slate-500">{replacePlaceholders(clauses.vat_label)}</span>
                         <span>{new Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR' }).format(vat)}</span>
                    </div>
                    <div className="flex justify-between py-2 mt-2 font-bold text-base bg-slate-100 px-2 rounded-md text-[hsl(215,39%,29%)]">
                        <span>{clauses.total_label}</span>
                        <span>{new Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR' }).format(total)}</span>
                    </div>
                </div>
            </section>
        </DocumentWrapper>
    );
};

export default NeofondsInvoiceTemplate;
