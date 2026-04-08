/**
 * Offline Banner
 * Category: Feedback
 * Tags: offline, network, banner, connection, status, reconnecting
 * Description: A top-of-page offline detection banner. When offline it shows a red warning strip with a reconnecting pulse. When the connection returns it briefly shows a green "Back online" confirmation before dismissing. Simulates the offline ↔ online transition. Demonstrates the network-status banner pattern.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/offline-banner.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState, useEffect } from "react";
import { WifiOff, Wifi, Loader2 } from "lucide-react";

export default function OfflineBanner() {
  const [online, setOnline] = useState(false);
  const [justBack, setJustBack] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);

  function goOnline() {
    setReconnecting(true);
    setTimeout(() => {
      setOnline(true);
      setReconnecting(false);
      setJustBack(true);
      setTimeout(() => setJustBack(false), 3000);
    }, 1500);
  }

  function goOffline() {
    setOnline(false);
    setJustBack(false);
    setReconnecting(false);
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden w-full max-w-sm">
      {/* Banner */}
      {!online && (
        <div className="bg-red-600 text-white px-4 py-2 flex items-center gap-2">
          {reconnecting
            ? <Loader2 size={12} className="animate-spin shrink-0" />
            : <WifiOff size={12} strokeWidth={2} className="shrink-0" />}
          <span className="text-xs font-medium">
            {reconnecting ? "Reconnecting…" : "You're offline"}
          </span>
          <span className="text-xs text-red-200 ml-auto">Changes will sync when back online</span>
        </div>
      )}
      {online && justBack && (
        <div className="bg-emerald-600 text-white px-4 py-2 flex items-center gap-2">
          <Wifi size={12} strokeWidth={2} className="shrink-0" />
          <span className="text-xs font-medium">Back online</span>
          <span className="text-xs text-emerald-200 ml-auto">All changes synced</span>
        </div>
      )}

      {/* Mock page content */}
      <div className="p-4 space-y-2">
        <div className="h-3 bg-neutral-100 rounded w-3/4" />
        <div className="h-3 bg-neutral-100 rounded w-full" />
        <div className="h-3 bg-neutral-100 rounded w-2/3" />
        <div className={`h-3 rounded w-1/2 transition-colors ${!online ? "bg-red-50" : "bg-neutral-100"}`} />
      </div>

      {/* Controls */}
      <div className="px-4 pb-4 flex gap-2">
        <button
          onClick={goOffline}
          disabled={!online}
          className="flex-1 text-xs border border-neutral-200 text-neutral-700 rounded-lg py-1.5 hover:bg-neutral-50 disabled:opacity-30 transition-colors"
        >
          Simulate offline
        </button>
        <button
          onClick={goOnline}
          disabled={online || reconnecting}
          className="flex-1 text-xs font-medium bg-neutral-900 text-white rounded-lg py-1.5 hover:bg-neutral-700 disabled:opacity-30 transition-colors"
        >
          Reconnect
        </button>
      </div>
    </div>
  );
}
