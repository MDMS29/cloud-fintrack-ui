import { useCallback, useMemo, useState, type FormEvent } from 'react';
import { useDependencies } from '@/core/di/container';
import { HttpError } from '@/core/http/HttpClient';
import { evaluatePassword, validateResetForm } from '../domain/passwordPolicy';
import type { PasswordRuleState } from '../domain/passwordPolicy';
import type { ResetPasswordResponse } from '../domain/types';

export interface ResetPasswordForm {
  password: string;
  confirmation: string;
  setPassword(value: string): void;
  setConfirmation(value: string): void;
  rules: PasswordRuleState[];
  canSubmit: boolean;
  submitting: boolean;
  error: string | null;
  success: ResetPasswordResponse | null;
  submit(event: FormEvent<HTMLFormElement>): void;
}

const GENERIC_ERROR = 'No pudimos actualizar la contrasena. Intenta de nuevo';

/** Estado y envio del formulario (POST /api/auth/password/reset). */
export function useResetPasswordForm(token: string | null): ResetPasswordForm {
  const { passwordResetGateway } = useDependencies();
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<ResetPasswordResponse | null>(null);

  const rules = useMemo(() => evaluatePassword(password), [password]);
  const validation = useMemo(
    () => validateResetForm(password, confirmation),
    [password, confirmation],
  );

  const submit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!token) {
        setError('El enlace no incluye un token de recuperacion');
        return;
      }
      if (!validation.valid) {
        setError(validation.error);
        return;
      }

      setSubmitting(true);
      setError(null);

      passwordResetGateway
        .reset({ token, password })
        .then((response) => {
          setSuccess(response);
          setPassword('');
          setConfirmation('');
        })
        .catch((err: unknown) => {
          setError(err instanceof HttpError ? err.message : GENERIC_ERROR);
        })
        .finally(() => setSubmitting(false));
    },
    [token, password, validation, passwordResetGateway],
  );

  return {
    password,
    confirmation,
    setPassword,
    setConfirmation,
    rules,
    canSubmit: validation.valid && !submitting,
    submitting,
    error,
    success,
    submit,
  };
}
