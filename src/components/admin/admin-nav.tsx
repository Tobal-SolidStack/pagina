"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, Mail, LogOut, UserCog, Menu, X } from "lucide-react";
import { Logo } from "@/components/icons/logo";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/clients", label: "Clientes", icon: Users },
  { href: "/admin/emails", label: "Emails masivos", icon: Mail },
  { href: "/admin/users", label: "Usuarios", icon: UserCog },
];

function NavLinks({
  pathname,
  onLogout,
  onClose,
}: {
  pathname: string;
  onLogout: () => void;
  onClose?: () => void;
}) {
  return (
    <>
      <nav className="flex-1 space-y-1 p-3">
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition",
                active
                  ? "bg-blue-600 text-white"
                  : "text-neutral-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-3">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-neutral-400 transition hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Cerrar sesión
        </button>
      </div>
    </>
  );
}

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <>
      {/* ── Mobile top bar ── */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-white/10 bg-neutral-900/95 px-4 backdrop-blur-sm lg:hidden">
        <Logo className="h-5 w-auto" />
        <button
          onClick={() => setOpen(true)}
          className="rounded-lg p-2 text-neutral-400 hover:bg-white/10 hover:text-white"
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {/* ── Mobile overlay ── */}
      {open && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Drawer */}
          <aside
            className="absolute left-0 top-0 flex h-full w-64 flex-col bg-neutral-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <Logo className="h-6 w-auto" />
                <p className="mt-0.5 text-xs text-neutral-500">Panel de administración</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-neutral-400 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <NavLinks pathname={pathname} onLogout={handleLogout} onClose={() => setOpen(false)} />
          </aside>
        </div>
      )}

      {/* ── Desktop sidebar ── */}
      <aside className="hidden w-56 shrink-0 flex-col border-r border-white/10 bg-neutral-900 lg:flex">
        <div className="border-b border-white/10 px-5 py-5">
          <Logo className="h-6 w-auto" />
          <p className="mt-1 text-xs text-neutral-500">Panel de administración</p>
        </div>
        <NavLinks pathname={pathname} onLogout={handleLogout} />
      </aside>
    </>
  );
}
