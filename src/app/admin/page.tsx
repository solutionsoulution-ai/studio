
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import { ArrowUpRight, Ban, CheckCircle2, CircleDashed, Clock, FileDown, MoreHorizontal, User } from "lucide-react";

const mockClients = [
    { id: "CL001", name: "Jean Dupont", email: "jean.dupont@email.com", loanAmount: "50 000 €", status: "Approuvé", joinDate: "2023-01-15" },
    { id: "CL002", name: "Marie Curie", email: "marie.curie@email.com", loanAmount: "250 000 €", status: "En attente", joinDate: "2023-03-22" },
    { id: "CL003", name: "Louis Pasteur", email: "louis.pasteur@email.com", loanAmount: "15 000 €", status: "Rejeté", joinDate: "2023-04-10" },
    { id: "CL004", name: "Simone de Beauvoir", email: "simone.beauvoir@email.com", loanAmount: "120 000 €", status: "Approuvé", joinDate: "2023-05-01" },
    { id: "CL005", name: "Albert Camus", email: "albert.camus@email.com", loanAmount: "8 000 €", status: "Approuvé", joinDate: "2023-06-30" },
];

const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
        case "Approuvé":
            return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle2 className="mr-1 h-3 w-3" />Approuvé</Badge>;
        case "En attente":
            return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="mr-1 h-3 w-3" />En attente</Badge>;
        case "Rejeté":
            return <Badge variant="destructive"><Ban className="mr-1 h-3 w-3" />Rejeté</Badge>;
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
};

export default function AdminPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-muted/40">
            <SiteHeader />
            <main className="flex-1 py-12">
                <div className="container mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold tracking-tight">Tableau de Bord Administrateur</h1>
                        <p className="text-muted-foreground">Gérez les clients et les soumissions ici.</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Clients Actifs</CardTitle>
                                <User className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{mockClients.length}</div>
                                <p className="text-xs text-muted-foreground">+2 depuis le mois dernier</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Demandes en Attente</CardTitle>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">1</div>
                                <p className="text-xs text-muted-foreground">Nouvelle demande à traiter</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Taux d'Approbation</CardTitle>
                                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">75%</div>
                                <p className="text-xs text-muted-foreground">Basé sur les 30 derniers jours</p>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Soumissions Totales</CardTitle>
                                <CircleDashed className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">5</div>
                                <p className="text-xs text-muted-foreground">Depuis le début</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Soumissions de Prêt Récentes</CardTitle>
                            <CardDescription>
                                Voici la liste des dernières demandes de financement soumises par les utilisateurs.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Client</TableHead>
                                        <TableHead className="hidden sm:table-cell">Montant</TableHead>
                                        <TableHead className="hidden md:table-cell">Date</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockClients.map((client) => (
                                        <TableRow key={client.id}>
                                            <TableCell>
                                                <div className="font-medium">{client.name}</div>
                                                <div className="text-sm text-muted-foreground hidden md:inline">{client.email}</div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">{client.loanAmount}</TableCell>
                                            <TableCell className="hidden md:table-cell">{client.joinDate}</TableCell>
                                            <TableCell>
                                                <StatusBadge status={client.status} />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                 <Button size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <SiteFooter />
        </div>
    );
}
