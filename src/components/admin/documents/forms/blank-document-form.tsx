
"use client";

import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    customer_name: z.string().min(2, "Customer name is required."),
    customer_address: z.string().min(5, "Customer address is required."),
    invoice_number: z.string().min(3, "Invoice number is required."),
    invoice_date: z.string().min(8, "Invoice date is required."),
    description: z.string().min(5, "Description is required."),
    amount: z.coerce.number().positive("Amount must be positive."),
    payment_iban: z.string().min(1, "Payment details are required."),
});

export type BlankDocumentFormValues = z.infer<typeof formSchema>;

interface BlankDocumentFormProps {
  form: UseFormReturn<BlankDocumentFormValues>;
}

export default function BlankDocumentForm({ form }: BlankDocumentFormProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Invoice (EN)</CardTitle>
                <CardDescription>Fill in the fields to generate the invoice in English.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-4">
                        <h3 className="font-semibold text-lg border-b pb-2">Customer</h3>
                        <FormField control={form.control} name="customer_name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Customer Name</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="customer_address" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Customer Address</FormLabel>
                                <FormControl><Textarea rows={2} {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        
                        <h3 className="font-semibold text-lg border-b pb-2 pt-4">Invoice Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                           <FormField control={form.control} name="invoice_number" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Invoice No.</FormLabel>
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
                                <FormLabel>Amount (€)</FormLabel>
                                <FormControl><Input type="number" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        
                        <h3 className="font-semibold text-lg border-b pb-2 pt-4">Payment</h3>
                        <FormField control={form.control} name="payment_iban" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Payment Details</FormLabel>
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

BlankDocumentForm.schema = formSchema;
