
"use client";

import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Loader, CircleDashed, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/lib/types";

interface ClientTransactionProgressProps {
    transaction: Transaction;
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
    }).format(value || 0);
};

const steps = [
    { name: "Initié", progress: 0 },
    { name: "En traitement", progress: 5 },
    { name: "Arrivée prévue", progress: 95 },
];


export default function ClientTransactionProgress({ transaction }: ClientTransactionProgressProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const calculateProgress = () => {
            if (!transaction.created_at || !transaction.estimatedCompletionDate) {
                setProgress(0);
                return;
            }
            const now = new Date().getTime();
            const startTime = new Date(transaction.created_at).getTime();
            const endTime = new Date(transaction.estimatedCompletionDate).getTime();

            if (now >= endTime) {
                setProgress(100);
                return;
            }
            
            if (startTime >= endTime) {
                setProgress(100);
                return;
            }

            const totalDuration = endTime - startTime;
            const elapsedTime = now - startTime;
            const currentProgress = Math.min((elapsedTime / totalDuration) * 100, 100);

            setProgress(currentProgress);
        };

        calculateProgress(); // Initial calculation
        const interval = setInterval(calculateProgress, 10000); // Update every 10 seconds

        return () => clearInterval(interval);
    }, [transaction]);

    const getStepStatus = (stepProgress: number, currentProgress: number) => {
        if (currentProgress >= stepProgress) {
            if (currentProgress >= 100 && stepProgress === 95) return 'current';
            return 'completed';
        }
        if (stepProgress > currentProgress) {
            const previousStep = steps.slice().reverse().find(s => s.progress < stepProgress);
            if (previousStep && currentProgress >= previousStep.progress) {
                 return 'current';
            }
        }
        return 'upcoming';
    };

    return (
        <div className="p-4 border rounded-lg bg-background">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <Send className="w-5 h-5 text-primary" />
                    <div>
                        <p className="font-semibold">{transaction.reason}</p>
                        <p className="text-sm text-muted-foreground">
                            Virement vers {transaction.recipient_name || "Bénéficiaire inconnu"}
                        </p>
                    </div>
                </div>
                <p className="font-bold text-lg text-red-600">{formatCurrency(transaction.amount)}</p>
            </div>
            
            <Progress value={progress} className="w-full h-2" />

            <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                {steps.map((step) => {
                    const status = getStepStatus(step.progress, progress);
                    return (
                        <div key={step.name} className={cn("flex items-center gap-1.5", status !== 'upcoming' && 'text-foreground')}>
                            {status === 'completed' && <CheckCircle className="w-4 h-4 text-green-500" />}
                            {status === 'current' && <Loader className="w-4 h-4 animate-spin" />}
                            {status === 'upcoming' && <CircleDashed className="w-4 h-4" />}
                             <span className="font-medium">{step.name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
