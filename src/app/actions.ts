
'use server';

import { createClientAction } from "@/app/actions/clients";
import { revalidatePath } from 'next/cache';
import { supabase } from "@/lib/supabase-client";
import { v4 as uuidv4 } from "uuid";

export async function saveFile(file: File): Promise<string> {
    if (!supabase) {
        throw new Error("Supabase client is not initialized.");
    }
    
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = `documents/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('documents') // Assurez-vous que ce bucket existe et est public
        .upload(filePath, file);

    if (uploadError) {
        console.error("Supabase upload error:", uploadError);
        throw new Error("Failed to upload file to Supabase Storage");
    }

    const { data } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

    if (!data || !data.publicUrl) {
         throw new Error("Failed to get public URL for the file");
    }
    
    return data.publicUrl;
}

export async function handleContactForm(data: { name: string; email: string; message: string; }) {
  console.log('Contact form submitted:', data);
  const result = await createClientAction({
      email: data.email,
      password: Math.random().toString(36).slice(-8),
      initialBalance: 0,
      contactMessage: `Message de ${data.name}: ${data.message}`
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
        
        // Upload files to Supabase Storage
        const [identityDocumentUrl, proofOfAddressUrl, proofOfIncomeUrl] = await Promise.all([
            saveFile(identityDocument),
            saveFile(proofOfAddress),
            saveFile(proofOfIncome)
        ]);

        const clientData = {
            email: data.email as string,
            password: Math.random().toString(36).slice(-8),
            initialBalance: 0,
            has_loan: true,
            loan_type: data.loanType as string,
            loan_amount: Number(data.loanAmount),
            loan_term: Number(data.loanTerm),
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
            identity_document_url: identityDocumentUrl,
            proof_of_address_url: proofOfAddressUrl,
            proof_of_income_url: proofOfIncomeUrl,
        };

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
