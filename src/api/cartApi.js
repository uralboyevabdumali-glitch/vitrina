import api from "./client";

export async function getCartByUser(userId) {
  const { data } = await api.get(`/cart?userId=${userId}`);
  return data;
}

export async function addToCart({ userId, productId, quantity = 1 }) {
  const existing = await getCartByUser(userId);
  const found = existing.find((item) => String(item.productId) === String(productId));

  if (found) {
    const { data } = await api.patch(`/cart/${found.id}`, {
      quantity: found.quantity + quantity,
    });
    return data;
  }

  const { data } = await api.post("/cart", { userId, productId, quantity });
  return data;
}

export async function updateCartItem(id, quantity) {
  if (quantity <= 0) {
    await api.delete(`/cart/${id}`);
    return null;
  }
  const { data } = await api.patch(`/cart/${id}`, { quantity });
  return data;
}

export async function removeCartItem(id) {
  await api.delete(`/cart/${id}`);
}

export async function clearCart(userId) {
  const items = await getCartByUser(userId);
  await Promise.all(items.map((item) => api.delete(`/cart/${item.id}`)));
}
