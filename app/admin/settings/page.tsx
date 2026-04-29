"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Plus, Trash2 } from "lucide-react";
import { SettingsSkeleton } from "./_components/SettingsSkeleton";
import { SettingsPreview } from "./_components/SettingsPreview";
import { ThemeSettings, FooterConfig } from "./_components/types";

const DEFAULT_FOOTER_CONFIG: Record<string, FooterConfig> = {
  en: {
    columns: [],
    socialLinks: [],
    copyright: "© 2026 Marinali Rooms. All rights reserved.",
    bottomLinks: [],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2778.675046274438!2d11.7335!3d45.7667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4778d65565555555%3A0x5555555555555555!2sVia%20Marinali%2C%2036061%20Bassano%20del%20Grappa%20VI!5e0!3m2!1sen!2sit!4v1713535000000!5m2!1sen!2sit",
    address: "Via Marinali, 10\n36061 Bassano del Grappa VI, Italy",
    phone: "+39 0424 123456",
    email: "info@marinalirooms.it",
    whatsapp: "+390424123456",
  },
  it: {
    columns: [],
    socialLinks: [],
    copyright: "© 2026 Marinali Rooms. Tutti i diritti riservati.",
    bottomLinks: [],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2778.675046274438!2d11.7335!3d45.7667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4778d65565555555%3A0x5555555555555555!2sVia%20Marinali%2C%2036061%20Bassano%20del%20Grappa%20VI!5e0!3m2!1sen!2sit!4v1713535000000!5m2!1sen!2sit",
    address: "Via Marinali, 10\n36061 Bassano del Grappa VI, Italia",
    phone: "+39 0424 123456",
    email: "info@marinalirooms.it",
    whatsapp: "+390424123456",
  },
  de: {
    columns: [],
    socialLinks: [],
    copyright: "© 2026 Marinali Rooms. Alle Rechte vorbehalten.",
    bottomLinks: [],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2778.675046274438!2d11.7335!3d45.7667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4778d65565555555%3A0x5555555555555555!2sVia%20Marinali%2C%2036061%20Bassano%20del%20Grappa%20VI!5e0!3m2!1sen!2sit!4v1713535000000!5m2!1sen!2sit",
    address: "Via Marinali, 10\n36061 Bassano del Grappa VI, Italien",
    phone: "+39 0424 123456",
    email: "info@marinalirooms.it",
    whatsapp: "+390424123456",
  },
};

