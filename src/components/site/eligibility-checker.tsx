
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { submitEligibilityContact } from "@/app/actions";
import { Loader2, Sparkles, TrendingUp, TrendingDown, BadgeCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  annualRevenue: z.coerce
    .number({ required_error: "Le revenu annuel est requis." })
    .positive("Le revenu annuel doit être un nombre positif."),
  creditScore: z.coerce
    .number({ required_error: "Le score de crédit est requis." })
    .min(300, "Le score de crédit doit être d'au moins 300.")
    .max(850, "Le score de crédit ne peut pas dépasser 850."),
  yearsInBusiness: z.coerce
    .number({ required_error: "Le nombre d'années d'activité est requis." })
    .min(0, "Le nombre d'années d'activité ne peut pas être négatif."),
  loanAmountRequested: z.coerce
    .number({ required_error: "Le montant du prêt est requis." })
    .positive("Le montant du prêt doit être un nombre positif."),
  reasonForLoan: z
    .string({ required_error: "La raison du prêt est requise." })
    .min(10, "Veuillez fournir une raison plus détaillée (au moins 10 caractères)."),
});

type FormValues = z.infer<typeof formSchema>;

// Simplified mock result type
type MockEligibilityResult = {
  eligibilityStatus: string;
  confidenceScore: number;
}

const getMockResult = (data: FormValues): MockEligibilityResult => {
    let score = 0;
    if (data.annualRevenue > 100000) score += 30;
    if (data.creditScore > 700) score += 30;
    if (data.yearsInBusiness > 3) score += 20;
    if (data.loanAmountRequested < data.annualRevenue / 2) score += 20;

    if (score > 80) return { eligibilityStatus: "Hautement Éligible. Vous avez d'excellentes chances d'approbation.", confidenceScore: 0.95 };
    if (score > 50) return { eligibilityStatus: "Éligible. Votre profil est intéressant, des vérifications supplémentaires sont nécessaires.", confidenceScore: 0.75 };
    if (score > 20) return { eligibilityStatus: "Faible Éligibilité. Votre dossier présente des risques. Améliorez votre revenu ou score de crédit.", confidenceScore: 0.40 };
    return { eligibilityStatus: "Inéligible. Votre profil ne correspond pas à nos critères actuels.", confidenceScore: 0.90 };
}


const ResultCard = ({ result, formData }: { result: MockEligibilityResult, formData: FormValues | null }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!formData) return null;

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true);
      const formElement = event.currentTarget;
      const contactFormData = new FormData(formElement);

      // Append result data to the form
      contactFormData.set('Statut d\'éligibilité (IA)', result.eligibilityStatus);
      contactFormData.set('Score de confiance (IA)', String(result.confidenceScore));

      const res = await submitEligibilityContact(contactFormData);
      setIsSubmitting(false);

      if (res.success) {
          toast({
            title: "Demande de contact envoyée !",
            description: "Un conseiller va prendre connaissance de votre dossier et vous recontacter.",
          });
          router.push('/demande-de-pret/merci');
      } else {
           toast({
            title: "Erreur",
            description: res.error || "L'envoi de votre demande a échoué.",
            variant: "destructive"
          });
      }
  }

  const { eligibilityStatus, confidenceScore } = result;
  const isEligible = eligibilityStatus.toLowerCase().includes("eligible") || eligibilityStatus.toLowerCase().includes("éligible");
  const isHighlyEligible = eligibilityStatus.toLowerCase().includes("highly") || eligibilityStatus.toLowerCase().includes("hautement");

  const getStatusIcon = () => {
    if (isHighlyEligible) return <BadgeCheck className="h-10 w-10 text-green-500" />;
    if (isEligible) return <TrendingUp className="h-10 w-10 text-yellow-500" />;
    return <TrendingDown className="h-10 w-10 text-red-500" />;
  };

  return (
    <Card className="border-primary/20 shadow-lg">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">{getStatusIcon()}</div>
        <CardTitle className="text-2xl font-bold">{eligibilityStatus.split('.')[0]}</CardTitle>
        <CardDescription>Basé sur notre évaluation.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1 text-sm font-medium">
            <span>Score de confiance</span>
            <span>{(confidenceScore * 100).toFixed(0)}%</span>
          </div>
          <Progress value={confidenceScore * 100} className={cn(
            isHighlyEligible && "[&>div]:bg-green-500",
            isEligible && !isHighlyEligible && "[&>div]:bg-yellow-500",
            !isEligible && "[&>div]:bg-red-500",
          )} />
        </div>
        <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
            <p className="font-semibold text-foreground mb-2">Analyse :</p>
            <p>{eligibilityStatus.substring(eligibilityStatus.indexOf('.') + 1).trim()}</p>
        </div>
        <form onSubmit={handleContactSubmit}>
            {/* These hidden inputs carry the original form data for the webhook */}
            <input type="hidden" name="Revenu Annuel" value={formData.annualRevenue} />
            <input type="hidden" name="Score de Crédit" value={formData.creditScore} />
            <input type="hidden" name="Années d'activité" value={formData.yearsInBusiness} />
            <input type="hidden" name="Montant demandé" value={formData.loanAmountRequested} />
            <input type="hidden" name="Raison" value={formData.reasonForLoan} />
            
            <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Soumettre et contacter un conseiller
            </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default function EligibilityChecker() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<MockEligibilityResult | null>(null);
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      annualRevenue: undefined,
      creditScore: undefined,
      yearsInBusiness: undefined,
      loanAmountRequested: undefined,
      reasonForLoan: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setResult(null);
    setSubmittedData(values);
    
    // Simulate a short delay for a better user experience
    setTimeout(() => {
      const mockResult = getMockResult(values);
      setResult(mockResult);
      setIsLoading(false);
    }, 1500);
  }
  
  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight font-headline">Vérificateur d'Éligibilité au Prêt</h2>
        </div>
        <p className="text-muted-foreground text-lg">
          Remplissez le formulaire avec les détails de votre entreprise pour obtenir une évaluation instantanée de votre éligibilité au prêt et des suggestions personnalisées.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="annualRevenue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Revenu Annuel (€)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="ex: 250000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="creditScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Score de Crédit</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="300-850" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="yearsInBusiness"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Années d'Activité</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="ex: 3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="loanAmountRequested"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Montant du Prêt Demandé (€)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="ex: 50000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="reasonForLoan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Raison du Prêt</FormLabel>
                  <FormControl>
                    <Textarea placeholder="ex: Pour étendre nos opérations, acheter de nouveaux équipements..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Expliquez brièvement pourquoi vous demandez ce prêt.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Évaluer l'éligibilité
            </Button>
          </form>
        </Form>
      </div>

      <div className="mt-8 md:mt-0">
        <Card className="bg-card/70 sticky top-24">
          <CardHeader>
            <CardTitle>Votre Évaluation</CardTitle>
            <CardDescription>
              {isLoading
                ? "Analyse de vos données..."
                : "Vos résultats d'éligibilité apparaîtront ici."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex flex-col items-center justify-center space-y-4 p-8 text-muted-foreground">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="font-medium">Analyse en cours...</p>
              </div>
            )}
            {result && <ResultCard result={result} formData={submittedData} />}
            {!isLoading && !result && (
              <div className="flex flex-col items-center justify-center space-y-4 p-8 text-muted-foreground">
                <Sparkles className="h-12 w-12" />
                <p className="text-center font-medium">Prêt quand vous l'êtes !</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
