import { useEffect, useState } from "react";
import { Package, Users, TrendingUp } from "lucide-react";
import { getProducts } from "../api/productsApi";
import { getUsers } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../i18n";
import { formatPrice } from "../utils/helpers";

export default function HomePage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProducts(), getUsers()])
      .then(([prods, usrs]) => {
        setProducts(prods);
        setUsers(usrs.map(({ password, ...u }) => u));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-zinc-500">Loading...</div>;
  }

  const recentProducts = [...products].sort(() => Math.random() - 0.5).slice(0, 4);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{t.homePage.title}</h1>
        <p className="text-zinc-500 mt-1">
          {t.homePage.welcome}, {user?.firstName}!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={Package} label={t.homePage.totalProducts} value={products.length} color="violet" />
        <StatCard icon={Users} label={t.homePage.totalUsers} value={users.length} color="fuchsia" />
        <StatCard icon={TrendingUp} label={t.homePage.stats} value={`${products.length * 2}`} color="emerald" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-white dark:bg-[#12131f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
          <h2 className="font-medium mb-4">{t.homePage.recentProducts}</h2>
          <div className="space-y-3">
            {recentProducts.map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-xs text-zinc-500">{p.category}</p>
                </div>
                <span className="text-sm font-medium text-violet-600 dark:text-violet-400">
                  {formatPrice(p.price, t.currency)}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-[#12131f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
          <h2 className="font-medium mb-4">{t.homePage.usersList}</h2>
          <div className="space-y-3">
            {users.map((u) => (
              <div key={u.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-sm font-semibold text-white">
                  {u.firstName?.[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">
                    {u.firstName} {u.lastName}
                  </p>
                  <p className="text-xs text-zinc-500">@{u.login}</p>
                </div>
                <span className="text-xs text-zinc-400">{u.email}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  const colors = {
    violet: "from-violet-600/20 to-violet-600/5 text-violet-600 dark:text-violet-400",
    fuchsia: "from-fuchsia-600/20 to-fuchsia-600/5 text-fuchsia-600 dark:text-fuchsia-400",
    emerald: "from-emerald-600/20 to-emerald-600/5 text-emerald-600 dark:text-emerald-400",
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color]} border border-zinc-200 dark:border-zinc-800 rounded-xl p-5`}>
      <Icon size={22} className="mb-3" />
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-sm text-zinc-500 mt-1">{label}</p>
    </div>
  );
}
