
"use client";

import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, FilePen, Search, HandCoins, Plane, Wrench, GraduationCap, User } from "lucide-react";
import FaqSection from "@/components/site/faq-section";
import HowItWorksSection, { HowItWorksStep } from "@/components/site/how-it-works-section";
import WhySubscribeSection, { type Feature } from "@/components/site/why-subscribe-section";


const personalFaqs = [
  {
    question: "Dois-je justifier l'utilisation des fonds pour un prêt personnel ?",
    answer: "Non, l'un des principaux avantages du prêt personnel est que vous n'avez pas besoin de justifier vos dépenses. Vous pouvez utiliser les fonds librement pour tout type de projet.",
  },
  {
    question: "Quel est le montant maximum que je peux emprunter ?",
    answer: "Le montant maximum pour un prêt personnel est généralement de 75 000 €. Le montant qui vous sera accordé dépendra de votre capacité de remboursement et de votre situation financière.",
  },
  {
    question: "Le taux du prêt personnel est-il fixe ou variable ?",
    answer: "Nous proposons principalement des prêts personnels à taux fixe. Cela signifie que votre taux d'intérêt et vos mensualités restent les mêmes pendant toute la durée du prêt, pour une meilleure maîtrise de votre budget.",
  },
];

const howItWorksSteps: HowItWorksStep[] = [
    {
      icon: "FilePen",
      title: "1. Définissez votre projet",
      description: "Simulez votre prêt en ligne pour déterminer le montant et la durée qui vous conviennent.",
    },
    {
      icon: "Search",
      title: "2. Obtenez une réponse",
      description: "Soumettez votre demande en ligne et notre technologie nous permet de vous donner une réponse de principe immédiate.",
    },
    {
      icon: "HandCoins",
      title: "3. Recevez les fonds",
      description: "Après accord définitif, les fonds sont versés sur votre compte bancaire en quelques jours pour réaliser vos projets.",
    },
];

const whySubscribeFeatures: Feature[] = [
    {
        icon: Plane,
        title: "Financer un voyage",
        description: "Concrétisez vos envies d'évasion, du tour du monde au week-end prolongé, sans piocher dans votre épargne.",
    },
    {
        icon: Wrench,
        title: "Réaliser des travaux",
        description: "Rénovez votre cuisine, aménagez vos combles ou refaites votre décoration grâce à une solution de financement simple.",
    },
    {
        icon: GraduationCap,
        title: "Prévoir un grand événement",
        description: "Financez un mariage, des études, ou faites face à une dépense imprévue avec une trésorerie disponible rapidement.",
    },
];


export default function PretPersonnelPage() {
  const imageUrl = "https://i.postimg.cc/bvVGdwbn/service-personal-loan.jpg";

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="container mx-auto py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 flex items-center gap-3">
                <User className="w-10 h-10 text-primary" />
                Prêt Personnel
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Un projet à financer ? Un voyage, des travaux, ou simplement besoin de trésorerie ? Le prêt personnel est une solution flexible pour réaliser vos envies sans avoir à justifier vos dépenses.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Flexibilité d'utilisation des fonds.</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Taux fixe et mensualités connues à l'avance.</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Processus de demande simple et rapide.</span>
                </li>
              </ul>
              <Button size="lg" asChild>
                <Link href="/demande-de-pret">Commencer ma demande</Link>
              </Button>
            </div>
            <div className="order-1 md:order-2">
              <Image
                src={imageUrl}
                alt="Personne planifiant son budget pour un projet personnel."
                width={600}
                height={400}
                className="rounded-lg shadow-lg object-cover w-full"
              />
            </div>
          </div>
        </section>

        <WhySubscribeSection title="Pourquoi souscrire un Prêt Personnel ?" features={whySubscribeFeatures} />

        <HowItWorksSection steps={howItWorksSteps} />

        <section className="container mx-auto py-16 md:py-24">
          <FaqSection faqs={personalFaqs} title="Questions Fréquentes - Prêt Personnel" />
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
