
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Send, ShieldCheck } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";

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
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert("Veuillez accepter les conditions de confidentialité pour soumettre votre demande.");
      return;
    }
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
            <Input id="loanAmount" type="number" placeholder="50000" required />
          </div>
          <div>
            <Label htmlFor="loanTerm">Durée de remboursement (mois)</Label>
            <Input id="loanTerm" type="number" placeholder="120" required />
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
          
          <div className="pt-4 space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(!!checked)} />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  J'accepte les termes et la politique de confidentialité.
                </label>
                <p className="text-xs text-muted-foreground">
                  En soumettant ce formulaire, je consens à ce que Capfinfy collecte et traite mes données personnelles pour l'étude de ma demande de financement, conformément à la <Link href="/politique-de-confidentialite" className="underline">Politique de Confidentialité</Link>.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground flex items-center justify-center gap-2 pt-2">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span>Vos informations sont chiffrées et sécurisées.</span>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={!agreed}>
            <Send />
            Envoyer ma demande
          </Button>
          <p className="text-xs text-muted-foreground text-center">Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.</p>
        </form>
      </CardContent>
    </Card>
  );
}

const Label = (props: any) => <label {...props} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block" />;
