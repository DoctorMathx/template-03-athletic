"use client";

import { useState } from "react";
import { User, Package, Heart, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "login" | "register";
type DashTab = "orders" | "wishlist" | "settings";

const mockOrders = [
  { id: "FS-38291", date: "May 18, 2026", status: "Delivered", total: "₦141,000", items: 2 },
  { id: "FS-29847", date: "Apr 30, 2026", status: "Shipped", total: "₦102,750", items: 1 },
];

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [tab, setTab] = useState<Tab>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="max-w-[440px] mx-auto px-4 py-16">
      {/* Tabs */}
      <div className="flex border-b border-neutral-100 mb-8">
        {(["login", "register"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 py-3 text-[12px] font-bold tracking-[0.1em] uppercase transition-colors border-b-2",
              tab === t ? "border-black text-black" : "border-transparent text-neutral-400 hover:text-black"
            )}
          >
            {t === "login" ? "Sign In" : "Create Account"}
          </button>
        ))}
      </div>

      {tab === "login" ? (
        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-4">
          <div>
            <label className="text-[11px] font-bold tracking-[0.1em] uppercase block mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full border border-neutral-200 px-4 py-3.5 text-[13px] focus:outline-none focus:border-black transition-colors"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold tracking-[0.1em] uppercase">Password</label>
              <button type="button" className="text-[11px] text-neutral-400 hover:text-black transition-colors underline underline-offset-2">
                Forgot?
              </button>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full border border-neutral-200 px-4 py-3.5 text-[13px] focus:outline-none focus:border-black transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white text-[12px] font-bold tracking-[0.14em] uppercase py-4 hover:bg-neutral-800 transition-colors mt-2"
          >
            Sign In
          </button>
        </form>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-4">
          <div>
            <label className="text-[11px] font-bold tracking-[0.1em] uppercase block mb-1.5">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your name"
              className="w-full border border-neutral-200 px-4 py-3.5 text-[13px] focus:outline-none focus:border-black transition-colors"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold tracking-[0.1em] uppercase block mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full border border-neutral-200 px-4 py-3.5 text-[13px] focus:outline-none focus:border-black transition-colors"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold tracking-[0.1em] uppercase block mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full border border-neutral-200 px-4 py-3.5 text-[13px] focus:outline-none focus:border-black transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white text-[12px] font-bold tracking-[0.14em] uppercase py-4 hover:bg-neutral-800 transition-colors mt-2"
          >
            Create Account
          </button>
        </form>
      )}
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<DashTab>("orders");

  const navItems = [
    { id: "orders" as DashTab, icon: Package, label: "Orders" },
    { id: "wishlist" as DashTab, icon: Heart, label: "Wishlist" },
    { id: "settings" as DashTab, icon: Settings, label: "Settings" },
  ];

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">
        {/* Sidebar */}
        <aside>
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-neutral-100">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div>
              <p className="text-[14px] font-bold">Alex Johnson</p>
              <p className="text-[12px] text-neutral-400">alex@example.com</p>
            </div>
          </div>
          <nav className="space-y-1">
            {navItems.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={cn(
                  "flex items-center gap-3 w-full px-3 py-3 text-[13px] font-semibold transition-colors text-left",
                  tab === id ? "bg-black text-white" : "text-neutral-600 hover:bg-neutral-100 hover:text-black"
                )}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
            <button
              onClick={onLogout}
              className="flex items-center gap-3 w-full px-3 py-3 text-[13px] font-semibold text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut size={15} />
              Sign Out
            </button>
          </nav>
        </aside>

        {/* Content */}
        <div>
          {tab === "orders" && (
            <div>
              <h1 className="text-[22px] font-black tracking-[-0.01em] uppercase mb-8">My Orders</h1>
              {mockOrders.length === 0 ? (
                <p className="text-[14px] text-neutral-400 py-12">No orders yet.</p>
              ) : (
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="border border-neutral-100 p-5 hover:border-neutral-300 transition-colors">
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div>
                          <p className="text-[13px] font-bold">{order.id}</p>
                          <p className="text-[12px] text-neutral-400">{order.date} · {order.items} items</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[13px] font-bold">{order.total}</p>
                          <span className={cn(
                            "text-[10px] font-bold tracking-[0.1em] uppercase px-2 py-1",
                            order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                          )}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "wishlist" && (
            <div>
              <h1 className="text-[22px] font-black tracking-[-0.01em] uppercase mb-4">Wishlist</h1>
              <p className="text-[14px] text-neutral-500">
                Items you&apos;ve saved appear here. <a href="/wishlist" className="underline hover:text-black transition-colors">View your wishlist →</a>
              </p>
            </div>
          )}

          {tab === "settings" && (
            <div>
              <h1 className="text-[22px] font-black tracking-[-0.01em] uppercase mb-8">Account Settings</h1>
              <form className="max-w-md space-y-4">
                <div>
                  <label className="text-[11px] font-bold tracking-[0.1em] uppercase block mb-1.5">Full Name</label>
                  <input
                    defaultValue="Alex Johnson"
                    className="w-full border border-neutral-200 px-4 py-3.5 text-[13px] focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold tracking-[0.1em] uppercase block mb-1.5">Email</label>
                  <input
                    defaultValue="alex@example.com"
                    type="email"
                    className="w-full border border-neutral-200 px-4 py-3.5 text-[13px] focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold tracking-[0.1em] uppercase block mb-1.5">Phone</label>
                  <input
                    placeholder="+1 (555) 000-0000"
                    className="w-full border border-neutral-200 px-4 py-3.5 text-[13px] focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  onClick={(e) => e.preventDefault()}
                  className="bg-black text-white text-[12px] font-bold tracking-[0.14em] uppercase px-8 py-3.5 hover:bg-neutral-800 transition-colors"
                >
                  Save Changes
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  const [loggedIn, setLoggedIn] = useState(false);

  return loggedIn ? (
    <Dashboard onLogout={() => setLoggedIn(false)} />
  ) : (
    <LoginForm onLogin={() => setLoggedIn(true)} />
  );
}
