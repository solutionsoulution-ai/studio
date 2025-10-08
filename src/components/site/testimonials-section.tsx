
"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonials } from "@/lib/testimonials";
import { MessageSquareQuote, Star } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={cn(
            "w-5 h-5",
            index < rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-muted-foreground/30"
          )}
        />
      ))}
    </div>
  );
};


export default function TestimonialsSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section className="w-full py-16 md:py-24">
        <div className="container mx-auto">
            <div className="text-center mb-10">
                <div className="flex items-center gap-3 justify-center">
                    <MessageSquareQuote className="w-8 h-8 text-primary" />
                    <h2 className="text-3xl font-bold tracking-tight font-headline">Ce que disent nos clients</h2>
                </div>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Découvrez les expériences de particuliers et d'entrepreneurs à travers l'Europe qui nous ont fait confiance.
                </p>
            </div>
            <Carousel
                plugins={[plugin.current]}
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1 h-full">
                            <Card className="h-full flex flex-col">
                                <CardContent className="flex flex-col items-start gap-4 p-6 flex-grow">
                                    <StarRating rating={testimonial.rating} />
                                    <p className="text-muted-foreground italic flex-grow">"{testimonial.quote.replace(/VylsFond/g, 'Capfinfy')}"</p>
                                    <div className="pt-4 border-t w-full">
                                        <p className="font-semibold">{testimonial.name}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
                </CarouselContent>
                <CarouselPrevious className="hidden lg:flex" />
                <CarouselNext className="hidden lg:flex" />
            </Carousel>
        </div>
    </section>
  );
}
