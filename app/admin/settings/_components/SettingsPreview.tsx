"use client";

import React from "react";
import { ThemeSettings, FooterConfig } from "./types";
import { Eye, X, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// Import real components for an exact preview
import Hero from "@/components/Home/Hero";
import IntroSection from "@/components/Home/IntroSection";
import HeritageSection from "@/components/Home/HeritageSection";
import ReviewSlider from "@/components/Home/ReviewSlider";
import LeSuiteHeader from "@/components/rooms/LeSuiteHeader";
import LeSuiteBookingFooter from "@/components/rooms/LeSuiteBookingFooter";
import RoomSplitSection from "@/components/rooms/RoomSplitSection";
import Footer from "@/components/common/Footer";

interface SettingsPreviewProps {
  formData: ThemeSettings;
  fc: FooterConfig;
  showPreviewDrawer: boolean;
  setShowPreviewDrawer: (show: boolean) => void;
}

export function SettingsPreview({
  formData,
  fc,
  showPreviewDrawer,
  setShowPreviewDrawer,
}: SettingsPreviewProps) {
  // Fetch actual home content for the preview
  const { data: homeContent, isLoading } = useQuery({
    queryKey: ["content", "en", "home"],
    queryFn: async () => {
      const res = await fetch("/api/content/en/home");
      if (!res.ok) throw new Error("Failed to fetch content");
      return res.json();
    }
  });

  // Fetch rooms data
  const { data: roomsData, isLoading: roomsLoading } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const res = await fetch("/api/rooms");
      if (!res.ok) throw new Error("Failed to fetch rooms");
      return res.json();
    }
  });

  const data = homeContent?.sections || {};
  const rooms = (roomsData || []).map((room: any) => ({
    id: room.slug,
    images: room.images,
    ...room.translations.en
  }));

  const renderPreviewContent = () => {
    if (isLoading || roomsLoading) {
      return (
        <div className="flex-1 flex items-center justify-center p-20">
          <Loader2 className="animate-spin text-slate-300" size={40} />
        </div>
      );
    }

    return (
      <div
        className="flex flex-col"
        style={{
          width: '100%',
          zoom: 0.4,
          // Support for browsers that don't like zoom (Firefox)
          MozTransform: 'scale(0.4)',
          MozTransformOrigin: 'top left'
        }}
      >
        <Hero
          lang="en"
          data={data}
          isEditable={false}
        />



        <LeSuiteHeader
          lang="en"
          data={data}
          isEditable={false}
        />

        <div style={{ backgroundColor: formData.backgroundColor }}>
          {rooms.map((room: any, index: number) => (
            <RoomSplitSection
              key={room.id}
              room={room}
              reverse={index % 2 !== 0}
              lang="en"
              priority={index === 0}
              bgColor={formData.backgroundColor}
            />
          ))}
        </div>

        <LeSuiteBookingFooter
          lang="en"
          data={data}
          isEditable={false}
        />
        <div style={{ backgroundColor: formData.backgroundColor }}>
          <IntroSection
            lang="en"
            data={data}
            isEditable={false}
          >
            <HeritageSection
              lang="en"
              data={data}
              isEditable={false}
            />
          </IntroSection>
        </div>
        <ReviewSlider
          lang="en"
          data={data}
        />

        <Footer 
          lang="en"
          address={fc.address}
          phone={fc.phone}
          email={fc.email}
          whatsapp={fc.whatsapp}
          mapUrl={fc.mapUrl}
          copyright={fc.copyright}
          columns={fc.columns}
          bottomLinks={fc.bottomLinks}
        />
      </div>
    );
  };

  // Create a style object that overrides CSS variables for the preview container
  const themeStyles = {
    "--primary-color": formData.primaryColor,
    "--secondary-color": formData.secondaryColor,
    "--background-color": formData.backgroundColor,
    "--foreground": formData.textColor,
    "--font-serif": formData.fontFamily.includes("playfair") ? "var(--font-playfair)" : "serif",
    "backgroundColor": formData.backgroundColor,
    "color": formData.textColor,
    "fontFamily": formData.fontFamily
  } as React.CSSProperties;

  return (
    <>
      {/* Right Column: Live Preview Pane — Desktop only */}
      <div className="hidden lg:block w-[480px] xl:w-[560px] flex-shrink-0 h-full border-l border-gray-200">
        <div className="flex flex-col h-full bg-slate-100 relative shadow-inner overflow-hidden">
          <div
            className="flex-1 flex flex-col overflow-y-auto transition-colors duration-500 relative scrollbar-hide"
            style={themeStyles}
          >
            {renderPreviewContent()}
          </div>
        </div>
      </div>

      {/* Mobile: Floating Eye Button */}
      <button
        type="button"
        onClick={() => setShowPreviewDrawer(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        style={{ backgroundColor: formData.primaryColor, color: '#fff' }}
      >
        <Eye size={22} />
      </button>

      {/* Mobile: Bottom Drawer Overlay */}
      {showPreviewDrawer && (
        <div className="lg:hidden fixed inset-0 z-[100]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setShowPreviewDrawer(false)}
          />
          {/* Drawer */}
          <div className="absolute bottom-0 left-0 right-0 h-[85vh] bg-white rounded-t-2xl shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-300 overflow-hidden">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Eye size={16} className="text-gray-500" />
                <span className="text-sm font-semibold text-gray-700">Live Preview</span>
              </div>
              <button
                type="button"
                onClick={() => setShowPreviewDrawer(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X size={16} className="text-gray-600" />
              </button>
            </div>
            {/* Drawer Content */}
            <div
              className="flex-1 flex flex-col overflow-y-auto scrollbar-hide"
              style={themeStyles}
            >
              {renderPreviewContent()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
