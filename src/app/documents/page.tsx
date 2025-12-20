
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";

const documents = [
  { slug: 'reconnaissance-de-dette', title: 'Reconnaissance de Dette', description: 'Créez une reconnaissance de dette formelle.' },
  { slug: 'attestation-eligibilite', title: "Attestation d'Éligibilité", description: 'Générez une attestation de capacité de financement.' },
  { slug: 'contrat-de-pret-personnel', title: 'Contrat de Prêt Personnel', description: 'Établissez un contrat de prêt entre particuliers ou avec une société.' },
  { slug: 'acte-de-cautionnement-solidaire', title: 'Acte de Cautionnement Solidaire', description: 'Formalisez un engagement de caution pour un prêt.' },
  { slug: 'attestation-assurance-emprunteur', title: "Attestation d'Assurance", description: 'Produisez une attestation de couverture d\'assurance prêt.' },
  { slug: 'notice-information-assurance', title: "Notice d'Information d'Assurance", description: 'Consultez les détails et exclusions d\'une assurance.' },
  { slug: 'facture', title: 'Facture (Capfinfy)', description: 'Émettez une facture professionnelle pour vos services.' },
  { slug: 'recu-de-paiement', title: 'Reçu de Paiement (Capfinfy)', description: 'Confirmez la réception d\'un paiement pour un service ou un remboursement.' },
  { slug: 'licence-bancaire', title: 'Licence Bancaire', description: 'Générez un certificat de licence d\'établissement de crédit.' },
  { slug: 'autorisation-courtage', title: 'Autorisation de Courtage', description: 'Générez une attestation d\'autorisation pour le courtage de prêt.' },
  { slug: 'recu-neofonds', title: 'Reçu de Paiement (Neofonds)', description: 'Version personnalisée pour l\'entreprise Neofonds.' },
  { slug: 'facture-neofonds', title: 'Facture (Neofonds)', description: 'Générez une facture aux couleurs de Neofonds.' },
  { slug: 'document-vierge', title: 'Document Vierge', description: 'Partez d\'un modèle vierge avec en-tête de Capfinfy.' },
];

export default function DocumentsHomePage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Générateur de Documents</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Choisissez un type de document, remplissez les informations et téléchargez votre fichier PDF professionnel en quelques clics.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.sort((a,b) => a.title.localeCompare(b.title)).map((doc) => (
          <Card key={doc.slug} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>{doc.title}</CardTitle>
                  <CardDescription>{doc.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
              <Button asChild className="w-full">
                <Link href={`/documents/${doc.slug}`}>
                  Générer le document <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
