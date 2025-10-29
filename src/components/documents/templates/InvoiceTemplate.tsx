
import React from 'react';
import { invoiceClauses } from '@/data/documents/invoice-clauses';
import DocumentWrapper from './DocumentWrapper';

interface InvoiceTemplateProps {
    formData: any;
    lang: 'fr' | 'en' | 'de';
}

const InvoiceTemplate: React.FC<InvoiceTemplateProps> = ({ formData, lang }) => {
    const clauses = invoiceClauses[lang] || invoiceClauses['fr'];

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
            return [{ description: 'Frais de dossier pour ouverture de prêt', quantity: 1, unit_price: 450 }];
        }
        return items;
    };
    
    const items = getItemsFromFormData(formData);
    const subtotal = items.reduce((acc: number, item: any) => acc + (Number(item.quantity) || 0) * (Number(item.unit_price) || 0), 0);
    const vatRate = 0.20;
    const vat = subtotal * vatRate;
    const total = subtotal + vat;

    const dueDate = formData.date ? new Date(new Date(formData.date).setDate(new Date(formData.date).getDate() + 30)).toLocaleDateString(lang) : '___________';
    
    const replaceRef = (text: string) => text.replace(/{ref}/g, formData.ref || '___________');

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
                         {clauses.invoice_number_label} {formData.ref || '___________'}
                     </p>
                </div>
                 <div className="text-right text-xs">
                     <p><span className="font-bold">{clauses.date_label}</span> {formData.date ? new Date(formData.date).toLocaleDateString(lang) : '___________'}</p>
                     <p><span className="font-bold">{clauses.due_date_label}</span> {dueDate}</p>
                 </div>
            </header>
            
            <section className="mb-8">
                 <h3 className="text-xs font-bold uppercase text-slate-500 mb-1">{clauses.bill_to_label}</h3>
                 <p className="font-bold">{formData.client_name || '___________'}</p>
                 <p className="text-sm text-slate-600 whitespace-pre-line">{formData.client_address || '___________'}</p>
            </section>
            
            <section>
                 <table className="w-full text-sm">
                    <thead className="bg-slate-100">
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
                                <td className="p-2">{item.description || '___________'}</td>
                                <td className="p-2 text-center">{item.quantity || 1}</td>
                                <td className="p-2 text-right">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(Number(item.unit_price) || 0)}</td>
                                <td className="p-2 text-right font-semibold">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format((Number(item.quantity) || 1) * (Number(item.unit_price) || 0))}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

             <section className="mt-8 flex justify-end">
                <div className="w-full max-w-sm text-sm">
                    <div className="flex justify-between py-1.5 border-b border-slate-200">
                        <span className="text-slate-500">{clauses.subtotal_label}</span>
                        <span>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(subtotal)}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-200">
                         <span className="text-slate-500">{clauses.vat_label}</span>
                         <span>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(vat)}</span>
                    </div>
                    <div className="flex justify-between py-2 mt-2 font-bold text-base bg-slate-100 px-2 rounded-md text-[hsl(215,39%,29%)]">
                        <span>{clauses.total_label}</span>
                        <span>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(total)}</span>
                    </div>
                </div>
            </section>
            
            <section className="mt-12 text-xs text-slate-500 bg-slate-50 p-4 rounded-md">
                <h4 className="font-bold text-slate-700 mb-2">{clauses.payment_terms.title}</h4>
                <p className="mb-2">{clauses.payment_terms.instruction}</p>
                <div className="space-y-2 bg-white p-3 rounded border border-slate-200 my-1 font-mono text-xs">
                    <div>
                        <span className="font-sans font-semibold text-slate-600">{clauses.payment_terms.bank_name_label}: </span>
                        <span>{formData.bank_name || 'NOM DE LA BANQUE'}</span>
                    </div>
                    <div>
                        <span className="font-sans font-semibold text-slate-600">{clauses.payment_terms.iban_label}: </span>
                        <span>{formData.iban || 'FRXX XXXX XXXX XXXX XXXX XXXX XXX'}</span>
                    </div>
                    <div>
                        <span className="font-sans font-semibold text-slate-600">{clauses.payment_terms.bic_label}: </span>
                        <span>{formData.bic || 'BIGBIFR1XXX'}</span>
                    </div>
                    <div>
                        <span className="font-sans font-semibold text-slate-600">{clauses.payment_terms.payment_reason_label}: </span>
                        <span>{replaceRef(clauses.payment_terms.payment_reason_value)}</span>
                    </div>
                </div>
                <p className="italic mt-2">{clauses.payment_terms.proof_of_payment}</p>
            </section>

             <div className="text-center text-xs text-slate-500 mt-12">
                 <p className="font-semibold">{clauses.footer.thank_you}</p>
                 <p>{clauses.footer.contact_info}</p>
            </div>
            
        </DocumentWrapper>
    );
};

export default InvoiceTemplate;
