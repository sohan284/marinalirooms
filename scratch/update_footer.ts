import prisma from '../lib/prisma';


const NEW_FOOTER_CONFIG = {
  en: {
    columns: [],
    socialLinks: [
      { icon: "instagram", url: "https://instagram.com/marinalirooms" },
      { icon: "facebook", url: "https://facebook.com/marinalirooms" },
    ],
    copyright: "© 2026 Marinali Rooms. All rights reserved.",
    bottomLinks: [
      { label: "Privacy Policy", url: "#" },
      { label: "Cookie Policy", url: "#" },
    ],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2778.675046274438!2d11.7335!3d45.7667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4778d65565555555%3A0x5555555555555555!2sVia%20Marinali%2C%2036061%20Bassano%20del%20Grappa%20VI!5e0!3m2!1sen!2sit!4v1713535000000!5m2!1sen!2sit",
    address: "Via Marinali, 10\n36061 Bassano del Grappa VI, Italy",
    phone: "+39 0424 123456",
    email: "info@marinalirooms.it",
    whatsapp: "+390424123456",
  },
  it: {
    columns: [],
    socialLinks: [
      { icon: "instagram", url: "https://instagram.com/marinalirooms" },
      { icon: "facebook", url: "https://facebook.com/marinalirooms" },
    ],
    copyright: "© 2026 Marinali Rooms. Tutti i diritti riservati.",
    bottomLinks: [
      { label: "Privacy Policy", url: "#" },
      { label: "Cookie Policy", url: "#" },
    ],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2778.675046274438!2d11.7335!3d45.7667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4778d65565555555%3A0x5555555555555555!2sVia%20Marinali%2C%2036061%20Bassano%20del%20Grappa%20VI!5e0!3m2!1sen!2sit!4v1713535000000!5m2!1sen!2sit",
    address: "Via Marinali, 10\n36061 Bassano del Grappa VI, Italia",
    phone: "+39 0424 123456",
    email: "info@marinalirooms.it",
    whatsapp: "+390424123456",
  },
  de: {
    columns: [],
    socialLinks: [
      { icon: "instagram", url: "https://instagram.com/marinalirooms" },
      { icon: "facebook", url: "https://facebook.com/marinalirooms" },
    ],
    copyright: "© 2026 Marinali Rooms. Alle Rechte vorbehalten.",
    bottomLinks: [
      { label: "Datenschutz", url: "#" },
      { label: "Cookie-Richtlinie", url: "#" },
    ],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2778.675046274438!2d11.7335!3d45.7667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4778d65565555555%3A0x5555555555555555!2sVia%20Marinali%2C%2036061%20Bassano%20del%20Grappa%20VI!5e0!3m2!1sen!2sit!4v1713535000000!5m2!1sen!2sit",
    address: "Via Marinali, 10\n36061 Bassano del Grappa VI, Italien",
    phone: "+39 0424 123456",
    email: "info@marinalirooms.it",
    whatsapp: "+390424123456",
  },
};

async function main() {
  console.log('Updating site settings with new footer config...');
  await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {
      footerConfig: NEW_FOOTER_CONFIG,
    },
    create: {
      id: 'default',
      primaryColor: '#123149',
      secondaryColor: '#F2DE97',
      backgroundColor: '#F8F6F2',
      textColor: '#111111',
      fontFamily: 'var(--font-playfair)',
      footerConfig: NEW_FOOTER_CONFIG,
    },
  });
  console.log('Successfully updated site settings.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
