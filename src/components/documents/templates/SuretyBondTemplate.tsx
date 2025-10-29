
import React from 'react';
import Image from 'next/image';
import { Landmark } from 'lucide-react';
import { suretyBondClauses } from '@/data/documents/surety-bond-clauses';
import { signatureData } from '@/data/documents/signature-data';

interface SuretyBondTemplateProps {
    formData: any;
    lang: 'fr' | 'en';
}

const SuretyBondTemplate: React.FC<SuretyBondTemplateProps> = ({ formData, lang }) => {
    const clauses = suretyBondClauses[lang] || suretyBondClauses['fr'];
    const signer = signatureData.legal;

    const replacePlaceholders = (text: string) => {
        return text
            .replace(/{type_of_loan}/g, formData.type_of_loan || 'Personnel')
            .replace(/{act_ref}/g, formData.act_ref || '___________')
            .replace(/{date}/g, formData.date ? new Date(formData.date).toLocaleDateString(lang) : '___________')
            .replace(/{borrower_name}/g, formData.borrower_name || '___________')
            .replace(/{borrower_address}/g, formData.borrower_address || '___________')
            .replace(/{borrower_id}/g, formData.borrower_id || '___________')
            .replace(/{loan_contract_ref}/g, formData.loan_contract_ref || '___________')
            .replace(/{loan_amount}/g, formData.loan_amount ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(formData.loan_amount) : '___________')
            .replace(/{loan_amount_in_words}/g, formData.loan_amount_in_words || '___________')
            .replace(/{loan_term}/g, formData.loan_term || '___________');
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
                    <p className="text-xs text-[#707079] mt-2">{replacePlaceholders(clauses.reference)} // Date: {replacePlaceholders('{date}')}</p>
                </div>
                
                <h3 className="font-bold uppercase mb-4 text-[#3d5afe]">{clauses.parties.title}</h3>
                <div className="grid grid-cols-2 gap-8 mb-8 text-xs">
                    <div>
                        <h4 className="font-semibold underline mb-2">{clauses.parties.creditor_label}</h4>
                        <p>Capfinfy, agissant en tant qu'intermédiaire pour ses partenaires financiers</p>
                        <p>1 Place de la Bourse, 69002 Lyon, France</p>
                    </div>
                    <div>
                        <h4 className="font-semibold underline mb-2">{clauses.parties.debtor_label}</h4>
                        <p>Nom : {formData.borrower_name || '___________'}</p>
                        <p>Adresse : {formData.borrower_address || '___________'}</p>
                        <p>N° Pièce d'identité : {formData.borrower_id || '___________'}</p>
                    </div>
                </div>

                <div className="space-y-4 leading-relaxed">
                    <div>
                        <h4 className="font-bold uppercase text-[#3d5afe]">{clauses.articles.object.title}</h4>
                        <p>{replacePlaceholders(clauses.articles.object.content)}</p>
                        <ul className="list-disc pl-5 text-xs bg-[#f4f4f5] p-3 rounded mt-2">
                            <li>Numéro du contrat de prêt : {formData.loan_contract_ref || '___________'}</li>
                            <li>Montant du capital : {replacePlaceholders('{loan_amount}')} ({replacePlaceholders('{loan_amount_in_words}')})</li>
                            <li>Durée du prêt : {formData.loan_term || '___________'} mois</li>
                        </ul>
                         <p className="mt-2">{replacePlaceholders(clauses.articles.object.acknowledgment)}</p>
                    </div>
                    <div>
                        <h4 className="font-bold uppercase text-[#3d5afe]">{clauses.articles.scope.title}</h4>
                        <p>{replacePlaceholders(clauses.articles.scope.content)}</p>
                    </div>
                     <div>
                        <h4 className="font-bold uppercase text-[#3d5afe]">{clauses.articles.solidarity.title}</h4>
                        <p>{replacePlaceholders(clauses.articles.solidarity.content)}</p>
                    </div>
                    <div className="border-l-4 border-red-500 bg-red-50 p-4">
                        <h4 className="font-bold uppercase text-[#3d5afe]">{clauses.articles.mention.title}</h4>
                        <p className="text-xs italic text-red-700 mb-2">{clauses.articles.mention.instruction}</p>
                        <div className="border border-dashed border-[#707079] p-4 min-h-[50px]">
                           <p className="text-xs text-black">{replacePlaceholders(clauses.articles.mention.content)}</p>
                        </div>
                    </div>
                     <div>
                        <h4 className="font-bold uppercase text-[#3d5afe]">{clauses.articles.information.title}</h4>
                        <p>{replacePlaceholders(clauses.articles.information.content)}</p>
                    </div>
                </div>

                 <div className="grid grid-cols-2 gap-16 mt-16 pt-8">
                    <div className="text-center">
                         <div className="border-t-2 border-[#707079] pt-2 mt-20">
                             <p className="font-semibold">{clauses.parties.debtor_label}</p>
                        </div>
                    </div>
                    <div className="text-center">
                        {signer.signatureUrl && <Image src={signer.signatureUrl} alt={`Signature de ${signer.name}`} width={150} height={50} className="mx-auto" />}
                        <div className="border-t-2 border-[#707079] pt-2 mt-2">
                            <p className="font-semibold">{clauses.parties.creditor_label}</p>
                            <p className="text-xs text-[#707079] mt-2">{signer.name}, {signer.title[lang]}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SuretyBondTemplate;
