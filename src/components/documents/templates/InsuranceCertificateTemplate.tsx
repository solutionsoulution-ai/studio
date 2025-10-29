
import React from 'react';
import Image from 'next/image';
import { Landmark } from 'lucide-react';
import { insuranceCertificateClauses } from '@/data/documents/insurance-certificate-clauses';
import { signatureData } from '@/data/documents/signature-data';

interface InsuranceCertificateTemplateProps {
    formData: any;
    lang: 'fr' | 'en';
}

const InsuranceCertificateTemplate: React.FC<InsuranceCertificateTemplateProps> = ({ formData, lang }) => {
    const clauses = insuranceCertificateClauses[lang] || insuranceCertificateClauses['fr'];
    const signer = signatureData.insurance;

    const replacePlaceholders = (text: string) => {
        return text
            .replace(/{ref}/g, formData.ref || '___________')
            .replace(/{issue_date}/g, formData.issue_date ? new Date(formData.issue_date).toLocaleDateString(lang) : '___________')
            .replace(/{insured_name}/g, formData.insured_name || '___________')
            .replace(/{insured_dob}/g, formData.insured_dob ? new Date(formData.insured_dob).toLocaleDateString(lang) : '___________')
            .replace(/{insured_address}/g, formData.insured_address || '___________')
            .replace(/{insured_id}/g, formData.insured_id || '___________')
            .replace(/{loan_contract_ref}/g, formData.loan_contract_ref || '___________')
            .replace(/{loan_type}/g, formData.loan_type || '___________')
            .replace(/{insured_capital}/g, formData.insured_capital ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(formData.insured_capital) : '___________')
            .replace(/{coverage_duration}/g, formData.coverage_duration || '___________')
            .replace(/{monthly_premium}/g, formData.monthly_premium ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(formData.monthly_premium) : '___________');
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
                    <p className="text-xs text-[#707079] mt-2">{replacePlaceholders(clauses.reference)} // {replacePlaceholders(clauses.issue_date)}</p>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8 text-xs">
                    <div className="bg-[#f4f4f5] p-3 rounded">
                        <h4 className="font-bold underline mb-2">{clauses.insured.title}</h4>
                        <p>Nom et Prénom : {formData.insured_name || '___________'}</p>
                        <p>Date de Naissance : {replacePlaceholders('{insured_dob}')}</p>
                        <p>Adresse : {formData.insured_address || '___________'}</p>
                        <p>N° Pièce d'identité : {formData.insured_id || '___________'}</p>
                    </div>
                    <div className="bg-[#f4f4f5] p-3 rounded">
                        <h4 className="font-bold underline mb-2">{clauses.beneficiary.title}</h4>
                        <p>{replacePlaceholders(clauses.beneficiary.content)}</p>
                    </div>
                </div>

                <h4 className="font-bold uppercase text-[#3d5afe]">{clauses.object_title}</h4>
                <p className="mb-6">{replacePlaceholders(clauses.object_content)}</p>

                <h4 className="font-bold uppercase text-[#3d5afe]">{clauses.loan_details.title}</h4>
                <div className="mb-6 text-xs grid grid-cols-2 gap-x-8 gap-y-2 bg-[#f4f4f5] p-3 rounded">
                    <p>Nature du prêt : {formData.loan_type || '___________'}</p>
                    <p>Numéro du prêt associé : {formData.loan_contract_ref || '___________'}</p>
                    <p>Montant du capital assuré : {replacePlaceholders('{insured_capital}')}</p>
                    <p>Durée de la couverture d'assurance : {formData.coverage_duration || '___________'} mois</p>
                </div>

                <h4 className="font-bold uppercase text-[#3d5afe]">{clauses.guarantees.title}</h4>
                <p className="text-xs italic mb-2">{clauses.guarantees.intro}</p>
                <ul className="list-disc pl-5 mb-6 space-y-1 text-xs">
                    <li>{clauses.guarantees.death}</li>
                    <li>{clauses.guarantees.ptia}</li>
                    <li>{clauses.guarantees.itt}</li>
                </ul>
                
                <h4 className="font-bold uppercase text-[#3d5afe]">{clauses.premium.title}</h4>
                <p className="mb-6">{replacePlaceholders(clauses.premium.content)}</p>

                <h4 className="font-bold uppercase text-[#3d5afe]">{clauses.validity.title}</h4>
                <p className="mb-6">{replacePlaceholders(clauses.validity.content)}</p>


                <div className="text-right mt-16">
                    <div className="inline-block text-center">
                        {signer.signatureUrl && <Image src={signer.signatureUrl} alt={`Signature de ${signer.name}`} width={150} height={50} className="mx-auto" />}
                        <div className="border-t-2 border-[#707079] pt-2 mt-2">
                            <p className="font-semibold text-sm">{signer.name}</p>
                            <p className="text-xs text-[#707079]">{signer.title[lang]}</p>
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

export default InsuranceCertificateTemplate;
