
"use client";

import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    customer_name: z.string().min(2),
    customer_address: z.string().min(5),
    invoice_number: z.string().min(3),
    invoice_date: z.string().min(8),
    description: z.string().min(5),
    amount: z.coerce.number().positive(),
    payment_iban: z.string().min(15),
});

export type InvoiceFormValues = z.infer<typeof formSchema>;

interface InvoiceFormProps {
  form: UseFormReturn<InvoiceFormValues>;
}

export default function InvoiceForm({ form }: InvoiceFormProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Facture</CardTitle>
                <CardDescription>Remplissez les champs pour générer la facture.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-4">
                        <h3 className="font-semibold text-lg border-b pb-2">Client</h3>
                        <FormField control={form.control} name="customer_name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom du Client</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="customer_address" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Adresse du Client</FormLabel>
                                <FormControl><Textarea rows={2} {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        
                        <h3 className="font-semibold text-lg border-b pb-2 pt-4">Détails de la Facture</h3>
                        <div className="grid grid-cols-2 gap-4">
                           <FormField control={form.control} name="invoice_number" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Numéro de Facture</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="invoice_date" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <FormField control={form.control} name="amount" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Montant (€)</FormLabel>
                                <FormControl><Input type="number" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        
                        <h3 className="font-semibold text-lg border-b pb-2 pt-4">Paiement</h3>
                        <FormField control={form.control} name="payment_iban" render={({ field }) => (
                            <FormItem>
                                <FormLabel>IBAN pour le paiement</FormLabel>
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

InvoiceForm.schema = formSchema;

    