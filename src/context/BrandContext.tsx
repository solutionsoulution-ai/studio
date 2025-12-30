
"use client";
import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { Language } from '@/data/documents/languages';

export type BrandKey = 'neofonds' | 'finarcy' | 'vantex';

interface TranslatableString {
    fr: string;
    en: string;
    de: string;
    lt: string;
    nl: string;
}

interface CompanyInfo {
    brandKey: BrandKey;
    name: string;
    logoUrl?: string; // Optional logo URL
    address: string;
    city: string;
    email: string;
    phone: string;
    legal: TranslatableString;
    creditWarning: TranslatableString;
}

interface BrandContextType {
    brand: BrandKey;
    setBrand: (brand: BrandKey) => void;
    companyInfo: CompanyInfo;
    applyBrandColors: (brand: BrandKey) => void;
}

const brandData: Record<BrandKey, Omit<CompanyInfo, 'brandKey'>> = {
    neofonds: {
        name: "Neofonds",
        address: "Mainzer Landstraße 50, 60325 Frankfurt am Main, Deutschland",
        city: "Frankfurt am Main",
        email: "contact@neofonds.com",
        phone: "+49 163 2247344",
        logoUrl: "https://i.postimg.cc/76wJbHLK/Capture-d-ecran-2025-12-20-110200.png",
        legal: {
            fr: "",
            en: "",
            de: "",
            lt: "",
            nl: ""
        },
        creditWarning: {
            fr: "Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.",
            en: "A credit commits you and must be repaid. Check your repayment capacity before you commit.",
            de: "Ein Kredit bindet Sie und muss zurückgezahlt werden. Überprüfen Sie Ihre Rückzahlungsfähigkeit, bevor Sie sich verpflichten.",
            lt: "Kreditas įpareigoja ir turi būti grąžintas. Prieš įsipareigodami, patikrinkite savo grąžinimo galimybes.",
            nl: "Een krediet bindt u en moet worden terugbetaald. Controleer uw terugbetalingscapaciteit voordat u zich verbindt."
        }
    },
    finarcy: {
        name: "Finarcy",
        address: "12 Avenue de l'Europe, 75000 Paris, France",
        city: "Paris",
        email: "contact@finarcy.com",
        phone: "+33 6 27 77 57 23",
        logoUrl: "https://i.postimg.cc/DzRqxk59/Capture-d-ecran-2025-12-22-164917.png",
        legal: {
            fr: "RCS Lyon 841 085 359 | N° SIRET : 800 785 339 00007 | N° ORIAS : 21008519",
            en: "RCS Lyon 841 085 359 | SIRET No: 800 785 339 00007 | ORIAS No: 21008519",
            de: "RCS Lyon 841 085 359 | SIRET-Nr.: 800 785 339 00007 | ORIAS-Nr.: 21008519",
            lt: "RCS Lyon 841 085 359 | SIRET Nr.: 800 785 339 00007 | ORIAS Nr.: 21008519",
            nl: "RCS Lyon 841 085 359 | SIRET-nr: 800 785 339 00007 | ORIAS-nr: 21008519"
        },
        creditWarning: {
            fr: "Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.",
            en: "A credit commits you and must be repaid. Check your repayment capacity before you commit.",
            de: "Ein Kredit bindet Sie und muss zurückgezahlt werden. Überprüfen Sie Ihre Rückzahlungsfähigkeit, bevor Sie sich verpflichten.",
            lt: "Kreditas įpareigoja ir turi būti grąžintas. Prieš įsipareigodami, patikrinkite savo grąžinimo galimybes.",
            nl: "Een krediet bindt u en moet worden terugbetaald. Controleer uw terugbetalingscapaciteit voordat u zich verbindt."
        }
    },
    vantex: {
        name: "Vantex Bank",
        address: "66 Avenue des Champs-Élysées, 75008 Paris, France",
        city: "Paris",
        email: "bankservices@vantex-bank.net",
        phone: "+84567056073",
        logoUrl: "https://i.postimg.cc/bwdKwMpJ/unnamed.png",
        legal: {
            fr: "RCS PARIS 30 000",
            en: "RCS PARIS 30 000",
            de: "RCS PARIS 30 000",
            lt: "RCS PARIS 30 000",
            nl: "RCS PARIJS 30 000"
        },
        creditWarning: {
            fr: "Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.",
            en: "A credit commits you and must be repaid. Check your repayment capacity before you commit.",
            de: "Ein Kredit bindet Sie und muss zurückgezahlt werden. Überprüfen Sie Ihre Rückzahlungsfähigkeit, bevor Sie sich verpflichten.",
            lt: "Kreditas įpareigoja ir turi būti grąžintas. Prieš įsipareigodami, patikrinkite savo grąžinimo galimybes.",
            nl: "Een krediet bindt u en moet worden terugbetaald. Controleer uw terugbetalingscapaciteit voordat u zich verbindt."
        }
    }
};

const brandColors: Record<BrandKey, Record<string, string>> = {
  neofonds: {
    '--background': '0 0% 100%',
    '--foreground': '222 84% 5%',
    '--primary': '217 91% 60%',
    '--secondary': '160 76% 45%',
  },
  finarcy: {
    '--background': '0 0% 100%',
    '--foreground': '222 84% 5%',
    '--primary': '217 91% 60%',
    '--secondary': '160 76% 45%',
  },
  vantex: {
    '--background': '0 0% 100%', // white
    '--foreground': '240 10% 4%', // almost black #09090b
    '--primary': '151 100% 32%', // green #00a651
    '--secondary': '226 76% 33%', // blue #1e3a8a
    '--muted': '220 13% 96%', // light grey #f4f4f5
    '--muted-foreground': '220 9% 46%', // medium grey #707079
    '--accent': '216 34% 17%', // dark accent #2c3e50
    '--primary-foreground': '0 0% 98%', // #fafafa
    '--secondary-foreground': '0 0% 98%', // #fafafa
    '--accent-foreground': '0 0% 98%', // #fafafa
    '--border': '220 13% 91%', // #f4f4f5
  }
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const BrandProvider = ({ children }: { children: React.ReactNode }) => {
    const [brand, setBrand] = useState<BrandKey>('neofonds');

    const applyBrandColors = useCallback((brand: BrandKey) => {
        const colors = brandColors[brand];
        const root = document.documentElement;
        Object.entries(colors).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
    }, []);

    const companyInfo = useMemo(() => ({
        ...brandData[brand],
        brandKey: brand
    }), [brand]);

    const value = {
        brand,
        setBrand,
        companyInfo,
        applyBrandColors,
    };

    return (
        <BrandContext.Provider value={value}>
            {children}
        </BrandContext.Provider>
    );
};

export const useBrand = () => {
    const context = useContext(BrandContext);
    if (context === undefined) {
        throw new Error('useBrand must be used within a BrandProvider');
    }
    return context;
};
