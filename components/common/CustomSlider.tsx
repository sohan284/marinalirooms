'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';

import { ReactNode } from 'react';

export interface SliderItem {
  id: number | string;
  image: string;
  name: string;
  location: string;
  description: string;
}

interface CustomSliderProps {
  title: string | ReactNode;
  items: SliderItem[];
  sectionId: string;
  showBookNow?: boolean;
  lang?: string;
}

export default function CustomSlider({ title, items, sectionId, showBookNow, lang = 'en' }: CustomSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <motion.section
      className="px-5"
      id={sectionId}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] }}
    >
      {/* Header Row: Title + Arrows */}
      <div
        className="mt-10 lg:mt-20 mx-auto"
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
            color: '#1a1a1a',
            margin: 0,
            textTransform: 'uppercase'
          }}
        >
          {title}
        </h2>

        {/* Navigation Arrows */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            aria-label="Previous slide"
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={isBeginning}
            style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              background: 'transparent',
              cursor: isBeginning ? 'default' : 'pointer',
              opacity: isBeginning ? 0.25 : 0.6,
              transition: 'opacity 0.3s ease',
              padding: 0,
            }}
            onMouseEnter={(e) => {
              if (!isBeginning) e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              if (!isBeginning) e.currentTarget.style.opacity = '0.6';
            }}
          >
            <svg
              width="24"
              height="12"
              viewBox="0 0 32 12"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 1L1 6L6 11" />
              <path d="M1 6H31" />
            </svg>
          </button>

          <button
            aria-label="Next slide"
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd}
            style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              background: 'transparent',
              cursor: isEnd ? 'default' : 'pointer',
              opacity: isEnd ? 0.25 : 0.6,
              transition: 'opacity 0.3s ease',
              padding: 0,
            }}
            onMouseEnter={(e) => {
              if (!isEnd) e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              if (!isEnd) e.currentTarget.style.opacity = '0.6';
            }}
          >
            <svg
              width="24"
              height="12"
              viewBox="0 0 32 12"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M26 1L31 6L26 11" />
              <path d="M1 6H31" />
            </svg>
          </button>
        </div>
      </div>

      {/* Swiper Slider */}
      <div style={{ margin: '0 auto' }}>
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          speed={600}
          className={`common-cards-slider-${sectionId}`}
          style={{ overflow: 'hidden' }}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <div style={{ cursor: 'pointer' }}>
                {/* Image */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '4 / 3',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                </div>

                {/* Card Content */}
                <div style={{ paddingTop: 'clamp(1rem, 2vw, 1.5rem)' }}>
                  {/* Item Name + Arrow */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 'clamp(0.8rem, 1.3vw, 0.95rem)',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        color: '#1a1a1a',
                        margin: 0,
                        lineHeight: 1.3,
                        textTransform: 'uppercase'
                      }}
                    >
                      {item.name}
                    </h3>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1a1a1a"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ flexShrink: 0 }}
                    >
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </div>

                  {/* Location/Subtitle */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      marginBottom: '10px',
                    }}
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#666"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span
                      style={{
                        fontSize: 'clamp(0.75rem, 1.1vw, 0.85rem)',
                        color: '#666',
                        fontWeight: 400,
                      }}
                    >
                      {item.location}
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: 'clamp(0.75rem, 1.1vw, 0.85rem)',
                      lineHeight: 1.6,
                      color: '#555',
                      fontWeight: 300,
                      margin: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      fontFamily: item.id === 'special' ? 'inherit' : 'var(--font-mono, monospace)',
                      marginBottom: showBookNow ? '16px' : '0'
                    }}
                  >
                    {item.description}
                  </p>

                  {/* Optional Book Now Button */}
                  {showBookNow && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (typeof window !== 'undefined') {
                          if (window.innerWidth < 1024) {
                            window.dispatchEvent(new CustomEvent('open-booking-drawer'));
                          } else {
                            window.dispatchEvent(new CustomEvent('ping-booking-bar'));
                          }
                        }
                      }}
                      style={{
                        padding: '12px 24px',
                        backgroundColor: '#123149',
                        color: 'white',
                        border: 'none',
                        textTransform: 'uppercase',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        letterSpacing: '0.2em',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                      }}

                    >
                      {lang === 'it' ? 'PRENOTA ORA' : lang === 'de' ? 'JETZT BUCHEN' : 'BOOK NOW'}
                    </button>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Swiper override styles */}
      <style jsx global>{`
        .common-cards-slider-${sectionId} .swiper-button-next,
        .common-cards-slider-${sectionId} .swiper-button-prev {
          display: none !important;
        }
      `}</style>
      
    </motion.section>
  );
}
