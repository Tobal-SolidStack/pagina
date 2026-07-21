"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function EmailsPage() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ sent: number; failed: number; total: number } | null>(null);
  const [error, setError] = useState("");

  async function handleSend() {
    if (!subject.trim() || !body.trim()) return;
    setSending(true);
    setError("");
    setResult(null);
    const res = await fetch("/api/admin/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, body }),
    });
    const data = await res.json();
    if (res.ok) {
      setResult(data);
      setSubject("");
      setBody("");
    } else {
      setError(data.error ?? "Error al enviar");
    }
    setSending(false);
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="mb-2 text-xl font-bold sm:text-2xl">Emails masivos</h1>
      <p className="mb-6 text-sm text-neutral-400 sm:mb-8">Se enviará a todos los clientes registrados.</p>

      <div className="max-w-2xl rounded-xl border border-white/10 bg-neutral-900 p-6">
        <div className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm text-neutral-400">Asunto</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-neutral-800 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none"
              placeholder="Novedades de SolidStack"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-neutral-400">Mensaje</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={10}
              className="w-full rounded-lg border border-white/10 bg-neutral-800 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none"
              placeholder="Escribe el contenido del email..."
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          {result && (
            <div className="rounded-lg bg-green-500/10 border border-green-500/20 px-4 py-3 text-sm text-green-400">
              ✓ Enviado a {result.sent} de {result.total} clientes
              {result.failed > 0 && ` (${result.failed} fallaron)`}
            </div>
          )}

          <button
            onClick={handleSend}
            disabled={sending || !subject.trim() || !body.trim()}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            {sending ? "Enviando…" : "Enviar a todos los clientes"}
          </button>
        </div>
      </div>
    </div>
  );
}
