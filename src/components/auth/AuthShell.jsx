import Logo from "../common/Logo";
import { useLanguage } from "../../i18n";

export default function AuthShell({ eyebrow, title, subtitle, children }) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen w-full flex bg-zinc-50 dark:bg-[#07080f] text-zinc-900 dark:text-zinc-100">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center px-16">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, #d946ef, transparent 70%)" }}
        />
        <div className="relative z-10 max-w-md">
          <div className="flex items-center gap-3 mb-10">
            <Logo size={44} />
            <span className="text-2xl font-semibold tracking-tight">{t.brand}</span>
          </div>
          <h1 className="text-4xl font-semibold leading-tight mb-4">
            {t.auth.registerSubtitle}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed">
            {t.homePage.welcome}, {t.brand}!
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="flex lg:hidden items-center gap-3 mb-10">
            <Logo size={36} />
            <span className="text-xl font-semibold tracking-tight">{t.brand}</span>
          </div>

          <p className="text-xs font-medium tracking-wide text-violet-500 dark:text-violet-400 uppercase mb-2">
            {eyebrow}
          </p>
          <h2 className="text-2xl font-semibold mb-1">{title}</h2>
          <p className="text-zinc-500 text-sm mb-8">{subtitle}</p>

          {children}
        </div>
      </div>
    </div>
  );
}
