
import React from 'react';
import Image from 'next/image';
import { useBrand } from '@/context/BrandContext';

interface DocumentWrapperProps {
  children: React.ReactNode;
  title: string;
  department?: string;
  docRef?: string;
  docDate?: string;
  hideDepartment?: boolean;
  lang: 'fr' | 'en' | 'de' | 'lt' | 'nl';
}

const DocumentWrapper: React.FC<DocumentWrapperProps> = ({ children, title, department, docRef, docDate, hideDepartment = false, lang }) => {
  const { companyInfo } = useBrand();

  const footerText = {
    fr: {
      copyright: `© ${new Date().getFullYear()} ${companyInfo.name}. Tous droits réservés.`,
      confidential: 'Ce document est généré électroniquement et est confidentiel.'
    },
    en: {
      copyright: `© ${new Date().getFullYear()} ${companyInfo.name}. All rights reserved.`,
      confidential: 'This document is electronically generated and is confidential.'
    },
    de: {
      copyright: `© ${new Date().getFullYear()} ${companyInfo.name}. Alle Rechte vorbehalten.`,
      confidential: 'Dieses Dokument wird elektronisch erstellt und ist vertraulich.'
    },
    lt: {
      copyright: `© ${new Date().getFullYear()} ${companyInfo.name}. Visos teisės saugomos.`,
      confidential: 'Šis dokumentas yra sugeneruotas elektroniniu būdu ir yra konfidencialus.'
    },
    nl: {
      copyright: `© ${new Date().getFullYear()} ${companyInfo.name}. Alle rechten voorbehouden.`,
      confidential: 'Dit document is elektronisch gegenereerd en is vertrouwelijk.'
    }
  };

  const currentFooterText = footerText[lang] || footerText['fr'];

  const Seal = () => (
    <div style={{
      position: 'absolute',
      right: '60px',
      bottom: '100px',
      width: '140px',
      height: '140px',
      border: '5px double hsl(var(--primary))',
      borderRadius: '50%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0.08,
      transform: 'rotate(-15deg)',
      color: 'hsl(var(--primary))',
      textAlign: 'center',
      padding: '10px',
      boxSizing: 'border-box',
    }}>
      <div style={{
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '1.2',
        textTransform: 'uppercase'
      }}>{companyInfo.name}</div>
      <div style={{
        height: '2px',
        width: '50%',
        backgroundColor: 'hsl(var(--primary))',
        margin: '4px 0'
      }}></div>
      <div style={{
        fontSize: '9px',
        lineHeight: '1.1',
      }}>{companyInfo.city}</div>
    </div>
  );

  return (
    <div 
        style={{
            fontFamily: 'Helvetica, Arial, sans-serif',
            color: '#0f172a',
            background: '#ffffff',
            fontSize: '12pt',
            padding: '40px',
            width: '794px',
            margin: 'auto',
            border: '1px solid #e2e8f0',
            position: 'relative'
        }}
    >
        <Seal />
        <header 
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                paddingBottom: '20px',
                marginBottom: '30px',
                borderBottom: '1px solid #e2e8f0'
            }}
        >
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {companyInfo.brandKey === 'vantex' && companyInfo.logoUrl ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Image src={companyInfo.logoUrl} alt={`${companyInfo.name} logo`} width={120} height={35} style={{ mixBlendMode: 'darken' }} />
                  </div>
                ) : companyInfo.brandKey === 'finarcy' && companyInfo.logoUrl ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Image src={companyInfo.logoUrl} alt={`${companyInfo.name} logo`} width={40} height={40} />
                    </div>
                ) : companyInfo.logoUrl ? (
                    <Image src={companyInfo.logoUrl} alt={`${companyInfo.name} logo`} width={140} height={40} style={{ mixBlendMode: 'darken' }} />
                ) : (
                    <h1 style={{ fontWeight: 'bold', fontSize: '24px' }}>{companyInfo.name}</h1>
                )}
             </div>
             {companyInfo.brandKey === 'finarcy' ? (
                <div style={{ textAlign: 'center', flexGrow: 1 }}>
                    <h1 style={{ fontWeight: 'bold', fontSize: '24px', color: 'hsl(var(--primary))' }}>{companyInfo.name}</h1>
                </div>
            ) : null}
            <div style={{ textAlign: 'right', fontSize: '9pt', color: '#64748b' }}>
                <p>{companyInfo.address}</p>
                <p>{companyInfo.email}</p>
                <p>{companyInfo.phone}</p>
            </div>
        </header>

        <main>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                 <h2 style={{ fontSize: '20pt', fontWeight: 'bold', color: 'hsl(var(--primary))', textTransform: 'uppercase' }}>{title}</h2>
                 {!hideDepartment && <p style={{ fontSize: '10pt', color: '#64748b' }}>{department}</p>}
                 {(docRef || docDate) && (
                    <p style={{ fontSize: '9pt', color: '#64748b', marginTop: '4px' }}>
                        {docRef} {docRef && docDate && '//'} {docDate}
                    </p>
                 )}
            </div>
            
            {children}
        </main>

        <footer 
            style={{
                marginTop: '40px',
                paddingTop: '20px',
                borderTop: '1px solid #e2e8f0',
                textAlign: 'center',
                fontSize: '9pt',
                color: '#64748b'
            }}
        >
            <p style={{fontWeight: 'bold', color: '#0f172a'}}>{currentFooterText.copyright}</p>
            <p>{currentFooterText.confidential}</p>
            <p className="mt-2 text-xs">{companyInfo.legal}</p>
            <p className="font-bold text-xs mt-1">{companyInfo.creditWarning}</p>
        </footer>
    </div>
  );
};

export default DocumentWrapper;
