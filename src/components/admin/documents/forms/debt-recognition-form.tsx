
"use client";

import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    borrower_name: z.string().min(2),
    borrower_address: z.string().min(5),
    lender_name: z.string(),
    loan_amount: z.coerce.number().positive(),
    loan_amount_in_words: z.string().min(5),
    loan_date: z.string().min(8),
    repayment_deadline: z.string().min(8),
    signature_location: z.string().min(2),
    signature_date: z.string().min(8),
});

export type DebtRecognitionFormValues = z.infer<typeof formSchema>;

interface DebtRecognitionFormProps {
  form: UseFormReturn<DebtRecognitionFormValues>;
  lang: 'fr' | 'en';
}

export default function DebtRecognitionForm({ form, lang }: DebtRecognitionFormProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Reconnaissance de Dette</CardTitle>
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
                        
                        <h3 className="font-semibold text-lg border-b pb-2 pt-4">Détails de la Dette</h3>
                        <FormField control={form.control} name="loan_amount" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Montant (€)</FormLabel>
                                <FormControl><Input type="number" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
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
                            <FormField control={form.control} name="repayment_deadline" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date de remboursement</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
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
                            <FormField control={form.control} name="signature_location" render={({ field }) => (
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
DebtRecognitionForm.schema = formSchema;
