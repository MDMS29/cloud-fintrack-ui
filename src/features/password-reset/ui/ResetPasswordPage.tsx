import { useSearchParams } from 'react-router-dom';
import { Alert } from '@/shared/ui/Alert';
import { AuthCard } from '@/shared/ui/AuthCard';
import { Spinner } from '@/shared/ui/Spinner';
import { useTokenValidation } from '../application/useTokenValidation';
import { ResetPasswordForm } from './ResetPasswordForm';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const validation = useTokenValidation(token);

  if (validation.status === 'checking') {
    return (
      <AuthCard title="Validando enlace">
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <Spinner className="text-brand-600" />
          Comprobando que el enlace siga vigente...
        </div>
      </AuthCard>
    );
  }

  if (validation.status === 'invalid') {
    return (
      <AuthCard title="Enlace no valido">
        <div className="space-y-4">
          <Alert variant="error">{validation.error}</Alert>
          <p className="text-sm text-slate-600">
            Solicita un nuevo enlace desde la app de FinTrack, en la opcion "Olvide mi contrasena".
          </p>
        </div>
      </AuthCard>
    );
  }

  const maskedEmail = validation.data?.email;

  return (
    <AuthCard
      title="Crea tu nueva contrasena"
      subtitle={
        maskedEmail
          ? `Estas restableciendo la contrasena de ${maskedEmail}`
          : 'Ingresa y confirma tu nueva contrasena'
      }
    >
      <ResetPasswordForm token={token as string} />
    </AuthCard>
  );
}
