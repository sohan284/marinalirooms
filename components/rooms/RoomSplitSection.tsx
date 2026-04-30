'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, Thumbs, FreeMode } from 'swiper/modules';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useLenis } from 'lenis/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


interface RoomSplitSectionProps {
  room: {
    id: string | number;
    name: string;
    description: string;
    image: string;
    images?: string[];
    location: string;
    capacity?: string;
    amenities?: string[];
  };
  reverse?: boolean;
  lang: string;
  priority?: boolean;
  bgColor?: string;
}

export default function RoomSplitSection({ room, reverse = false, lang, priority = false, bgColor }: RoomSplitSectionProps) {
  const rawImages = room.images && room.images.length > 0 ? room.images : [];
  const allImages = rawImages.map((img: any) => typeof img === 'string' ? img : img?.url).filter(Boolean);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const [lightboxPrevEl, setLightboxPrevEl] = useState<HTMLElement | null>(null);
  const [lightboxNextEl, setLightboxNextEl] = useState<HTMLElement | null>(null);

  const lenis = useLenis();

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }

    return () => {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    };
  }, [lightboxOpen, lenis]);

  return (
    <>
      <section
        className={`w-full flex ${reverse ? 'flex-col-reverse lg:flex-row' : 'flex-col lg:flex-row'} items-stretch overflow-hidden`}
        style={{ backgroundColor: bgColor || 'var(--background)' }}
      >
        {/* Image Column — Swiper Carousel */}
        <div className={`w-full lg:w-[55%] h-[400px] lg:h-[500px] relative group ${reverse ? 'lg:order-2' : ''}`}>

          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            pagination={{ clickable: true }}
            navigation={{
              prevEl: `.prev-${room.id}`,
              nextEl: `.next-${room.id}`,
            }}
            loop={allImages.length > 1}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={1000}
            className="h-full w-full room-gallery-swiper"
          >
            {allImages.map((img, idx) => (
              <SwiperSlide key={idx} className="h-full">
                <div
                  className="relative w-full h-full cursor-zoom-in"
                  onClick={() => openLightbox(idx)}
                  title="Click to enlarge"
                >
                  <Image
                    src={img}
                    alt={`${room.name} — photo ${idx + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                    priority={priority && idx === 0}
                    loading={priority && idx === 0 ? undefined : 'lazy'}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Main Gallery Navigation Buttons */}
          <button className={`prev-${room.id} absolute left-6 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/90 backdrop-blur-md rounded-full text-background hover:text-black transition-all opacity-0 group-hover:opacity-100 hidden md:flex active:scale-90 border border-white/20`}>
            <ChevronLeft size={20} />
          </button>
          <button className={`next-${room.id} absolute right-6 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/90 backdrop-blur-md rounded-full text-background hover:text-black transition-all opacity-0 group-hover:opacity-100 hidden md:flex active:scale-90 border border-white/20`}>
            <ChevronRight size={20} />
          </button>

          <style>{`
            .room-gallery-swiper,
            .room-gallery-swiper .swiper-wrapper,
            .room-gallery-swiper .swiper-slide { height: 100% !important; }
            .room-gallery-swiper .swiper-pagination { bottom: 24px; text-align: center; width: 100%; left: 0; }
            .room-gallery-swiper .swiper-pagination-bullet { background: white; opacity: 0.4; width: 6px; height: 6px; transition: all 0.3s ease; }
            .room-gallery-swiper .swiper-pagination-bullet-active { opacity: 1; transform: scale(1.5); }
            
            .lightbox-swiper .swiper-pagination-fraction { color: black; opacity: 0.6; font-family: var(--font-mono); }
          `}</style>
        </div>

        {/* Content Column — no Book Now button here */}
        <div
          className={`w-full lg:w-[45%] flex flex-col justify-center px-8 lg:px-16 py-12 lg:py-16 ${reverse ? 'lg:order-1' : ''}`}
          style={{ backgroundColor: bgColor || 'var(--background)' }}
        >

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col h-full justify-center"
          >
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-60 mb-6 block">
              {room.location}
            </span>

            <h2 className="text-4xl lg:text-5xl font-primary mb-8 leading-tight tracking-tight text-[var(--primary-color)]">
              {room.name}
            </h2>

            <p className="text-lg leading-relaxed opacity-80 mb-4 font-light max-w-xl">
              {room.description}
            </p>

            <p className="text-xs font-mono tracking-widest opacity-40 uppercase mt-2">
              {allImages.length > 1
                ? (lang === 'it' ? `${allImages.length} foto — clicca per ingrandire` : lang === 'de' ? `${allImages.length} Fotos — zum Vergrößern klicken` : `${allImages.length} photos — click to enlarge`)
                : (lang === 'it' ? 'Clicca sulla foto per ingrandire' : lang === 'de' ? 'Klicken zum Vergrößern' : 'Click photo to enlarge')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lightbox - Casa Cook Style Modal Overlay */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 md:p-8 lg:p-12 "
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-background w-full max-w-7xl h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                className="absolute top-4 right-4 z-[220] p-2 text-black/50 hover:text-black transition-all hover:scale-110 active:scale-95 bg-white/80 rounded-full backdrop-blur-sm shadow-sm"
              >
                <X className="w-6 h-6" strokeWidth={1.5} />
              </button>

              {/* Image Area */}
              <div
                className="w-full lg:w-[50%] h-[350px] sm:h-[450px] lg:h-full flex flex-col shrink-0"
                style={{ backgroundColor: 'var(--background)' }}
              >
                <div className="flex-1 relative min-h-0">
                  <Swiper
                    modules={[Navigation, Thumbs, FreeMode]}
                    initialSlide={lightboxIndex}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    navigation={{
                      prevEl: lightboxPrevEl,
                      nextEl: lightboxNextEl,
                    }}
                    loop={true}
                    className="w-full h-full"
                    speed={800}
                    onSlideChange={(swiper) => setLightboxIndex(swiper.realIndex)}
                  >
                    {allImages.map((img, idx) => (
                      <SwiperSlide key={idx} className="flex items-center justify-center w-full h-full">
                        <div className="relative w-full h-full p-2 sm:p-4 lg:p-10">
                          <Image
                            src={img}
                            alt={`${room.name} — ${idx + 1}`}
                            fill
                            className="object-contain"
                            sizes="(max-width: 1024px) 100vw, 60vw"
                            quality={100}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Minimal Controls */}
                  <button
                    ref={setLightboxPrevEl}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-[210] p-3 text-black/40 hover:text-black transition-all cursor-pointer hidden md:block bg-white/40 hover:bg-white/80 rounded-full backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
                  </button>

                  <button
                    ref={setLightboxNextEl}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-[210] p-3 text-black/40 hover:text-black transition-all cursor-pointer hidden md:block bg-white/40 hover:bg-white/80 rounded-full backdrop-blur-sm"
                  >
                    <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
                  </button>
                </div>

                {/* Thumbnails Gallery */}
                <div className="p-4 bg-white/50 backdrop-blur-sm border-t border-gray-100">
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    modules={[FreeMode, Thumbs]}
                    spaceBetween={10}
                    slidesPerView={5}
                    freeMode={true}
                    watchSlidesProgress={true}
                    className="thumbs-swiper"
                  >
                    {allImages.map((img, idx) => (
                      <SwiperSlide key={idx} className="cursor-pointer">
                        <div className={`relative aspect-square rounded-sm overflow-hidden transition-all duration-300 ${lightboxIndex === idx ? 'ring-2 ring-primary ring-offset-2 scale-95 opacity-100' : 'opacity-40 hover:opacity-80'}`}>
                          <Image
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>

              {/* Content Area */}
              <div
                className="w-full lg:w-[50%] flex-1 lg:h-full overflow-y-auto px-5 py-6 sm:px-8 sm:py-10 lg:px-12 lg:py-16 flex flex-col border-t lg:border-t-0 lg:border-l border-gray-100 font-sans"
                data-lenis-prevent
                style={{ backgroundColor: 'var(--background)' }}
              >
                <div className="max-w-md mx-auto lg:mx-0 w-full">
                  <h2 className="text-2xl lg:text-3xl font-primary mb-6 leading-tight tracking-tight text-primary uppercase">
                    {room.name}
                  </h2>

                  <p className="text-sm lg:text-base leading-relaxed opacity-70 font-light mb-8 whitespace-pre-line">
                    {room.description}
                  </p>

                  {/* Max Capacity */}
                  <div className="pt-8 border-t border-gray-100 mb-8">
                    <span className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-60 mb-3 block font-bold">
                      {lang === 'it' ? 'CAPACITÀ MASSIMA' : lang === 'de' ? 'MAX. KAPAZITÄT' : 'MAX CAPACITY'}
                    </span>
                    <p className="text-sm font-mono opacity-80">
                      {room.capacity || (lang === 'it' ? '2 Adulti' : lang === 'de' ? '2 Erwachsene' : '2 Adults')}
                    </p>
                  </div>

                  {/* Amenities */}
                  <div className="pt-8 border-t border-gray-100">
                    <span className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-60 mb-5 block font-bold">
                      {lang === 'it' ? 'SERVIZI' : lang === 'de' ? 'AUSSTATTUNG' : 'AMENITIES'}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                      {(room.amenities || [
                        'Cable / satellite TV', 'Flat-Screen TV',
                        'Direct dial phone', 'Coffee maker',
                        'In Room Safe', 'Mini-bar (extra charge)',
                        'Non-Smoking', 'Natural bath amenities',
                        'WiFi'
                      ]).map((amenity, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-mono opacity-80">
                          <span className="text-primary/60">✓</span>
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
