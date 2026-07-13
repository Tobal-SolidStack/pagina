"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactSchema = z.object({
  name: z.string().min(2, "Ingresa tu nombre completo"),
  email: z.string().email("Ingresa un correo válido"),
  company: z.string().optional(),
  message: z.string().min(10, "Cuéntanos un poco más sobre tu proyecto"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = React.useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data?.error ?? "Ocurrió un error. Intenta de nuevo.");
        setStatus("error");
        return;
      }

      setStatus("sent");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setErrorMsg("No se pudo conectar con el servidor. Intenta de nuevo.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 dark:border-white/10 dark:bg-neutral-900 dark:text-white";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Nombre
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Tu nombre completo"
          aria-invalid={!!errors.name}
          className={inputClass}
          {...register("name")}
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Correo
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="tucorreo@ejemplo.com"
          aria-invalid={!!errors.email}
          className={inputClass}
          {...register("email")}
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Empresa <span className="text-neutral-400">(opcional)</span>
        </label>
        <input
          id="company"
          type="text"
          autoComplete="organization"
          placeholder="Nombre de tu negocio"
          className={inputClass}
          {...register("company")}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Mensaje
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Cuéntanos sobre tu negocio y qué necesitas..."
          aria-invalid={!!errors.message}
          className={`${inputClass} resize-none`}
          {...register("message")}
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
      </div>

      <AnimatePresence mode="wait">
        {status === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-400"
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            {errorMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        type="submit"
        size="lg"
        disabled={status === "sending"}
        className="w-full"
      >
        <AnimatePresence mode="wait" initial={false}>
          {status === "sending" ? (
            <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Enviando...
            </motion.span>
          ) : status === "sent" ? (
            <motion.span key="sent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              ¡Cotización enviada!
            </motion.span>
          ) : (
            <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Enviar Cotización
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </form>
  );
}
