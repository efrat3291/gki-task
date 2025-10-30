"use client";
import { useEffect, useState } from "react";
import { getProducts } from "@/utils/api";
import ProductList from "@/components/ProductList";
import { useCategoryStore } from "@/store/categoryStore";
import FloatingCart from "@/components/FloatingCart";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const category = useCategoryStore((state) => state.category);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Listen for cart open events
  useEffect(() => {
    const handleOpenCart = () => setIsCartOpen(true);
    window.addEventListener('openCart', handleOpenCart);
    return () => window.removeEventListener('openCart', handleOpenCart);
  }, []);

  const filteredProducts = category === "all" 
    ? products 
    : products.filter(p => p.category === category);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{category === "all" ? "Latest Products" : category}</h1>
      <ProductList products={filteredProducts} />
      <FloatingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
