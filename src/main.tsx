import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { DependenciesProvider } from '@/core/di/container';
import { router } from '@/app/router';
import '@/styles/index.css';

const container = document.getElementById('root');
if (!container) throw new Error('No se encontro el nodo #root');

createRoot(container).render(
  <StrictMode>
    <DependenciesProvider>
      <RouterProvider router={router} />
    </DependenciesProvider>
  </StrictMode>,
);
