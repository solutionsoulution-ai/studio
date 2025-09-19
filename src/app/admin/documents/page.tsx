
"use client";

import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { usePDFGenerator } from "@/hooks/use-pdf-generator";
import { Loader2, FileDown } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

// Import new forms and templates
import LoanContractForm, { type LoanContractFormValues } from "@/components/admin/documents/forms/loan-contract-form";
import DebtRecognitionForm, { type DebtRecognitionFormValues } from "@/components/admin/documents/forms/debt-recognition-form";
import InvoiceForm, { type InvoiceFormValues } from "@/components/admin/documents/forms/invoice-form";
import EligibilityCertificateForm, { type EligibilityCertificateFormValues } from "@/components/admin/documents/forms/eligibility-certificate-form";
import InsuranceNoticeForm, { type InsuranceNoticeFormValues } from "@/components/admin/documents/forms/insurance-notice-form";
import InsuranceCertificateForm, { type InsuranceCertificateFormValues } from "@/components/admin/documents/forms/insurance-certificate-form";
import SuretyBondForm, { type SuretyBondFormValues } from "@/components/admin/documents/forms/surety-bond-form";
import BlankDocumentForm, { type BlankDocumentFormValues } from "@/components/admin/documents/forms/blank-document-form";

import LoanContractTemplate from "@/components/admin/documents/templates/loan-contract-template";
import DebtRecognitionTemplate from "@/components/admin/documents/templates/debt-recognition-template";
import InvoiceTemplate from "@/components/admin/documents/templates/invoice-template";
import EligibilityCertificateTemplate from "@/components/admin/documents/templates/eligibility-certificate-template";
import InsuranceNoticeTemplate from "@/components/admin/documents/templates/insurance-notice-template";
import InsuranceCertificateTemplate from "@/components/admin/documents/templates/insurance-certificate-template";
import SuretyBondTemplate from "@/components/admin/documents/templates/surety-bond-template";
import BlankDocumentTemplate from "@/components/admin/documents/templates/blank-document-template";


const configSchema = z.object({
    docType: z.enum([
        "invoice",
        "eligibility-certificate",
        "insurance-notice",
        "insurance-certificate",
        "loan-contract", 
        "surety-bond",
        "debt-recognition",
        "blank-document",
    ]),
    docLang: z.enum(["fr", "en", "de", "es", "pt", "it"]),
});
type ConfigFormValues = z.infer<typeof configSchema>;

const today = new Date();
const todayFR = today.toLocaleDateString('fr-FR');
const nextMonthFR = new Date(new Date().setMonth(today.getMonth() + 1)).toLocaleDateString('fr-FR');
const next30DaysFR = new Date(new Date().setDate(today.getDate() + 30)).toLocaleDateString('fr-FR');


// Default Values
const defaultLoanContractValues: LoanContractFormValues = {
    borrower_name: "John Doe",
    borrower_address: "123 Rue de l'Exemple, 75001 Paris, France",
    lender_name: "VylsCapital",
    lender_address: "10 Place de la Bourse, 69002 Lyon, France",
    loan_amount: 50000,
    loan_amount_in_words: "Cinquante mille euros",
    loan_date: todayFR,
    interest_rate: 2,
    loan_term_months: 60,
    repayment_start_date: nextMonthFR,
    monthly_payment: 876.41,
    signature_date: todayFR,
    borrower_signature_location: "Paris",
};

const defaultDebtRecognitionValues: DebtRecognitionFormValues = {
    borrower_name: "Jane Smith",
    borrower_address: "456 Avenue des Champs-Élysées, 75008 Paris",
    lender_name: "VylsCapital",
    loan_amount: 10000,
    loan_amount_in_words: "Dix mille euros",
    loan_date: todayFR,
    repayment_deadline: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString('fr-FR'),
    signature_location: "Lyon",
    signature_date: todayFR,
};

const defaultInvoiceValues: InvoiceFormValues = {
    customer_name: "John Doe",
    customer_address: "123 Rue de l'Exemple, 75001 Paris",
    invoice_number: `FACT-${today.getFullYear()}-0001`,
    invoice_date: todayFR,
    description: "Frais de dossier pour prêt personnel",
    amount: 150.00,
    payment_iban: "FR76 3000 4000 0112 3456 7890 123",
};

const defaultEligibilityCertificateValues: EligibilityCertificateFormValues = {
    beneficiary_name: "Alice Martin",
    beneficiary_address: "789 Boulevard Saint-Germain, 75006 Paris",
    beneficiary_id_number: "CNI 12AB34567",
    eligibility_amount: 250000,
    validity_end_date: next30DaysFR,
    analyst_name: "Julien Mercier",
    signature_date: todayFR,
};

