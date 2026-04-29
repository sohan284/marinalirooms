"use client";

import { useContent } from "@/hooks/useContent";
import { useStore } from "@/lib/store/useStore";

export default function ContentDemo() {
  const { language, setLanguage } = useStore();
  const { data, isLoading, isError } = useContent(language, "home");

  if (isLoading) return <div className="p-8">Loading content...</div>;
  if (isError) return <div className="p-8 text-red-500">Error loading content.</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <div className="flex gap-4">
        <button
          onClick={() => setLanguage("en")}
          className={`px-4 py-2 rounded ${language === "en" ? "bg-primary text-background" : "bg-gray-200"}`}
        >
          English
        </button>
        <button
          onClick={() => setLanguage("it")}
          className={`px-4 py-2 rounded ${language === "it" ? "bg-primary text-background" : "bg-gray-200"}`}
        >
          Italian
        </button>
        <button
          onClick={() => setLanguage("de")}
          className={`px-4 py-2 rounded ${language === "de" ? "bg-primary text-background" : "bg-gray-200"}`}
        >
          German
        </button>
      </div>

      <div className="border p-6 rounded-lg shadow-sm bg-white">
        <h1 className="text-3xl font-bold mb-2">
          {data?.sections?.hero?.title}
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          {data?.sections?.hero?.subtitle}
        </p>
        <div className="prose">
          {data?.sections?.hero?.welcomeText}
        </div>
      </div>

      <div className="text-sm text-gray-400">
        Fetched for language: <span className="font-mono">{data?.lang}</span>
      </div>
    </div>
  );
}
