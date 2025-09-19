
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { handleEligibilityCheck } from "@/app/actions";
import type { EligibilityCheckResult } from "@/app/actions";
import { Loader2, Sparkles, TrendingUp, TrendingDown, BadgeCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

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

const ResultCard = ({ result, formData }: { result: EligibilityCheckResult, formData: FormValues | null }) => {
  if ("error" in result) {
    return (
      <Card className="bg-destructive/10 border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Une erreur est survenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{result.error}</p>
        </CardContent>
      </Card>
    );
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
        {!isHighlyEligible && (
          <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
            <p className="font-semibold text-foreground mb-2">Suggestions d'amélioration :</p>
            <p>{eligibilityStatus.substring(eligibilityStatus.indexOf('.') + 1).trim()}</p>
          </div>
        )}
        <form action="https://formsubmit.co/contact@vylscapital.com" method="POST">
             {/* Formsubmit.co settings */}
            <input type="hidden" name="_next" value="https://vylscapital-demo.web.app/demande-de-pret/merci" />
            <input type="hidden" name="_subject" value="Nouvelle Demande d'Éligibilité" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            
            {/* Form data */}
            <input type="hidden" name="Type de demande" value="Éligibilité" />
            <input type="hidden" name="Revenu Annuel" value={formData?.annualRevenue} />
            <input type="hidden" name="Score de Crédit" value={formData?.creditScore} />
            <input type="hidden" name="Années d'activité" value={formData?.yearsInBusiness} />
            <input type="hidden" name="Montant demandé" value={formData?.loanAmountRequested} />
            <input type="hidden" name="Raison" value={formData?.reasonForLoan} />
            
             {/* AI Result */}
            <input type="hidden" name="Statut d'éligibilité (IA)" value={result.eligibilityStatus} />
            <input type="hidden" name="Score de confiance (IA)" value={result.confidenceScore} />

            <Button type="submit" className="w-full mt-4">Soumettre ces informations</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default function EligibilityChecker() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EligibilityCheckResult | null>(null);
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
    try {
      const res = await handleEligibilityCheck(values);
      setResult(res);
    } catch (e) {
      setResult({ error: "Échec du traitement de la demande." });
    } finally {
      setIsLoading(false);
    }
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
