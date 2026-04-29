"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '../ui/skeleton';
import EditableText from '../common/EditableText';

interface HighlightRoom {
  id: string;
  image: string;
  name: string;
  description: string;
  isLargeHighlight: boolean;
}

export default function Highlights({ lang, data, isEditable = false }: { lang: string; data?: any; isEditable?: boolean }) {
  const { data: rooms = [], isLoading } = useQuery<HighlightRoom[]>({
    queryKey: ["rooms", "highlights", lang],
    queryFn: async () => {
      const response = await fetch(`/api/rooms?lang=${lang}&isHighlight=true`);
      if (!response.ok) throw new Error("Failed to fetch highlights");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-5 py-10">
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  // Hide section if no highlights are selected
  if (rooms.length === 0) return null;

  return (
    <motion.section
      id="highlights-section"
      className="px-5"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] }}
    >
      <div className="max-w-screen-2xl mx-auto mt-10 lg:mt-20">
        <h2
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
            color: '#1a1a1a',
            marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
            textTransform: 'uppercase'
          }}
        >
          {isEditable ? (
            <EditableText lang={lang} page="home" path="highlightsTitle" initialValue={data?.highlightsTitle || "HIGHLIGHTS"} />
          ) : (
            data?.highlightsTitle || "HIGHLIGHTS"
          )}
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
          }}
          className="highlights-grid"
        >
          {rooms.map((item) => (
            <div
              key={item.id}
              style={{
                gridColumn: item.isLargeHighlight ? 'span 2' : 'span 1',
                display: 'flex',
                flexDirection: 'column'
              }}
              className={item.isLargeHighlight ? 'col-span-4 lg:col-span-2' : 'col-span-4 lg:col-span-1'}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: item.isLargeHighlight ? '1 / 1' : '4 / 5',
                  overflow: 'hidden',
                  marginBottom: '20px'
                }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes={item.isLargeHighlight ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 25vw"}
                  style={{
                    objectFit: 'cover',
                  }}
                />
              </div>

              <div style={{ paddingRight: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
                  <h3
                    style={{
                      fontSize: 'clamp(0.9rem, 1.5vw, 1.15rem)',
                      fontWeight: 700,
                      lineHeight: 1.25,
                      color: '#1a1a1a',
                      margin: 0,
                      textTransform: 'uppercase'
                    }}
                  >
                    {item.name}
                  </h3>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1a1a1a"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flexShrink: 0, marginTop: '2px' }}
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </div>

                <p
                  style={{
                    fontSize: 'clamp(0.75rem, 1.1vw, 0.85rem)',
                    lineHeight: 1.7,
                    color: '#555',
                    fontWeight: 300,
                    margin: 0,
                    fontFamily: 'var(--font-mono, monospace)',
                  }}
                >
                  {item.description}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const successUrl = `${window.location.origin}/${lang}/thank-you`;
                    window.open(`https://marinalirooms.kross.travel/book/step1?lang=${lang}&url_back=${encodeURIComponent(successUrl)}`, '_blank');
                  }}
                  style={{
                    padding: '12px 24px',
                    marginTop: '20px',
                    backgroundColor: '#123149',
                    color: 'white',
                    border: 'none',
                    textTransform: 'uppercase',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    letterSpacing: '0.2em',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    width: 'fit-content'
                  }}
                >
                  {lang === 'it' ? 'PRENOTA ORA' : lang === 'de' ? 'JETZT BUCHEN' : 'BOOK NOW'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .highlights-grid {
            display: flex !important;
            flex-direction: column;
            gap: 40px !important;
          }
        }
      `}</style>
    </motion.section>
  );
}
