
"use client";
import React, { useEffect, useMemo, useRef } from 'react';
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
import { useDebounce } from 'use-debounce';
import { useDocumentGenerator } from './DocumentGenerator';
import { Language } from '@/data/documents/languages';
import { Currency } from './DocumentPageClient';

interface DocumentFormProps {
  documentType: string;
  initialData: any;
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
                (val) => val === '' ? null : Number(String(val).replace(/,/g, '.')),
                 z.number({invalid_type_error: "Doit être un nombre."}).min(0, { message: "Doit être un nombre positif." }).nullable()
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
    
    if (field.name.includes('item') && !field.name.includes('item1')) {
       return fieldSchema.optional().nullable();
    }
    if (field.validation.type === 'string' && !field.name.includes('item1_description')) {
        const schema = fieldSchema as z.ZodString;
        if(field.name.includes('item')) return schema.optional().nullable();
    }

    return fieldSchema;
};


const DocumentForm: React.FC<DocumentFormProps> = ({ documentType, initialData }) => {
  const { generatePDF, isLoading } = usePDFGenerator();
  const { setFormData, setLang, setCurrency } = useDocumentGenerator();
  
  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);


  const currentFields = useMemo(() => documentFields[documentType as keyof typeof documentFields] || [], [documentType]);
  const schema = useMemo(() => buildSchema(currentFields), [currentFields]);
  
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData,
    mode: 'onChange',
  });

  const { handleSubmit, control, watch, reset, setValue } = methods;

  const watchedValues = watch();
  const [debouncedFormData] = useDebounce(watchedValues, 300);

  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  useEffect(() => {
    if (isMounted.current) {
        setFormData(debouncedFormData);
    }
  }, [debouncedFormData, setFormData]);

  // Dynamic calculation for loan contract
  useEffect(() => {
    if (documentType === 'contrat-de-pret-personnel') {
        const { loan_amount, loan_term, taeg } = debouncedFormData;

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
            
            setValue('monthly_payment', Number(monthlyPayment.toFixed(2)), { shouldValidate: true });
            setValue('total_cost', Number(totalCost.toFixed(2)), { shouldValidate: true });
            setValue('total_due', Number(totalDue.toFixed(2)), { shouldValidate: true });
        }
    }
  }, [debouncedFormData, documentType, setValue]);


  const onSubmit = () => {
    generatePDF({ elementId: 'pdf-content', fileName: `${documentType}.pdf` });
  };
  
  const renderField = (field: DocumentField) => {
    const currencySymbol = '€'; // Hardcode for now as currency selector is in this component
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
              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                  <Label>Langue</Label>
                  <Select onValueChange={(v) => setLang(v as Language)} defaultValue="fr">
                      <SelectTrigger>
                      <SelectValue placeholder="Sélectionner la langue" />
                      </SelectTrigger>
                      <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="lt">Lietuvių</SelectItem>
                      <SelectItem value="nl">Nederlands</SelectItem>
                      </SelectContent>
                  </Select>
                  </div>
                  <div className="space-y-2">
                      <Label>Devise</Label>
                      <Select onValueChange={(v) => setCurrency(v as Currency)} defaultValue="EUR">
                          <SelectTrigger>
                              <SelectValue placeholder="Sélectionner la devise" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="EUR">Euro (€)</SelectItem>
                              <SelectItem value="USD">Dollar ($)</SelectItem>
                          </SelectContent>
                      </Select>
                  </div>
              </div>

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
