
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
            .replace(/{date}/g, formData.date ? new Date(formData.date).toLocaleDateString(lang) : '___________')
            .replace(/{debtor_name}/g, formData.debtor_name || '___________')
            .replace(/{debtor_address}/g, formData.debtor_address || '___________')
            .replace(/{debtor_id}/g, formData.debtor_id || '___________')
            .replace(/{loan_amount}/g, formData.loan_amount ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(formData.loan_amount) : '___________')
            .replace(/{loan_amount_in_words}/g, formData.loan_amount_in_words || '___________')
            .replace(/{loan_contract_ref}/g, formData.loan_contract_ref || '___________')
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
                    <p className="text-xs text-[#707079] mt-2">{replacePlaceholders(clauses.reference)} // {replacePlaceholders(clauses.date)}</p>
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
                        <p>Nom : {formData.debtor_name || '___________'}</p>
                        <p>Adresse : {formData.debtor_address || '___________'}</p>
                        <p>N° Pièce d'identité : {formData.debtor_id || '___________'}</p>
                    </div>
                </div>

                <div className="space-y-4 leading-relaxed">
                    <div>
                        <h4 className="font-bold uppercase text-[#3d5afe]">{clauses.articles.recognition.title}</h4>
                        <p>{replacePlaceholders(clauses.articles.recognition.content)}</p>
                    </div>
                    <div>
                        <h4 className="font-bold uppercase text-[#3d5afe]">{clauses.articles.repayment.title}</h4>
                        <p>{replacePlaceholders(clauses.articles.repayment.content)}</p>
                    </div>
                     <div>
                        <h4 className="font-bold uppercase text-[#3d5afe]">{clauses.articles.default.title}</h4>
                        <p>{replacePlaceholders(clauses.articles.default.content)}</p>
                    </div>
                     <div>
                        <h4 className="font-bold uppercase text-[#3d5afe]">{clauses.articles.mention.title}</h4>
                        <p>{replacePlaceholders(clauses.articles.mention.content)}</p>
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
            <footer className="mt-16 pt-6 border-t border-[#f4f4f5] text-center text-xs text-[#707079]">
                <p>© 2025 CAPFINFY. Tous droits réservés.</p>
                <p className="font-semibold text-[#09090b]">Ce document est généré électroniquement et est confidentiel.</p>
            </footer>
        </div>
    );
};

export default DebtRecognitionTemplate;
