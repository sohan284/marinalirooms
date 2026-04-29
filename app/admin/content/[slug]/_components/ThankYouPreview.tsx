"use client";

import { CheckCircle2, Calendar, MapPin, Phone } from 'lucide-react';
import { Yellowtail } from "next/font/google";
import EditableText from "@/components/common/EditableText";

const yellowtail = Yellowtail({ weight: "400", subsets: ["latin"] });

interface ThankYouPreviewProps {
  data: any;
  lang: string;
  slug: string;
}

export default function ThankYouPreview({ data, lang, slug }: ThankYouPreviewProps) {
  return (
    <div className="min-h-[70vh] bg-[var(--background)] flex flex-col items-center justify-center px-5 py-20 text-center relative overflow-hidden">
      <div className="max-w-2xl w-full space-y-8 animate-fade-in z-10">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <CheckCircle2 size={48} strokeWidth={1.5} />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className={`${yellowtail.className} text-6xl md:text-7xl text-primary`}>
            <EditableText
              lang={lang}
              page={slug}
              path="title"
              initialValue={data?.title || "Thank You"}
            />
          </h1>
          <h2 className="text-2xl md:text-3xl font-primary tracking-tight uppercase">
            <EditableText
              lang={lang}
              page={slug}
              path="subtitle"
              initialValue={data?.subtitle || "Booking Confirmed"}
            />
          </h2>
          <div className="text-lg opacity-70 font-light leading-relaxed max-w-lg mx-auto">
            <EditableText
              lang={lang}
              page={slug}
              path="description"
              initialValue={data?.description || "Your request has been successfully processed. We have sent you a confirmation email with all the details of your stay at Marinali Rooms."}
              multiline={true}
            />

          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-slate-200/50">
          <div className="flex flex-col items-center gap-2">
            <Calendar className="text-primary opacity-60" size={20} />
            <span className="text-[10px] uppercase tracking-widest font-mono opacity-50">
              <EditableText
                lang={lang}
                page={slug}
                path="labelStay"
                initialValue={data?.labelStay || "Stay"}
              />
            </span>
            <span className="text-sm font-medium">
              <EditableText
                lang={lang}
                page={slug}
                path="valueStay"
                initialValue={data?.valueStay || "Check Email"}
              />
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MapPin className="text-primary opacity-60" size={20} />
            <span className="text-[10px] uppercase tracking-widest font-mono opacity-50">
              <EditableText
                lang={lang}
                page={slug}
                path="labelAddress"
                initialValue={data?.labelAddress || "Address"}
              />
            </span>
            <span className="text-sm font-medium">
              <EditableText
                lang={lang}
                page={slug}
                path="valueAddress"
                initialValue={data?.valueAddress || "Bassano del Grappa"}
              />
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Phone className="text-primary opacity-60" size={20} />
            <span className="text-[10px] uppercase tracking-widest font-mono opacity-50">
              <EditableText
                lang={lang}
                page={slug}
                path="labelSupport"
                initialValue={data?.labelSupport || "Support"}
              />
            </span>
            <span className="text-sm font-medium">
              <EditableText
                lang={lang}
                page={slug}
                path="valueSupport"
                initialValue={data?.valueSupport || "+39 347 1234567"}
              />
            </span>
          </div>
        </div>

        <div className="pt-12">
          <div className="inline-block px-12 py-5 bg-primary text-background text-xs font-bold tracking-[0.3em] uppercase opacity-80 cursor-default">
            <EditableText
              lang={lang}
              page={slug}
              path="buttonLabel"
              initialValue={data?.buttonLabel || "Back to Home"}
            />
          </div>
        </div>
      </div>

      {/* Visual background element */}
      <div className="absolute top-0 right-0 -z-0 opacity-[0.03] pointer-events-none">
        <h1 className={`${yellowtail.className} text-[30rem] leading-none`}>M</h1>
      </div>
    </div>
  );
}
