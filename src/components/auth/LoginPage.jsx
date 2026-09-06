import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import AuthShell from "./AuthShell";
import FieldWrap from "../common/FieldWrap";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../i18n";

export default function LoginPage({ onSwitch }) {
  const { login } = useAuth();
  const { t } = useLanguage();
  const [loginVal, setLoginVal] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!loginVal.trim() || !password.trim()) {
      setError(t.auth.enterCredentials);
      return;
    }
    setError("");
    setLoading(true);
    try {
      await login({ login: loginVal, password });
    } catch {
      setError(t.auth.invalidCredentials);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      eyebrow={t.auth.welcome}
      title={t.auth.loginTitle}
      subtitle={t.auth.loginSubtitle}
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-xs text-zinc-500 mb-1.5">{t.auth.login}</label>
          <FieldWrap icon={Mail}>
            <input
              type="text"
              value={loginVal}
              onChange={(e) => setLoginVal(e.target.value)}
              placeholder={t.auth.login}
              className="w-full bg-white dark:bg-[#12131f] border border-zinc-300 dark:border-zinc-800 rounded-lg pl-10 pr-3 py-2.5 text-sm outline-none focus:border-violet-500 transition-colors"
            />
          </FieldWrap>
        </div>

        <div>
          <label className="block text-xs text-zinc-500 mb-1.5">{t.auth.password}</label>
          <FieldWrap icon={Lock}>
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.auth.password}
              className="w-full bg-white dark:bg-[#12131f] border border-zinc-300 dark:border-zinc-800 rounded-lg pl-10 pr-10 py-2.5 text-sm outline-none focus:border-violet-500 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            >
              {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </FieldWrap>
        </div>

        {error && <p className="text-xs text-rose-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-60 text-white text-sm font-medium rounded-lg py-2.5 transition-colors"
        >
          {t.auth.signIn} <ArrowRight size={16} />
        </button>
      </form>

      <p className="text-sm text-zinc-500 mt-8 text-center">
        {t.auth.noAccount}{" "}
        <button onClick={onSwitch} className="text-violet-500 hover:text-violet-400 font-medium">
          {t.auth.signUp}
        </button>
      </p>
    </AuthShell>
  );
}
