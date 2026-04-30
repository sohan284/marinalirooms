'use client';

import Image from 'next/image';
import { Maximize2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface MapSectionProps {
  lang: 'en' | 'it' | 'de';
  mapUrl?: string;
  address?: string;
}

export default function MapSection({ lang, mapUrl, address }: MapSectionProps) {
  const defaultMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11311.238128362706!2d10.428581023773539!3d44.86608935447101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47801be6ca7f363b%3A0xc3f83737ec38a2e!2sMarinali%20Rooms!5e0!3m2!1sen!2sit!4v1709669524458!5m2!1sen!2sit";

  const getEmbedUrl = (url: string) => {
    if (!url) return defaultMapUrl;
    if (url.includes('/embed')) return url;
    return defaultMapUrl;
  };

  const displayMapUrl = getEmbedUrl(mapUrl || defaultMapUrl);

  const t = {
    en: {
      viewMap: "View Interactive Map",
      location: "Our Location",
      address: "Bassano del Grappa, Italy"
    },
    it: {
      viewMap: "Visualizza Mappa Interattiva",
      location: "La Nostra Posizione",
      address: "Bassano del Grappa, Italia"
    },
    de: {
      viewMap: "Interaktive Karte anzeigen",
      location: "Unser Standort",
      address: "Bassano del Grappa, Italien"
    }
  }[lang] || {
    en: {
      viewMap: "View Interactive Map",
      location: "Our Location",
      address: "Bassano del Grappa, Italy"
    }
  }.en;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="absolute inset-0 w-full h-full group cursor-pointer overflow-hidden">
          <Image
            src="/map.webp"
            alt="Map Placeholder"
            fill
            priority
            className="object-cover transition-transform duration-100"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-[#123149]/5 group-hover:bg-[#123149]/15 transition-colors duration-500 flex items-center justify-center">
            <div className="bg-background backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Maximize2 size={12} className="text-primary" />
              </div>
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-primary font-bold">
                {t.viewMap}
              </span>
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-[90vw] lg:max-w-[50vw] h-[75vh] p-0 overflow-hidden border-none bg-background rounded-xl shadow-[0_30px_100px_rgba(0,0,0,0.4)] flex flex-col">
        <DialogHeader className="px-10 py-6 border-b border-gray-100 flex flex-row items-center justify-between backdrop-blur-md shrink-0 space-y-0">
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase opacity-40 mb-1">
              {t.location}
            </span>
            <DialogTitle className="text-lg font-primary text-primary tracking-tight font-normal">
              {t.address}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex-1 w-full bg-gray-50 relative overflow-hidden">
          <iframe
            src={displayMapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
            title="Interactive Google Map"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
