
"use client";
import React, { useEffect } from 'react';
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
import { useDocumentGenerator } from './DocumentGenerator';

interface DocumentFormProps {
  documentType: string;
}

const buildSchema = (fields: DocumentField[]): z.ZodObject<any> => {
    const shape: any = {};
    fields.forEach((field) => {
        if (field.type === 'group' && field.fields) {
            field.fields.forEach(subField => {
                shape[subField.name] = buildFieldSchema(subField);
            });
        } else {
            shape[field.name] = buildFieldSchema(field);
        }
    });
    return z.object(shape);
};

const buildFieldSchema = (field: DocumentField): z.ZodType<any, any> => {
    let fieldSchema;
    switch (field.validation.type) {
        case 'string':
            fieldSchema = z.string().min(1, { message: "Ce champ est requis." });
            if (field.validation.email) fieldSchema = fieldSchema.email({ message: "Adresse e-mail invalide." });
            break;
        case 'number':
            fieldSchema = z.preprocess(
                (val) => val === '' ? null : Number(String(val)),
                 z.number().min(0, { message: "Doit être un nombre positif." }).nullable()
            );
            break;
        case 'date':
            fieldSchema = z.string().refine((val) => !isNaN(Date.parse(val)), {
                message: "Date invalide",
            });
            break;
        case 'any':
             fieldSchema = z.any().optional();
             break;
        default:
            fieldSchema = z.any();
    }
    // Make fields not required if they are not the first item fields for invoice
     if (field.name.includes('item') && !field.name.includes('item1')) {
       return fieldSchema.optional().nullable();
    }
    if (field.validation.type === 'string' && !field.name.includes('item1_description')) {
        const schema = fieldSchema as z.ZodString;
        if(field.name.includes('item')) return schema.optional().nullable();
    }


    return fieldSchema;
};


const DocumentForm: React.FC<DocumentFormProps> = ({ documentType }) => {
  const { formData, setFormData, lang, setLang } = useDocumentGenerator();
  const { generatePDF, isLoading } = usePDFGenerator();

  const currentFields = documentFields[documentType as keyof typeof documentFields] || [];
  
  const schema = buildSchema(currentFields);
  
  const getDefaultValues = () => {
    if (Object.keys(formData).length > 0) {
      return formData;
    }
    return currentFields.reduce((acc: any, field) => {
        if (field.type === 'group' && field.fields) {
            field.fields.forEach(subField => {
                acc[subField.name] = subField.defaultValue ?? '';
            });
        } else {
            acc[field.name] = field.defaultValue ?? '';
        }
        return acc;
    }, {});
  };

  const methods = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: getDefaultValues(),
  });

  const { handleSubmit, control, watch, reset } = methods;

  useEffect(() => {
    reset(getDefaultValues());
  }, [formData, documentType, reset]);
  
  useEffect(() => {
    const subscription = watch((value) => {
      setFormData(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, setFormData]);

  const onSubmit = (data: any) => {
    generatePDF({ elementId: 'pdf-content', fileName: `${documentType}.pdf` });
  };

  const renderField = (field: DocumentField) => {
    if (field.type === 'group') {
      return (
        <div key={field.name} className="space-y-4 rounded-lg border p-4">
          <p className="font-medium text-sm">{field.label[lang] || field.label['fr']}</p>
          <div className="grid gap-4 sm:grid-cols-1">
            {field.fields?.map(subField => (
                 <div key={subField.name} className="grid grid-cols-1 items-center gap-2">
                    {renderField(subField)}
                </div>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div key={field.name} className="space-y-2">
        <Label htmlFor={field.name}>{field.label[lang] || field.label['fr']}</Label>
        <Controller
          name={field.name}
          control={control}
          render={({ field: controllerField, fieldState }) => (
            <>
              {field.type === 'textarea' ? (
                <Textarea {...controllerField} id={field.name} placeholder={field.placeholder?.[lang] || field.placeholder?.['fr']} />
              ) : (
                <Input {...controllerField} value={controllerField.value || ''} id={field.name} type={field.type} placeholder={field.placeholder?.[lang] || field.placeholder?.['fr']} />
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
               <Select onValueChange={(v) => setLang(v as Language)} defaultValue={lang}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner la langue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="lt">Lietuvių</SelectItem>
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
