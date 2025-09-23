
'use server';

import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

const loanApplicationSchema = z.object({
    loanType: z.string(),
    loanAmount: z.string(),
    loanTerm: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string(),
    maritalStatus: z.string(),
    numberOfChildren: z.string(),
    birthDay: z.string(),
    birthMonth: z.string(),
    birthYear: z.string(),
    occupation: z.string(),
    monthlyIncome: z.string(),
    monthlyExpenses: z.string(),
    identityDocument: z.instanceof(File).optional(),
    proofOfAddress: z.instanceof(File).optional(),
    proofOfIncome: z.instanceof(File).optional(),
});


// This is a placeholder for an email sending service.
// In a real application, you would use a service like Resend, SendGrid, or Nodemailer.
async function sendEmail({ to, subject, html, attachments }: { to: string, subject: string, html: string, attachments?: any[] }) {
    console.log("--- Sending Email ---");
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log("Body:");
    console.log(html);
    if (attachments && attachments.length > 0) {
        console.log(`${attachments.length} attachment(s)`);
    }
    console.log("--------------------");

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate success
    return { success: true };
    // To simulate an error, you could throw an error here:
    // throw new Error("Failed to send email");
}


export async function submitContactForm(data: unknown) {
  const parsedData = contactFormSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error('Invalid contact form data.');
  }

  const { name, email, message } = parsedData.data;

  const html = `
    <h1>Nouveau message de contact</h1>
    <p><strong>Nom:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `;

  await sendEmail({
    to: 'contact@vylscapital.com',
    subject: `Nouveau message de ${name}`,
    html,
  });
}

export async function submitLoanApplication(formData: FormData) {

    const data = Object.fromEntries(formData.entries());
    const parsedData = loanApplicationSchema.safeParse(data);

    if (!parsedData.success) {
        console.error(parsedData.error);
        throw new Error('Données de demande de prêt invalides.');
    }

    const { ...fields } = parsedData.data;

    let html = `<h1>Nouvelle demande de prêt</h1>`;
    for (const [key, value] of Object.entries(fields)) {
        if (!(value instanceof File)) {
            html += `<p><strong>${key}:</strong> ${value}</p>`;
        }
    }
    
    const attachments = [];
    if (fields.identityDocument && fields.identityDocument.size > 0) {
        attachments.push({
            filename: fields.identityDocument.name,
            content: Buffer.from(await fields.identityDocument.arrayBuffer()),
        });
    }
    if (fields.proofOfAddress && fields.proofOfAddress.size > 0) {
        attachments.push({
            filename: fields.proofOfAddress.name,
            content: Buffer.from(await fields.proofOfAddress.arrayBuffer()),
        });
    }
    if (fields.proofOfIncome && fields.proofOfIncome.size > 0) {
         attachments.push({
            filename: fields.proofOfIncome.name,
            content: Buffer.from(await fields.proofOfIncome.arrayBuffer()),
        });
    }

    await sendEmail({
        to: 'contact@vylscapital.com',
        subject: `Nouvelle demande de prêt de ${fields.firstName} ${fields.lastName}`,
        html,
        attachments,
    });
}
