import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import InterestRateCalculator from "@/components/site/interest-rate-calculator";

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

        <section className="w-full py-16 md:py-24 bg-muted/30">
          <InterestRateCalculator 
            title="Simulez votre rachat de crédit"
            description="Voyez comment le regroupement de vos prêts peut affecter vos paiements mensuels."
            defaultLoanAmount={40000} 
            defaultTerm={10} 
            defaultRate={2} 
            maxAmount={250000}
            maxTerm={15}
          />
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
