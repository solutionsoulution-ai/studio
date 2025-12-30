
import React from 'react';
import Image from 'next/image';
import { neofondsReceiptClauses } from '@/data/documents/neofonds-receipt-clauses';
import { signatureData } from '@/data/documents/signature-data';
import DocumentWrapper from './DocumentWrapper';
import ArticleHeader from './ArticleHeader';
import { useBrand } from '@/context/BrandContext';
import { Language } from '@/data/documents/languages';

interface NeofondsReceiptTemplateProps {
    formData: any;
    lang: Language;
}

const NeofondsReceiptTemplate: React.FC<NeofondsReceiptTemplateProps> = ({ formData, lang }) => {
    const { companyInfo } = useBrand();
    const clauses = neofondsReceiptClauses[lang] || neofondsReceiptClauses['fr'];
    const signer = signatureData(companyInfo.brandKey).finance;

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
            department={clauses.company.name}
            docRef={replacePlaceholders(clauses.reference)}
            docDate={replacePlaceholders(clauses.date)}
            lang={lang}
        >
            <div>
                <section className="mb-8">
                    <ArticleHeader title={clauses.received_from}/>
                    <div className="bg-[#f8fafc] p-3 rounded-md text-xs">
                        <p className="font-bold">{formData.payer_name || ''}</p>
                        <p className="whitespace-pre-line">{formData.payer_address || ''}</p>
                    </div>
                </section>

                <section className="mb-8">
                    <ArticleHeader title={clauses.payment_details.title}/>
                    <div className="text-center bg-[#f8fafc] p-6 rounded-md border-2 border-dashed border-primary">
                        <p className="uppercase text-xs text-muted-foreground">{clauses.payment_details.amount_label}</p>
                        <p className="font-bold text-3xl text-primary my-2">{replacePlaceholders('{payment_amount}')}</p>
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
                    <ArticleHeader title={clauses.confirmation.title}/>
                    <p>{clauses.confirmation.content}</p>
                </section>

                <div className="mt-20 pt-8 grid grid-cols-2 items-end" style={{ pageBreakInside: 'avoid' }}>
                     <div className="text-left text-xs text-muted-foreground">
                        <p className="font-semibold text-foreground">{clauses.footer.thank_you}</p>
                        <p>{clauses.footer.contact_info}</p>
                        <p>{clauses.company.emails[0]}</p>
                    </div>
                    <div className="text-right">
                        <div className="inline-block text-center text-xs">
                            {signer.signatureUrl && <Image src={signer.signatureUrl} alt={`Signature de ${signer.name}`} width={150} height={50} style={{ margin: '0 auto', mixBlendMode: 'darken' }} />}
                            <div className="border-t border-slate-400 pt-2 mt-2">
                                <p className="font-bold">{clauses.signature_label}</p>
                                <p className="text-muted-foreground">{signer.name}, {signer.title[lang]}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DocumentWrapper>
    );
};

export default NeofondsReceiptTemplate;
