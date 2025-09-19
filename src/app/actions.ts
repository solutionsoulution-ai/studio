




"use server";

import "dotenv/config";
import { z } from "zod";
import {
  assessLoanEligibility,
  type LoanEligibilityInput,
  type LoanEligibilityOutput,
} from "@/ai/flows/loan-eligibility-assessment";


const WEBHOOK_URL = process.env.WEBHOOK_URL || "";

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

    // Envoi des données au webhook si l'URL est configurée
    if (WEBHOOK_URL) {
      try {
        const response = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formType: 'eligibility',
            formData: parsed.data,
            eligibilityResult: result,
          }),
        });
        if (!response.ok) {
            const errorBody = await response.text();
            console.error("Erreur de réponse du webhook d'éligibilité:", errorBody);
        }
      } catch (webhookError) {
        console.error("Erreur lors de l'envoi des données au webhook d'éligibilité:", webhookError);
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
  
  if (WEBHOOK_URL) {
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({formType: 'contact', ...parsed.data}),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({ message: response.statusText }));
        console.error("Erreur de réponse du webhook de contact:", errorBody);
        return { success: false, error: `Le serveur a retourné une erreur: ${errorBody.message || response.statusText}` };
      }

    } catch (webhookError: any) {
      console.error("Erreur lors de l'envoi des données au webhook de contact:", webhookError);
      return { success: false, error: `Impossible de contacter le serveur webhook. ${webhookError.message}` };
    }
  } else {
    console.log("Formulaire de contact soumis (aucun webhook configuré):", parsed.data);
  }

  return { success: true };
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];


// Schéma pour la validation côté serveur
const loanApplicationSchemaServer = z.object({
  loanType: z.enum(["immobilier", "consommation", "auto", "entreprise", "rachat"]),
  loanAmount: z.coerce.number().positive("Le montant doit être positif."),
  loanTerm: z.coerce.number().int().min(12, "La durée doit être d'au moins 12 mois."),
  firstName: z.string().min(2, "Le prénom est requis."),
  lastName: z.string().min(2, "Le nom est requis."),
  email: z.string().email("L'adresse e-mail est invalide."),
  phone: z.string().min(10, "Le numéro de téléphone est invalide."),
  address: z.string().min(5, "L'adresse est requise."),
  city: z.string().min(2, "La ville est requise."),
  postalCode: z.string().min(4, "Le code postal est requis."),
  country: z.string().min(2, "Le pays est requis."),
  maritalStatus: z.enum(["celibataire", "marie", "divorce", "veuf"]),
  numberOfChildren: z.coerce.number().int().min(0, "Le nombre d'enfants ne peut être négatif."),
  birthDay: z.coerce.number().int().min(1).max(31),
  birthMonth: z.coerce.number().int().min(1).max(12),
  birthYear: z.coerce.number().int().min(1900).max(new Date().getFullYear() - 18),
  occupation: z.string().min(2, "La profession est requise."),
  monthlyIncome: z.coerce.number().positive("Le revenu doit être positif."),
  monthlyExpenses: z.coerce.number().nonnegative("Les charges ne peuvent être négatives."),
  creditScore: z.coerce.number().min(300).max(850),
  identityDocument: z
    .any()
    .refine((file: File) => file && file.size > 0, "Le téléversement d'un fichier est requis.")
    .refine((file: File) => file.size <= MAX_FILE_SIZE, `La taille maximale du fichier est de 5Mo.`)
    .refine(
      (file: File) => ACCEPTED_FILE_TYPES.includes(file.type),
      "Seuls les formats .jpg, .png et .pdf sont acceptés."
    ),
  proofOfAddress: z
    .any()
    .refine((file: File) => file && file.size > 0, "Le téléversement d'un fichier est requis.")
    .refine((file: File) => file.size <= MAX_FILE_SIZE, `La taille maximale du fichier est de 5Mo.`)
    .refine(
      (file: File) => ACCEPTED_FILE_TYPES.includes(file.type),
      "Seuls les formats .jpg, .png et .pdf sont acceptés."
    ),
  proofOfIncome: z
    .any()
    .refine((file: File) => file && file.size > 0, "Le téléversement d'un fichier est requis.")
    .refine((file: File) => file.size <= MAX_FILE_SIZE, `La taille maximale du fichier est de 5Mo.`)
    .refine(
      (file: File) => ACCEPTED_FILE_TYPES.includes(file.type),
      "Seuls les formats .jpg, .png et .pdf sont acceptés."
    ),
}).refine((data) => {
    try {
        const date = new Date(data.birthYear, data.birthMonth - 1, data.birthDay);
        return date.getFullYear() === data.birthYear && date.getMonth() === data.birthMonth - 1 && date.getDate() === data.birthDay;
    } catch (e) {
        return false;
    }
}, {
    message: "La date de naissance est invalide.",
    path: ["birthDay"],
});

export type LoanApplicationResult = { success: boolean; error?: string; applicationId?: string };

export async function handleLoanApplication(formData: FormData): Promise<LoanApplicationResult> {
    
  const rawData = Object.fromEntries(formData.entries());

  const parsed = loanApplicationSchemaServer.safeParse(rawData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `${i.path.join('.')} : ${i.message}`).join("\n");
    console.error("Validation Error:", issues);
    return { success: false, error: `Données du formulaire invalides. Veuillez vérifier tous les champs, y compris les fichiers. ${issues}` };
  }

  const { birthDay, birthMonth, birthYear, identityDocument, proofOfAddress, proofOfIncome, ...restOfData } = parsed.data;
  const dateOfBirth = new Date(birthYear, birthMonth - 1, birthDay).toISOString();

  const applicationDetails = {
    ...restOfData,
    dateOfBirth,
    applicationId: `APP-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
    submissionDate: new Date().toISOString(),
    files: [
        { name: 'identityDocument', fileName: (identityDocument as File).name, type: (identityDocument as File).type },
        { name: 'proofOfAddress', fileName: (proofOfAddress as File).name, type: (proofOfAddress as File).type },
        { name: 'proofOfIncome', fileName: (proofOfIncome as File).name, type: (proofOfIncome as File).type },
    ]
  };

  if (WEBHOOK_URL) {
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({formType: 'loanApplication', ...applicationDetails}),
      });

      if (!response.ok) {
          const errorBody = await response.json().catch(() => ({ message: response.statusText }));
          console.error("Erreur de réponse du webhook de demande de prêt:", errorBody);
          return { success: false, error: `Le serveur du webhook a retourné une erreur: ${errorBody.message || response.statusText}.` };
      }
    } catch (error: any) {
      console.error("Erreur lors de l'appel au webhook de demande de prêt:", error);
      return { success: false, error: `Impossible de contacter le serveur webhook. ${error.message}` };
    }
  } else {
    console.log("Nouvelle demande de prêt reçue (aucun webhook configuré):", applicationDetails);
  }
  
  return { success: true, applicationId: applicationDetails.applicationId };
}
    

