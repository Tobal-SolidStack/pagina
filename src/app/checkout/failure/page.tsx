import type { Metadata } from "next";
import Link from "next/link";
import { XCircle, MessageCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons/logo";
import { siteConfig, whatsappHref } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Pago no procesado",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ plan?: string }>;
};

export default async function FailurePage({ searchParams }: Props) {
  const { plan } = await searchParams;
  const retryHref = plan ? `/checkout?plan=${plan}` : "/checkout";

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 dark:bg-neutral-950">
      <header className="border-b border-neutral-200 bg-white dark:border-white/10 dark:bg-neutral-900">
        <div className="mx-auto flex max-w-5xl items-center px-4 py-4 sm:px-6 lg:px-8">
          <Link href={siteConfig.url}>
            <Logo className="h-7 w-auto" />
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="w-full max-w-lg text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/50">
            <XCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
          </div>

          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
            El pago no se completó
          </h1>
          <p className="mt-3 text-neutral-600 dark:text-neutral-400">
            Ocurrió un problema al procesar tu pago. No se realizó ningún cargo. Puedes intentarlo nuevamente o contactarnos directamente.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link href={retryHref}>
                <RotateCcw className="h-4 w-4" />
                Intentar de nuevo
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                Contactar por WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </main>

      <footer className="border-t border-neutral-200 py-6 text-center text-xs text-neutral-500 dark:border-white/10">
        © {new Date().getFullYear()} {siteConfig.name}
      </footer>
    </div>
  );
}
