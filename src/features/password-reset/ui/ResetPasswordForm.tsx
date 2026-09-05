import { Alert } from '@/shared/ui/Alert';
import { Button } from '@/shared/ui/Button';
import { PasswordField } from '@/shared/ui/PasswordField';
import { useResetPasswordForm } from '../application/useResetPasswordForm';
import { PasswordPolicyList } from './PasswordPolicyList';
import { ResetSuccess } from './ResetSuccess';

export function ResetPasswordForm({ token }: { token: string }) {
  const form = useResetPasswordForm(token);

  if (form.success) return <ResetSuccess result={form.success} />;

  const mismatch = form.confirmation.length > 0 && form.confirmation !== form.password;

  return (
    <form onSubmit={form.submit} noValidate className="space-y-5">
      <PasswordField
        label="Nueva contrasena"
        value={form.password}
        onValueChange={form.setPassword}
        autoComplete="new-password"
        placeholder="••••••••"
        invalid={form.password.length > 0 && form.rules.some((rule) => !rule.satisfied)}
      />

      <PasswordPolicyList rules={form.rules} />

      <PasswordField
        label="Confirmar contrasena"
        value={form.confirmation}
        onValueChange={form.setConfirmation}
        autoComplete="new-password"
        placeholder="••••••••"
        invalid={mismatch}
        hint={mismatch ? 'Las contrasenas no coinciden' : undefined}
      />

      {form.error && <Alert variant="error">{form.error}</Alert>}

      <Button type="submit" loading={form.submitting} disabled={!form.canSubmit}>
        {form.submitting ? 'Guardando...' : 'Guardar contrasena'}
      </Button>
    </form>
  );
}
