import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { API_BASE_URL } from '@/core/config/env';
import { FetchHttpClient } from '@/core/http/HttpClient';
import { HttpPasswordResetGateway } from '@/features/password-reset/infrastructure/HttpPasswordResetGateway';
import type { PasswordResetGateway } from '@/features/password-reset/domain/PasswordResetGateway';

/** Punto unico de composicion: aqui se eligen las implementaciones concretas. */
export interface Dependencies {
  passwordResetGateway: PasswordResetGateway;
}

export function createDependencies(): Dependencies {
  const http = new FetchHttpClient(API_BASE_URL);
  return { passwordResetGateway: new HttpPasswordResetGateway(http) };
}

const DependenciesContext = createContext<Dependencies | null>(null);

interface ProviderProps {
  children: ReactNode;
  /** Permite inyectar dobles de prueba sin tocar los componentes. */
  value?: Dependencies;
}

export function DependenciesProvider({ children, value }: ProviderProps) {
  const deps = useMemo(() => value ?? createDependencies(), [value]);
  return <DependenciesContext.Provider value={deps}>{children}</DependenciesContext.Provider>;
}

export function useDependencies(): Dependencies {
  const deps = useContext(DependenciesContext);
  if (!deps) throw new Error('useDependencies debe usarse dentro de <DependenciesProvider>');
  return deps;
}
