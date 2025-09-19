
"use client";

import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    beneficiary_name: z.string().min(2),
    beneficiary_address: z.string().min(5),
    beneficiary_id_number: z.string().min(5),
    eligibility_amount: z.coerce.number().positive(),
    validity_end_date: z.string().min(8),
    analyst_name: z.string().min(2),
    signature_date: z.string().min(8),
});

export type EligibilityCertificateFormValues = z.infer<typeof formSchema>;

interface EligibilityCertificateFormProps {
  form: UseFormReturn<EligibilityCertificateFormValues>;
}

export default function EligibilityCertificateForm({ form }: EligibilityCertificateFormProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Attestation d'Éligibilité au Financement</CardTitle>
                <CardDescription>Remplissez les champs pour mettre à jour l'aperçu.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-4">
                        <h3 className="font-semibold text-lg border-b pb-2">Bénéficiaire</h3>
                        <FormField control={form.control} name="beneficiary_name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom Complet</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="beneficiary_address" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Adresse Complète</FormLabel>
                                <FormControl><Textarea rows={2} {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <FormField control={form.control} name="beneficiary_id_number" render={({ field }) => (
                            <FormItem>
                                <FormLabel>N° Pièce d'Identité</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        
                        <h3 className="font-semibold text-lg border-b pb-2 pt-4">Détails de l'Éligibilité</h3>
                        <FormField control={form.control} name="eligibility_amount" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Montant d'éligibilité (€)</FormLabel>
                                <FormControl><Input type="number" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <FormField control={form.control} name="validity_end_date" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date de fin de validité</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        
                        <h3 className="font-semibold text-lg border-b pb-2 pt-4">Signature</h3>
                         <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="analyst_name" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom de l'analyste</FormLabel>
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

EligibilityCertificateForm.schema = formSchema;

    