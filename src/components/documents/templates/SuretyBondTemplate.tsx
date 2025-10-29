
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
            .replace(/{ref}/g, formData.ref || '___________')
            .replace(/{guarantor_name}/g, formData.guarantor_name || '___________')
            .replace(/{borrower_name}/g, formData.borrower_name || '___________')
            .replace(/{lender_name}/g, "Capfinfy")
            .replace(/{loan_amount}/g, formData.loan_amount ? `${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(formData.loan_amount)}` : '___________')
            .replace(/{loan_amount_in_words}/g, formData.loan_amount_in_words || '___________')
            .replace(/{location}/g, formData.location || '___________')
            .replace(/{date}/g, formData.date ? new Date(formData.date).toLocaleDateString(lang) : '___________');
    };

    return (
        <div className="bg-white text-[#09090b] font-serif p-8 max-w-4xl mx-auto border border-[#f4f4f5]">
            <header className="flex justify-between items-start mb-12 border-b-2 border-[#09090b] pb-4">
                <div className="flex items-center">
                    <Landmark className="h-8 w-8 text-[#3d5afe] mr-3" />
                    <div>
                        <h1 className="text-xl font-bold text-[#09090b]">Capfinfy</h1>
                        <p className="text-xs text-[#707079]">{clauses.department}</p>
                    </div>
                </div>
                <p className="text-xs text-[#707079]">{replacePlaceholders(clauses.reference)}</p>
            </header>

            <main>
                <h2 className="text-3xl font-bold text-center text-[#3d5afe] mb-10">{clauses.title}</h2>

                <div className="mb-8">
                    <h3 className="font-bold text-lg mb-2 border-b border-[#f4f4f5] pb-1">{clauses.parties.lender_label}</h3>
                    <p>Capfinfy, 1 Place de la Bourse, 69002 Lyon</p>
                </div>
                <div className="mb-8">
                    <h3 className="font-bold text-lg mb-2 border-b border-[#f4f4f5] pb-1">{clauses.parties.borrower_label}</h3>
                    <p>{formData.borrower_name || '___________'}</p>
                </div>
                <div className="mb-12">
                    <h3 className="font-bold text-lg mb-2 border-b border-[#f4f4f5] pb-1">{clauses.parties.guarantor_label}</h3>
                    <p>{formData.guarantor_name || '___________'}</p>
                </div>
                
                <div className="space-y-6 text-sm leading-relaxed">
                    <div className="font-bold text-center uppercase">{replacePlaceholders(clauses.articles.commitment.title)}</div>
                    <p>{replacePlaceholders(clauses.articles.commitment.content)}</p>

                    <div className="font-bold text-center uppercase">{replacePlaceholders(clauses.articles.scope.title)}</div>
                    <p>{replacePlaceholders(clauses.articles.scope.content)}</p>

                    <div className="mt-8 p-4 border-l-4 border-[#3d5afe] bg-[#f4f4f5]">
                        <h4 className="font-bold text-md mb-2">{clauses.handwritten_mention.title}</h4>
                        <p className="text-xs italic mb-2 text-[#707079]">{clauses.handwritten_mention.instruction}</p>
                        <div className="border border-dashed border-[#707079] p-4 min-h-[100px] text-[#707079]">
                           {replacePlaceholders(clauses.handwritten_mention.content)}
                        </div>
                    </div>
                </div>

                <p className="mt-12 text-sm">{replacePlaceholders(clauses.signature_preamble)}</p>

                <div className="grid grid-cols-2 gap-16 mt-16 pt-8">
                    <div className="text-center">
                        <div className="border-t border-[#707079] pt-2">
                             <p className="font-semibold">{clauses.parties.guarantor_label}</p>
                             <p className="text-xs text-[#707079] mt-2">{formData.guarantor_name || '___________'}</p>
                        </div>
                    </div>
                    <div className="text-center">
                        {signer.signatureUrl && <Image src={signer.signatureUrl} alt={`Signature de ${signer.name}`} width={150} height={50} className="mx-auto" />}
                        <div className="border-t border-[#707079] pt-2 mt-2">
                            <p className="font-semibold">{clauses.parties.lender_label}</p>
                            <p className="text-xs text-[#707079] mt-2">{signer.name}, {signer.title[lang]}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SuretyBondTemplate;
