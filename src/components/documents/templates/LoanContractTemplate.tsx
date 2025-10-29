
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
            .replace(/{type_of_loan}/g, formData.type_of_loan || 'Personnel')
            .replace(/{contract_ref}/g, formData.contract_ref || '___________')
            .replace(/{contract_date}/g, formData.contract_date ? new Date(formData.contract_date).toLocaleDateString(lang) : '___________')
            .replace(/{borrower_name}/g, formData.borrower_name || '___________')
            .replace(/{borrower_address}/g, formData.borrower_address || '___________')
            .replace(/{borrower_id}/g, formData.borrower_id || '___________')
            .replace(/{loan_amount}/g, formData.loan_amount ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(formData.loan_amount) : '___________')
            .replace(/{loan_amount_in_words}/g, formData.loan_amount_in_words || '___________')
            .replace(/{taeg}/g, formData.taeg || '2.00%')
            .replace(/{loan_term}/g, formData.loan_term || '___________')
            .replace(/{start_date}/g, formData.start_date ? new Date(formData.start_date).toLocaleDateString(lang) : '___________')
            .replace(/{end_date}/g, formData.end_date ? new Date(formData.end_date).toLocaleDateString(lang) : '___________')
            .replace(/{total_cost}/g, formData.total_cost ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(formData.total_cost) : '___________')
            .replace(/{monthly_payment}/g, formData.monthly_payment ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(formData.monthly_payment) : '___________')
            .replace(/{total_due}/g, formData.total_due ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(formData.total_due) : '___________')
            .replace(/{contact_email}/g, "contact@capfinfy.com");
    };

    return (
        <div className="bg-white text-[#09090b] font-serif p-8 max-w-4xl mx-auto border-t-8 border-[#3d5afe] shadow-lg">
            <header className="text-center mb-10">
                <p className="text-xs text-[#707079]">{clauses.header.line1}</p>
                <p className="text-xs text-[#707079] font-semibold">{clauses.header.line2}</p>
            </header>

            <main className="text-sm">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold uppercase text-[#09090b]">{replacePlaceholders(clauses.title)}</h2>
                    <p className="text-xs text-[#707079] mt-2">{replacePlaceholders(clauses.reference)} // {replacePlaceholders(clauses.location_and_date)}</p>
                </div>
                
                <h3 className="font-bold uppercase mb-4 text-[#3d5afe]">{clauses.parties.title}</h3>
                <div className="grid grid-cols-2 gap-8 mb-8 text-xs">
                    <div>
                        <h4 className="font-semibold underline mb-2">{clauses.parties.lender_label}</h4>
                        <p>Capfinfy, société intermédiaire</p>
                        <p>1 Place de la Bourse, 69002 Lyon, France</p>
                    </div>
                    <div>
                        <h4 className="font-semibold underline mb-2">{clauses.parties.borrower_label}</h4>
                        <p>Nom : {formData.borrower_name || '___________'}</p>
                        <p>Adresse : {formData.borrower_address || '___________'}</p>
                        <p>N° Pièce d'identité : {formData.borrower_id || '___________'}</p>
                    </div>
                </div>

                <div className="space-y-4 leading-relaxed">
                    <div>
                        <h4 className="font-bold uppercase text-[#3d5afe]">{clauses.articles.object.title}</h4>
                        <p>{replacePlaceholders(clauses.articles.object.content)}</p>
                    </div>
                    <div>
                        <h4 className="font-bold uppercase text-[#3d5afe]">{clauses.articles.characteristics.title}</h4>
                        <ul className="list-disc pl-5 text-xs bg-[#f4f4f5] p-3 rounded">
                            <li>{replacePlaceholders(clauses.articles.characteristics.amount)}</li>
                            <li>{replacePlaceholders(clauses.articles.characteristics.taeg)}</li>
                            <li>{replacePlaceholders(clauses.articles.characteristics.term)}</li>
                            <li>{replacePlaceholders(clauses.articles.characteristics.availability)}</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold uppercase text-[#3d5afe]">{clauses.articles.repayment.title}</h4>
                        <p>{replacePlaceholders(clauses.articles.repayment.intro)}</p>
                        <ul className="list-disc pl-5 text-xs bg-[#f4f4f5] p-3 rounded mt-2">
                             <li>{replacePlaceholders(clauses.articles.repayment.monthly_payment)}</li>
                             <li>{replacePlaceholders(clauses.articles.repayment.total_cost)}</li>
                             <li>{replacePlaceholders(clauses.articles.repayment.total_due)}</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold uppercase text-[#3d5afe]">{clauses.articles.withdrawal.title}</h4>
                        <p>{replacePlaceholders(clauses.articles.withdrawal.content)}</p>
                    </div>
                    <div>
                        <h4 className="font-bold uppercase text-[#3d5afe]">{clauses.articles.default.title}</h4>
                        <p>{replacePlaceholders(clauses.articles.default.content)}</p>
                    </div>
                    <div>
                        <h4 className="font-bold uppercase text-[#3d5afe]">{clauses.articles.insurance.title}</h4>
                        <p>{replacePlaceholders(clauses.articles.insurance.content)}</p>
                    </div>
                    <div>
                        <h4 className="font-bold uppercase text-[#3d5afe]">{clauses.articles.data.title}</h4>
                        <p>{replacePlaceholders(clauses.articles.data.content)}</p>
                    </div>
                    <div>
                        <h4 className="font-bold uppercase text-[#3d5afe]">{clauses.articles.law.title}</h4>
                        <p>{replacePlaceholders(clauses.articles.law.content)}</p>
                    </div>
                </div>

                <p className="text-center mt-12 text-xs">{clauses.signature_preamble}</p>

                <div className="grid grid-cols-2 gap-16 mt-8 pt-8">
                    <div className="text-center">
                         <div className="border-t-2 border-[#707079] pt-2 mt-20">
                             <p className="font-semibold">{clauses.parties.borrower_label}</p>
                        </div>
                    </div>
                    <div className="text-center">
                        {signer.signatureUrl && <Image src={signer.signatureUrl} alt={`Signature de ${signer.name}`} width={150} height={50} className="mx-auto" />}
                        <div className="border-t-2 border-[#707079] pt-2 mt-2">
                            <p className="font-semibold">{clauses.parties.lender_label}</p>
                            <p className="text-xs text-[#707079] mt-2">{signer.name}, {signer.title[lang]}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LoanContractTemplate;
