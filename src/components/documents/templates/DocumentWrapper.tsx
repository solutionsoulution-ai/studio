
import React from 'react';
import Image from 'next/image';

interface DocumentWrapperProps {
  children: React.ReactNode;
  title: string;
  department?: string;
  docRef?: string;
  docDate?: string;
  hideDepartment?: boolean;
  lang: 'fr' | 'en' | 'de';
}

const DocumentWrapper: React.FC<DocumentWrapperProps> = ({ children, title, department, docRef, docDate, hideDepartment = false, lang }) => {
  const footerText = {
    fr: {
      copyright: '© 2025 Neofonds. Tous droits réservés.',
      confidential: 'Ce document est généré électroniquement et est confidentiel.'
    },
    en: {
      copyright: '© 2025 Neofonds. All rights reserved.',
      confidential: 'This document is electronically generated and is confidential.'
    },
    de: {
      copyright: '© 2025 Neofonds. Alle Rechte vorbehalten.',
      confidential: 'Dieses Dokument wird elektronisch erstellt und ist vertraulich.'
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
      opacity: 0.8,
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
      }}>Neofonds GmbH</div>
      <div style={{
        height: '2px',
        width: '50%',
        backgroundColor: 'hsl(var(--primary))',
        margin: '4px 0'
      }}></div>
      <div style={{
        fontSize: '9px',
        lineHeight: '1.1',
      }}>Frankfurt am Main</div>
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
            maxWidth: '800px',
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
                <Image src="https://i.postimg.cc/ZqGtbXxd/Capture-d-ecran-2025-12-20-110200.png" alt="Neofonds Logo" width={140} height={35} />
            </div>
            <div style={{ textAlign: 'right', fontSize: '9pt', color: '#64748b' }}>
                <p>Mainzer Landstraße 50, 60325 Frankfurt am Main, Deutschland</p>
                <p>contact@neofonds.com</p>
                <p>+49 163 2247344</p>
            </div>
        </header>

        <main>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                 <h1 style={{ fontSize: '20pt', fontWeight: 'bold', color: 'hsl(var(--primary))', textTransform: 'uppercase' }}>{title}</h1>
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
        </footer>
    </div>
  );
};

export default DocumentWrapper;
