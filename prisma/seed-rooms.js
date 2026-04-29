const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const roomsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/rooms.json'), 'utf8'));

  console.log('Seeding rooms...');

  for (const room of roomsData) {
    await prisma.room.upsert({
      where: { slug: room.id },
      update: {
        image: room.image,
        images: room.images,
        translations: room.translations,
      },
      create: {
        slug: room.id,
        image: room.image,
        images: room.images,
        translations: room.translations,
      },
    });
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
