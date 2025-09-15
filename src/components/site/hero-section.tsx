import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-background");

  return (
    <section className="relative h-[60dvh] min-h-[400px] w-full text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline">
          Secure Your Business's Future
        </h1>
        <p className="mt-4 max-w-2xl text-lg sm:text-xl text-neutral-200">
          VylsCapital provides fast, flexible financing solutions to help your business thrive. Get the capital you need to grow.
        </p>
        <div className="mt-8">
          <Link href="#eligibility">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6">
              Check Eligibility Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
