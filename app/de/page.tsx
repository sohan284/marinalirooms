import { ContentService } from "@/lib/services/contentService";
import { RoomService } from "@/lib/services/roomService";

import Hero from "@/components/Home/Hero";
import IntroSection from "@/components/Home/IntroSection";
import dynamic from "next/dynamic";
import Image from "next/image";
import RoomSplitSection from "@/components/rooms/RoomSplitSection";
import LeSuiteBookingFooter from "@/components/rooms/LeSuiteBookingFooter";
import LeSuiteHeader from "@/components/rooms/LeSuiteHeader";
import HeritageSection from "@/components/Home/HeritageSection";



const ReviewSlider = dynamic(() => import("@/components/Home/ReviewSlider"));

export default async function GermanHomePage() {
  const roomsData = await RoomService.getRooms();
  const rooms = roomsData.map((room: any) => ({
    id: room.slug,
    images: room.images,
    ...room.translations.de
  }));



  const content = await ContentService.getContent("home", "de");
  const data = (content?.sections as any) || {};


  return (
    <>
      <Hero
        title={data?.heroTitle || "Marinali"}
        subtitle={data?.heroSubtitle || "ROOMS"}
        lang="de"
        data={data}
      />

      {/* Le Suite Section */}
      <section id="le-suite" className="">
        <LeSuiteHeader lang="de" data={data} />

        {rooms.map((room: any, index: number) => (
          <RoomSplitSection
            key={room.id}
            room={room}
            reverse={index % 2 !== 0}
            lang="de"
            priority={index === 0}
          />
        ))}

        <LeSuiteBookingFooter lang="de" data={data} />
      </section>

      <div className="container mx-auto">
        <IntroSection
          title={data?.aboutTitle || data?.title || "Willkommen"}
          description={data?.aboutDescription || data?.welcomeText || "Erleben Sie unvergessliche Gastfreundschaft..."}
        >
          <HeritageSection data={data} lang="de" />
        </IntroSection>
      </div>
      <ReviewSlider lang="de" data={data} />
    </>
  );
}
