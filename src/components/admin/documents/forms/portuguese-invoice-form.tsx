
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

export type PortugueseInvoiceFormValues = z.infer<typeof formSchema>;

interface PortugueseInvoiceFormProps {
  form: UseFormReturn<PortugueseInvoiceFormValues>;
}

export default function PortugueseInvoiceForm({ form }: PortugueseInvoiceFormProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Fatura (PT)</CardTitle>
                <CardDescription>Preencha os campos para gerar a fatura em português.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-4">
                        <h3 className="font-semibold text-lg border-b pb-2">Cliente</h3>
                        <FormField control={form.control} name="customer_name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome do Cliente</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="customer_address" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Endereço do Cliente</FormLabel>
                                <FormControl><Textarea rows={2} {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        
                        <h3 className="font-semibold text-lg border-b pb-2 pt-4">Detalhes da Fatura</h3>
                        <div className="grid grid-cols-2 gap-4">
                           <FormField control={form.control} name="invoice_number" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>N.º da Fatura</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="invoice_date" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descrição</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <FormField control={form.control} name="amount" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Valor (€)</FormLabel>
                                <FormControl><Input type="number" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        
                        <h3 className="font-semibold text-lg border-b pb-2 pt-4">Pagamento</h3>
                        <FormField control={form.control} name="payment_iban" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Detalhes de Pagamento (IBAN)</FormLabel>
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

PortugueseInvoiceForm.schema = formSchema;
