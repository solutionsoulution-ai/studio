
"use client";
import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { Language } from '@/data/documents/languages';

export type BrandKey = 'vantex';

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
    logoUrl?: string;
    address: string;
    city: string;
    email: string;
    phone: string;
    legal: TranslatableString;
    creditWarning: TranslatableString;
}

interface BrandContextType {
    brand: BrandKey;
    companyInfo: CompanyInfo;
    applyBrandColors: (brand: BrandKey) => void;
    setBrand: (brand: BrandKey) => void;
}

const vantexData: Omit<CompanyInfo, 'brandKey'> = {
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
};

const vantexColors: Record<string, string> = {
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
};

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const BrandProvider = ({ children }: { children: React.ReactNode }) => {
    const applyBrandColors = useCallback((brand: BrandKey) => {
        if (brand === 'vantex') {
            const root = document.documentElement;
            Object.entries(vantexColors).forEach(([key, value]) => {
                root.style.setProperty(key, value);
            });
        }
    }, []);

    const companyInfo = useMemo(() => ({
        ...vantexData,
        brandKey: 'vantex' as BrandKey
    }), []);

    const value = {
        brand: 'vantex' as BrandKey,
        setBrand: () => {}, // No-op as Vantex is the only brand
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
