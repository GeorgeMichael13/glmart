"use client";

import { useCart, CartItem } from "@/context/cart-context";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const freeShippingThreshold = 150;
  const remainingForFreeShipping = freeShippingThreshold - totalPrice;

  const handleCompleteOrder = () => {
    if (cart.length === 0) return alert("Your cart is empty!");
    alert(`Order completed! Total: $${totalPrice.toFixed(2)}`);
    clearCart();
  };

  return (
    <div className="min-h-screen px-6 py-12 bg-gray-50">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-purple-700">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <p className="text-2xl mb-4">Your cart is empty.</p>
          <Link href="/">
            <button className="bg-gradient-to-r from-blue-800 via-purple-700 to-purple-600 text-white px-6 py-2 rounded-lg">
              Go Shopping
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow divide-y">
            {cart.map((item: CartItem) => (
              <div key={item.id} className="flex items-center p-4">
                <img
                  src={item.images?.[0] || "/placeholder.png"}
                  alt={item.title}
                  className="h-24 w-24 object-cover rounded-md"
                />
                <div className="flex-1 ml-4">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-600">${item.price} × {item.quantity}</p>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 ml-4"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mt-6 bg-white rounded-lg shadow p-4">
            {totalPrice < freeShippingThreshold && (
              <p className="text-sm text-gray-600 mb-2">
                You're ${remainingForFreeShipping.toFixed(2)} away from free shipping!
              </p>
            )}

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
              <button
                onClick={handleCompleteOrder}
                className="bg-gradient-to-r from-blue-800 via-purple-700 to-purple-600 text-white px-6 py-2 rounded-lg"
              >
                Complete Order
              </button>
            </div>
          </div>

          {/* Upsell Section */}
          <div className="max-w-4xl mx-auto mt-8">
            <h3 className="text-2xl font-bold mb-4">You may also like</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* Placeholder: In production, map real product recommendations */}
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-white rounded-lg shadow p-3 text-center">
                  <div className="h-32 bg-gray-200 mb-2" />
                  <p className="text-sm font-medium">Recommended Item {n}</p>
                  <button className="mt-2 text-blue-600 hover:underline text-sm">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
