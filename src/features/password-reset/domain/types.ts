/** Modelos del dominio, alineados con el swagger de FinTrack. */

export interface ValidateResetTokenResponse {
  valid: boolean;
  expiresAt: string | null;
  /** Correo enmascarado, p.ej. us***@correo.com */
  email: string | null;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface ResetPasswordResponse {
  message: string;
  updatedAt: string;
}
