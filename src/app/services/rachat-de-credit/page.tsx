"use client";

import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, FilePen, Search, HandCoins, Wallet, TrendingDown, Lightbulb } from "lucide-react";
import FaqSection from "@/components/site/faq-section";
import HowItWorksSection, { HowItWorksStep } from "@/components/site/how-it-works-section";
import WhySubscribeSection, { type Feature } from "@/components/site/why-subscribe-section";


const creditFaqs = [
  {
    question: "Quels types de crédits peuvent être rachetés ?",
    answer: "Nous pouvons regrouper la plupart de vos crédits à la consommation : prêts personnels, crédits renouvelables, prêts auto, etc. Les prêts immobiliers peuvent aussi être inclus dans l'opération sous certaines conditions.",
  },
  {
    question: "Le rachat de crédit entraîne-t-il des frais ?",
    answer: "L'opération peut inclure des frais de dossier. De plus, le remboursement anticipé de vos anciens crédits peut engendrer des pénalités. Cependant, l'objectif est que le gain sur vos mensualités compense largement ces frais.",
  },
  {
    question: "Est-ce que le rachat de crédit va vraiment améliorer mon taux d'endettement ?",
    answer: "Oui, c'est l'un des principaux objectifs. En allongeant la durée de remboursement et en négociant un taux unique, nous réduisons le montant total de vos mensualités, ce qui diminue mécaniquement votre taux d'endettement.",
  },
];

const howItWorksSteps: HowItWorksStep[] = [
    {
      icon: "FilePen",
      title: "1. Simulation Gratuite",
      description: "Listez vos crédits en cours et simulez votre nouvelle mensualité unique en quelques minutes.",
    },
    {
      icon: "Search",
      title: "2. Étude de votre Dossier",
      description: "Un expert analyse votre situation financière pour construire la meilleure offre de regroupement.",
    },
    {
      icon: "HandCoins",
      title: "3. Simplifiez vos Finances",
      description: "Nous remboursons vos anciens créanciers. Vous n'avez plus qu'une seule mensualité, plus facile à gérer.",
    },
];

const whySubscribeFeatures: Feature[] = [
    {
        icon: TrendingDown,
        title: "Réduire vos mensualités",
        description: "Allégez votre charge de remboursement mensuelle en regroupant vos prêts et en allongeant la durée, et gagnez en pouvoir d'achat.",
    },
    {
        icon: Wallet,
        title: "Simplifier votre budget",
        description: "Ne gérez plus qu'un seul prélèvement et un seul interlocuteur. La gestion de vos finances personnelles devient plus claire et plus simple.",
    },
    {
        icon: Lightbulb,
        title: "Financer un nouveau projet",
        description: "Profitez du regroupement pour inclure le financement d'un nouveau projet (voiture, travaux...) sans alourdir votre endettement.",
    },
];

export default function RachatCreditPage() {
  const imageUrl = "https://i.postimg.cc/SxVmd1g7/pexels-vlada-karpovich-7434025.jpg";

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="container mx-auto py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fe1c04" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 16c-1.2 1-2 2.5-2 4.5 0 2.8 2.2 5 5 5 2.5 0 4-1.2 5-3-1.2-1-2.5-2-4.5-2-2.8 0-5 2.2-5 5M10 5c-1.2-1-2.5-2-4.5-2-2.8 0-5 2.2-5 5 0 1.2 1 2.5 2 4.5C3.8 13.5 5 14.8 3 16c1-1.2 2-2.5 2-4.5S3.8 6.5 5 5.5c1.2-1 2.5-2 4.5-2 2.8 0 5 2.2 5 5"/><path d="M14 21c1.2-1 2.5-2 4.5-2 2.8 0 5-2.2 5-5s-2.2-5-5-5c-1.2 0-2.5 1-3.5 2-1 1-1.5 2.2-1.5 3.5 0 2.8 2.2 5 5 5Z"/></svg>
                Rachat de Crédit
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Regroupez tous vos crédits en un seul pour réduire vos mensualités et simplifier la gestion de votre budget. Respirez et reprenez le contrôle de vos finances.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Une seule mensualité, un seul interlocuteur.</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Baisse potentielle de votre taux d'endettement.</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Possibilité de financer un nouveau projet en même temps.</span>
                </li>
              </ul>
              <Button size="lg" asChild>
                <Link href="/demande-de-pret">Commencer ma demande</Link>
              </Button>
            </div>
            <div className="order-1 md:order-2">
              <Image
                src={imageUrl}
                alt="Plusieurs cartes de crédit et factures organisées sur un bureau."
                width={600}
                height={400}
                className="rounded-lg shadow-lg object-cover w-full"
              />
            </div>
          </div>
        </section>

        <WhySubscribeSection title="Pourquoi faire un Rachat de Crédit ?" features={whySubscribeFeatures} />

        <HowItWorksSection steps={howItWorksSteps} />

        <section className="w-full py-16 md:py-24 bg-muted/30">
          {/* Calculateur retiré pour la compilation Next.js */}
        </section>

        <section className="container mx-auto py-16 md:py-24">
            <FaqSection faqs={creditFaqs} />
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
