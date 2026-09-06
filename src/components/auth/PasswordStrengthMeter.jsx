import { useLanguage } from "../../i18n";
import { getPasswordStrength } from "../../utils/helpers";

const COLORS = {
  weak: "bg-rose-500",
  good: "bg-amber-500",
  strong: "bg-emerald-500",
};

const WIDTHS = { weak: "33%", good: "66%", strong: "100%" };

export default function PasswordStrengthMeter({ password }) {
  const { t } = useLanguage();
  const { key } = getPasswordStrength(password);

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${COLORS[key]}`}
          style={{ width: WIDTHS[key] }}
        />
      </div>
      <p className={`text-xs mt-1 ${key === "weak" ? "text-rose-400" : key === "good" ? "text-amber-400" : "text-emerald-400"}`}>
        {t.passwordStrength[key]}
      </p>
    </div>
  );
}
