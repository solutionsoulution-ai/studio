
'use server';

import { z } from 'zod';

// --- IMPORTANT ---
// Remplacez cette URL par le webhook que vous créerez dans un service comme Make.com ou Zapier.
// Ce webhook recevra les données des formulaires et déclenchera l'envoi d'e-mails.
const WEBHOOK_URL = 'https://hook.eu1.make.com/xxxxxxxxxxxxxxxxxxxxxxxx';


/**
 * Fonction générique pour envoyer des données à un webhook.
 * @param payload - Les données à envoyer.
 * @param submissionType - Un identifiant pour le type de soumission (ex: 'contact', 'loan').
 * @returns { success: boolean; error?: string }
 */
async function sendToWebhook(payload: object, submissionType: string): Promise<{ success: boolean; error?: string }> {
    if (WEBHOOK_URL.includes('xxxxxxxxxxxxxxxxxxxxxxxx')) {
        const errorMessage = "L'URL du webhook n'a pas été configurée.";
        console.error(errorMessage);
        return { success: false, error: "La configuration du serveur est incomplète. Veuillez contacter l'administrateur." };
    }

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: submissionType,
                data: payload
            }),
        });

        if (!response.ok) {
            throw new Error(`Le serveur a répondu avec le statut : ${response.status}`);
        }

        return { success: true };

    } catch (error: any) {
        console.error(`Error sending to webhook for ${submissionType}:`, error);
        return { success: false, error: "Impossible d'envoyer les données. Veuillez réessayer plus tard." };
    }
}


// --- Contact Form ---
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit comporter au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
  message: z.string().min(10, { message: "Le message doit comporter au moins 10 caractères." }),
});

export async function handleContactForm(formData: z.infer<typeof contactFormSchema>) {
  const parsed = contactFormSchema.safeParse(formData);
  if (!parsed.success) {
    const errorMessages = parsed.error.issues.map(issue => issue.message).join(', ');
    return { success: false, error: `Données invalides: ${errorMessages}` };
  }
  return await sendToWebhook(parsed.data, 'contact_form');
}

// --- Eligibility Form ---
const eligibilityContactSchema = z.object({
  annualRevenue: z.string(),
  creditScore: z.string(),
  yearsInBusiness: z.string(),
  loanAmountRequested: z.string(),
  reasonForLoan: z.string(),
  eligibilityStatus: z.string(),
  confidenceScore: z.string(),
});

export async function submitEligibilityContact(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  
  const parsed = eligibilityContactSchema.safeParse({
    annualRevenue: rawData['Revenu Annuel'],
    creditScore: rawData['Score de Crédit'],
    yearsInBusiness: rawData['Années d\'activité'],
    loanAmountRequested: rawData['Montant demandé'],
    reasonForLoan: rawData['Raison'],
    eligibilityStatus: rawData['Statut d\'éligibilité (IA)'],
    confidenceScore: rawData['Score de confiance (IA)'],
  });

  if (!parsed.success) {
    const errorMessages = parsed.error.issues.map(issue => issue.message).join(', ');
    return { success: false, error: `Données d'éligibilité invalides: ${errorMessages}` };
  }

  return await sendToWebhook(parsed.data, 'eligibility_form');
}

// --- Loan Application ---
export async function handleLoanApplication(formData: FormData) {
  try {
    const applicationId = `APP-${Date.now()}`;
    let submissionData: Record<string, any> = { applicationId };
    
    // Nous allons traiter les fichiers différemment, en supposant que le webhook peut les gérer
    // (par ex. Make.com peut télécharger depuis une URL ou accepter des données binaires).
    // Pour cet exemple, nous allons juste envoyer les noms et types de fichiers.
    // L'idéal serait d'uploader vers un stockage et de n'envoyer que les URLs.

    for (const [key, value] of formData.entries()) {
      if (value instanceof File && value.size > 0) {
        // Pour un vrai workflow, uploader le fichier sur un service de stockage (ex: S3, GCS, Supabase Storage)
        // et envoyer l'URL dans le webhook.
        // Ici, nous envoyons simplement des métadonnées pour la démo.
        submissionData[key] = {
            fileName: value.name,
            fileType: value.type,
            fileSize: value.size
        };
      } else if (typeof value === 'string') {
        submissionData[key] = value;
      }
    }

    const result = await sendToWebhook(submissionData, 'loan_application');

    if (result.success) {
      return { success: true, applicationId };
    } else {
      throw new Error(result.error);
    }

  } catch (error: any) {
    console.error("Error processing loan application:", error);
    return { success: false, error: "La soumission a échoué. Détails: " + error.message };
  }
}
