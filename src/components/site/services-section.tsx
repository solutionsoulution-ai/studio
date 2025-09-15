import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, User, Home, Car, Recycle, ArrowRight, Grid3x3 } from "lucide-react";
import { Button } from "../ui/button";

const services = [
  {
    title: "Prêt Entreprise",
    description: "Des solutions pour financer vos investissements, votre croissance et votre trésorerie.",
    href: "/services/pret-entreprise",
    icon: Briefcase,
  },
  {
    title: "Prêt Immobilier",
    description: "Devenez propriétaire de votre résidence principale ou réalisez un investissement locatif.",
    href: "/services/pret-immo",
    icon: Home,
  },
  {
    title: "Prêt Personnel",
    description: "Financez un projet, un voyage, des travaux, ou un besoin de trésorerie sans justificatif.",
    href: "/services/pret-personnel",
    icon: User,
  },
  {
    title: "Prêt Auto",
    description: "Financez votre véhicule neuf ou d'occasion avec nos solutions de crédit adaptées.",
    href: "/services/pret-auto",
    icon: Car,
  },
  {
    title: "Rachat de Crédit",
    description: "Regroupez tous vos crédits en un seul pour réduire vos mensualités et simplifier votre budget.",
    href: "/services/rachat-de-credit",
    icon: Recycle,
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="container mx-auto py-16 md:py-24">
      <div className="text-center mb-10">
        <div className="flex items-center gap-3 justify-center">
            <Grid3x3 className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold tracking-tight font-headline">Explorez Nos Solutions de Financement</h2>
        </div>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Que vous soyez un particulier ou une entreprise, nous avons une solution de prêt adaptée à vos besoins. Découvrez nos offres.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.title} className="flex flex-col group hover:border-primary transition-all">
            <CardHeader>
              <div className="mb-4">
                <service.icon className="w-10 h-10 text-primary" />
              </div>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
              <Button variant="link" asChild className="p-0">
                <Link href={service.href}>
                  En savoir plus
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
