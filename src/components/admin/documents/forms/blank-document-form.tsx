
"use client";

import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    document_title: z.string().min(2, "Le titre est requis."),
    content_placeholder: z.string().optional(),
});

export type BlankDocumentFormValues = z.infer<typeof formSchema>;

interface BlankDocumentFormProps {
  form: UseFormReturn<BlankDocumentFormValues>;
  lang: 'fr' | 'en';
}

export default function BlankDocumentForm({ form, lang }: BlankDocumentFormProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Document Vierge</CardTitle>
                <CardDescription>Remplissez les champs de base pour ce nouveau document.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-4">
                        <FormField control={form.control} name="document_title" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Titre du Document</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <FormField control={form.control} name="content_placeholder" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contenu (temporaire)</FormLabel>
                                <FormControl><Textarea rows={5} {...field} placeholder="Ce champ est un espace réservé. Le contenu réel sera défini dans le modèle."/></FormControl>
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
