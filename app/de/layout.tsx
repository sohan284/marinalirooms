import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import BookingBar from "@/components/common/BookingBar";
import { getContent } from "@/lib/content";
import { SettingsService } from "@/lib/services/settingsService";
import SmoothScrolling from "@/components/common/SmoothScrolling";

export const dynamic = 'force-dynamic';


export default async function GermanLayout({ children }: { children: React.ReactNode }) {
  const { home } = getContent("de");
  const data = home.booking;
  const settings = await SettingsService.getSettings();
  const footerConfig = settings.footerConfig?.de;

  return (
    <SmoothScrolling>
      <Navbar lang="de" />
      <div className="pt-24 min-h-screen">
        {children}
      </div>
      <BookingBar data={data} lang="de" />
      <Footer 
        lang="de" 
        infoTitle={footerConfig?.infoTitle}
        address={footerConfig?.address}
        phone={footerConfig?.phone}
        email={footerConfig?.email}
        whatsapp={footerConfig?.whatsapp}
        mapUrl={footerConfig?.mapUrl}
        copyright={footerConfig?.copyright}
        columns={footerConfig?.columns}
        bottomLinks={footerConfig?.bottomLinks}
      />
    </SmoothScrolling>
  );
}
