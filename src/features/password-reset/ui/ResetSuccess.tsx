import { Alert } from '@/shared/ui/Alert';
import type { ResetPasswordResponse } from '../domain/types';

function formatDate(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? iso : date.toLocaleString('es-CO');
}

export function ResetSuccess({ result }: { result: ResetPasswordResponse }) {
  return (
    <div className="space-y-4">
      <Alert variant="success">{result.message}</Alert>
      <p className="text-sm text-slate-600">
        Actualizada el {formatDate(result.updatedAt)}. Vuelve a la app de FinTrack e inicia sesion
        con tu nueva contrasena.
      </p>
    </div>
  );
}
