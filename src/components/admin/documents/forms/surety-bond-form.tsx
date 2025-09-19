
"use client";

import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    lender_name: z.string().min(2),
    borrower_name: z.string().min(2),
    guarantor_name: z.string().min(2),
    loan_contract_id: z.string().min(5),
    loan_amount: z.coerce.number().positive(),
    loan_term_months: z.coerce.number().positive().int(),
    loan_date: z.string().min(8),
    signature_location: z.string().min(2),
    signature_date: z.string().min(8),
});

export type SuretyBondFormValues = z.infer<typeof formSchema>;

interface SuretyBondFormProps {
  form: UseFormReturn<SuretyBondFormValues>;
  lang: 'fr' | 'en';
}

export default function SuretyBondForm({ form, lang }: SuretyBondFormProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Acte de Cautionnement</CardTitle>
                <CardDescription>Remplissez les champs pour mettre à jour l'aperçu.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-4">
                        <h3 className="font-semibold text-lg border-b pb-2">Parties</h3>
                        <FormField control={form.control} name="borrower_name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom de l'Emprunteur (Débiteur)</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="guarantor_name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom de la Caution</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        
                        <h3 className="font-semibold text-lg border-b pb-2 pt-4">Détails du Prêt Cautionné</h3>
                        <FormField control={form.control} name="loan_contract_id" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Référence du Contrat de Prêt</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="loan_amount" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Montant (€)</FormLabel>
                                    <FormControl><Input type="number" {...field} /></FormControl>
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
                        <FormField control={form.control} name="loan_date" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date du Contrat de Prêt</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        
                        <h3 className="font-semibold text-lg border-b pb-2 pt-4">Signature</h3>
                         <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="signature_location" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Lieu de signature</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="signature_date" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date de signature</FormLabel>
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

SuretyBondForm.schema = formSchema;
