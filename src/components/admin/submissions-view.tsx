
"use client";

import { useState } from "react";
import type { ClientProfile } from "@/app/actions/clients";
import { AlertCircle, FileText, MessageSquare, CheckSquare, Loader2, Trash2 } from "lucide-react";
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
import { Button } from "../ui/button";

interface SubmissionsViewProps {
    submissions: Omit<ClientProfile, 'password'>[];
    isLoading: boolean;
    error: string | null;
}

const formatCurrency = (value: number | undefined) => {
    if (value === undefined) return 'N/A';
    return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
    }).format(value);
};

const SubmissionDetailDialog = ({ submission, open, onOpenChange }: { submission: Omit<ClientProfile, 'password'> | null, open: boolean, onOpenChange: (open: boolean) => void }) => {
    if (!submission) return null;

    const loanApplication = submission.transactions.find(t => t.reason.startsWith("Demande de Prêt"));
    const eligibilityCheck = submission.transactions.find(t => t.reason.startsWith("Test Éligibilité"));
    const contactMessage = submission.transactions.find(t => t.reason.startsWith("Message de Contact"));

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Détails de la Soumission</DialogTitle>
                    <DialogDescription>
                        Client: {submission.email} (ID: {submission.client_id})
                    </DialogDescription>
                </DialogHeader>
                <div className="max-h-[70vh] overflow-y-auto pr-4 space-y-6">
                    {loanApplication && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Demande de Prêt</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-1">
                                <p><strong>Type:</strong> {submission.loan_type}</p>
                                <p><strong>Montant:</strong> {formatCurrency(submission.loan_amount)}</p>
                                <p><strong>Durée:</strong> {submission.loan_term} mois</p>
                                <p><strong>Date de la demande:</strong> {new Date(loanApplication.created_at).toLocaleString('fr-FR')}</p>
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
                    
                     {contactMessage && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Message de Contact</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-1">
                                 <p><strong>Date:</strong> {new Date(contactMessage.created_at).toLocaleString('fr-FR')}</p>
                                 <p className="border-t pt-2 mt-2"><strong>Message:</strong></p>
                                 <blockquote className="p-2 bg-muted rounded-md">{contactMessage.reason.substring("Message de Contact: ".length)}</blockquote>
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

export default function SubmissionsView({ submissions, isLoading, error }: SubmissionsViewProps) {
    const [selectedSubmission, setSelectedSubmission] = useState<Omit<ClientProfile, 'password'> | null>(null);

    const loanSubmissions = submissions.filter(s => s.transactions.some(t => t.reason.startsWith("Demande de Prêt")));
    const contactMessages = submissions.filter(s => s.transactions.some(t => t.reason.startsWith("Message de Contact")));

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
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loanSubmissions.length > 0 ? loanSubmissions.map(sub => (
                                        <TableRow key={sub.id} className="cursor-pointer" onClick={() => setSelectedSubmission(sub)}>
                                            <TableCell>{sub.email}</TableCell>
                                            <TableCell>{sub.loan_type}</TableCell>
                                            <TableCell>{formatCurrency(sub.loan_amount)}</TableCell>
                                            <TableCell>{new Date(sub.created_at).toLocaleDateString('fr-FR')}</TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow><TableCell colSpan={4} className="text-center h-24">Aucune demande de prêt.</TableCell></TableRow>
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
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {contactMessages.length > 0 ? contactMessages.map(sub => (
                                        <TableRow key={sub.id} className="cursor-pointer" onClick={() => setSelectedSubmission(sub)}>
                                            <TableCell>{sub.email}</TableCell>
                                            <TableCell>{new Date(sub.created_at).toLocaleDateString('fr-FR')}</TableCell>
                                            <TableCell className="truncate max-w-sm">{sub.transactions.find(t => t.reason.startsWith("Message de Contact"))?.reason.substring("Message de Contact: ".length)}</TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow><TableCell colSpan={3} className="text-center h-24">Aucun message de contact.</TableCell></TableRow>
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
