
"use server";

import { z } from "zod";
import {
  assessLoanEligibility,
  type LoanEligibilityInput,
  type LoanEligibilityOutput,
} from "@/ai/flows/loan-eligibility-assessment";
import 'dotenv/config'


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
    return result;
  } catch (error) {
    console.error("Erreur dans le flux assessLoanEligibility:", error);
    return {
      error: "Une erreur inattendue est survenue lors de l'évaluation de l'éligibilité. Veuillez réessayer plus tard.",
    };
  }
}

export async function submitEligibilityContact(formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    const webhookUrl = process.env.WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("WEBHOOK_URL is not defined in environment variables.");
      return { success: false, error: "La configuration du serveur est incomplète." };
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'eligibility',
        data: data
      }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error("Webhook error response:", errorBody);
        throw new Error(`Le serveur a répondu avec le statut ${response.status}.`);
    }

    const responseData = await response.json();
    if (responseData.status !== 'success') {
      throw new Error(responseData.message || "Le webhook a renvoyé une erreur.");
    }

    return { success: true };
  } catch (error) {
    console.error("Error submitting eligibility contact:", error);
    return { success: false, error: "Impossible d'envoyer la demande de contact." };
  }
}

export async function handleLoanApplication(formData: FormData) {
  try {
      const webhookUrl = process.env.WEBHOOK_URL;
      if (!webhookUrl) {
        console.error("WEBHOOK_URL is not defined in environment variables.");
        return { success: false, error: "La configuration du serveur est incomplète." };
      }

      const dataForWebhook: {[key: string]: any} = {};
      const applicationId = `APP-${Date.now()}`;

      for (const [key, value] of formData.entries()) {
          if (value instanceof File && value.size > 0) {
              const buffer = Buffer.from(await value.arrayBuffer());
              dataForWebhook[key] = {
                  fileName: value.name,
                  mimeType: value.type,
                  content: buffer.toString('base64'),
              };
          } else {
              dataForWebhook[key] = value;
          }
      }
      
      const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              type: 'loanApplication',
              data: {
                applicationId: applicationId,
                ...dataForWebhook,
              }
          }),
      });
      
      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Webhook error response:", errorBody);
        throw new Error(`Le serveur du webhook a répondu avec une erreur: ${response.status}`);
      }

      const responseData = await response.json();
      if (responseData.status !== 'success') {
        throw new Error(responseData.message || "Le webhook a renvoyé une erreur.");
      }

      return { success: true, applicationId };

  } catch (error) {
      console.error("Error processing loan application:", error);
      return { success: false, error: "La soumission a échoué. Veuillez réessayer." };
  }
}

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit comporter au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
  message: z.string().min(10, { message: "Le message doit comporter au moins 10 caractères." }),
});


export async function handleContactForm(formData: z.infer<typeof contactFormSchema>) {
    const parsed = contactFormSchema.safeParse(formData);
    if (!parsed.success) {
      return { success: false, error: 'Données invalides.' };
    }
    
    try {
        const webhookUrl = process.env.WEBHOOK_URL;
        if (!webhookUrl) {
            console.error("WEBHOOK_URL is not defined in environment variables.");
            return { success: false, error: "La configuration du serveur est incomplète." };
        }

       const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'contact',
            data: parsed.data
          }),
       });

       if (!response.ok) {
          const errorBody = await response.text();
          console.error("Webhook error response:", errorBody);
          throw new Error(`Le serveur du webhook a répondu avec une erreur: ${response.status}`);
       }

        const responseData = await response.json();
        if (responseData.status !== 'success') {
          throw new Error(responseData.message || "Le webhook a renvoyé une erreur.");
        }

        return { success: true };

    } catch (error) {
        console.error("Error sending contact form:", error);
        return { success: false, error: "Impossible d'envoyer le message." };
    }
}
