import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, Landmark, FilePen, Search, HandCoins, Building2, TrendingUp, Briefcase } from "lucide-react";
import FaqSection from "@/components/site/faq-section";
import InterestRateCalculator from "@/components/site/interest-rate-calculator";
import HowItWorksSection, { HowItWorksStep } from "@/components/site/how-it-works-section";
import WhySubscribeSection, { type Feature } from "@/components/site/why-subscribe-section";


const businessFaqs = [
  {
    question: "Quels types de financements proposez-vous aux entreprises ?",
    answer: "Nous offrons une gamme complète de solutions, incluant des prêts à terme pour les investissements, des lignes de crédit pour la gestion de la trésorerie, du financement d'équipement, et des solutions de fonds de roulement.",
  },
  {
    question: "Mon entreprise est jeune, suis-je éligible ?",
    answer: "Oui, nous finançons également les startups et les jeunes entreprises. L'éligibilité dépendra de votre business plan, de vos projections financières et du profil des fondateurs. N'hésitez pas à utiliser notre simulateur pour une première évaluation.",
  },
  {
    question: "Quels documents sont nécessaires pour une demande de prêt entreprise ?",
    answer: "Pour une analyse complète, préparez votre Kbis, vos derniers bilans comptables (si existants), un prévisionnel financier, les statuts de la société et les pièces d'identité des dirigeants.",
  },
];

const howItWorksSteps: HowItWorksStep[] = [
    {
      icon: "FilePen",
      title: "1. Demande en Ligne",
      description: "Remplissez notre formulaire sécurisé avec les informations de votre entreprise et vos besoins de financement.",
    },
    {
      icon: "Search",
      title: "2. Analyse du Dossier",
      description: "Nos experts analysent votre dossier et la viabilité de votre projet pour vous proposer la meilleure solution.",
    },
    {
      icon: "HandCoins",
      title: "3. Déblocage des Fonds",
      description: "Après approbation, les fonds sont rapidement transférés sur votre compte professionnel pour lancer vos projets.",
    },
];

const whySubscribeFeatures: Feature[] = [
    {
        icon: Building2,
        title: "Investir dans vos locaux",
        description: "Financez l'achat ou la rénovation de vos bureaux, ateliers ou locaux commerciaux pour offrir un meilleur environnement à vos équipes.",
    },
    {
        icon: TrendingUp,
        title: "Soutenir votre croissance",
        description: "Obtenez les fonds nécessaires pour développer de nouveaux marchés, lancer de nouveaux produits ou renforcer vos équipes.",
    },
    {
        icon: Briefcase,
        title: "Optimiser votre trésorerie",
        description: "Gérez les décalages de paiement et assurez la fluidité de votre cycle d'exploitation avec une ligne de crédit adaptée.",
    },
];

export default function PretEntreprisePage() {
  const image = PlaceHolderImages.find((img) => img.id === "pret-entreprise");

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="container mx-auto py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 flex items-center gap-3">
                <Landmark className="w-10 h-10 text-primary" />
                Prêt Entreprise
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Accélérez votre croissance avec des solutions de financement adaptées aux professionnels. Que ce soit pour un investissement, un besoin de trésorerie ou le lancement d'un projet, nous sommes à vos côtés.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Analyse rapide de votre dossier par nos experts.</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Financements flexibles adaptés à votre cycle d'exploitation.</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Conseils stratégiques pour optimiser votre plan de financement.</span>
                </li>
              </ul>
              <Button size="lg" asChild>
                <Link href="/#eligibilite">Tester mon éligibilité</Link>
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

        <WhySubscribeSection title="Pourquoi souscrire un Prêt Entreprise ?" features={whySubscribeFeatures} />

        <HowItWorksSection steps={howItWorksSteps} />

        <section className="w-full py-16 md:py-24 bg-muted/30">
           <InterestRateCalculator 
              title="Simulez votre financement professionnel"
              description="Estimez les remboursements pour vos projets d'investissement, de développement ou de trésorerie."
              defaultLoanAmount={100000} 
              defaultTerm={84} 
              maxAmount={1000000} 
            />
        </section>

        <section className="container mx-auto py-16 md:py-24">
          <FaqSection faqs={businessFaqs} />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
