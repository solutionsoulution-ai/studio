"use client";

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Lock } from 'lucide-react';
import { useBrand, BrandKey } from '@/context/BrandContext';

const NEOFONDS_PASSWORD = process.env.NEXT_PUBLIC_NEOFONDS_PASSWORD || 'otp2020@';
const FINARCY_PASSWORD = process.env.NEXT_PUBLIC_FINARCY_PASSWORD || 'saldoc2020@';
const VANTEX_PASSWORD = process.env.NEXT_PUBLIC_VANTEX_PASSWORD || '1234';
const COOKIE_NAME = 'doc-gen-auth-brand';

export default function PasswordProtect({ children }: { children: React.ReactNode }) {
  const { setBrand, applyBrandColors } = useBrand();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for cookie on mount
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${COOKIE_NAME}=`))
      ?.split('=')[1];

    if (cookieValue === 'neofonds' || cookieValue === 'finarcy' || cookieValue === 'vantex') {
      const brand = cookieValue as BrandKey;
      setBrand(brand);
      applyBrandColors(brand);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [setBrand, applyBrandColors]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    let brand: BrandKey | null = null;
    if (password === NEOFONDS_PASSWORD) {
      brand = 'neofonds';
    } else if (password === FINARCY_PASSWORD) {
      brand = 'finarcy';
    } else if (password === VANTEX_PASSWORD) {
      brand = 'vantex';
    }

    if (brand) {
      // Set a session cookie
      document.cookie = `${COOKIE_NAME}=${brand}; path=/; SameSite=Lax; Secure`;
      setBrand(brand);
      applyBrandColors(brand);
      setIsAuthenticated(true);
    } else {
      setError('Mot de passe incorrect.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-muted/20">
        <p>Chargement...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-muted/20 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
              <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>
            Accès Sécurisé
          </CardTitle>
          <CardDescription>Veuillez entrer le mot de passe pour accéder au générateur de documents.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Erreur</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              required
            />
            <Button type="submit" className="w-full">
              Déverrouiller
            </Button>
          </form>
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground mt-4 text-center">
        Cet outil est réservé à un usage interne.
      </p>
    </div>
  );
}
