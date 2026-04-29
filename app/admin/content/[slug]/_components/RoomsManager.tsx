"use client";

import { useState, useEffect } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Bed,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  ImageIcon,
  Layers,
  Save,
  Loader2,
  X
} from "lucide-react";
import { toast } from "sonner";
import { useUploadThing } from "@/lib/uploadthing";

interface RoomsManagerProps {
  lang: string;
}

export function RoomsManager({ lang }: RoomsManagerProps) {
  const queryClient = useQueryClient();
  const [expandedRoom, setExpandedRoom] = useState<string | null>(null);
  const [localRooms, setLocalRooms] = useState<any[]>([]);
  const [changedRoomIds, setChangedRoomIds] = useState<Set<string>>(new Set());
  const [roomTabs, setRoomTabs] = useState<Record<string, "content" | "gallery">>({});
  const [isUploading, setIsUploading] = useState<Record<string, boolean>>({});
  const [pendingFiles, setPendingFiles] = useState<Record<string, { main?: File, gallery?: File[] }>>({});

  const { startUpload } = useUploadThing("imageUploader");

  const { data: rooms, isLoading } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const res = await fetch("/api/rooms");
      if (!res.ok) throw new Error("Failed to fetch rooms");
      return res.json();
    },
  });

  // Sync local state with query data when it loads or changes
  useEffect(() => {
    const isAnyUploading = Object.values(isUploading).some(v => v);
    if (rooms && changedRoomIds.size === 0 && !isAnyUploading) {
      setLocalRooms(rooms);
    }
  }, [rooms, changedRoomIds.size, isUploading]);



  const updateMutation = useMutation({
    mutationFn: async (room: any) => {
      const res = await fetch(`/api/rooms/${room.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(room),
      });
      if (!res.ok) throw new Error(`Failed to update room ${room.slug}`);
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      setChangedRoomIds(prev => {
        const next = new Set(prev);
        next.delete(data.id);
        return next;
      });
    },
    onError: (err) => {
      toast.error("Failed to save room changes.");
      console.error(err);
    },
  });

  const handleFieldChange = (roomId: string, field: string, value: any, isTranslation = false) => {
    setLocalRooms(prev => prev.map(r => {
      if (r.id !== roomId) return r;

      const updated = { ...r };
      if (isTranslation) {
        if (!updated.translations[lang]) updated.translations[lang] = {};
        updated.translations[lang] = { ...updated.translations[lang], [field]: value };
      } else {
        updated[field] = value;
      }
      return updated;
    }));
    setChangedRoomIds(prev => new Set(prev).add(roomId));
  };

  const saveRoom = async (roomId: string) => {
    const room = localRooms.find(r => r.id === roomId);
    if (!room) return;

    setIsUploading(prev => ({ ...prev, [roomId]: true }));

    try {
      // 1. Prepare initial images (filter out pending blob URLs)
      let finalGalleryImages = [...(room.images || [])].filter((img: any) => {
        const url = typeof img === 'string' ? img : img.url;
        return url && !url.startsWith('blob:');
      });

      // 2. Initial API Call (save text changes immediately)
      console.log("[RoomsManager] Saving text changes to database...");
      await updateMutation.mutateAsync({
        ...room,
        images: finalGalleryImages,
      });

      // 3. Upload pending gallery images AFTER successful API call
      if (pendingFiles[roomId]?.gallery && pendingFiles[roomId].gallery!.length > 0) {
        console.log(`[RoomsManager] Uploading ${pendingFiles[roomId].gallery!.length} gallery images...`);
        const res = await startUpload(pendingFiles[roomId].gallery!);

        if (res && res.length > 0) {
          const newImageObjects = res.map(file => ({ url: file.url, key: file.key }));
          finalGalleryImages = [...finalGalleryImages, ...newImageObjects];
          console.log("[RoomsManager] Gallery images uploaded, saving to database again...");

          // 4. Second API Call to save the new image URLs
          await updateMutation.mutateAsync({
            ...room,
            images: finalGalleryImages,
          });
        } else {
          throw new Error("Failed to upload gallery images");
        }
      }

      // 5. Clear pending files
      setPendingFiles(prev => {
        const next = { ...prev };
        delete next[roomId];
        return next;
      });

      toast.success(`Room ${room.slug} saved successfully!`);

    } catch (error) {
      console.error("Failed to save room:", error);
      toast.error(error instanceof Error ? error.message : "Failed to upload images or save changes.");
    } finally {
      setIsUploading(prev => ({ ...prev, [roomId]: false }));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-blue-900" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Bed className="text-blue-900" />
            Le Suite Management
          </h2>
          <p className="text-slate-500 text-sm">Manage your rooms, descriptions, and galleries.</p>
        </div>
      </div>

      <div className="grid gap-6">
        {localRooms?.map((room: any) => {
          const isExpanded = expandedRoom === room.id;
          const hasChanges = changedRoomIds.has(room.id);
          const t = room.translations[lang] || room.translations['en'] || {};


          return (
            <div key={room.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:border-blue-200">
              {/* Header */}
              <div
                className="p-6 flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedRoom(isExpanded ? null : room.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-100">
                    <img src={room.images?.[0] ? (typeof room.images[0] === 'string' ? room.images[0] : room.images[0].url) : ''} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 uppercase">{t.name || "Unnamed Room"}</h3>
                    <p className="text-sm text-slate-500">{t.location || "No location set"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono uppercase bg-slate-100 px-2 py-1 rounded text-slate-500">
                    {room.slug}
                  </span>
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="p-8 border-t border-slate-100 bg-slate-50/50 space-y-8 animate-in fade-in slide-in-from-top-4 duration-300">
                  {/* Tabs & Save Row */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex bg-slate-200/50 p-1 rounded-xl w-fit">
                      <button
                        onClick={() => setRoomTabs(prev => ({ ...prev, [room.id]: "content" }))}
                        className={`px-6 py-2 text-xs font-bold rounded-lg transition-all ${(roomTabs[room.id] || "content") === "content"
                          ? "bg-white text-blue-900 shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                          }`}
                      >
                        Room Content
                      </button>
                      <button
                        onClick={() => setRoomTabs(prev => ({ ...prev, [room.id]: "gallery" }))}
                        className={`px-6 py-2 text-xs font-bold rounded-lg transition-all ${roomTabs[room.id] === "gallery"
                          ? "bg-white text-blue-900 shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                          }`}
                      >
                        Image Gallery
                      </button>
                    </div>

                    {hasChanges && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          saveRoom(room.id);
                        }}
                        disabled={isUploading[room.id] || updateMutation.isPending}
                        className="flex items-center gap-2 bg-blue-900 text-background px-4 py-2 rounded-lg text-xs font-bold shadow-md hover:opcaity-90 transition-all active:scale-95 disabled:opacity-50 animate-in fade-in slide-in-from-right-4 cursor-pointer"
                      >
                        {(isUploading[room.id] || updateMutation.isPending) && expandedRoom === room.id ? (
                          <Loader2 className="animate-spin" size={14} />
                        ) : (
                          <Save size={14} />
                        )}
                        SAVE CHANGES
                      </button>
                    )}
                  </div>

                  {(roomTabs[room.id] || "content") === "content" ? (
                    <div className="space-y-8 animate-in fade-in duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Left Side: Basic Info */}
                        <div className="space-y-6">
                          <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Room Name</label>
                            <input
                              type="text"
                              value={t.name || ""}
                              onChange={(e) => handleFieldChange(room.id, 'name', e.target.value, true)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Location</label>
                            <input
                              type="text"
                              value={t.location || ""}
                              onChange={(e) => handleFieldChange(room.id, 'location', e.target.value, true)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Capacity</label>
                            <input
                              type="text"
                              value={t.capacity || ""}
                              onChange={(e) => handleFieldChange(room.id, 'capacity', e.target.value, true)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                          </div>
                        </div>

                        {/* Right Side: Description */}
                        <div>
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Description</label>
                          <textarea
                            rows={8}
                            value={t.description || ""}
                            onChange={(e) => handleFieldChange(room.id, 'description', e.target.value, true)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                          />
                        </div>
                      </div>

                      {/* Amenities Section */}
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Amenities</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {t.amenities?.map((amenity: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-2 group">
                              <input
                                type="text"
                                value={amenity}
                                onChange={(e) => {
                                  const newAmenities = [...t.amenities];
                                  newAmenities[idx] = e.target.value;
                                  handleFieldChange(room.id, 'amenities', newAmenities, true);
                                }}
                                className="flex-1 text-sm bg-transparent border-none focus:ring-0 p-0"
                              />
                              <button
                                onClick={() => {
                                  const newAmenities = [...t.amenities];
                                  newAmenities.splice(idx, 1);
                                  handleFieldChange(room.id, 'amenities', newAmenities, true);
                                }}
                                className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => {
                              const newAmenities = [...(t.amenities || [])];
                              newAmenities.push("");
                              handleFieldChange(room.id, 'amenities', newAmenities, true);
                            }}
                            className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg p-2 text-sm transition-all border border-dashed border-slate-300"
                          >
                            <Plus size={14} /> Add Amenity
                          </button>
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="space-y-8 animate-in fade-in duration-300">
                      {/* Media Section */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Gallery Images */}
                        <div className="md:col-span-3">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block flex items-center gap-2">
                            <Layers size={14} /> Gallery Images
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {room.images?.map((img: any, idx: number) => {
                              const url = typeof img === 'string' ? img : img.url;
                              const isBlob = url && url.startsWith('blob:');
                              const isCurrentlyUploading = isBlob && isUploading[room.id];

                              return (
                                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-slate-200 group border border-slate-200 shadow-sm">
                                  <img src={url} alt={`Gallery ${idx}`} className={`w-full h-full object-cover transition-all ${isCurrentlyUploading ? 'opacity-50 blur-[2px] grayscale' : ''}`} />

                                  {isCurrentlyUploading && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[1px] z-10">
                                      <Loader2 className="animate-spin text-blue-900 mb-2" size={24} />
                                      <span className="text-[10px] font-bold text-blue-900 uppercase tracking-tighter">Uploading</span>
                                    </div>
                                  )}

                                  {!isCurrentlyUploading && (
                                    <button
                                      onClick={() => {
                                        const newImages = [...room.images];
                                        newImages.splice(idx, 1);
                                        handleFieldChange(room.id, 'images', newImages);
                                      }}
                                      className="absolute top-2 right-2 bg-red-500 text-background p-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110 z-20"
                                    >
                                      <X size={14} />
                                    </button>
                                  )}
                                </div>
                              );
                            })}
                            <div className="aspect-square rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50/50 hover:bg-slate-100 transition-all group relative overflow-hidden cursor-pointer">
                              <label className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-400 font-bold text-xs uppercase cursor-pointer">
                                <Plus size={24} />
                                <span>Add Photo</span>
                                <input
                                  type="file"
                                  className="hidden"
                                  multiple
                                  accept="image/*"
                                  onChange={(e) => {
                                    const files = Array.from(e.target.files || []);
                                    if (files.length > 0) {
                                      const blobObjects = files.map(file => ({
                                        url: URL.createObjectURL(file),
                                        key: 'pending-' + Date.now()
                                      }));
                                      const newImages = [...(room.images || []), ...blobObjects];
                                      handleFieldChange(room.id, 'images', newImages);
                                      setPendingFiles(prev => ({
                                        ...prev,
                                        [room.id]: {
                                          ...prev[room.id],
                                          gallery: [...(prev[room.id]?.gallery || []), ...files]
                                        }
                                      }));
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}


                </div>
              )}
            </div>
          );
        })}

      </div>
    </div>
  );
}

