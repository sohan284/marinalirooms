'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface ThankYouPageContentProps {
  lang: string;
  data: {
    thankYou: {
      title: string;
      subtitle: string;
      message: string;
      returnHome: string;
      contactUs: string;
    };
  };
}

export default function ThankYouPageContent({ lang, data }: ThankYouPageContentProps) {
  const content = data.thankYou;

  return (
    <div className="container mx-auto px-5 py-20 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-primary"
      >
        <CheckCircle2 size={80} strokeWidth={1} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl font-primary mb-4"
        style={{ color: 'var(--primary-color)' }}
      >
        {content.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-sm md:text-base font-mono tracking-[0.2em] mb-10 opacity-70 uppercase"
      >
        {content.subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-2xl mb-12"
      >
        <p className="text-lg md:text-xl leading-relaxed opacity-80">
          {content.message}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link
          href={`/${lang}`}
          className="px-10 py-5 bg-primary text-background font-bold tracking-[0.2em] text-xs uppercase hover:bg-primary/90 transition-all shadow-xl"
        >
          {content.returnHome}
        </Link>
        <Link
          href={`/${lang}/contact`}
          className="px-10 py-5 border border-primary text-primary font-bold tracking-[0.2em] text-xs uppercase hover:bg-primary/5 transition-all"
        >
          {content.contactUs}
        </Link>
      </motion.div>

      {/* Google Ads Conversion Tracking Placeholder */}
      <div id="google-ads-tracking" className="hidden">
        {/*
          Example:
          window.gtag('event', 'conversion', {
            'send_to': 'AW-XXXXXXXXX/YYYYYYYYYYYYYY',
            'value': 1.0,
            'currency': 'EUR',
            'transaction_id': ''
          });
        */}
      </div>
    </div>
  );
}
