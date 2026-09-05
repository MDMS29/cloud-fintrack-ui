import type { ReactNode } from 'react';

interface AuthCardProps {
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
}

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <main className="flex min-h-full items-center justify-center bg-slate-100 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-xs font-bold tracking-widest text-brand-600 uppercase">FinTrack</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">{title}</h1>
        {subtitle && <div className="mt-2 text-sm text-slate-600">{subtitle}</div>}
        <div className="mt-6">{children}</div>
      </section>
    </main>
  );
}
