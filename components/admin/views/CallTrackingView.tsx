'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import {
  PhoneCall,
  CheckCircle2,
  Sliders,
  RotateCw,
  Sparkles,
  Phone,
  ArrowRight,
  Shield,
} from 'lucide-react';
import { TrafficSource } from '@/lib/types';

export default function CallTrackingView() {
  const {
    callRailConfig,
    updateCallRailConfig,
    trafficSource,
    testNumberRotation,
    currentPhoneNumber,
    addToast,
  } = useApp();

  const [mainNum, setMainNum] = useState(callRailConfig.numbers.main);
  const [organicNum, setOrganicNum] = useState(callRailConfig.numbers.organic);
  const [adsNum, setAdsNum] = useState(callRailConfig.numbers.google_ads);
  const [directNum, setDirectNum] = useState(callRailConfig.numbers.direct);
  const [mapsNum, setMapsNum] = useState(callRailConfig.numbers.local_maps);
  const [dniEnabled, setDniEnabled] = useState(callRailConfig.dniEnabled);

  // Test source selector
  const [testSource, setTestSource] = useState<TrafficSource>('google_ads');

  const handleSaveNumbers = (e: React.FormEvent) => {
    e.preventDefault();
    updateCallRailConfig({
      dniEnabled,
      numbers: {
        main: mainNum,
        organic: organicNum,
        google_ads: adsNum,
        direct: directNum,
        local_maps: mapsNum,
      },
    });
  };

  const handleRunRotationTest = () => {
    testNumberRotation(testSource);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
          <PhoneCall className="w-3.5 h-3.5" />
          CallRail Dynamic Number Insertion (DNI)
        </div>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
          Call Tracking & Dynamic Phone Number Pool
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Dynamically swaps public website phone numbers based on traffic referral sources (Organic, Google Ads PPC, Direct).
        </p>
      </div>

      {/* Provider Status Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-serif font-bold text-base text-slate-900">
              Provider: {callRailConfig.provider}
            </h3>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Configured & Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tracking code snippet active on all 1,284 programmatic practice area URLs.
          </p>
        </div>

        <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 cursor-pointer">
          <input
            type="checkbox"
            checked={dniEnabled}
            onChange={(e) => setDniEnabled(e.target.checked)}
            className="rounded text-blue-600"
          />
          <span>Dynamic Number Insertion: {dniEnabled ? 'Enabled' : 'Disabled'}</span>
        </label>
      </div>

      {/* Interactive Testing Workbench */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-md space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="font-serif font-bold text-base text-white">
              Dynamic Number Insertion Test Simulator
            </h3>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            Active Display: <strong className="text-amber-400 font-mono text-xs">{currentPhoneNumber}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">
              Simulate Inbound Traffic Source:
            </label>
            <select
              value={testSource}
              onChange={(e) => setTestSource(e.target.value as TrafficSource)}
              className="w-full p-2.5 bg-slate-950 text-white border border-slate-700 rounded-lg text-xs"
            >
              <option value="organic">Organic Search (Google SERP)</option>
              <option value="google_ads">Google Ads (PPC Campaign)</option>
              <option value="direct">Direct Traffic / Referral</option>
              <option value="local_maps">Google Local Maps / GMB</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">
              Mapped CallRail Tracking Pool Number:
            </label>
            <div className="p-2.5 bg-slate-950 border border-slate-700 rounded-lg font-mono text-sm text-amber-400 font-bold">
              {callRailConfig.numbers[testSource]}
            </div>
          </div>

          <div>
            <button
              onClick={handleRunRotationTest}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow"
            >
              <RotateCw className="w-4 h-4" />
              <span>Test Number Rotation</span>
            </button>
          </div>
        </div>

        <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>
            Simulates a visitor landing from <strong>{testSource.replace('_', ' ').toUpperCase()}</strong>. Changes header phone, hero CTA, and sticky bottom bar.
          </span>
          <span className="text-emerald-400 font-mono">No latency: &lt;50ms</span>
        </div>
      </div>

      {/* Number Pool Configuration Form */}
      <form onSubmit={handleSaveNumbers} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="font-serif font-bold text-base text-slate-900 pb-3 border-b border-slate-200">
          Tracking Phone Numbers Configuration
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Main Office Fallback Number
            </label>
            <input
              type="text"
              value={mainNum}
              onChange={(e) => setMainNum(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Organic Search Inbound Pool
            </label>
            <input
              type="text"
              value={organicNum}
              onChange={(e) => setOrganicNum(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Google Ads (PPC) Inbound Pool
            </label>
            <input
              type="text"
              value={adsNum}
              onChange={(e) => setAdsNum(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Direct / Offline Referral Pool
            </label>
            <input
              type="text"
              value={directNum}
              onChange={(e) => setDirectNum(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-colors shadow"
          >
            Save Call Tracking Settings
          </button>
        </div>
      </form>
    </div>
  );
}
