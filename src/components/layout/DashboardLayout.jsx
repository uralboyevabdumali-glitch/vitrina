import Sidebar from "./Sidebar";
import Header from "./Header";
import HomePage from "../../pages/HomePage";
import ProductsPage from "../../pages/ProductsPage";
import SettingsPage from "../../pages/SettingsPage";
import CartPage from "../../pages/CartPage";
import HelpPage from "../../pages/HelpPage";

const PAGES = {
  home: HomePage,
  products: ProductsPage,
  settings: SettingsPage,
  cart: CartPage,
  help: HelpPage,
};

export default function DashboardLayout({ activeNav, setActiveNav }) {
  const Page = PAGES[activeNav] || HomePage;

  return (
    <div className="min-h-screen w-full bg-zinc-50 dark:bg-[#07080f] text-zinc-900 dark:text-zinc-100 flex">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onCartClick={() => setActiveNav("cart")} />
        <main className="flex-1 px-6 py-6 overflow-auto">
          <Page setActiveNav={setActiveNav} />
        </main>
      </div>
    </div>
  );
}
