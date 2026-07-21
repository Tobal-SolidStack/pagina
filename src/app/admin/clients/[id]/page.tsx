import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { ClientDetail } from "@/components/admin/client-detail";

export default async function ClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [client, session] = await Promise.all([
    db.client.findUnique({
      where: { id },
      include: { project: true, messages: { orderBy: { createdAt: "asc" } } },
    }),
    getSession(),
  ]);
  if (!client) return notFound();
  return <ClientDetail client={client} sessionName={session?.name ?? "Admin"} />;
}
