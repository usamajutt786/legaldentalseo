'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import {
  LineChart,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Search,
  Check,
  TrendingUp,
  FileText,
  AlertCircle,
} from 'lucide-react';

export default function SurferSeoView() {
  const {
    surferConnected,
    surferApiKey,
    setSurferApiKey,
    testSurferConnection,
  } = useApp();

  const [workspaceOrg, setWorkspaceOrg] = useState('Harrison & Cole Legal Agency');
  const [defaultCountry, setDefaultCountry] = useState('United States (US)');
  const [defaultLang, setDefaultLang] = useState('English (en)');
  const [isTesting, setIsTesting] = useState(false);

  // Keyword workbench
  const [targetKeyword, setTargetKeyword] = useState('Houston Car Accident Lawyer');

  const relatedKeywords = [
    { term: 'Houston auto accident attorney', density: '14/16', status: 'optimal' },
    { term: 'car crash lawyer Houston', density: '8/10', status: 'optimal' },
    { term: 'personal injury attorney Houston', density: '12/12', status: 'optimal' },
    { term: 'accident claim lawyer', density: '6/8', status: 'optimal' },
    { term: 'Texas statute of limitations', density: '5/6', status: 'optimal' },
    { term: 'modified comparative fault', density: '3/4', status: 'optimal' },
    { term: 'Harris County civil court', density: '4/4', status: 'optimal' },
  ];

  const suggestedHeadings = [
    'H1: Houston Car Accident Lawyer | Harrison & Cole',
    'H2: Understanding Texas Modified Comparative Negligence (§ 33.001)',
    'H2: Common Accident Corridors in Harris County: I-45, Loop 610 & I-10',
    'H2: Types of Catastrophic Compensation You Can Recover',
    'H2: What to Do Immediately Following a Motor Vehicle Collision in Houston',
    'H2: Frequently Asked Questions About Houston Auto Accident Claims',
  ];

  const handleTest = async () => {
    setIsTesting(true);
    await testSurferConnection();
    setIsTesting(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
          <LineChart className="w-3.5 h-3.5" />
          NLP Content Intelligence Engine
        </div>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
          Surfer SEO Integration & Keyword Workbench
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Automates real-time Content Score calculation, NLP keyword frequency extraction, and competitor heading architecture for all generated practice pages.
        </p>
      </div>

      {/* API Configuration Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <h3 className="font-serif font-bold text-base text-slate-900">
              Surfer SEO API Credentials
            </h3>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Connected
            </span>
          </div>

          <button
            onClick={handleTest}
            disabled={isTesting}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 disabled:opacity-50 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
            <span>{isTesting ? 'Testing Connection...' : 'Test Connection'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Surfer API Key
            </label>
            <input
              type="password"
              value={surferApiKey}
              onChange={(e) => setSurferApiKey(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Workspace / Organization
            </label>
            <input
              type="text"
              value={workspaceOrg}
              onChange={(e) => setWorkspaceOrg(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Default Country Target
            </label>
            <select
              value={defaultCountry}
              onChange={(e) => setDefaultCountry(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
            >
              <option>United States (US)</option>
              <option>Canada (CA)</option>
              <option>United Kingdom (UK)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Default Language
            </label>
            <select
              value={defaultLang}
              onChange={(e) => setDefaultLang(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
            >
              <option>English (en)</option>
              <option>Spanish (es)</option>
            </select>
          </div>
        </div>
      </div>

      {/* KEYWORD ANALYSIS EXAMPLE BENCHMARK */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
          <div>
            <span className="text-[11px] font-semibold text-blue-700 uppercase">
              Live SERP Content Audit
            </span>
            <div className="text-lg font-serif font-bold text-slate-900 mt-0.5">
              Target Keyword: {targetKeyword}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] text-slate-400 font-mono">Surfer Content Score</div>
              <div className="text-2xl font-serif font-bold text-emerald-700 tabular-nums">
                82 <span className="text-xs text-slate-400 font-normal">/ 100</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Metric Gauges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-slate-500 text-xs">Recommended Word Count</div>
            <div className="text-lg font-mono font-bold text-slate-900 mt-1">
              2,100 – 2,500
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-1">
              ✓ Page draft is currently 2,340 words
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-slate-500 text-xs">Headings Structure</div>
            <div className="text-lg font-mono font-bold text-slate-900 mt-1">
              1 H1 · 7 H2 · 12 H3
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-1">
              ✓ Aligned with top 3 Google SERP competitors
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-slate-500 text-xs">NLP Entity Coverage</div>
            <div className="text-lg font-mono font-bold text-slate-900 mt-1">
              94% Match
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-1">
              ✓ Harris County & Texas legal statutes verified
            </div>
          </div>
        </div>

        {/* Suggested Headings and Related Keywords */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Related NLP Keywords */}
          <div>
            <h4 className="font-serif font-bold text-slate-900 text-sm mb-3">
              Related High-Value NLP Entities
            </h4>
            <div className="space-y-2">
              {relatedKeywords.map((kw, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg border border-slate-200 flex items-center justify-between text-xs bg-slate-50/50"
                >
                  <span className="font-medium text-slate-800">{kw.term}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-500">{kw.density}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                      Optimal
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Headings */}
          <div>
            <h4 className="font-serif font-bold text-slate-900 text-sm mb-3">
              Surfer Recommended Headings Architecture
            </h4>
            <div className="space-y-2">
              {suggestedHeadings.map((h, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg border border-slate-200 text-xs text-slate-700 font-medium bg-slate-50/50 leading-relaxed"
                >
                  {h}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
