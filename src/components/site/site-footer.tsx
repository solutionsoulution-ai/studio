import Link from "next/link";
import { Landmark, Linkedin, Twitter, Facebook, Mail, Phone, MapPin } from "lucide-react";

const mainNavLinks = [
  { href: "/a-propos", label: "À Propos" },
  { href: "/eligibilite", label: "Éligibilité" },
  { href: "/#calculateur", label: "Calculateur" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services/pret-entreprise", label: "Prêt Entreprise" },
  { href: "/services/pret-personnel", label: "Prêt Personnel" },
  { href: "/services/pret-immo", label: "Prêt Immobilier" },
  { href: "/services/pret-auto", label: "Prêt Auto" },
  { href: "/services/rachat-de-credit", label: "Rachat de Crédit" },
];

const legalLinks = [
    { href: "/politique-de-confidentialite", label: "Politique de confidentialité" },
    { href: "/conditions-generales", label: "Conditions d'utilisation" },
    { href: "/mentions-legales", label: "Mentions Légales" },
];

const socialLinks = [
    { href: "#", icon: Twitter, label: "Twitter / X" },
    { href: "#", icon: Linkedin, label: "LinkedIn" },
    { href: "#", icon: Facebook, label: "Facebook" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto py-12 px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Section Marque */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Landmark className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold">VylsCapital</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Solutions de financement rapides et flexibles pour aider votre entreprise à prospérer.
            </p>
             <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                <a href="mailto:contact@vylscapital.com" className="flex items-center gap-2 hover:text-primary">
                    <Mail className="w-4 h-4" />
                    contact@vylscapital.com
                </a>
                <a href="tel:+33756986769" className="flex items-center gap-2 hover:text-primary">
                    <Phone className="w-4 h-4" />
                    +33 7 56 98 67 69
                </a>
                <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Lyon, France
                </p>
             </div>
          </div>

          {/* Section Services */}
          <div>
            <h3 className="font-semibold mb-4">Nos Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section Légal */}
          <div>
            <h3 className="font-semibold mb-4">Légal</h3>
            <ul className="space-y-2">
              {legalLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section Social */}
          <div>
            <h3 className="font-semibold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <Link key={label} href={href} aria-label={label} className="text-muted-foreground hover:text-primary transition-colors">
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} VylsCapital. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
