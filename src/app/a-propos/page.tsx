"use client";

import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import AboutUsSection from "@/components/site/about-us-section";

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
