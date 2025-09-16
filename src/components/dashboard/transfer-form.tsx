
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { useToast } from "@/hooks/use-toast";
import { handleTransfer, type TransferFormInput } from "@/app/actions";
import { Loader2, Send, CheckCircle, RefreshCw } from "lucide-react";
import { Progress } from "../ui/progress";

const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/;
const transferFormSchema = z.object({
  recipientIban: z.string().regex(ibanRegex, "Format de l'IBAN invalide."),
  recipientName: z.string().min(2, "Le nom du bénéficiaire est requis."),
  amount: z.coerce
    .number()
    .positive("Le montant doit être supérieur à 0.")
    .multipleOf(0.01, "Le montant ne peut avoir plus de 2 décimales."),
  reason: z.string().min(3, "Une référence est requise.").max(140, "La référence ne peut dépasser 140 caractères."),
});

type TransferState = "idle" | "loading" | "processing" | "success" | "error";

type TransferFormProps = {
  onTransferSuccess: (data: TransferFormInput) => void;
};

export default function TransferForm({ onTransferSuccess }: TransferFormProps) {
  const { toast } = useToast();
  const [transferState, setTransferState] = useState<TransferState>("idle");
  const [progress, setProgress] = useState(0);

  const form = useForm<TransferFormInput>({
    resolver: zodResolver(transferFormSchema),
    defaultValues: {
      recipientIban: "",
      recipientName: "",
      amount: undefined,
      reason: "",
    },
  });

  async function onSubmit(values: TransferFormInput) {
    setTransferState("loading");
    const result = await handleTransfer(values);
    
    if (result.success) {
      setTransferState("processing");
      
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTransferState("success");
            onTransferSuccess(values); // Notifier le composant parent
            return 100;
          }
          return prev + 10;
        });
      }, 300);

    } else {
       toast({
        title: "Échec du virement",
        description: result.error || "Un problème est survenu. Veuillez réessayer.",
        variant: "destructive",
      });
      setTransferState("error");
    }
  }

  const resetForm = () => {
    form.reset();
    setProgress(0);
    setTransferState("idle");
  }

  if (transferState === "processing" || transferState === "success") {
    return (
        <div className="text-center p-8 border rounded-lg">
            {transferState === "processing" ? (
                <>
                    <Loader2 className="animate-spin text-primary w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold">Virement en cours...</h3>
                    <p className="text-muted-foreground mb-4">Votre virement est en cours de traitement.</p>
                    <Progress value={progress} className="w-full" />
                </>
            ) : (
                 <>
                    <CheckCircle className="text-green-500 w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold">Virement Effectué !</h3>
                    <p className="text-muted-foreground mb-6">Le virement a été initié avec succès et apparaît dans votre historique.</p>
                    <Button onClick={resetForm}>
                        <RefreshCw className="mr-2" />
                        Effectuer un autre virement
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
                    <Input type="number" step="0.01" placeholder="100.00" {...field} />
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

    