
'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { type ClientProfile } from '@/app/actions/clients';
import { createClientAction } from "@/app/actions/clients";
import { revalidatePath } from 'next/cache';

// Chemin vers le fichier JSON qui sert de base de données
const dataFilePath = path.join(process.cwd(), 'src/data/clients.json');

// --- Fonctions pour lire et écrire dans le fichier JSON ---

async function readData(): Promise<ClientProfile[]> {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    // Si le fichier n'existe pas ou est vide, retourner un tableau vide.
    return [];
  }
}

async function writeData(data: ClientProfile[]): Promise<void> {
  // NOTE: Cette opération échouera dans un environnement de production en lecture seule.
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error("Échec de l'écriture dans le fichier de données. L'environnement est probablement en lecture seule.", error);
    // Dans un cas réel, on pourrait utiliser une base de données externe (ex: Supabase) pour éviter ce problème.
  }
}

// --- Fin des fonctions de lecture/écriture ---


async function saveFile(file: File): Promise<string> {
    // Cette fonction est un placeholder. En production, il faudrait uploader sur un service de stockage (S3, Supabase Storage, etc.)
    // Pour l'instant, nous ne sauvegardons pas le fichier mais retournons un chemin fictif.
    console.warn("La sauvegarde de fichier n'est pas implémentée pour la production. Le fichier n'a pas été sauvegardé.");
    return `/uploads/${Date.now()}-${file.name}`;
}


export async function handleContactForm(data: { name: string; email: string; message: string; }) {
  console.log('Contact form submitted:', data);
  // This will create a "client" profile with a specific transaction for the contact message
  const result = await createClientAction({
      email: data.email,
      password: Math.random().toString(36).slice(-8), // Dummy password
      initialBalance: 0,
      contactMessage: `Message de ${data.name}: ${data.message}` // Pass the message
  });
  
  if (result.success) {
    revalidatePath('/admin/soumissions');
  }
  return result;
}

export async function handleLoanApplication(formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    console.log("Loan application submitted:", data);

    try {
        const identityDocument = formData.get('identityDocument') as File;
        const proofOfAddress = formData.get('proofOfAddress') as File;
        const proofOfIncome = formData.get('proofOfIncome') as File;

        if (!identityDocument || !proofOfAddress || !proofOfIncome) {
            return { success: false, error: "Un ou plusieurs documents sont manquants." };
        }

        // Upload files in parallel
        const [identityDocumentUrl, proofOfAddressUrl, proofOfIncomeUrl] = await Promise.all([
            saveFile(identityDocument),
            saveFile(proofOfAddress),
            saveFile(proofOfIncome)
        ]);

        const clientData = {
            email: data.email as string,
            password: Math.random().toString(36).slice(-8), // Dummy password
            initialBalance: 0,
            has_loan: true, // Mark this profile as a loan application
            loan_type: data.loanType as string,
            loan_amount: Number(data.loanAmount),
            loan_term: Number(data.loanTerm),
            // Add other personal info to be stored
            first_name: data.firstName as string,
            last_name: data.lastName as string,
            phone: data.phone as string,
            address: data.address as string,
            city: data.city as string,
            postal_code: data.postalCode as string,
            country: data.country as string,
            marital_status: data.maritalStatus as string,
            number_of_children: Number(data.numberOfChildren),
            birth_date: `${data.birthYear}-${String(data.birthMonth).padStart(2, '0')}-${String(data.birthDay).padStart(2, '0')}`,
            occupation: data.occupation as string,
            monthly_income: Number(data.monthlyIncome),
            monthly_expenses: Number(data.monthlyExpenses),
            // Document URLs
            identity_document_url: identityDocumentUrl,
            proof_of_address_url: proofOfAddressUrl,
            proof_of_income_url: proofOfIncomeUrl,
        };

        // This will create a client profile with all loan details
        const result = await createClientAction(clientData);

        if (result.success) {
            revalidatePath('/admin/soumissions');
            return { success: true, clientId: result.clientId };
        } else {
            return { success: false, error: result.error };
        }

    } catch (error) {
        console.error("Error processing loan application:", error);
        return { success: false, error: "Erreur lors du traitement des fichiers." };
    }
}
