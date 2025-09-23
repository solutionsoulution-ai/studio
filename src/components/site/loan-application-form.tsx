

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Send, FileText, User, Banknote, UploadCloud, Calculator } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoanApplicationForm() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/demande-de-pret/merci');
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Section 1: Informations sur le Prêt */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileText />Informations sur le Prêt</CardTitle>
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
                <Input type="number" placeholder="ex: 50000" required />
              </div>
              <div>
                <Label>Durée de remboursement (mois)</Label>
                <Input type="number" placeholder="ex: 120" required />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Informations Personnelles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><User />Informations Personnelles</CardTitle>
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
                <div><Input type="number" placeholder="Jour" required /></div>
                <div><Input type="number" placeholder="Mois" required /></div>
                <div><Input type="number" placeholder="Année" required /></div>
              </div>
            </div>
            <div><Label>Adresse</Label><Input placeholder="123 rue de Paris" required /></div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div><Label>Ville</Label><Input placeholder="Paris" required /></div>
              <div><Label>Code Postal</Label><Input placeholder="75001" required /></div>
              <div><Label>Pays</Label><Input defaultValue="France" required /></div>
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
              <div><Label>Nombre d'enfants</Label><Input type="number" placeholder="0" required /></div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Situation Financière */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Banknote />Situation Financière</CardTitle>
            <CardDescription>Informations sur vos revenus et charges.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Profession</Label><Input placeholder="Développeur, médecin, etc." required /></div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>Revenu Mensuel Net (€)</Label><Input type="number" placeholder="3000" required /></div>
              <div><Label>Charges Mensuelles (€)</Label><Input type="number" placeholder="1200" required /></div>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><UploadCloud />Documents</CardTitle>
            <CardDescription>Téléchargez les documents requis (max 5Mo par fichier).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Pièce d'identité (PDF, JPG, PNG)</Label>
              <Input type="file" required />
            </div>
            <div>
              <Label>Justificatif de domicile de moins de 3 mois</Label>
              <Input type="file" required />
            </div>
            <div>
              <Label>Justificatif de revenus (3 derniers bulletins)</Label>
              <Input type="file" required />
            </div>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground text-center">En cliquant sur "Envoyer ma demande", vous confirmez que les informations fournies sont exactes et complètes, et vous acceptez nos conditions générales et notre politique de confidentialité.</p>
        
        <Button type="submit" size="lg" className="w-full">
          <Send />
          Envoyer ma demande
        </Button>
      </form>
  );
}

const Label = (props: any) => <label {...props} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block" />;
