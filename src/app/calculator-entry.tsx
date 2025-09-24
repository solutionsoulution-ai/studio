
"use client";

import React from 'react';
import ReactDOM from 'react-dom/client';
import InterestRateCalculator from '@/components/site/interest-rate-calculator';

// Ce composant est une enveloppe pour s'assurer que les styles globaux sont disponibles
// si le composant en dépend, même s'il est rendu isolément.
const AppWrapper = () => (
  <>
    <style>{`
      @import url('/globals.css');
    `}</style>
    <InterestRateCalculator />
  </>
);

const container = document.getElementById('calculator-root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <AppWrapper />
    </React.StrictMode>
  );
}
