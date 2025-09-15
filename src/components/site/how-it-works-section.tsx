"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { FilePen, DollarSign, HandCoins, Search, Bot } from 'lucide-react';


export type HowItWorksStep = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type HowItWorksSectionProps = {
  steps: HowItWorksStep[];
  title?: string;
};

export default function HowItWorksSection({
  steps,
  title = "Comment ça marche ?",
}: HowItWorksSectionProps) {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight font-headline">{title}</h2>
            <p className="mt-4 text-lg text-muted-foreground">
            Suivez ces étapes simples pour obtenir votre financement.
            </p>
        </div>

        <div className="relative">
             {/* Ligne pointillée */}
             <div className="absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-border -translate-y-1/2 hidden md:block" aria-hidden="true" />
            
            <div className="relative grid md:grid-cols-3 gap-12">
                {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                    <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground mb-4 ring-8 ring-background">
                        <step.icon className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
