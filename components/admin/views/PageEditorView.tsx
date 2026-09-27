'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/lib/context';
import {
  FileEdit,
  Eye,
  CheckCircle2,
  Sparkles,
  Save,
  RotateCcw,
  Copy,
  Layers,
  ChevronDown,
  ArrowRight,
  Send,
} from 'lucide-react';
import { GeneratedPage } from '@/lib/types';

interface PageEditorFormProps {
  page: GeneratedPage;
}

function PageEditorForm({ page }: PageEditorFormProps) {
  const {
    updatePageContent,
    updatePageStatus,
    regeneratePageContent,
    setSelectedPageId,
    setAppMode,
    setPublicRoute,
    globalSections,
    addToast,
    pages,
  } = useApp();

  const [activeSection, setActiveSection] = useState<'hero' | 'intro' | 'main' | 'common1' | 'common2' | 'common3' | 'faqs' | 'related' | 'cta'>('hero');

  // Form State initialized directly from page prop
  const [h1, setH1] = useState(page.h1);
  const [introText, setIntroText] = useState(page.introText);
  const [mainContentText, setMainContentText] = useState(page.mainContentText);
  const [metaTitle, setMetaTitle] = useState(page.metaTitle);
  const [metaDescription, setMetaDescription] = useState(page.metaDescription);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleSave = () => {
    updatePageContent(page.id, {
      h1,
      introText,
      mainContentText,
      metaTitle,
      metaDescription,
    });
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    await regeneratePageContent(page.id);
    setIsRegenerating(false);
  };

  const handleDuplicate = () => {
    addToast({
      type: 'info',
      title: 'Page Duplicated',
      description: `Cloned "${page.h1}" into new draft template.`,
    });
  };

  const handlePreview = () => {
    setSelectedPageId(page.id);
    setAppMode('public');
    setPublicRoute('page');
  };

  return (
    <div className="space-y-4">
      {/* Top Bar with Page Selector & Status Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div>
            <span className="text-[10px] text-slate-400 font-mono">Editing Page:</span>
            <select
              value={page.id}
              onChange={(e) => setSelectedPageId(e.target.value)}
              className="block font-serif font-bold text-slate-900 text-sm border-none bg-transparent focus:ring-0 cursor-pointer p-0"
            >
              {pages.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.h1} ({p.cityName}) - [{p.status.toUpperCase()}]
                </option>
              ))}
            </select>
          </div>

          <span
            className={`text-xs px-2 py-0.5 rounded font-semibold capitalize ${
              page.status === 'published'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : page.status === 'review'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}
          >
            {page.status}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors flex items-center gap-1.5"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>Regenerate Mock Content</span>
          </button>

          <button
            onClick={handleDuplicate}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors flex items-center gap-1.5"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Duplicate</span>
          </button>

          <button
            onClick={handlePreview}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </button>

          <button
            onClick={() => updatePageStatus(page.id, 'review')}
            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg font-medium transition-colors flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send for Review</span>
          </button>

          <button
            onClick={() => updatePageStatus(page.id, 'published')}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Publish Page</span>
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold transition-colors flex items-center gap-1.5 shadow"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>
        </div>
      </div>

      {/* 3-Column Professional Editor Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Page Structure (Sections Navigator) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-2 h-fit">
          <div className="text-xs font-bold text-slate-900 mb-2">
            Page Structure (11 Blocks)
          </div>

          {[
            { id: 'hero', label: '1. Hero Section', type: 'dynamic' },
            { id: 'intro', label: '2. Dynamic Introduction', type: 'dynamic' },
            { id: 'main', label: '3. Main Legal Analysis', type: 'dynamic' },
            { id: 'common1', label: '4. Common: Why Choose Us', type: 'global' },
            { id: 'common2', label: '5. Common: Contingency Fee', type: 'global' },
            { id: 'common3', label: '6. Common: 4-Step Protocol', type: 'global' },
            { id: 'faqs', label: '7. Local FAQs', type: 'dynamic' },
            { id: 'related', label: '8. Internal Link Silos', type: 'dynamic' },
            { id: 'cta', label: '9. Conversion Lead CTA', type: 'dynamic' },
          ].map((item) => {
            const isSelected = activeSection === item.id;
            const isGlobal = item.type === 'global';

            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as any)}
                className={`w-full text-left p-2.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : isGlobal
                    ? 'text-amber-800 bg-amber-50/50 hover:bg-amber-100/50'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{item.label}</span>
                {isGlobal && (
                  <span
                    className={`text-[9px] px-1 py-0.5 rounded font-mono ${
                      isSelected ? 'bg-blue-700 text-white' : 'bg-amber-200 text-amber-900'
                    }`}
                  >
                    GLOBAL
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* CENTER COLUMN: Editable Content Area */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h2 className="font-serif font-bold text-base text-slate-900 capitalize">
              Editing: {activeSection.replace('common', 'Global Section ')}
            </h2>
            <span className="text-[11px] text-slate-400">
              Word Count: {page.wordCount} words
            </span>
          </div>

          {activeSection === 'hero' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Primary H1 Headline
                </label>
                <input
                  type="text"
                  value={h1}
                  onChange={(e) => setH1(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg font-serif font-bold text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Supporting Value Proposition
                </label>
                <textarea
                  rows={4}
                  value={introText}
                  onChange={(e) => setIntroText(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs leading-relaxed"
                />
              </div>
            </div>
          )}

          {activeSection === 'intro' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  City Highway & Local Crash Statistics Intro
                </label>
                <textarea
                  rows={8}
                  value={introText}
                  onChange={(e) => setIntroText(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs leading-relaxed"
                />
              </div>
            </div>
          )}

          {activeSection === 'main' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Main Legal Text & Texas Comparative Fault Analysis
                </label>
                <textarea
                  rows={10}
                  value={mainContentText}
                  onChange={(e) => setMainContentText(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs leading-relaxed"
                />
              </div>
            </div>
          )}

          {(activeSection === 'common1' || activeSection === 'common2' || activeSection === 'common3') && (
            <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200 text-xs space-y-3">
              <div className="font-bold text-amber-900 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-amber-700" />
                This is a Global / Reusable Section Block
              </div>
              <p className="text-slate-600 leading-relaxed">
                Edits to this block affect <strong>1,246 live pages</strong> simultaneously. To modify this global section, open the Master Global Section Manager.
              </p>
              <div className="p-3 bg-white rounded-lg border border-slate-200 text-slate-700 font-medium">
                {activeSection === 'common1' && globalSections[0]?.headline}
                {activeSection === 'common2' && globalSections[1]?.headline}
                {activeSection === 'common3' && globalSections[2]?.headline}
              </div>
            </div>
          )}

          {activeSection === 'faqs' && (
            <div className="space-y-3 text-xs">
              <div className="font-semibold text-slate-700">
                Localized Practice Area FAQs ({page.faqList.length} Items)
              </div>
              {page.faqList.map((faq, i) => (
                <div key={i} className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                  <div className="font-bold text-slate-900">{faq.question}</div>
                  <div className="text-slate-600 leading-relaxed">{faq.answer}</div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'related' && (
            <div className="space-y-3 text-xs">
              <div className="font-semibold text-slate-700">
                Automated Internal Link Anchors ({page.internalLinks.length} Links)
              </div>
              {page.internalLinks.map((link) => (
                <div key={link.id} className="p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900">{link.anchorText}</span>
                    <span className="text-slate-400 font-mono text-[10px] ml-2">{link.targetUrl}</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                    Approved
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'cta' && (
            <div className="space-y-3 text-xs">
              <div className="font-semibold text-slate-700">Conversion Lead Capture Form</div>
              <p className="text-slate-500">
                Connected to CallRail Dynamic Number Insertion pool and instant SMS attorney alert dispatch.
              </p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Surfer SEO Panel */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-5 h-fit text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Surfer SEO Audit
            </span>
            <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {page.seoScore} / 100
            </span>
          </div>

          {/* Meta Fields */}
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Meta Title
              </label>
              <textarea
                rows={2}
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg text-xs"
              />
              <span className="text-[10px] text-slate-400 font-mono">
                {metaTitle.length} / 60 characters
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Meta Description
              </label>
              <textarea
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg text-xs leading-relaxed"
              />
              <span className="text-[10px] text-slate-400 font-mono">
                {metaDescription.length} / 160 characters
              </span>
            </div>
          </div>

          {/* NLP Keywords List */}
          <div className="space-y-2 pt-3 border-t border-slate-200">
            <div className="font-semibold text-slate-800 text-[11px]">
              Keyword Optimization Checklist
            </div>
            {page.surferKeywords.map((kw, i) => (
              <div key={i} className="flex items-center justify-between text-[11px] py-1 border-b border-slate-100">
                <span className="text-slate-700 truncate max-w-[140px]">{kw.term}</span>
                <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-1 rounded">
                  {kw.frequency}x ({kw.recommended})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PageEditorView() {
  const { pages, selectedPageId } = useApp();
  const currentPage = pages.find((p) => p.id === selectedPageId) || pages[0];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PageEditorForm key={currentPage.id} page={currentPage} />
    </div>
  );
}
