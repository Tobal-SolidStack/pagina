"use client";

import { useState } from "react";
import { Send, Users } from "lucide-react";

type Tab = "individual" | "masivo";

export default function EmailsPage() {
  const [tab, setTab] = useState<Tab>("individual");

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="mb-2 text-xl font-bold sm:text-2xl">Emails</h1>
      <p className="mb-6 text-sm text-neutral-400">Redacta y envía emails con el diseño de SolidStack.</p>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 rounded-xl border border-white/10 bg-neutral-900 p-1 w-fit">
        <button
          onClick={() => setTab("individual")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            tab === "individual"
              ? "bg-blue-600 text-white"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          Individual
        </button>
        <button
          onClick={() => setTab("masivo")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            tab === "masivo"
              ? "bg-blue-600 text-white"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          Masivo
        </button>
      </div>

      {tab === "individual" ? <IndividualEmail /> : <MasiveEmail />}
    </div>
  );
}

function IndividualEmail() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSend() {
    if (!to.trim() || !subject.trim() || !body.trim()) return;
    setSending(true);
    setError("");
    setSent(false);
    const res = await fetch("/api/admin/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, subject, body }),
    });
    if (res.ok) {
      setSent(true);
      setTo("");
      setSubject("");
      setBody("");
    } else {
      const data = await res.json();
      setError(data.error ?? "Error al enviar");
    }
    setSending(false);
  }

  return (
    <div className="max-w-2xl rounded-xl border border-white/10 bg-neutral-900 p-6">
      <div className="mb-5 flex items-center gap-2 text-sm text-neutral-400">
        <Send className="h-4 w-4" />
        El email se enviará con el diseño y firma de SolidStack
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm text-neutral-400">Para</label>
          <input
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="cliente@email.com"
            className="w-full rounded-lg border border-white/10 bg-neutral-800 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-neutral-400">Asunto</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Respuesta a tu cotización — SolidStack"
            className="w-full rounded-lg border border-white/10 bg-neutral-800 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-neutral-400">
            Mensaje
            <span className="ml-2 text-xs text-neutral-600">Separa párrafos con una línea en blanco</span>
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={12}
            placeholder={`Hola Juan,\n\nGracias por contactarte con SolidStack. Con gusto te ayudamos con tu proyecto.\n\nQuedo disponible para cualquier consulta.`}
            className="w-full rounded-lg border border-white/10 bg-neutral-800 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none font-mono"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        {sent && (
          <div className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
            ✓ Email enviado correctamente con el diseño de SolidStack
          </div>
        )}

        <button
          onClick={handleSend}
          disabled={sending || !to.trim() || !subject.trim() || !body.trim()}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
          {sending ? "Enviando…" : "Enviar con diseño SolidStack"}
        </button>
      </div>
    </div>
  );
}

function MasiveEmail() {
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
    <div className="max-w-2xl rounded-xl border border-white/10 bg-neutral-900 p-6">
      <div className="mb-5 flex items-center gap-2 text-sm text-neutral-400">
        <Users className="h-4 w-4" />
        Se enviará a todos los clientes registrados en la base de datos
      </div>

      <div className="space-y-4">
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
          <div className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
            ✓ Enviado a {result.sent} de {result.total} clientes
            {result.failed > 0 && ` (${result.failed} fallaron)`}
          </div>
        )}

        <button
          onClick={handleSend}
          disabled={sending || !subject.trim() || !body.trim()}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
        >
          <Users className="h-4 w-4" />
          {sending ? "Enviando…" : "Enviar a todos los clientes"}
        </button>
      </div>
    </div>
  );
}
