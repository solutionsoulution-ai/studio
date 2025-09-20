

'use server';

import { createClientAction, deleteClientAction } from "@/app/actions/clients";
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'clients.json');
const uploadsPath = path.join(process.cwd(), 'public', 'uploads');

async function saveFile(file: File) {
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const fileExtension = path.extname(file.name);
    const fileName = `${file.name.replace(fileExtension, '')}-${uniqueSuffix}${fileExtension}`;
    const filePath = path.join(uploadsPath, fileName);
    
    await fs.mkdir(uploadsPath, { recursive: true });
    await fs.writeFile(filePath, fileBuffer);

    return `/uploads/${fileName}`;
}

export async function handleContactForm(data: { name: string; email: string; message: string; }) {
  console.log('Contact form submitted:', data);
  // This will create a "client" profile for the contact message to be viewed in the admin panel
  const result = await createClientAction({
      email: data.email,
      password: Math.random().toString(36).slice(-8), // Dummy password
      initialBalance: 0,
      contactMessage: `Message de ${data.name}: ${data.message}`
  });
  
  return result;
}


// This function is placeholder for actual logic.
export async function handleLoanApplication(formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    console.log("Loan application submitted:", data);

    try {
        const identityDocument = formData.get('identityDocument') as File;
        const proofOfAddress = formData.get('proofOfAddress') as File;
        const proofOfIncome = formData.get('proofOfIncome') as File;

        const identityDocumentUrl = await saveFile(identityDocument);
        const proofOfAddressUrl = await saveFile(proofOfAddress);
        const proofOfIncomeUrl = await saveFile(proofOfIncome);

        const clientData = {
            email: data.email as string,
            password: Math.random().toString(36).slice(-8),
            initialBalance: 0,
            loan_type: data.loanType as string,
            loan_amount: Number(data.loanAmount),
            loan_term: Number(data.loanTerm),
            identity_document_url: identityDocumentUrl,
            proof_of_address_url: proofOfAddressUrl,
            proof_of_income_url: proofOfIncomeUrl,
        };

        const result = await createClientAction(clientData);

        if (result.success) {
            return { success: true, applicationId: result.clientId };
        } else {
            return { success: false, error: result.error };
        }

    } catch (error) {
        console.error("Error processing loan application:", error);
        return { success: false, error: "Erreur lors du traitement des fichiers." };
    }
}

// We need to export this function to use it in other actions
export { deleteClientAction };
