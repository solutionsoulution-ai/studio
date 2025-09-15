"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator } from "lucide-react";

export default function InterestRateCalculator() {
  const [loanAmount, setLoanAmount] = useState(50000);
  const [interestRate, setInterestRate] = useState(7.5);
  const [loanTerm, setLoanTerm] = useState(5);

  const monthlyPayment = useMemo(() => {
    if (loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) {
      return 0;
    }
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const payment =
      loanAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    return payment;
  }, [loanAmount, interestRate, loanTerm]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="container mx-auto">
        <div className="mx-auto max-w-3xl text-center">
            <div className="flex items-center gap-3 justify-center">
                <Calculator className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold tracking-tight font-headline">Loan Repayment Calculator</h2>
            </div>
            <p className="mt-4 text-lg text-muted-foreground">
                Use our simple calculator to estimate your monthly loan payments. Adjust the sliders to see how the loan amount, interest rate, and term affect your payments.
            </p>
        </div>

        <Card className="mt-10 max-w-4xl mx-auto shadow-lg">
            <CardContent className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
                <div className="space-y-8">
                    <div>
                        <Label htmlFor="loanAmount" className="text-lg">Loan Amount</Label>
                        <p className="text-2xl font-bold text-primary">{formatCurrency(loanAmount)}</p>
                        <Slider
                            id="loanAmount"
                            min={1000}
                            max={500000}
                            step={1000}
                            value={[loanAmount]}
                            onValueChange={(value) => setLoanAmount(value[0])}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <Label htmlFor="interestRate" className="text-lg">Interest Rate</Label>
                        <p className="text-2xl font-bold text-primary">{interestRate.toFixed(1)}%</p>
                        <Slider
                            id="interestRate"
                            min={1}
                            max={25}
                            step={0.1}
                            value={[interestRate]}
                            onValueChange={(value) => setInterestRate(value[0])}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <Label htmlFor="loanTerm" className="text-lg">Loan Term</Label>
                        <p className="text-2xl font-bold text-primary">{loanTerm} {loanTerm > 1 ? 'Years' : 'Year'}</p>
                        <Slider
                            id="loanTerm"
                            min={1}
                            max={30}
                            step={1}
                            value={[loanTerm]}
                            onValueChange={(value) => setLoanTerm(value[0])}
                            className="mt-2"
                        />
                    </div>
                </div>

                <div className="bg-primary text-primary-foreground rounded-lg p-8 flex flex-col items-center justify-center text-center">
                    <p className="text-lg font-medium opacity-80">Estimated Monthly Payment</p>
                    <p className="text-5xl font-extrabold tracking-tight mt-2">
                        {formatCurrency(monthlyPayment)}
                    </p>
                    <p className="mt-4 opacity-80 text-sm">
                        This is an estimate and does not constitute a loan offer. Actual payments may vary.
                    </p>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
