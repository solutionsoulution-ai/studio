
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Send, ShieldCheck, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

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
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState<string | undefined>();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed) {
        toast({
            variant: "destructive",
            title: "Consentement requis",
            description: "Veuillez accepter la politique de confidentialité pour continuer.",
        });
      return;
    }
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const formObject = Object.fromEntries(formData.entries());
    
    const { error } = await supabase
      .from('loan_applications')
      .insert([{ 
        first_name: formObject.firstName,
        last_name: formObject.lastName,
        loan_amount: Number(formObject.loanAmount),
        loan_term: Number(formObject.loanTerm),
        email: formObject.email,
        phone: formObject.phone,
        country: country,
        profession: formObject.profession,
        monthly_income: Number(formObject.income),
        reason: formObject.reason
       }]);

    setLoading(false);

    if (error) {
      console.error('Supabase error:', error);
      toast({
        variant: "destructive",
        title: "Erreur lors de la soumission",
        description: "Une erreur est survenue. Veuillez vérifier vos informations et réessayer.",
      });
    } else {
      router.push('/demande-de-pret/merci');
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Prénom</Label>
              <Input id="firstName" name="firstName" placeholder="Jean" required disabled={loading} />
            </div>
            <div>
              <Label htmlFor="lastName">Nom</Label>
              <Input id="lastName" name="lastName" placeholder="Dupont" required disabled={loading} />
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="loanAmount">Montant du Prêt (€)</Label>
              <Input id="loanAmount" name="loanAmount" type="number" placeholder="50000" required disabled={loading} />
            </div>
            <div>
              <Label htmlFor="loanTerm">Durée (mois)</Label>
              <Input id="loanTerm" name="loanTerm" type="number" placeholder="120" required disabled={loading} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Adresse Email</Label>
              <Input id="email" name="email" type="email" placeholder="vous@exemple.com" required disabled={loading} />
            </div>
            <div>
              <Label htmlFor="phone">Numéro de Téléphone</Label>
              <Input id="phone" name="phone" type="tel" placeholder="+33 6 12 34 56 78" required disabled={loading} />
            </div>
          </div>
          
          <div>
            <Label htmlFor="country">Pays de résidence</Label>
             <Select required name="country" onValueChange={setCountry} disabled={loading}>
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

          <div className="grid sm:grid-cols-2 gap-4">
             <div>
                <Label htmlFor="profession">Profession</Label>
                <Input id="profession" name="profession" placeholder="Développeur" required disabled={loading} />
            </div>
             <div>
                <Label htmlFor="income">Revenu mensuel net (€)</Label>
                <Input id="income" name="income" type="number" placeholder="3000" required disabled={loading} />
            </div>
          </div>
          
          <div>
            <Label htmlFor="reason">Motif de la demande</Label>
            <Textarea id="reason" name="reason" placeholder="Décrivez brièvement votre projet (ex: Achat d'un véhicule, rénovation, etc.)" required disabled={loading} />
          </div>
          
          <div className="pt-4 space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(!!checked)} disabled={loading} />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Je reconnais avoir lu et j'accepte la politique de confidentialité.
                </label>
                <p className="text-xs text-muted-foreground">
                  En soumettant ce formulaire, je consens à ce que Capfinfy collecte et traite mes données personnelles pour l'étude de ma demande de financement, conformément à notre <Link href="/politique-de-confidentialite" className="underline" target="_blank">Politique de Confidentialité</Link>.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground flex items-center justify-center gap-2 pt-2">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span>Vos informations sont chiffrées et sécurisées via SSL.</span>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={!agreed || loading}>
             {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Send />
              )}
              {loading ? "Envoi en cours..." : "Envoyer ma demande"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.</p>
        </form>
      </CardContent>
    </Card>
  );
}

const Label = (props: any) => <label {...props} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block" />;
