'use client';

import React from 'react';
import { useApp } from '@/lib/context';
import {
  Files,
  CheckCircle2,
  Clock,
  AlertCircle,
  MapPin,
  Scale,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  Eye,
  FileEdit,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export default function DashboardView() {
  const {
    pages,
    cities,
    practiceAreas,
    setAdminTab,
    setSelectedPageId,
    setAppMode,
    setPublicRoute,
    updatePageStatus,
  } = useApp();

  const totalPagesCount = 1284 + (pages.length - 8);
  const publishedCount = 1102;
  const draftsCount = 126 + pages.filter((p) => p.status === 'draft').length - 1;
  const reviewCount = 56 + pages.filter((p) => p.status === 'review').length - 2;

  const handlePreviewPage = (pageId: string) => {
    setSelectedPageId(pageId);
    setAppMode('public');
    setPublicRoute('page');
  };

  const handleEditPage = (pageId: string) => {
    setSelectedPageId(pageId);
    setAdminTab('page-editor');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Platform Header / Agency Scalability Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl p-6 border border-slate-700/80 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Programmatic SEO Scaling Engine · Harrison & Cole
            </div>
            <h1 className="text-2xl font-serif font-bold text-white tracking-tight">
              Law Firm Page Generation & Performance
            </h1>
            <p className="mt-1 text-xs text-slate-300 max-w-2xl leading-relaxed">
              Automating local practice area clusters across Greater Houston and Texas. Expanded from 15 initial foundation pages to over 1,280 indexed URLs with automated Surfer SEO NLP scoring.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setAdminTab('generate')}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-lg transition-colors shadow flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Page Wizard</span>
            </button>
            <button
              onClick={() => setAdminTab('scalability')}
              className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-medium text-xs rounded-lg transition-colors"
            >
              Scale Calculator
            </button>
          </div>
        </div>
      </div>

      {/* 6 KEY METRIC CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Pages */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium text-slate-600">Total Pages</span>
            <Files className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-serif font-bold text-slate-900 tabular-nums">
            {totalPagesCount.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" />
            <span>Target: 2,000</span>
          </div>
        </div>

        {/* Published */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium text-slate-600">Published</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-serif font-bold text-slate-900 tabular-nums">
            {publishedCount.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Live in Google Index</div>
        </div>

        {/* Drafts */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium text-slate-600">Drafts</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-serif font-bold text-slate-900 tabular-nums">
            {draftsCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Awaiting batch push</div>
        </div>

        {/* Pending Review */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium text-slate-600">Pending Review</span>
            <AlertCircle className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-serif font-bold text-slate-900 tabular-nums">
            {reviewCount}
          </div>
          <div className="text-[11px] text-blue-600 font-medium mt-1">
            <button onClick={() => setAdminTab('review-queue')} className="hover:underline">
              Review Queue →
            </button>
          </div>
        </div>

        {/* Active Cities */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium text-slate-600">Cities</span>
            <MapPin className="w-4 h-4 text-slate-600" />
          </div>
          <div className="text-2xl font-serif font-bold text-slate-900 tabular-nums">
            {cities.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Greater Texas Metro</div>
        </div>

        {/* Practice Areas */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium text-slate-600">Practice Areas</span>
            <Scale className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-2xl font-serif font-bold text-slate-900 tabular-nums">
            74
          </div>
          <div className="text-[11px] text-slate-500 mt-1">15 Primary Hubs</div>
        </div>
      </div>

      {/* PAGE GROWTH VISUALIZATION (From 15 to 2,000+ pages) */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-serif font-bold text-slate-900">
              Programmatic Page Growth Curve
            </h2>
            <p className="text-xs text-slate-500">
              Agency roadmap: Expanding from initial 15 baseline pages toward the 2,000 page milestone.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" />
              Indexed Pages
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-3 h-3 rounded-full bg-slate-200 inline-block" />
              Projected (2,000)
            </span>
          </div>
        </div>

        {/* Custom SVG Growth Chart */}
        <div className="h-44 w-full relative pt-2">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 800 140" preserveAspectRatio="none">
            <defs>
              <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            <line x1="0" y1="20" x2="800" y2="20" stroke="#f1f5f9" strokeDasharray="4" />
            <line x1="0" y1="60" x2="800" y2="60" stroke="#f1f5f9" strokeDasharray="4" />
            <line x1="0" y1="100" x2="800" y2="100" stroke="#f1f5f9" strokeDasharray="4" />
            <line x1="0" y1="130" x2="800" y2="130" stroke="#e2e8f0" />

            {/* Area Fill */}
            <path
              d="M 20 128 Q 150 120 280 90 T 520 40 T 700 24 L 700 130 L 20 130 Z"
              fill="url(#growthGradient)"
            />

            {/* Projected dotted line */}
            <path
              d="M 520 40 Q 640 20 780 10"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="4"
            />

            {/* Actual line */}
            <path
              d="M 20 128 Q 150 120 280 90 T 520 40"
              fill="none"
              stroke="#2563eb"
              strokeWidth="3.5"
            />

            {/* Data Points */}
            <circle cx="20" cy="128" r="4" fill="#1e293b" />
            <circle cx="280" cy="90" r="4" fill="#2563eb" />
            <circle cx="400" cy="65" r="4" fill="#2563eb" />
            <circle cx="520" cy="40" r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
            <circle cx="780" cy="10" r="4" fill="#94a3b8" stroke="#ffffff" strokeWidth="2" />
          </svg>

          {/* Labels */}
          <div className="flex justify-between text-[11px] text-slate-500 pt-2 font-mono">
            <span>Month 1 (15 pages)</span>
            <span>Month 3 (450 pages)</span>
            <span>Month 6 (900 pages)</span>
            <span className="font-bold text-blue-600">Current (1,284 pages)</span>
            <span className="text-slate-400">Target (2,000 pages)</span>
          </div>
        </div>

        {/* Scalability Callout */}
        <div className="pt-2 flex flex-wrap items-center justify-between text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
          <div>
            <strong>Agency Velocity:</strong> Current production average is <strong>50 programmatic pages / week</strong>. Surfer SEO content automation eliminates 90% of manual WordPress data entry.
          </div>
          <button
            onClick={() => setAdminTab('scalability')}
            className="text-blue-600 font-semibold hover:underline"
          >
            Calculate 2,000 page expansion →
          </button>
        </div>
      </div>

      {/* RECENT PAGES TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-serif font-bold text-slate-900 text-base">
              Recent Programmatic Pages
            </h3>
            <p className="text-xs text-slate-500">
              Showing active cluster pages with real-time Surfer SEO scores and indexing status.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAdminTab('pages')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800"
            >
              View All 1,284 Pages →
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Page Title / URL</th>
                <th className="px-4 py-3">Practice Area</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3 text-center">Surfer Score</th>
                <th className="px-4 py-3 text-center">Word Count</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {pages.slice(0, 7).map((p) => {
                const scoreColor =
                  p.seoScore >= 85
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                    : p.seoScore >= 75
                    ? 'text-blue-700 bg-blue-50 border-blue-200'
                    : 'text-amber-700 bg-amber-50 border-amber-200';

                const statusBadge =
                  p.status === 'published'
                    ? 'text-emerald-700 bg-emerald-50'
                    : p.status === 'review'
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-amber-700 bg-amber-50';

                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900">{p.h1}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{p.url}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{p.practiceName}</td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-slate-800">{p.cityName}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-block font-mono font-bold text-xs px-2 py-0.5 rounded border ${scoreColor}`}
                      >
                        {p.seoScore}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center font-mono tabular-nums text-slate-600">
                      {p.wordCount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded capitalize ${statusBadge}`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handlePreviewPage(p.id)}
                          className="p-1 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100"
                          title="Preview on Public Website"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleEditPage(p.id)}
                          className="p-1 text-slate-500 hover:text-blue-600 rounded hover:bg-slate-100"
                          title="Edit in Page Editor"
                        >
                          <FileEdit className="w-3.5 h-3.5" />
                        </button>
                        {p.status !== 'published' && (
                          <button
                            onClick={() => updatePageStatus(p.id, 'published')}
                            className="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-semibold"
                          >
                            Publish
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
