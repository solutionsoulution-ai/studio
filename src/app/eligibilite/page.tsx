import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import EligibilityChecker from "@/components/site/eligibility-checker";

export default function EligibilitePage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section id="eligibilite" className="container mx-auto py-16 md:py-24">
          <EligibilityChecker />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
