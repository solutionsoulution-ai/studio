
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
import BlogSummarySection from '@/components/site/blog-summary-section';

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

        <BlogSummarySection />

        <PartnersSection />

        <TestimonialsSection />

        <section id="faq" className="container mx-auto py-16 md:py-24">
          <FaqSection />
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
