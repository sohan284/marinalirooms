"use client";

import React from "react";

export function PageEditorSkeleton() {
  return (
    <div className="flex flex-col h-full bg-slate-100 overflow-hidden animate-pulse">
      {/* Top Header Skeleton */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <div className="space-y-2">
            <div className="h-6 w-32 bg-slate-200 rounded-md"></div>
            <div className="h-4 w-48 bg-slate-100 rounded-md"></div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="h-10 w-64 bg-slate-100 rounded-lg"></div>
          <div className="h-10 w-32 bg-slate-200 rounded-lg"></div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Skeleton */}
        <aside className="w-72 bg-white border-r border-slate-200 p-6 space-y-8">
          <div className="h-4 w-24 bg-slate-100 rounded-md"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 w-full bg-slate-50 rounded-xl"></div>
            ))}
          </div>
        </aside>

        {/* Main Content Skeleton */}
        <main className="flex-1 overflow-y-auto bg-slate-200/50 p-8 space-y-6">
          <div className="sticky top-0 h-8 w-40 bg-white/50 rounded-md mb-8"></div>
          <div className="max-w-6xl mx-auto space-y-10">
            {/* Hero-like skeleton */}
            <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="h-64 w-full bg-slate-100"></div>
              <div className="p-8 space-y-4">
                <div className="h-10 w-1/3 bg-slate-200 rounded-lg"></div>
                <div className="h-4 w-2/3 bg-slate-100 rounded-md"></div>
              </div>
            </div>
            
            {/* Content-like skeleton */}
            <div className="grid grid-cols-2 gap-8">
              <div className="h-80 bg-white rounded-xl border border-slate-200"></div>
              <div className="h-80 bg-white rounded-xl border border-slate-200"></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
