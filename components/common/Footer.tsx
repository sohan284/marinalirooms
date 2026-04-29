'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Yellowtail } from "next/font/google";
import { Loader2 } from 'lucide-react';
import MapSection from './MapSection';

const yellowtail = Yellowtail({ weight: "400", subsets: ["latin"] });

// MapComponent is now handled by MapSection

const staticContent = {
  en: {
    infoTitle: "GET IN TOUCH",
    address: "Piazza dell Unita', 1\n40128 Bologna, Italy",
    phone: "+39 123 456 7890",
    email: "info@marinalirooms.com",
    formTitle: "SEND US A MESSAGE",
    nameLabel: "NAME",
    emailLabel: "EMAIL",
    messageLabel: "MESSAGE",
    submitButton: "SEND INQUIRY",
    successMsg: "Thank you for your message. We will get back to you shortly.",
    follow: "Follow our journey",
    privacy: "Privacy Policy",
    cookie: "Cookie Policy",
    rights: "All rights reserved",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11311.238128362706!2d10.428581023773539!3d44.86608935447101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47801be6ca7f363b%3A0xc3f83737ec38a2e!2sMarinali%20Rooms!5e0!3m2!1sen!2sit!4v1709669524458!5m2!1sen!2sit",
  },
  it: {
    infoTitle: "CONTATTACI",
    address: "Piazza dell Unita', 1\n40128 Bologna, Italia",
    phone: "+39 123 456 7890",
    email: "info@marinalirooms.com",
    formTitle: "INVIACI UN MESSAGGIO",
    nameLabel: "NOME",
    emailLabel: "EMAIL",
    messageLabel: "MESSAGGIO",
    submitButton: "INVIA RICHIESTA",
    successMsg: "Grazie per il tuo messaggio. Ti risponderemo a breve.",
    follow: "Segui il nostro viaggio",
    privacy: "Privacy Policy",
    cookie: "Cookie Policy",
    rights: "Tutti i diritti riservati",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11311.238128362706!2d10.428581023773539!3d44.86608935447101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47801be6ca7f363b%3A0xc3f83737ec38a2e!2sMarinali%20Rooms!5e0!3m2!1sen!2sit!4v1709669524458!5m2!1sen!2sit",
  },
  de: {
    infoTitle: "KONTAKTIEREN SIE UNS",
    address: "Piazza dell Unita', 1\n40128 Bologna, Italien",
    phone: "+39 123 456 7890",
    email: "info@marinalirooms.com",
    formTitle: "SENDEN SIE UNS EINE NACHRICHT",
    nameLabel: "NAME",
    emailLabel: "E-MAIL",
    messageLabel: "NACHRICHT",
    submitButton: "ANFRAGE SENDEN",
    successMsg: "Vielen Dank für Ihre Nachricht. Wir werden uns in Kürze bei Ihnen melden.",
    follow: "Folgen Sie unserer Reise",
    privacy: "Datenschutzerklärung",
    cookie: "Cookie-Richtlinie",
    rights: "Alle Rechte vorbehalten",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11311.238128362706!2d10.428581023773539!3d44.86608935447101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47801be6ca7f363b%3A0xc3f83737ec38a2e!2sMarinali%20Rooms!5e0!3m2!1sen!2sit!4v1709669524458!5m2!1sen!2sit",
  }
};

interface FooterProps {
  lang: 'en' | 'it' | 'de';
  address?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  mapUrl?: string;
  copyright?: string;
  columns?: any[];
  bottomLinks?: any[];
}

export default function Footer({ lang, address, phone, email, whatsapp, mapUrl, copyright, columns, bottomLinks }: FooterProps) {
  const t = staticContent[lang] || staticContent.en;

  const displayAddress = address || t.address;
  const displayPhone = phone || t.phone;
  const displayEmail = email || t.email;
  const displayWhatsapp = whatsapp || '+391234567890';
  const displayMapUrl = mapUrl || t.mapUrl;
  const displayCopyright = copyright || `© ${new Date().getFullYear()} Marinali Rooms. ${t.rights}.`;

  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(displayAddress)}`;
  const whatsappUrl = `https://wa.me/${displayWhatsapp.replace(/[^0-9]/g, '')}`;

  return (
    <footer
      id="main-footer"
      className="font-playfair w-full relative z-30 flex flex-col text-white"
      style={{ backgroundColor: 'var(--primary-color)' }}
    >
      {/* Main Content Grid */}
      <section className="grid lg:grid-cols-2">
        {/* Left Side: Centered Contact Info */}
        <div id="contact" 
          className="p-8 md:p-16 flex flex-col items-center justify-center text-center text-primary"
          style={{ backgroundColor: 'var(--background)' }}
        >
          <div className="max-w-xl w-full">
            <span className="text-xl lg:text-2xl tracking-[0.3em] font-bold text-primary mb-8 block uppercase">
              {t.infoTitle}
            </span>

            <div className="space-y-6 text-base font-medium">
              {/* Address */}
              <a
                href={mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-70 transition-opacity whitespace-pre-line group"
              >
                <span className="border-b border-transparent group-hover:border-primary/30 pb-1">
                  {displayAddress}
                </span>
              </a>

              <div className="flex flex-col items-center gap-4 pt-4">
                {/* Phone */}
                <a
                  href={`tel:${displayPhone.replace(/\s+/g, '')}`}
                  className="hover:opacity-70 transition-opacity border-b border-transparent hover:border-primary/30 pb-1"
                >
                  {displayPhone}
                </a>

                {/* WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-70 transition-opacity border-b border-transparent hover:border-primary/30 pb-1"
                >
                  <svg className="w-4 h-4 fill-primary" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  WhatsApp
                </a>

                {/* Email */}
                <a
                  href={`mailto:${displayEmail}`}
                  className="hover:opacity-70 transition-opacity border-b border-transparent hover:border-primary/30 pb-1"
                >
                  {displayEmail}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Map Section with Lightbox */}
        <div id="map" className="relative min-h-[500px] lg:min-h-full overflow-hidden bg-gray-100 z-10">
          <MapSection lang={lang} mapUrl={displayMapUrl} address={displayAddress} />
        </div>
      </section>

      {/* Navigation Footer for Contact */}
      <div className="pt-10 pb-36 px-4 text-center mt-auto" style={{ backgroundColor: 'var(--primary-color)' }}>
        <Link href={`/${lang}`} className="relative z-10 flex flex-col items-center justify-center text-background my-8 group cursor-pointer hover:opacity-80 transition-opacity">
          <h1 className={`${yellowtail.className} text-4xl md:text-5xl tracking-wide mb-1 group-hover:scale-105 transition-transform duration-500`}>
            Marinali
          </h1>
          <div className="flex items-center gap-3 mt-1">
            <div className="w-10 h-px bg-white opacity-80"></div>
            <span className={`${yellowtail.className} text-xl md:text-2xl tracking-wide opacity-100`}>
              Rooms
            </span>
            <div className="w-10 h-px bg-white opacity-80"></div>
          </div>
          <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-light opacity-70 mt-2">
            Bassano del Grappa
          </span>
        </Link>
        {/* Bottom copyright info preserved from original footer */}
        <div className="max-w-4xl mx-auto border-t border-white/20 pt-6 text-xs font-mono opacity-80 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4">
            <Link href={`/${lang}/privacy-policy`} className="hover:underline">{t.privacy}</Link>
            <Link href={`/${lang}/cookie-policy`} className="hover:underline">{t.cookie}</Link>
          </div>
          <div>{displayCopyright}</div>
        </div>
      </div>
    </footer>
  );
};

