
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle, Hourglass, Send, RotateCw, Loader2 } from "lucide-react";
import React, { useState, useEffect, FormEvent } from "react";
import { useBankingStore, OngoingTransfer } from "@/hooks/use-banking-store.tsx";

const TransferStatusDisplay: React.FC<{ transfer: OngoingTransfer }> = ({ transfer }) => {
    const { updateTransferStatus, addTransaction } = useBankingStore();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (transfer.status !== 'processing') {
            return;
        }

        const updateProgress = () => {
            const now = Date.now();
            const elapsedTime = (now - transfer.startTime) / 1000;
            const calculatedProgress = Math.min(100, (elapsedTime / transfer.duration) * 100);
            setProgress(calculatedProgress);

            if (calculatedProgress >= 100) {
                addTransaction({
                    description: `Virement sortant - ${transfer.reason}`,
                    amount: -transfer.amount,
                    type: 'debit'
                });
                updateTransferStatus(transfer.id, 'success');
            }
        };

        updateProgress(); // Initial check
        const interval = setInterval(updateProgress, 500); // Update progress periodically

        return () => clearInterval(interval);
    }, [transfer, updateTransferStatus, addTransaction]);

    switch (transfer.status) {
        case 'processing':
            return (
                <div className="space-y-4 text-center">
                    <Hourglass className="mx-auto h-12 w-12 text-primary animate-spin" />
                    <p className="font-semibold">Virement en cours de traitement...</p>
                    <Progress value={progress} className="w-full" />
                    <p className="text-sm text-muted-foreground">Validation du virement de {transfer.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}...</p>
                </div>
            );
        case 'success':
            return (
                <Alert variant="default" className="bg-green-50 border-green-200">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <AlertTitle className="text-green-800">Virement Réussi</AlertTitle>
                    <AlertDescription className="text-green-700">
                        Le virement de {transfer.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })} pour "{transfer.reason}" a été effectué.
                    </AlertDescription>
                </Alert>
            );
        case 'failed':
            return (
                <Alert variant="destructive">
                    <XCircle className="h-5 w-5" />
                    <AlertTitle>Virement Échoué</AlertTitle>
                    <AlertDescription>
                        {transfer.blockReason || "Le virement n'a pas pu être traité. Veuillez contacter le support."}
                    </AlertDescription>
                </Alert>
            );
        default:
            return null;
    }
};

export default function VirementsPage() {
    const { initiateTransfer, ongoingTransfers, processFinishedTransfers } = useBankingStore();
    const [currentTransfer, setCurrentTransfer] = useState<OngoingTransfer | null>(null);

    useEffect(() => {
        // Au chargement de la page, traiter les virements qui se seraient terminés "en arrière-plan"
        processFinishedTransfers();
    }, [processFinishedTransfers]);
    
    useEffect(() => {
        // S'il y a un virement en cours, on l'affiche. Sinon, on vérifie les anciens.
        const processingTransfer = ongoingTransfers.find(t => t.status === 'processing');
        if (processingTransfer) {
            setCurrentTransfer(processingTransfer);
        } else if (ongoingTransfers.length > 0) {
            // S'il n'y a pas de virement en cours, afficher le plus récent.
            setCurrentTransfer(ongoingTransfers[ongoingTransfers.length - 1]);
        } else {
            setCurrentTransfer(null);
        }
    }, [ongoingTransfers]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const amountInput = form.elements.namedItem('amount') as HTMLInputElement;
        const reasonInput = form.elements.namedItem('reason') as HTMLInputElement;
        
        const newTransfer = initiateTransfer(parseFloat(amountInput.value), reasonInput.value);
        setCurrentTransfer(newTransfer);
    };

    const handleReset = () => {
        setCurrentTransfer(null);
    }

    const renderForm = () => (
        <form onSubmit={handleSubmit}>
            <CardHeader>
                <CardTitle>Nouveau virement</CardTitle>
                <CardDescription>Saisissez les détails du bénéficiaire et le montant à envoyer.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="beneficiary-name">Nom du bénéficiaire</Label>
                    <Input id="beneficiary-name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="iban">IBAN du bénéficiaire</Label>
                    <Input id="iban" placeholder="FR76..." required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="amount">Montant (€)</Label>
                        <Input id="amount" name="amount" type="number" step="0.01" placeholder="100.00" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="reason">Motif du virement</Label>
                        <Input id="reason" name="reason" placeholder="Facture N°123" required />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="border-t p-6">
                <Button type="submit" className="w-full">
                    <Send />
                    Effectuer le virement
                </Button>
            </CardFooter>
        </form>
    );

    return (
        <div className="flex flex-col min-h-dvh bg-background">
            <main className="flex-1">
                <div className="container mx-auto py-12 px-4 max-w-2xl">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold font-headline">Effectuer un Virement</h1>
                        {currentTransfer && currentTransfer.status !== 'processing' && (
                            <Button variant="outline" onClick={handleReset}><RotateCw className="mr-2"/>Nouveau Virement</Button>
                        )}
                    </div>
                    
                    <Card>
                        {currentTransfer ? (
                            <CardContent className="p-6">
                                <TransferStatusDisplay transfer={currentTransfer} />
                            </CardContent>
                        ) : (
                            renderForm()
                        )}
                    </Card>
                </div>
            </main>
        </div>
    );
}
