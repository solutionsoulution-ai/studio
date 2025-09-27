
"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu, Home, ArrowLeftRight, Send, Settings, Bell, UserCircle, User } from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";

const navLinks = [
  { href: "#/tableau-de-bord", label: "Tableau de bord", icon: Home },
  { href: "#/transactions", label: "Transactions", icon: ArrowLeftRight },
  { href: "#/virements", label: "Virements", icon: Send },
  { href: "#/profil", label: "Profil", icon: User },
];

export default function BanqueLayout() {
  const location = useLocation();

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-muted/40">
        <div className="p-4 border-b">
            <a href="/" className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-primary"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                <span className="font-bold text-lg">VylsFond</span>
            </a>
        </div>
        <nav className="flex-1 p-4 space-y-2">
            {navLinks.map((link) => (
                <a key={link.href} href={link.href}>
                    <Button
                        variant={location.pathname === link.href.substring(1) || (location.pathname === '/' && link.href === '#/tableau-de-bord') ? "secondary" : "ghost"}
                        className="w-full justify-start gap-3"
                    >
                        <link.icon className="h-5 w-5" />
                        {link.label}
                    </Button>
                </a>
            ))}
        </nav>
        <div className="p-4 mt-auto border-t">
            <Button variant="ghost" className="w-full justify-start gap-3">
                <Settings className="h-5 w-5" />
                Paramètres
            </Button>
        </div>
    </div>
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-background md:block">
        <SidebarContent />
      </div>
      <div className="flex flex-col">
        <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                        >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col p-0">
                    <SidebarContent />
                </SheetContent>
            </Sheet>
            <div className="flex-1">
                {/* Potentiel pour une barre de recherche */}
            </div>
            <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
            </Button>
             <Button variant="ghost" size="icon">
                <UserCircle className="h-6 w-6" />
                <span className="sr-only">Profil</span>
            </Button>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
