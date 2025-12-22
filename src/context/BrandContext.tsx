
"use client";
import React, { createContext, useContext, useState, useMemo } from 'react';

type BrandKey = 'neofonds' | 'finarcy';

interface CompanyInfo {
    brandKey: BrandKey;
    name: string;
    address: string;
    city: string;
    email: string;
    phone: string;
    legal: string;
    creditWarning: string;
}

interface BrandContextType {
    brand: BrandKey;
    setBrand: (brand: BrandKey) => void;
    companyInfo: CompanyInfo;
}

const brandData: Record<BrandKey, Omit<CompanyInfo, 'brandKey'>> = {
    neofonds: {
        name: "Neofonds",
        address: "Mainzer Landstraße 50, 60325 Frankfurt am Main, Deutschland",
        city: "Frankfurt am Main",
        email: "contact@neofonds.com",
        phone: "+49 163 2247344",
        legal: "",
        creditWarning: ""
    },
    finarcy: {
        name: "Finarcy",
        address: "12 Avenue de l'Europe, 75000 Paris, France",
        city: "Paris",
        email: "contact@finarcy.com",
        phone: "+33 6 27 77 57 23",
        legal: "RCS Lyon 841 085 359 | N° SIRET : 800 785 339 00007 | N° ORIAS : 21008519",
        creditWarning: "Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager."
    }
};

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const BrandProvider = ({ children }: { children: React.ReactNode }) => {
    const [brand, setBrand] = useState<BrandKey>('neofonds');

    const companyInfo = useMemo(() => ({
        ...brandData[brand],
        brandKey: brand
    }), [brand]);

    const value = {
        brand,
        setBrand,
        companyInfo,
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
