"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle, Hourglass, Send, RotateCw } from "lucide-react";
import React, { useState, useEffect } from "react";


type TransferStatus = 'idle' | 'processing' | 'success' | 'failed';

export default function VirementsPage() {
  const [status, setStatus] = useState<TransferStatus>('idle');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'processing') {
      setProgress(0);
      let currentProgress = 0;
      timer = setInterval(() => {
        currentProgress += 10;
        setProgress(currentProgress);
        if (currentProgress >= 100) {
          clearInterval(timer);
          // Simulate a random success or failure
          const isBlocked = Math.random() > 0.8; // 20% chance of failure
          setStatus(isBlocked ? 'failed' : 'success');
        }
      }, 300); // 3 seconds total
    }
    return () => clearInterval(timer);
  }, [status]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('processing');
  };

  const handleReset = () => {
    setStatus('idle');
    setProgress(0);
  }

  const renderStatus = () => {
    switch(status) {
      case 'processing':
        return (
          <div className="space-y-4 text-center">
            <Hourglass className="mx-auto h-12 w-12 text-primary animate-spin" />
            <p className="font-semibold">Virement en cours de traitement...</p>
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground">Vérification de la conformité du compte...</p>
          </div>
        );
      case 'success':
        return (
          <Alert variant="default" className="bg-green-50 border-green-200">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-800">Virement Réussi</AlertTitle>
            <AlertDescription className="text-green-700">
              Le virement a été effectué avec succès. Les fonds seront disponibles pour le bénéficiaire sous peu.
            </AlertDescription>
          </Alert>
        );
      case 'failed':
         return (
          <Alert variant="destructive">
            <XCircle className="h-5 w-5" />
            <AlertTitle>Virement Échoué</AlertTitle>
            <AlertDescription>
              Le virement n'a pas pu être traité. Un blocage temporaire est actif sur votre compte. Veuillez contacter le support.
            </AlertDescription>
          </Alert>
        );
      default:
        return null;
    }
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <main className="flex-1">
        <div className="container mx-auto py-12 px-4 max-w-2xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold font-headline">Effectuer un Virement</h1>
            {status !== 'idle' && (
              <Button variant="outline" onClick={handleReset}><RotateCw className="mr-2"/>Nouveau Virement</Button>
            )}
          </div>
          
          <Card>
            {status === 'idle' ? (
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>Détails du virement</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="beneficiary-name">Nom du bénéficiaire</Label>
                    <Input id="beneficiary-name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="iban">IBAN du bénéficiaire</Label>
                    <Input id="iban" placeholder="FR76..." required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Montant (€)</Label>
                      <Input id="amount" type="number" placeholder="100.00" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reason">Motif du virement</Label>
                      <Input id="reason" placeholder="Facture N°123" required />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-6">
                  <Button type="submit" className="w-full">
                    <Send />
                    Effectuer le virement
                  </Button>
                </CardFooter>
              </form>
            ) : (
              <CardContent className="p-6">
                {renderStatus()}
              </CardContent>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}
