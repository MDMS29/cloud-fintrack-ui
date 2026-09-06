import type { HttpClient } from '@/core/http/HttpClient';
import type { PasswordResetGateway } from '../domain/PasswordResetGateway';
import type {
  ResetPasswordRequest,
  ResetPasswordResponse,
  ValidateResetTokenResponse,
} from '../domain/types';

/**
 * Adaptador del puerto contra los endpoints /api/auth/password/* del swagger.
 * Las rutas son relativas: el host de la API lo resuelve el HttpClient (VITE_API_BASE_URL).
 */
export class HttpPasswordResetGateway implements PasswordResetGateway {
  constructor(private readonly http: HttpClient) {}

  validateToken(token: string, signal?: AbortSignal): Promise<ValidateResetTokenResponse> {
    const query = new URLSearchParams({ token }).toString();
    return this.http.get<ValidateResetTokenResponse>(
      `/api/auth/password/reset/validate?${query}`,
      { signal },
    );
  }

  reset(request: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    return this.http.post<ResetPasswordResponse>('/api/auth/password/reset', request);
  }
}
