import { z } from 'zod';

// Schéma pour la validation du formulaire de virement
export const transferFormSchema = z.object({
  recipientIban: z.string().min(1, "L'IBAN est requis."),
  recipientName: z.string().min(2, "Le nom du bénéficiaire est requis."),
  amount: z.coerce.number().positive("Le montant doit être positif."),
  reason: z.string().min(2, "Le motif est requis."),
});

export type TransferFormInput = z.infer<typeof transferFormSchema>;
