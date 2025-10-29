
import React from 'react';
import Image from 'next/image';
import { Landmark } from 'lucide-react';
import { debtRecognitionClauses } from '@/data/documents/debt-recognition-clauses';
import { signatureData } from '@/data/documents/signature-data';

interface DebtRecognitionTemplateProps {
    formData: any;
    lang: 'fr' | 'en';
}

const DebtRecognitionTemplate: React.FC<DebtRecognitionTemplateProps> = ({ formData, lang }) => {
    const clauses = debtRecognitionClauses[lang] || debtRecognitionClauses['fr'];
    const signer = signatureData.legal;

    const replacePlaceholders = (text: string) => {
        return text
            .replace(/{ref}/g, formData.ref || '___________')
            .replace(/{borrower_name}/g, formData.borrower_name || '___________')
            .replace(/{borrower_address}/g, formData.borrower_address || '___________')
            .replace(/{lender_name}/g, "Capfinfy")
            .replace(/{loan_date}/g, formData.loan_date ? new Date(formData.loan_date).toLocaleDateString(lang) : '___________')
            .replace(/{loan_amount}/g, formData.loan_amount ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(formData.loan_amount) : '___________')
            .replace(/{loan_amount_in_words}/g, formData.loan_amount_in_words || '___________')
            .replace(/{repayment_deadline}/g, formData.repayment_deadline ? new Date(formData.repayment_deadline).toLocaleDateString(lang) : '___________')
            .replace(/{signature_location}/g, formData.signature_location || '___________')
            .replace(/{signature_date}/g, formData.signature_date ? new Date(formData.signature_date).toLocaleDateString(lang) : '___________');
    };

    return (
        <div className="bg-white text-[#09090b] font-serif p-8 max-w-4xl mx-auto border-t-8 border-[#3d5afe] shadow-lg">
            <header className="text-center mb-12">
                <h1 className="text-3xl font-bold uppercase tracking-wider text-[#09090b]">{clauses.title}</h1>
                <p className="text-sm text-[#707079] mt-2">{clauses.department}</p>
                <p className="text-xs text-[#707079] mt-1">{replacePlaceholders(clauses.reference)}</p>
            </header>

            <main className="text-justify text-md leading-loose">
                 <div className="bg-[#f4f4f5] p-6 rounded-lg mb-8 text-sm">
                    <h3 className="font-bold text-lg mb-2 text-[#09090b]">{clauses.importance.title}</h3>
                    <p className="text-[#707079]">{clauses.importance.description}</p>
                </div>
            
                <p className="mb-6">{replacePlaceholders(clauses.introduction)}</p>
                <p className="mb-6">{replacePlaceholders(clauses.acknowledgment)}</p>
                <p className="mb-6">{replacePlaceholders(clauses.repayment)}</p>
                <p className="mb-6">{replacePlaceholders(clauses.interest_clause)}</p>
                <p className="mb-10">{replacePlaceholders(clauses.legal_value)}</p>

                <p className="text-sm mb-16">{replacePlaceholders(clauses.signature_preamble)}</p>

                <div className="grid grid-cols-2 gap-16">
                    <div className="text-center">
                        <div className="border-t-2 border-[#707079] pt-2">
                             <p className="font-semibold">{clauses.borrower_signature_label}</p>
                             <p className="text-xs text-[#707079] mt-2">{formData.borrower_name || '___________'}</p>
                        </div>
                    </div>
                    <div className="text-center">
                        {signer.signatureUrl && <Image src={signer.signatureUrl} alt={`Signature de ${signer.name}`} width={150} height={50} className="mx-auto" />}
                        <div className="border-t-2 border-[#707079] pt-2 mt-2">
                            <p className="font-semibold">{clauses.lender_signature_label}</p>
                            <p className="text-xs text-[#707079] mt-2">{signer.name}, {signer.title[lang]}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DebtRecognitionTemplate;
