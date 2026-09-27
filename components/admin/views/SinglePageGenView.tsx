'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import {
  Sparkles,
  ArrowRight,
  Eye,
  FileEdit,
  Code2,
  Link2,
  CheckCircle2,
  LineChart,
} from 'lucide-react';
import { GeneratedPage } from '@/lib/types';

export default function SinglePageGenView() {
  const {
    cities,
    practiceAreas,
    generateSinglePage,
    setSelectedPageId,
    setAdminTab,
    setAppMode,
    setPublicRoute,
  } = useApp();

  const [selectedCityId, setSelectedCityId] = useState('houston');
  const [selectedPracticeId, setSelectedPracticeId] = useState('car-accident');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPage, setGeneratedPage] = useState<GeneratedPage | null>(null);

  const cityObj = cities.find((c) => c.id === selectedCityId) || cities[0];
  const practiceObj = practiceAreas.find((p) => p.id === selectedPracticeId) || practiceAreas[0];

  const primaryKeyword = `${cityObj.name} ${practiceObj.name}`;
  const urlPreview = `/${cityObj.slug}/${practiceObj.slug}/`;

  const handleGenerate = async () => {
    setIsGenerating(true);
    setTimeout(async () => {
      const page = await generateSinglePage(selectedCityId, selectedPracticeId);
      setGeneratedPage(page);
      setIsGenerating(false);
    }, 800);
  };

  const handlePreview = () => {
    if (!generatedPage) return;
    setSelectedPageId(generatedPage.id);
    setAppMode('public');
    setPublicRoute('page');
  };

  const handleEdit = () => {
    if (!generatedPage) return;
    setSelectedPageId(generatedPage.id);
    setAdminTab('page-editor');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          Single-URL Rapid Workflow
        </div>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
          Single Page Programmatic Generator
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Quickly generate and inspect an individual city and practice area combination.
        </p>

        {/* Input Form */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select City
            </label>
            <select
              value={selectedCityId}
              onChange={(e) => setSelectedCityId(e.target.value)}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.county})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Practice Area
            </label>
            <select
              value={selectedPracticeId}
              onChange={(e) => setSelectedPracticeId(e.target.value)}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {practiceAreas.map((pa) => (
                <option key={pa.id} value={pa.id}>
                  {pa.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Real-time Target Preview */}
        <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-wrap items-center justify-between text-xs gap-3">
          <div>
            <span className="text-slate-400">Primary Target Keyword: </span>
            <strong className="text-slate-900">{primaryKeyword}</strong>
          </div>
          <div>
            <span className="text-slate-400">Target URL: </span>
            <code className="text-blue-700 font-mono font-semibold">{urlPreview}</code>
          </div>
        </div>

        <div className="mt-5">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow"
          >
            {isGenerating ? (
              <span>Running Surfer SEO Engine & Compiling Page...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Generate {primaryKeyword} Page</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* GENERATED PAGE INSPECTION PANEL */}
      {generatedPage && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6 animate-in fade-in">
          <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-200 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-700 bg-emerald-50 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                  Generated Draft
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Score: {generatedPage.seoScore}/100
                </span>
              </div>
              <h2 className="text-lg font-serif font-bold text-slate-900 mt-1">
                {generatedPage.h1}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePreview}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Live Preview</span>
              </button>
              <button
                onClick={handleEdit}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <FileEdit className="w-3.5 h-3.5" />
                <span>Open in Editor</span>
              </button>
            </div>
          </div>

          {/* 4 Detail Tabs/Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. SEO Metadata Details */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <LineChart className="w-3.5 h-3.5 text-blue-600" />
                SEO Metadata & Indexing
              </div>
              <div className="text-xs space-y-2">
                <div>
                  <span className="text-slate-400 text-[11px]">Meta Title:</span>
                  <div className="font-semibold text-slate-800 mt-0.5">
                    {generatedPage.metaTitle}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px]">Meta Description:</span>
                  <div className="text-slate-600 mt-0.5 leading-relaxed">
                    {generatedPage.metaDescription}
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex justify-between">
                  <span>Canonical: {generatedPage.url}</span>
                  <span>Robots: index, follow</span>
                </div>
              </div>
            </div>

            {/* 2. Schema (JSON-LD) Preview */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-emerald-600" />
                Structured Data (JSON-LD) Preview
              </div>
              <pre className="p-3 bg-slate-900 text-amber-300 font-mono text-[10px] rounded-lg overflow-x-auto leading-relaxed max-h-36">
{`{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Harrison & Cole - ${generatedPage.h1}",
  "url": "https://www.harrisoncoleinjurylaw.com${generatedPage.url}",
  "areaServed": "${generatedPage.cityName}, TX",
  "priceRange": "$$$$",
  "telephone": "(713) 555-0100"
}`}
              </pre>
            </div>

            {/* 3. Content Sample */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 md:col-span-2">
              <div className="text-xs font-bold text-slate-900">
                Generated Localized Prose Sample
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {generatedPage.introText}
              </p>
              <div className="pt-2 text-[11px] text-slate-500 font-mono">
                Word Count: {generatedPage.wordCount} words · Local Court: {generatedPage.localCourthouse}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
