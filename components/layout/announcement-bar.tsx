"use client";

import { useState, useEffect } from "react";
import { announcementMessages } from "@/mock/navigation";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function AnnouncementBar() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % announcementMessages.length), 4000);
    return () => clearInterval(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="bg-black text-white h-9 flex items-center relative select-none">
      <div className="flex-1 flex items-center justify-center gap-4">
        <button
          onClick={() => setIdx((i) => (i - 1 + announcementMessages.length) % announcementMessages.length)}
          className="text-white/50 hover:text-white transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft size={13} />
        </button>
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase">
          {announcementMessages[idx]}
        </p>
        <button
          onClick={() => setIdx((i) => (i + 1) % announcementMessages.length)}
          className="text-white/50 hover:text-white transition-colors"
          aria-label="Next"
        >
          <ChevronRight size={13} />
        </button>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
        aria-label="Dismiss"
      >
        <X size={13} />
      </button>
    </div>
  );
}
