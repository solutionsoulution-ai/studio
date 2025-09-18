import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Grid3x3 } from "lucide-react";
import { Button } from "../ui/button";

const services = [
  {
    title: "Prêt Entreprise",
    description: "Des solutions pour financer vos investissements, votre croissance et votre trésorerie.",
    href: "/services/pret-entreprise",
    image: "https://i.postimg.cc/Fzj4LTfS/pret-entreprise.jpg",
  },
  {
    title: "Prêt Immobilier",
    description: "Devenez propriétaire de votre résidence principale ou réalisez un investissement locatif.",
    href: "/services/pret-immo",
    image: "https://i.postimg.cc/SxmyWbfx/pexels-jakubzerdzicki-29799518.jpg",
  },
  {
    title: "Prêt Personnel",
    description: "Financez un projet, un voyage, des travaux, ou un besoin de trésorerie sans justificatif.",
    href: "/services/pret-personnel",
    image: "https://i.postimg.cc/bvVGdwbn/service-personal-loan.jpg",
  },
  {
    title: "Prêt Auto",
    description: "Financez votre véhicule neuf ou d'occasion avec nos solutions de crédit adaptées.",
    href: "/services/pret-auto",
    image: "https://i.postimg.cc/QMyhG9GF/pexels-pixabay-210019.jpg",
  },
  {
    title: "Rachat de Crédit",
    description: "Regroupez tous vos crédits en un seul pour réduire vos mensualités et simplifier votre budget.",
    href: "/services/rachat-de-credit",
    image: "https://i.postimg.cc/SxVmd1g7/pexels-vlada-karpovich-7434025.jpg",
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
        {services.map((service, index) => (
          <Card key={service.title} className="flex flex-col group hover:border-primary transition-all overflow-hidden">
            <div className="relative h-48 w-full">
              <Image 
                src={service.image}
                alt={`Image pour ${service.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index < 3}
              />
            </div>
            <div className="flex flex-col flex-grow p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-0 flex-grow flex items-end">
                <Button variant="link" asChild className="p-0">
                  <Link href={service.href}>
                    En savoir plus
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
