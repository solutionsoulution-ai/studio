
"use server";

import "dotenv/config";
import { z } from "zod";
import {
  assessLoanEligibility,
  type LoanEligibilityInput,
  type LoanEligibilityOutput,
} from "@/ai/flows/loan-eligibility-assessment";


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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];


// Schéma pour la validation des champs texte côté serveur
const loanApplicationTextSchema = z.object({
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


const fileSchema = z
    .instanceof(File)
    .refine((file) => file.size > 0, "Le téléversement d'un fichier est requis.")
    .refine((file) => file.size <= MAX_FILE_SIZE, `La taille maximale du fichier est de 5Mo.`)
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "Seuls les formats .jpg, .png et .pdf sont acceptés."
    );


export type LoanApplicationResult = { success: boolean; error?: string; applicationId?: string };

export async function handleLoanApplication(formData: FormData): Promise<LoanApplicationResult> {
    
  const rawData = Object.fromEntries(formData.entries());
  
  // 1. Valider les champs de texte
  const parsedText = loanApplicationTextSchema.safeParse(rawData);

  if (!parsedText.success) {
    const issues = parsedText.error.issues.map((i) => `${i.path.join('.')} : ${i.message}`).join("\n");
    console.error("Validation Error (Text):", issues);
    return { success: false, error: `Données du formulaire invalides. Veuillez vérifier les champs de texte. ${issues}` };
  }
  
  // 2. Valider les fichiers
  const identityDocument = formData.get('identityDocument');
  const proofOfAddress = formData.get('proofOfAddress');
  const proofOfIncome = formData.get('proofOfIncome');
  
  const fileValidations = {
      identityDocument: fileSchema.safeParse(identityDocument),
      proofOfAddress: fileSchema.safeParse(proofOfAddress),
      proofOfIncome: fileSchema.safeParse(proofOfIncome)
  };
  
  const fileErrors: string[] = [];
  for (const [key, result] of Object.entries(fileValidations)) {
      if (!result.success) {
          fileErrors.push(`${key}: ${result.error.issues.map(i => i.message).join(', ')}`);
      }
  }

  if (fileErrors.length > 0) {
      const errorString = fileErrors.join('\n');
      console.error("Validation Error (Files):", errorString);
      return { success: false, error: `Erreurs avec les fichiers téléversés:\n${errorString}` };
  }

  const applicationId = `APP-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

  // NOTE: Logic to send to formsubmit.co is handled client-side in the form component.
  // This server action is now only for validation.
  
  return { success: true, applicationId };
}
    
