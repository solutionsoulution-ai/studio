

'use server';

import { createClientAction } from "@/app/actions/clients";
import fs from 'fs/promises';
import path from 'path';

const uploadsPath = path.join(process.cwd(), 'public', 'uploads');

async function saveFile(file: File): Promise<string> {
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const fileExtension = path.extname(file.name);
    const fileName = `${file.name.replace(fileExtension, '')}-${uniqueSuffix}${fileExtension}`;
    const filePath = path.join(uploadsPath, fileName);
    
    // Ensure the directory exists
    await fs.mkdir(uploadsPath, { recursive: true });
    await fs.writeFile(filePath, fileBuffer);

    // Return the public URL path
    return `/uploads/${fileName}`;
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

        const identityDocumentUrl = await saveFile(identityDocument);
        const proofOfAddressUrl = await saveFile(proofOfAddress);
        const proofOfIncomeUrl = await saveFile(proofOfIncome);

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
            // result.clientId is the new ID from createClientAction
            return { success: true, clientId: result.clientId };
        } else {
            return { success: false, error: result.error };
        }

    } catch (error) {
        console.error("Error processing loan application:", error);
        return { success: false, error: "Erreur lors du traitement des fichiers." };
    }
}