const defaultInsuranceNoticeValues: InsuranceNoticeFormValues = {
    company_name: "VylsCapital Assurance",
    company_address: "10 Place de la Bourse, 69002 Lyon",
};

const defaultInsuranceCertificateValues: InsuranceCertificateFormValues = {
    insured_name: "John Doe",
    lender_name: "VylsCapital",
    loan_id: "PRT-2024-98765",
    insured_capital: 50000,
    monthly_premium: 18.50,
    effective_date: todayFR,
    end_date: new Date(new Date().setFullYear(today.getFullYear() + 5)).toLocaleDateString('fr-FR'),
    signature_date: todayFR,
};

const defaultSuretyBondValues: SuretyBondFormValues = {
    lender_name: "VylsCapital",
    borrower_name: "SARL Horizon",
    guarantor_name: "Marc Petit",
    loan_contract_id: "PRT-2024-12345",
    loan_amount: 75000,
    loan_term_months: 84,
    loan_date: todayFR,
    signature_location: "Marseille",
    signature_date: todayFR,
};

const defaultBlankDocumentValues: BlankDocumentFormValues = {
    customer_name: "John Doe",
    customer_address: "123 Example Street, London, W1 1AA",
    invoice_number: `INV-${today.getFullYear()}-0001`,
    invoice_date: today.toLocaleDateString('en-GB'),
    description: "Consulting services for Q3",
    amount: 250.00,
    payment_iban: "GB29 NWBK 6016 1331 9268 19",
}


