"use client";

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import BanqueLayout from './layout';
import DashboardPage from './tableau-de-bord/page';
import TransactionsPage from './transactions/page';
import VirementsPage from './virements/page';
import '../globals.css';

// We use a hash router because this app will be embedded in a WordPress page,
// and we don't want to interfere with WordPress's URL routing.
const router = createHashRouter([
  {
    path: '/',
    element: <BanqueLayout><DashboardPage /></BanqueLayout>,
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
        }
    ]
  },
]);

const container = document.getElementById('banking-app-root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
       <RouterProvider router={router} />
    </React.StrictMode>
  );
}
