
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { LoanContractData } from "../templates/loan-contract-template";

const formSchema = z.object({
    // Borrower
    borrower_name: z.string().min(2),
    borrower_address: z.string().min(5),
    borrower_email: z.string().email(),
    
    // Lender
    lender_name: z.string(),
    lender_address: z.string(),

    // Loan details
    loan_amount: z.coerce.number().positive(),
    loan_amount_in_words: z.string().min(5),
    loan_date: z.string().min(8),
    interest_rate: z.coerce.number().min(0),
    loan_term_months: z.coerce.number().int().positive(),

    // Repayment
    repayment_start_date: z.string().min(8),
    monthly_payment: z.coerce.number().positive(),
    
    // Signatures
    signature_date: z.string().min(8),
    borrower_signature_location: z.string().min(2),
});

type FormValues = z.infer<typeof formSchema>;

interface LoanContractFormProps {
  onDataChange: (data: LoanContractData) => void;
  lang: 'fr' | 'en';
}

const defaultValuesFR: FormValues = {
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

export default function LoanContractForm({ onDataChange, lang }: LoanContractFormProps) {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValuesFR,
    });

    const watchedData = form.watch();

    useEffect(() => {
        onDataChange(watchedData);
    }, [watchedData, onDataChange]);


    return (
        <Card>
            <CardHeader>
                <CardTitle>Contrat de Prêt</CardTitle>
                <CardDescription>Remplissez les champs pour mettre à jour l'aperçu.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-4">
                        <h3 className="font-semibold text-lg border-b pb-2">Emprunteur</h3>
                        <FormField control={form.control} name="borrower_name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom Complet</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="borrower_address" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Adresse Complète</FormLabel>
                                <FormControl><Textarea rows={2} {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        
                        <h3 className="font-semibold text-lg border-b pb-2 pt-4">Détails du Prêt</h3>
                         <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="loan_amount" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Montant (€)</FormLabel>
                                    <FormControl><Input type="number" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                             <FormField control={form.control} name="interest_rate" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Taux (%)</FormLabel>
                                    <FormControl><Input type="number" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        <FormField control={form.control} name="loan_amount_in_words" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Montant en toutes lettres</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <div className="grid grid-cols-2 gap-4">
                           <FormField control={form.control} name="loan_date" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date du prêt</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="loan_term_months" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Durée (mois)</FormLabel>
                                    <FormControl><Input type="number" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        
                         <h3 className="font-semibold text-lg border-b pb-2 pt-4">Remboursement</h3>
                         <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="repayment_start_date" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date de début</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="monthly_payment" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mensualité (€)</FormLabel>
                                    <FormControl><Input type="number" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        
                        <h3 className="font-semibold text-lg border-b pb-2 pt-4">Signature</h3>
                         <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="signature_date" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date de signature</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="borrower_signature_location" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Lieu de signature</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
