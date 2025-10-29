import React from 'react';

interface DocumentWrapperProps {
  children: React.ReactNode;
  title: string;
  department?: string;
  docRef?: string;
  docDate?: string;
  hideDepartment?: boolean;
}

const DocumentWrapper: React.FC<DocumentWrapperProps> = ({ children, title, department, docRef, docDate, hideDepartment = false }) => {
  return (
    <div 
        style={{
            fontFamily: 'Helvetica, Arial, sans-serif',
            color: 'hsl(224, 71.4%, 4.1%)',
            background: 'hsl(0, 0%, 100%)',
            fontSize: '12pt',
            padding: '40px',
            maxWidth: '800px',
            margin: 'auto',
            border: '1px solid hsl(220, 13%, 91%)'
        }}
    >
        <header 
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                paddingBottom: '20px',
                marginBottom: '30px',
                borderBottom: '1px solid hsl(220, 13%, 91%)'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '24pt', fontWeight: 'bold', color: 'hsl(215, 39%, 29%)' }}>Capfinfy</span>
            </div>
            <div style={{ textAlign: 'right', fontSize: '9pt', color: 'hsl(220, 8.9%, 46.1%)' }}>
                <p>1 Place de la Bourse, 69002 Lyon, France</p>
                <p>contact@capfinfy.com</p>
                <p>www.capfinfy.com</p>
            </div>
        </header>

        <main>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                 <h1 style={{ fontSize: '20pt', fontWeight: 'bold', color: 'hsl(215, 39%, 29%)', textTransform: 'uppercase' }}>{title}</h1>
                 {!hideDepartment && <p style={{ fontSize: '10pt', color: 'hsl(220, 8.9%, 46.1%)' }}>{department}</p>}
                 {(docRef || docDate) && (
                    <p style={{ fontSize: '9pt', color: 'hsl(220, 8.9%, 46.1%)', marginTop: '4px' }}>
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
                borderTop: '1px solid hsl(220, 13%, 91%)',
                textAlign: 'center',
                fontSize: '9pt',
                color: 'hsl(220, 8.9%, 46.1%)'
            }}
        >
            <p style={{fontWeight: 'bold', color: 'hsl(224, 71.4%, 4.1%)'}}>© 2025 CAPFINFY. Tous droits réservés.</p>
            <p>Ce document est généré électroniquement et est confidentiel.</p>
        </footer>
    </div>
  );
};

export default DocumentWrapper;
