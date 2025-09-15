
"use client";

import { useState } from "react";
import Link from "next/link";
import { Landmark, Menu, X, ChevronDown, Briefcase, User, Home, Car, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const mainNavLinks = [
  { href: "/#services", label: "Nos Services" },
  { href: "/eligibilite", label: "Éligibilité" },
  { href: "/#calculateur", label: "Calculateur" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services/pret-entreprise", label: "Prêt Entreprise", icon: Briefcase },
  { href: "/services/pret-personnel", label: "Prêt Personnel", icon: User },
  { href: "/services/pret-immo", label: "Prêt Immobilier", icon: Home },
  { href: "/services/pret-auto", label: "Prêt Auto", icon: Car },
  { href: "/services/rachat-de-credit", label: "Rachat de Crédit", icon: Recycle },
];

export default function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Landmark className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block">VylsCapital</span>
        </Link>
        <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="px-2">
                Nos Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {serviceLinks.map(({ href, label, icon: Icon }) => (
                <DropdownMenuItem key={label} asChild>
                  <Link href={href} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    {label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {mainNavLinks.slice(1).map(({ href, label }) => ( // slice(1) to avoid duplicating "Nos Services"
            <Link
              key={label}
              href={href}
              className="transition-colors hover:text-primary"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2 md:flex-none">
          <Button variant="secondary" asChild>
            <Link href="/demande-de-pret">Faire une demande</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Connexion</Link>
          </Button>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs pr-0">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b p-4">
                  <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
                    <Landmark className="h-6 w-6 text-primary" />
                    <span className="font-bold">VylsCapital</span>
                  </Link>
                  <SheetTrigger asChild>
                     <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Fermer le menu</span>
                    </Button>
                  </SheetTrigger>
                </div>
                <nav className="flex flex-col space-y-4 p-4">
                   <Link href="/demande-de-pret" className="text-lg font-medium transition-colors hover:text-primary" onClick={closeMobileMenu}>
                      Faire une demande
                    </Link>
                  <p className="text-sm font-semibold text-muted-foreground pt-4">Nos Services</p>
                  {serviceLinks.map(({ href, label }) => (
                    <Link
                      key={label}
                      href={href}
                      className="text-lg font-medium transition-colors hover:text-primary pl-2"
                      onClick={closeMobileMenu}
                    >
                      {label}
                    </Link>
                  ))}
                   <p className="text-sm font-semibold text-muted-foreground pt-4">Menu</p>
                  {mainNavLinks.slice(1).map(({ href, label }) => (
                    <Link
                      key={label}
                      href={href}
                      className="text-lg font-medium transition-colors hover:text-primary pl-2"
                      onClick={closeMobileMenu}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
