"use client";

import { useQuery } from "@tanstack/react-query";
import CustomSlider from "../common/CustomSlider";
import { Skeleton } from "../ui/skeleton";

export interface SliderItem {
  id: string | number;
  image: string;
  name: string;
  location: string;
  description: string;
}

export default function OfferSlider({ lang, data }: { lang: string; data?: any }) {
  const { data: offers = [], isLoading } = useQuery<SliderItem[]>({
    queryKey: ["rooms", "offers", lang],
    queryFn: async () => {
      const response = await fetch(`/api/rooms?lang=${lang}&isOffer=true`);
      if (!response.ok) throw new Error("Failed to fetch offers");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  // If no offers, we can either hide the section or show nothing
  if (offers.length === 0) return null;

  return (
    <div className='mb-10'>
      <CustomSlider
        title={data?.offersTitle || "OFFERS"}
        items={offers}
        sectionId="offer-slider"
        showBookNow={true}
        lang={lang}
      />
    </div>
  );
}
