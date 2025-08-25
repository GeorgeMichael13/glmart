"use client";

import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: { id: number; name: string };
  images: string[];
}

export default function SearchPage() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

    fetchProducts();
  }, []);

  // Filter products based on search query only
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white pt-6 px-6">
      {/* Use your inbuilt navbar here */}
      {/* Just make sure your navbar component is included in the layout or above this page */}

      <div className="pt-6">
        {/* Search */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md"
          />
        </div>

        {/* Loading & Error */}
        {loadingProducts && <p className="text-center">Loading products...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Display Search Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col"
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
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      image: product.images[0],
                      quantity: 1,
                    })
                  }
                  className="mt-4 px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-800 via-purple-700 to-purple-600 hover:opacity-90 transition"
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
