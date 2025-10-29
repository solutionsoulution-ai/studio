
import React from 'react';
import Image from 'next/image';
import { paymentReceiptClauses } from '@/data/documents/payment-receipt-clauses';
import { signatureData } from '@/data/documents/signature-data';
import DocumentWrapper from './DocumentWrapper';

interface PaymentReceiptTemplateProps {
    formData: any;
    lang: 'fr' | 'en' | 'de';
}

const PaymentReceiptTemplate: React.FC<PaymentReceiptTemplateProps> = ({ formData, lang }) => {
    const clauses = paymentReceiptClauses[lang] || paymentReceiptClauses['fr'];
    const signer = signatureData.finance; // Le directeur financier signe les reçus

    const replacePlaceholders = (text: string) => {
        return text
            .replace(/{ref}/g, formData.ref || '___________')
            .replace(/{payment_date}/g, formData.payment_date ? new Date(formData.payment_date).toLocaleDateString(lang) : '___________')
            .replace(/{payer_name}/g, formData.payer_name || '___________')
            .replace(/{payer_address}/g, formData.payer_address || '___________')
            .replace(/{payment_amount}/g, formData.payment_amount ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(formData.payment_amount) : '___________')
            .replace(/{payment_amount_in_words}/g, formData.payment_amount_in_words || '___________')
            .replace(/{payment_method}/g, formData.payment_method || '___________')
            .replace(/{payment_reference}/g, formData.payment_reference || '___________');
    };

    const paidStampText = {
        fr: 'PAYÉ',
        en: 'PAID',
        de: 'BEZAHLT'
    };

    return (
        <DocumentWrapper
            title={clauses.title}
            department={clauses.header.line2}
            docRef={replacePlaceholders(clauses.reference)}
            docDate={replacePlaceholders(clauses.date)}
            lang={lang}
        >
            <div style={{ position: 'relative' }}>
                <section className="mb-8">
                    <h2 className="text-sm font-bold uppercase text-[hsl(215,39%,29%)] mb-2">{clauses.received_from}</h2>
                    <div className="bg-slate-100 p-3 rounded-md text-xs">
                        <p className="font-bold">{formData.payer_name || '___________'}</p>
                        <p className="whitespace-pre-line">{formData.payer_address || '___________'}</p>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-sm font-bold uppercase text-[hsl(215,39%,29%)] mb-2">{clauses.payment_details.title}</h2>
                    <div className="text-center bg-slate-100 p-6 rounded-md">
                        <p className="uppercase text-xs text-[hsl(220,8.9%,46.1%)]">{clauses.payment_details.amount_label}</p>
                        <p className="font-bold text-3xl text-[hsl(215,39%,29%)] my-2">{replacePlaceholders('{payment_amount}')}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs mt-4">
                        <div>
                            <p className="font-semibold">{clauses.payment_details.method_label}:</p>
                            <p>{formData.payment_method || '___________'}</p>
                        </div>
                        <div>
                            <p className="font-semibold">{clauses.payment_details.reference_label}:</p>
                            <p>{formData.payment_reference || '___________'}</p>
                        </div>
                    </div>
                </section>

                <section className="text-sm leading-relaxed">
                    <h2 className="text-sm font-bold uppercase text-[hsl(215,39%,29%)] mb-2">{clauses.confirmation.title}</h2>
                    <p>{clauses.confirmation.content}</p>
                </section>

                <div style={{
                    position: 'absolute',
                    bottom: '80px',
                    left: '20px',
                    transform: 'rotate(-15deg)',
                    border: '3px solid red',
                    color: 'red',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    opacity: '0.8',
                    zIndex: 10
                }}>
                    {paidStampText[lang]}
                </div>

                <div className="mt-20 pt-8 grid grid-cols-2 items-end">
                     <div>
                        {/* Espace pour le cachet */}
                    </div>
                    <div className="text-right">
                        <div className="inline-block text-center text-xs">
                            {signer.signatureUrl && <Image src={signer.signatureUrl} alt={`Signature de ${signer.name}`} width={150} height={50} className="mx-auto" />}
                            <div className="border-t border-slate-400 pt-2 mt-2">
                                <p className="font-bold">{clauses.signature_label}</p>
                                <p className="text-[hsl(220,8.9%,46.1%)]">{signer.name}, {signer.title[lang]}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DocumentWrapper>
    );
};

export default PaymentReceiptTemplate;
