import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter } as any);

async function main() {
  const password = await bcrypt.hash("solidstack2024", 12);
  const user = await db.adminUser.create({
    data: {
      name: "Cristobal Alvarez",
      email: "ialvarez1511@gmail.com",
      password,
      role: "admin",
    },
  });
  console.log("✅ Admin creado:", user.email);
}

main().catch(console.error).finally(() => db.$disconnect());
