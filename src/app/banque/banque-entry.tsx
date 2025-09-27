
"use client";

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter, Outlet } from 'react-router-dom';
import BanqueLayout from './layout';
import DashboardPage from './tableau-de-bord/page';
import TransactionsPage from './transactions/page';
import VirementsPage from './virements/page';
import ProfilPage from './profil/page';
import '../globals.css';
import { BankingProvider } from '@/hooks/use-banking-store.tsx';

// We use a hash router because this app will be embedded in a WordPress page,
// and we don't want to interfere with WordPress's URL routing.
const router = createHashRouter([
  {
    path: '/',
    element: <BanqueLayout><Outlet /></BanqueLayout>,
    children: [
        {
            index: true,
            element: <DashboardPage />,
        },
        {
            path: 'tableau-de-bord',
            element: <DashboardPage />,
        },
        {
            path: 'transactions',
            element: <TransactionsPage />,
        },
        {
            path: 'virements',
            element: <VirementsPage />,
        },
        {
            path: 'profil',
            element: <ProfilPage />,
        }
    ]
  },
]);

const container = document.getElementById('banking-app-root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
       <BankingProvider>
         <RouterProvider router={router} />
       </BankingProvider>
    </React.StrictMode>
  );
}
