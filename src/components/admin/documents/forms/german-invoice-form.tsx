
"use client";

import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    customer_name: z.string().min(2, "Le nom du client est requis."),
    customer_address: z.string().min(5, "L'adresse du client est requise."),
    invoice_number: z.string().min(3, "Le numéro de facture est requis."),
    invoice_date: z.string().min(8, "La date de la facture est requise."),
    description: z.string().min(5, "La description est requise."),
    amount: z.coerce.number().positive("Le montant doit être positif."),
    payment_iban: z.string().min(1, "Les détails de paiement sont requis."),
});

export type GermanInvoiceFormValues = z.infer<typeof formSchema>;

interface GermanInvoiceFormProps {
  form: UseFormReturn<GermanInvoiceFormValues>;
}

export default function GermanInvoiceForm({ form }: GermanInvoiceFormProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Rechnung (DE)</CardTitle>
                <CardDescription>Füllen Sie die Felder aus, um die Rechnung auf Deutsch zu erstellen.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-4">
                        <h3 className="font-semibold text-lg border-b pb-2">Kunde</h3>
                        <FormField control={form.control} name="customer_name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kundenname</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="customer_address" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kundenadresse</FormLabel>
                                <FormControl><Textarea rows={2} {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        
                        <h3 className="font-semibold text-lg border-b pb-2 pt-4">Rechnungsdetails</h3>
                        <div className="grid grid-cols-2 gap-4">
                           <FormField control={form.control} name="invoice_number" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rechnungs-Nr.</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="invoice_date" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Datum</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Beschreibung</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <FormField control={form.control} name="amount" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Betrag (€)</FormLabel>
                                <FormControl><Input type="number" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        
                        <h3 className="font-semibold text-lg border-b pb-2 pt-4">Zahlung</h3>
                        <FormField control={form.control} name="payment_iban" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Zahlungsdetails (Bankverbindung)</FormLabel>
                                <FormControl><Textarea rows={5} {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

GermanInvoiceForm.schema = formSchema;
