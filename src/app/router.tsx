import { createBrowserRouter, Navigate } from 'react-router-dom';
import ResetPasswordPage from '@/features/password-reset/ui/ResetPasswordPage';

export const router = createBrowserRouter([
  { path: '/reset-password', element: <ResetPasswordPage /> },
  { path: '*', element: <Navigate to="/reset-password" replace /> },
]);
