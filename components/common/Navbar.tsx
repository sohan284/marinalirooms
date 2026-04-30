'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

import { Yellowtail } from "next/font/google";
import { useQuery } from '@tanstack/react-query';
import { useLenis } from 'lenis/react';
import BrandLogo from './BrandLogo';

const yellowtail = Yellowtail({ weight: "400", subsets: ["latin"] });

// Dictionary for 3 languages
const navData = {
  en: {
    hero: 'Hero',
    suites: 'Le Suite',
    heritage: 'Heritage',
    reviews: 'Reviews',
    map: 'Map',
    contact: 'Contact',
  },
  it: {
    hero: 'Hero',
    suites: 'Le Suite',
    heritage: 'Il Palazzetto',
    reviews: 'Recensioni',
    map: 'Mappa',
    contact: 'Contatti',
  },
  de: {
    hero: 'Hero',
    suites: 'Le Suite',
    heritage: 'Heritage',
    reviews: 'Bewertungen',
    map: 'Karte',
    contact: 'Kontakt',
  }
};

const languages = ['it', 'en', 'de'] as const;

export default function Navbar({ lang }: { lang: 'en' | 'it' | 'de' }) {
  const [scrolled, setScrolled] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const t = navData[lang];
  const pathname = usePathname();
  const isLeSuite = pathname.includes('/le-suite');

  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const res = await fetch('/api/settings');
      if (!res.ok) throw new Error('Failed to fetch settings');
      return res.json();
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowLogo(window.scrollY > 250);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const lenis = useLenis();

  const getPath = (route: string) => {
    if (route === '/') return `/${lang}`;
    return `/${lang}${route}`;
  };

  const switchLangUrl = (newLang: string) => {
    const currentRoute = pathname.replace(`/${lang}`, '');
    if (!currentRoute) return `/${newLang}`;
    return `/${newLang}${currentRoute}`;
  };

  const textColor = (scrolled || isLeSuite) ? 'text-black' : 'text-background';
  const logoLineColor = (scrolled || isLeSuite) ? 'bg-black' : 'bg-white';

  const logoContent = <BrandLogo lang={lang} variant={(scrolled || isLeSuite) ? 'dark' : 'light'} size="md" />;


  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out ${(scrolled || isLeSuite)
          ? 'bg-[var(--background)]/80 backdrop-blur-md shadow-sm py-2 pb-3'
          : 'bg-transparent py-2 md:py-4'
          }`}
      >
        <div className="container px-2 md:px-5 mx-auto flex items-center justify-between w-full relative min-h-[4rem]">

          {/* Left: Navigation Links */}
          <div className="flex-1 flex justify-start z-20">
            <nav className={`hidden md:flex items-center justify-start flex-wrap gap-x-3 gap-y-1 md:gap-x-4 md:gap-y-2 lg:gap-6 ${textColor}`}>
              {[
                { name: t.suites, path: '#le-suite' },
                { name: t.heritage, path: '#heritage' },
                { name: t.contact, path: '#contact' },
              ].map((item, idx) => (
                <Link
                  key={idx}
                  href={pathname === `/${lang}` ? item.path : `/${lang}${item.path}`}
                  onClick={(e) => {
                    if (pathname === `/${lang}`) {
                      e.preventDefault();
                      const el = document.querySelector(item.path);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                  className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:opacity-70"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Center: Logo */}
          <div className="flex-none flex justify-center z-30 mx-2 md:mx-4">
            <Link
              href={getPath('/')}
              onClick={(e) => {
                e.preventDefault();
                if (lenis) lenis.scrollTo(0);
                else window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1 transition-all duration-500 ease-in-out ${(showLogo || isLeSuite)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
            >
              {logoContent}
            </Link>
          </div>

          {/* Right: Language Switcher */}
          <div className="flex-1 flex justify-end z-20">
            <div className={`flex items-center gap-2 sm:gap-3 md:gap-4 text-base font-mono tracking-widest uppercase ${textColor}`}>
              {languages.map((l, i) => (
                <div key={l} className="flex items-center gap-2 sm:gap-3 md:gap-4">
                  <Link
                    href={switchLangUrl(l)}
                    className={`transition-all duration-300 ${lang === l ? 'font-bold opacity-100 border-b border-current' : 'opacity-40 hover:opacity-100'}`}
                  >
                    {l}
                  </Link>
                  {i < languages.length - 1 && <span className="opacity-20">|</span>}
                </div>
              ))}
            </div>
          </div>

        </div>
      </header>
    </>
  );
}
