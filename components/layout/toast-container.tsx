"use client";

import { CheckCircle, XCircle, Info, X } from "lucide-react";
import { useToast } from "@/lib/toast-context";
import { cn } from "@/lib/utils";

export function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex flex-col gap-2 items-center pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "pointer-events-auto flex items-center gap-3 px-4 py-3 shadow-xl min-w-[260px] max-w-[360px] text-[13px] font-medium animate-in slide-in-from-bottom-4 duration-300",
            toast.type === "success" && "bg-black text-white",
            toast.type === "error" && "bg-red-600 text-white",
            toast.type === "info" && "bg-neutral-700 text-white"
          )}
        >
          {toast.type === "success" && <CheckCircle size={15} className="shrink-0" />}
          {toast.type === "error" && <XCircle size={15} className="shrink-0" />}
          {toast.type === "info" && <Info size={15} className="shrink-0" />}
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-white/60 hover:text-white transition-colors ml-1"
            aria-label="Dismiss"
          >
            <X size={13} />
          </button>
        </div>
      ))}
    </div>
  );
}
