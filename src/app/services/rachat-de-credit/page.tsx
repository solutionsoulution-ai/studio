import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, FilePen, Search, HandCoins } from "lucide-react";
import InterestRateCalculator from "@/components/site/interest-rate-calculator";
import FaqSection from "@/components/site/faq-section";
import HowItWorksSection, { HowItWorksStep } from "@/components/site/how-it-works-section";


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

export default function RachatCreditPage() {
  const image = PlaceHolderImages.find((img) => img.id === "rachat-credit");

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="container mx-auto py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
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
                <Link href="/#eligibilite">Faire une simulation</Link>
              </Button>
            </div>
            <div className="order-1 md:order-2">
              {image && (
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg object-cover w-full"
                  data-ai-hint={image.imageHint}
                />
              )}
            </div>
          </div>
        </section>

        <HowItWorksSection steps={howItWorksSteps} />

        <section className="w-full py-16 md:py-24 bg-muted/30">
          <InterestRateCalculator 
            title="Simulez votre rachat de crédit"
            description="Voyez comment le regroupement de vos prêts peut affecter vos paiements mensuels."
            defaultLoanAmount={40000} 
            defaultTerm={120} 
            defaultRate={2} 
            maxAmount={250000}
            maxTerm={180}
          />
        </section>

        <section className="container mx-auto py-16 md:py-24">
            <FaqSection faqs={creditFaqs} />
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
