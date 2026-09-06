import { Home, Package, Settings, ShoppingCart, HelpCircle, LogOut } from "lucide-react";
import Logo from "../common/Logo";
import NavItem from "./NavItem";
import { useLanguage } from "../../i18n";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export default function Sidebar({ activeNav, setActiveNav }) {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  const navMain = [
    { key: "home", label: t.home, icon: Home },
    { key: "products", label: t.products, icon: Package, badge: 12 },
    { key: "settings", label: t.settings, icon: Settings },
  ];

  const navOther = [
    { key: "cart", label: t.cart, icon: ShoppingCart, badge: totalItems },
    { key: "help", label: t.help, icon: HelpCircle },
  ];

  return (
    <aside className="w-60 flex-shrink-0 border-r border-zinc-200 dark:border-zinc-900 flex flex-col bg-white dark:bg-[#07080f]">
      <div className="h-16 flex items-center gap-2.5 px-5 border-b border-zinc-200 dark:border-zinc-900">
        <Logo size={32} />
        <span className="font-semibold tracking-tight">{t.brand}</span>
      </div>

      <nav className="flex-1 px-3 py-5">
        <p className="text-[11px] font-medium tracking-wide text-zinc-400 dark:text-zinc-600 uppercase px-2 mb-2">
          {t.menu}
        </p>
        <ul className="space-y-1 mb-6">
          {navMain.map((item) => (
            <NavItem
              key={item.key}
              item={item}
              active={activeNav === item.key}
              onClick={() => setActiveNav(item.key)}
              badge={item.badge}
            />
          ))}
        </ul>

        <p className="text-[11px] font-medium tracking-wide text-zinc-400 dark:text-zinc-600 uppercase px-2 mb-2">
          {t.other}
        </p>
        <ul className="space-y-1">
          {navOther.map((item) => (
            <NavItem
              key={item.key}
              item={item}
              active={activeNav === item.key}
              onClick={() => setActiveNav(item.key)}
              badge={item.badge}
            />
          ))}
        </ul>
      </nav>

      <div className="p-3 border-t border-zinc-200 dark:border-zinc-900 space-y-1">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-xs font-semibold flex-shrink-0 text-white">
            {user?.firstName?.[0]?.toUpperCase() || "A"}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 transition-colors"
        >
          <LogOut size={16} />
          {t.logout}
        </button>
      </div>
    </aside>
  );
}
