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
import { testimonials } from "@/lib/testimonials";
import { MessageSquareQuote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TestimonialsSection() {
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
                opts={{
                align: "start",
                loop: true,
                }}
                className="w-full"
            >
                <CarouselContent>
                {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <Card className="h-full flex flex-col">
                                <CardContent className="flex flex-col items-start gap-4 p-6 flex-grow">
                                    <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                                    <div className="flex items-center gap-3 pt-4 border-t w-full">
                                        <Avatar>
                                            <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                                            <AvatarFallback>{testimonial.name.substring(0,2)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{testimonial.name}</p>
                                            <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                                        </div>
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
