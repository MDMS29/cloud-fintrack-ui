import type {
  ResetPasswordRequest,
  ResetPasswordResponse,
  ValidateResetTokenResponse,
} from './types';

/** Puerto de salida: la UI depende de esto, no de fetch ni del swagger. */
export interface PasswordResetGateway {
  validateToken(token: string, signal?: AbortSignal): Promise<ValidateResetTokenResponse>;
  reset(request: ResetPasswordRequest): Promise<ResetPasswordResponse>;
}
