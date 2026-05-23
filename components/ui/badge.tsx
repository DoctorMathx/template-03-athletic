import { cn } from "@/lib/utils";

type Variant = "new" | "sale" | "bestseller" | "soldout";

const styles: Record<Variant, string> = {
  new:        "bg-black text-white",
  sale:       "bg-red-600 text-white",
  bestseller: "bg-white text-black border border-black/20",
  soldout:    "bg-neutral-400 text-white",
};

export function Badge({ label, variant }: { label: string; variant: Variant }) {
  return (
    <span
      className={cn(
        "inline-block text-[9px] font-bold tracking-[0.14em] uppercase px-2 py-1 leading-none",
        styles[variant]
      )}
    >
      {label}
    </span>
  );
}
