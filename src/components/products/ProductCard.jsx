import { ShoppingCart } from "lucide-react";
import { useLanguage } from "../../i18n";
import { formatPrice } from "../../utils/helpers";

export default function ProductCard({ product, onAddToCart, added }) {
  const { t } = useLanguage();

  return (
    <div className="bg-white dark:bg-[#12131f] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:border-violet-500/50 transition-colors group">
      <div className="aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <span className="text-xs text-violet-500 font-medium">{product.category}</span>
        <h3 className="font-medium mt-1 mb-1 truncate">{product.name}</h3>
        <p className="text-xs text-zinc-500 mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-violet-600 dark:text-violet-400">
            {formatPrice(product.price, t.currency)}
          </span>
          <button
            type="button"
            onClick={() => onAddToCart(product.id)}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
              added
                ? "bg-emerald-600 text-white"
                : "bg-violet-600 hover:bg-violet-500 text-white"
            }`}
          >
            <ShoppingCart size={14} />
            {added ? t.productsPage.added : t.productsPage.addToCart}
          </button>
        </div>
      </div>
    </div>
  );
}
