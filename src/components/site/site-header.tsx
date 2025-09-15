"use client";

import { useState } from "react";
import Link from "next/link";
import { Landmark, Menu, X, ChevronDown } from "lucide-react";
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
  { href: "/#eligibilite", label: "Éligibilité" },
  { href: "/#calculateur", label: "Calculateur" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services/pret-entreprise", label: "Prêt Entreprise" },
  { href: "/services/pret-personnel", label: "Prêt Personnel" },
  { href: "/services/pret-immo", label: "Prêt Immobilier" },
  { href: "/services/pret-auto", label: "Prêt Auto" },
  { href: "/services/rachat-de-credit", label: "Rachat de Crédit" },
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
              {serviceLinks.map(({ href, label }) => (
                <DropdownMenuItem key={label} asChild>
                  <Link href={href}>{label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {mainNavLinks.map(({ href, label }) => (
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
                  <p className="text-sm font-semibold text-muted-foreground">Nos Services</p>
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
                  {mainNavLinks.map(({ href, label }) => (
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
