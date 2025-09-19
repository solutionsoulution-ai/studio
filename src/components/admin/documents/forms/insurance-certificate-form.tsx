
"use client";

import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    insured_name: z.string().min(2),
    lender_name: z.string().min(2),
    loan_id: z.string().min(5),
    insured_capital: z.coerce.number().positive(),
    monthly_premium: z.coerce.number().positive(),
    effective_date: z.string().min(8),
    end_date: z.string().min(8),
    signature_date: z.string().min(8),
});

export type InsuranceCertificateFormValues = z.infer<typeof formSchema>;

interface InsuranceCertificateFormProps {
  form: UseFormReturn<InsuranceCertificateFormValues>;
  lang: 'fr' | 'en';
}

export default function InsuranceCertificateForm({ form, lang }: InsuranceCertificateFormProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Attestation d'Assurance</CardTitle>
                <CardDescription>Remplissez les champs pour mettre à jour l'aperçu.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-4">
                        <h3 className="font-semibold text-lg border-b pb-2">Informations Générales</h3>
                        <FormField control={form.control} name="insured_name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom de l'Assuré</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="lender_name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom de l'Organisme Prêteur</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        
                        <h3 className="font-semibold text-lg border-b pb-2 pt-4">Détails du Prêt Assuré</h3>
                        <FormField control={form.control} name="loan_id" render={({ field }) => (
                            <FormItem>
                                <FormLabel>N° de Contrat de Prêt</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <div className="grid grid-cols-2 gap-4">
                             <FormField control={form.control} name="insured_capital" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Capital Assuré (€)</FormLabel>
                                    <FormControl><Input type="number" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                             <FormField control={form.control} name="monthly_premium" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prime Mensuelle (€)</FormLabel>
                                    <FormControl><Input type="number" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                         <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="effective_date" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date d'effet</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="end_date" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date de fin</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        
                        <h3 className="font-semibold text-lg border-b pb-2 pt-4">Signature</h3>
                        <FormField control={form.control} name="signature_date" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date de signature</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

InsuranceCertificateForm.schema = formSchema;
