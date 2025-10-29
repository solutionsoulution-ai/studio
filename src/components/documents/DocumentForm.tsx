
"use client";
import React, { useState } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { usePDFGenerator } from '@/hooks/use-pdf-generator';
import { Loader2 } from 'lucide-react';
import { documentFields, DocumentField } from '@/lib/document-fields';
import type { Language } from '@/data/documents/languages';

interface DocumentFormProps {
  documentType: string;
  onFormChange: (data: any) => void;
  onLanguageChange: (lang: Language) => void;
  initialLang: Language;
}

const DocumentForm: React.FC<DocumentFormProps> = ({ documentType, onFormChange, onLanguageChange, initialLang }) => {
  const [lang, setLang] = useState<Language>(initialLang);
  const { generatePDF, isLoading } = usePDFGenerator();

  const currentFields = documentFields[documentType as keyof typeof documentFields] || [];

  const schema = z.object(
    currentFields.reduce((acc: any, field: DocumentField) => {
      let fieldSchema;
      switch (field.validation.type) {
        case 'string':
          fieldSchema = z.string().min(1, { message: "Ce champ est requis." });
          if (field.validation.email) fieldSchema = fieldSchema.email({ message: "Adresse e-mail invalide." });
          break;
        case 'number':
          fieldSchema = z.preprocess(
            (val) => Number(String(val)),
            z.number().min(0, { message: "Doit être un nombre positif." })
          );
          break;
        case 'date':
            fieldSchema = z.string().refine((val) => !isNaN(Date.parse(val)), {
                message: "Date invalide",
            });
            break;
        default:
          fieldSchema = z.any();
      }
      acc[field.name] = fieldSchema;
      return acc;
    }, {})
  );

  const methods = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange'
  });

  const { handleSubmit, control, watch } = methods;

  React.useEffect(() => {
    const subscription = watch((value) => {
      onFormChange(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, onFormChange]);

  const onSubmit = (data: any) => {
    generatePDF({ elementId: 'pdf-content', fileName: `${documentType}.pdf` });
  };
  
  const handleLangChange = (newLang: Language) => {
      setLang(newLang);
      onLanguageChange(newLang);
  }

  const renderField = (field: DocumentField) => {
    return (
      <div key={field.name} className="space-y-2">
        <Label htmlFor={field.name}>{field.label['fr']}</Label>
        <Controller
          name={field.name}
          control={control}
          defaultValue={field.defaultValue || ''}
          render={({ field: controllerField, fieldState }) => (
            <>
              {field.type === 'textarea' ? (
                <Textarea {...controllerField} id={field.name} placeholder={field.placeholder?.['fr']} />
              ) : (
                <Input {...controllerField} id={field.name} type={field.type} placeholder={field.placeholder?.['fr']} />
              )}
              {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
            </>
          )}
        />
      </div>
    );
  };

  return (
    <FormProvider {...methods}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Générateur de Document</CardTitle>
          <CardDescription>Remplissez les champs pour générer votre document.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label>Langue du document</Label>
               <Select onValueChange={handleLangChange} defaultValue={lang}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner la langue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {currentFields.map(renderField)}
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Génération en cours...' : 'Générer le PDF'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default DocumentForm;
