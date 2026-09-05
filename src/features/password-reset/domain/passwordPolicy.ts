/**
 * Politica de contrasena del backend (ResetPasswordDto):
 * 8..72 caracteres, al menos una minuscula, una mayuscula y un numero.
 * OCP: agregar una regla = agregar un item a RULES.
 */
export interface PasswordRule {
  id: string;
  label: string;
  isSatisfiedBy(password: string): boolean;
}

export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 72;

export const PASSWORD_RULES: readonly PasswordRule[] = [
  {
    id: 'length',
    label: `Entre ${MIN_PASSWORD_LENGTH} y ${MAX_PASSWORD_LENGTH} caracteres`,
    isSatisfiedBy: (p) => p.length >= MIN_PASSWORD_LENGTH && p.length <= MAX_PASSWORD_LENGTH,
  },
  { id: 'lowercase', label: 'Una letra minuscula', isSatisfiedBy: (p) => /[a-z]/.test(p) },
  { id: 'uppercase', label: 'Una letra mayuscula', isSatisfiedBy: (p) => /[A-Z]/.test(p) },
  { id: 'digit', label: 'Un numero', isSatisfiedBy: (p) => /\d/.test(p) },
];

export interface PasswordRuleState extends PasswordRule {
  satisfied: boolean;
}

export function evaluatePassword(password: string): PasswordRuleState[] {
  return PASSWORD_RULES.map((rule) => ({ ...rule, satisfied: rule.isSatisfiedBy(password) }));
}

export function isPasswordValid(password: string): boolean {
  return PASSWORD_RULES.every((rule) => rule.isSatisfiedBy(password));
}

export interface FormValidation {
  valid: boolean;
  error: string | null;
}

export function validateResetForm(password: string, confirmation: string): FormValidation {
  if (!isPasswordValid(password)) {
    return { valid: false, error: 'La contrasena no cumple la politica de seguridad' };
  }
  if (password !== confirmation) {
    return { valid: false, error: 'Las contrasenas no coinciden' };
  }
  return { valid: true, error: null };
}
