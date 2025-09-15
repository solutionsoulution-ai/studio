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
import { Loader2, Send } from "lucide-react";
import { Textarea } from "../ui/textarea";

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

export default function TransferForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    const result = await handleTransfer(values);
    setIsLoading(false);

    if (result.success) {
      toast({
        title: "Virement envoyé !",
        description: `Le virement de ${values.amount}€ à ${values.recipientName} a été initié.`,
        variant: "default",
      });
      form.reset();
    } else {
       toast({
        title: "Échec du virement",
        description: result.error || "Un problème est survenu. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  }

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
                    <Input type="number" step="0.01" placeholder="100.00" {...field} disabled={isLoading} />
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
