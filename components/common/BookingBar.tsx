'use client';

import React, { useState, useEffect } from 'react';
import { format, addDays } from "date-fns";
import { it, de, enGB } from 'date-fns/locale';
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { X, Bed, Calendar as CalendarIcon, User, ChevronDown } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';

interface BookingBarProps {
  lang?: 'en' | 'it' | 'de';
  data?: any;
}

const BookingBar = ({ data, lang = 'en' }: BookingBarProps) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });

  const currentLocale = lang === 'it' ? it : lang === 'de' ? de : enGB;

  const [guests, setGuests] = useState("2");
  const [rooms, setRooms] = useState("1");
  const [coupon, setCoupon] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [arrivalPopoverOpen, setArrivalPopoverOpen] = useState(false);
  const [departurePopoverOpen, setDeparturePopoverOpen] = useState(false);
  const dragControls = useDragControls();

  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (drawerOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [drawerOpen, lenis]);

  useEffect(() => {
    const handleOpenDrawer = () => setDrawerOpen(true);
    window.addEventListener('open-booking-drawer', handleOpenDrawer);
    return () => window.removeEventListener('open-booking-drawer', handleOpenDrawer);
  }, []);

  const formatDateForKross = (d?: Date) => {
    if (!d) return "";
    return format(d, "yyyy-MM-dd");
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const baseUrl = "https://marinalirooms.kross.travel/book/step1";
    const successUrl = `${window.location.origin}/${lang}/thank-you`;

    const params = new URLSearchParams({
      lang: lang,
      from: formatDateForKross(date?.from),
      to: formatDateForKross(date?.to),
      rooms: rooms,
      guests: guests,
      coupon: coupon,
      url_back: successUrl
    });

    const finalUrl = `${baseUrl}?${params.toString()}`;
    window.open(finalUrl, '_blank');
    setDrawerOpen(false);
  };

  const mobileButtonText = lang === 'it' ? 'VERIFICA DISPONIBILITÀ' : lang === 'de' ? 'VERFÜGBARKEIT PRÜFEN' : 'CHECK AVAILABILITY';

  const bookingFormContent = (
    <form
      onSubmit={handleBookingSubmit}
      className="bg-secondary p-1 rounded-md flex flex-col lg:flex-row items-stretch w-full gap-1 shadow-2xl font-sans"
    >
      {/* 1. Arrival Date Picker */}
      <Popover open={arrivalPopoverOpen} onOpenChange={setArrivalPopoverOpen}>
        <PopoverTrigger
          type="button"
          className="rounded-sm flex items-center px-4 py-3 lg:py-0 flex-1 gap-3 text-gray-700 cursor-pointer hover:bg-black/5 transition-colors text-left outline-none focus:ring-2 focus:ring-primary min-h-[52px]"
          style={{ backgroundColor: 'var(--background)' }}
        >
          <CalendarIcon className="w-6 h-6 text-gray-500 shrink-0" strokeWidth={1.5} />
          <div className="flex flex-col">
            <span className="text-xs opacity-60 font-medium">{lang === 'it' ? 'Arrivo' : lang === 'de' ? 'Anreise' : 'Check-in'}</span>
            <span className="text-sm md:text-base font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
              {date?.from ? format(date.from, "d MMM yyyy", { locale: currentLocale }) : "Select"}
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start" side="top" sideOffset={10}>
          <Calendar
            mode="single"
            selected={date?.from}
            locale={currentLocale}
            onSelect={(selectedDate) => {
              if (selectedDate) {
                const newFrom = selectedDate;
                const newTo = (date?.to && date.to > newFrom) ? date.to : addDays(newFrom, 1);
                setDate({ from: newFrom, to: newTo });
                setArrivalPopoverOpen(false);
                setDeparturePopoverOpen(true);
              }
            }}
            disabled={{ before: new Date() }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* 2. Departure Date Picker */}
      <Popover open={departurePopoverOpen} onOpenChange={setDeparturePopoverOpen}>
        <PopoverTrigger
          type="button"
          className="rounded-sm flex items-center px-4 py-3 lg:py-0 flex-1 gap-3 text-gray-700 hover:bg-black/5 transition-colors text-left outline-none focus:ring-2 cursor-pointer focus:ring-primary min-h-[52px]"
          style={{ backgroundColor: 'var(--background)' }}
        >
          <CalendarIcon className="w-6 h-6 text-gray-500 shrink-0" strokeWidth={1.5} />
          <div className="flex flex-col">
            <span className="text-xs opacity-60 font-medium">{lang === 'it' ? 'Partenza' : lang === 'de' ? 'Abreise' : 'Check-out'}</span>
            <span className="text-sm md:text-base font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
              {date?.to ? format(date.to, "d MMM yyyy", { locale: currentLocale }) : "Select"}
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start" side="top" sideOffset={10}>
          <Calendar
            mode="single"
            selected={date?.to}
            locale={currentLocale}
            onSelect={(selectedDate) => {
              if (selectedDate) {
                const newTo = selectedDate;
                const newFrom = (date?.from && date.from < newTo) ? date.from : addDays(newTo, -1);
                setDate({ from: newFrom, to: newTo });
                setDeparturePopoverOpen(false);
              }
            }}
            disabled={{ before: date?.from || new Date() }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* 3. Guests & Rooms */}
      <Popover>
        <PopoverTrigger
          type="button"
          className="rounded-sm flex items-center px-4 py-3 lg:py-0 flex-[1.2] gap-3 text-gray-700 hover:bg-black/5 transition-colors text-left outline-none focus:ring-2 focus:ring-primary min-h-[52px]"
          style={{ backgroundColor: 'var(--background)' }}
        >
          <User className="w-6 h-6 text-gray-500 shrink-0" strokeWidth={1.5} />
          <span className="text-sm md:text-base font-medium flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
            {guests} {Number(guests) === 1 ? (lang === 'it' ? 'ospite' : lang === 'de' ? 'Gast' : 'guest') : (lang === 'it' ? 'ospiti' : lang === 'de' ? 'Gäste' : 'guests')} · {rooms} {Number(rooms) === 1 ? (lang === 'it' ? 'camera' : lang === 'de' ? 'Zimmer' : 'room') : (lang === 'it' ? 'camere' : lang === 'de' ? 'Zimmer' : 'rooms')}
          </span>
          <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4 flex flex-col gap-4 font-sans text-gray-800" align="end" side="top" sideOffset={10}>

          <div className="flex items-center justify-between">
            <span className="font-medium">{lang === 'it' ? 'Camere' : lang === 'de' ? 'Zimmer' : 'Rooms'}</span>
            <div className="flex items-center gap-3 border border-gray-300 rounded-md p-1">
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center text-primary text-xl leading-none hover:bg-primary/10 rounded disabled:opacity-30 transition-colors cursor-pointer"
                onClick={(e) => { e.preventDefault(); setRooms(prev => Math.max(1, parseInt(prev) - 1).toString()); }}
                disabled={parseInt(rooms) <= 1}
              >
                −
              </button>
              <span className="w-4 text-center font-semibold">{rooms}</span>
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center text-primary text-xl leading-none hover:bg-primary/10 rounded disabled:opacity-30 transition-colors cursor-pointer"
                onClick={(e) => { e.preventDefault(); setRooms(prev => Math.min(4, parseInt(prev) + 1).toString()); }}
                disabled={parseInt(rooms) >= 4}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium">{lang === 'it' ? 'Ospiti' : lang === 'de' ? 'Gäste' : 'Guests'}</span>
            <div className="flex items-center gap-3 border border-gray-300 rounded-md p-1">
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center text-primary text-xl leading-none hover:bg-primary/10 rounded disabled:opacity-30 transition-colors cursor-pointer"
                onClick={(e) => { e.preventDefault(); setGuests(prev => Math.max(1, parseInt(prev) - 1).toString()); }}
                disabled={parseInt(guests) <= 1}
              >
                −
              </button>
              <span className="w-4 text-center font-semibold">{guests}</span>
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center text-primary text-xl leading-none hover:bg-primary/10 rounded disabled:opacity-30 transition-colors cursor-pointer"
                onClick={(e) => { e.preventDefault(); setGuests(prev => Math.min(8, parseInt(prev) + 1).toString()); }}
                disabled={parseInt(guests) >= 8}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
            <span className="font-medium text-sm">{lang === 'it' ? 'Codice Promozionale' : lang === 'de' ? 'Gutscheincode' : 'Promo Code (Optional)'}</span>
            <input
              type="text"
              value={coupon}
              onChange={e => setCoupon(e.target.value)}
              placeholder={lang === 'it' ? 'Inserisci codice' : lang === 'de' ? 'Code eingeben' : 'Enter code'}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
              style={{ backgroundColor: 'var(--background)' }}
            />
          </div>

        </PopoverContent>
      </Popover>

      {/* 4. Search Button */}
      <button
        type="submit"
        className="bg-primary hover:bg-primary/90 text-background font-bold text-lg md:text-xl px-8 py-3 lg:py-0 rounded-sm transition-colors cursor-pointer outline-none min-h-[52px]"
      >
        {mobileButtonText}
      </button>
    </form>
  );

  return (
    <>
      {/* ========== DESKTOP: Floating booking bar (hidden on mobile) ========== */}
      <div className="hidden lg:flex z-40 fixed bottom-8 left-0 right-0 justify-center px-6 pointer-events-none">
        <div className="w-full max-w-5xl pointer-events-auto shadow-2xl rounded-md transition-transform  duration-300">
          {!drawerOpen && bookingFormContent}
        </div>
      </div>

      {/* ========== MOBILE: Sticky button (visible on mobile only) ========== */}
      <div className="lg:hidden z-40 w-full bg-white border-t border-gray-200 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] fixed bottom-0 left-0 right-0 p-3">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="w-full py-3 bg-primary hover:bg-primary/90 rounded-sm text-background font-bold text-base transition-colors shadow-md cursor-pointer"
        >
          {mobileButtonText}
        </button>
      </div>

      {/* ========== MOBILE DRAWER: Slides up from bottom ========== */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              drag="y"
              dragControls={dragControls}
              dragListener={false}
              dragConstraints={{ top: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.y > 100 || info.velocity.y > 500) {
                  setDrawerOpen(false);
                }
              }}
              className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-100 rounded-t-2xl shadow-2xl overflow-hidden"
              style={{ maxHeight: '92vh' }}
            >
              {/* Handle */}
              <div
                className="flex items-center justify-center pt-4 pb-2 cursor-grab active:cursor-grabbing touch-none"
                onPointerDown={(e) => dragControls.start(e)}
              >
                <div className="w-12 h-1.5 rounded-full bg-gray-400/50" />
              </div>

              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-800">{lang === 'it' ? 'Cerca' : lang === 'de' ? 'Suchen' : 'Search'}</h3>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors cursor-pointer text-gray-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(92vh - 80px)' }}>
                {bookingFormContent}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default BookingBar;
