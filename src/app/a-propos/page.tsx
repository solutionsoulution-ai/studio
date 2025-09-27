import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import AboutUsSection from "@/components/site/about-us-section";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À Propos | VylsFond',
  description: 'Découvrez notre histoire, notre mission, et l\'équipe qui travaille pour rendre le financement plus accessible et humain.',
};


export default function AProposPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1">
        <AboutUsSection />
      </main>
      <SiteFooter />
    </div>
  );
}
