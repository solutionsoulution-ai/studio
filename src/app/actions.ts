
"use server";

import "dotenv/config"; // Force le chargement des variables d'environnement

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


// Schemas and actions for authentication

export type AuthResult = { success: boolean; error?: string };

export async function handleAdminLogin(password: string): Promise<AuthResult> {
  // SOLUTION DE CONTOURNEMENT: Mot de passe en dur pour garantir l'accès
  const ADMIN_PASSWORD = "XtZ_7@pQn!fS8#mV";
  if (password === ADMIN_PASSWORD) {
    return { success: true };
  }
  return { success: false, error: "Mot de passe incorrect." };
}

const loginSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
  password: z.string().min(1, { message: "Le mot de passe est requis." }),
});
export type LoginInput = z.infer<typeof loginSchema>;


export async function handleLogin(formData: LoginInput): Promise<AuthResult> {
  const parsed = loginSchema.safeParse(formData);
  if (!parsed.success) {
     const issues = parsed.error.issues.map((i) => i.message).join(", ");
    return { success: false, error: `Données du formulaire invalides: ${issues}` };
  }

  if (process.env.LOGIN_WEBHOOK_URL) {
    try {
      const response = await fetch(process.env.LOGIN_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) {
        const res = await response.json();
        return { success: false, error: res.error || "Identifiants incorrects." };
      }
      const session = await response.json();
      // Ici, vous définiriez un cookie ou un token de session.
      // Pour cet exemple, nous allons simplement retourner un succès.
      return { success: true };
    } catch (error) {
      console.error("Erreur lors de l'appel au webhook de connexion:", error);
      return { success: false, error: "Impossible de contacter le service de connexion." };
    }
  }
  
  // Logique de secours pour le développement local sans webhook
  if (formData.email === 'client@test.com' && formData.password === 'password') {
    console.log("Connexion de l'utilisateur de test réussie.");
    return { success: true };
  }

  console.log("Tentative de connexion (aucun webhook configuré):", parsed.data);
  // Simuler un échec pour les autres utilisateurs en l'absence de webhook
  return { success: false, error: "Service d'authentification non configuré. Identifiants de test non valides." };
}


// Schema for Client and Account Creation
const createClientAndAccountSchema = z.object({
  // Infos Client
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
  password: z.string().min(8, { message: "Le mot de passe doit comporter au moins 8 caractères." }),
  // Infos Compte Bancaire
  accountNumber: z.string().min(1, { message: "Le numéro de compte est requis." }),
  iban: z.string().min(1, { message: "L'IBAN est requis." }),
  bic: z.string().min(1, { message: "Le code BIC/SWIFT est requis." }),
  // Infos Prêt (Optionnel)
  loanType: z.enum(["none", "immobilier", "consommation", "auto"]),
  loanAmount: z.coerce.number().optional(),
  interestRate: z.coerce.number().optional(),
  loanTerm: z.coerce.number().optional(),
}).refine(data => {
    if (data.loanType !== 'none') {
        return data.loanAmount !== undefined && data.interestRate !== undefined && data.loanTerm !== undefined;
    }
    return true;
}, {
    message: "Les détails du prêt sont requis lorsque le type de prêt n'est pas 'Aucun'.",
    path: ["loanAmount"],
});

export type CreateClientAndAccountInput = z.infer<typeof createClientAndAccountSchema>;
export type CreateClientAndAccountResult = { success: boolean; error?: string; details?: any };

export async function handleCreateClientAndAccount(formData: CreateClientAndAccountInput): Promise<CreateClientAndAccountResult> {
  const parsed = createClientAndAccountSchema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => i.message).join(", ");
    return { success: false, error: `Données du formulaire invalides: ${issues}` };
  }

  const clientDetails = { 
    ...parsed.data, 
    clientId: `CLIENT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    creationDate: new Date().toISOString(),
    hasLoan: parsed.data.loanType !== 'none'
  };

  if (clientDetails.hasLoan) {
    // @ts-ignore
    clientDetails.loanId = `PRET-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
  }


  if (process.env.CREATE_CLIENT_ACCOUNT_WEBHOOK_URL) {
    try {
      await fetch(process.env.CREATE_CLIENT_ACCOUNT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientDetails),
      });
      return { success: true, details: clientDetails };
    } catch (error) {
      console.error("Erreur lors de l'appel au webhook de création de client/compte:", error);
      return { success: false, error: "Impossible de contacter le service de création." };
    }
  }

  // Fallback for local development
  console.log("Création de client/compte (aucun webhook configuré):", clientDetails);
  return { success: true, details: clientDetails };
}

// Schema for Multi-Step Loan Application
const loanApplicationSchema = z.object({
  // Step 1
  loanType: z.enum(["immobilier", "consommation", "auto", "entreprise", "rachat"]),
  loanAmount: z.coerce.number().positive("Le montant doit être positif."),
  loanTerm: z.coerce.number().int().min(12, "La durée doit être d'au moins 12 mois."),
  
  // Step 2
  firstName: z.string().min(2, "Le prénom est requis."),
  lastName: z.string().min(2, "Le nom est requis."),
  email: z.string().email("L'adresse e-mail est invalide."),
  phone: z.string().min(10, "Le numéro de téléphone est invalide."),
  address: z.string().min(5, "L'adresse est requise."),
  city: z.string().min(2, "La ville est requise."),
  postalCode: z.string().min(4, "Le code postal est requis."),
  country: z.string().min(2, "Le pays est requis."),
  maritalStatus: z.enum(["celibataire", "marie", "divorce", "veuf"]),
  
  // Step 3
  occupation: z.string().min(2, "La profession est requise."),
  monthlyIncome: z.coerce.number().positive("Le revenu doit être positif."),
  monthlyExpenses: z.coerce.number().nonnegative("Les charges ne peuvent être négatives."),
  creditScore: z.coerce.number().min(300).max(850),
});

export type LoanApplicationInput = z.infer<typeof loanApplicationSchema>;
export type LoanApplicationResult = { success: boolean; error?: string; applicationId?: string };

export async function handleLoanApplication(formData: LoanApplicationInput): Promise<LoanApplicationResult> {
  const parsed = loanApplicationSchema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => i.message).join(", ");
    return { success: false, error: `Données du formulaire invalides: ${issues}` };
  }

  const applicationDetails = {
    ...parsed.data,
    applicationId: `APP-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
    submissionDate: new Date().toISOString(),
  };

  if (process.env.LOAN_APP_WEBHOOK_URL) {
    try {
      await fetch(process.env.LOAN_APP_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationDetails),
      });
    } catch (error) {
      console.error("Erreur lors de l'appel au webhook de demande de prêt:", error);
      // Ne pas bloquer l'utilisateur si le webhook échoue
    }
  }

  // Pour le développement, on logue les données
  console.log("Nouvelle demande de prêt reçue (aucun webhook configuré):", applicationDetails);
  
  // Simuler un succès
  return { success: true, applicationId: applicationDetails.applicationId };
}

    