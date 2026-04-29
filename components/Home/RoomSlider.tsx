'use client';

import { useQuery } from '@tanstack/react-query';
import CustomSlider, { SliderItem } from '../common/CustomSlider';

const defaultRooms: SliderItem[] = [
  {
    id: 1,
    image: '/assets/Stanza%201%20-%20Foto-1.jpg',
    name: 'JUNIOR SUITE',
    location: 'Bassano del Grappa',
    description:
      'A sanctuary of light and history, featuring original frescoes and bespoke Italian craftsmanship in an intimate setting.',
  },
  {
    id: 2,
    image: '/assets/Stanza%202%20-%20Foto-1.jpg',
    name: 'SUITE DELUXE',
    location: 'Bassano del Grappa',
    description:
      'Unparalleled elegance spanning historic walls, with Venetian terrazzo floors and panoramic views of the historic center.',
  },
];

export default function RoomSlider({ lang, data }: { lang: string; data?: any }) {
  const { data: rooms = defaultRooms } = useQuery<SliderItem[]>({
    queryKey: ['rooms', lang],
    queryFn: async () => {
      const response = await fetch(`/api/rooms`);
      if (!response.ok) throw new Error('Failed to fetch rooms');
      const dbRooms = await response.json();
      
      if (dbRooms && dbRooms.length > 0) {
        return dbRooms.flatMap((room: any) => {
          const t = room.translations?.[lang] || room.translations?.['en'] || {};
          const allImages = Array.isArray(room.images) ? room.images : [];
          
          if (allImages.length === 0) return []; // Skip room if no images

          return allImages.map((img: any, idx: number) => ({
            id: `${room.id}-gal-${idx}`,
            image: typeof img === 'string' ? img : img?.url,
            name: t.name || room.slug,
            location: t.location || '',
            description: t.description || '',
          })).filter((item: any) => item.image);
        });
      }
      return defaultRooms;
    },
  });

  return (
    <CustomSlider 
      title={data?.roomsTitle || "ROOMS"} 
      items={rooms} 
      sectionId="room-slider" 
      showBookNow={true}
      lang={lang}
    />
  );
}
