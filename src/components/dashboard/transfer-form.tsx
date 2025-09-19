
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { transferFormSchema, type TransferFormInput } from "@/lib/schemas";
import { Loader2, Send, CheckCircle, RefreshCw, AlertTriangle } from "lucide-react";
import { Progress } from "../ui/progress";


type TransferState = "idle" | "loading" | "processing" | "success" | "error";

type ProcessingTime = {
    days?: number;
    hours?: number;
    minutes?: number;
}

type TransferFormProps = {
  onTransferSubmit: (data: TransferFormInput) => Promise<{success: boolean}>;
  processingTimeConfig?: ProcessingTime;
};

export default function TransferForm({ onTransferSubmit, processingTimeConfig }: TransferFormProps) {
  const [transferState, setTransferState] = useState<TransferState>("idle");
  const [progress, setProgress] = useState(0);

  const form = useForm<TransferFormInput>({
    resolver: zodResolver(transferFormSchema),
    defaultValues: {
      recipientIban: "",
      recipientName: "",
      amount: "" as unknown as number,
      reason: "",
    },
  });
  
  // Effect to manage the progress bar interval
  useEffect(() => {
    if (transferState !== 'processing') {
      return;
    }

    const getTotalProcessingTimeInMillis = () => {
        const { days = 0, hours = 0, minutes = 0 } = processingTimeConfig || {};
        const totalMinutes = (days * 24 * 60) + (hours * 60) + minutes;
        return (totalMinutes > 0 ? totalMinutes : 1) * 60 * 1000;
    };

    const totalTime = getTotalProcessingTimeInMillis();
    const startTime = Date.now();
    setProgress(0);

    const interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const currentProgress = Math.min((elapsedTime / totalTime) * 100, 100);
        setProgress(currentProgress);

        if (currentProgress >= 100) {
            clearInterval(interval);
            setTransferState("success");
        }
    }, 100); // Update every 100ms for a smooth effect

    return () => clearInterval(interval); // Cleanup on component unmount or state change
  }, [transferState, processingTimeConfig]);


  async function onSubmit(values: TransferFormInput) {
    setTransferState("loading");
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = await onTransferSubmit(values);

    if (!result.success) {
        setTransferState("error");
        return;
    }
    
    // The useEffect will trigger the 'processing' state logic
    setTransferState("processing");
  }

  const resetForm = () => {
    form.reset();
    setProgress(0);
    setTransferState("idle");
  }

  if (transferState === "processing" || transferState === "success" || transferState === "error") {
    return (
        <div className="text-center p-8 border rounded-lg">
            {transferState === "processing" && (
                <>
                    <Loader2 className="animate-spin text-primary w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold">Virement en cours de traitement...</h3>
                    <p className="text-muted-foreground mb-4">Votre virement sera finalisé une fois le traitement terminé.</p>
                    <Progress value={progress} className="w-full" />
                </>
            )}
            {transferState === "success" && (
                 <>
                    <CheckCircle className="text-green-500 w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold">Traitement Terminé !</h3>
                    <p className="text-muted-foreground mb-6">Le statut final du virement est maintenant visible dans votre historique.</p>
                    <Button onClick={resetForm}>
                        <RefreshCw className="mr-2" />
                        Effectuer un autre virement
                    </Button>
                </>
            )}
             {transferState === "error" && (
                 <>
                    <AlertTriangle className="text-destructive w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold">Le Virement a Échoué</h3>
                    <p className="text-muted-foreground mb-6">Impossible de traiter votre demande. Veuillez vérifier les informations ou le solde de votre compte.</p>
                    <Button onClick={resetForm} variant="outline">
                        <RefreshCw className="mr-2" />
                        Réessayer
                    </Button>
                </>
            )}
        </div>
    )
  }

  const isLoading = transferState === "loading";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="recipientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom du bénéficiaire</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="recipientIban"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IBAN du bénéficiaire</FormLabel>
                <FormControl>
                  <Input placeholder="FR76..." {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Montant</FormLabel>
                    <FormControl>
                    <Input type="number" step="0.01" placeholder="100.00" {...field} onChange={event => field.onChange(+event.target.value)} disabled={isLoading}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Référence / Motif</FormLabel>
                    <FormControl>
                    <Input placeholder="Facture #123" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
           {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Send />
          )}
          Effectuer le virement
        </Button>
      </form>
    </Form>
  );
}
