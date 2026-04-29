import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import "dotenv/config";
import fs from "fs";
import path from "path";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is not defined");
  process.exit(1);
}

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const roomsPath = path.join(process.cwd(), "data", "rooms.json");
  const roomsData = JSON.parse(fs.readFileSync(roomsPath, "utf-8"));

  console.log("Seeding rooms...");

  for (const room of roomsData) {
    await prisma.room.upsert({
      where: { slug: room.id },
      update: {
        images: room.images,
        translations: room.translations,
      },
      create: {
        slug: room.id,
        images: room.images,
        translations: room.translations,
      },
    });
    console.log(`Seeded room: ${room.id}`);
  }

  console.log("Rooms seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
