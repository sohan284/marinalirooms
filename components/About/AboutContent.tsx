'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Yellowtail } from "next/font/google";

const yellowtail = Yellowtail({ weight: "400", subsets: ["latin"] });
import { useEffect, useState } from 'react';
import Hero from '../Home/Hero';
interface AboutContentProps {
  lang: 'en' | 'it' | 'de';
  initialData: any;
}

export default function AboutContent({ lang, initialData }: AboutContentProps) {
  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const res = await fetch('/api/settings');
      return res.json();
    }
  });

  const { data } = useQuery({
    queryKey: ['content', lang, 'about'],
    queryFn: async () => {
      const res = await fetch(`/api/content/${lang}/about`);
      return res.json();
    },
    initialData
  });

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll transformations
  const scale = Math.max(1 - scrollY / 500, 0.2);
  const opacity = Math.max(1 - scrollY / 400, 0);
  const translateY = -scrollY * 0.3;
  const bgTranslateY = scrollY * 0.2;

  const primaryColor = settings?.primaryColor || '#123149';

  return (
    <div className="bg-[#F8F6F2] min-h-screen font-playfair">
      {/* Hero Section */}
      <section className="-mt-24 relative h-[85vh] w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{ transform: `translateY(${bgTranslateY}px)` }}
        >
          <Image
            src="/assets/Stanza%203%20-%20Foto-15.jpg"
            alt="Palazzo Marinali Hero"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>

        {/* Main Content */}
        <Hero imgUrl="/assets/Stanza%203%20-%20Foto-15.jpg" title="Marinali" subtitle="ABOUT US" lang={lang} />
      </section>

      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-gray-100 py-6 px-4 md:px-12 flex justify-between items-center text-[10px] tracking-[0.2em] font-bold uppercase text-gray-400">
        <div className="flex gap-4">
          <Link href={`/${lang}`} className="hover:text-black transition-colors">{lang === 'en' ? 'HOME' : lang === 'it' ? 'CASA' : 'STARTSEITE'}</Link>
          <span>/</span>
          <span className="text-black">{lang === 'en' ? 'ABOUT US' : lang === 'it' ? 'CHI SIAMO' : 'ÜBER UNS'}</span>
        </div>
        <div className="hidden md:flex gap-8">
          <span>{lang === 'en' ? 'HISTORY' : lang === 'it' ? 'STORIA' : 'GESCHICHTE'}</span>
          <span>{lang === 'en' ? 'CONCEPT' : lang === 'it' ? 'CONCETTO' : 'KONZEPT'}</span>
          <span>{lang === 'en' ? 'PHILOSOPHY' : lang === 'it' ? 'FILOSOFIA' : 'PHILOSOPHIE'}</span>
        </div>
      </div>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-4 py-24 md:py-32">
        <div className="text-center mb-20">
          <div className="text-3xl md:text-5xl font-bold leading-tight max-w-4xl mx-auto mb-16">
            {data?.storyTitle}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 text-gray-600 leading-relaxed text-lg italic">
          <div>{data?.storyDescription}</div>
          <div>{data?.storyDetails}</div>
        </div>
      </section>

      {/* Gallery Marquee Section */}
      <section className="py-24 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#F8F6F2] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#F8F6F2] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-4"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          style={{ width: "max-content", display: "flex" }}
        >
          {[
            'Stanza%201%20-%20Foto-1.jpg',
            'Stanza%202%20-%20Foto-1.jpg',
            'Stanza%203%20-%20Foto-1.jpg',
            'Stanza%201%20-%20Foto-4.jpg',
            'Stanza%202%20-%20Foto-11.jpg',
            'Stanza%203%20-%20Foto-13.jpg',
          ].concat([
            'Stanza%201%20-%20Foto-1.jpg',
            'Stanza%202%20-%20Foto-1.jpg',
            'Stanza%203%20-%20Foto-1.jpg',
            'Stanza%201%20-%20Foto-4.jpg',
            'Stanza%202%20-%20Foto-11.jpg',
            'Stanza%203%20-%20Foto-13.jpg',
          ]).map((img, i) => (
            <div key={i} className="relative w-[200px] md:w-[300px] aspect-[3/4] overflow-hidden group flex-shrink-0">
              <Image
                src={`/assets/${img}`}
                alt={`Gallery image ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700"
              />
            </div>
          ))}
        </motion.div>
      </section>

      {/* Palazzo Section */}
      <section className="grid md:grid-cols-2 items-center mb-24 md:mb-0">
        <div className="relative h-[600px] md:h-[800px]">
          <Image
            src="/assets/Stanza%202%20-%20Foto-17.jpg"
            alt="Palazzo Architecture"
            fill
            className="object-cover"
          />
        </div>
        <div className="bg-white h-full flex flex-col justify-center px-8 md:px-24 py-20">
          <div className="text-4xl md:text-6xl font-bold mb-8 uppercase tracking-tighter">
            {data?.conceptTitle}
          </div>
          <div className="text-lg text-gray-500 leading-relaxed italic">
            {data?.conceptDescription}
          </div>
        </div>
      </section>

      {/* Hospitality Section */}
      <section className="grid md:grid-cols-2 items-center">
        <div className="bg-[#123149] text-background h-full flex flex-col justify-center px-8 md:px-24 py-20 order-2 md:order-1" style={{ backgroundColor: primaryColor }}>
          <div className="text-4xl md:text-6xl font-bold mb-8 uppercase tracking-tighter">
            {data?.hospitalityTitle}
          </div>
          <div className="text-lg opacity-80 leading-relaxed italic">
            {data?.hospitalityDescription}
          </div>
        </div>
        <div className="relative h-[600px] md:h-[800px] order-1 md:order-2">
          <Image
            src="/assets/Stanza%203%20-%20Foto-25.jpg"
            alt="Hospitality"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative h-[600px] flex items-center justify-center text-center px-4 overflow-hidden">
        <Image
          src="/assets/Stanza%201%20-%20Foto-22.jpg"
          alt="CTA Background"
          fill
          className="object-cover brightness-75 scale-110"
        />
        <div className="relative z-10 max-w-2xl bg-white/10 backdrop-blur-md p-12 text-background border border-white/20">
          <div className="text-5xl font-bold mb-6 tracking-tight">
            {data?.ctaTitle}
          </div>
          <div className="text-xl mb-10 block italic font-light">
            {data?.ctaDescription}
          </div>
          {/* <Link
            href={`/${lang}/rooms`}
            className="inline-block px-10 py-5 bg-white text-black text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-black hover:text-background transition-all duration-300"
          >
            {lang === 'en' ? 'EXPLORE ROOMS' : lang === 'it' ? 'ESPLORA CAMERE' : 'ZIMMER ENTDECKEN'}
          </Link> */}
        </div>
      </section>
    </div>
  );
}
