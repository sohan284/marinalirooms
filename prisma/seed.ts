import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import "dotenv/config";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is not defined");
  process.exit(1);
}

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Load content data manually
  const contentPath = path.join(process.cwd(), "data", "content.json");
  const contentData = JSON.parse(fs.readFileSync(contentPath, "utf-8"));

  // 1. Cleanup: Remove Bengali if it exists
  await prisma.pageContent.deleteMany({
    where: { lang: "bn" }
  });
  console.log("Removed [bn] content from database (if any).");

  // 2. Seed English, Italian, German (From content.json)
  const langs = ["en", "it", "de"] as const;

  for (const lang of langs) {
    const data = contentData.content[lang]?.home;
    if (!data) continue;

    const sections = {
      hero: {
        title: data.title,
        subtitle: data.subtitle,
        welcomeText: data.welcomeText,
      },
      about: {
        title: data.aboutTitle,
        description: data.aboutDescription,
      },
      booking: data.booking,
      footer: {
        copyright: "© 2026 Marinali Rooms",
        links: ["Privacy Policy", "Terms", "Contact"],
      }
    };

    await prisma.pageContent.upsert({
      where: { page_lang: { page: "home", lang } },
      update: { sections },
      create: { page: "home", lang, sections },
    });
    console.log(`Seeded [${lang}] home page`);
  }

  console.log("Database seeding completed for primary languages.");

  // 3. Seed SiteSettings (theme colors)
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      primaryColor: "#123149",
      secondaryColor: "#F2DE97",
      backgroundColor: "#F8F6F2",
      textColor: "#111111",
      fontFamily: "var(--font-playfair)",
    },
  });
  console.log("Seeded SiteSettings with default theme colors.");

  // 4. Seed Admin
  const adminEmail = "welcome@marinalirooms.it";
  const hashedPassword = await bcrypt.hash("marinalirooms@", 10);

  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
    },
  });
  console.log("Seeded initial admin user.");
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
