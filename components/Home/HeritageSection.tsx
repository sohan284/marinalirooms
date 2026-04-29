"use client";

import Image from "next/image";
import EditableText from "../common/EditableText";
import EditableImage from "../common/EditableImage";

interface HeritageSectionProps {
  data: any;
  lang: string;
  isEditable?: boolean;
}

export default function HeritageSection({ data, lang, isEditable = false }: HeritageSectionProps) {
  const frescoImg = data?.frescoImage || "/assets/Stanza%201%20-%20Foto-5.jpg";
  const terrazzoImg = data?.terrazzoImage || "/assets/Stanza%202%20-%20Foto-3.jpg";

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 md:py-10 mt-8 md:mt-0 ${isEditable ? 'px-6 md:px-12 pb-20' : ''}`}>
      {/* Fresco Block */}
      <div className="flex flex-col h-full">
        <div className="space-y-4 mb-8">
          <h3 className="text-xl uppercase tracking-widest font-light text-[#1A1A1A]">
            {isEditable ? (
              <EditableText lang={lang} page="home" path="frescoTitle" initialValue={data?.frescoTitle || "The 1460 Fresco"} />
            ) : (
              data?.frescoTitle || "The 1460 Fresco"
            )}
          </h3>
          <div className="opacity-70 font-light leading-relaxed text-[15px] text-[#555] font-mono">
            {isEditable ? (
              <EditableText lang={lang} page="home" path="frescoDescription" initialValue={data?.frescoDescription || "Discovered during restoration..."} multiline />
            ) : (
              data?.frescoDescription || "Discovered during restoration..."
            )}
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden mt-auto group">
          <Image
            src={frescoImg}
            alt="The original 1460 fresco"
            fill
            className="object-cover  transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
          />
          {isEditable && (
            <EditableImage
              lang={lang}
              page="home"
              path="frescoImage"
              currentValue={frescoImg}
              className="absolute inset-0 z-20"
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 z-10">
            <span className="text-background text-xs font-mono tracking-[0.25em] uppercase opacity-80">
              {isEditable ? (
                <EditableText lang={lang} page="home" path="frescoLabel" initialValue={data?.frescoLabel || "The 1460 Fresco"} />
              ) : (
                data?.frescoLabel || "The 1460 Fresco"
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Terrazzo Block */}
      <div className="flex flex-col h-full">
        <div className="space-y-4 mb-8">
          <h3 className="text-xl uppercase tracking-widest font-light text-[#1A1A1A]">
            {isEditable ? (
              <EditableText lang={lang} page="home" path="terrazzoTitle" initialValue={data?.terrazzoTitle || "Venetian Terrazzo Floors"} />
            ) : (
              data?.terrazzoTitle || "Venetian Terrazzo Floors"
            )}
          </h3>
          <div className="opacity-70 font-light leading-relaxed text-[15px] text-[#555] font-mono">
            {isEditable ? (
              <EditableText lang={lang} page="home" path="terrazzoDescription" initialValue={data?.terrazzoDescription || "Step onto history..."} multiline />
            ) : (
              data?.terrazzoDescription || "Step onto history..."
            )}
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden mt-auto group">
          <Image
            src={terrazzoImg}
            alt="Venetian Terrazzo floors"
            fill
            className="object-cover  transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
          />
          {isEditable && (
            <EditableImage
              lang={lang}
              page="home"
              path="terrazzoImage"
              currentValue={terrazzoImg}
              className="absolute inset-0 z-20"
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 z-10">
            <span className="text-background text-xs font-mono tracking-[0.25em] uppercase opacity-80">
              {isEditable ? (
                <EditableText lang={lang} page="home" path="terrazzoLabel" initialValue={data?.terrazzoLabel || "Venetian Terrazzo Floors"} />
              ) : (
                data?.terrazzoLabel || "Venetian Terrazzo Floors"
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
