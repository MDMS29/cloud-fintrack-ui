import { useId, useState, type InputHTMLAttributes } from 'react';
import { cn } from './cn';

interface PasswordFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value'> {
  label: string;
  value: string;
  onValueChange(value: string): void;
  hint?: string;
  invalid?: boolean;
}

export function PasswordField({
  label,
  value,
  onValueChange,
  hint,
  invalid = false,
  className,
  ...rest
}: PasswordFieldProps) {
  const id = useId();
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <input
          {...rest}
          id={id}
          type={revealed ? 'text' : 'password'}
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          aria-invalid={invalid}
          className={cn(
            'w-full rounded-xl border bg-white px-4 py-3 pr-12 text-sm text-slate-900',
            'placeholder:text-slate-400 focus:outline-2 focus:outline-offset-0',
            invalid
              ? 'border-red-300 focus:outline-red-500'
              : 'border-slate-300 focus:outline-brand-500',
            className,
          )}
        />
        <button
          type="button"
          onClick={() => setRevealed((current) => !current)}
          aria-label={revealed ? 'Ocultar contrasena' : 'Mostrar contrasena'}
          className="absolute inset-y-0 right-0 px-4 text-xs font-semibold text-slate-500 hover:text-slate-800"
        >
          {revealed ? 'Ocultar' : 'Ver'}
        </button>
      </div>
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
}
