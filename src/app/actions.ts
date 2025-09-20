
'use server';

import 'dotenv/config';
import { z } from 'zod';
import { transporter } from '@/lib/nodemailer';

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

  const mailOptions = {
    from: `"VylsCapital Site" <${process.env.SMTP_USER}>`,
    to: process.env.RECIPIENT_EMAIL,
    subject: `Nouveau Message de Contact de ${name}`,
    html: `
      <h1>Nouveau Message de Contact</h1>
      <p><strong>Nom:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <hr>
      <h2>Message:</h2>
      <p style="white-space: pre-wrap;">${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error: any) {
    console.error("Error sending contact email:", error);
    return { success: false, error: "Impossible d'envoyer l'e-mail. Veuillez vérifier la configuration SMTP." };
  }
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

  const mailOptions = {
    from: `"VylsCapital Site" <${process.env.SMTP_USER}>`,
    to: process.env.RECIPIENT_EMAIL,
    subject: `Nouvelle Demande de Contact (Éligibilité)`,
    html: `
      <h1>Nouvelle Demande de Contact (Éligibilité)</h1>
      <h2>Détails du Prospect:</h2>
      <ul>
        <li><strong>Revenu Annuel:</strong> ${annualRevenue} €</li>
        <li><strong>Score de Crédit:</strong> ${creditScore}</li>
        <li><strong>Années d'activité:</strong> ${yearsInBusiness}</li>
        <li><strong>Montant demandé:</strong> ${loanAmountRequested} €</li>
        <li><strong>Raison:</strong> ${reasonForLoan}</li>
      </ul>
      <hr>
      <h2>Résultats de l'IA:</h2>
      <ul>
        <li><strong>Statut d'éligibilité:</strong> ${eligibilityStatus}</li>
        <li><strong>Score de confiance:</strong> ${confidenceScore}</li>
      </ul>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error: any) {
    console.error("Error sending eligibility email:", error);
    return { success: false, error: "Impossible d'envoyer l'e-mail. Veuillez vérifier la configuration SMTP." };
  }
}

// --- Loan Application ---
export async function handleLoanApplication(formData: FormData) {
  try {
    const applicationId = `APP-${Date.now()}`;
    let textContent = `<h1>Nouvelle Demande de Prêt - ${applicationId}</h1>`;
    const attachments = [];

    // Process form fields and files
    for (const [key, value] of formData.entries()) {
      if (value instanceof File && value.size > 0) {
        attachments.push({
          filename: value.name,
          content: Buffer.from(await value.arrayBuffer()),
          contentType: value.type,
        });
      } else if (typeof value === 'string') {
        textContent += `<p><strong>${key}:</strong> ${value}</p>`;
      }
    }

    const mailOptions = {
      from: `"VylsCapital Site" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: `Nouvelle Demande de Prêt Complète: ${applicationId}`,
      html: textContent,
      attachments: attachments,
    };

    await transporter.sendMail(mailOptions);
    
    return { success: true, applicationId };

  } catch (error: any) {
    console.error("Error sending loan application email:", error);
    return { success: false, error: "La soumission a échoué. Veuillez réessayer. Détails: " + error.message };
  }
}
