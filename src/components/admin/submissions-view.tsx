
"use client";

import { useState } from "react";
import type { ClientProfile } from "@/app/actions/clients";
import { AlertCircle, FileText, MessageSquare, Loader2, Trash2, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { deleteClientAction } from "@/app/actions/clients";
import { useToast } from "@/hooks/use-toast";


interface SubmissionsViewProps {
    submissions: Omit<ClientProfile, 'password'>[];
    isLoading: boolean;
    error: string | null;
    onSubmissionDeleted: () => void;
}

const formatCurrency = (value: number | null | undefined) => {
    if (value === undefined || value === null) return 'N/A';
    return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
    }).format(value);
};

const SubmissionDetailDialog = ({ submission, open, onOpenChange }: { submission: Omit<ClientProfile, 'password'> | null, open: boolean, onOpenChange: (open: boolean) => void }) => {
    if (!submission) return null;

    const isLoanApplication = submission.has_loan;
    const contactMessageTx = submission.transactions?.find(t => t.reason.startsWith("Message de Contact:"));
    
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Détails de la Soumission</DialogTitle>
                    <DialogDescription>
                        Client: {submission.email} (ID Interne: {submission.id})
                    </DialogDescription>
                </DialogHeader>
                <div className="max-h-[70vh] overflow-y-auto pr-4 space-y-6">
                    {isLoanApplication && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Demande de Prêt</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-2 grid grid-cols-1 md:grid-cols-2 gap-x-4">
                                <p><strong>Nom:</strong> {submission.first_name} {submission.last_name}</p>
                                <p><strong>Email:</strong> {submission.email}</p>
                                <p><strong>Téléphone:</strong> {submission.phone}</p>
                                <p><strong>Date de naissance:</strong> {submission.birth_date ? new Date(submission.birth_date).toLocaleDateString('fr-FR') : 'N/A'}</p>
                                <p className="md:col-span-2"><strong>Adresse:</strong> {`${submission.address}, ${submission.postal_code} ${submission.city}, ${submission.country}`}</p>
                                <p><strong>Situation:</strong> {submission.marital_status}</p>
                                <p><strong>Enfants:</strong> {submission.number_of_children}</p>
                                <p><strong>Profession:</strong> {submission.occupation}</p>
                                <p><strong>Revenu Mensuel:</strong> {formatCurrency(submission.monthly_income)}</p>
                                <p><strong>Charges Mensuelles:</strong> {formatCurrency(submission.monthly_expenses)}</p>
                                <p className="md:col-span-2 border-t pt-2 mt-2 font-bold">Détails du prêt demandé</p>
                                <p><strong>Type:</strong> {submission.loan_type}</p>
                                <p><strong>Montant:</strong> {formatCurrency(submission.loan_amount)}</p>
                                <p><strong>Durée:</strong> {submission.loan_term} mois</p>
                                <p><strong>Date de la demande:</strong> {new Date(submission.created_at).toLocaleString('fr-FR')}</p>
                                <div className="md:col-span-2 border-t pt-2 mt-2 font-bold">Documents fournis</div>
                                {submission.identity_document_url && (
                                    <p><strong>Pièce d'identité:</strong> <Button variant="link" asChild><a href={submission.identity_document_url} target="_blank" rel="noopener noreferrer">Voir le document</a></Button></p>
                                )}
                                {submission.proof_of_address_url && (
                                    <p><strong>Justificatif de domicile:</strong> <Button variant="link" asChild><a href={submission.proof_of_address_url} target="_blank" rel="noopener noreferrer">Voir le document</a></Button></p>
                                )}
                                {submission.proof_of_income_url && (
                                    <p><strong>Justificatif de revenus:</strong> <Button variant="link" asChild><a href={submission.proof_of_income_url} target="_blank" rel="noopener noreferrer">Voir le document</a></Button></p>
                                )}
                            </CardContent>
                        </Card>
                    )}
                    
                     {contactMessageTx && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Message de Contact</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-1">
                                 <p><strong>Date:</strong> {new Date(contactMessageTx.created_at).toLocaleString('fr-FR')}</p>
                                 <p className="border-t pt-2 mt-2"><strong>Message:</strong></p>
                                 <blockquote className="p-2 bg-muted rounded-md">{contactMessageTx.reason.substring("Message de Contact: ".length)}</blockquote>
                            </CardContent>
                        </Card>
                    )}
                </div>
                <DialogClose asChild>
                    <Button type="button" variant="outline" className="mt-4 w-full">Fermer</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}

