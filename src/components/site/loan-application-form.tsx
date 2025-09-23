
"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Send, FileText, User, Banknote, UploadCloud, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { submitLoanApplication } from "@/app/actions";


// Limite de taille de fichier à 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024; 
// Types de fichiers autorisés
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];


const loanApplicationSchema = z.object({
  // Step 1
  loanType: z.enum(["immobilier", "personnel", "auto", "entreprise", "rachat"], { required_error: "Veuillez sélectionner un type de prêt." }),
  loanAmount: z.coerce.number({invalid_type_error: "Le montant est requis."}).positive("Le montant doit être positif."),
  loanTerm: z.coerce.number({invalid_type_error: "La durée est requise."}).int().min(12, "La durée doit être d'au moins 12 mois.").max(360, "La durée ne peut excéder 360 mois."),
  
  // Step 2
  firstName: z.string().min(2, "Le prénom est requis."),
  lastName: z.string().min(2, "Le nom est requis."),
  email: z.string().email("L'adresse e-mail est invalide."),
  phone: z.string().min(10, "Le numéro de téléphone est invalide."),
  address: z.string().min(5, "L'adresse est requise."),
  city: z.string().min(2, "La ville est requise."),
  postalCode: z.string().min(4, "Le code postal est requis."),
  country: z.string().min(2, "Le pays est requis."),
  maritalStatus: z.enum(["celibataire", "marie", "divorce", "veuf"], { required_error: "Veuillez sélectionner votre situation." }),
  numberOfChildren: z.coerce.number({invalid_type_error: "Le nombre d'enfants est requis."}).int().min(0, "Le nombre d'enfants ne peut être négatif."),
  birthDay: z.coerce.number({invalid_type_error: "Le jour est requis."}).int().min(1, "Le jour doit être valide.").max(31),
  birthMonth: z.coerce.number({invalid_type_error: "Le mois est requis."}).int().min(1, "Le mois doit être valide.").max(12),
  birthYear: z.coerce.number({invalid_type_error: "L'année est requise."}).int().min(1900, "L'année doit être valide.").max(new Date().getFullYear() - 18, "Vous devez avoir au moins 18 ans."),
  
  // Step 3
  occupation: z.string().min(2, "La profession est requise."),
  monthlyIncome: z.coerce.number({invalid_type_error: "Le revenu est requis."}).positive("Le revenu doit être positif."),
  monthlyExpenses: z.coerce.number({invalid_type_error: "Les charges sont requises."}).nonnegative("Les charges ne peuvent être négatives."),
  
  // Step 4
  identityDocument: z.any(),
  proofOfAddress: z.any(),
  proofOfIncome: z.any(),
}).refine(data => {
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


type LoanApplicationFormValues = z.infer<typeof loanApplicationSchema>;

const FIXED_INTEREST_RATE = 2;

export default function LoanApplicationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<LoanApplicationFormValues>({
    resolver: zodResolver(loanApplicationSchema),
    mode: "onBlur",
    defaultValues: {
      loanType: undefined,
      loanAmount: '' as unknown as number,
      loanTerm: '' as unknown as number,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "France",
      maritalStatus: undefined,
      numberOfChildren: '' as unknown as number,
      birthDay: '' as unknown as number,
      birthMonth: '' as unknown as number,
      birthYear: '' as unknown as number,
      occupation: "",
      monthlyIncome: '' as unknown as number,
      monthlyExpenses: '' as unknown as number,
      identityDocument: undefined,
      proofOfAddress: undefined,
      proofOfIncome: undefined,
    },
  });

  const watchedAmount = form.watch("loanAmount");
  const watchedTerm = form.watch("loanTerm");

  const monthlyPayment = useMemo(() => {
    const loanAmount = Number(watchedAmount);
    const loanTerm = Number(watchedTerm);
    if (loanAmount <= 0 || FIXED_INTEREST_RATE <= 0 || loanTerm <= 0) {
      return 0;
    }
    const monthlyRate = FIXED_INTEREST_RATE / 100 / 12;
    const numberOfPayments = loanTerm;
    const payment =
      loanAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    return payment;
  }, [watchedAmount, watchedTerm]);


  async function onSubmit(data: LoanApplicationFormValues) {
    setIsLoading(true);
    const formData = new FormData();
    
    // Append all fields to FormData
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'identityDocument' || key === 'proofOfAddress' || key === 'proofOfIncome') {
        if (value && value[0]) {
          formData.append(key, value[0]);
        }
      } else {
        formData.append(key, String(value));
      }
    });

    try {
        await submitLoanApplication(formData);
        router.push(`/demande-de-pret/merci`);
    } catch (error) {
        console.error(error);
        toast({
            title: "Erreur",
            description: "Une erreur est survenue lors de la soumission de votre demande. Veuillez réessayer.",
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        {/* Section 1: Informations sur le Prêt */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileText />Informations sur le Prêt</CardTitle>
            <CardDescription>Décrivez le financement dont vous avez besoin.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="loanType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de Prêt</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Sélectionnez le type de projet" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="immobilier">Prêt Immobilier</SelectItem>
                      <SelectItem value="personnel">Prêt Personnel</SelectItem>
                      <SelectItem value="auto">Prêt Auto</SelectItem>
                      <SelectItem value="entreprise">Prêt Entreprise</SelectItem>
                      <SelectItem value="rachat">Rachat de Crédit</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="loanAmount" render={({ field }) => (
                <FormItem>
                  <FormLabel>Montant souhaité (€)</FormLabel>
                  <FormControl><Input type="number" placeholder="ex: 50000" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="loanTerm" render={({ field }) => (
                <FormItem>
                  <FormLabel>Durée de remboursement (mois)</FormLabel>
                  <FormControl><Input type="number" placeholder="ex: 120" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            {monthlyPayment > 0 && (
                <div className="bg-primary/10 text-primary p-4 rounded-md mt-4">
                    <div className="flex items-center gap-3">
                        <Calculator className="w-6 h-6" />
                        <div>
                            <p className="text-sm font-semibold">Mensualité Estimée (à 2% fixe)</p>
                            <p className="text-2xl font-bold">
                                {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(monthlyPayment)} / mois
                            </p>
                        </div>
                    </div>
                </div>
            )}
          </CardContent>
        </Card>

        {/* Section 2: Informations Personnelles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><User />Informations Personnelles</CardTitle>
            <CardDescription>Aidez-nous à mieux vous connaître.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="firstName" render={({ field }) => (<FormItem><FormLabel>Prénom</FormLabel><FormControl><Input placeholder="Jean" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="lastName" render={({ field }) => (<FormItem><FormLabel>Nom</FormLabel><FormControl><Input placeholder="Dupont" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="vous@exemple.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Numéro WhatsApp</FormLabel><FormControl><Input type="tel" placeholder="0612345678" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
            <div>
              <FormLabel>Date de naissance</FormLabel>
              <div className="grid grid-cols-3 gap-2">
                <FormField control={form.control} name="birthDay" render={({ field }) => (<FormItem><FormControl><Input type="number" placeholder="Jour" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="birthMonth" render={({ field }) => (<FormItem><FormControl><Input type="number" placeholder="Mois" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="birthYear" render={({ field }) => (<FormItem><FormControl><Input type="number" placeholder="Année" {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
               {form.formState.errors.birthDay && !form.formState.errors.birthDay.ref?.value && <p className="text-sm font-medium text-destructive">{form.formState.errors.birthDay.message}</p>}
            </div>
            <FormField control={form.control} name="address" render={({ field }) => (<FormItem><FormLabel>Adresse</FormLabel><FormControl><Input placeholder="123 rue de Paris" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <div className="grid sm:grid-cols-3 gap-4">
              <FormField control={form.control} name="city" render={({ field }) => (<FormItem><FormLabel>Ville</FormLabel><FormControl><Input placeholder="Paris" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="postalCode" render={({ field }) => (<FormItem><FormLabel>Code Postal</FormLabel><FormControl><Input placeholder="75001" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="country" render={({ field }) => (<FormItem><FormLabel>Pays</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="maritalStatus" render={({ field }) => (
                <FormItem>
                  <FormLabel>Situation familiale</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Sélectionnez..." /></SelectTrigger></FormControl>
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
              <FormField control={form.control} name="numberOfChildren" render={({ field }) => (<FormItem><FormLabel>Nombre d'enfants</FormLabel><FormControl><Input type="number" placeholder="0" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Situation Financière */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Banknote />Situation Financière</CardTitle>
            <CardDescription>Informations sur vos revenus et charges.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField control={form.control} name="occupation" render={({ field }) => (<FormItem><FormLabel>Profession</FormLabel><FormControl><Input placeholder="Développeur, médecin, etc." {...field} /></FormControl><FormMessage /></FormItem>)} />
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="monthlyIncome" render={({ field }) => (<FormItem><FormLabel>Revenu Mensuel Net (€)</FormLabel><FormControl><Input type="number" placeholder="3000" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="monthlyExpenses" render={({ field }) => (<FormItem><FormLabel>Charges Mensuelles (€)</FormLabel><FormControl><Input type="number" placeholder="1200" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><UploadCloud />Documents</CardTitle>
            <CardDescription>Téléchargez les documents requis (max 5Mo par fichier).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="identityDocument"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pièce d'identité (PDF, JPG, PNG)</FormLabel>
                  <FormControl><Input type="file" onChange={(e) => field.onChange(e.target.files)} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="proofOfAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Justificatif de domicile de moins de 3 mois</FormLabel>
                  <FormControl><Input type="file" onChange={(e) => field.onChange(e.target.files)} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="proofOfIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Justificatif de revenus (3 derniers bulletins)</FormLabel>
                  <FormControl><Input type="file" onChange={(e) => field.onChange(e.target.files)} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground text-center">En cliquant sur "Envoyer ma demande", vous confirmez que les informations fournies sont exactes et complètes, et vous acceptez nos conditions générales et notre politique de confidentialité.</p>
        
        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
          Envoyer ma demande
        </Button>
      </form>
    </Form>
  );
}
