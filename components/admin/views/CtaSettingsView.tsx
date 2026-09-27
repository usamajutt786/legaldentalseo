'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import {
  Sliders,
  Phone,
  FileText,
  Monitor,
  Smartphone,
  Eye,
  CheckCircle2,
} from 'lucide-react';

export default function CtaSettingsView() {
  const { stickyCtaConfig, updateStickyCtaConfig, currentPhoneNumber } = useApp();

  const [headline, setHeadline] = useState(stickyCtaConfig.headline);
  const [primaryText, setPrimaryText] = useState(stickyCtaConfig.primaryButtonText);
  const [secondaryText, setSecondaryText] = useState(stickyCtaConfig.secondaryButtonText);
  const [phoneSource, setPhoneSource] = useState(stickyCtaConfig.phoneSource);
  const [desktopEnabled, setDesktopEnabled] = useState(stickyCtaConfig.desktopEnabled);
  const [mobileEnabled, setMobileEnabled] = useState(stickyCtaConfig.mobileEnabled);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStickyCtaConfig({
      headline,
      primaryButtonText: primaryText,
      secondaryButtonText: secondaryText,
      phoneSource,
      desktopEnabled,
      mobileEnabled,
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
          <Sliders className="w-3.5 h-3.5" />
          Conversion Rate Optimization
        </div>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
          Sticky & Floating CTA Configuration
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure the desktop floating bottom-right drawer and mobile fixed bottom action toolbar across all 1,284 pages.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Controls */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-base text-slate-900 pb-3 border-b border-slate-200">
            CTA Toolbar Parameters
          </h3>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Headline Copy
              </label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Primary Button Label
                </label>
                <input
                  type="text"
                  value={primaryText}
                  onChange={(e) => setPrimaryText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Secondary Button Label
                </label>
                <input
                  type="text"
                  value={secondaryText}
                  onChange={(e) => setSecondaryText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Phone Number Source
              </label>
              <select
                value={phoneSource}
                onChange={(e) => setPhoneSource(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
              >
                <option>Dynamic Call Tracking (CallRail)</option>
                <option>Main Office (Static Fallback)</option>
              </select>
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={desktopEnabled}
                  onChange={(e) => setDesktopEnabled(e.target.checked)}
                  className="rounded text-blue-600"
                />
                <span className="font-medium text-slate-800">
                  Enable Desktop Floating Bottom-Right Card
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={mobileEnabled}
                  onChange={(e) => setMobileEnabled(e.target.checked)}
                  className="rounded text-blue-600"
                />
                <span className="font-medium text-slate-800">
                  Enable Mobile Fixed Bottom Action Bar (WCAG compliant &le;15% height)
                </span>
              </label>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow"
              >
                Save CTA Settings
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview Column */}
        <div className="lg:col-span-5 bg-slate-100 p-6 rounded-xl border border-slate-300 space-y-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Live Interactive Preview</span>
            <span className="text-[10px] text-emerald-700 font-mono">Synced</span>
          </div>

          {/* Desktop Preview Card */}
          <div className="space-y-2">
            <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop Appearance:</span>
            </div>

            <div className="bg-slate-900 text-white p-4 rounded-xl shadow-xl border border-slate-700 text-xs">
              <div className="font-serif font-bold text-white text-sm mb-1">
                {headline}
              </div>
              <p className="text-[11px] text-slate-300 mb-3">
                Speak directly with an attorney right now.
              </p>
              <div className="space-y-2">
                <div className="w-full py-2 px-3 bg-amber-500 text-slate-950 font-bold rounded-lg text-center flex items-center justify-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {currentPhoneNumber}</span>
                </div>
                <div className="w-full py-1.5 bg-slate-800 border border-slate-700 text-slate-200 text-center rounded-lg font-medium">
                  {secondaryText}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Preview Bar */}
          <div className="space-y-2">
            <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Fixed Bar:</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div className="py-2 bg-slate-900 text-amber-400 font-bold text-center rounded-lg border border-amber-500/30 flex items-center justify-center gap-1">
                  <Phone className="w-3 h-3" />
                  <span>{primaryText}</span>
                </div>
                <div className="py-2 bg-amber-500 text-slate-950 font-bold text-center rounded-lg flex items-center justify-center gap-1">
                  <FileText className="w-3 h-3" />
                  <span>{secondaryText}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
