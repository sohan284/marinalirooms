"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Save,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Globe,
  Layout,
  Loader2,
  AlertCircle,
  Eye,
  Edit3,
  Image as ImageIcon,
  Type,
  Star,
  History,
  Bed,
  CheckCircle2,
  Heart
} from "lucide-react";

import Link from "next/link";
import { toast } from "sonner";
import EditableText from "@/components/common/EditableText";
import { PageEditorSkeleton } from "./_components/PageEditorSkeleton";
import { RoomsManager } from "./_components/RoomsManager";
import ReviewsManager from "./_components/ReviewsManager";


// Import UI components for preview
import Hero from "@/components/Home/Hero";
import Highlights from "@/components/Home/Highlights";
import IntroSection from "@/components/Home/IntroSection";
import HeritageSection from "@/components/Home/HeritageSection";
import LeSuiteBookingFooter from "@/components/rooms/LeSuiteBookingFooter";
import LeSuiteHeader from "@/components/rooms/LeSuiteHeader";
import ReviewSlider from "@/components/Home/ReviewSlider";
// Note: We'll add more as needed

import ThankYouPreview from "./_components/ThankYouPreview";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
];

const PAGE_SECTIONS: Record<string, any[]> = {
  home: [
    { id: "hero", label: "Hero Section", component: Hero, icon: ImageIcon },
    { id: "le-suite", label: "Le Suite Section", component: null, icon: Bed },
    { id: "welcome", label: "Welcome Section", component: IntroSection, icon: Type },
    { id: "heritage", label: "Heritage Blocks", component: HeritageSection, icon: History },
    { id: "reviews", label: "Review Section", component: ReviewSlider, icon: Star },
  ],
  "thank-you": [
    { id: "content", label: "Page Content", component: ThankYouPreview, icon: Heart },
  ],
};


