import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useBankingStore } from "@/hooks/use-banking-store.tsx";
import { User, Mail, Phone, MapPin, Building, Briefcase } from "lucide-react";

export default function ProfilPage() {
  const { user, account } = useBankingStore();
  
  const userData = {
    ...user,
    phone: "+33 6 12 34 56 78",
    address: "123 Rue de la République, 69002 Lyon, France",
    company: "Dubois & Fils Tech",
    role: "Directeur Général",
    ...account,
  };


  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <main className="flex-1">
        <div className="container mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold font-headline mb-8">Mon Profil</h1>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Colonne d'informations */}
            <div className="md:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3"><User className="text-primary"/>Informations Personnelles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <span>{userData.email}</span>
                  </div>
                   <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <span>{userData.phone}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <span>{userData.address}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3"><Briefcase className="text-primary"/>Informations Professionnelles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Building className="w-5 h-5 text-muted-foreground" />
                    <span>{userData.company}</span>
                  </div>
                   <div className="flex items-center gap-4">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <span>{userData.role}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Colonne latérale */}
            <div className="space-y-8">
              <Card>
                 <CardHeader>
                  <CardTitle className="text-center">{userData.name}</CardTitle>
                  <CardDescription className="text-center">Client depuis le {userData.memberSince}</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Coordonnées Bancaires</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <Label>IBAN</Label>
                    <p className="font-mono text-muted-foreground break-all">{userData.iban}</p>
                  </div>
                   <div>
                    <Label>BIC</Label>
                    <p className="font-mono text-muted-foreground">{userData.bic}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

const Label = (props: any) => <label {...props} className="text-xs font-semibold text-primary uppercase tracking-wider" />;
