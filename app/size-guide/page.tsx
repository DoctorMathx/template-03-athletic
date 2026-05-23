import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Size Guide",
  description: "Find your perfect fit with our comprehensive size guide.",
};

const womenSizes = [
  { size: "XS", bust: "31–32\"", waist: "24–25\"", hips: "34–35\"", uk: "6–8", eu: "34–36" },
  { size: "S",  bust: "33–34\"", waist: "26–27\"", hips: "36–37\"", uk: "8–10", eu: "36–38" },
  { size: "M",  bust: "35–36\"", waist: "28–29\"", hips: "38–39\"", uk: "10–12", eu: "38–40" },
  { size: "L",  bust: "37–39\"", waist: "30–32\"", hips: "40–42\"", uk: "12–14", eu: "40–42" },
  { size: "XL", bust: "40–42\"", waist: "33–35\"", hips: "43–45\"", uk: "14–16", eu: "42–44" },
];

const menSizes = [
  { size: "S",   chest: "34–36\"", waist: "28–30\"", hips: "35–37\"", inseam: "30\"" },
  { size: "M",   chest: "37–39\"", waist: "31–33\"", hips: "38–40\"", inseam: "31\"" },
  { size: "L",   chest: "40–42\"", waist: "34–36\"", hips: "41–43\"", inseam: "32\"" },
  { size: "XL",  chest: "43–45\"", waist: "37–39\"", hips: "44–46\"", inseam: "32\"" },
  { size: "XXL", chest: "46–48\"", waist: "40–42\"", hips: "47–49\"", inseam: "33\"" },
];

export default function SizeGuidePage() {
  return (
    <div className="max-w-[820px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="mb-12">
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-3">Fit Guide</p>
        <h1 className="text-[clamp(28px,4vw,48px)] font-black tracking-[-0.02em] uppercase">Size Guide</h1>
        <p className="text-[14px] text-neutral-500 mt-3">
          All measurements are in inches unless stated otherwise. If you&apos;re between sizes, we recommend sizing up for outerwear and sizing true for compression pieces.
        </p>
      </div>

      {/* How to measure */}
      <section className="mb-14">
        <h2 className="text-[14px] font-bold tracking-[0.1em] uppercase mb-6 pb-3 border-b border-neutral-100">How to Measure</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-[13px] text-neutral-700">
          {[
            { title: "Bust / Chest", desc: "Measure around the fullest part of your chest, keeping the tape parallel to the floor. Breathe normally." },
            { title: "Waist", desc: "Measure around your natural waist — the narrowest part of your torso, usually just above your belly button." },
            { title: "Hips", desc: "Stand with feet together. Measure around the fullest part of your hips and seat, approximately 8\" below your waist." },
          ].map((m) => (
            <div key={m.title} className="border-t-2 border-black pt-4">
              <p className="font-bold text-[13px] mb-2">{m.title}</p>
              <p className="text-neutral-600 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Women */}
      <section className="mb-14">
        <h2 className="text-[14px] font-bold tracking-[0.1em] uppercase mb-6 pb-3 border-b border-neutral-100">Women&apos;s Sizes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] border border-neutral-100">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-100">
                {["Size", "Bust", "Waist", "Hips", "UK", "EU"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-bold text-[11px] tracking-[0.08em] uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {womenSizes.map((row, i) => (
                <tr key={row.size} className={i < womenSizes.length - 1 ? "border-b border-neutral-100" : ""}>
                  <td className="px-4 py-3 font-bold">{row.size}</td>
                  <td className="px-4 py-3 text-neutral-600">{row.bust}</td>
                  <td className="px-4 py-3 text-neutral-600">{row.waist}</td>
                  <td className="px-4 py-3 text-neutral-600">{row.hips}</td>
                  <td className="px-4 py-3 text-neutral-600">{row.uk}</td>
                  <td className="px-4 py-3 text-neutral-600">{row.eu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Men */}
      <section className="mb-14">
        <h2 className="text-[14px] font-bold tracking-[0.1em] uppercase mb-6 pb-3 border-b border-neutral-100">Men&apos;s Sizes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] border border-neutral-100">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-100">
                {["Size", "Chest", "Waist", "Hips", "Inseam"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-bold text-[11px] tracking-[0.08em] uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {menSizes.map((row, i) => (
                <tr key={row.size} className={i < menSizes.length - 1 ? "border-b border-neutral-100" : ""}>
                  <td className="px-4 py-3 font-bold">{row.size}</td>
                  <td className="px-4 py-3 text-neutral-600">{row.chest}</td>
                  <td className="px-4 py-3 text-neutral-600">{row.waist}</td>
                  <td className="px-4 py-3 text-neutral-600">{row.hips}</td>
                  <td className="px-4 py-3 text-neutral-600">{row.inseam}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tips */}
      <div className="bg-neutral-50 p-6">
        <h3 className="text-[12px] font-bold tracking-[0.12em] uppercase mb-4">Sizing Tips</h3>
        <ul className="space-y-2 text-[13px] text-neutral-600">
          {[
            "For leggings — measure your hips and refer to the hips column",
            "For sports bras — use your bust measurement",
            "For compression pieces — size down if between sizes for a snugger fit",
            "For outerwear and hoodies — size up for a relaxed fit, true to size for standard",
          ].map((tip) => (
            <li key={tip} className="flex items-start gap-2">
              <span className="text-black font-bold">–</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
