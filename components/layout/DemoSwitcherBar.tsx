'use client';

import React from 'react';
import { useApp } from '@/lib/context';
import { TrafficSource } from '@/lib/types';
import {
  Globe,
  Sliders,
  PhoneCall,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers,
  FileText,
} from 'lucide-react';

export default function DemoSwitcherBar() {
  const {
    appMode,
    setAppMode,
    publicRoute,
    setPublicRoute,
    adminTab,
    setAdminTab,
    trafficSource,
    testNumberRotation,
    currentPhoneNumber,
    pages,
    selectedPageId,
    setSelectedPageId,
    resetAllDemoData,
  } = useApp();

  return (
    <div className="bg-slate-900 text-slate-100 border-b border-slate-800 text-xs select-none sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Mode Toggle */}
        <div className="flex items-center gap-2">
          <span className="font-semibold tracking-wide text-amber-400 uppercase text-[11px] flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Prototype Demo Switcher
          </span>

          <div className="inline-flex rounded-md p-0.5 bg-slate-800 border border-slate-700">
            <button
              onClick={() => {
                setAppMode('public');
              }}
              className={`px-3 py-1 rounded text-xs font-medium transition-all flex items-center gap-1.5 ${
                appMode === 'public'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Public Law Firm Website
            </button>
            <button
              onClick={() => {
                setAppMode('admin');
              }}
              className={`px-3 py-1 rounded text-xs font-medium transition-all flex items-center gap-1.5 ${
                appMode === 'admin'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              Internal SEO Dashboard
            </button>
          </div>
        </div>

        {/* Center: Contextual Controls based on Mode */}
        {appMode === 'public' ? (
          <div className="flex items-center gap-2 flex-wrap">
            {/* Dynamic CallRail Traffic Source Simulator */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-400 text-[11px]">Traffic Source:</span>
              <select
                value={trafficSource}
                onChange={(e) => testNumberRotation(e.target.value as TrafficSource)}
                className="bg-slate-900 text-white font-medium rounded px-1.5 py-0.5 border border-slate-700 text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="organic">Organic Search (Google)</option>
                <option value="google_ads">Google Ads (PPC)</option>
                <option value="direct">Direct Traffic</option>
                <option value="local_maps">Google Maps / GMB</option>
              </select>
              <span className="font-mono text-amber-300 text-xs ml-1 font-semibold">
                {currentPhoneNumber}
              </span>
            </div>

            {/* Quick Page Jump */}
            <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded border border-slate-700">
              <span className="text-slate-400 text-[11px]">View Page:</span>
              <select
                value={publicRoute === 'page' ? selectedPageId : publicRoute}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === 'home' || val === 'about' || val === 'attorneys' || val === 'results' || val === 'contact') {
                    setPublicRoute(val as any);
                  } else {
                    setSelectedPageId(val);
                    setPublicRoute('page');
                  }
                }}
                className="bg-slate-900 text-white text-xs rounded px-1.5 py-0.5 border border-slate-700 focus:outline-none focus:border-amber-400 max-w-[200px] truncate"
              >
                <option value="home">Homepage (Harrison & Cole)</option>
                <option value="attorneys">Our Attorneys</option>
                <option value="results">Case Results</option>
                <option value="about">About Firm</option>
                <option value="contact">Contact Us</option>
                <optgroup label="Programmatic City + Practice Pages">
                  {pages.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.cityName} {p.practiceName}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-slate-300 text-[11px]">
              <span className="flex items-center gap-1 text-slate-400">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                <span>1,284 Managed Pages</span>
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Surfer SEO: Connected
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-amber-400">CallRail DNI: Active</span>
            </div>

            <button
              onClick={() => {
                setAppMode('public');
                setPublicRoute('page');
              }}
              className="text-slate-300 hover:text-white flex items-center gap-1 text-xs hover:underline"
            >
              <span>Preview Live Page</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {appMode === 'public' ? (
            <button
              onClick={() => {
                setAppMode('admin');
                setAdminTab('generate');
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1"
            >
              <Sliders className="w-3 h-3" />
              <span>Open Page Generator</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setAppMode('public');
                setPublicRoute('home');
              }}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-medium px-2.5 py-1 rounded text-xs transition-colors flex items-center gap-1"
            >
              <Globe className="w-3 h-3" />
              <span>Go to Public Site</span>
            </button>
          )}

          <button
            onClick={resetAllDemoData}
            title="Reset to default prototype demo state"
            className="text-slate-400 hover:text-slate-200 p-1 rounded hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
