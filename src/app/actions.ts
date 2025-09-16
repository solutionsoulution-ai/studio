
"use server";

import "dotenv/config"; // Force le chargement des variables d'environnement

import {
  assessLoanEligibility,
  type LoanEligibilityInput,
  type LoanEligibilityOutput,
} from "@/ai/flows/loan-eligibility-assessment";
import { z } from "zod";

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
            // Optionnel: ne pas bloquer l'utilisateur pour une erreur de webhook
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
        body: JSON.stringify(parsed.data),
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

  if (WEBHOOK_URL) {
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: 'login', ...parsed.data}),
      });
      if (!response.ok) {
        const res = await response.json().catch(() => ({error: `Erreur ${response.status}`}));
        return { success: false, error: res.error || "Identifiants incorrects." };
      }
      return { success: true };
    } catch (error: any) {
      console.error("Erreur lors de l'appel au webhook de connexion:", error);
      return { success: false, error: `Impossible de contacter le service de connexion. ${error.message}` };
    }
  }
  
  if (formData.email === 'client@test.com' && formData.password === 'password') {
    console.log("Connexion de l'utilisateur de test réussie.");
    return { success: true };
  }

  console.log("Tentative de connexion (aucun webhook configuré):", parsed.data);
  return { success: false, error: "Service d'authentification non configuré. Identifiants de test non valides." };
}


// Schema for Client and Account Creation
const createClientAndAccountSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
  password: z.string().min(8, { message: "Le mot de passe doit comporter au moins 8 caractères." }),
  accountNumber: z.string().min(1, { message: "Le numéro de compte est requis." }),
  iban: z.string().min(1, { message: "L'IBAN est requis." }),
  bic: z.string().min(1, { message: "Le code BIC/SWIFT est requis." }),
  balance: z.coerce.number().optional().default(0),
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


  if (WEBHOOK_URL) {
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientDetails),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({ message: response.statusText }));
        return { success: false, error: `Le serveur a retourné une erreur: ${errorBody.message || response.statusText}` };
      }
      const result = await response.json();
      return { success: true, details: result.client };
    } catch (error: any) {
      console.error("Erreur lors de l'appel au webhook de création de client/compte:", error);
      return { success: false, error: `Impossible de contacter le service de création. ${error.message}` };
    }
  }

  console.log("Création de client/compte (aucun webhook configuré):", clientDetails);
  return { success: true, details: clientDetails };
}

export type GetClientsResult = { success: boolean; data?: any[]; error?: string; };

export async function getClients(): Promise<GetClientsResult> {
    if (WEBHOOK_URL) {
        try {
            const url = new URL(WEBHOOK_URL);
            url.searchParams.append('action', 'getClients');
            
            const response = await fetch(url.toString(), {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                 cache: 'no-store'
            });

            if (!response.ok) {
                 const errorBody = await response.text();
                 throw new Error(`Le webhook a retourné une erreur: ${response.statusText}. Body: ${errorBody}`);
            }
            const data = await response.json();
            if(data.error) {
                throw new Error(data.error);
            }
            return { success: true, data };
        } catch(error: any) {
            console.error("Erreur lors de la récupération des clients depuis le webhook:", error);
            return { success: false, error: `Impossible de récupérer la liste des clients. ${error.message}` };
        }
    }
    
    console.log("Récupération des clients (aucun webhook configuré). Retour d'une liste vide.");
    return { success: true, data: [] };
}


const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];


// Schema for Multi-Step Loan Application
const loanApplicationSchema = z.object({
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
    .refine((file) => !!file, "Le téléversement d'un fichier est requis.")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `La taille maximale du fichier est de 5Mo.`)
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      "Seuls les formats .jpg, .png et .pdf sont acceptés."
    ),
  proofOfAddress: z
    .any()
    .refine((file) => !!file, "Le téléversement d'un fichier est requis.")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `La taille maximale du fichier est de 5Mo.`)
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      "Seuls les formats .jpg, .png et .pdf sont acceptés."
    ),
  proofOfIncome: z
    .any()
    .refine((file) => !!file, "Le téléversement d'un fichier est requis.")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `La taille maximale du fichier est de 5Mo.`)
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
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


export type LoanApplicationInput = z.infer<typeof loanApplicationSchema>;
export type LoanApplicationResult = { success: boolean; error?: string; applicationId?: string };

