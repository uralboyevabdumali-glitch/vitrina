import { useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag, CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../i18n";
import { formatPrice } from "../utils/helpers";

export default function CartPage({ setActiveNav }) {
  const { t } = useLanguage();
  const { cartItems, totalPrice, updateQuantity, removeItem, clearAll, checkout, loading } = useCart();
  const [confirmed, setConfirmed] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  async function handleCheckout() {
    setCheckingOut(true);
    try {
      await checkout();
      setConfirmed(true);
    } finally {
      setCheckingOut(false);
    }
  }

  if (loading) {
    return <div className="text-zinc-500">Loading...</div>;
  }

  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <CheckCircle2 size={56} className="text-emerald-500 mb-4" />
        <h2 className="text-xl font-medium mb-2">{t.cartPage.orderConfirmed}</h2>
        <p className="text-zinc-500 mb-6">{t.cartPage.orderConfirmedHint}</p>
        <button
          type="button"
          onClick={() => setActiveNav("products")}
          className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm rounded-lg transition-colors"
        >
          {t.productsPage.title}
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <ShoppingBag size={48} className="text-zinc-400 mb-4" />
        <h2 className="text-xl font-medium mb-2">{t.cartPage.empty}</h2>
        <p className="text-zinc-500 mb-6">{t.cartPage.emptyHint}</p>
        <button
          type="button"
          onClick={() => setActiveNav("products")}
          className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm rounded-lg transition-colors"
        >
          {t.productsPage.title}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t.cartPage.title}</h1>
        <button
          type="button"
          onClick={clearAll}
          className="text-sm text-rose-500 hover:text-rose-400 transition-colors"
        >
          {t.cartPage.clear}
        </button>
      </div>

      <div className="space-y-3">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white dark:bg-[#12131f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4"
          >
            <img
              src={item.product?.image}
              alt={item.product?.name}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = "/favicon.svg";
              }}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{item.product?.name}</p>
              <p className="text-sm text-zinc-500">
                {formatPrice(item.product?.price || 0, t.currency)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
              <button
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>

            <span className="text-sm font-semibold w-28 text-right">
              {formatPrice((item.product?.price || 0) * item.quantity, t.currency)}
            </span>

            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="text-zinc-400 hover:text-rose-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#12131f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-zinc-500">{t.cartPage.subtotal}</span>
          <span>{formatPrice(totalPrice, t.currency)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg pt-3 border-t border-zinc-200 dark:border-zinc-800">
          <span>{t.cartPage.total}</span>
          <span className="text-violet-600 dark:text-violet-400">
            {formatPrice(totalPrice, t.currency)}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCheckout}
          disabled={checkingOut}
          className="w-full mt-4 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-colors"
        >
          {checkingOut ? "..." : t.cartPage.checkout}
        </button>
      </div>
    </div>
  );
}