export default function DocumentGeneratorPage() {
    const { generatePDF, isLoading } = usePDFGenerator();

    const configForm = useForm<ConfigFormValues>({
        resolver: zodResolver(configSchema),
        defaultValues: {
            docType: "invoice",
            docLang: "fr",
        }
    });

    // Create a form instance for each document type
    const loanContractForm = useForm<LoanContractFormValues>({ resolver: zodResolver(LoanContractForm.schema), defaultValues: defaultLoanContractValues });
    const debtRecognitionForm = useForm<DebtRecognitionFormValues>({ resolver: zodResolver(DebtRecognitionForm.schema), defaultValues: defaultDebtRecognitionValues });
    const invoiceForm = useForm<InvoiceFormValues>({ resolver: zodResolver(InvoiceForm.schema), defaultValues: defaultInvoiceValues });
    const eligibilityCertificateForm = useForm<EligibilityCertificateFormValues>({ resolver: zodResolver(EligibilityCertificateForm.schema), defaultValues: defaultEligibilityCertificateValues });
    const insuranceNoticeForm = useForm<InsuranceNoticeFormValues>({ resolver: zodResolver(InsuranceNoticeForm.schema), defaultValues: defaultInsuranceNoticeValues });
    const insuranceCertificateForm = useForm<InsuranceCertificateFormValues>({ resolver: zodResolver(InsuranceCertificateForm.schema), defaultValues: defaultInsuranceCertificateValues });
    const suretyBondForm = useForm<SuretyBondFormValues>({ resolver: zodResolver(SuretyBondForm.schema), defaultValues: defaultSuretyBondValues });
    const blankDocumentForm = useForm<BlankDocumentFormValues>({ resolver: zodResolver(BlankDocumentForm.schema), defaultValues: defaultBlankDocumentValues });

    const docType = configForm.watch("docType");
    const docLang = configForm.watch("docLang");
    
    // Select active form and data based on docType
    let activeForm: UseFormReturn<any> | null = null;
    let docData: any = {};

    switch (docType) {
        case "loan-contract":
            activeForm = loanContractForm;
            docData = loanContractForm.watch();
            break;
        case "debt-recognition":
            activeForm = debtRecognitionForm;
            docData = debtRecognitionForm.watch();
            break;
        case "invoice":
            activeForm = invoiceForm;
            docData = invoiceForm.watch();
            break;
        case "eligibility-certificate":
            activeForm = eligibilityCertificateForm;
            docData = eligibilityCertificateForm.watch();
            break;
        case "insurance-notice":
            activeForm = insuranceNoticeForm;
            docData = insuranceNoticeForm.watch();
            break;
        case "insurance-certificate":
            activeForm = insuranceCertificateForm;
            docData = insuranceCertificateForm.watch();
            break;
        case "surety-bond":
            activeForm = suretyBondForm;
            docData = suretyBondForm.watch();
            break;
        case "blank-document":
            activeForm = blankDocumentForm;
            docData = blankDocumentForm.watch();
            break;
    }

    const handleGenerateClick = () => {
        generatePDF({
            elementId: 'pdf-preview',
            fileName: `${docType}-${docLang}-${Date.now()}.pdf`,
        });
    };

    const renderForm = () => {
        switch (docType) {
            case "invoice": return <InvoiceForm form={invoiceForm} lang={docLang} />;
            case "eligibility-certificate": return <EligibilityCertificateForm form={eligibilityCertificateForm} lang={docLang} />;
            case "insurance-notice": return <InsuranceNoticeForm form={insuranceNoticeForm} lang={docLang} />;
            case "insurance-certificate": return <InsuranceCertificateForm form={insuranceCertificateForm} lang={docLang} />;
            case "loan-contract": return <LoanContractForm form={loanContractForm} lang={docLang} />;
            case "surety-bond": return <SuretyBondForm form={suretyBondForm} lang={docLang} />;
            case "debt-recognition": return <DebtRecognitionForm form={debtRecognitionForm} lang={docLang} />;
            case "blank-document": return <BlankDocumentForm form={blankDocumentForm} lang={docLang} />;
            default: return <p>Veuillez sélectionner un type de document.</p>;
        }
    }

    const renderTemplate = () => {
        switch (docType) {
            case "invoice": return <InvoiceTemplate data={docData} lang={docLang} />;
            case "eligibility-certificate": return <EligibilityCertificateTemplate data={docData} lang={docLang} />;
            case "insurance-notice": return <InsuranceNoticeTemplate data={docData} lang={docLang} />;
            case "insurance-certificate": return <InsuranceCertificateTemplate data={docData} lang={docLang} />;
            case "loan-contract": return <LoanContractTemplate data={docData} lang={docLang} />;
            case "surety-bond": return <SuretyBondTemplate data={docData} lang={docLang} />;
            case "debt-recognition": return <DebtRecognitionTemplate data={docData} lang={docLang} />;
            case "blank-document": return <BlankDocumentTemplate data={docData} lang={docLang} />;
            default: return <div id="pdf-preview" className="p-8 text-center text-muted-foreground">Aperçu du document</div>;
        }
    }

    return (
        <main className="flex min-h-screen w-full bg-muted/40">
            <div className="flex flex-col w-full">
                <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                    <h1 className="text-xl font-semibold">Générateur de Documents</h1>
                </header>
                <div className="flex-1 grid md:grid-cols-[350px_1fr] lg:grid-cols-[450px_1fr]">
                    {/* Left Panel: Form & Controls */}
                    <div className="flex flex-col border-r bg-background">
                        <div className="p-4 space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Configuration</CardTitle>
                                    <CardDescription>Choisissez le type et la langue du document.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Form {...configForm}>
                                        <form className="space-y-4">
                                            <FormField
                                                control={configForm.control}
                                                name="docType"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Type de document</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="invoice">Facture</SelectItem>
                                                                <SelectItem value="eligibility-certificate">Attestation d'Éligibilité</SelectItem>
                                                                <SelectItem value="insurance-notice">Notice d'Information Assurance</SelectItem>
                                                                <SelectItem value="insurance-certificate">Attestation d'Assurance</SelectItem>
                                                                <SelectItem value="loan-contract">Contrat de Prêt</SelectItem>
                                                                <SelectItem value="surety-bond">Acte de Cautionnement</SelectItem>
                                                                <SelectItem value="debt-recognition">Reconnaissance de Dette</SelectItem>
                                                                <SelectItem value="blank-document">Document Vierge (Facture EN)</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={configForm.control}
                                                name="docLang"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Langue</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="fr">Français</SelectItem>
                                                                <SelectItem value="en">English</SelectItem>
                                                                <SelectItem value="de">Deutsch</SelectItem>
                                                                <SelectItem value="es">Español</SelectItem>
                                                                <SelectItem value="pt">Português</SelectItem>
                                                                <SelectItem value="it">Italiano</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormItem>
                                                )}
                                            />
                                        </form>
                                    </Form>
                                </CardContent>
                            </Card>
                            
                            <div className="flex-1 overflow-auto">
                                {renderForm()}
                            </div>
                        </div>

                         <div className="mt-auto p-4">
                            <Button onClick={handleGenerateClick} disabled={isLoading || !activeForm} className="w-full">
                                {isLoading ? <Loader2 className="animate-spin" /> : <FileDown />}
                                {isLoading ? "Génération en cours..." : "Générer le PDF"}
                            </Button>
                        </div>
                    </div>

                    {/* Right Panel: Live Preview */}
                    <div className="flex-1 p-4 md:p-8 overflow-auto bg-gray-200">
                        <div className="mx-auto max-w-4xl">
                           {renderTemplate()}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
