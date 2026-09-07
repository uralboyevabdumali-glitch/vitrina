import api from "./client";
import seedData from "../../db.json";

const STORAGE_KEY = "vitrina-cart";

function readStoredCart() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return Array.isArray(stored) ? stored : seedData.cart || [];
  } catch {
    return seedData.cart || [];
  }
}

function writeStoredCart(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function getLocalCart(userId) {
  return readStoredCart().filter((item) => String(item.userId) === String(userId));
}

export async function getCartByUser(userId) {
  try {
    const { data } = await api.get(`/cart?userId=${userId}`);
    const localCart = getLocalCart(userId);
    return Array.isArray(data) && (data.length > 0 || localCart.length === 0)
      ? data
      : localCart;
  } catch {
    return getLocalCart(userId);
  }
}

export async function addToCart({ userId, productId, quantity = 1 }) {
  const existing = await getCartByUser(userId);
  const found = existing.find((item) => String(item.productId) === String(productId));

  try {
    if (found) {
      const { data } = await api.patch(`/cart/${found.id}`, {
        quantity: found.quantity + quantity,
      });
      return data;
    }

    const { data } = await api.post("/cart", { userId, productId, quantity });
    return data;
  } catch {
    const items = readStoredCart();
    const localFound = items.find(
      (item) => String(item.userId) === String(userId) && String(item.productId) === String(productId)
    );
    if (localFound) {
      localFound.quantity += quantity;
    } else {
      items.push({ id: `local-${Date.now()}`, userId, productId, quantity });
    }
    writeStoredCart(items);
    return localFound || items[items.length - 1];
  }
}

export async function updateCartItem(id, quantity) {
  if (quantity <= 0) {
    return removeCartItem(id);
  }
  try {
    const { data } = await api.patch(`/cart/${id}`, { quantity });
    return data;
  } catch {
    const items = readStoredCart().map((item) =>
      String(item.id) === String(id) ? { ...item, quantity } : item
    );
    writeStoredCart(items);
    return items.find((item) => String(item.id) === String(id));
  }
}

export async function removeCartItem(id) {
  try {
    await api.delete(`/cart/${id}`);
  } catch {
    writeStoredCart(readStoredCart().filter((item) => String(item.id) !== String(id)));
  }
}

export async function clearCart(userId) {
  try {
    const items = await getCartByUser(userId);
    await Promise.all(items.map((item) => api.delete(`/cart/${item.id}`)));
  } catch {
    writeStoredCart(readStoredCart().filter((item) => String(item.userId) !== String(userId)));
  }
}
