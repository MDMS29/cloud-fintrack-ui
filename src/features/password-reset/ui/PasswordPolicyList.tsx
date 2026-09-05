import type { PasswordRuleState } from '../domain/passwordPolicy';

export function PasswordPolicyList({ rules }: { rules: PasswordRuleState[] }) {
  return (
    <ul className="space-y-1.5">
      {rules.map((rule) => (
        <li
          key={rule.id}
          className={`flex items-center gap-2 text-xs ${
            rule.satisfied ? 'text-brand-600' : 'text-slate-500'
          }`}
        >
          <span
            aria-hidden="true"
            className={`grid size-4 place-items-center rounded-full text-[10px] font-bold ${
              rule.satisfied ? 'bg-brand-500 text-white' : 'bg-slate-200 text-slate-500'
            }`}
          >
            {rule.satisfied ? '✓' : '•'}
          </span>
          {rule.label}
        </li>
      ))}
    </ul>
  );
}