export default function SettingsPage() {
  const queryClient = useQueryClient();

  const { data: currentSettings, isLoading } = useQuery<ThemeSettings>({
    queryKey: ['settings'],
    queryFn: async () => {
      const res = await fetch("/api/settings");
      if (!res.ok) throw new Error("Failed to fetch settings");
      return res.json();
    }
  });

  const [formData, setFormData] = useState<ThemeSettings>({
    primaryColor: "#123149",
    secondaryColor: "#F2DE97",
    backgroundColor: "#F8F6F2",
    textColor: "#111111",
    fontFamily: "var(--font-playfair)",
    footerConfig: DEFAULT_FOOTER_CONFIG,
  });
  const [showPreviewDrawer, setShowPreviewDrawer] = useState(false);
  const [activeTab, setActiveTab] = useState<"colors" | "footer">("colors");
  const [activeFooterLang, setActiveFooterLang] = useState<"en" | "it" | "de">("en");

  useEffect(() => {
    if (currentSettings) {
      setFormData({
        ...currentSettings,
        footerConfig: currentSettings.footerConfig || DEFAULT_FOOTER_CONFIG,
      });
    }
  }, [currentSettings]);

  const mutation = useMutation({
    mutationFn: async (updates: ThemeSettings) => {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to save settings");
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['settings'], data);
      toast.success("Settings saved successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    },
    onError: () => {
      toast.error("Failed to save settings.");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleColorChange = (key: keyof ThemeSettings, val: string) => {
    setFormData(prev => ({ ...prev, [key]: val }));
  };

  const footerConfigs = formData.footerConfig || DEFAULT_FOOTER_CONFIG;
  const fc = footerConfigs[activeFooterLang] || DEFAULT_FOOTER_CONFIG[activeFooterLang];

  const updateFooterConfig = (updates: Partial<FooterConfig>) => {
    setFormData(prev => {
      const currentConfigs = prev.footerConfig || DEFAULT_FOOTER_CONFIG;
      const currentLangConfig = currentConfigs[activeFooterLang] || DEFAULT_FOOTER_CONFIG[activeFooterLang];

      return {
        ...prev,
        footerConfig: {
          ...currentConfigs,
          [activeFooterLang]: { ...currentLangConfig, ...updates }
        },
      };
    });
  };

  if (isLoading) return <SettingsSkeleton />;

  return (
    <div className="flex h-full overflow-hidden bg-slate-50">
      {/* Left Column: Form & Actions */}
      <div className="flex-1 h-full p-6 overflow-y-auto  scrollbar-hide">
        <div className="sticky -top-6 z-20 bg-slate-50 py-6 mb-2 border-b border-gray-200/50 backdrop-blur-sm -mt-4">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Site Settings</h2>
              <p className="text-gray-500 mt-2">Manage colors, branding, and footer content across all languages.</p>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex bg-gray-100/80 p-1 rounded-xl w-fit">
                {[
                  { id: "colors", label: "Colors & Fonts" },
                  { id: "footer", label: "Footer" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === tab.id
                      ? "bg-white text-black shadow-sm"
                      : "text-gray-500 hover:text-gray-800"
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="h-8 w-[1px] bg-gray-200 hidden xl:block" />

              <Button
                onClick={() => handleSubmit({ preventDefault: () => { } } as any)}
                disabled={mutation.isPending}
                className="bg-primary text-background shadow-lg px-8 py-6 rounded-xl flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {mutation.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="pt-6">
          {activeTab === "colors" && (
            <Card className="shadow-none border-gray-200 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <CardHeader>
                <CardTitle>Colors & Typography</CardTitle>
                <CardDescription>Adjust the global aesthetics. Choose colors that ensure high contrast for accessibility.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-10">
                {/* Color Scheme */}
                <div className="space-y-6">
                  <Label className="text-base font-bold text-gray-900 border-l-4 border-blue-500 pl-3">Color Palette</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {[
                      { key: "primaryColor", label: "Primary Color", desc: "Used for buttons, navbar, and major accents." },
                      { key: "secondaryColor", label: "Secondary Color", desc: "Used for highlights and subtle details." },
                      { key: "backgroundColor", label: "Background", desc: "The main background color of your site." },
                      { key: "textColor", label: "Text Color", desc: "Primary color for all readability." },
                    ].map((item) => (
                      <div key={item.key} className="space-y-4 group">
                        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl transition-all group-hover:bg-white border border-transparent group-hover:border-gray-200 group-hover:shadow-sm">
                          <div className="space-y-1">
                            <Label htmlFor={item.key} className="text-sm font-semibold text-gray-800">{item.label}</Label>
                            <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono text-gray-400 uppercase">{formData[item.key as keyof ThemeSettings] as string}</span>
                            <div className="relative overflow-hidden w-10 h-10 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-all cursor-pointer ring-1 ring-gray-100">
                              <Input
                                type="color"
                                id={item.key}
                                value={formData[item.key as keyof ThemeSettings] as string}
                                onChange={(e) => handleColorChange(item.key as keyof ThemeSettings, e.target.value)}
                                className="absolute -top-2 -left-2 w-[200%] h-[200%] scale-150 cursor-pointer p-0 opacity-0"
                              />
                              <div
                                className="w-full h-full pointer-events-none"
                                style={{ backgroundColor: formData[item.key as keyof ThemeSettings] as string }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Typography */}
                <div className="border-t pt-8 space-y-3">
                  <Label htmlFor="fontFamily">Font Family</Label>
                  <Select
                    value={formData.fontFamily}
                    onValueChange={(val) => handleColorChange("fontFamily", val as string)}
                  >
                    <SelectTrigger className="w-full md:w-[300px]">
                      <SelectValue placeholder="Select a font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="var(--font-geist-sans)">Geist Sans</SelectItem>
                      <SelectItem value="var(--font-playfair)">Playfair Display</SelectItem>
                      <SelectItem value="var(--font-montserrat)">Montserrat</SelectItem>
                      <SelectItem value="var(--font-lora)">Lora</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500">This font class is applied globally to headings and body text.</p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "footer" && (
            <Card className="shadow-none border-gray-200 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Footer Configuration</CardTitle>
                    <CardDescription>Manage your site's bottom navigation and legal text.</CardDescription>
                  </div>

                  <div className="flex bg-gray-100 p-1 rounded-lg w-fit">
                    {[
                      { id: "en", label: "EN" },
                      { id: "it", label: "IT" },
                      { id: "de", label: "DE" }
                    ].map((lang) => (
                      <button
                        key={lang.id}
                        type="button"
                        onClick={() => setActiveFooterLang(lang.id as any)}
                        className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${activeFooterLang === lang.id
                          ? "bg-white text-black shadow-sm"
                          : "text-gray-500 hover:text-gray-800"
                          }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Copyright */}
                <div className="border-t pt-8 space-y-3">
                  <Label>Copyright Text</Label>
                  <Input
                    value={fc.copyright}
                    onChange={(e) => updateFooterConfig({ copyright: e.target.value })}
                    placeholder="© 2026 Marinali Rooms"
                    className="max-w-md"
                  />
                </div>

                {/* Contact & Map */}
                <div className="border-t pt-8 space-y-6">
                  <Label className="text-base font-semibold">Contact Info & Map</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-xs">Address</Label>
                      <textarea
                        value={fc.address || ""}
                        onChange={(e) => updateFooterConfig({ address: e.target.value })}
                        placeholder="Street, City, Country"
                        className="w-full min-h-[80px] p-2 text-sm border rounded-md"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-xs">Phone</Label>
                        <Input
                          value={fc.phone || ""}
                          onChange={(e) => updateFooterConfig({ phone: e.target.value })}
                          placeholder="+39 123 456 7890"
                          className="text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Email</Label>
                        <Input
                          value={fc.email || ""}
                          onChange={(e) => updateFooterConfig({ email: e.target.value })}
                          placeholder="info@marinalirooms.com"
                          className="text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">WhatsApp Number (e.g. +391234567890)</Label>
                        <Input
                          value={fc.whatsapp || ""}
                          onChange={(e) => updateFooterConfig({ whatsapp: e.target.value })}
                          placeholder="+391234567890"
                          className="text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs">Google Maps Embed URL</Label>
                    <Input
                      value={fc.mapUrl || ""}
                      onChange={(e) => updateFooterConfig({ mapUrl: e.target.value })}
                      placeholder="https://www.google.com/maps/embed?..."
                      className="text-sm font-mono"
                    />
                    <p className="text-[10px] text-gray-400 italic">Paste the "src" attribute from the Google Maps iframe embed code.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </div>

      <SettingsPreview
        formData={formData}
        fc={fc}
        showPreviewDrawer={showPreviewDrawer}
        setShowPreviewDrawer={setShowPreviewDrawer}
      />
    </div>
  );
}
