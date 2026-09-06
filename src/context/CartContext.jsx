import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { getCartByUser, addToCart, updateCartItem, removeCartItem, clearCart } from "../api/cartApi";
import { getProducts } from "../api/productsApi";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCart = useCallback(async (silent = false) => {
    if (!user) {
      setCartItems([]);
      setProducts([]);
      return;
    }
    if (!silent) setLoading(true);
    try {
      const [cart, prods] = await Promise.all([
        getCartByUser(user.id),
        getProducts(),
      ]);
      setProducts(prods);
      setCartItems(cart);
    } finally {
      if (!silent) setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const addItem = async (productId, quantity = 1) => {
    if (!user) return;
    await addToCart({ userId: user.id, productId, quantity });
    await loadCart(true);
  };

  const updateQuantity = async (cartId, quantity) => {
    await updateCartItem(cartId, quantity);
    await loadCart(true);
  };

  const removeItem = async (cartId) => {
    await removeCartItem(cartId);
    await loadCart(true);
  };

  const clearAll = async () => {
    if (!user) return;
    await clearCart(user.id);
    setCartItems([]);
  };

  const checkout = async () => {
    if (!user || cartItems.length === 0) return;
    await clearCart(user.id);
    setCartItems([]);
  };

  const enrichedCart = cartItems.map((item) => {
    const product = products.find((p) => String(p.id) === String(item.productId));
    return { ...item, product };
  });

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = enrichedCart.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems: enrichedCart,
        totalItems,
        totalPrice,
        loading,
        addItem,
        updateQuantity,
        removeItem,
        clearAll,
        checkout,
        refreshCart: loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
