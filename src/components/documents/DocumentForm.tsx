
"use client";
import React, { useEffect, useMemo, useRef } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { usePDFGenerator } from '@/hooks/use-pdf-generator';
import { Loader2 } from 'lucide-react';
import { documentFields, DocumentField } from '@/lib/document-fields';

interface DocumentFormProps {
  documentType: string;
  initialData: any;
  onFormChange: (data: any) => void;
  currency: 'EUR' | 'USD';
}

const isOptionalField = (fieldName: string) => {
    return fieldName.includes('item') && !fieldName.includes('item1');
};

const buildFieldSchema = (field: DocumentField): z.ZodType<any, any> => {
    let fieldSchema;

    switch (field.validation.type) {
        case 'string':
            fieldSchema = z.string();
            if (isOptionalField(field.name)) {
                return fieldSchema.optional().nullable();
            }
            return fieldSchema.min(1, { message: "Ce champ est requis." });

        case 'number': {
            let numberSchema: z.ZodType<any> = z.preprocess(
                (val) => String(val).replace(/,/g, '.'),
                z.string().refine((val) => val === '' || !isNaN(parseFloat(val)), {
                    message: "Doit être un nombre.",
                })
            );

            if (isOptionalField(field.name)) {
                return numberSchema.optional().nullable();
            }
            
            return numberSchema;
        }

        case 'date': {
            fieldSchema = z.string().refine((val) => !isNaN(Date.parse(val)), {
                message: "Date invalide",
            });
             if (isOptionalField(field.name)) {
                return fieldSchema.optional().nullable();
            }
            return fieldSchema;
        }
        
        case 'any':
             return z.any().optional();

        default:
            return z.any();
    }
};

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


const DocumentForm: React.FC<DocumentFormProps> = ({ documentType, initialData, onFormChange, currency }) => {
  const { generatePDF, isLoading } = usePDFGenerator();
  
  const currentFields = useMemo(() => documentFields[documentType as keyof typeof documentFields] || [], [documentType]);
  const schema = useMemo(() => buildSchema(currentFields), [currentFields]);
  
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData,
    mode: 'onChange',
  });

  const { handleSubmit, control, watch, reset, setValue } = methods;

  useEffect(() => {
      const subscription = watch((value) => {
          onFormChange(value);
      });
      return () => subscription.unsubscribe();
  }, [watch, onFormChange]);


  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  const onSubmit = () => {
    generatePDF({ elementId: 'pdf-content', fileName: `${documentType}.pdf` });
  };
  
  const renderField = (field: DocumentField) => {
    const currencySymbol = currency === 'EUR' ? '€' : '$';
    const labelText = field.label['fr'];
    const isReadOnly = false; // All fields are now manually editable

    if (field.type === 'group') {
      return (
        <div key={field.name} className="space-y-4 rounded-lg border p-4">
          <p className="font-medium text-sm">{labelText}</p>
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
        <Label htmlFor={field.name}>{`${labelText} ${field.type === 'number' && (field.name.includes('amount') || field.name.includes('price') || field.name.includes('payment') || field.name.includes('cost') || field.name.includes('due') || field.name.includes('reimbursed_fees')) ? `(${currencySymbol})` : ''}`}</Label>
        <Controller
          name={field.name}
          control={control}
          render={({ field: controllerField, fieldState }) => (
            <>
              {field.type === 'textarea' ? (
                <Textarea {...controllerField} id={field.name} placeholder={field.placeholder?.['fr']} />
              ) : (
                <Input {...controllerField} value={controllerField.value || ''} id={field.name} type={field.type} placeholder={field.placeholder?.['fr']} readOnly={isReadOnly} className={isReadOnly ? 'bg-muted/50' : ''}/>
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
              {currentFields.map(field => renderField(field))}
              
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
