import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

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
      </main>
      <SiteFooter />
    </div>
  );
}
