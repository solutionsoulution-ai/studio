
"use server";

import { z } from "zod";
import {
  assessLoanEligibility,
  type LoanEligibilityInput,
  type LoanEligibilityOutput,
} from "@/ai/flows/loan-eligibility-assessment";
import { sendEmail } from "@/lib/mail";


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
    const { email, ...details } = data;

    const subject = "Nouvelle demande de contact suite à une vérification d'éligibilité";
    let htmlContent = `<h1>Nouvelle Demande de Contact (Éligibilité)</h1>`;
    htmlContent += `<p>Une personne a rempli le formulaire de vérification d'éligibilité et souhaite être contactée.</p>`;
    htmlContent += `<h2>Détails du formulaire :</h2><ul>`;
    for (const [key, value] of Object.entries(details)) {
        htmlContent += `<li><strong>${key.replace(/_/g, ' ')} :</strong> ${value}</li>`;
    }
    htmlContent += `</ul>`;

    const webhookUrl = process.env.WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'eligibility',
          data: details
        }),
      });
    } else {
        await sendEmail({
          to: process.env.SMTP_USER!,
          subject: subject,
          html: htmlContent,
        });
    }

    return { success: true };
  } catch (error) {
    console.error("Error submitting eligibility contact:", error);
    return { success: false, error: "Impossible d'envoyer la demande de contact." };
  }
}


export async function handleLoanApplication(formData: FormData) {
  try {
      const data = Object.fromEntries(formData.entries());

      const subject = `Nouvelle demande de prêt - ${data.loanType}`;
      let htmlContent = `<h1>Nouvelle Demande de Prêt</h1>`;
      htmlContent += `<p>Vous avez reçu une nouvelle demande de prêt via le formulaire en ligne.</p>`;
      htmlContent += `<h2>Détails de la demande :</h2><ul>`;
      for (const [key, value] of Object.entries(data)) {
        if (!(value instanceof File)) {
            htmlContent += `<li><strong>${key.replace(/_/g, ' ')} :</strong> ${value}</li>`;
        }
      }
      htmlContent += `</ul>`;
      
      const attachments = [];
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          const file = value as File;
          // Check if file is empty
          if (file.size > 0) {
            const buffer = Buffer.from(await file.arrayBuffer());
            attachments.push({
              filename: file.name,
              content: buffer,
              contentType: file.type,
            });
          }
        }
      }

      const webhookUrl = process.env.WEBHOOK_URL;
      if (webhookUrl) {
         await fetch(webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: 'loanApplication',
              data: data
            }),
         });
      } else {
        await sendEmail({
            to: process.env.SMTP_USER!,
            subject,
            html: htmlContent,
            attachments: attachments,
        });
      }
      
      const applicationId = `APP-${Date.now()}`;
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
        const { name, email, message } = parsed.data;
        const subject = `Nouveau message de ${name} via le site VylsCapital`;
        const htmlContent = `
            <h1>Nouveau message depuis le formulaire de contact</h1>
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
            <hr>
            <p><strong>Message :</strong></p>
            <p>${message}</p>
        `;
        
        const webhookUrl = process.env.WEBHOOK_URL;
        if (webhookUrl) {
           await fetch(webhookUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                type: 'contact',
                data: parsed.data
              }),
           });
        } else {
          await sendEmail({
              to: process.env.SMTP_USER!,
              subject,
              html: htmlContent,
              replyTo: email,
          });
        }


        return { success: true };

    } catch (error) {
        console.error("Error sending contact form:", error);
        return { success: false, error: "Impossible d'envoyer le message." };
    }
}
