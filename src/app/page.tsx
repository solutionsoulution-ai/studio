import SiteHeader from '@/components/site/site-header';
import HeroSection from '@/components/site/hero-section';
import EligibilityChecker from '@/components/site/eligibility-checker';
import InterestRateCalculator from '@/components/site/interest-rate-calculator';
import FaqSection from '@/components/site/faq-section';
import ContactForm from '@/components/site/contact-form';
import SiteFooter from '@/components/site/site-footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />

        <section id="eligibility" className="container mx-auto py-16 md:py-24">
          <EligibilityChecker />
        </section>

        <section id="calculator" className="w-full py-16 md:py-24 bg-muted/30">
          <InterestRateCalculator />
        </section>

        <section id="faq" className="container mx-auto py-16 md:py-24">
          <FaqSection />
        </section>

        <section id="contact" className="w-full py-16 md:py-24 bg-muted/30">
          <ContactForm />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
