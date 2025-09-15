"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { handleEligibilityCheck } from "@/app/actions";
import type { EligibilityCheckResult } from "@/app/actions";
import { Loader2, Sparkles, TrendingUp, TrendingDown, BadgeCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

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

type FormValues = z.infer<typeof formSchema>;

const ResultCard = ({ result }: { result: EligibilityCheckResult }) => {
  if ("error" in result) {
    return (
      <Card className="bg-destructive/10 border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">An Error Occurred</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{result.error}</p>
        </CardContent>
      </Card>
    );
  }

  const { eligibilityStatus, confidenceScore } = result;
  const isEligible = eligibilityStatus.toLowerCase().includes("eligible");
  const isHighlyEligible = eligibilityStatus.toLowerCase().includes("highly");

  const getStatusIcon = () => {
    if (isHighlyEligible) return <BadgeCheck className="h-10 w-10 text-green-500" />;
    if (isEligible) return <TrendingUp className="h-10 w-10 text-yellow-500" />;
    return <TrendingDown className="h-10 w-10 text-red-500" />;
  };

  return (
    <Card className="border-primary/20 shadow-lg">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">{getStatusIcon()}</div>
        <CardTitle className="text-2xl font-bold">{eligibilityStatus.split('.')[0]}</CardTitle>
        <CardDescription>Based on our AI-powered assessment.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1 text-sm font-medium">
            <span>Confidence Score</span>
            <span>{(confidenceScore * 100).toFixed(0)}%</span>
          </div>
          <Progress value={confidenceScore * 100} className={cn(
            isHighlyEligible && "[&>div]:bg-green-500",
            isEligible && !isHighlyEligible && "[&>div]:bg-yellow-500",
            !isEligible && "[&>div]:bg-red-500",
          )} />
        </div>
        {!isHighlyEligible && (
          <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
            <p className="font-semibold text-foreground mb-2">Suggestions for Improvement:</p>
            <p>{eligibilityStatus.substring(eligibilityStatus.indexOf('.') + 1).trim()}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default function EligibilityChecker() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EligibilityCheckResult | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      annualRevenue: undefined,
      creditScore: undefined,
      yearsInBusiness: undefined,
      loanAmountRequested: undefined,
      reasonForLoan: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setResult(null);
    try {
      const res = await handleEligibilityCheck(values);
      setResult(res);
    } catch (e) {
      setResult({ error: "Failed to process the request." });
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight font-headline">Loan Eligibility Checker</h2>
        </div>
        <p className="text-muted-foreground text-lg">
          Fill out the form with your business details to get an instant, AI-powered assessment of your loan eligibility and personalized suggestions.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="annualRevenue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Revenue ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 250000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="creditScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Credit Score</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="300-850" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="yearsInBusiness"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years in Business</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="loanAmountRequested"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loan Amount Requested ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 50000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="reasonForLoan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Loan</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., To expand operations, purchase new equipment..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Briefly explain why you are seeking this loan.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Assess Eligibility
            </Button>
          </form>
        </Form>
      </div>

      <div className="mt-8 md:mt-0">
        <Card className="bg-card/70 sticky top-24">
          <CardHeader>
            <CardTitle>Your AI Assessment</CardTitle>
            <CardDescription>
              {isLoading
                ? "Analyzing your data..."
                : "Your eligibility results will appear here."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex flex-col items-center justify-center space-y-4 p-8 text-muted-foreground">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="font-medium">Our AI is crunching the numbers...</p>
              </div>
            )}
            {result && <ResultCard result={result} />}
            {!isLoading && !result && (
              <div className="flex flex-col items-center justify-center space-y-4 p-8 text-muted-foreground">
                <Sparkles className="h-12 w-12" />
                <p className="text-center font-medium">Ready when you are!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
