
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SiteFooter from "@/components/site/site-footer";
import SiteHeader from "@/components/site/site-header";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-background">
            <SiteHeader />
            <main className="flex-1 flex items-center justify-center py-12">
                <Card className="mx-auto max-w-sm w-full">
                    <CardHeader>
                        <CardTitle className="text-2xl">Connexion</CardTitle>
                        <CardDescription>
                            Accédez à votre espace personnel ou au tableau de bord administrateur.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="vous@exemple.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Mot de passe</Label>
                                    <Link
                                        href="#"
                                        className="ml-auto inline-block text-sm underline"
                                    >
                                        Mot de passe oublié?
                                    </Link>
                                </div>
                                <Input id="password" type="password" required />
                            </div>
                            <Button type="submit" asChild className="w-full">
                                <Link href="/dashboard">
                                    <LogIn className="mr-2 h-4 w-4" /> Se Connecter
                                </Link>
                            </Button>
                             <p className="text-center text-sm text-muted-foreground mt-4">
                                Pour la démo, cliquez sur "Se Connecter" pour accéder à l'espace client. Pour voir l'espace admin, allez sur <Link href="/admin" className="underline">/admin</Link>.
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </main>
            <SiteFooter />
        </div>
    );
}
