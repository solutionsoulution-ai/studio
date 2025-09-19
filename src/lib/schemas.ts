import { z } from 'zod';

// Schéma pour la validation du formulaire de virement
export const transferFormSchema = z.object({
  recipientIban: z.string()
    .min(15, "L'IBAN doit comporter au moins 15 caractères.")
    .max(34, "L'IBAN ne peut pas dépasser 34 caractères.")
    .regex(/^[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}$/, "Le format de l'IBAN est invalide."),
  recipientName: z.string().min(2, "Le nom du bénéficiaire est requis."),
  recipientBankName: z.string().min(3, "Le nom de la banque est requis."),
  recipientBic: z.string()
    .min(8, "Le code SWIFT/BIC doit comporter au moins 8 caractères.")
    .max(11, "Le code SWIFT/BIC ne peut pas dépasser 11 caractères.")
    .regex(/^[A-Z0-9]{8,11}$/, "Le format du code SWIFT/BIC est invalide."),
  amount: z.coerce.number().positive("Le montant doit être positif."),
  reason: z.string().min(2, "Le motif est requis."),
});

export type TransferFormInput = z.infer<typeof transferFormSchema>;
