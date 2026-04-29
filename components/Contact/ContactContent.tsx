'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Yellowtail } from "next/font/google";
import Hero from '../Home/Hero';

const yellowtail = Yellowtail({ weight: "400", subsets: ["latin"] });
interface ContactContentProps {
  lang: 'en' | 'it' | 'de';
  initialData: any;
}

export default function ContactContent({ lang, initialData }: ContactContentProps) {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const res = await fetch('/api/settings');
      return res.json();
    }
  });

  const { data } = useQuery({
    queryKey: ['content', lang, 'contact'],
    queryFn: async () => {
      const res = await fetch(`/api/content/${lang}/contact`);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <div className="bg-[#F8F6F2] min-h-screen font-playfair">
      {/* Hero Section */}
      <Hero imgUrl="/assets/Stanza%202%20-%20Foto-2.jpg" title="Marinali" subtitle="CONTACT US" lang={lang} />
    </div>
  );
}
