
'use server';

import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { loanApplicationSchema } from '@/components/site/loan-application-form';

// Helper pour convertir les clés de camelCase à snake_case
const toSnakeCase = (str: string) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);


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

  const { error } = await supabase.from('contacts').insert(parsed.data);

  if (error) {
    console.error('Supabase contact form error:', error);
    return { success: false, error: "Erreur lors de la sauvegarde des données." };
  }

  return { success: true };
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
  
  const snakeCaseData = Object.fromEntries(
    Object.entries(parsed.data).map(([key, value]) => [toSnakeCase(key), value])
  );

  const { error } = await supabase.from('eligibility_contacts').insert(snakeCaseData);
  
  if (error) {
    console.error('Supabase eligibility form error:', error);
    return { success: false, error: "Erreur lors de la sauvegarde de l'éligibilité." };
  }

  return { success: true };
}


// --- Loan Application ---
export async function handleLoanApplication(formData: FormData) {
  try {
    const applicationId = `APP-${Date.now()}`;
    const rawData = Object.fromEntries(formData.entries());
    
    // Valider les données du formulaire avec Zod
    const zodResult = loanApplicationSchema.safeParse(rawData);
    if (!zodResult.success) {
        const errorMessages = zodResult.error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join('; ');
        throw new Error(`Données du formulaire invalides : ${errorMessages}`);
    }
    const validatedData = zodResult.data;

    let submissionData: Record<string, any> = { application_id: applicationId };
    const fileUploadPromises = [];

    for (const key in validatedData) {
        const value = validatedData[key as keyof typeof validatedData];
        const snakeCaseKey = toSnakeCase(key);

        if (value instanceof File && value.size > 0) {
            // Nettoyer le nom de fichier pour le rendre compatible avec Supabase
            const cleanFileName = value.name.replace(/[^a-zA-Z0-9.\-_]/g, '-');
            const filePath = `${applicationId}/${snakeCaseKey}-${cleanFileName}`;
            
            // Téléverser le fichier et stocker la promesse
            const uploadPromise = supabase.storage
                .from('loan_documents')
                .upload(filePath, value);
            
            fileUploadPromises.push(
                uploadPromise.then(({ data: uploadData, error: uploadError }) => {
                    if (uploadError) {
                        throw new Error(`Erreur de téléversement pour ${key}: ${uploadError.message}`);
                    }
                    // Obtenir l'URL publique et l'ajouter aux données à insérer
                    const { data: { publicUrl } } = supabase.storage.from('loan_documents').getPublicUrl(filePath);
                    submissionData[`${snakeCaseKey}_url`] = publicUrl;
                })
            );
        } else if (!(value instanceof File)) {
            submissionData[snakeCaseKey] = value;
        }
    }

    // Attendre que tous les téléversements de fichiers soient terminés
    await Promise.all(fileUploadPromises);

    // Insérer les données du formulaire (y compris les URL) dans la table
    const { error: dbError } = await supabase
        .from('loan_applications')
        .insert(submissionData);

    if (dbError) {
        throw new Error(`Erreur de base de données : ${dbError.message}`);
    }
    
    return { success: true, applicationId };

  } catch (error: any) {
    console.error("Error processing loan application:", error);
    return { success: false, error: "La soumission a échoué. Détails: " + error.message };
  }
}
