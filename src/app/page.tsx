
"use client";

import InterestRateCalculator from '@/components/site/interest-rate-calculator';
import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// This function checks for the mount point and renders the React component.
function App() {
  useEffect(() => {
    const calculatorRoot = document.getElementById('calculator-root');
    if (calculatorRoot) {
      const root = createRoot(calculatorRoot);
      root.render(<InterestRateCalculator />);
    }
  }, []);

  return null; // This component doesn't render anything itself
}


// Since this is now an "entry point" for a non-Next.js app, we render it directly.
if (typeof window !== 'undefined') {
  const rootElement = document.createElement('div');
  rootElement.id = 'vyls-react-app-root';
  document.body.appendChild(rootElement);
  const root = createRoot(rootElement);
  root.render(<App />);
}

// We export a default component to satisfy Next.js build process, but it does nothing.
export default function Home() {
  return null;
}