export default function SubmissionsView({ submissions, isLoading, error, onSubmissionDeleted }: SubmissionsViewProps) {
    const [selectedSubmission, setSelectedSubmission] = useState<Omit<ClientProfile, 'password'> | null>(null);
    const [submissionToDelete, setSubmissionToDelete] = useState<Omit<ClientProfile, 'password'> | null>(null);
    const { toast } = useToast();

    const loanSubmissions = submissions.filter(s => s.has_loan === true);
    const contactMessages = submissions.filter(s => s.transactions?.some(t => t.reason.startsWith("Message de Contact:")));

    const handleDelete = async () => {
        if (!submissionToDelete) return;
        
        const result = await deleteClientAction(submissionToDelete.id);
        if (result.success) {
            toast({ title: "Soumission supprimée avec succès!" });
            onSubmissionDeleted();
        } else {
            toast({ title: "Erreur", description: result.error, variant: "destructive" });
        }
        setSubmissionToDelete(null);
    };

    if (isLoading) {
         return (
            <div className="space-y-4">
                <Skeleton className="h-10 w-1/3" />
                <Skeleton className="h-48 w-full" />
            </div>
        );
    }

    if (error) {
         return (
             <Card className="w-full shadow-lg mt-8 lg:mt-0">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl font-bold">
                       <AlertCircle className="text-destructive" /> Erreur
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-destructive py-12">
                    {error}
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <SubmissionDetailDialog 
                submission={selectedSubmission}
                open={!!selectedSubmission}
                onOpenChange={(open) => !open && setSelectedSubmission(null)}
            />
            <AlertDialog open={!!submissionToDelete} onOpenChange={(open) => !open && setSubmissionToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Cette action est irréversible. La soumission de <strong>{submissionToDelete?.email}</strong> sera définitivement supprimée.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Supprimer</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Tabs defaultValue="loan_applications" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="loan_applications"><FileText className="mr-2" /> Demandes de Prêt ({loanSubmissions.length})</TabsTrigger>
                    <TabsTrigger value="contact_messages"><MessageSquare className="mr-2" /> Messages ({contactMessages.length})</TabsTrigger>
                </TabsList>
                <TabsContent value="loan_applications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Demandes de Prêt</CardTitle>
                            <CardDescription>Liste de toutes les demandes de prêt soumises.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Type de Prêt</TableHead>
                                        <TableHead>Montant</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loanSubmissions.length > 0 ? loanSubmissions.map(sub => (
                                        <TableRow key={sub.id}>
                                            <TableCell className="cursor-pointer hover:underline" onClick={() => setSelectedSubmission(sub)}>{sub.email}</TableCell>
                                            <TableCell>{sub.loan_type}</TableCell>
                                            <TableCell>{formatCurrency(sub.loan_amount)}</TableCell>
                                            <TableCell>{new Date(sub.created_at).toLocaleDateString('fr-FR')}</TableCell>
                                            <TableCell className="text-right">
                                                 <Button variant="ghost" size="icon" onClick={() => setSubmissionToDelete(sub)}>
                                                    <Trash2 className="w-4 h-4 text-destructive" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow><TableCell colSpan={5} className="text-center h-24">Aucune demande de prêt.</TableCell></TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="contact_messages">
                     <Card>
                        <CardHeader>
                            <CardTitle>Messages de Contact</CardTitle>
                             <CardDescription>Liste de tous les messages de contact reçus.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Message (extrait)</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {contactMessages.length > 0 ? contactMessages.map(sub => {
                                        const contactTx = sub.transactions?.find(t => t.reason.startsWith("Message de Contact:"));
                                        return (
                                            <TableRow key={sub.id}>
                                                <TableCell className="cursor-pointer hover:underline" onClick={() => setSelectedSubmission(sub)}>{sub.email}</TableCell>
                                                <TableCell>{new Date(sub.created_at).toLocaleDateString('fr-FR')}</TableCell>
                                                <TableCell className="truncate max-w-sm">{contactTx?.reason.substring("Message de Contact: ".length)}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="icon" onClick={() => setSubmissionToDelete(sub)}>
                                                        <Trash2 className="w-4 h-4 text-destructive" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }) : (
                                        <TableRow><TableCell colSpan={4} className="text-center h-24">Aucun message de contact.</TableCell></TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </>
    )
}
