"use client";

import { useState } from "react";
import Link from "next/link";
import { Landmark, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "#eligibility", label: "Eligibility" },
  { href: "#calculator", label: "Calculator" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
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
          {navLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="transition-colors hover:text-primary"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4 md:flex-none">
           <a href="#eligibility">
            <Button className="hidden sm:inline-flex bg-accent text-accent-foreground hover:bg-accent/90">
              Apply for a Loan
            </Button>
          </a>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
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
                        <span className="sr-only">Close Menu</span>
                    </Button>
                  </SheetTrigger>
                </div>
                <nav className="flex flex-col space-y-4 p-4">
                  {navLinks.map(({ href, label }) => (
                    <Link
                      key={label}
                      href={href}
                      className="text-lg font-medium transition-colors hover:text-primary"
                      onClick={closeMobileMenu}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
                 <div className="mt-auto border-t p-4">
                    <a href="#eligibility" onClick={closeMobileMenu}>
                        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                        Apply for a Loan
                        </Button>
                    </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
