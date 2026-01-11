
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
import { useDocumentGenerator } from './DocumentGenerator';

interface DocumentFormProps {
  documentType: string;
  initialData: any;
  onFormChange: (data: any) => void;
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
            const isLoanTerm = field.name === 'loan_term';
            if (isLoanTerm) {
                 fieldSchema = z.preprocess(
                    (val) => val === '' ? null : parseInt(String(val), 10),
                    z.number({invalid_type_error: "Doit être un nombre."}).int().min(1, { message: "Doit être supérieur à 0." }).nullable()
                );
            } else {
                fieldSchema = z.preprocess(
                    (val) => val === '' ? null : Number(String(val).replace(/,/g, '.')),
                     z.number({invalid_type_error: "Doit être un nombre."}).min(0, { message: "Doit être un nombre positif." }).nullable()
                );
            }
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
    
    if (field.name.includes('item') && !field.name.includes('item1')) {
       return fieldSchema.optional().nullable();
    }
    if (field.validation.type === 'string' && !field.name.includes('item1_description')) {
        const schema = fieldSchema as z.ZodString;
        if(field.name.includes('item')) return schema.optional().nullable();
    }

    return fieldSchema;
};


const DocumentForm: React.FC<DocumentFormProps> = ({ documentType, initialData, onFormChange }) => {
  const { generatePDF, isLoading } = usePDFGenerator();
  const { currency } = useDocumentGenerator();
  
  const currentFields = useMemo(() => documentFields[documentType as keyof typeof documentFields] || [], [documentType]);
  const schema = useMemo(() => buildSchema(currentFields), [currentFields]);
  
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData,
    mode: 'onChange',
  });

  const { handleSubmit, control, watch, reset, setValue } = methods;

  const watchedValues = watch();

  useEffect(() => {
      const subscription = watch((value) => {
          onFormChange(value);
      });
      return () => subscription.unsubscribe();
  }, [watch, onFormChange]);


  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  // Dynamic calculation for loan contract
  useEffect(() => {
    if (documentType === 'contrat-de-pret-personnel') {
        const { loan_amount, loan_term, taeg } = watchedValues;

        const amount = Number(loan_amount);
        const term = Number(loan_term);
        const annualRateStr = String(taeg || '0').replace('%', '').replace(',', '.');
        const annualRate = parseFloat(annualRateStr) / 100;

        if (amount > 0 && term > 0 && annualRate >= 0) {
            const monthlyRate = annualRate / 12;
            let monthlyPayment;

            if (monthlyRate === 0) {
                monthlyPayment = amount / term;
            } else {
                monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
            }

            const totalDue = monthlyPayment * term;
            const totalCost = totalDue - amount;
            
            setValue('monthly_payment', Number(monthlyPayment.toFixed(2)), { shouldValidate: true, shouldDirty: true });
            setValue('total_cost', Number(totalCost.toFixed(2)), { shouldValidate: true, shouldDirty: true });
            setValue('total_due', Number(totalDue.toFixed(2)), { shouldValidate: true, shouldDirty: true });
        }
    }
  }, [watchedValues, documentType, setValue]);


  const onSubmit = () => {
    generatePDF({ elementId: 'pdf-content', fileName: `${documentType}.pdf` });
  };
  
  const renderField = (field: DocumentField) => {
    const currencySymbol = currency === 'EUR' ? '€' : '$';
    const labelText = field.label['fr'];
    const isReadOnly = (documentType === 'contrat-de-pret-personnel' && ['monthly_payment', 'total_cost', 'total_due'].includes(field.name));

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
        <Label htmlFor={field.name}>{`${labelText} ${field.type === 'number' && (field.name.includes('amount') || field.name.includes('price') || isReadOnly) ? `(${currencySymbol})` : ''}`}</Label>
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
