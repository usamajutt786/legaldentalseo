'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import {
  Monitor,
  Smartphone,
  ExternalLink,
  ChevronDown,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import PublicPracticeCityPage from '@/components/lawfirm/PublicPracticeCityPage';

export default function PagePreviewView() {
  const { pages, selectedPageId, setSelectedPageId, setAdminTab, setAppMode, setPublicRoute } = useApp();

  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

  const currentPage = pages.find((p) => p.id === selectedPageId) || pages[0];

  return (
    <div className="p-6 space-y-4 max-w-7xl mx-auto">
      {/* Top Device Bar */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-700">Preview Page:</span>
          <select
            value={currentPage.id}
            onChange={(e) => setSelectedPageId(e.target.value)}
            className="text-xs font-serif font-bold text-slate-900 border border-slate-300 rounded-lg p-1.5 bg-white cursor-pointer"
          >
            {pages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.h1} ({p.cityName})
              </option>
            ))}
          </select>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setDevice('desktop')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
              device === 'desktop'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop (1440px)</span>
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
              device === 'mobile'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile Device (390px)</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAdminTab('page-editor')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
          >
            Open in Editor
          </button>
          <button
            onClick={() => {
              setAppMode('public');
              setPublicRoute('page');
            }}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1 shadow-sm"
          >
            <span>Full Window View</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Frame Container */}
      <div className="bg-slate-200/70 p-6 rounded-xl border border-slate-300 min-h-[750px] flex items-center justify-center overflow-x-auto">
        {device === 'desktop' ? (
          <div className="w-full max-w-6xl bg-white rounded-xl shadow-2xl border border-slate-300 overflow-hidden">
            {/* Browser Header Bar */}
            <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
              </div>
              <div className="bg-white px-4 py-1 rounded-md border border-slate-200 text-[11px] font-mono text-slate-700 max-w-md w-full text-center truncate">
                https://www.harrisoncoleinjurylaw.com{currentPage.url}
              </div>
              <div className="text-[10px] text-emerald-700 font-semibold">
                SSL Secured
              </div>
            </div>

            {/* Embedded Page Content */}
            <div className="max-h-[700px] overflow-y-auto">
              <PublicPracticeCityPage />
            </div>
          </div>
        ) : (
          /* Mobile Phone Device Frame */
          <div className="w-[390px] h-[780px] bg-slate-900 rounded-[48px] p-3 shadow-2xl border-4 border-slate-800 relative flex flex-col overflow-hidden">
            {/* Dynamic Island / Notch */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30" />

            <div className="w-full h-full bg-white rounded-[38px] overflow-hidden flex flex-col pt-8">
              <div className="flex-1 overflow-y-auto">
                <PublicPracticeCityPage />
              </div>

              {/* Mobile Home Indicator bar */}
              <div className="h-4 bg-white flex items-center justify-center shrink-0">
                <div className="w-32 h-1 bg-slate-300 rounded-full" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
