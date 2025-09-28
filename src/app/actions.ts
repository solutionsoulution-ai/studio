
'use server';

import "dotenv/config"; // Ensure environment variables are loaded
import nodemailer from 'nodemailer';
import { type Readable } from 'stream';

const recipientEmail = process.env.NEXT_PUBLIC_SMTP_RECIPIENT_EMAIL;

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function handleContactForm(data: { name: string; email: string; message: string; }) {
    console.log('Contact form submitted:', data);

    if (!process.env.SMTP_HOST || !recipientEmail) {
        console.error("SMTP environment variables are not set.");
        return { success: false, error: "Le serveur n'est pas configuré pour envoyer des emails." };
    }

    try {
        await transporter.sendMail({
            from: `Vylsfond <${process.env.SMTP_USER}>`,
            to: recipientEmail,
            subject: `Nouveau Message de Contact de ${data.name}`,
            html: `
                <h1>Nouveau Message de Contact</h1>
                <p><strong>Nom:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <hr>
                <p><strong>Message:</strong></p>
                <p>${data.message}</p>
            `,
        });
        return { success: true };
    } catch (error) {
        console.error("Error sending contact email:", error);
        return { success: false, error: "L'envoi de l'email a échoué." };
    }
}

export async function handleLoanApplication(formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    console.log("Loan application submitted via SMTP:", data);

    if (!process.env.SMTP_HOST || !recipientEmail) {
        console.error("SMTP environment variables are not set.");
        return { success: false, error: "Le serveur n'est pas configuré pour envoyer des emails." };
    }
    
    try {
        const identityDocument = formData.get('identityDocument') as File;
        const proofOfAddress = formData.get('proofOfAddress') as File;
        const proofOfIncome = formData.get('proofOfIncome') as File;

        if (!identityDocument || !proofOfAddress || !proofOfIncome) {
            return { success: false, error: "Un ou plusieurs documents sont manquants." };
        }
        
        const identityDocumentBuffer = Buffer.from(await identityDocument.arrayBuffer());
        const proofOfAddressBuffer = Buffer.from(await proofOfAddress.arrayBuffer());
        const proofOfIncomeBuffer = Buffer.from(await proofOfIncome.arrayBuffer());


        const clientData = {
            email: data.email as string,
            loanType: data.loanType as string,
            loanAmount: Number(data.loanAmount),
            loanTerm: Number(data.loanTerm),
            firstName: data.firstName as string,
            lastName: data.lastName as string,
            phone: data.phone as string,
            address: data.address as string,
            city: data.city as string,
            postalCode: data.postalCode as string,
            country: data.country as string,
            maritalStatus: data.maritalStatus as string,
            numberOfChildren: Number(data.numberOfChildren),
            birthDate: `${data.birthYear}-${String(data.birthMonth).padStart(2, '0')}-${String(data.birthDay).padStart(2, '0')}`,
            occupation: data.occupation as string,
            monthlyIncome: Number(data.monthlyIncome),
            monthlyExpenses: Number(data.monthlyExpenses),
        };
        
        await transporter.sendMail({
            from: `Vylsfond <${process.env.SMTP_USER}>`,
            to: recipientEmail,
            subject: `Nouvelle Demande de Prêt - ${clientData.lastName}`,
            html: `
                <h1>Nouvelle Demande de Prêt</h1>
                <h2>Informations Personnelles</h2>
                <ul>
                    <li><strong>Nom:</strong> ${clientData.firstName} ${clientData.lastName}</li>
                    <li><strong>Email:</strong> ${clientData.email}</li>
                    <li><strong>Téléphone:</strong> ${clientData.phone}</li>
                    <li><strong>Date de naissance:</strong> ${clientData.birthDate}</li>
                    <li><strong>Adresse:</strong> ${clientData.address}, ${clientData.postalCode} ${clientData.city}, ${clientData.country}</li>
                    <li><strong>Situation familiale:</strong> ${clientData.maritalStatus}</li>
                    <li><strong>Nombre d'enfants:</strong> ${clientData.numberOfChildren}</li>
                </ul>
                <h2>Situation Financière</h2>
                <ul>
                    <li><strong>Profession:</strong> ${clientData.occupation}</li>
                    <li><strong>Revenu mensuel:</strong> ${clientData.monthlyIncome} €</li>
                    <li><strong>Charges mensuelles:</strong> ${clientData.monthlyExpenses} €</li>
                </ul>
                <h2>Détails du Prêt</h2>
                <ul>
                    <li><strong>Type:</strong> ${clientData.loanType}</li>
                    <li><strong>Montant:</strong> ${clientData.loanAmount} €</li>
                    <li><strong>Durée:</strong> ${clientData.loanTerm} mois</li>
                </ul>
                <p>Les documents justificatifs sont attachés à cet email.</p>
            `,
            attachments: [
                {
                    filename: identityDocument.name,
                    content: identityDocumentBuffer,
                    contentType: identityDocument.type,
                },
                {
                    filename: proofOfAddress.name,
                    content: proofOfAddressBuffer,
                    contentType: proofOfAddress.type,
                },
                {
                    filename: proofOfIncome.name,
                    content: proofOfIncomeBuffer,
                    contentType: proofOfIncome.type,
                },
            ]
        });

        return { success: true };

    } catch (error) {
        console.error("Error processing loan application:", error);
        return { success: false, error: "Erreur lors du traitement de la demande." };
    }
}
