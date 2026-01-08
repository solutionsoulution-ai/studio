"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DocumentPageClient from "@/components/documents/DocumentPageClient";
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export default function ValidatorPage() {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // Check for cookie on mount
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('doc-gen-auth-brand='))
            ?.split('=')[1];

        if (cookieValue !== 'validator') {
            router.push('/');
        }
    }, [router]);
    
    const handleLogout = () => {
        document.cookie = 'doc-gen-auth-brand=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        router.push('/');
    }

    if (!isClient) {
        return null; // or a loading spinner
    }

    return (
        <div>
            <div className="w-full p-4 bg-background border-b flex justify-between items-center">
                <h1 className="text-lg font-semibold">Espace Valideur</h1>
                <Button onClick={handleLogout} variant="outline" size="sm">
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                </Button>
            </div>
            <DocumentPageClient slug="certificat-non-blanchiment" />
        </div>
    );
}
