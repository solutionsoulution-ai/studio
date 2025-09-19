
'use server';

import 'dotenv/config';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit comporter au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
  message: z.string().min(10, { message: "Le message doit comporter au moins 10 caractères." }),
});

/**
 * Handles the contact form submission by saving data to Supabase.
 * @param formData - The validated form data.
 * @returns An object indicating success or failure.
 */
export async function handleContactForm(formData: z.infer<typeof contactFormSchema>) {
    const parsed = contactFormSchema.safeParse(formData);
    if (!parsed.success) {
      const errorMessages = parsed.error.issues.map(issue => issue.message).join(', ');
      return { success: false, error: `Données invalides: ${errorMessages}` };
    }
    
    try {
       const { data, error } = await supabase
         .from('contacts')
         .insert([
           { 
             name: parsed.data.name,
             email: parsed.data.email,
             message: parsed.data.message
           }
         ]);

       if (error) {
         throw error;
       }

       return { success: true };

    } catch (error: any) {
        console.error("Error sending contact form to Supabase:", error);
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
 * Handles the eligibility contact form submission to Supabase.
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

  try {
    const { data, error } = await supabase
      .from('eligibility_contacts')
      .insert([
        { 
          annual_revenue: parsed.data.annualRevenue,
          credit_score: parsed.data.creditScore,
          years_in_business: parsed.data.yearsInBusiness,
          loan_amount_requested: parsed.data.loanAmountRequested,
          reason_for_loan: parsed.data.reasonForLoan,
          eligibility_status: parsed.data.eligibilityStatus,
          confidence_score: parsed.data.confidenceScore
        }
      ]);

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error: any) {
    console.error("Error submitting eligibility contact to Supabase:", error);
    return { success: false, error: error.message || "Impossible d'envoyer la demande de contact." };
  }
}

/**
 * Handles the full loan application submission, including file uploads to Supabase.
 * @param formData - Raw form data from the client, including files.
 * @returns An object indicating success or failure, with an application ID.
 */
export async function handleLoanApplication(formData: FormData) {
  try {
      const applicationId = `APP-${Date.now()}`;
      const applicationData: {[key: string]: any} = {
        application_id: applicationId,
      };

      const fileUploadPromises = [];

      // Helper to convert camelCase to snake_case
      const toSnakeCase = (str: string) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

      // Process form fields and files
      for (const [key, value] of formData.entries()) {
          if (value instanceof File && value.size > 0) {
              const safeFileName = value.name.replace(/[^a-zA-Z0-9.\-]/g, '_');
              const filePath = `${applicationId}/${key}-${safeFileName}`;
              
              // Add file upload promise to the array
              fileUploadPromises.push(
                supabase.storage
                  .from('loan_documents')
                  .upload(filePath, value)
              );

              // Store the path in the data to be inserted in the table
              const snakeCaseKey = toSnakeCase(`${key}_url`);
              applicationData[snakeCaseKey] = filePath;

          } else if (typeof value === 'string') {
              // Convert camelCase to snake_case for DB consistency
              const snakeCaseKey = toSnakeCase(key);
              applicationData[snakeCaseKey] = value;
          }
      }
      
      // Execute all file uploads in parallel
      const uploadResults = await Promise.all(fileUploadPromises);

      // Check for any upload errors
      for (const result of uploadResults) {
        if (result.error) {
          throw new Error(`Erreur de téléversement de fichier: ${result.error.message}`);
        }
      }

      // Once all files are uploaded, insert the record into the database
      const { data: dbData, error: dbError } = await supabase
        .from('loan_applications')
        .insert([applicationData]);

      if (dbError) {
        throw dbError;
      }

      return { success: true, applicationId };

  } catch (error: any) {
      console.error("Error processing loan application with Supabase:", error);
      return { success: false, error: error.message || "La soumission a échoué. Veuillez réessayer." };
  }
}
