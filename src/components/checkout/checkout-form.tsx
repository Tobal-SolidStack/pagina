"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Check, Loader2, Sparkles, ShieldCheck, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { plans } from "@/lib/data";
import { cn } from "@/lib/utils";

const schema = z.object({
  nombre: z.string().min(2, "Ingresa tu nombre completo"),
  email: z.string().email("Correo inválido"),
  telefono: z
    .string()
    .min(8, "Teléfono inválido")
    .regex(/^[0-9+\s()-]+$/, "Solo números y caracteres +, -, ()"),
  rut: z
    .string()
    .min(7, "RUT inválido")
    .regex(/^[0-9]{1,2}\.?[0-9]{3}\.?[0-9]{3}-?[0-9Kk]$/, "RUT inválido (ej: 12.345.678-9)"),
});

type FormData = z.infer<typeof schema>;

type Props = {
  planId: string;
};

export function CheckoutForm({ planId }: Props) {
  const router = useRouter();
  const plan = plans.find((p) => p.id === planId) ?? plans[1];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    const res = await fetch("/api/checkout/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId: plan.id, ...data }),
    });

    const json = await res.json();

    if (!res.ok || !json.redirectUrl) {
      setError("root", {
        message: json.error ?? "Error al procesar el pago. Intenta de nuevo.",
      });
      return;
    }

    router.push(json.redirectUrl);
  }

  const isSubscription = plan.billing === "/mes";

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
        {/* Form */}
        <div>
          <div className="mb-8">
            <p className="text-sm font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Checkout seguro
            </p>
            <h1 className="mt-1 text-3xl font-extrabold text-neutral-900 dark:text-white">
              Completa tu compra
            </h1>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              Serás redirigido a FLOW para completar el pago de forma segura.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Nombre completo" error={errors.nombre?.message}>
                <input
                  {...register("nombre")}
                  type="text"
                  placeholder="Ej: Juan Pérez"
                  autoComplete="name"
                  className={inputCls(!!errors.nombre)}
                />
              </Field>

              <Field label="Correo electrónico" error={errors.email?.message}>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="tu@correo.cl"
                  autoComplete="email"
                  className={inputCls(!!errors.email)}
                />
              </Field>

              <Field label="Teléfono celular" error={errors.telefono?.message}>
                <input
                  {...register("telefono")}
                  type="tel"
                  placeholder="+56 9 8765 4321"
                  autoComplete="tel"
                  className={inputCls(!!errors.telefono)}
                />
              </Field>

              <Field label="RUT" error={errors.rut?.message}>
                <input
                  {...register("rut")}
                  type="text"
                  placeholder="12.345.678-9"
                  className={inputCls(!!errors.rut)}
                />
              </Field>
            </div>

            {errors.root && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                {errors.root.message}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full gap-2 text-base"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Conectando con FLOW…
                </>
              ) : isSubscription ? (
                <>
                  <Lock className="h-4 w-4" />
                  Registrar tarjeta y activar suscripción
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  Pagar con FLOW
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-6 text-xs text-neutral-500 dark:text-neutral-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
                Pago 100% seguro
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-green-500" />
                Encriptación SSL
              </span>
            </div>
          </form>
        </div>

        {/* Order summary */}
        <div className="lg:sticky lg:top-24">
          <div
            className={cn(
              "rounded-3xl border p-8",
              plan.featured
                ? "border-blue-600 bg-white shadow-2xl shadow-blue-600/10 dark:bg-neutral-900"
                : "border-neutral-200 bg-white shadow-sm dark:border-white/10 dark:bg-neutral-900"
            )}
          >
            {plan.badge && (
              <div className="mb-6 flex">
                <Badge variant="solid" className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  {plan.badge}
                </Badge>
              </div>
            )}

            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">{plan.name}</h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{plan.description}</p>

            <div className="mt-6 flex items-baseline gap-1 border-b border-neutral-100 pb-6 dark:border-white/10">
              <span className="text-4xl font-extrabold text-neutral-900 dark:text-white">
                {plan.price}
              </span>
              <span className="text-sm text-neutral-500">+ IVA {plan.billing}</span>
            </div>

            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
                    <Check className="h-3 w-3" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            {isSubscription && (
              <p className="mt-6 rounded-xl bg-blue-50 px-4 py-3 text-xs text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
                Sin costo de entrada · Cancela cuando quieras · Primer cobro al registrar la tarjeta
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    "w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition",
    "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white",
    "placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
      : "border-neutral-300 dark:border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
  );
}
