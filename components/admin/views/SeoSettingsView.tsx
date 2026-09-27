'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import {
  Settings2,
  CheckCircle2,
  Save,
  Globe,
  Sliders,
  Sparkles,
} from 'lucide-react';

export default function SeoSettingsView() {
  const { seoPatterns, addToast } = useApp();

  const [metaTitle, setMetaTitle] = useState(seoPatterns.metaTitlePattern);
  const [metaDesc, setMetaDesc] = useState(seoPatterns.metaDescriptionPattern);
  const [urlPattern, setUrlPattern] = useState(seoPatterns.urlPattern);
  const [h1Pattern, setH1Pattern] = useState(seoPatterns.h1Pattern);
  const [canonicalBase, setCanonicalBase] = useState(seoPatterns.canonicalBase);
  const [robotsIndex, setRobotsIndex] = useState(seoPatterns.robotsIndex);
  const [robotsFollow, setRobotsFollow] = useState(seoPatterns.robotsFollow);
  const [enableBreadcrumbs, setEnableBreadcrumbs] = useState(seoPatterns.enableBreadcrumbs);
  const [openGraphEnabled, setOpenGraphEnabled] = useState(seoPatterns.openGraphEnabled);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'SEO Formula Patterns Saved',
      description: 'Pattern rules applied across 1,284 dynamic URL generators.',
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
          <Settings2 className="w-3.5 h-3.5" />
          Pattern Engine
        </div>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
          Global SEO & URL Architecture Patterns
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Define programmatic variable templates using {'{{city}}'}, {'{{practice_area}}'}, {'{{county}}'}, and {'{{phone}}'}.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6 text-xs">
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-base text-slate-900 pb-2 border-b border-slate-200">
            Metadata Template Patterns
          </h3>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Meta Title Pattern
            </label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <span className="text-[10px] text-slate-400">
              Resolved Example: <em>Houston Car Accident Lawyer | Harrison & Cole Injury Attorneys</em>
            </span>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Meta Description Pattern
            </label>
            <textarea
              rows={2}
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs leading-relaxed"
            />
            <span className="text-[10px] text-slate-400">
              Target length: 155–160 characters with CTA and phone insert
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                URL Pattern Formula
              </label>
              <input
                type="text"
                value={urlPattern}
                onChange={(e) => setUrlPattern(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs"
              />
              <span className="text-[10px] text-slate-400">
                Example: <code>/houston/car-accident-lawyer/</code>
              </span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                H1 Headline Formula
              </label>
              <input
                type="text"
                value={h1Pattern}
                onChange={(e) => setH1Pattern(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs"
              />
              <span className="text-[10px] text-slate-400">
                Example: <code>Houston Car Accident Lawyer</code>
              </span>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Canonical Base Domain
            </label>
            <input
              type="text"
              value={canonicalBase}
              onChange={(e) => setCanonicalBase(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs"
            />
          </div>
        </div>

        {/* Technical Crawling & Indexing Switches */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <h3 className="font-serif font-bold text-base text-slate-900 pb-2 border-b border-slate-200">
            Crawling, Robots & Social Tags
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={robotsIndex}
                onChange={(e) => setRobotsIndex(e.target.checked)}
                className="rounded text-blue-600"
              />
              <div>
                <span className="font-semibold text-slate-800 block">Robots: Index</span>
                <span className="text-[10px] text-slate-500">Allow search engines to index generated pages</span>
              </div>
            </label>

            <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={robotsFollow}
                onChange={(e) => setRobotsFollow(e.target.checked)}
                className="rounded text-blue-600"
              />
              <div>
                <span className="font-semibold text-slate-800 block">Robots: Follow</span>
                <span className="text-[10px] text-slate-500">Pass PageRank across internal semantic link silos</span>
              </div>
            </label>

            <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={enableBreadcrumbs}
                onChange={(e) => setEnableBreadcrumbs(e.target.checked)}
                className="rounded text-blue-600"
              />
              <div>
                <span className="font-semibold text-slate-800 block">BreadcrumbList Schema</span>
                <span className="text-[10px] text-slate-500">Emit structured breadcrumb trail in DOM</span>
              </div>
            </label>

            <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={openGraphEnabled}
                onChange={(e) => setOpenGraphEnabled(e.target.checked)}
                className="rounded text-blue-600"
              />
              <div>
                <span className="font-semibold text-slate-800 block">Open Graph Meta Cards</span>
                <span className="text-[10px] text-slate-500">Generate og:title, og:description & social tags</span>
              </div>
            </label>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow"
          >
            Save All SEO Patterns
          </button>
        </div>
      </form>
    </div>
  );
}
