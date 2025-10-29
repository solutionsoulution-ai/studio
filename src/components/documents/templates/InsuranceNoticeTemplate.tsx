
import React from 'react';
import { Landmark, FileText, AlertTriangle, ShieldCheck, Mail } from 'lucide-react';
import { insuranceNoticeClauses } from '@/data/documents/insurance-notice-clauses';

interface InsuranceNoticeTemplateProps {
    formData: any;
    lang: 'fr' | 'en';
}

const InsuranceNoticeTemplate: React.FC<InsuranceNoticeTemplateProps> = ({ formData, lang }) => {
    const clauses = insuranceNoticeClauses[lang] || insuranceNoticeClauses['fr'];

    const replacePlaceholders = (text: string) => {
        return text
            .replace(/{company_name}/g, 'Capfinfy Assurance')
            .replace(/{company_address}/g, '1 Place de la Bourse, 69002 Lyon');
    };

    return (
        <div className="bg-white text-gray-800 font-sans p-8 max-w-4xl mx-auto border border-gray-300">
            <header className="flex justify-between items-center mb-10 border-b-2 border-gray-300 pb-5">
                <div className="flex items-center">
                    <Landmark className="h-8 w-8 text-blue-600 mr-3" />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Capfinfy Assurance</h1>
                        <p className="text-sm text-gray-500">{clauses.subtitle}</p>
                    </div>
                </div>
                <div className="text-right">
                    <h2 className="text-3xl font-bold text-blue-700">{clauses.title}</h2>
                </div>
            </header>

            <main>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-10">
                    <p className="font-semibold text-blue-800">{replacePlaceholders(clauses.introduction)}</p>
                </div>

                <div className="mb-8">
                    <div className="flex items-center mb-4">
                        <FileText className="h-6 w-6 text-blue-700 mr-3" />
                        <h3 className="text-xl font-bold text-gray-800">{clauses.guarantees.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 ml-9">{clauses.guarantees.description}</p>
                    <div className="space-y-4 ml-9">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold text-gray-700">{clauses.guarantees.items.death.title}</h4>
                            <p className="text-sm text-gray-600">{clauses.guarantees.items.death.description}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold text-gray-700">{clauses.guarantees.items.disability.title}</h4>
                            <p className="text-sm text-gray-600">{clauses.guarantees.items.disability.description}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold text-gray-700">{clauses.guarantees.items.incapacity.title}</h4>
                            <p className="text-sm text-gray-600">{clauses.guarantees.items.incapacity.description}</p>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <div className="flex items-center mb-4">
                        <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                        <h3 className="text-xl font-bold text-gray-800">{clauses.exclusions.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 ml-9">{clauses.exclusions.description}</p>
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 ml-9">
                        {clauses.exclusions.items.map((item: string, index: number) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
                
                 <div className="mb-8">
                    <div className="flex items-center mb-2">
                        <ShieldCheck className="h-6 w-6 text-green-600 mr-3" />
                        <h3 className="text-xl font-bold text-gray-800">{clauses.waiver.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 ml-9">{clauses.waiver.description}</p>
                </div>
            </main>
            
            <footer className="mt-12 pt-6 border-t border-gray-200 text-xs text-gray-500">
                <p className="text-center mb-4">{clauses.footer}</p>
                <div className="flex justify-center items-center space-x-4">
                    <span className="flex items-center"><Mail className="h-3 w-3 mr-1" /> contact@capfinfy.com</span>
                </div>
            </footer>
        </div>
    );
};

export default InsuranceNoticeTemplate;
