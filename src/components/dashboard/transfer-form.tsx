
"use client";

import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";


type TransferState = "idle" | "loading" | "success" | "error";

type TransferFormProps = {
  onTransferSubmit: (data: TransferFormInput) => Promise<{success: boolean}>;
};

export default function TransferForm({ onTransferSubmit }: TransferFormProps) {
  const [transferState, setTransferState] = useState<TransferState>("idle");
  const { toast } = useToast();

  const form = useForm<TransferFormInput>({
    resolver: zodResolver(transferFormSchema),
    defaultValues: {
      recipientIban: "",
      recipientName: "",
      recipientBankName: "",
      recipientBic: "",
      amount: "" as unknown as number,
      reason: "",
    },
  });

  async function onSubmit(values: TransferFormInput) {
    setTransferState("loading");
    
    const result = await onTransferSubmit(values);

    if (result.success) {
        setTransferState("success");
        toast({
            title: "Virement Initié",
            description: "Votre virement est en cours de traitement. Vous pouvez suivre sa progression dans le résumé du compte.",
        });
        form.reset(); // Reset form on success
    } else {
        setTransferState("error");
    }
  }
  
  // This state is just to give feedback on the form submission itself,
  // the actual progress is handled in the dashboard list.
  if (transferState === "success" || transferState === "error") {
      const handleReset = () => {
          setTransferState("idle");
          form.reset();
      }
      return (
        <div className="text-center p-8 border rounded-lg">
            {transferState === "success" && (
                 <>
                    <CheckCircle className="text-green-500 w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold">Virement initié avec succès !</h3>
                    <p className="text-muted-foreground mb-6">Vous pouvez suivre son avancement dans l'onglet "Résumé".</p>
                    <Button onClick={handleReset}>
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
                    <Button onClick={handleReset} variant="outline">
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
        <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Essayer un virement</AlertTitle>
            <AlertDescription>
            Pour tester, vous pouvez utiliser l'IBAN d'un autre client test, par exemple : <code className="font-mono p-1 bg-muted rounded-sm text-xs">DE89370400440532013000</code> (appartient à jane.doe@example.com).
            </AlertDescription>
        </Alert>
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
            name="recipientBankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de la banque du bénéficiaire</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: BNP Paribas" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
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
            <FormField
                control={form.control}
                name="recipientBic"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Code SWIFT / BIC</FormLabel>
                    <FormControl>
                    <Input placeholder="Ex: SOGEFRPP" {...field} disabled={isLoading} />
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
