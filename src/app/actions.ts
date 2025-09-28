
'use server';

import "dotenv/config"; // Ensure environment variables are loaded
import { type Readable } from 'stream';


export async function handleContactForm(data: { name: string; email: string; message: string; }) {
    console.log('Contact form submitted (email sending disabled):', data);
    // The email sending logic has been removed as requested.
    // We now return success immediately to complete the form flow.
    return { success: true };
}

export async function handleLoanApplication(formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    console.log("Loan application submitted (email sending disabled):", data);

    // The email sending logic has been removed as requested.
    // We now return success immediately to complete the form flow.
    return { success: true };
}
