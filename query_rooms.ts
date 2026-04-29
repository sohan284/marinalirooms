import prisma from './lib/prisma';

async function main() {
  const rooms = await prisma.room.findMany();
  console.log(JSON.stringify(rooms, null, 2));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
