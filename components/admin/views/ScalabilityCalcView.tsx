'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import {
  Calculator,
  Sparkles,
  TrendingUp,
  Clock,
  DollarSign,
  ArrowRight,
  Layers,
  CheckCircle2,
} from 'lucide-react';

export default function ScalabilityCalcView() {
  const { setAdminTab } = useApp();

  const [practiceAreasCount, setPracticeAreasCount] = useState(100);
  const [citiesCount, setCitiesCount] = useState(20);

  const potentialPages = practiceAreasCount * citiesCount;

  // Traditional manual build vs Programmatic automated build metrics
  // Assume agency standard: 50 pages / week manual WordPress development
  const manualWeeks = Math.ceil(potentialPages / 50);
  const manualDevCost = potentialPages * 180; // $180 / manual page copywriting + design + internal linking
  const automatedTimeMinutes = 15; // 15 mins to run batch generator & approve

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
          <Calculator className="w-3.5 h-3.5" />
          Exponential Growth Modeling
        </div>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
          Programmatic SEO Scalability Calculator
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Experience the mathematical advantage of algorithmic page generation over manual WordPress page building.
        </p>
      </div>

      {/* CORE CONCEPT BANNER (Requested in UX rules) */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-md">
        <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
          The Programmatic Architecture Advantage
        </div>
        <h2 className="text-lg sm:text-xl font-serif font-bold text-white">
          Instead of manually building {potentialPages.toLocaleString()} individual pages:
        </h2>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
            <div className="font-mono text-amber-400 font-bold text-base">{citiesCount}</div>
            <div className="text-slate-300 mt-0.5">Cities Defined</div>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
            <div className="font-mono text-amber-400 font-bold text-base">{practiceAreasCount}</div>
            <div className="text-slate-300 mt-0.5">Practice Disciplines</div>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
            <div className="font-mono text-emerald-400 font-bold text-base">1 Master</div>
            <div className="text-slate-300 mt-0.5">Tested Template</div>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
            <div className="font-mono text-blue-400 font-bold text-base">Surfer NLP</div>
            <div className="text-slate-300 mt-0.5">SEO Rule Engine</div>
          </div>
        </div>
      </div>

      {/* Interactive Controls & Output */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sliders Input */}
        <div className="md:col-span-6 bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-base text-slate-900 pb-3 border-b border-slate-200">
            Multiplier Inputs
          </h3>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Target Practice Areas & Sub-Specialties</span>
              <span className="font-mono text-blue-600 font-bold text-sm">{practiceAreasCount}</span>
            </div>
            <input
              type="range"
              min="5"
              max="150"
              step="5"
              value={practiceAreasCount}
              onChange={(e) => setPracticeAreasCount(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>5 disciplines</span>
              <span>74 (current)</span>
              <span>150 max</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Target Municipalities / Texas Cities</span>
              <span className="font-mono text-blue-600 font-bold text-sm">{citiesCount}</span>
            </div>
            <input
              type="range"
              min="2"
              max="50"
              step="1"
              value={citiesCount}
              onChange={(e) => setCitiesCount(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>2 cities</span>
              <span>20 (current)</span>
              <span>50 cities</span>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="pt-3 border-t border-slate-200">
            <div className="text-xs font-semibold text-slate-600 mb-2">Preset Agency Targets:</div>
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => {
                  setPracticeAreasCount(50);
                  setCitiesCount(10);
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium transition-colors"
              >
                50 × 10 = 500 Pages
              </button>
              <button
                onClick={() => {
                  setPracticeAreasCount(74);
                  setCitiesCount(20);
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium transition-colors"
              >
                74 × 20 = 1,480 Pages
              </button>
              <button
                onClick={() => {
                  setPracticeAreasCount(100);
                  setCitiesCount(20);
                }}
                className="px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg font-bold transition-colors"
              >
                100 × 20 = 2,000 Pages (Goal)
              </button>
            </div>
          </div>
        </div>

        {/* Calculated Results */}
        <div className="md:col-span-6 bg-slate-50 rounded-xl border border-slate-200 p-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Output Capacity
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-serif font-bold text-slate-900 tabular-nums font-mono">
                {potentialPages.toLocaleString()}
              </span>
              <span className="text-sm text-slate-500 font-medium">Unique Indexed Landing Pages</span>
            </div>
          </div>

          {/* Side-by-side comparison */}
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900">Traditional Agency Model</span>
                <div className="text-[11px] text-slate-500">Manual WordPress building (~50 pages / week)</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-rose-700 font-mono text-sm">{manualWeeks} Weeks</div>
                <div className="text-[10px] text-slate-400">~${manualDevCost.toLocaleString()} in labor</div>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-emerald-900">LexScale Programmatic Engine</span>
                <div className="text-[11px] text-emerald-700">Automated Surfer generation & schema</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-emerald-700 font-mono text-sm">~{automatedTimeMinutes} Minutes</div>
                <div className="text-[10px] text-emerald-600 font-medium">99.4% Time Reduction</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setAdminTab('generate')}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow"
          >
            <span>Launch Generator for {potentialPages.toLocaleString()} Pages</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
