import SiteHeader from '@/components/site/site-header';
import HeroSection from '@/components/site/hero-section';
import ServicesSection from '@/components/site/services-section';
import WhyChooseUsSection from '@/components/site/why-choose-us-section';
import InterestRateCalculator from '@/components/site/interest-rate-calculator';
import FaqSection from '@/components/site/faq-section';
import SiteFooter from '@/components/site/site-footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import TestimonialsSection from '@/components/site/testimonials-section';
import PartnersSection from '@/components/site/partners-section';
import TimelineSummary from '@/components/site/timeline-summary';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        
        <ServicesSection />

        <WhyChooseUsSection />

        <TimelineSummary />

        <PartnersSection />

        <section id="eligibilite" className="container mx-auto py-16 md:py-24 text-center">
            <div className="mx-auto max-w-3xl">
                <div className="flex items-center gap-3 justify-center">
                    <Sparkles className="w-8 h-8 text-primary" />
                    <h2 className="text-3xl font-bold tracking-tight font-headline">Vérifiez Votre Éligibilité en un Instant</h2>
                </div>
                <p className="mt-4 text-lg text-muted-foreground">
                    Utilisez notre outil d'évaluation pour obtenir une réponse rapide sur votre admissibilité à un prêt. C'est simple, rapide et sans engagement.
                </p>
                <div className="mt-8">
                    <Button size="lg" asChild>
                        <Link href="/eligibilite">Démarrer la vérification</Link>
                    </Button>
                </div>
            </div>
        </section>

        <section id="calculateur" className="w-full py-16 md-py-24 bg-muted/30">
          <InterestRateCalculator />
        </section>

        <TestimonialsSection />

        <section id="faq" className="container mx-auto py-16 md:py-24">
          <FaqSection />
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
