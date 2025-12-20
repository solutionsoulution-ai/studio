
import React from 'react';
import Image from 'next/image';
import { neofondsReceiptClauses } from '@/data/documents/neofonds-receipt-clauses';
import { signatureData } from '@/data/documents/signature-data';

interface NeofondsReceiptTemplateProps {
    formData: any;
    lang: 'fr' | 'en' | 'de';
}

const NeofondsReceiptTemplate: React.FC<NeofondsReceiptTemplateProps> = ({ formData, lang }) => {
    const clauses = neofondsReceiptClauses[lang] || neofondsReceiptClauses['fr'];
    const signer = signatureData.finance; // Le directeur financier signe les reçus
    const company = clauses.company;

    const replacePlaceholders = (text: string) => {
        return text
            .replace(/{ref}/g, formData.ref || '')
            .replace(/{payment_date}/g, formData.payment_date ? new Date(formData.payment_date).toLocaleDateString(lang) : '')
            .replace(/{payer_name}/g, formData.payer_name || '')
            .replace(/{payer_address}/g, formData.payer_address || '')
            .replace(/{payment_amount}/g, formData.payment_amount ? new Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR' }).format(formData.payment_amount) : '')
            .replace(/{payment_method}/g, formData.payment_method || '')
            .replace(/{payment_reference}/g, formData.payment_reference || '');
    };

    const colors = {
        primary: '#3b82f6',
        secondary: '#10b981',
        text: '#0f172a',
        muted: '#64748b',
        surface: '#f8fafc',
        background: '#ffffff'
    };

    return (
        <div 
            style={{
                fontFamily: 'Helvetica, Arial, sans-serif',
                color: colors.text,
                background: colors.background,
                fontSize: '12pt',
                padding: '40px',
                maxWidth: '800px',
                margin: 'auto',
                border: `1px solid #e2e8f0`
            }}
        >
            <header 
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    paddingBottom: '20px',
                    marginBottom: '30px',
                    borderBottom: `1px solid #e2e8f0`
                }}
            >
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
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                     <h1 style={{ fontSize: '22pt', fontWeight: 'bold', color: colors.primary, textTransform: 'uppercase' }}>{clauses.title}</h1>
                     <p style={{ fontSize: '10pt', color: colors.muted }}>
                         {replacePlaceholders(clauses.reference)} // {replacePlaceholders(clauses.date)}
                     </p>
                </div>
                
                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', color: colors.primary, marginBottom: '8px' }}>{clauses.received_from}</h2>
                    <div style={{ backgroundColor: colors.surface, padding: '12px', borderRadius: '6px', fontSize: '10pt' }}>
                        <p style={{ fontWeight: 'bold' }}>{formData.payer_name || '____________________'}</p>
                        <p style={{ whiteSpace: 'pre-line' }}>{formData.payer_address || '____________________'}</p>
                    </div>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', color: colors.primary, marginBottom: '8px' }}>{clauses.payment_details.title}</h2>
                    <div style={{ textAlign: 'center', backgroundColor: colors.surface, padding: '24px', borderRadius: '6px', border: `2px dashed ${colors.primary}` }}>
                        <p style={{ textTransform: 'uppercase', fontSize: '10pt', color: colors.muted }}>{clauses.payment_details.amount_label}</p>
                        <p style={{ fontWeight: 'bold', fontSize: '28pt', color: colors.primary, margin: '8px 0' }}>{replacePlaceholders('{payment_amount}')}</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '10pt', marginTop: '16px' }}>
                        <div>
                            <p style={{ fontWeight: 'bold' }}>{clauses.payment_details.method_label}:</p>
                            <p>{formData.payment_method || '____________________'}</p>
                        </div>
                        <div>
                            <p style={{ fontWeight: 'bold' }}>{clauses.payment_details.reference_label}:</p>
                            <p>{formData.payment_reference || '____________________'}</p>
                        </div>
                    </div>
                </section>

                <section style={{ fontSize: '10pt', lineHeight: '1.6' }}>
                    <h2 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', color: colors.primary, marginBottom: '8px' }}>{clauses.confirmation.title}</h2>
                    <p>{clauses.confirmation.content}</p>
                </section>

                <div style={{ marginTop: '80px', paddingTop: '32px', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <div style={{ textAlign: 'center', fontSize: '10pt' }}>
                        {signer.signatureUrl && <Image src={signer.signatureUrl} alt={`Signature de ${signer.name}`} width={150} height={50} style={{ margin: '0 auto' }} />}
                        <div style={{ borderTop: `1px solid #cbd5e1`, paddingTop: '8px', marginTop: '8px' }}>
                            <p style={{ fontWeight: 'bold' }}>{clauses.signature_label}</p>
                            <p style={{ color: colors.muted }}>{signer.name}, {signer.title[lang]}</p>
                        </div>
                    </div>
                </div>
            </main>

             <footer 
                style={{
                    marginTop: '40px',
                    paddingTop: '20px',
                    borderTop: `1px solid #e2e8f0`,
                    textAlign: 'center',
                    fontSize: '9pt',
                    color: colors.muted
                }}
            >
                <p style={{fontWeight: 'bold', color: colors.text}}>{clauses.footer.thank_you}</p>
                <p>{clauses.footer.contact_info}</p>
            </footer>
        </div>
    );
};

export default NeofondsReceiptTemplate;
