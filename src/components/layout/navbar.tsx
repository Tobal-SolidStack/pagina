"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { navLinks, whatsappHref, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "glass shadow-sm shadow-black/5"
          : "bg-transparent"
      )}
    >
      <nav aria-label="Navegación principal" className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="#inicio" className="flex items-center gap-2 font-bold text-lg text-neutral-900 dark:text-white" aria-label={`${siteConfig.name} - Inicio`}>
          <Logo className="h-9 w-9" />
          {siteConfig.name}
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-700 transition-colors hover:text-blue-600 dark:text-neutral-300 dark:hover:text-blue-400"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Button asChild>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              Cotizar Ahora
            </a>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 dark:border-white/10 dark:text-white"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden glass lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 pb-6 pt-2 sm:px-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-neutral-800 transition-colors hover:bg-blue-600/10 hover:text-blue-600 dark:text-neutral-200"
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-2 w-full">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  Cotizar Ahora
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
