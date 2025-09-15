"use server";

import {
  assessLoanEligibility,
  type LoanEligibilityInput,
  type LoanEligibilityOutput,
} from "@/ai/flows/loan-eligibility-assessment";
import { z } from "zod";

// Schema for Loan Eligibility
const loanEligibilityFormSchema = z.object({
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

export type EligibilityCheckResult = LoanEligibilityOutput | { error: string };

export async function handleEligibilityCheck(
  formData: LoanEligibilityInput
): Promise<EligibilityCheckResult> {
  const parsed = loanEligibilityFormSchema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => i.message).join(", ");
    return { error: `Données du formulaire invalides: ${issues}` };
  }

  try {
    const result = await assessLoanEligibility(parsed.data);

    if (process.env.WEBHOOK_URL) {
      try {
        await fetch(process.env.WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formData: parsed.data,
            eligibilityResult: result,
          }),
        });
      } catch (webhookError) {
        console.error("Erreur lors de l'envoi des données au webhook de prêt:", webhookError);
      }
    }

    return result;
  } catch (error) {
    console.error("Erreur dans le flux assessLoanEligibility:", error);
    return {
      error: "Une erreur inattendue est survenue lors de l'évaluation de l'éligibilité. Veuillez réessayer plus tard.",
    };
  }
}


// Schema for Contact Form
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit comporter au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
  message: z.string().min(10, { message: "Le message doit comporter au moins 10 caractères." }),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type ContactFormResult = { success: boolean; error?: string };

export async function handleContactForm(
  formData: ContactFormInput
): Promise<ContactFormResult> {
  const parsed = contactFormSchema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => i.message).join(", ");
    return { success: false, error: `Données du formulaire invalides: ${issues}` };
  }
  
  if (process.env.CONTACT_WEBHOOK_URL) {
    try {
      await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });
    } catch (webhookError) {
      console.error("Erreur lors de l'envoi des données au webhook de contact:", webhookError);
      // We don't return an error to the client here, just log it. 
      // The main goal is to show the user their message was "sent".
    }
  } else {
    // Log to console if no webhook is configured, so data is not lost.
    console.log("Formulaire de contact soumis (aucun webhook configuré):", parsed.data);
  }

  // Assume success if it passes validation and the attempt to send is made.
  return { success: true };
}
