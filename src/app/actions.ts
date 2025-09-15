"use server";

import {
  assessLoanEligibility,
  type LoanEligibilityInput,
  type LoanEligibilityOutput,
} from "@/ai/flows/loan-eligibility-assessment";
import { z } from "zod";

// Schema for Loan Eligibility
const loanEligibilityFormSchema = z.object({
  annualRevenue: z.coerce
    .number({ required_error: "Annual revenue is required." })
    .positive("Annual revenue must be a positive number."),
  creditScore: z.coerce
    .number({ required_error: "Credit score is required." })
    .min(300, "Credit score must be at least 300.")
    .max(850, "Credit score cannot be more than 850."),
  yearsInBusiness: z.coerce
    .number({ required_error: "Years in business is required." })
    .min(0, "Years in business cannot be negative."),
  loanAmountRequested: z.coerce
    .number({ required_error: "Loan amount is required." })
    .positive("Loan amount must be a positive number."),
  reasonForLoan: z
    .string({ required_error: "Reason for loan is required." })
    .min(10, "Please provide a more detailed reason (at least 10 characters)."),
});

export type EligibilityCheckResult = LoanEligibilityOutput | { error: string };

export async function handleEligibilityCheck(
  formData: LoanEligibilityInput
): Promise<EligibilityCheckResult> {
  const parsed = loanEligibilityFormSchema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => i.message).join(", ");
    return { error: `Invalid form data: ${issues}` };
  }

  try {
    const result = await assessLoanEligibility(parsed.data);

    if (process.env.WEBHOOK_URL) {
      try {
        await fetch(process.env.WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formData: parsed.data,
            eligibilityResult: result,
          }),
        });
      } catch (webhookError) {
        console.error("Error sending data to loan webhook:", webhookError);
      }
    }

    return result;
  } catch (error) {
    console.error("Error in assessLoanEligibility flow:", error);
    return {
      error: "An unexpected error occurred while assessing eligibility. Please try again later.",
    };
  }
}


// Schema for Contact Form
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type ContactFormResult = { success: boolean; error?: string };

export async function handleContactForm(
  formData: ContactFormInput
): Promise<ContactFormResult> {
  const parsed = contactFormSchema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => i.message).join(", ");
    return { success: false, error: `Invalid form data: ${issues}` };
  }
  
  if (process.env.CONTACT_WEBHOOK_URL) {
    try {
      await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });
    } catch (webhookError) {
      console.error("Error sending data to contact webhook:", webhookError);
      // We don't return an error to the client here, just log it. 
      // The main goal is to show the user their message was "sent".
    }
  } else {
    // Log to console if no webhook is configured, so data is not lost.
    console.log("Contact form submitted (no webhook configured):", parsed.data);
  }

  // Assume success if it passes validation and the attempt to send is made.
  return { success: true };
}
