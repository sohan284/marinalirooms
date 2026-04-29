'use client';

import { Yellowtail } from "next/font/google";
const yellowtail = Yellowtail({ weight: "400", subsets: ["latin"] });

interface BrandLogoProps {
  lang: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark';
}

export default function BrandLogo({ lang, size = 'md', variant = 'light' }: BrandLogoProps) {
  const title = "Marinali";
  const subtitle = "Rooms";
  const location = "Bassano del Grappa";

  const textColor = variant === 'light' ? 'text-background' : 'text-[#123149]';
  const lineColor = variant === 'light' ? 'bg-white' : 'bg-[#123149]';

  // Scale based on size prop
  const styles = {
    sm: {
      title: "text-2xl md:text-3xl",
      subtitle: "text-lg md:text-xl",
      location: "text-[6px] md:text-[7px]",
      gap: "gap-2",
      lineWidth: "w-6",
      margin: "mb-0"
    },
    md: {
      title: "text-3xl md:text-4xl",
      subtitle: "text-xl md:text-2xl",
      location: "text-[7px] md:text-[8px]",
      gap: "gap-3",
      lineWidth: "w-8",
      margin: "mb-1"
    },
    lg: {
      title: "text-4xl md:text-5xl",
      subtitle: "text-2xl md:text-3xl",
      location: "text-[8px] md:text-[9px]",
      gap: "gap-4",
      lineWidth: "w-10",
      margin: "mb-2"
    },
    xl: {
      title: "text-6xl md:text-8xl",
      subtitle: "text-3xl md:text-4xl",
      location: "text-[10px] md:text-[12px]",
      gap: "gap-6",
      lineWidth: "w-16",
      margin: "mb-4"
    }
  };

  const s = styles[size];

  return (
    <div className={`flex flex-col items-center justify-center ${textColor} text-center`}>
      <span className={`${yellowtail.className} ${s.title} tracking-wide ${s.margin}`}>
        {title}
      </span>
      <div className={`flex items-center ${s.gap} mt-0`}>
        <div className={`${s.lineWidth} h-px ${lineColor} opacity-70`}></div>
        <span className={`${yellowtail.className} ${s.subtitle} tracking-wide`}>
          {subtitle}
        </span>
        <div className={`${s.lineWidth} h-px ${lineColor} opacity-70`}></div>
      </div>
      <span className={`${s.location} uppercase tracking-[0.3em] font-light opacity-70 mt-2`}>
        {location}
      </span>
    </div>
  );
}
