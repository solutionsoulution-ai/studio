
"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

const carouselItems = [
  {
    src: "https://i.postimg.cc/sDZpM105/fabian-blank-p-El-Sk-GRA2-NU-unsplash.jpg",
    alt: "Personne travaillant sur un ordinateur portable dans un bureau moderne",
    title: "Sécurisez l'Avenir de Votre Entreprise",
    description: "VylsCapital fournit des solutions de financement rapides et flexibles pour aider votre entreprise à prospérer. Obtenez le capital dont vous avez besoin pour grandir.",
  },
  {
    src: "https://i.postimg.cc/7YCNSKbG/jonne-makikyro-n-Gp-I-Tvpc-Co-unsplash.jpg",
    alt: "Gros plan sur une poignée de main entre deux professionnels",
    title: "Des Partenaires de Confiance à Vos Côtés",
    description: "Nous construisons des relations solides pour vous garantir les meilleures conditions et un accompagnement sur mesure.",
  },
  {
    src: "https://i.postimg.cc/VknBV5qz/fang-guo-R8-SKm0sa-Yu8-unsplash.jpg",
    alt: "Vue aérienne d'une ville animée avec des gratte-ciels",
    title: "Financez Vos Plus Grandes Ambitions",
    description: "Que ce soit pour un projet immobilier ou une expansion internationale, nous avons les outils pour vous soutenir.",
  },
  {
    src: "https://i.postimg.cc/26zwvmBr/sam-moghadam-ba-II27-W6z7k-unsplash.jpg",
    alt: "Équipe de travail collaborant autour d'une table avec des graphiques",
    title: "La Croissance par l'Analyse et la Stratégie",
    description: "Notre équipe d'experts analyse votre marché pour vous proposer des solutions de financement qui ont un réel impact.",
  },
  {
    src: "https://i.postimg.cc/PxRwxkW6/austin-distel-mp-N7xj-KQ-Ns-unsplash.jpg",
    alt: "Homme d'affaires souriant regardant des documents financiers",
    title: "Une Gestion Financière Simplifiée",
    description: "Profitez d'un processus 100% en ligne et d'un suivi transparent pour vous concentrer sur ce qui compte vraiment.",
  },
];

export default function HomeCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section className="w-full bg-background">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{ loop: true }}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {carouselItems.map((item, index) => (
            <CarouselItem key={index}>
              <div className="container mx-auto">
                <div className="grid md:grid-cols-2 items-center gap-8 py-12 md:py-24 min-h-[60dvh]">
                  <div className="flex flex-col items-start text-left">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl font-headline">
                      {item.title}
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                      {item.description}
                    </p>
                    <div className="mt-8">
                      <Button size="lg" asChild>
                        <Link href="/demande-de-pret">Faire une demande</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden lg:flex" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden lg:flex" />
      </Carousel>
    </section>
  );
}
