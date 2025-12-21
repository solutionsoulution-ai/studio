"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Lock } from 'lucide-react';

const CORRECT_PASSWORD = process.env.NEXT_PUBLIC_APP_PASSWORD || 'otp2020@';
const COOKIE_NAME = 'neofonds-auth-simple';

export default function PasswordProtect({ children }: { children: React.ReactNode }) {
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

    if (cookieValue === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password === CORRECT_PASSWORD) {
      // Set a session cookie
      document.cookie = `${COOKIE_NAME}=true; path=/; SameSite=Lax; Secure`;
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
       <div className="mb-6">
        <Image src="https://i.postimg.cc/ZqGtbXxd/Capture-d-ecran-2025-12-20-110200.png" alt="Neofonds Logo" width={200} height={50} />
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Lock className="h-5 w-5" />
            Accès Sécurisé
          </CardTitle>
          <CardDescription>Veuillez entrer le mot de passe pour accéder au site.</CardDescription>
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
      <p className="text-xs text-muted-foreground mt-4">Neofonds &copy; {new Date().getFullYear()}</p>
    </div>
  );
}
