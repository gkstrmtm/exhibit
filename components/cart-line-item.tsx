/**
 * Cart Line Item
 * Category: Commerce
 * Tags: cart, line item, quantity, e-commerce, checkout
 * Description: Shopping cart item row with product name, variant info, quantity control, price, and remove button. Compact inline layout.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/cart-line-item.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";
export default function CartLineItem() {
  const [qty, setQty] = useState(2);
  return (
    <div className="bg-white border border-neutral-100 rounded-xl p-4 max-w-sm space-y-3">
      {[{ name: "Ghost Button Pack", variant: "React • License: 1 seat", price: 12 }].map(item => (
        <div key={item.name} className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center text-xl shrink-0">🧩</div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-neutral-900">{item.name}</div>
            <div className="text-xs text-neutral-400 mt-0.5">{item.variant}</div>
            <div className="flex items-center gap-2 mt-2">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-6 h-6 rounded border border-neutral-200 text-neutral-600 text-xs hover:bg-neutral-50">-</button>
              <span className="text-sm w-4 text-center">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="w-6 h-6 rounded border border-neutral-200 text-neutral-600 text-xs hover:bg-neutral-50">+</button>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-sm font-semibold text-neutral-900">${item.price * qty}</div>
            <button className="text-xs text-neutral-300 hover:text-red-400 mt-1">Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}