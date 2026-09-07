import api from "./client";
import seedData from "../../db.json";

export async function getProducts() {
  try {
    const { data } = await api.get("/products");
    return Array.isArray(data) ? data : seedData.products;
  } catch {
    return seedData.products;
  }
}

export async function getProduct(id) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}
