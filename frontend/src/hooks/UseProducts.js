import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * useProducts
 * Fetches products from the FastAPI backend.
 *
 * @param {object} options
 * @param {string} options.category  - Filter by category
 * @param {string} options.search    - Search by name
 * @param {number} options.limit     - Max number of products to fetch
 */
export function useProducts({ category, search, limit = 50 } = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ limit, is_active: true });
        if (category) params.append("category", category);
        if (search) params.append("search", search);

        const res = await fetch(`${API_URL}/products?${params}`);
        if (!res.ok) throw new Error("Failed to fetch products.");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, search, limit]);

  return { products, loading, error };
}

/**
 * useProduct
 * Fetches a single product by ID.
 *
 * @param {string} id - Product UUID
 */
export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/products/${id}`);
        if (!res.ok) throw new Error("Product not found.");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  return { product, loading, error };
}