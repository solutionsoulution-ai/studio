import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import ContactForm from "@/components/site/contact-form";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto py-16 md:py-24">
        <ContactForm />
      </main>
      <SiteFooter />
    </div>
  );
}
