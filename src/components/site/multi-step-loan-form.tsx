
"use client";

import { useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2, ArrowRight, ArrowLeft, Send, CheckCircle, FileText, User, Banknote, UploadCloud } from "lucide-react";
import { handleLoanApplication } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";


// Schémas de validation pour chaque étape
const step1Schema = z.object({
  loanType: z.enum(["immobilier", "consommation", "auto", "entreprise", "rachat"], { required_error: "Veuillez sélectionner un type de prêt." }),
  loanAmount: z.coerce.number().positive("Le montant doit être positif."),
  loanTerm: z.coerce.number().int().min(12, "La durée doit être d'au moins 12 mois.").max(360, "La durée ne peut excéder 360 mois."),
});

const step2Schema = z.object({
  firstName: z.string().min(2, "Le prénom est requis."),
  lastName: z.string().min(2, "Le nom est requis."),
  email: z.string().email("L'adresse e-mail est invalide."),
  phone: z.string().min(10, "Le numéro de téléphone est invalide."),
  address: z.string().min(5, "L'adresse est requise."),
  city: z.string().min(2, "La ville est requise."),
  postalCode: z.string().min(4, "Le code postal est requis."),
  country: z.string().min(2, "Le pays est requis."),
  maritalStatus: z.enum(["celibataire", "marie", "divorce", "veuf"], { required_error: "Veuillez sélectionner votre situation." }),
  numberOfChildren: z.coerce.number().int().min(0, "Le nombre d'enfants ne peut être négatif."),
  birthDay: z.coerce.number().int().min(1, "Le jour doit être valide.").max(31),
  birthMonth: z.coerce.number().int().min(1, "Le mois doit être valide.").max(12),
  birthYear: z.coerce.number().int().min(1900, "L'année doit être valide.").max(new Date().getFullYear() - 18, "Vous devez avoir au moins 18 ans."),
});

const step3Schema = z.object({
  occupation: z.string().min(2, "La profession est requise."),
  monthlyIncome: z.coerce.number().positive("Le revenu doit être positif."),
  monthlyExpenses: z.coerce.number().nonnegative("Les charges ne peuvent être négatives."),
  creditScore: z.coerce.number().min(300).max(850, "Le score de crédit doit être entre 300 et 850."),
});

// Limite de taille de fichier à 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024; 
// Types de fichiers autorisés
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];

const fileSchema = z
    .any()
    .optional()
    .refine((files) => !files || files?.length === 1, "Un seul fichier à la fois.")
    .refine((files) => !files || files?.[0]?.size <= MAX_FILE_SIZE, `La taille maximale du fichier est de 5Mo.`)
    .refine(
      (files) => !files || ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Seuls les formats .jpg, .png et .pdf sont acceptés."
    );


const step4Schema = z.object({
  identityDocument: fileSchema.refine((files) => files?.length === 1, "Pièce d'identité requise."),
  proofOfAddress: fileSchema.refine((files) => files?.length === 1, "Justificatif de domicile requis."),
  proofOfIncome: fileSchema.refine((files) => files?.length === 1, "Justificatif de revenus requis."),
});


const fullLoanSchema = z.intersection(step1Schema, step2Schema).and(step3Schema).and(step4Schema).refine(data => {
  try {
    const date = new Date(data.birthYear, data.birthMonth - 1, data.birthDay);
    return date.getFullYear() === data.birthYear && date.getMonth() === data.birthMonth - 1 && date.getDate() === data.birthDay;
  } catch (e) {
    return false;
  }
}, {
  message: "La date de naissance est invalide.",
  path: ["birthDay"],
});

type FullLoanFormValues = z.infer<typeof fullLoanSchema>;

const steps = [
  { id: "Étape 1", name: "Informations sur le Prêt", schema: step1Schema, icon: FileText },
  { id: "Étape 2", name: "Informations Personnelles", schema: step2Schema, icon: User },
  { id: "Étape 3", name: "Situation Financière", schema: step3Schema, icon: Banknote },
  { id: "Étape 4", name: "Documents", schema: step4Schema, icon: UploadCloud },
  { id: "Étape 5", name: "Confirmation", icon: CheckCircle },
];

