'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import {
  LayoutTemplate,
  ArrowUp,
  ArrowDown,
  Eye,
  CheckCircle2,
  Sparkles,
  Layers,
  Settings2,
  Lock,
} from 'lucide-react';

export default function TemplatesView() {
  const {
    templateSections,
    toggleTemplateSection,
    reorderTemplateSection,
    setAdminTab,
    setAppMode,
    setPublicRoute,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'dynamic' | 'global'>('all');

  const filteredSections = templateSections.filter((s) => {
    if (activeTab === 'dynamic') return s.type === 'dynamic';
    if (activeTab === 'global') return s.type === 'global';
    return true;
  });

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <LayoutTemplate className="w-3.5 h-3.5" />
            Template Architecture
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
            Practice Area + City Template Builder
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Clearly distinguishes DYNAMIC algorithmic content from GLOBAL / REUSABLE cookie-cutter blocks across 1,246 live pages.
          </p>
        </div>

        <button
          onClick={() => {
            setAppMode('public');
            setPublicRoute('page');
          }}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Live Template Preview</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg max-w-sm">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'all'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All Sections ({templateSections.length})
        </button>
        <button
          onClick={() => setActiveTab('dynamic')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'dynamic'
              ? 'bg-white text-blue-700 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Dynamic ({templateSections.filter((s) => s.type === 'dynamic').length})
        </button>
        <button
          onClick={() => setActiveTab('global')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'global'
              ? 'bg-white text-amber-700 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Global Cookie-Cutter (3)
        </button>
      </div>

      {/* Section List */}
      <div className="space-y-3">
        {filteredSections.map((sec, idx) => {
          const isGlobal = sec.type === 'global';

          return (
            <div
              key={sec.id}
              className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                !sec.enabled
                  ? 'bg-slate-50/50 border-slate-200 opacity-60'
                  : isGlobal
                  ? 'bg-amber-50/30 border-amber-200 shadow-xs'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-start sm:items-center gap-3">
                <span className="font-mono text-xs font-bold text-slate-400 w-6 text-center">
                  #{sec.order}
                </span>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">
                      {sec.name}
                    </span>

                    {isGlobal ? (
                      <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 font-bold text-[10px] px-2 py-0.5 rounded border border-amber-300">
                        <Lock className="w-2.5 h-2.5" />
                        GLOBAL / REUSABLE BLOCK
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-900 font-bold text-[10px] px-2 py-0.5 rounded border border-blue-200">
                        <Sparkles className="w-2.5 h-2.5 text-blue-600" />
                        DYNAMIC SECTION
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-xl">
                    {sec.description}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  onClick={() => toggleTemplateSection(sec.id)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    sec.enabled
                      ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                  }`}
                >
                  {sec.enabled ? 'Enabled' : 'Disabled'}
                </button>

                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => reorderTemplateSection(sec.id, 'up')}
                    disabled={sec.order === 1}
                    className="p-1.5 hover:bg-slate-100 text-slate-600 disabled:opacity-30"
                    title="Move Section Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => reorderTemplateSection(sec.id, 'down')}
                    disabled={sec.order === templateSections.length}
                    className="p-1.5 hover:bg-slate-100 text-slate-600 disabled:opacity-30 border-l border-slate-200"
                    title="Move Section Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {isGlobal && (
                  <button
                    onClick={() => setAdminTab('global-sections')}
                    className="px-2.5 py-1 text-amber-800 hover:bg-amber-100 border border-amber-300 rounded text-xs font-medium"
                  >
                    Edit Master
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
