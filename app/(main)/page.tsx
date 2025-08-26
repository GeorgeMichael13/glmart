"use client";

import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react"; // ✅ Added

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: { id: number; name: string };
  images: string[];
  quantity: number;
}

interface Category {
  id: number;
  name: string;
  image: string;
  quamtity: number;
}

export default function Home() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // 🔥 Hero carousel slides
  const slides = [
    {
      id: 1,
      title: "Shop the Latest Trends",
      subtitle: "Discover the newest arrivals in fashion and lifestyle.",
      image:
        "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: 2,
      title: "Exclusive Deals",
      subtitle: "Save big with our special offers and discounts.",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: 3,
      title: "Glowmart Collections",
      subtitle: "Curated products handpicked just for you.",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % slides.length),
      5000
    );
    return () => clearInterval(interval);
  }, [slides.length]);

  // ✅ Fetch products + categories
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoadingProducts(false);
      }
    }

    async function fetchCategories() {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data: Category[] = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchProducts();
    fetchCategories();
  }, []);

  // ✅ Filter products
  const filteredProducts = products.filter(
    (p) =>
      (!selectedCategory || p.category.id === selectedCategory) &&
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* 🌟 Hero Section with Carousel */}
      <div className="relative w-full h-[60vh] overflow-hidden rounded-b-1xl shadow-lg mb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[current].id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={slides[current].image}
              alt={slides[current].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center text-white px-6">
              <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                {slides[current].title}
              </h1>
              <p className="mt-4 text-lg md:text-xl max-w-2xl">
                {slides[current].subtitle}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full ${
                idx === current ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 🔍 Search */}
      <div className="flex justify-center mb-8 px-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* 🛒 Categories Section */}
      {searchQuery === "" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-12 px-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`cursor-pointer bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition border-2 ${
                selectedCategory === cat.id
                  ? "border-purple-500"
                  : "border-transparent"
              }`}
            >
              <img
                src={cat.image || "/placeholder.png"}
                alt={cat.name}
                className="h-32 w-full object-cover"
              />
              <div className="p-3 text-center font-semibold text-gray-700">
                {cat.name}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✨ Motivational text */}
      <div className="flex justify-center mb-12 px-6">
        <p className="italic text-lg text-gray-600 text-center max-w-2xl">
          Explore our wide range of products and have a wonderful shopping
          experience with Glowmart ✨
        </p>
      </div>

      {/* 📦 Products Section */}
      {loadingProducts && <p className="text-center">Loading products...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loadingProducts && !error && (
        <div className="px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col hover:shadow-xl hover:scale-105 transition cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <img
                src={product.images[0] || "/placeholder.png"}
                alt={product.title}
                className="h-40 w-40 object-cover rounded-md mb-2 mx-auto"
              />
              <h3 className="font-semibold">{product.title}</h3>
              <p className="text-gray-600 mt-1">${product.price}</p>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {product.description}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent modal trigger
                  addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.images[0],
                  });
                }}
                className="mt-4 px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-800 via-purple-700 to-purple-600 hover:opacity-90 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 🔲 Modal for product details */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-lg w-full shadow-lg relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-1 left-3 text-gray-600 hover:text-black flex items-center gap-1"
              >
                <ChevronLeft size={24} /> {/* ✅ Replaced ✖ with ChevronLeft */}
              </button>
              <img
                src={selectedProduct.images[0] || "/placeholder.png"}
                alt={selectedProduct.title}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">
                {selectedProduct.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {selectedProduct.description}
              </p>
              <p className="text-xl font-semibold mb-6">
                ${selectedProduct.price}
              </p>
              <button
                onClick={() => {
                  addToCart({
                    id: selectedProduct.id,
                    title: selectedProduct.title,
                    price: selectedProduct.price,
                    image: selectedProduct.images[0],
                  });
                  setSelectedProduct(null);
                }}
                className="w-full px-4 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-800 via-purple-700 to-purple-600 hover:opacity-90 transition"
              >
                Add to Cart
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
