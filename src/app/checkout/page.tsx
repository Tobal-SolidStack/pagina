import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { Logo } from "@/components/icons/logo";
import { plans } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Completa tu compra de forma segura con FLOW.",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ plan?: string }>;
};

export default async function CheckoutPage({ searchParams }: Props) {
  const { plan } = await searchParams;

  const validPlanId = plans.find((p) => p.id === plan)?.id ?? "negocio";

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Minimal header */}
      <header className="border-b border-neutral-200 bg-white dark:border-white/10 dark:bg-neutral-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href={siteConfig.url} className="flex items-center gap-2">
            <Logo className="h-7 w-auto" />
          </Link>
          <Link
            href="/#planes"
            className="flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
            Volver a los planes
          </Link>
        </div>
      </header>

      <main>
        <CheckoutForm planId={validPlanId} />
      </main>

      <footer className="border-t border-neutral-200 py-6 text-center text-xs text-neutral-500 dark:border-white/10">
        © {new Date().getFullYear()} {siteConfig.name} · Pago procesado por FLOW
      </footer>
    </div>
  );
}
