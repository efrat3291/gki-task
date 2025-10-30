"use client";

import { useCartStore } from "@/store/cartStore";

export default function Cart() {
  const { items, removeFromCart, clearCart } = useCartStore();

  if (items.length === 0) {
    return <p className="text-center mt-10 text-gray-500">העגלה ריקה 🛒</p>;
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">עגלת הקניות שלך</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-gray-600">${item.price}</p>
                <p className="text-sm text-gray-500">כמות: {item.quantity}</p>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
            >
              הסר
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <p className="text-xl font-bold">סה״כ: ${total.toFixed(2)}</p>
        <button
          onClick={clearCart}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          נקה עגלה
        </button>
      </div>
    </div>
  );
}