export default function VisualPageEditor() {
  const params = useParams();
  const slug = params?.slug as string;
  const queryClient = useQueryClient();

  const [activeLang, setActiveLang] = useState("en");
  const [activeSection, setActiveSection] = useState(PAGE_SECTIONS[slug]?.[0]?.id || "");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Fetch content for the current language
  const { data: content, isLoading, isError } = useQuery({
    queryKey: ["content", activeLang, slug],
    queryFn: async () => {
      const res = await fetch(`/api/content/${activeLang}/${slug}`);
      if (!res.ok) throw new Error("Failed to fetch content");
      return res.json();
    },
  });

  // Local state for live editing
  const [formValues, setFormValues] = useState<any>(null);

  // Sync content to form values when fetched
  useEffect(() => {
    if (content) {
      setFormValues(content.sections || {});
    }
  }, [content]);

  const mutation = useMutation({
    mutationFn: async (newData: any) => {
      const res = await fetch(`/api/content/${activeLang}/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      if (!res.ok) throw new Error("Failed to update content");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content", activeLang, slug] });
      toast.success("Content saved successfully!");
    },
    onError: () => {
      toast.error("Failed to save changes.");
    },
  });

  if (isLoading) {
    return <PageEditorSkeleton />;
  }

  if (isError || !PAGE_SECTIONS[slug]) {
    return (
      <div className="p-12 text-center">
        <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
        <h2 className="text-2xl font-bold">Page Not Found</h2>
        <p className="text-gray-500 mt-2">The page you are trying to edit does not exist.</p>
        <Link href="/admin/content" className="mt-6 inline-block text-blue-900 hover:underline">
          Go back to Page List
        </Link>
      </div>
    );
  }

  const currentSection = PAGE_SECTIONS[slug].find(s => s.id === activeSection);
  const PreviewComponent = currentSection?.component;

  const handleFieldChange = (path: string, value: any) => {
    setFormValues((prev: any) => {
      const newData = { ...prev };
      const keys = path.split(".");
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  return (
    <div className="flex flex-col  h-full bg-slate-100 overflow-hidden">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-4">

          <div>
            <h1 className="text-lg font-bold capitalize">{slug} Editor</h1>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <Globe size={12} /> Editing {LANGUAGES.find(l => l.code === activeLang)?.label} version
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="flex bg-slate-100 p-1 border rounded-lg border-slate-200 mr-4">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setActiveLang(lang.code)}
                className={`
                  px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center cursor-pointer gap-2
                  ${activeLang === lang.code
                    ? 'bg-white text-blue-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'}
                `}
              >
                <span>{lang.flag}</span>
                {lang.label}
              </button>
            ))}
          </div>

          {/* <button
            onClick={() => mutation.mutate({ sections: formValues })}
            disabled={mutation.isPending}
            className="flex items-center gap-2 bg-blue-900 text-background px-5 py-2 rounded-lg font-semibold hover:bg-blue-900 transition-all disabled:opacity-50"
          >
            {mutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Save Changes
          </button> */}
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Section Tabs */}
        <aside className={`${isSidebarCollapsed ? "w-16" : "w-72"} bg-white border-r border-slate-200 overflow-y-auto hidden md:block transition-all duration-300 relative`}>
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="absolute cursor-pointer right-3 top-4 z-20 bg-white border border-slate-200 rounded-lg p-1.5 shadow-sm hover:bg-slate-50 transition-colors text-slate-400"
          >
            {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronDown className="rotate-90" size={18} />}
          </button>

          <div className={`p-6 ${isSidebarCollapsed ? "hidden" : "block"}`}>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Layout size={14} />
              Page Sections
            </h2>
            <div className="space-y-1">
              {PAGE_SECTIONS[slug]?.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeSection === section.id
                    ? "bg-blue-50  text-blue-900 shadow-sm shadow-blue-100"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                >
                  <section.icon size={18} className={activeSection === section.id ? "text-blue-500" : "text-slate-400"} />
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          {isSidebarCollapsed && (
            <div className="py-8 flex flex-col items-center gap-4 pt-16">
              {PAGE_SECTIONS[slug]?.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  title={section.label}
                  className={`p-2 rounded-lg transition-all ${activeSection === section.id
                    ? "bg-blue-900 text-background shadow-md shadow-blue-200 scale-110"
                    : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    }`}
                >
                  <section.icon size={18} />
                </button>
              ))}
            </div>
          )}
        </aside>

        {/* Preview / Edit Stage */}
        <main
          className="flex-1 space-y-0 flex flex-col overflow-y-auto transition-colors duration-500 relative scrollbar-hide"
          style={{
            backgroundColor: 'var(--background)',
            color: 'var(--foreground)',
          }}
        >
          {/* Controls Bar */}
          <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-2 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{activeSection} Editor</span>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="w-full min-h-full">

              {/* This is where we render the actual site components */}
              {activeSection === "le-suite" ? (
                <div className="space-y-0">
                  <LeSuiteHeader
                    lang={activeLang}
                    data={content?.sections}
                    isEditable={true}
                  />
                  <div className="bg-slate-50 border-t border-slate-200">
                    <RoomsManager lang={activeLang} />
                  </div>
                  <div className="border-t border-slate-200">
                    <LeSuiteBookingFooter
                      lang={activeLang}
                      data={content?.sections}
                      isEditable={true}
                    />
                  </div>
                </div>
              ) : activeSection === "reviews" ? (
                <div className="space-y-0">
                  <div className="bg-slate-50 pb-12 border-b border-slate-200">
                    <ReviewsManager lang={activeLang} />
                  </div>

                </div>
              ) : (

                PreviewComponent && content ? (
                  <div>
                    <PreviewComponent
                      data={content.sections || {}}
                      lang={activeLang}
                      isEditable={true}
                    />
                  </div>
                ) : (
                  <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl py-20 px-10 text-center">
                    <Layout className="mx-auto text-slate-300 mb-4" size={48} />
                    <h3 className="text-lg font-semibold text-slate-400">Preview not available for this section</h3>
                    <p className="text-sm text-slate-400 mt-2">You can still edit the content using the fields below.</p>
                  </div>
                )
              )}

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
