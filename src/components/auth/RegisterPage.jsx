import { useState } from "react";
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight } from "lucide-react";
import AuthShell from "./AuthShell";
import FieldWrap from "../common/FieldWrap";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../i18n";

export default function RegisterPage({ onSwitch }) {
  const { register } = useAuth();
  const { t } = useLanguage();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    login: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    const { firstName, lastName, login, email, phone, password } = form;
    if (!firstName.trim() || !lastName.trim() || !login.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      setError(t.auth.fillAll);
      return;
    }
    setError("");
    setLoading(true);
    try {
      await register(form);
      onSwitch();
    } catch (err) {
      if (err.message === "LOGIN_EXISTS") setError(t.auth.loginExists);
      else if (err.message === "EMAIL_EXISTS") setError(t.auth.emailExists);
      else setError(t.auth.fillAll);
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full bg-white dark:bg-[#12131f] border border-zinc-300 dark:border-zinc-800 rounded-lg pl-10 pr-3 py-2.5 text-sm outline-none focus:border-violet-500 transition-colors";

  return (
    <AuthShell
      eyebrow={t.auth.getStarted}
      title={t.auth.registerTitle}
      subtitle={t.auth.registerSubtitle}
    >
      <form onSubmit={submit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">{t.auth.firstName}</label>
            <FieldWrap icon={User}>
              <input type="text" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className={inputClass} />
            </FieldWrap>
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">{t.auth.lastName}</label>
            <FieldWrap icon={User}>
              <input type="text" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className={inputClass} />
            </FieldWrap>
          </div>
        </div>

        <div>
          <label className="block text-xs text-zinc-500 mb-1.5">{t.auth.login}</label>
          <FieldWrap icon={Mail}>
            <input type="text" value={form.login} onChange={(e) => update("login", e.target.value)} className={inputClass} />
          </FieldWrap>
        </div>

        <div>
          <label className="block text-xs text-zinc-500 mb-1.5">{t.auth.email}</label>
          <FieldWrap icon={Mail}>
            <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
          </FieldWrap>
        </div>

        <div>
          <label className="block text-xs text-zinc-500 mb-1.5">{t.auth.phone}</label>
          <FieldWrap icon={Phone}>
            <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} />
          </FieldWrap>
        </div>

        <div>
          <label className="block text-xs text-zinc-500 mb-1.5">{t.auth.password}</label>
          <FieldWrap icon={Lock}>
            <input
              type={showPw ? "text" : "password"}
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              className={`${inputClass} pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            >
              {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </FieldWrap>
          <PasswordStrengthMeter password={form.password} />
        </div>

        {error && <p className="text-xs text-rose-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-60 text-white text-sm font-medium rounded-lg py-2.5 transition-colors"
        >
          {t.auth.signUp} <ArrowRight size={16} />
        </button>
      </form>

      <p className="text-sm text-zinc-500 mt-6 text-center">
        {t.auth.hasAccount}{" "}
        <button onClick={onSwitch} className="text-violet-500 hover:text-violet-400 font-medium">
          {t.auth.signIn}
        </button>
      </p>
    </AuthShell>
  );
}
