
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
        return text
            .replace(/{ref}/g, formData.ref || '___________')
            .replace(/{date}/g, formData.date ? new Date(formData.date).toLocaleDateString(lang) : '___________')
            .replace(/{beneficiary_name}/g, formData.beneficiary_name || '___________')
            .replace(/{beneficiary_address}/g, formData.beneficiary_address || '___________')
            .replace(/{amount}/g, formData.amount ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(formData.amount) : '___________')
            .replace(/{validity_end_date}/g, formData.validity_end_date ? new Date(formData.validity_end_date).toLocaleDateString(lang) : '___________');
    };

    return (
        <div className="bg-white text-gray-800 font-serif p-10 max-w-4xl mx-auto border-2 border-gray-400">
            <header className="flex justify-between items-center mb-10 pb-4 border-b-2 border-gray-400">
                 <div className="flex items-center">
                    <Landmark className="h-8 w-8 text-blue-800 mr-3" />
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Capfinfy</h1>
                        <p className="text-xs text-gray-500">{clauses.department}</p>
                    </div>
                </div>
                <div className="text-right text-xs text-gray-500">
                     <p>{replacePlaceholders(clauses.location_and_date)}</p>
                     <p>{replacePlaceholders(clauses.reference)}</p>
                </div>
            </header>

            <main>
                <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">{clauses.title}</h2>
                
                 <div className="bg-gray-100 p-6 rounded-lg mb-8 text-sm">
                    <h3 className="font-bold text-lg mb-2 text-gray-800">{clauses.importance.title}</h3>
                    <p className="text-gray-600">{clauses.importance.description}</p>
                </div>

                <div className="text-md leading-relaxed space-y-6">
                    <p>{replacePlaceholders(clauses.introduction)}</p>
                    <p className="font-bold text-lg text-center p-4 bg-blue-50 rounded-md">
                        {replacePlaceholders(clauses.eligibility_statement)}
                    </p>
                    <p>{replacePlaceholders(clauses.conditions)}</p>
                    <p className="text-sm italic">{replacePlaceholders(clauses.conclusion)}</p>
                </div>
            </main>

            <footer className="mt-16 text-right">
                <div className="inline-block text-center">
                    {signer.signatureUrl && <Image src={signer.signatureUrl} alt={`Signature de ${signer.name}`} width={150} height={50} className="mx-auto" />}
                    <div className="border-t border-gray-400 mt-2 pt-2">
                        <p className="font-semibold">{signer.name}</p>
                        <p className="text-sm text-gray-600">{signer.title[lang]}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default EligibilityCertificateTemplate;
