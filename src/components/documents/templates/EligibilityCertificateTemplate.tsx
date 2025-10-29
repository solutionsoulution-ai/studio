
import React from 'react';
import Image from 'next/image';
import { Landmark } from 'lucide-react';
import { eligibilityCertificateClauses } from '@/data/documents/eligibility-certificate-clauses';
import { signatureData } from '@/data/documents/signature-data';

interface EligibilityCertificateTemplateProps {
    formData: any;
    lang: 'fr' | 'en';
}

const EligibilityCertificateTemplate: React.FC<EligibilityCertificateTemplateProps> = ({ formData, lang }) => {
    const clauses = eligibilityCertificateClauses[lang] || eligibilityCertificateClauses['fr'];
    const signer = signatureData.analysis;

    const replacePlaceholders = (text: string) => {
        const validityDate = formData.date ? new Date(new Date(formData.date).setDate(new Date(formData.date).getDate() + 30)).toLocaleDateString(lang) : '___________';
        return text
            .replace(/{ref}/g, formData.ref || '___________')
            .replace(/{validity_date}/g, validityDate)
            .replace(/{beneficiary_name}/g, formData.beneficiary_name || '___________')
            .replace(/{beneficiary_address}/g, formData.beneficiary_address || '___________')
            .replace(/{beneficiary_id}/g, formData.beneficiary_id || '___________')
            .replace(/{project_type}/g, formData.project_type || '___________')
            .replace(/{max_amount}/g, formData.max_amount ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(formData.max_amount) : '___________')
            .replace(/{max_amount_in_words}/g, formData.max_amount_in_words || '___________');
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
                    <p className="text-xs text-[#707079] mt-2">{replacePlaceholders(clauses.reference)} // {replacePlaceholders(clauses.validity)}</p>
                </div>
                
                <h3 className="font-bold uppercase mb-4 text-[#3d5afe]">{clauses.beneficiary.title}</h3>
                <div className="mb-8 text-xs bg-[#f4f4f5] p-4 rounded">
                    <p>Nom : {formData.beneficiary_name || '___________'}</p>
                    <p>Adresse : {formData.beneficiary_address || '___________'}</p>
                    <p>N° Pièce d'identité : {formData.beneficiary_id || '___________'}</p>
                </div>

                <div className="space-y-4 leading-relaxed">
                    <div>
                        <h4 className="font-bold uppercase text-[#3d5afe]">{clauses.articles.object.title}</h4>
                        <p>{replacePlaceholders(clauses.articles.object.content)}</p>
                    </div>
                    <div>
                        <h4 className="font-bold uppercase text-[#3d5afe]">{clauses.articles.scope.title}</h4>
                        <p>{replacePlaceholders(clauses.articles.scope.content)}</p>
                    </div>
                     <div>
                        <h4 className="font-bold uppercase text-[#3d5afe]">{clauses.articles.validity.title}</h4>
                        <p>{replacePlaceholders(clauses.articles.validity.content)}</p>
                    </div>
                </div>

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

export default EligibilityCertificateTemplate;
