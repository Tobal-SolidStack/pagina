"use client";

import { useEffect, useState } from "react";
import { Trash2, UserPlus } from "lucide-react";

type User = { id: string; name: string; email: string; role: string; createdAt: string };

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  async function loadUsers() {
    const res = await fetch("/api/admin/users");
    if (res.ok) setUsers(await res.json());
  }

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: User[]) => setUsers(data));
  }, []);

  async function createUser(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setError("");
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (res.ok) {
      setName(""); setEmail(""); setPassword("");
      await loadUsers();
    } else {
      const data = await res.json();
      setError(data.error ?? "Error al crear usuario");
    }
    setCreating(false);
  }

  async function deleteUser(id: string) {
    if (!confirm("¿Eliminar este usuario?")) return;
    await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await loadUsers();
  }

  return (
    <div className="p-8">
      <h1 className="mb-8 text-2xl font-bold">Usuarios del panel</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Lista usuarios */}
        <div className="rounded-xl border border-white/10 bg-neutral-900 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">Usuarios activos</h2>
          <div className="space-y-3">
            {users.map((u) => (
              <div key={u.id} className="flex items-center justify-between rounded-lg bg-neutral-800 px-4 py-3">
                <div>
                  <p className="text-sm font-medium">{u.name}</p>
                  <p className="text-xs text-neutral-500">{u.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-neutral-500 capitalize">{u.role}</span>
                  <button onClick={() => deleteUser(u.id)}>
                    <Trash2 className="h-4 w-4 text-neutral-500 hover:text-red-400 transition" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Crear usuario */}
        <div className="rounded-xl border border-white/10 bg-neutral-900 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">Nuevo usuario</h2>
          <form onSubmit={createUser} className="space-y-4">
            {[
              { label: "Nombre", value: name, setter: setName, type: "text", placeholder: "Juan Pérez" },
              { label: "Email", value: email, setter: setEmail, type: "email", placeholder: "juan@solidstack.cl" },
              { label: "Contraseña", value: password, setter: setPassword, type: "password", placeholder: "••••••••" },
            ].map(({ label, value, setter, type, placeholder }) => (
              <div key={label}>
                <label className="mb-1.5 block text-xs text-neutral-400">{label}</label>
                <input
                  type={type}
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  placeholder={placeholder}
                  required
                  className="w-full rounded-lg border border-white/10 bg-neutral-800 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
            ))}
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={creating}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
            >
              <UserPlus className="h-4 w-4" />
              {creating ? "Creando…" : "Crear usuario"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
