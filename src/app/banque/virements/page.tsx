
"use client";

import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function VirementsPage() {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Ceci est une simulation. Dans une vraie application bancaire, le virement serait traité de manière sécurisée.");
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto py-12 px-4 max-w-2xl">
          <h1 className="text-3xl font-bold font-headline mb-8">Effectuer un Virement</h1>

          <Card>
            <form onSubmit={handleSubmit}>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="beneficiary-name">Nom du bénéficiaire</Label>
                  <Input id="beneficiary-name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="iban">IBAN du bénéficiaire</Label>
                  <Input id="iban" placeholder="FR76..." required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Montant (€)</Label>
                    <Input id="amount" type="number" placeholder="100.00" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reason">Motif du virement</Label>
                    <Input id="reason" placeholder="Facture N°123" required />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-6">
                <Button type="submit" className="w-full">Effectuer le virement</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
