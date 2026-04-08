/**
 * Quantity Selector
 * Category: Commerce
 * Tags: quantity, cart, stepper, buy, add, product
 * Description: A product quantity selector with a thumbnail, product name, unit price, and a +/– stepper. Quantity is clamped between 1 and a stock max. The line total updates live. An Add to Cart button shows a brief success state. Demonstrates the quantity selector pattern used on product and cart pages.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/quantity-selector.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag, Check } from "lucide-react";

const PRODUCT = { name: "Wireless Noise-Cancelling Headphones", price: 89.99, stock: 12 };

export default function QuantitySelector() {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function increment() { setQty(q => Math.min(PRODUCT.stock, q + 1)); }
  function decrement() { setQty(q => Math.max(1, q - 1)); }

  function addToCart() {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const total = (qty * PRODUCT.price).toFixed(2);

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-4 w-full max-w-xs space-y-3">
      {/* Product */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
          <ShoppingBag size={18} className="text-neutral-400" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium text-neutral-800 leading-snug">{PRODUCT.name}</div>
          <div className="text-[10px] text-neutral-500 mt-0.5">${PRODUCT.price.toFixed(2)} each · {PRODUCT.stock} in stock</div>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between">
        <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden">
          <button
            onClick={decrement}
            disabled={qty <= 1}
            className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:bg-neutral-50 disabled:opacity-30 transition-colors border-r border-neutral-200"
          >
            <Minus size={12} strokeWidth={2} />
          </button>
          <div className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-neutral-900">{qty}</div>
          <button
            onClick={increment}
            disabled={qty >= PRODUCT.stock}
            className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:bg-neutral-50 disabled:opacity-30 transition-colors border-l border-neutral-200"
          >
            <Plus size={12} strokeWidth={2} />
          </button>
        </div>

        <div className="text-right">
          <div className="text-[10px] text-neutral-400">Total</div>
          <div className="text-sm font-semibold text-neutral-900">${total}</div>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={addToCart}
        className={`w-full flex items-center justify-center gap-1.5 text-xs font-medium rounded-lg py-2 transition-colors
          ${added ? "bg-emerald-600 text-white" : "bg-neutral-900 text-white hover:bg-neutral-700"}`}
      >
        {added ? <Check size={12} strokeWidth={2.5} /> : <ShoppingBag size={12} strokeWidth={1.5} />}
        {added ? "Added to cart!" : "Add to cart"}
      </button>
    </div>
  );
}
