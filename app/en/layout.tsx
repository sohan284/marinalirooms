import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import BookingBar from "@/components/common/BookingBar";
import { getContent } from "@/lib/content";
import { SettingsService } from "@/lib/services/settingsService";
import SmoothScrolling from "@/components/common/SmoothScrolling";

export const dynamic = 'force-dynamic';


export default async function EnglishLayout({ children }: { children: React.ReactNode }) {
  const { home } = getContent("en");
  const data = home.booking;
  const settings = await SettingsService.getSettings();
  const footerConfig = settings.footerConfig?.en;

  return (
    <SmoothScrolling>
      <Navbar lang="en" />
      <div className="pt-24 min-h-screen ">
        {children}
      </div>
      <BookingBar data={data} lang="en" />
      <Footer
        lang="en"
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
