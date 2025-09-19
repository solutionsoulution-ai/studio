
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { usePDFGenerator } from "@/hooks/use-pdf-generator";
import { Loader2, FileDown } from "lucide-react";
import LoanContractForm from "@/components/admin/documents/forms/loan-contract-form";
import LoanContractTemplate, { type LoanContractData } from "@/components/admin/documents/templates/loan-contract-template";

type DocumentType = "loan-contract";
type DocumentLanguage = "fr" | "en";

export default function DocumentGeneratorPage() {
    const [docType, setDocType] = useState<DocumentType>("loan-contract");
    const [docLang, setDocLang] = useState<DocumentLanguage>("fr");

    // State for the document data, updated by the form component
    const [docData, setDocData] = useState<LoanContractData | {}>({});

    const { generatePDF, isLoading } = usePDFGenerator();

    const handleGenerateClick = () => {
        generatePDF({
            elementId: 'pdf-preview', // The ID of the template component
            fileName: `${docType}-${docLang}-${Date.now()}.pdf`,
        });
    };

    const renderForm = () => {
        switch (docType) {
            case "loan-contract":
                return <LoanContractForm onDataChange={setDocData} lang={docLang} />;
            // Add other document forms here
            default:
                return <p>Veuillez sélectionner un type de document.</p>;
        }
    }

    const renderTemplate = () => {
        switch (docType) {
            case "loan-contract":
                // The template receives the live data from the form
                return <LoanContractTemplate data={docData as LoanContractData} lang={docLang} />;
            // Add other document templates here
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
                                <CardContent className="space-y-4">
                                     <div>
                                        <label className="text-sm font-medium">Type de document</label>
                                        <Select value={docType} onValueChange={(v) => setDocType(v as DocumentType)}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="loan-contract">Contrat de Prêt</SelectItem>
                                            </SelectContent>
                                        </Select>
                                     </div>
                                     <div>
                                        <label className="text-sm font-medium">Langue</label>
                                        <Select value={docLang} onValueChange={(v) => setDocLang(v as DocumentLanguage)}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="fr">Français</SelectItem>
                                                <SelectItem value="en">English (bientôt)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                     </div>
                                </CardContent>
                            </Card>
                            
                            <div className="flex-1 overflow-auto">
                                {renderForm()}
                            </div>
                        </div>

                         <div className="mt-auto p-4">
                            <Button onClick={handleGenerateClick} disabled={isLoading} className="w-full">
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
