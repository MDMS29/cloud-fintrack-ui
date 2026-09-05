import { useEffect, useState } from 'react';
import { useDependencies } from '@/core/di/container';
import { HttpError } from '@/core/http/HttpClient';
import type { ValidateResetTokenResponse } from '../domain/types';

export type TokenStatus = 'checking' | 'valid' | 'invalid';

export interface TokenValidation {
  status: TokenStatus;
  data: ValidateResetTokenResponse | null;
  error: string | null;
}

const MISSING_TOKEN = 'El enlace no incluye un token de recuperacion';
const INVALID_TOKEN = 'El enlace es invalido o ya vencio';

/** Valida el token al abrir la pantalla (GET /api/auth/password/reset/validate). */
export function useTokenValidation(token: string | null): TokenValidation {
  const { passwordResetGateway } = useDependencies();
  const [state, setState] = useState<TokenValidation>({
    status: 'checking',
    data: null,
    error: null,
  });

  useEffect(() => {
    if (!token) {
      setState({ status: 'invalid', data: null, error: MISSING_TOKEN });
      return;
    }

    const controller = new AbortController();
    setState({ status: 'checking', data: null, error: null });

    passwordResetGateway
      .validateToken(token, controller.signal)
      .then((data) =>
        setState({
          status: data.valid ? 'valid' : 'invalid',
          data,
          error: data.valid ? null : INVALID_TOKEN,
        }),
      )
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setState({
          status: 'invalid',
          data: null,
          error: error instanceof HttpError ? error.message : INVALID_TOKEN,
        });
      });

    return () => controller.abort();
  }, [token, passwordResetGateway]);

  return state;
}
