
import React from 'react';
import Image from 'next/image';
import { neofondsReceiptClauses } from '@/data/documents/neofonds-receipt-clauses';
import { signatureData } from '@/data/documents/signature-data';
import DocumentWrapper from './DocumentWrapper';

interface NeofondsReceiptTemplateProps {
    formData: any;
    lang: 'fr' | 'en' | 'de';
}

const NeofondsReceiptTemplate: React.FC<NeofondsReceiptTemplateProps> = ({ formData, lang }) => {
    const clauses = neofondsReceiptClauses[lang] || neofondsReceiptClauses['fr'];
    const signer = signatureData.finance;

    const replacePlaceholders = (text: string) => {
        if (!text) return '';
        return text
            .replace(/{ref}/g, formData.ref || '')
            .replace(/{payment_date}/g, formData.payment_date ? new Date(formData.payment_date).toLocaleDateString(lang) : '')
            .replace(/{payer_name}/g, formData.payer_name || '')
            .replace(/{payer_address}/g, formData.payer_address || '')
            .replace(/{payment_amount}/g, formData.payment_amount ? new Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR' }).format(formData.payment_amount) : '')
            .replace(/{payment_method}/g, formData.payment_method || '')
            .replace(/{payment_reference}/g, formData.payment_reference || '');
    };

    return (
        <DocumentWrapper 
            title={clauses.title}
            department={clauses.header.line2}
            docRef={replacePlaceholders(clauses.reference)}
            docDate={replacePlaceholders(clauses.date)}
            lang={lang}
        >
            <div>
                <section className="mb-8">
                    <h2 className="text-sm font-bold uppercase text-[#3b82f6] mb-2">{clauses.received_from}</h2>
                    <div className="bg-[#f8fafc] p-3 rounded-md text-xs">
                        <p className="font-bold">{formData.payer_name || ''}</p>
                        <p className="whitespace-pre-line">{formData.payer_address || ''}</p>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-sm font-bold uppercase text-[#3b82f6] mb-2">{clauses.payment_details.title}</h2>
                    <div className="text-center bg-[#f8fafc] p-6 rounded-md border-2 border-dashed border-[#3b82f6]">
                        <p className="uppercase text-xs text-[#64748b]">{clauses.payment_details.amount_label}</p>
                        <p className="font-bold text-3xl text-[#3b82f6] my-2">{replacePlaceholders('{payment_amount}')}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs mt-4">
                        <div>
                            <p className="font-semibold">{clauses.payment_details.method_label}:</p>
                            <p>{formData.payment_method || ''}</p>
                        </div>
                        <div>
                            <p className="font-semibold">{clauses.payment_details.reference_label}:</p>
                            <p>{formData.payment_reference || ''}</p>
                        </div>
                    </div>
                </section>

                <section className="text-sm leading-relaxed">
                    <h2 className="text-sm font-bold uppercase text-[#3b82f6] mb-2">{clauses.confirmation.title}</h2>
                    <p>{clauses.confirmation.content}</p>
                </section>

                <div className="mt-20 pt-8 grid grid-cols-2 items-end">
                     <div className="text-left text-xs text-[#64748b]">
                        <p className="font-semibold text-[#0f172a]">{clauses.footer.thank_you}</p>
                        <p>{clauses.footer.contact_info}</p>
                        {clauses.footer.emails.map((email: string) => (
                            <p key={email}>{email}</p>
                        ))}
                    </div>
                    <div className="text-right">
                        <div className="inline-block text-center text-xs">
                            {signer.signatureUrl && <Image src={signer.signatureUrl} alt={`Signature de ${signer.name}`} width={150} height={50} className="mx-auto" />}
                            <div className="border-t border-slate-400 pt-2 mt-2">
                                <p className="font-bold">{clauses.signature_label}</p>
                                <p className="text-[#64748b]">{signer.name}, {signer.title[lang]}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DocumentWrapper>
    );
};

export default NeofondsReceiptTemplate;
