
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const europeanCountries = [
    "Albanie", "Allemagne", "Andorre", "Autriche", "Belgique", "Biélorussie", 
    "Bosnie-Herzégovine", "Bulgarie", "Chypre", "Croatie", "Danemark", "Espagne", 
    "Estonie", "Finlande", "France", "Grèce", "Hongrie", "Irlande", "Islande", 
    "Italie", "Kosovo", "Lettonie", "Liechtenstein", "Lituanie", "Luxembourg", 
    "Macédoine du Nord", "Malte", "Moldavie", "Monaco", "Monténégro", "Norvège", 
    "Pays-Bas", "Pologne", "Portugal", "République tchèque", "Roumanie", 
    "Royaume-Uni", "Russie", "Saint-Marin", "Serbie", "Slovaquie", "Slovénie", 
    "Suède", "Suisse", "Ukraine", "Vatican"
];

export default function LoanApplicationForm() {
  const [loanAmount, setLoanAmount] = useState(50000);
  const [loanTerm, setLoanTerm] = useState(120);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Dans un site fonctionnel, le formulaire serait envoyé. Pour cette maquette statique, l'envoi est désactivé.");
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name">Votre nom complet</Label>
            <Input id="name" placeholder="Jean Dupont" required />
          </div>
          <div>
            <Label htmlFor="loanAmount">Montant du Prêt (€)</Label>
            <Input id="loanAmount" type="number" placeholder="50000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} required />
          </div>
          <div>
            <Label htmlFor="loanTerm">Durée de remboursement (mois)</Label>
            <Input id="loanTerm" type="number" placeholder="120" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} required />
          </div>
          <div>
            <Label htmlFor="email">Votre Adresse Email</Label>
            <Input id="email" type="email" placeholder="vous@exemple.com" required />
          </div>
          <div>
            <Label htmlFor="phone">Votre Numéro de Téléphone</Label>
            <Input id="phone" type="tel" placeholder="+33 6 12 34 56 78" required />
          </div>
          <div>
            <Label htmlFor="country">Votre Pays</Label>
             <Select required name="pays">
                <SelectTrigger id="country">
                    <SelectValue placeholder="Sélectionnez un pays" />
                </SelectTrigger>
                <SelectContent>
                    {europeanCountries.map(country => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="profession">Votre Profession</Label>
            <Input id="profession" placeholder="Développeur" required />
          </div>
          <div>
            <Label htmlFor="income">Votre Revenu mensuel</Label>
            <Input id="income" type="number" placeholder="3000" required />
          </div>
          <div>
            <Label htmlFor="reason">Motif de la demande</Label>
            <Textarea id="reason" placeholder="Achat d'un véhicule, rénovation, etc." required />
          </div>
          
          <p className="text-xs text-muted-foreground text-center pt-4">En cliquant sur "Envoyer ma demande", vous confirmez que les informations fournies sont exactes et complètes, et vous acceptez nos conditions générales et notre politique de confidentialité.</p>

          <Button type="submit" size="lg" className="w-full">
            <Send />
            Envoyer ma demande
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

const Label = (props: any) => <label {...props} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block" />;
