import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import InterestRateCalculator from "@/components/site/interest-rate-calculator";
import FaqSection from "@/components/site/faq-section";

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
    answer: "La durée de remboursement peut aller jusqu'à 25 ans, voire 30 ans dans de très rares cas. Une durée plus courte signifie des mensualités plus élevées mais un coût total du crédit plus faible.",
  },
];

export default function PretImmobilierPage() {
  const image = PlaceHolderImages.find((img) => img.id === "pret-immo");

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="container mx-auto py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
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
                <Link href="/#eligibilite">Démarrer mon projet</Link>
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
            title="Calculez votre prêt immobilier"
            description="Simulez les mensualités de votre futur achat immobilier en ajustant le montant et la durée."
            defaultLoanAmount={200000} 
            defaultTerm={25} 
            defaultRate={2} 
            maxAmount={1500000}
            maxTerm={30}
          />
        </section>

        <section className="container mx-auto py-16 md:py-24">
          <FaqSection faqs={immoFaqs} />
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
