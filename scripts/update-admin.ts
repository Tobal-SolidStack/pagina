import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter } as any);

async function main() {
  const user = await db.adminUser.update({
    where: { email: "ialvarez1511@gmail.com" },
    data: { email: "contacto@solidstack.cl" },
  });
  console.log("✅ Email actualizado:", user.email);
}

main().catch(console.error).finally(() => db.$disconnect());
