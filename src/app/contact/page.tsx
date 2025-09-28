
import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import ContactForm from "@/components/site/contact-form";
import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
              <div className="flex items-center gap-3 justify-center">
                  <Mail className="w-8 h-8 text-primary" />
                  <h1 className="text-4xl font-bold tracking-tight font-headline">Contactez-nous</h1>
              </div>
              <p className="mt-4 text-lg text-muted-foreground">
                Une question ? Une demande spécifique ? Notre équipe est à votre écoute.
              </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
             <ContactForm />
             <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Nos Coordonnées</h2>
                <Card>
                    <CardContent className="p-6 space-y-4 text-muted-foreground">
                        <a href="mailto:contact@vylsfond.com" className="flex items-center gap-3 group">
                            <Mail className="w-5 h-5 text-primary"/>
                            <span className="group-hover:text-primary transition-colors">contact@vylsfond.com</span>
                        </a>
                        <a href="tel:+33756986769" className="flex items-center gap-3 group">
                            <Phone className="w-5 h-5 text-primary"/>
                            <span className="group-hover:text-primary transition-colors">+33 7 56 98 67 69</span>
                        </a>
                        <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-primary"/>
                            <span>Lyon, France</span>
                        </div>
                    </CardContent>
                </Card>
                <div>
                    <h3 className="font-semibold mb-2">Horaires d'ouverture</h3>
                    <p className="text-muted-foreground">Lundi - Vendredi : 9h00 - 18h00</p>
                    <p className="text-muted-foreground">Samedi - Dimanche : Fermé</p>
                </div>
             </div>
          </div>

        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
