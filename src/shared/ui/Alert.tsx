import type { ReactNode } from 'react';
import { cn } from './cn';

type Variant = 'error' | 'success' | 'info';

const VARIANTS: Record<Variant, string> = {
  error: 'bg-red-50 text-red-800 ring-red-200',
  success: 'bg-brand-50 text-brand-700 ring-brand-100',
  info: 'bg-slate-50 text-slate-700 ring-slate-200',
};

interface AlertProps {
  variant: Variant;
  children: ReactNode;
  className?: string;
}

export function Alert({ variant, children, className }: AlertProps) {
  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={cn('rounded-xl px-4 py-3 text-sm ring-1', VARIANTS[variant], className)}
    >
      {children}
    </div>
  );
}