export async function handleLoanApplication(formData: FormData): Promise<LoanApplicationResult> {
    
  const rawData = Object.fromEntries(formData.entries());

  const dataToParse = {
    ...rawData,
    loanAmount: Number(rawData.loanAmount),
    loanTerm: Number(rawData.loanTerm),
    numberOfChildren: Number(rawData.numberOfChildren),
    birthDay: Number(rawData.birthDay),
    birthMonth: Number(rawData.birthMonth),
    birthYear: Number(rawData.birthYear),
    monthlyIncome: Number(rawData.monthlyIncome),
    monthlyExpenses: Number(rawData.monthlyExpenses),
    creditScore: Number(rawData.creditScore),
    identityDocument: rawData.identityDocument,
    proofOfAddress: rawData.proofOfAddress,
    proofOfIncome: rawData.proofOfIncome,
  };

  const parsed = loanApplicationSchema.safeParse(dataToParse);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `${i.path.join('.')} : ${i.message}`).join(", ");
    return { success: false, error: `Données du formulaire invalides: ${issues}` };
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
        body: JSON.stringify(applicationDetails),
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


// Schema for bank transfers
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

export type TransferFormInput = z.infer<typeof transferFormSchema>;
export type TransferResult = { success: boolean; error?: string; transactionId?: string };

export async function handleTransfer(
  formData: TransferFormInput
): Promise<TransferResult> {
  const parsed = transferFormSchema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => i.message).join(", ");
    return { success: false, error: `Données de virement invalides: ${issues}` };
  }

  const transactionDetails = {
    ...parsed.data,
    transactionId: `VIR-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    status: "Completed",
    date: new Date().toISOString(),
  };

  if (WEBHOOK_URL) {
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({formType: 'transfer', ...transactionDetails}),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Erreur de réponse du webhook de virement:", errorBody);
        return { success: false, error: `Le service de virement est indisponible: ${response.statusText}.` };
      }
    } catch (error: any) {
      console.error("Erreur lors de l'appel au webhook de virement:", error);
      return { success: false, error: `Le service de virement est momentanément indisponible. ${error.message}` };
    }
  } else {
      console.log("Virement initié (aucun webhook configuré):", transactionDetails);
  }

  return { success: true, transactionId: transactionDetails.transactionId };
}


// Action to delete a client
export type DeleteClientResult = { success: boolean; error?: string; };

export async function handleDeleteClient(clientId: string): Promise<DeleteClientResult> {
  if (!WEBHOOK_URL) {
    return { success: false, error: "Le service de gestion des clients n'est pas configuré." };
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: 'deleteClient', clientId }),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(errorBody.message || "Le serveur a retourné une erreur.");
    }
    
    const result = await response.json();
    if (result.status !== 'success') {
        throw new Error(result.message || "Une erreur inconnue est survenue lors de la suppression.");
    }

    return { success: true };
  } catch (error: any) {
    console.error("Erreur lors de la suppression du client:", error);
    return { success: false, error: error.message };
  }
}

// Action to update a client's balance
const updateBalanceSchema = z.object({
  clientId: z.string(),
  amount: z.coerce.number().positive("Le montant doit être un nombre positif."),
  operation: z.enum(["credit", "debit"]),
  reason: z.string().min(3, "Un motif est requis pour l'opération."),
});


export type UpdateBalanceInput = z.infer<typeof updateBalanceSchema>;
export type UpdateBalanceResult = { success: boolean; error?: string; newBalance?: number };

export async function handleUpdateBalance(formData: UpdateBalanceInput): Promise<UpdateBalanceResult> {
    const parsed = updateBalanceSchema.safeParse(formData);

    if (!parsed.success) {
        const issues = parsed.error.issues.map((i) => i.message).join(", ");
        return { success: false, error: `Données invalides: ${issues}` };
    }

    if (!WEBHOOK_URL) {
        return { success: false, error: "Le service de gestion des clients n'est pas configuré." };
    }

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: 'updateBalance', ...parsed.data }),
        });

        if (!response.ok) {
            const errorBody = await response.json().catch(() => ({ message: response.statusText }));
            throw new Error(errorBody.message || "Le serveur a retourné une erreur.");
        }

        const result = await response.json();
        if (result.status !== 'success') {
            throw new Error(result.message || "Une erreur inconnue est survenue lors de la mise à jour du solde.");
        }

        return { success: true, newBalance: result.newBalance };

    } catch (error: any) {
        console.error("Erreur lors de la mise à jour du solde:", error);
        return { success: false, error: error.message };
    }
}

    