
"use client";

import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, FilePen, Search, HandCoins, Home, Brush, Building } from "lucide-react";
import FaqSection from "@/components/site/faq-section";
import HowItWorksSection, { HowItWorksStep } from "@/components/site/how-it-works-section";
import WhySubscribeSection, { type Feature } from "@/components/site/why-subscribe-section";

const immoFaqs = [
  {
    question: "Quel est l'apport personnel recommandé pour un prêt immobilier ?",
    answer: "Un apport d'au moins 10% du prix d'achat est généralement conseillé pour couvrir les frais de notaire et de garantie. Un apport plus important peut vous aider à obtenir de meilleures conditions de prêt.",
  },
  {
    question: "Puis-je emprunter sans apport ?",
    answer: "C'est de plus en plus rare, mais possible sous certaines conditions, notamment si vous avez un profil financier très solide (stabilité professionnelle, épargne existante, etc.). Chaque dossier est étudié au cas par cas.",
  },
  {
    question: "Quelle est la durée maximale pour un prêt immobilier ?",
    answer: "La durée de remboursement peut aller jusqu'à 25 ans (300 mois). Une durée plus courte signifie des mensualités plus élevées mais un coût total du crédit plus faible.",
  },
];

const howItWorksSteps: HowItWorksStep[] = [
    {
      icon: "FilePen",
      title: "1. Simulation en Ligne",
      description: "Utilisez notre calculateur pour estimer votre capacité d'emprunt et vos mensualités en quelques clics.",
    },
    {
      icon: "Search",
      title: "2. Étude Personnalisée",
      description: "Un conseiller dédié étudie votre projet et négocie pour vous les meilleures conditions auprès de nos partenaires.",
    },
    {
      icon: "HandCoins",
      title: "3. Signature & Acquisition",
      description: "Après acceptation de l'offre, signez chez le notaire et recevez les clés de votre nouvelle propriété.",
    },
];

const whySubscribeFeatures: Feature[] = [
    {
        icon: Home,
        title: "Acheter votre résidence",
        description: "Devenez propriétaire de votre résidence principale ou secondaire et construisez votre patrimoine sur le long terme.",
    },
    {
        icon: Building,
        title: "Investissement locatif",
        description: "Financez l'acquisition d'un bien destiné à la location pour générer des revenus complémentaires et préparer votre avenir.",
    },
    {
        icon: Brush,
        title: "Financer des travaux",
        description: "Obtenez un prêt pour réaliser des travaux de rénovation, d'agrandissement ou d'amélioration énergétique dans votre bien.",
    },
];

export default function PretImmobilierPage() {
  const imageUrl = "https://i.postimg.cc/SxmyWbfx/pexels-jakubzerdzicki-29799518.jpg";

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="container mx-auto py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 flex items-center gap-3">
                <Home className="w-10 h-10 text-primary" />
                Prêt Immobilier
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Devenez propriétaire de votre résidence principale, secondaire ou réalisez un investissement locatif. Nous vous accompagnons pour trouver le financement le plus adapté à votre projet immobilier.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Accompagnement par des experts du crédit immobilier.</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Des conditions de taux parmi les plus compétitives du marché.</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Flexibilité des modalités de remboursement.</span>
                </li>
              </ul>
              <Button size="lg" asChild>
                <Link href="/demande-de-pret">Commencer ma demande</Link>
              </Button>
            </div>
            <div className="order-1 md:order-2">
              <Image
                src={imageUrl}
                alt="Maquette d'une maison posée sur des plans d'architecte."
                width={600}
                height={400}
                className="rounded-lg shadow-lg object-cover w-full"
              />
            </div>
          </div>
        </section>

        <WhySubscribeSection title="Pourquoi souscrire un Prêt Immobilier ?" features={whySubscribeFeatures} />

        <HowItWorksSection steps={howItWorksSteps} />

        <section className="container mx-auto py-16 md:py-24">
          <FaqSection faqs={immoFaqs} title="Questions Fréquentes - Prêt Immobilier" />
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
