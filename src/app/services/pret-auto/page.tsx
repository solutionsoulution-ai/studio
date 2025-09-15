import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, FilePen, Bot, HandCoins } from "lucide-react";
import InterestRateCalculator from "@/components/site/interest-rate-calculator";
import FaqSection from "@/components/site/faq-section";
import HowItWorksSection, { HowItWorksStep } from "@/components/site/how-it-works-section";


const autoFaqs = [
  {
    question: "Le prêt auto peut-il financer un véhicule d'occasion ?",
    answer: "Oui, nos solutions de financement couvrent aussi bien les véhicules neufs que les véhicules d'occasion achetés auprès d'un professionnel ou d'un particulier.",
  },
  {
    question: "Est-ce que l'assurance du véhicule est incluse ?",
    answer: "L'assurance du véhicule n'est pas directement incluse dans le prêt auto. Cependant, nous pouvons vous proposer des solutions d'assurance partenaires à des tarifs préférentiels.",
  },
  {
    question: "Puis-je faire un remboursement anticipé de mon prêt auto ?",
    answer: "Oui, vous pouvez rembourser tout ou partie de votre prêt auto par anticipation, conformément à la législation en vigueur. Des indemnités peuvent s'appliquer dans certains cas.",
  },
];

const howItWorksSteps: HowItWorksStep[] = [
    {
      icon: FilePen,
      title: "1. Demande Rapide",
      description: "Faites votre demande en quelques minutes et recevez une réponse de principe immédiate.",
    },
    {
      icon: Bot,
      title: "2. Approbation Intelligente",
      description: "Notre IA analyse votre profil pour vous fournir une offre ferme rapidement, souvent en quelques heures.",
    },
    {
      icon: HandCoins,
      title: "3. Prenez la Route",
      description: "Après signature électronique, les fonds sont virés au vendeur et vous pouvez récupérer votre voiture.",
    },
];

export default function PretAutoPage() {
  const image = PlaceHolderImages.find((img) => img.id === "pret-auto");

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="container mx-auto py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
                Prêt Auto
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Financez l'achat de votre véhicule neuf ou d'occasion avec nos solutions de crédit auto. Profitez d'une procédure rapide pour prendre la route en toute sérénité.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Réponse de principe immédiate en ligne.</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Financez jusqu'à 100% du prix d'achat.</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Pas de frais de dossier cachés.</span>
                </li>
              </ul>
              <Button size="lg" asChild>
                <Link href="/#eligibilite">Calculer mon prêt auto</Link>
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
            title="Estimez vos mensualités auto"
            description="Ajustez le montant et la durée pour simuler le remboursement de votre prêt auto."
            defaultLoanAmount={20000} 
            defaultTerm={5} 
            defaultRate={2} 
            maxAmount={75000}
            maxTerm={7}
          />
        </section>

        <section className="container mx-auto py-16 md:py-24">
            <FaqSection faqs={autoFaqs} />
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
