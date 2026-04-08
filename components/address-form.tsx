/**
 * Address Form
 * Category: Inputs
 * Tags: address, form, country, postal, fields, checkout
 * Description: An address input form with country select, street lines, city, state/region, and postal code. The state field adapts its label based on country (State / Province / County). Postal code label changes too. Demonstrates the adaptive address form pattern used in checkout and account settings.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/address-form.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";

const COUNTRIES = [
  { code: "US", name: "United States", stateLabel: "State", postalLabel: "ZIP code" },
  { code: "GB", name: "United Kingdom", stateLabel: "County", postalLabel: "Postcode" },
  { code: "CA", name: "Canada", stateLabel: "Province", postalLabel: "Postal code" },
  { code: "AU", name: "Australia", stateLabel: "State", postalLabel: "Postcode" },
  { code: "DE", name: "Germany", stateLabel: "State", postalLabel: "Postcode" },
];

export default function AddressForm() {
  const [country, setCountry] = useState("US");
  const countryConfig = COUNTRIES.find(c => c.code === country)!;

  const inputCls = "w-full text-xs border border-neutral-300 rounded-lg px-3 py-2 outline-none focus:border-neutral-600 transition-colors bg-white";

  return (
    <form className="bg-white border border-neutral-200 rounded-xl p-5 w-full max-w-xs space-y-3" onSubmit={e => e.preventDefault()}>
      <div className="text-xs font-semibold text-neutral-700 mb-1">Shipping address</div>

      {/* Country */}
      <div>
        <label className="text-[10px] font-medium text-neutral-500 block mb-1 uppercase tracking-wide">Country</label>
        <select className={inputCls} value={country} onChange={e => setCountry(e.target.value)}>
          {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
        </select>
      </div>

      {/* Name */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[10px] font-medium text-neutral-500 block mb-1 uppercase tracking-wide">First name</label>
          <input type="text" className={inputCls} placeholder="Jane" />
        </div>
        <div>
          <label className="text-[10px] font-medium text-neutral-500 block mb-1 uppercase tracking-wide">Last name</label>
          <input type="text" className={inputCls} placeholder="Smith" />
        </div>
      </div>

      {/* Street */}
      <div>
        <label className="text-[10px] font-medium text-neutral-500 block mb-1 uppercase tracking-wide">Address line 1</label>
        <input type="text" className={inputCls} placeholder="123 Main St" />
      </div>
      <div>
        <label className="text-[10px] font-medium text-neutral-500 block mb-1 uppercase tracking-wide">Address line 2 <span className="text-neutral-400 normal-case font-normal">(optional)</span></label>
        <input type="text" className={inputCls} placeholder="Apt, suite, unit…" />
      </div>

      {/* City / State */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[10px] font-medium text-neutral-500 block mb-1 uppercase tracking-wide">City</label>
          <input type="text" className={inputCls} placeholder="New York" />
        </div>
        <div>
          <label className="text-[10px] font-medium text-neutral-500 block mb-1 uppercase tracking-wide">{countryConfig.stateLabel}</label>
          <input type="text" className={inputCls} placeholder={countryConfig.stateLabel} />
        </div>
      </div>

      {/* Postal */}
      <div>
        <label className="text-[10px] font-medium text-neutral-500 block mb-1 uppercase tracking-wide">{countryConfig.postalLabel}</label>
        <input type="text" className={inputCls} placeholder="10001" />
      </div>

      <button type="submit" className="w-full text-xs font-medium bg-neutral-900 text-white rounded-lg py-2 hover:bg-neutral-700 transition-colors mt-1">
        Save address
      </button>
    </form>
  );
}
