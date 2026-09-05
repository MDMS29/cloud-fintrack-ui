import type { HttpClient } from '@/core/http/HttpClient';
import type { PasswordResetGateway } from '../domain/PasswordResetGateway';
import type {
  ResetPasswordRequest,
  ResetPasswordResponse,
  ValidateResetTokenResponse,
} from '../domain/types';

/** Adaptador del puerto contra los endpoints /api/auth/password/* del swagger. */
export class HttpPasswordResetGateway implements PasswordResetGateway {
  constructor(private readonly http: HttpClient) {}

  validateToken(token: string, signal?: AbortSignal): Promise<ValidateResetTokenResponse> {
    const query = new URLSearchParams({ token }).toString();
    return this.http.get<ValidateResetTokenResponse>(
      `${import.meta.env.VITE_API_PROXY_TARGET}/api/auth/password/reset/validate?${query}`,
      { signal },
    );
  }

  reset(request: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    return this.http.post<ResetPasswordResponse>(
      `${import.meta.env.VITE_API_PROXY_TARGET}/api/auth/password/reset`,
      request
    );
  }
}
