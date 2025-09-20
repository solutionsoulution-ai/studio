
'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import { loanApplicationSchema } from '@/components/site/loan-application-form'; // Assurez-vous que ce chemin est correct

// Initialisation de Resend
const resend = new Resend(process.env.RESEND_API_KEY);
const recipientEmail = process.env.RECIPIENT_EMAIL;
const senderEmail = process.env.SENDER_EMAIL;


/**
 * Fonction générique pour envoyer un e-mail via Resend.
 * @param subject - Le sujet de l'e-mail.
 * @param htmlBody - Le corps de l'e-mail au format HTML.
 * @param textBody - Le corps de l'e-mail au format texte.
 * @returns { success: boolean; error?: string }
 */
async function sendEmail(subject: string, htmlBody: string, textBody: string): Promise<{ success: boolean; error?: string }> {
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'REPLACE_THIS_WITH_YOUR_RESEND_API_KEY') {
        const errorMessage = "La clé API Resend n'est pas configurée.";
        console.error(errorMessage);
        return { success: false, error: "La configuration du serveur est incomplète. Veuillez contacter l'administrateur." };
    }
     if (!recipientEmail || !senderEmail) {
        const errorMessage = "L'expéditeur ou le destinataire de l'e-mail n'est pas configuré.";
        console.error(errorMessage);
        return { success: false, error: "La configuration du serveur est incomplète. Veuillez contacter l'administrateur." };
    }

    try {
        const { data, error } = await resend.emails.send({
            from: `VylsCapital <${senderEmail}>`,
            to: [recipientEmail],
            subject: subject,
            html: htmlBody,
            text: textBody,
        });

        if (error) {
            throw error;
        }

        return { success: true };

    } catch (error: any) {
        console.error(`Erreur lors de l'envoi de l'e-mail:`, error);
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

  const { name, email, message } = parsed.data;
  
  const subject = `Nouveau message de contact de ${name}`;
  const textBody = `
    Nouveau message depuis le formulaire de contact :
    - Nom : ${name}
    - Email : ${email}
    - Message : ${message}
  `;
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Nouveau Message de Contact</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message :</strong></p>
        <p style="padding: 10px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">${message}</p>
    </div>
  `;

  return await sendEmail(subject, htmlBody, textBody);
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

  const { annualRevenue, creditScore, yearsInBusiness, loanAmountRequested, reasonForLoan, eligibilityStatus, confidenceScore } = parsed.data;

  const subject = "Nouvelle demande de contact (Éligibilité)";
  const textBody = `
    Une personne a testé son éligibilité et souhaite être contactée :
    - Revenu Annuel: ${annualRevenue} €
    - Score de Crédit: ${creditScore}
    - Années d'activité: ${yearsInBusiness}
    - Montant demandé: ${loanAmountRequested} €
    - Raison: ${reasonForLoan}
    ---
    Résultat de l'IA :
    - Statut: ${eligibilityStatus}
    - Confiance: ${confidenceScore}
  `;
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Nouvelle Demande de Contact (Suite au test d'éligibilité)</h2>
        <h3>Détails du prospect :</h3>
        <ul>
            <li><strong>Revenu Annuel :</strong> ${annualRevenue} €</li>
            <li><strong>Score de Crédit :</strong> ${creditScore}</li>
            <li><strong>Années d'activité :</strong> ${yearsInBusiness}</li>
            <li><strong>Montant demandé :</strong> ${loanAmountRequested} €</li>
            <li><strong>Raison du prêt :</strong> ${reasonForLoan}</li>
        </ul>
        <hr>
        <h3>Résultat de l'évaluation par l'IA :</h3>
        <ul>
            <li><strong>Statut :</strong> ${eligibilityStatus}</li>
            <li><strong>Score de confiance :</strong> ${confidenceScore}</li>
        </ul>
    </div>
  `;

  return await sendEmail(subject, htmlBody, textBody);
}


// --- Loan Application ---
export async function handleLoanApplication(formData: FormData) {
  try {
    const applicationId = `APP-${Date.now()}`;
    let submissionData: Record<string, any> = { applicationId };
    let attachments = [];

    // Validation des données du formulaire avec Zod
    const rawData = Object.fromEntries(formData.entries());
    const zodResult = loanApplicationSchema.safeParse(rawData);
    
    if (!zodResult.success) {
        const errorMessages = zodResult.error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join('; ');
        throw new Error(`Données du formulaire invalides : ${errorMessages}`);
    }
    const validatedData = zodResult.data;

    let htmlBody = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Nouvelle Demande de Prêt - ${applicationId}</h2>
        <p>Une nouvelle demande de financement a été soumise. Voici les détails :</p>
    `;

    for (const [key, value] of formData.entries()) {
      if (value instanceof File && value.size > 0) {
        // Pour les fichiers, on les prépare pour l'envoi en pièce jointe
        const buffer = Buffer.from(await value.arrayBuffer());
        attachments.push({
          filename: value.name,
          content: buffer,
        });
        htmlBody += `<p><strong>Document '${key}' :</strong> ${value.name} (en pièce jointe)</p>`;
      } else if (typeof value === 'string') {
        submissionData[key] = value;
        htmlBody += `<p><strong>${key} :</strong> ${value}</p>`;
      }
    }
    
    htmlBody += `</div>`;
    
    const subject = `Nouvelle demande de prêt : ${validatedData.loanType} pour ${validatedData.firstName} ${validatedData.lastName}`;

    const { data, error } = await resend.emails.send({
        from: `VylsCapital <${senderEmail}>`,
        to: [recipientEmail as string],
        subject: subject,
        html: htmlBody,
        attachments: attachments,
    });

    if (error) {
        throw error;
    }
    
    return { success: true, applicationId };

  } catch (error: any) {
    console.error("Error processing loan application:", error);
    return { success: false, error: "La soumission a échoué. Détails: " + error.message };
  }
}
