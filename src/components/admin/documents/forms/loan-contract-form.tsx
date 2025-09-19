
"use client";

import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    // Borrower
    borrower_name: z.string().min(2),
    borrower_address: z.string().min(5),
    
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

export type LoanContractFormValues = z.infer<typeof formSchema>;

interface LoanContractFormProps {
  form: UseFormReturn<LoanContractFormValues>;
}


export default function LoanContractForm({ form }: LoanContractFormProps) {
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

// Attach schema to component for easy access in parent
LoanContractForm.schema = formSchema;

    