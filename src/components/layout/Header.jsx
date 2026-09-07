import { useState } from "react";
import { Search, Sun, Moon, ShoppingCart, Bell, ChevronDown, LogOut } from "lucide-react";
import { useLanguage } from "../../i18n";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext";

export default function Header({ onCartClick }) {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-zinc-200 dark:border-zinc-900 bg-white dark:bg-[#07080f]">
      <div className="relative w-80 max-w-full">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          placeholder={t.search}
          className="w-full bg-zinc-50 dark:bg-[#12131f] border border-zinc-200 dark:border-zinc-800 rounded-lg pl-9 pr-14 py-2 text-sm placeholder-zinc-400 outline-none focus:border-violet-500 transition-colors"
        />
        <kbd className="hidden sm:block absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-zinc-400 border border-zinc-200 dark:border-zinc-800 rounded px-1.5 py-0.5">
          ⌘K
        </kbd>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggleTheme}
          className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
          title={isDark ? t.settingsPage.lightMode : t.settingsPage.darkMode}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          type="button"
          onClick={onCartClick}
          className="relative text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
        >
          <ShoppingCart size={18} />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-violet-600 text-[10px] flex items-center justify-center font-medium text-white">
              {totalItems}
            </span>
          )}
        </button>
        <button className="relative text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
          <Bell size={18} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-500" />
        </button>
        <div className="relative pl-3 border-l border-zinc-200 dark:border-zinc-900">
          <button
            type="button"
            onClick={() => setProfileOpen((open) => !open)}
            className="flex items-center gap-2 text-left"
            aria-expanded={profileOpen}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-xs font-semibold text-white">
              {user?.firstName?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-medium">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-zinc-500">{t.role}</p>
            </div>
            <ChevronDown size={14} className="text-zinc-400 hidden sm:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-12 z-20 w-64 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#12131f] p-3 shadow-xl">
              <p className="font-medium">{user?.firstName} {user?.lastName}</p>
              <p className="mt-1 text-sm text-zinc-500 break-words">{user?.email}</p>
              <p className="text-xs text-zinc-500 mt-1">{user?.phone}</p>
              <button
                type="button"
                onClick={logout}
                className="mt-3 w-full flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-rose-500"
              >
                <LogOut size={16} />
                {t.logout}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
