
"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
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

const carouselImages = [
  {
    src: "https://i.postimg.cc/sDZpM105/fabian-blank-p-El-Sk-GRA2-NU-unsplash.jpg",
    alt: "Personne travaillant sur un ordinateur portable dans un bureau moderne",
  },
  {
    src: "https://i.postimg.cc/7YCNSKbG/jonne-makikyro-n-Gp-I-Tvpc-Co-unsplash.jpg",
    alt: "Gros plan sur une poignée de main entre deux professionnels",
  },
  {
    src: "https://i.postimg.cc/VknBV5qz/fang-guo-R8-SKm0sa-Yu8-unsplash.jpg",
    alt: "Vue aérienne d'une ville animée avec des gratte-ciels",
  },
  {
    src: "https://i.postimg.cc/26zwvmBr/sam-moghadam-ba-II27-W6z7k-unsplash.jpg",
    alt: "Équipe de travail collaborant autour d'une table avec des graphiques",
  },
  {
    src: "https://i.postimg.cc/PxRwxkW6/austin-distel-mp-N7xj-KQ-Ns-unsplash.jpg",
    alt: "Homme d'affaires souriant regardant des documents financiers",
  },
];

export default function HomeCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <section className="relative w-full">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{ loop: true }}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {carouselImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="h-[60dvh] min-h-[400px] w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden lg:flex" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden lg:flex" />
      </Carousel>
       <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 z-10 flex h-full flex-col items-center justify-center text-center p-4 text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            Sécurisez l'Avenir de Votre Entreprise
            </h1>
            <p className="mt-4 max-w-2xl text-lg sm:text-xl text-neutral-200">
            VylsCapital fournit des solutions de financement rapides et flexibles pour aider votre entreprise à prospérer. Obtenez le capital dont vous avez besoin pour grandir.
            </p>
            <div className="mt-8">
            <Link href="#eligibilite">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6">
                Vérifier mon éligibilité
                </Button>
            </Link>
            </div>
        </div>
    </section>
  );
}
