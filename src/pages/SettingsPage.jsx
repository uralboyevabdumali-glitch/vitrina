import { useState } from "react";
import { Sun, Moon, Globe, Lock, User, Mail, Phone, Save } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useLanguage, LANGUAGES } from "../i18n";
import PasswordStrengthMeter from "../components/auth/PasswordStrengthMeter";

export default function SettingsPage() {
  const { user, changePassword } = useAuth();
  const { theme, setTheme } = useTheme();
  const { t, lang, changeLanguage } = useLanguage();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePasswordSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError(t.auth.fillAll);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError(t.auth.passwordMismatch);
      return;
    }

    setLoading(true);
    try {
      await changePassword(user.id, currentPassword, newPassword);
      setSuccess(t.auth.passwordUpdated);
    } catch (err) {
      if (err.message === "INVALID_CREDENTIALS" || err.message === "WRONG_PASSWORD") {
        setError(t.auth.wrongPassword);
      } else {
        setError(t.auth.fillAll);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t.settingsPage.title}</h1>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Profile card */}
        <div className="xl:col-span-1 bg-white dark:bg-[#12131f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
          <h2 className="font-medium mb-4 flex items-center gap-2">
            <User size={18} className="text-violet-500" />
            {t.settingsPage.profile}
          </h2>
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-2xl font-semibold text-white mb-3">
              {user?.firstName?.[0]}
            </div>
            <p className="font-medium text-lg">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-zinc-500">@{user?.login}</p>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-zinc-500">
              <Mail size={16} />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-500">
              <Phone size={16} />
              <span>{user?.phone}</span>
            </div>
          </div>
        </div>

        {/* Appearance & Language */}
        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#12131f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
            <h2 className="font-medium mb-4 flex items-center gap-2">
              <Sun size={18} className="text-violet-500" />
              {t.settingsPage.appearance}
            </h2>
            <p className="text-sm text-zinc-500 mb-4">{t.settingsPage.theme}</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTheme("light")}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors ${
                  theme === "light"
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-600/10"
                    : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300"
                }`}
              >
                <Sun size={24} />
                <span className="text-sm">{t.settingsPage.lightMode}</span>
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors ${
                  theme === "dark"
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-600/10"
                    : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300"
                }`}
              >
                <Moon size={24} />
                <span className="text-sm">{t.settingsPage.darkMode}</span>
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-[#12131f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
            <h2 className="font-medium mb-4 flex items-center gap-2">
              <Globe size={18} className="text-violet-500" />
              {t.settingsPage.language}
            </h2>
            <div className="space-y-2">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => changeLanguage(l.code)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors ${
                    lang === l.code
                      ? "bg-violet-600 text-white"
                      : "bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Password change - full width */}
        <div className="xl:col-span-3 bg-white dark:bg-[#12131f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
          <h2 className="font-medium mb-4 flex items-center gap-2">
            <Lock size={18} className="text-violet-500" />
            {t.settingsPage.changePassword}
          </h2>
          <form onSubmit={handlePasswordSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-zinc-500 mb-1.5">{t.auth.currentPassword}</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1.5">{t.auth.newPassword}</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-violet-500"
              />
              <PasswordStrengthMeter password={newPassword} />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1.5">{t.auth.confirmPassword}</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-violet-500"
              />
            </div>
            <div className="md:col-span-3 flex items-center gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <Save size={16} />
                {t.settingsPage.save}
              </button>
              {error && <p className="text-xs text-rose-400">{error}</p>}
              {success && <p className="text-xs text-emerald-400">{success}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
