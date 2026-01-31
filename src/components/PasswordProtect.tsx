
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Lock } from 'lucide-react';
import { useBrand, BrandKey } from '@/context/BrandContext';

const VANTEX_PASSWORD = process.env.NEXT_PUBLIC_VANTEX_PASSWORD || '1234';
const VALIDATOR_PASSWORD = 'valideur';
const COOKIE_NAME = 'doc-gen-auth-brand';

export default function PasswordProtect({ children }: { children: React.ReactNode }) {
  const { applyBrandColors } = useBrand();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for cookie on mount
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${COOKIE_NAME}=`))
      ?.split('=')[1];

    if (cookieValue === 'vantex' || cookieValue === 'validator') {
      if (cookieValue === 'vantex') {
        applyBrandColors('vantex');
      }
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [applyBrandColors]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    let role: BrandKey | 'validator' | null = null;
    if (password === VANTEX_PASSWORD) {
      role = 'vantex';
    } else if (password === VALIDATOR_PASSWORD) {
      role = 'validator';
    }

    if (role) {
      document.cookie = `${COOKIE_NAME}=${role}; path=/; SameSite=Lax; Secure`;
      if (role === 'validator') {
        router.push('/validator');
      } else {
        applyBrandColors(role);
        setIsAuthenticated(true);
      }
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
