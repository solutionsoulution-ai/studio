
"use client";

import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { usePDFGenerator } from "@/hooks/use-pdf-generator";
import { Loader2, FileDown } from "lucide-react";
import LoanContractForm, { type LoanContractFormValues } from "@/components/admin/documents/forms/loan-contract-form";
import LoanContractTemplate from "@/components/admin/documents/templates/loan-contract-template";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";


const configSchema = z.object({
    docType: z.enum(["loan-contract"]),
    docLang: z.enum(["fr", "en"]),
});
type ConfigFormValues = z.infer<typeof configSchema>;

const defaultContractValuesFR: LoanContractFormValues = {
    borrower_name: "John Doe",
    borrower_address: "123 Rue de l'Exemple, 75001 Paris, France",
    borrower_email: "john.doe@example.com",
    lender_name: "VylsCapital",
    lender_address: "10 Place de la Bourse, 69002 Lyon, France",
    loan_amount: 50000,
    loan_amount_in_words: "Cinquante mille euros",
    loan_date: new Date().toLocaleDateString('fr-FR'),
    interest_rate: 2,
    loan_term_months: 60,
    repayment_start_date: new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString('fr-FR'),
    monthly_payment: 876.41,
    signature_date: new Date().toLocaleDateString('fr-FR'),
    borrower_signature_location: "Paris",
};


export default function DocumentGeneratorPage() {
    const { generatePDF, isLoading } = usePDFGenerator();

    const configForm = useForm<ConfigFormValues>({
        resolver: zodResolver(configSchema),
        defaultValues: {
            docType: "loan-contract",
            docLang: "fr",
        }
    });

    // We create a separate form instance for each document type
    const loanContractForm = useForm<LoanContractFormValues>({
        defaultValues: defaultContractValuesFR,
    });
    
    const docType = configForm.watch("docType");
    const docLang = configForm.watch("docLang");
    
    // Watch the data from the specific form based on docType
    const docData = docType === 'loan-contract' ? loanContractForm.watch() : {};
    
    let activeForm: UseFormReturn<any> | null = null;
    if (docType === 'loan-contract') {
        activeForm = loanContractForm;
    }

    const handleGenerateClick = () => {
        generatePDF({
            elementId: 'pdf-preview',
            fileName: `${docType}-${docLang}-${Date.now()}.pdf`,
        });
    };

    const renderForm = () => {
        switch (docType) {
            case "loan-contract":
                return <LoanContractForm form={loanContractForm} lang={docLang} />;
            default:
                return <p>Veuillez sélectionner un type de document.</p>;
        }
    }

    const renderTemplate = () => {
        switch (docType) {
            case "loan-contract":
                return <LoanContractTemplate data={docData} lang={docLang} />;
            default:
                return <div id="pdf-preview" className="p-8 text-center text-muted-foreground">Aperçu du document</div>;
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
                                                                <SelectItem value="loan-contract">Contrat de Prêt</SelectItem>
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
                                                                <SelectItem value="en">English (bientôt)</SelectItem>
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
