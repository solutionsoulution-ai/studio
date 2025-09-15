
"use client";

import { useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";

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
import { useToast } from "@/hooks/use-toast";
import { handleLoanApplication } from "@/app/actions";
import { Loader2, ArrowRight, ArrowLeft, Send, CheckCircle, FileText, User, Banknote, Home } from "lucide-react";

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
});

const step3Schema = z.object({
  occupation: z.string().min(2, "La profession est requise."),
  monthlyIncome: z.coerce.number().positive("Le revenu doit être positif."),
  monthlyExpenses: z.coerce.number().nonnegative("Les charges ne peuvent être négatives."),
  creditScore: z.coerce.number().min(300).max(850, "Le score de crédit doit être entre 300 et 850."),
});


// Schéma complet pour la soumission finale
const fullLoanSchema = step1Schema.merge(step2Schema).merge(step3Schema);
type FullLoanFormValues = z.infer<typeof fullLoanSchema>;

const steps = [
  { id: "Étape 1", name: "Informations sur le Prêt", schema: step1Schema, icon: FileText },
  { id: "Étape 2", name: "Coordonnées et Adresse", schema: step2Schema, icon: User },
  { id: "Étape 3", name: "Situation Financière", schema: step3Schema, icon: Banknote },
  { id: "Étape 4", name: "Confirmation", icon: CheckCircle },
];

export default function MultiStepLoanForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FullLoanFormValues>({
    resolver: zodResolver(fullLoanSchema),
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
      occupation: "",
      monthlyIncome: 3000,
      monthlyExpenses: 1000,
      creditScore: 700,
    },
  });

  const processForm = async (data: FieldValues) => {
    setIsLoading(true);
    if (currentStep < steps.length - 2) { 
        setCurrentStep(currentStep + 1);
    } else {
        try {
            const result = await handleLoanApplication(data as FullLoanFormValues);
            if (result.success) {
                setIsSubmitted(true);
                setCurrentStep(currentStep + 1); 
            } else {
                toast({
                    title: "Erreur lors de la soumission",
                    description: result.error || "Un problème est survenu.",
                    variant: "destructive",
                });
            }
        } catch (error) {
             toast({
                title: "Erreur inattendue",
                description: "Impossible de traiter votre demande.",
                variant: "destructive",
            });
        }
    }
    setIsLoading(false);
  };
  
  const nextStep = async () => {
    const currentSchema = steps[currentStep].schema;
    if (currentSchema) {
        const result = await form.trigger(Object.keys(currentSchema.shape) as any);
        if (result) {
           setCurrentStep(currentStep + 1);
        }
    } else {
        // For the last step (recap)
       setCurrentStep(currentStep + 1);
    }
  };


  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const progress = ((currentStep + 1) / steps.length) * 100;

  if (isSubmitted) {
    return (
        <Card className="shadow-lg">
            <CardContent className="p-8 text-center">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}>
                    <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Demande Envoyée !</h2>
                    <p className="text-muted-foreground">
                        Merci. Votre demande de prêt a été soumise avec succès. Un conseiller vous contactera très prochainement pour discuter des prochaines étapes.
                    </p>
                    <Button onClick={() => window.location.reload()} className="mt-6">Faire une nouvelle demande</Button>
                </motion.div>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6 md:p-8">
        <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-primary">{steps[currentStep].id} / {steps.length - 1}</span>
                <span className="text-sm text-muted-foreground">{steps[currentStep].name}</span>
            </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(processForm)} className="space-y-6">
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
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                        <FormControl><Input type="number" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="loanTerm" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Durée de remboursement (mois)</FormLabel>
                        <FormControl><Input type="number" {...field} /></FormControl>
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
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )} />
                        <FormField control={form.control} name="lastName" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl><Input type="email" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )} />
                        <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl><Input type="tel" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )} />
                    </div>
                     <FormField control={form.control} name="address" render={({ field }) => (
                        <FormItem>
                        <FormLabel>Adresse</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )} />
                    <div className="grid sm:grid-cols-3 gap-4">
                         <FormField control={form.control} name="city" render={({ field }) => (
                            <FormItem>
                            <FormLabel>Ville</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="postalCode" render={({ field }) => (
                            <FormItem>
                            <FormLabel>Code Postal</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )} />
                         <FormField control={form.control} name="country" render={({ field }) => (
                            <FormItem>
                            <FormLabel>Pays</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                     <FormField control={form.control} name="maritalStatus" render={({ field }) => (
                        <FormItem>
                        <FormLabel>Situation familiale</FormLabel>
                         <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="space-y-4">
                     <FormField control={form.control} name="occupation" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profession</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <div className="grid sm:grid-cols-2 gap-4">
                        <FormField control={form.control} name="monthlyIncome" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Revenu Mensuel Net (€)</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )} />
                        <FormField control={form.control} name="monthlyExpenses" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Charges Mensuelles (€)</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )} />
                    </div>
                    <FormField control={form.control} name="creditScore" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Score de Crédit (estimation)</FormLabel>
                        <FormControl><Input type="number" min="300" max="850" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                )}
                {currentStep === 3 && (
                    <div className="space-y-4 text-sm">
                        <h3 className="text-lg font-bold">Récapitulatif de votre demande</h3>
                        <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                            <p><strong>Type de prêt :</strong> {form.getValues("loanType")}</p>
                            <p><strong>Montant :</strong> {form.getValues("loanAmount")} € sur {form.getValues("loanTerm")} mois</p>
                            <hr className="my-2" />
                            <p><strong>Nom :</strong> {form.getValues("firstName")} {form.getValues("lastName")}</p>
                             <p><strong>Adresse :</strong> {form.getValues("address")}, {form.getValues("postalCode")} {form.getValues("city")}</p>
                            <hr className="my-2" />
                            <p><strong>Profession :</strong> {form.getValues("occupation")}</p>
                            <p><strong>Revenu mensuel :</strong> {form.getValues("monthlyIncome")} €</p>
                        </div>
                        <p className="text-xs text-muted-foreground">En cliquant sur "Envoyer ma demande", vous confirmez que les informations fournies sont exactes et complètes.</p>
                    </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 0 || isLoading}>
                <ArrowLeft /> Précédent
              </Button>
               {currentStep === steps.length - 1 ? (
                 <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="animate-spin" />}
                    Envoyer ma demande
                    <Send />
                </Button>
               ) : (
                <Button type="button" onClick={nextStep} disabled={isLoading}>
                    {isLoading && <Loader2 className="animate-spin" />}
                    Suivant
                    <ArrowRight />
                </Button>
               )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

    