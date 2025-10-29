
import React from 'react';
import Image from 'next/image';
import { Landmark, ShieldCheck } from 'lucide-react';
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
            .replace(/{insured_name}/g, formData.insured_name || '___________')
            .replace(/{loan_id_label}/g, formData.loan_id_label || '___________')
            .replace(/{signature_date}/g, formData.signature_date ? new Date(formData.signature_date).toLocaleDateString(lang) : '___________');
    };

    return (
        <div className="bg-white text-[#09090b] font-sans p-10 max-w-4xl mx-auto border-4 border-[#f4f4f5] shadow-lg">
            <header className="flex justify-between items-center mb-10 pb-5 border-b-2 border-[#3d5afe]">
                <div className="flex items-center">
                    <Landmark className="h-10 w-10 text-[#3d5afe] mr-4" />
                    <div>
                        <h1 className="text-2xl font-bold text-[#09090b]">{clauses.department}</h1>
                        <p className="text-sm text-[#707079]">www.capfinfy.com</p>
                    </div>
                </div>
                <div className="text-right">
                    <h2 className="text-3xl font-bold text-[#3d5afe]">{clauses.title}</h2>
                    <p className="text-sm font-medium text-[#707079]">{replacePlaceholders(clauses.reference)}</p>
                </div>
            </header>

            <main>
                <div className="bg-[#f4f4f5] p-6 rounded-lg mb-8 text-sm">
                    <h3 className="font-bold text-lg mb-2 text-[#09090b]">{clauses.importance.title}</h3>
                    <p className="text-[#707079]">{clauses.importance.description}</p>
                </div>
                <p className="text-md leading-relaxed mb-8">{replacePlaceholders(clauses.introduction)}</p>
                
                <div className="grid grid-cols-2 gap-8 mb-10">
                    <div className="bg-[#f4f4f5] p-4 rounded-lg">
                        <h3 className="text-sm font-bold text-[#707079] uppercase tracking-wider mb-2">{clauses.insured_label}</h3>
                        <p className="text-lg font-semibold text-[#09090b]">{formData.insured_name || '___________'}</p>
                    </div>
                    <div className="bg-[#f4f4f5] p-4 rounded-lg">
                        <h3 className="text-sm font-bold text-[#707079] uppercase tracking-wider mb-2">{clauses.loan_id_label}</h3>
                        <p className="text-lg font-semibold text-[#09090b]">{formData.loan_id_label || '___________'}</p>
                    </div>
                    <div className="bg-[#f4f4f5] p-4 rounded-lg col-span-2">
                        <h3 className="text-sm font-bold text-[#707079] uppercase tracking-wider mb-2">{clauses.capital_label}</h3>
                        <p className="text-lg font-semibold text-[#09090b]">{formData.capital ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(formData.capital) : '___________'}</p>
                    </div>
                </div>
                
                <h3 className="text-xl font-bold text-center text-[#09090b] mb-6">{clauses.coverage_summary}</h3>
                
                <div className="space-y-4">
                    <div className="flex items-start p-4 bg-[#f4f4f5] rounded-lg">
                        <ShieldCheck className="h-6 w-6 text-[#8ef95a] mr-4 mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-[#09090b]">{clauses.guarantees.death.title}</h4>
                            <p className="text-sm text-[#707079]">{clauses.guarantees.death.description}</p>
                        </div>
                    </div>
                    <div className="flex items-start p-4 bg-[#f4f4f5] rounded-lg">
                        <ShieldCheck className="h-6 w-6 text-[#8ef95a] mr-4 mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-[#09090b]">{clauses.guarantees.disability.title}</h4>
                            <p className="text-sm text-[#707079]">{clauses.guarantees.disability.description}</p>
                        </div>
                    </div>
                    <div className="flex items-start p-4 bg-[#f4f4f5] rounded-lg">
                        <ShieldCheck className="h-6 w-6 text-[#8ef95a] mr-4 mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-[#09090b]">{clauses.guarantees.incapacity.title}</h4>
                            <p className="text-sm text-[#707079]">{clauses.guarantees.incapacity.description}</p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="mt-16 flex justify-between items-end">
                <p className="text-sm text-[#707079]">{replacePlaceholders(clauses.conclusion)}</p>
                <div className="text-center">
                    {signer.signatureUrl && <Image src={signer.signatureUrl} alt={`Signature de ${signer.name}`} width={120} height={40} className="mx-auto" />}
                    <p className="text-sm font-semibold border-t border-[#707079] mt-2 pt-2">{signer.name}</p>
                    <p className="text-xs text-[#707079]">{signer.title[lang]}</p>
                </div>
            </footer>
        </div>
    );
};

export default InsuranceCertificateTemplate;
