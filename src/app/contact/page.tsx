import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import ContactForm from "@/components/site/contact-form";
import { Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-10">
              <div className="flex items-center gap-3 justify-center">
                  <Mail className="w-8 h-8 text-primary" />
                  <h1 className="text-4xl font-bold tracking-tight font-headline">Contactez-nous</h1>
              </div>
              <p className="mt-4 text-lg text-muted-foreground">
                Vous avez une question spécifique ? Remplissez le formulaire ci-dessous et un membre de notre équipe vous contactera.
              </p>
          </div>
          <ContactForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
