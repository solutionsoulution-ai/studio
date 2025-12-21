
"use client";

import Link from "next/link";
import { Landmark, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

const mainNavLinks = [
  { href: "/a-propos", label: "À Propos" },
  { href: "/blog", label: "Blog" },
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
];

export default function SiteFooter() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto py-12 px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Section Marque */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image src="https://i.postimg.cc/ZqGtbXxd/Capture-d-ecran-2025-12-20-110200.png" alt="Neofonds Logo" width={120} height={30} />
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Solutions de financement rapides et flexibles pour aider votre entreprise à prospérer.
            </p>
             <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                <a href="mailto:contact@neofonds.com" className="flex items-center gap-2 hover:text-primary">
                    <Mail className="w-4 h-4" />
                    contact@neofonds.com
                </a>
                <a href="tel:+491632247344" className="flex items-center gap-2 hover:text-primary">
                    <Phone className="w-4 h-4" />
                    +49 163 2247344
                </a>
                <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Mainzer Landstraße 50, 60325 Frankfurt
                </p>
             </div>
          </div>

          {/* Section Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {mainNavLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
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

        </div>

        <div className="mt-12 border-t pt-6 text-center">
            <div className="text-xs text-muted-foreground space-y-2">
                <p>Neofonds GmbH - Siège social : Mainzer Landstraße 50, 60325 Frankfurt am Main, Deutschland</p>
                <p className="font-bold pt-2">Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.</p>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
                &copy; {new Date().getFullYear()} Neofonds. Tous droits réservés.
            </p>
        </div>
      </div>
    </footer>
  );
}
