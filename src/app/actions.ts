"use server";

import {
  assessLoanEligibility,
  type LoanEligibilityInput,
  type LoanEligibilityOutput,
} from "@/ai/flows/loan-eligibility-assessment";
import { z } from "zod";

export type EligibilityCheckResult = LoanEligibilityOutput | { error: string };

const formSchema = z.object({
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


export async function handleEligibilityCheck(
  formData: LoanEligibilityInput
): Promise<EligibilityCheckResult> {
  const parsed = formSchema.safeParse(formData);

  if (!parsed.success) {
    // This shouldn't happen with client-side validation, but it's good practice.
    const issues = parsed.error.issues.map((i) => i.message).join(", ");
    return { error: `Invalid form data: ${issues}` };
  }

  try {
    const result = await assessLoanEligibility(parsed.data);
    return result;
  } catch (error) {
    console.error("Error in assessLoanEligibility flow:", error);
    return {
      error: "An unexpected error occurred while assessing eligibility. Please try again later.",
    };
  }
}