export default function MultiStepLoanForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();


  const form = useForm<FullLoanFormValues>({
    resolver: zodResolver(fullLoanSchema),
    mode: "onChange",
    defaultValues: {
      loanType: "immobilier",
      loanAmount: 100000,
      loanTerm: 240,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "France",
      maritalStatus: "celibataire",
      numberOfChildren: 0,
      birthDay: undefined,
      birthMonth: undefined,
      birthYear: undefined,
      occupation: "",
      monthlyIncome: 3000,
      monthlyExpenses: 1000,
      creditScore: 700,
      identityDocument: undefined,
      proofOfAddress: undefined,
      proofOfIncome: undefined,
    },
  });
  
  const nextStep = async () => {
    const currentSchema = steps[currentStep].schema;
    if (currentSchema) {
        const fields = Object.keys(currentSchema.shape) as (keyof FullLoanFormValues)[];
        const result = await form.trigger(fields, { shouldFocus: true });
        if (result) {
           setCurrentStep(currentStep + 1);
        }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  async function onSubmit(data: FullLoanFormValues) {
      setIsLoading(true);
      const formData = new FormData();

      // Append all form values to formData
      for (const [key, value] of Object.entries(data)) {
          if (value instanceof FileList && value.length > 0) {
              formData.append(key, value[0]);
          } else if (value !== undefined && value !== null) {
              formData.append(key, String(value));
          }
      }

      const result = await handleLoanApplication(formData);
      setIsLoading(false);
      
      if (result.success && result.applicationId) {
          router.push(`/demande-de-pret/merci?id=${result.applicationId}`);
      } else {
           toast({
            title: "La soumission a échoué",
            description: result.error || "Une erreur inattendue est survenue.",
            variant: "destructive",
          });
      }
  }
  
  const progress = ((currentStep + 1) / steps.length) * 100;
  
  const getFileName = (field: "identityDocument" | "proofOfAddress" | "proofOfIncome") => {
    const files = form.watch(field) as FileList | undefined;
    return files && files.length > 0 ? files[0].name : "Aucun fichier sélectionné";
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6 md:p-8">
        <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-primary">{steps[currentStep].id} / {steps.length}</span>
                <span className="text-sm text-muted-foreground">{steps[currentStep].name}</span>
            </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -30, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 0 && (
                  <div className="space-y-4">
                     <FormField
                        control={form.control}
                        name="loanType"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Type de Prêt</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value} name={field.name}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez le type de projet" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="immobilier">Prêt Immobilier</SelectItem>
                                    <SelectItem value="consommation">Prêt à la Consommation</SelectItem>
                                    <SelectItem value="auto">Prêt Auto</SelectItem>
                                    <SelectItem value="entreprise">Prêt Entreprise</SelectItem>
                                    <SelectItem value="rachat">Rachat de Crédit</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField control={form.control} name="loanAmount" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Montant souhaité (€)</FormLabel>
                        <FormControl><Input type="number" {...field} name={field.name} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="loanTerm" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Durée de remboursement (mois)</FormLabel>
                        <FormControl><Input type="number" {...field} name={field.name} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                )}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <FormField control={form.control} name="firstName" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Prénom</FormLabel>
                            <FormControl><Input {...field} name={field.name} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )} />
                        <FormField control={form.control} name="lastName" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl><Input {...field} name={field.name} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )} />
                    </div>
                     <div className="grid sm:grid-cols-2 gap-4">
                        <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl><Input type="email" {...field} name={field.name} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )} />
                        <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl><Input type="tel" {...field} name={field.name} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )} />
                     </div>
                     <div>
                        <FormLabel>Date de naissance</FormLabel>
                        <div className="grid grid-cols-3 gap-2">
                           <FormField control={form.control} name="birthDay" render={({ field }) => (
                            <FormItem>
                                <FormControl><Input type="number" placeholder="Jour" {...field} onChange={event => field.onChange(+event.target.value)} value={field.value || ''} name={field.name} /></FormControl>
                                <FormMessage />
                            </FormItem>
                            )} />
                             <FormField control={form.control} name="birthMonth" render={({ field }) => (
                            <FormItem>
                                <FormControl><Input type="number" placeholder="Mois" {...field} onChange={event => field.onChange(+event.target.value)} value={field.value || ''} name={field.name} /></FormControl>
                                <FormMessage />
                            </FormItem>
                            )} />
                             <FormField control={form.control} name="birthYear" render={({ field }) => (
                            <FormItem>
                                <FormControl><Input type="number" placeholder="Année" {...field} onChange={event => field.onChange(+event.target.value)} value={field.value || ''} name={field.name} /></FormControl>
                                <FormMessage />
                            </FormItem>
                            )} />
                        </div>
                         {form.formState.errors.birthDay && <p className="text-sm font-medium text-destructive">{form.formState.errors.birthDay.message}</p>}
                     </div>
                     <FormField control={form.control} name="address" render={({ field }) => (
                        <FormItem>
                        <FormLabel>Adresse</FormLabel>
                        <FormControl><Input {...field} name={field.name} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )} />
                    <div className="grid sm:grid-cols-3 gap-4">
                         <FormField control={form.control} name="city" render={({ field }) => (
                            <FormItem>
                            <FormLabel>Ville</FormLabel>
                            <FormControl><Input {...field} name={field.name} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="postalCode" render={({ field }) => (
                            <FormItem>
                            <FormLabel>Code Postal</FormLabel>
                            <FormControl><Input {...field} name={field.name} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )} />
                         <FormField control={form.control} name="country" render={({ field }) => (
                            <FormItem>
                            <FormLabel>Pays</FormLabel>
                            <FormControl><Input {...field} name={field.name} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                     <div className="grid sm:grid-cols-2 gap-4">
                        <FormField control={form.control} name="maritalStatus" render={({ field }) => (
                            <FormItem>
                            <FormLabel>Situation familiale</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} name={field.name}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez votre situation" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="celibataire">Célibataire</SelectItem>
                                    <SelectItem value="marie">Marié(e)</SelectItem>
                                    <SelectItem value="divorce">Divorcé(e)</SelectItem>
                                    <SelectItem value="veuf">Veuf(ve)</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="numberOfChildren" render={({ field }) => (
                            <FormItem>
                            <FormLabel>Nombre d'enfants</FormLabel>
                            <FormControl><Input type="number" {...field} name={field.name} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )} />
                     </div>
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="space-y-4">
                     <FormField control={form.control} name="occupation" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profession</FormLabel>
                        <FormControl><Input {...field} name={field.name} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <div className="grid sm:grid-cols-2 gap-4">
                        <FormField control={form.control} name="monthlyIncome" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Revenu Mensuel Net (€)</FormLabel>
                            <FormControl><Input type="number" {...field} name={field.name} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )} />
                        <FormField control={form.control} name="monthlyExpenses" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Charges Mensuelles (€)</FormLabel>
                            <FormControl><Input type="number" {...field} name={field.name} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )} />
                    </div>
                    <FormField control={form.control} name="creditScore" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Score de Crédit (estimation)</FormLabel>
                        <FormControl><Input type="number" min="300" max="850" {...field} name={field.name} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                )}
                {currentStep === 3 && (
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="identityDocument"
                            render={({ field: { onChange, value, onBlur, ref }}) => (
                            <FormItem>
                                <FormLabel>Pièce d'identité (PDF, JPG, PNG)</FormLabel>
                                <FormControl>
                                <Input type="file" onChange={(e) => onChange(e.target.files)} onBlur={onBlur} name="identityDocument" ref={ref} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="proofOfAddress"
                            render={({ field: { onChange, value, onBlur, ref }}) => (
                            <FormItem>
                                <FormLabel>Justificatif de domicile (PDF, JPG, PNG)</FormLabel>
                                <FormControl>
                                <Input type="file" onChange={(e) => onChange(e.target.files)} onBlur={onBlur} name="proofOfAddress" ref={ref} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="proofOfIncome"
                             render={({ field: { onChange, value, onBlur, ref }}) => (
                            <FormItem>
                                <FormLabel>Justificatif de revenus (PDF, JPG, PNG)</FormLabel>
                                <FormControl>
                                <Input type="file" onChange={(e) => onChange(e.target.files)} onBlur={onBlur} name="proofOfIncome" ref={ref} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                )}
                {currentStep === 4 && (
                    <div className="space-y-4 text-sm">
                        <h3 className="text-lg font-bold">Récapitulatif de votre demande</h3>
                        <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                            <p><strong>Type de prêt :</strong> {form.getValues("loanType")}</p>
                            <p><strong>Montant :</strong> {form.getValues("loanAmount")} € sur {form.getValues("loanTerm")} mois</p>
                            <hr className="my-2" />
                            <p><strong>Nom :</strong> {form.getValues("firstName")} {form.getValues("lastName")}</p>
                            <p><strong>Date de naissance :</strong> {form.getValues("birthDay")}/{form.getValues("birthMonth")}/{form.getValues("birthYear")}</p>
                            <p><strong>Email :</strong> {form.getValues("email")}</p>
                             <p><strong>Adresse :</strong> {form.getValues("address")}, {form.getValues("postalCode")} {form.getValues("city")}</p>
                            <hr className="my-2" />
                            <p><strong>Profession :</strong> {form.getValues("occupation")}</p>
                            <p><strong>Revenu mensuel :</strong> {form.getValues("monthlyIncome")} €</p>
                             <p><strong>Situation familiale :</strong> {form.getValues("maritalStatus")} ({form.getValues("numberOfChildren")} enfant(s))</p>
                            <hr className="my-2" />
                            <p><strong>Pièce d'identité :</strong> {getFileName("identityDocument")}</p>
                            <p><strong>Justificatif de domicile :</strong> {getFileName("proofOfAddress")}</p>
                            <p><strong>Justificatif de revenus :</strong> {getFileName("proofOfIncome")}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">En cliquant sur "Envoyer ma demande", vous confirmez que les informations fournies sont exactes et complètes.</p>
                    </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 0 || isLoading}>
                <ArrowLeft className="mr-2" /> Précédent
              </Button>
               {currentStep === steps.length - 1 ? (
                 <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin" /> : <Send className="ml-2" />}
                    Envoyer ma demande
                </Button>
               ) : (
                <Button type="button" onClick={nextStep}>
                    Suivant
                    <ArrowRight className="ml-2" />
                </Button>
               )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
