

"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Send, FileText, User, Banknote, UploadCloud, Calculator, Percent } from "lucide-react";
import { Slider } from "../ui/slider";

const FIXED_INTEREST_RATE = 2;

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

  const monthlyPayment = useMemo(() => {
    if (loanAmount <= 0 || FIXED_INTEREST_RATE <= 0 || loanTerm <= 0) {
      return 0;
    }
    const monthlyRate = FIXED_INTEREST_RATE / 100 / 12;
    const numberOfPayments = loanTerm;
    const payment =
      loanAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    return payment;
  }, [loanAmount, loanTerm]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Dans un site fonctionnel, le formulaire serait envoyé. Pour cette maquette statique, l'envoi est désactivé. Dans WordPress, utilisez un plugin de formulaire pour gérer l'envoi.");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const handleAmountChange = (value: number) => {
    const newAmount = Math.max(1000, Math.min(500000, value));
    setLoanAmount(newAmount);
  };

  const handleTermChange = (value: number) => {
    const newTerm = Math.max(12, Math.min(360, value));
    setLoanTerm(newTerm);
  };

  return (
    <div>
        <div className="container mx-auto p-0 mb-10">
            <Card className="max-w-4xl mx-auto shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calculator className="w-6 h-6 text-primary" />
                        Estimez vos mensualités
                    </CardTitle>
                    <CardDescription>
                        Ceci est une simulation. Ajustez les curseurs ou entrez les valeurs pour voir l'impact sur vos paiements.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-8 pt-2">
                    <div className="space-y-8">
                        <div>
                            <Label htmlFor="loanAmountInput">Montant du prêt</Label>
                            <div className="flex items-center gap-4 mt-2">
                                <Input
                                    id="loanAmountInput"
                                    type="number"
                                    value={loanAmount}
                                    onChange={(e) => handleAmountChange(Number(e.target.value))}
                                    className="w-32"
                                    step="1000"
                                />
                                <Slider
                                    value={[loanAmount]}
                                    onValueChange={(value) => handleAmountChange(value[0])}
                                    max={500000}
                                    min={1000}
                                    step={1000}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="loanTermInput">Durée du prêt (Mois)</Label>
                            <div className="flex items-center gap-4 mt-2">
                                <Input
                                    id="loanTermInput"
                                    type="number"
                                    value={loanTerm}
                                    onChange={(e) => handleTermChange(Number(e.target.value))}
                                    className="w-32"
                                />
                                <Slider
                                    value={[loanTerm]}
                                    onValueChange={(value) => handleTermChange(value[0])}
                                    max={360}
                                    min={12}
                                    step={1}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary text-primary-foreground rounded-lg p-8 flex flex-col items-center justify-center text-center">
                        <p className="text-lg font-medium opacity-80">Paiement mensuel estimé</p>
                        <p className="text-5xl font-extrabold tracking-tight mt-2">
                            {formatCurrency(monthlyPayment)}
                        </p>
                        <p className="mt-4 opacity-80 text-sm flex items-center gap-2">
                            <Percent className="w-4 h-4" /> Taux fixe de 2%
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Informations sur le Prêt */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileText />1. Informations sur le Prêt</CardTitle>
            <CardDescription>Décrivez le financement dont vous avez besoin.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Type de Prêt</Label>
              <Select required>
                <SelectTrigger><SelectValue placeholder="Sélectionnez le type de projet" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="immobilier">Prêt Immobilier</SelectItem>
                  <SelectItem value="personnel">Prêt Personnel</SelectItem>
                  <SelectItem value="auto">Prêt Auto</SelectItem>
                  <SelectItem value="entreprise">Prêt Entreprise</SelectItem>
                  <SelectItem value="rachat">Rachat de Crédit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Montant souhaité (€)</Label>
                <Input 
                  type="number" 
                  placeholder="ex: 50000" 
                  required 
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                />
              </div>
              <div>
                <Label>Durée de remboursement (mois)</Label>
                <Input 
                  type="number" 
                  placeholder="ex: 120" 
                  required 
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Informations Personnelles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><User />2. Informations Personnelles</CardTitle>
            <CardDescription>Aidez-nous à mieux vous connaître.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>Prénom</Label><Input placeholder="Jean" required /></div>
              <div><Label>Nom</Label><Input placeholder="Dupont" required /></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>Email</Label><Input type="email" placeholder="vous@exemple.com" required /></div>
              <div><Label>Numéro WhatsApp</Label><Input type="tel" placeholder="0612345678" required /></div>
            </div>
            <div>
              <Label>Date de naissance</Label>
              <div className="grid grid-cols-3 gap-2">
                <div><Input type="number" placeholder="Jour" required min="1" max="31" /></div>
                <div><Input type="number" placeholder="Mois" required min="1" max="12" /></div>
                <div><Input type="number" placeholder="Année" required min="1900" max={new Date().getFullYear() - 18} /></div>
              </div>
            </div>
            <div><Label>Adresse</Label><Input placeholder="123 rue de Paris" required /></div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div><Label>Ville</Label><Input placeholder="Paris" required /></div>
              <div><Label>Code Postal</Label><Input placeholder="75001" required /></div>
              <div>
                <Label>Pays</Label>
                <Select required name="pays">
                    <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un pays" />
                    </SelectTrigger>
                    <SelectContent>
                        {europeanCountries.map(country => (
                            <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Situation familiale</Label>
                <Select required>
                    <SelectTrigger><SelectValue placeholder="Sélectionnez..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="celibataire">Célibataire</SelectItem>
                      <SelectItem value="marie">Marié(e)</SelectItem>
                      <SelectItem value="divorce">Divorcé(e)</SelectItem>
                      <SelectItem value="veuf">Veuf(ve)</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <div><Label>Nombre d'enfants</Label><Input type="number" placeholder="0" required min="0" /></div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Situation Financière */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Banknote />3. Situation Financière</CardTitle>
            <CardDescription>Informations sur vos revenus et charges.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Profession</Label><Input placeholder="Développeur, médecin, etc." required /></div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>Revenu Mensuel Net (€)</Label><Input type="number" placeholder="3000" required min="0"/></div>
              <div><Label>Charges Mensuelles (€)</Label><Input type="number" placeholder="1200" required min="0"/></div>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><UploadCloud />4. Documents</CardTitle>
            <CardDescription>Téléchargez les documents requis (max 5Mo par fichier).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Pièce d'identité (PDF, JPG, PNG)</Label>
              <Input type="file" required accept=".pdf,.jpg,.jpeg,.png"/>
            </div>
            <div>
              <Label>Justificatif de domicile de moins de 3 mois</Label>
              <Input type="file" required accept=".pdf,.jpg,.jpeg,.png"/>
            </div>
            <div>
              <Label>Justificatif de revenus (3 derniers bulletins)</Label>
              <Input type="file" required accept=".pdf,.jpg,.jpeg,.png"/>
            </div>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground text-center">En cliquant sur "Envoyer ma demande", vous confirmez que les informations fournies sont exactes et complètes, et vous acceptez nos conditions générales et notre politique de confidentialité.</p>
        
        <Button type="submit" size="lg" className="w-full">
          <Send />
          Envoyer ma demande
        </Button>
      </form>
    </div>
  );
}

const Label = (props: any) => <label {...props} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block" />;
