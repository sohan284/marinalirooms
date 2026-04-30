'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import EditableText from '../common/EditableText';
import { cn } from '@/lib/utils';

interface LeSuiteBookingFooterProps {
  lang: string;
  data?: any;
  isEditable?: boolean;
}

export default function LeSuiteBookingFooter({
  lang,
  data,
  isEditable = false
}: LeSuiteBookingFooterProps) {
  const handleBookNow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 1024) {
        // Mobile: Open the booking drawer/modal
        window.dispatchEvent(new CustomEvent('open-booking-drawer'));
      } else {
        // Desktop: Trigger visual feedback on the floating booking bar
        window.dispatchEvent(new CustomEvent('ping-booking-bar'));
      }
    }
  };

  const fallbacks: Record<string, any> = {
    en: {
      label: "Ready for your stay?",
      sub: "Book directly for the best guaranteed rates.",
      btnText: "BOOK NOW"
    },
    it: {
      label: "Pronto per il tuo soggiorno?",
      sub: "Prenota direttamente per le migliori tariffe garantite.",
      btnText: "PRENOTA ORA"
    },
    de: {
      label: "Bereit für Ihren Aufenthalt?",
      sub: "Direkt buchen für die besten garantierten Preise.",
      btnText: "JETZT BUCHEN"
    }
  };

  const currentFallbacks = fallbacks[lang] || fallbacks.en;

  return (
    <section className="w-full bg-primary text-background py-20 px-5 flex flex-col items-center text-center">
      <p className="font-mono text-xs tracking-[0.3em] uppercase text-secondary mb-4">
        {isEditable ? (
          <EditableText
            lang={lang}
            page="home"
            path="bookingFooterLocation"
            initialValue={data?.bookingFooterLocation || "Marinali Rooms · Bassano del Grappa"}
          />
        ) : (
          data?.bookingFooterLocation || "Marinali Rooms · Bassano del Grappa"
        )}
      </p>

      <h2 className="text-4xl md:text-5xl font-primary mb-4 tracking-tight">
        {isEditable ? (
          <EditableText
            lang={lang}
            page="home"
            path="bookingFooterLabel"
            initialValue={data?.bookingFooterLabel || currentFallbacks.label}
          />
        ) : (
          data?.bookingFooterLabel || currentFallbacks.label
        )}
      </h2>

      <div className="text-base text-secondary font-light mb-10 max-w-md">
        {isEditable ? (
          <EditableText
            lang={lang}
            page="home"
            path="bookingFooterSub"
            initialValue={data?.bookingFooterSub || currentFallbacks.sub}
            multiline
          />
        ) : (
          data?.bookingFooterSub || currentFallbacks.sub
        )}
      </div>

      <button
        onClick={isEditable ? undefined : handleBookNow}
        className={cn(
          "group flex items-center gap-4 px-10 py-5 bg-background text-primary text-xs font-bold tracking-[0.2em] uppercase transition-all shadow-xl active:scale-95",
          !isEditable && "hover:opacity-90 hover:gap-6"
        )}
      >
        <span className="flex items-center gap-2">
          {isEditable ? (
            <EditableText
              lang={lang}
              page="home"
              path="bookingFooterBtnText"
              initialValue={data?.bookingFooterBtnText || currentFallbacks.btnText}
            />
          ) : (
            data?.bookingFooterBtnText || currentFallbacks.btnText
          )}
        </span>
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </button>
    </section>
  );
}
