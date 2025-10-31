
import React from 'react';
import Image from 'next/image';
import { brokerageAuthorizationClauses } from '@/data/documents/brokerage-authorization-clauses';
import { signatureData } from '@/data/documents/signature-data';
import DocumentWrapper from './DocumentWrapper';
import { ShieldCheck } from 'lucide-react';

interface BrokerageAuthorizationTemplateProps {
    formData: any;
    lang: 'fr' | 'en' | 'de';
}

const BrokerageAuthorizationTemplate: React.FC<BrokerageAuthorizationTemplateProps> = ({ formData, lang }) => {
    const clauses = brokerageAuthorizationClauses[lang] || brokerageAuthorizationClauses['fr'];
    const signer = signatureData.legal; // Legal Director signs this

    const replacePlaceholders = (text: string) => {
        return text
            .replace(/{ref}/g, formData.ref || '')
            .replace(/{issue_date}/g, formData.issue_date ? new Date(formData.issue_date).toLocaleDateString(lang) : '');
    };

    return (
        <DocumentWrapper
            title={clauses.title}
            hideDepartment
            lang={lang}
        >
            <div style={{ border: "2px solid hsl(215, 39%, 29%)", padding: '2rem', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
                <div className="text-center mb-8">
                    <p className="font-semibold text-lg text-[hsl(215,39%,29%)]">{clauses.authority}</p>
                    <p className="text-sm text-slate-500">{replacePlaceholders(clauses.registration_number)}</p>
                </div>

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold uppercase text-[hsl(215,39%,29%)]">{clauses.title}</h2>
                    <p className="text-xs">{clauses.subtitle}</p>
                </div>
                
                <p className="text-sm text-center mb-4">{clauses.intro}</p>

                <div className="text-center bg-white p-4 rounded-md border border-slate-200 mb-6">
                    <p className="text-xl font-bold">{clauses.company_name}</p>
                    <p className="text-xs text-slate-500">{clauses.company_address}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
                    <div className="bg-white p-4 rounded-md border border-slate-200">
                        <h3 className="font-bold text-xs uppercase text-[hsl(215,39%,29%)] mb-1">{clauses.status.title}</h3>
                        <p className="font-semibold">{clauses.status.value}</p>
                    </div>
                     <div className="bg-white p-4 rounded-md border border-slate-200">
                        <h3 className="font-bold text-xs uppercase text-[hsl(215,39%,29%)] mb-1">{clauses.activities.title}</h3>
                        <p className="text-xs">{clauses.activities.description}</p>
                    </div>
                </div>

                <p className="text-xs italic text-center text-slate-500 mb-8">{clauses.validity}</p>

                <div className="mt-12 flex justify-between items-end">
                    <div className="text-xs">
                        <p>{replacePlaceholders(clauses.location_and_date)}</p>
                    </div>
                    <div className="text-center">
                        {signer.signatureUrl && <Image src={signer.signatureUrl} alt={`Signature`} width={120} height={40} className="mx-auto" />}
                        <div className="border-t border-slate-400 pt-1 mt-1 text-xs">
                            <p className="font-bold">{clauses.signature_label}</p>
                        </div>
                    </div>
                </div>
            </div>
        </DocumentWrapper>
    );
};

export default BrokerageAuthorizationTemplate;
