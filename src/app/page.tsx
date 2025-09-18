
import SiteHeader from '@/components/site/site-header';
import HomeCarousel from '@/components/site/home-carousel';
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
        <HomeCarousel />
        
        <ServicesSection />

        <section id="calculateur" className="w-full py-16 md-py-24 bg-muted/30">
          <InterestRateCalculator />
        </section>

        <WhyChooseUsSection />

        <TimelineSummary />

        <PartnersSection />

        <TestimonialsSection />

        <section id="faq" className="container mx-auto py-16 md:py-24">
          <FaqSection />
        </section>

        <section id="eligibilite-cta" className="bg-primary text-primary-foreground">
          <div className="container mx-auto text-center py-16">
            <h2 className="text-3xl font-bold">Vérifiez Votre Éligibilité en un Instant</h2>
            <p className="mt-2 text-lg max-w-xl mx-auto opacity-90">
              Utilisez notre outil d'évaluation pour obtenir une réponse rapide sur votre admissibilité à un prêt. C'est simple, rapide et sans engagement.
            </p>
            <div className="mt-8">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/demande-de-pret">
                  <Sparkles className="mr-2" />
                  Faire une demande
                </Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
