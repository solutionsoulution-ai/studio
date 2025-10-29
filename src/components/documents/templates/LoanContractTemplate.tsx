
import React from 'react';
import Image from 'next/image';
import { Landmark } from 'lucide-react';
import { loanContractClauses } from '@/data/documents/loan-contract-clauses';
import { signatureData } from '@/data/documents/signature-data';

interface LoanContractTemplateProps {
    formData: any;
    lang: 'fr' | 'en';
}

const LoanContractTemplate: React.FC<LoanContractTemplateProps> = ({ formData, lang }) => {
    const clauses = loanContractClauses[lang] || loanContractClauses['fr'];
    const signer = signatureData.ceo;

    const replacePlaceholders = (text: string) => {
        return text
            .replace(/{ref}/g, formData.ref || '___________')
            .replace(/{lender_name}/g, "Capfinfy")
            .replace(/{borrower_name}/g, formData.borrower_name || '___________')
            .replace(/{borrower_address}/g, formData.borrower_address || '___________')
            .replace(/{loan_amount}/g, formData.loan_amount ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(formData.loan_amount) : '___________')
            .replace(/{loan_amount_in_words}/g, formData.loan_amount_in_words || '___________')
            .replace(/{loan_term_months}/g, formData.loan_term_months || '___________')
            .replace(/{monthly_payment}/g, formData.monthly_payment ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(formData.monthly_payment) : '___________')
            .replace(/{repayment_start_date}/g, formData.repayment_start_date ? new Date(formData.repayment_start_date).toLocaleDateString(lang) : '___________')
            .replace(/{location}/g, formData.location || '___________')
            .replace(/{date}/g, formData.date ? new Date(formData.date).toLocaleDateString(lang) : '___________');
    };

    return (
        <div className="bg-white text-[#09090b] font-serif p-8 max-w-4xl mx-auto border-2 border-[#09090b] shadow-lg">
            <header className="text-center mb-10 border-b-2 border-double border-[#09090b] pb-4">
                 <div className="flex items-center justify-center mb-2">
                    <Landmark className="h-6 w-6 text-[#3d5afe] mr-2" />
                    <h1 className="text-xl font-bold text-[#09090b]">Capfinfy</h1>
                 </div>
                <h2 className="text-2xl font-bold uppercase text-[#09090b]">{replacePlaceholders(clauses.title)}</h2>
                <p className="text-sm text-[#707079]">{clauses.department}</p>
                <p className="text-xs text-[#707079] mt-2">{replacePlaceholders(clauses.reference)}</p>
            </header>

            <main className="text-sm">
                <div className="bg-[#f4f4f5] p-6 rounded-lg mb-8">
                    <h3 className="font-bold text-lg mb-2 text-[#09090b]">{clauses.importance.title}</h3>
                    <p className="text-sm text-[#707079]">{clauses.importance.description}</p>
                </div>
                <h3 className="font-bold text-center uppercase mb-6 text-[#3d5afe]">{clauses.parties.title}</h3>
                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                        <h4 className="font-semibold underline mb-2">{clauses.parties.lender}</h4>
                        <p>Capfinfy</p>
                        <p>1 Place de la Bourse, 69002 Lyon, France</p>
                    </div>
                    <div>
                        <h4 className="font-semibold underline mb-2">{clauses.parties.borrower}</h4>
                        <p>{formData.borrower_name || '___________'}</p>
                        <p>{formData.borrower_address || '___________'}</p>
                    </div>
                </div>

                <div className="space-y-6 leading-relaxed">
                    <h4 className="font-bold uppercase text-[#3d5afe]">{replacePlaceholders(clauses.articles.object.title)}</h4>
                    <p>{replacePlaceholders(clauses.articles.object.content)}</p>

                    <h4 className="font-bold uppercase text-[#3d5afe]">{replacePlaceholders(clauses.articles.repayment.title)}</h4>
                    <p>{replacePlaceholders(clauses.articles.repayment.content)}</p>

                    <h4 className="font-bold uppercase text-[#3d5afe]">{replacePlaceholders(clauses.articles.default.title)}</h4>
                    <p>{replacePlaceholders(clauses.articles.default.content)}</p>

                    <h4 className="font-bold uppercase text-[#3d5afe]">{replacePlaceholders(clauses.articles.jurisdiction.title)}</h4>
                    <p>{replacePlaceholders(clauses.articles.jurisdiction.content)}</p>
                </div>

                <p className="mt-12">{replacePlaceholders(clauses.signature_preamble)}</p>

                <div className="grid grid-cols-2 gap-16 mt-16 pt-8">
                    <div className="text-center">
                        <div className="border-t border-[#707079] pt-2">
                             <p className="font-semibold">{clauses.parties.borrower}</p>
                             <p className="text-xs text-[#707079] mt-2">{formData.borrower_name || '___________'}</p>
                        </div>
                    </div>
                    <div className="text-center">
                        {signer.signatureUrl && <Image src={signer.signatureUrl} alt={`Signature de ${signer.name}`} width={150} height={50} className="mx-auto" />}
                        <div className="border-t border-[#707079] pt-2 mt-2">
                            <p className="font-semibold">{clauses.parties.lender}</p>
                            <p className="text-xs text-[#707079] mt-2">{signer.name}, {signer.title[lang]}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LoanContractTemplate;
