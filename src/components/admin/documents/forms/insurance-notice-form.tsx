
"use client";

import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    company_name: z.string().min(2),
    company_address: z.string().min(10),
});

export type InsuranceNoticeFormValues = z.infer<typeof formSchema>;

interface InsuranceNoticeFormProps {
  form: UseFormReturn<InsuranceNoticeFormValues>;
}

export default function InsuranceNoticeForm({ form }: InsuranceNoticeFormProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Notice d'Information Assurance</CardTitle>
                <CardDescription>Mettez à jour les informations de la compagnie d'assurance.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-4">
                        <FormField control={form.control} name="company_name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom de la Compagnie</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="company_address" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Adresse de la Compagnie</FormLabel>
                                <FormControl><Textarea rows={2} {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

InsuranceNoticeForm.schema = formSchema;
