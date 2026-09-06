import { useEffect, useState } from "react";
import { getProducts } from "../api/productsApi";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../i18n";
import ProductCard from "../components/products/ProductCard";

export default function ProductsPage() {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [addedIds, setAddedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        const cats = [...new Set(data.map((p) => p.category))];
        setCategories(cats);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleAddToCart(productId) {
    try {
      await addItem(productId);
      setAddedIds((prev) => new Set(prev).add(productId));
      setTimeout(() => {
        setAddedIds((prev) => {
          const next = new Set(prev);
          next.delete(productId);
          return next;
        });
      }, 1500);
    } catch (err) {
      console.error("Savatga qo'shishda xatolik:", err);
    }
  }

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  if (loading) {
    return <div className="text-zinc-500">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t.productsPage.title}</h1>

      <div className="flex flex-wrap gap-2">
        <CategoryChip
          label={t.productsPage.all}
          active={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
        />
        {categories.map((cat) => (
          <CategoryChip
            key={cat}
            label={cat}
            active={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            added={addedIds.has(product.id)}
          />
        ))}
      </div>
    </div>
  );
}

function CategoryChip({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
        active
          ? "bg-violet-600 text-white"
          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
      }`}
    >
      {label}
    </button>
  );
}
