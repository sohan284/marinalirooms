import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating room images to use new assets...');

  // Update rooms with a mapping or sequential assets
  const rooms = await prisma.room.findMany({
    orderBy: { order: 'asc' },
  });

  const assetPool = [
    '/assets/Stanza%201%20-%20Foto-1.jpg',
    '/assets/Stanza%202%20-%20Foto-1.jpg',
    '/assets/Stanza%203%20-%20Foto-1.jpg',
    '/assets/Stanza%201%20-%20Foto-4.jpg',
    '/assets/Stanza%202%20-%20Foto-11.jpg',
    '/assets/Stanza%203%20-%20Foto-13.jpg',
    '/assets/Stanza%201%20-%20Foto-7.jpg',
    '/assets/Stanza%202%20-%20Foto-17.jpg',
    '/assets/Stanza%203%20-%20Foto-23.jpg',
  ];

  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    const newImage = assetPool[i % assetPool.length];
    
    await prisma.room.update({
      where: { id: room.id },
      data: { 
        images: [{ url: newImage }],
      },

    });
    console.log(`Updated room: ${room.id} -> ${newImage}`);

  }

  // Update site settings in DB as well to match content.json
  await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {
      heroImage: '/assets/Stanza%201%20-%20Foto-1.jpg',
      retreatImage: '/assets/Stanza%202%20-%20Foto-12.jpg'
    },
    create: {
      id: 'default',
      primaryColor: '#123149',
      secondaryColor: '#F2DE97',
      backgroundColor: '#F8F6F2',
      textColor: '#111111',
      fontFamily: 'var(--font-playfair)',
      heroImage: '/assets/Stanza%201%20-%20Foto-1.jpg',
      retreatImage: '/assets/Stanza%202%20-%20Foto-12.jpg'
    }
  });

  console.log('Database asset update complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
