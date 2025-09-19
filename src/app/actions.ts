
'use server';

import 'dotenv/config';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit comporter au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
  message: z.string().min(10, { message: "Le message doit comporter au moins 10 caractères." }),
});

/**
 * Handles the contact form submission by sending data to a Google Script webhook.
 * @param formData - The validated form data.
 * @returns An object indicating success or failure.
 */
export async function handleContactForm(formData: z.infer<typeof contactFormSchema>) {
    const parsed = contactFormSchema.safeParse(formData);
    if (!parsed.success) {
      const errorMessages = parsed.error.issues.map(issue => issue.message).join(', ');
      return { success: false, error: `Données invalides: ${errorMessages}` };
    }
    
    const webhookUrl = process.env.WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("WEBHOOK_URL is not defined in environment variables.");
      return { success: false, error: "La configuration du serveur est incomplète." };
    }

    try {
       const payload = {
         sheet: 'Contacts',
         data: parsed.data
       };

       const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          redirect: 'follow',
       });

       if (!response.ok) {
          const errorBody = await response.text();
          console.error("Webhook error response:", errorBody);
          throw new Error(`Le serveur du webhook a répondu avec une erreur: ${response.status}`);
       }

        const responseData = await response.json();
        if (responseData.status !== 'success') {
          throw new Error(responseData.message || "Le webhook a renvoyé une erreur inattendue.");
        }

        return { success: true };

    } catch (error: any) {
        console.error("Error sending contact form to webhook:", error);
        return { success: false, error: error.message || "Impossible d'envoyer le message." };
    }
}


const eligibilityContactSchema = z.object({
  annualRevenue: z.string(),
  creditScore: z.string(),
  yearsInBusiness: z.string(),
  loanAmountRequested: z.string(),
  reasonForLoan: z.string(),
  eligibilityStatus: z.string(),
  confidenceScore: z.string(),
});

/**
 * Handles the eligibility contact form submission.
 * @param formData - Raw form data from the client.
 * @returns An object indicating success or failure.
 */
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

  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("WEBHOOK_URL is not defined in environment variables.");
    return { success: false, error: "La configuration du serveur est incomplète." };
  }

  try {
    const payload = {
        sheet: 'EligibilityContacts',
        data: parsed.data
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error("Webhook error response for eligibility:", errorBody);
        throw new Error(`Le serveur du webhook a répondu avec le statut ${response.status}.`);
    }

    const responseData = await response.json();
    if (responseData.status !== 'success') {
      throw new Error(responseData.message || "Le webhook a renvoyé une erreur.");
    }

    return { success: true };
  } catch (error: any) {
    console.error("Error submitting eligibility contact to webhook:", error);
    return { success: false, error: error.message || "Impossible d'envoyer la demande de contact." };
  }
}

/**
 * Handles the full loan application submission, including file uploads.
 * @param formData - Raw form data from the client, including files.
 * @returns An object indicating success or failure, with an application ID.
 */
export async function handleLoanApplication(formData: FormData) {
  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("WEBHOOK_URL is not defined in environment variables.");
    return { success: false, error: "La configuration du serveur est incomplète." };
  }

  try {
      const applicationId = `APP-${Date.now()}`;
      const dataForWebhook: {[key: string]: any} = {
        applicationId: applicationId,
      };

      // Process form fields and files
      for (const [key, value] of formData.entries()) {
          if (value instanceof File && value.size > 0) {
              const buffer = Buffer.from(await value.arrayBuffer());
              // Create a file object structure for the Google Script
              dataForWebhook[key] = {
                  fileName: value.name,
                  mimeType: value.type,
                  content: buffer.toString('base64'),
              };
          } else if (typeof value === 'string') {
              dataForWebhook[key] = value;
          }
      }
      
      const payload = {
        sheet: 'LoanApplications',
        data: dataForWebhook,
      };

      const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // The body size limit might need adjustment in next.config.ts if files are large
          body: JSON.stringify(payload),
          redirect: 'follow',
      });
      
      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Webhook error response for loan application:", errorBody);
        throw new Error(`Le serveur du webhook a répondu avec une erreur: ${response.status}`);
      }

      const responseData = await response.json();
      if (responseData.status !== 'success') {
        throw new Error(responseData.message || "Le webhook a renvoyé une erreur.");
      }

      return { success: true, applicationId };

  } catch (error: any) {
      console.error("Error processing loan application via webhook:", error);
      return { success: false, error: error.message || "La soumission a échoué. Veuillez réessayer." };
  }
}
