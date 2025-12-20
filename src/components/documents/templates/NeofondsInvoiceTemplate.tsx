
import React from 'react';
import Image from 'next/image';
import { neofondsInvoiceClauses } from '@/data/documents/neofonds-invoice-clauses';

interface NeofondsInvoiceTemplateProps {
    formData: any;
    lang: 'fr' | 'en' | 'de';
}

const NeofondsInvoiceTemplate: React.FC<NeofondsInvoiceTemplateProps> = ({ formData, lang }) => {
    const clauses = neofondsInvoiceClauses[lang] || neofondsInvoiceClauses['fr'];
    const company = clauses.company;

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
        return items.length > 0 ? items : [{ description: '...', quantity: 1, unit_price: 0 }];
    };
    
    const items = getItemsFromFormData(formData);
    const subtotal = items.reduce((acc: number, item: any) => acc + (Number(item.quantity) || 0) * (Number(item.unit_price) || 0), 0);
    const vatRate = 0.19; // German VAT rate
    const vat = subtotal * vatRate;
    const total = subtotal + vat;

    const dueDate = formData.date ? new Date(new Date(formData.date).setDate(new Date(formData.date).getDate() + 30)).toLocaleDateString(lang) : '';
    const replaceRef = (text: string) => text.replace(/{ref}/g, formData.ref || '');

    const colors = {
        primary: '#3b82f6',
        secondary: '#10b981',
        text: '#0f172a',
        muted: '#64748b',
        surface: '#f8fafc',
        background: '#ffffff',
        border: '#e2e8f0'
    };

    return (
        <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', color: colors.text, background: colors.background, fontSize: '12pt', padding: '40px', maxWidth: '800px', margin: 'auto', border: `1px solid ${colors.border}` }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '20px', marginBottom: '30px', borderBottom: `1px solid ${colors.border}` }}>
                <div>
                    <Image src="https://i.postimg.cc/ZqGtbXxd/Capture-d-ecran-2025-12-20-110200.png" alt="Neofonds Logo" width={140} height={35} />
                </div>
                <div style={{ textAlign: 'right', fontSize: '9pt', color: colors.muted }}>
                    <p>{company.address}</p>
                    <p>{company.emails[0]}</p>
                    <p>{company.phone}</p>
                </div>
            </header>

            <main>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                    <div>
                        <h1 style={{ fontSize: '22pt', fontWeight: 'bold', color: colors.primary, textTransform: 'uppercase' }}>{clauses.title}</h1>
                        <p style={{ fontSize: '10pt', color: colors.muted }}>
                            {clauses.invoice_number_label} {formData.ref || ''}
                        </p>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '10pt' }}>
                        <p><strong style={{ color: colors.text }}>{clauses.date_label}</strong> {formData.date ? new Date(formData.date).toLocaleDateString(lang) : '___________'}</p>
                        <p><strong style={{ color: colors.text }}>{clauses.due_date_label}</strong> {dueDate || '___________'}</p>
                    </div>
                </div>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '10pt', fontWeight: 'bold', textTransform: 'uppercase', color: colors.primary, marginBottom: '8px' }}>{clauses.bill_to_label}</h2>
                    <div style={{ fontSize: '11pt' }}>
                        <p style={{ fontWeight: 'bold' }}>{formData.client_name || '____________________'}</p>
                        <p style={{ whiteSpace: 'pre-line', color: colors.muted }}>{formData.client_address || '____________________'}</p>
                    </div>
                </section>

                <section>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11pt' }}>
                        <thead style={{ backgroundColor: colors.surface }}>
                            <tr>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '9pt', color: colors.muted }}>{clauses.table_headers.description}</th>
                                <th style={{ padding: '10px', width: '60px', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '9pt', color: colors.muted }}>{clauses.table_headers.quantity}</th>
                                <th style={{ padding: '10px', width: '120px', textAlign: 'right', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '9pt', color: colors.muted }}>{clauses.table_headers.unit_price}</th>
                                <th style={{ padding: '10px', width: '120px', textAlign: 'right', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '9pt', color: colors.muted }}>{clauses.table_headers.amount}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item: any, index: number) => (
                                <tr key={index} style={{ borderBottom: `1px solid ${colors.border}` }}>
                                    <td style={{ padding: '10px' }}>{item.description}</td>
                                    <td style={{ padding: '10px', textAlign: 'center' }}>{item.quantity}</td>
                                    <td style={{ padding: '10px', textAlign: 'right' }}>{new Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR' }).format(Number(item.unit_price) || 0)}</td>
                                    <td style={{ padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>{new Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR' }).format((Number(item.quantity) || 1) * (Number(item.unit_price) || 0))}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section style={{ marginTop: '30px', display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ width: '100%', maxWidth: '280px', fontSize: '11pt' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${colors.border}` }}>
                            <span style={{ color: colors.muted }}>{clauses.subtotal_label}</span>
                            <span>{new Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR' }).format(subtotal)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${colors.border}` }}>
                            <span style={{ color: colors.muted }}>{clauses.vat_label}</span>
                            <span>{new Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR' }).format(vat)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', marginTop: '8px', fontWeight: 'bold', fontSize: '14pt', color: colors.primary }}>
                            <span>{clauses.total_label}</span>
                            <span>{new Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR' }).format(total)}</span>
                        </div>
                    </div>
                </section>
                
            </main>

            <footer style={{ marginTop: '80px', paddingTop: '20px', borderTop: `1px solid ${colors.border}`, textAlign: 'center', fontSize: '9pt', color: colors.muted }}>
                <p style={{ fontWeight: 'bold', color: colors.text }}>{clauses.footer.thank_you}</p>
                <p>{clauses.footer.contact_info}</p>
            </footer>
        </div>
    );
};

export default NeofondsInvoiceTemplate;
