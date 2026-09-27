'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import {
  Sparkles,
  Check,
  ChevronRight,
  ChevronLeft,
  Scale,
  MapPin,
  LayoutTemplate,
  LineChart,
  Sliders,
  CheckCircle2,
  Loader2,
  Layers,
  ArrowRight,
} from 'lucide-react';

export default function GenerateWizardView() {
  const {
    practiceAreas,
    cities,
    generatePagesBatch,
    setAdminTab,
    setSelectedPageId,
    pages,
  } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);

  // Selections
  const [selectedPracticeIds, setSelectedPracticeIds] = useState<string[]>([
    'car-accident',
    'truck-accident',
    'slip-and-fall',
    'commercial-vehicle',
  ]);
  const [selectedCityIds, setSelectedCityIds] = useState<string[]>([
    'houston',
    'katy',
    'sugar-land',
    'cypress',
    'the-woodlands',
  ]);
  const [selectedTemplate, setSelectedTemplate] = useState('practice-city-master');
  const [seoSource, setSeoSource] = useState<'surfer' | 'manual' | 'existing'>('surfer');
  const [contentSettings, setContentSettings] = useState({
    tone: 'Authoritative Legal & Conversion-Focused',
    wordCount: 2350,
    faqCount: 4,
    includeLocalReferences: true,
    includeAttorneyCta: true,
    includeRelatedPages: true,
  });

  // Generation Simulator state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStage, setGenerationStage] = useState(0);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [generatedCount, setGeneratedCount] = useState(0);

  const stages = [
    'Preparing local keyword clusters and search intent...',
    'Fetching Surfer SEO NLP content recommendations...',
    'Generating city-specific legal content & highway crash statistics...',
    'Creating localized meta titles, descriptions & H1 tags...',
    'Generating JSON-LD LegalService & LocalBusiness schema...',
    'Building automated semantic internal linking architecture...',
    'Compiling drafts & syncing with Editorial Review Queue...',
  ];

  const totalCalculatedPages = selectedPracticeIds.length * selectedCityIds.length;

  const togglePractice = (id: string) => {
    setSelectedPracticeIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleCity = (id: string) => {
    setSelectedCityIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleStartGeneration = async () => {
    setIsGenerating(true);
    setGenerationStage(0);

    // Simulate progress through all 7 stages
    for (let i = 0; i < stages.length; i++) {
      setGenerationStage(i);
      await new Promise((res) => setTimeout(res, 500));
    }

    // Call actual batch generator in context
    const res = await generatePagesBatch(selectedCityIds, selectedPracticeIds, {
      tone: contentSettings.tone,
      wordCount: contentSettings.wordCount,
      faqCount: contentSettings.faqCount,
      includeLocal: contentSettings.includeLocalReferences,
    });

    setIsGenerating(false);
    setGenerationComplete(true);
    setGeneratedCount(res.count || totalCalculatedPages);
  };

  const resetWizard = () => {
    setGenerationComplete(false);
    setCurrentStep(1);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Wizard Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Programmatic SEO Pipeline
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              Bulk Page Generation Wizard
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Combine practice areas and Texas municipalities to generate dozens or hundreds of SEO-optimized pages.
            </p>
          </div>

          {/* Scalability Formula Pill */}
          <div className="bg-slate-900 text-white px-4 py-2 rounded-lg border border-slate-800 text-right shrink-0">
            <div className="text-[10px] text-slate-400 font-mono uppercase">
              Current Calculation
            </div>
            <div className="text-base font-mono font-bold text-amber-400">
              {selectedPracticeIds.length} Practices × {selectedCityIds.length} Cities = {totalCalculatedPages} Pages
            </div>
          </div>
        </div>

        {/* Step Indicator Bar */}
        <div className="mt-8 grid grid-cols-6 gap-2 text-xs">
          {[
            { step: 1, label: '1. Practice Areas' },
            { step: 2, label: '2. Target Cities' },
            { step: 3, label: '3. Template' },
            { step: 4, label: '4. SEO Source' },
            { step: 5, label: '5. Content Rules' },
            { step: 6, label: '6. Review & Run' },
          ].map((s) => {
            const isDone = currentStep > s.step;
            const isCurrent = currentStep === s.step;
            return (
              <button
                key={s.step}
                onClick={() => !isGenerating && !generationComplete && setCurrentStep(s.step)}
                disabled={isGenerating || generationComplete}
                className={`py-2 px-1 text-center border-b-2 font-medium transition-colors text-[11px] truncate ${
                  isCurrent
                    ? 'border-blue-600 text-blue-600 font-bold'
                    : isDone
                    ? 'border-emerald-500 text-emerald-700'
                    : 'border-slate-200 text-slate-400'
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* GENERATION IN PROGRESS MODAL / OVERLAY */}
      {isGenerating && (
        <div className="bg-slate-900 text-white rounded-xl p-8 border border-slate-800 shadow-xl space-y-6 text-center animate-in fade-in">
          <div className="w-14 h-14 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/40 flex items-center justify-center mx-auto">
            <Loader2 className="w-7 h-7 animate-spin" />
          </div>

          <div>
            <h3 className="text-lg font-serif font-bold text-white">
              Generating {totalCalculatedPages} Programmatic Pages...
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Executing algorithmic content generation, schema embedding, and Surfer SEO validation.
            </p>
          </div>

          {/* Stage Progress Log */}
          <div className="max-w-md mx-auto space-y-2 text-left bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs">
            {stages.map((stg, idx) => {
              const isPassed = generationStage > idx;
              const isCurrent = generationStage === idx;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-2.5 transition-colors ${
                    isCurrent
                      ? 'text-amber-400 font-semibold'
                      : isPassed
                      ? 'text-emerald-400'
                      : 'text-slate-600'
                  }`}
                >
                  {isPassed ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 shrink-0 animate-spin text-amber-400" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                  )}
                  <span className="truncate">{stg}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* GENERATION COMPLETE SUCCESS SCREEN */}
      {generationComplete && (
        <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-md text-center space-y-6 animate-in fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-slate-900">
              {generatedCount || totalCalculatedPages} Pages Generated Successfully!
            </h2>
            <p className="text-xs text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
              All city + practice area combinations have been created with Surfer SEO audits, localized court data, schema tags, and internal link silos.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 max-w-lg mx-auto grid grid-cols-3 gap-4 text-xs">
            <div>
              <div className="text-slate-400">Pages Generated</div>
              <div className="text-lg font-bold font-mono text-slate-900">
                {generatedCount || totalCalculatedPages}
              </div>
            </div>
            <div>
              <div className="text-slate-400">Average SEO Score</div>
              <div className="text-lg font-bold font-mono text-emerald-700">86/100</div>
            </div>
            <div>
              <div className="text-slate-400">Initial Status</div>
              <div className="text-lg font-bold text-blue-700">Draft Queue</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setAdminTab('pages')}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow"
            >
              <span>View Generated Pages in Inventory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setAdminTab('review-queue')}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-lg transition-colors"
            >
              Go to Review Queue
            </button>
            <button
              onClick={resetWizard}
              className="px-4 py-2.5 text-slate-500 hover:text-slate-800 text-xs font-medium"
            >
              Generate Another Batch
            </button>
          </div>
        </div>
      )}

      {/* WIZARD STEPS */}
      {!isGenerating && !generationComplete && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          {/* STEP 1: Select Practice Areas */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-slate-900 text-base">
                    Step 1: Select Practice Areas ({selectedPracticeIds.length} Selected)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Choose which legal services will be included in this generation run.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setSelectedPracticeIds(practiceAreas.map((p) => p.id))
                    }
                    className="text-xs text-blue-600 font-medium hover:underline"
                  >
                    Select All ({practiceAreas.length})
                  </button>
                  <span className="text-slate-300">·</span>
                  <button
                    onClick={() => setSelectedPracticeIds([])}
                    className="text-xs text-slate-500 hover:underline"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {practiceAreas.map((pa) => {
                  const isSelected = selectedPracticeIds.includes(pa.id);
                  return (
                    <button
                      key={pa.id}
                      onClick={() => togglePractice(pa.id)}
                      className={`p-3 rounded-lg border text-left flex items-start justify-between gap-3 transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                          : 'border-slate-200 hover:border-slate-400 bg-white'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-slate-900 text-xs">
                          {pa.name}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {pa.category} · Vol: {pa.searchVolume}
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Select Cities */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-slate-900 text-base">
                    Step 2: Select Target Cities ({selectedCityIds.length} Selected)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Target municipalities in Greater Houston and Texas.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCityIds(cities.map((c) => c.id))}
                    className="text-xs text-blue-600 font-medium hover:underline"
                  >
                    Select All ({cities.length})
                  </button>
                  <span className="text-slate-300">·</span>
                  <button
                    onClick={() => setSelectedCityIds([])}
                    className="text-xs text-slate-500 hover:underline"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {cities.map((c) => {
                  const isSelected = selectedCityIds.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      onClick={() => toggleCity(c.id)}
                      className={`p-3 rounded-lg border text-left flex items-start justify-between gap-2 transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                          : 'border-slate-200 hover:border-slate-400 bg-white'
                      }`}
                    >
                      <div className="truncate">
                        <div className="font-bold text-slate-900 text-xs truncate">
                          {c.name}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">
                          {c.county}
                        </div>
                      </div>
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Template */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif font-bold text-slate-900 text-base">
                  Step 3: Choose Programmatic Template
                </h3>
                <p className="text-xs text-slate-500">
                  Select the structural blueprint combining Dynamic and Global reusable blocks.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  onClick={() => setSelectedTemplate('practice-city-master')}
                  className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedTemplate === 'practice-city-master'
                      ? 'border-blue-600 bg-blue-50/30'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-slate-900 text-sm">
                      Practice Area + City Template (Recommended)
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      Standard
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Full conversion architecture with 11 sections, including 3 Global Reusable Blocks (Why Choose Us, Contingency Guarantee, 4-Step Case Protocol) + Dynamic court statistics.
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] text-slate-500 flex items-center gap-2">
                    <LayoutTemplate className="w-3.5 h-3.5 text-blue-600" />
                    <span>8 Dynamic Sections · 3 Global Blocks</span>
                  </div>
                </div>

                <div
                  onClick={() => setSelectedTemplate('city-hub-landing')}
                  className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedTemplate === 'city-hub-landing'
                      ? 'border-blue-600 bg-blue-50/30'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-slate-900 text-sm">
                      County Justice Center & Court Hub
                    </span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded">
                      Jurisdiction
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Designed specifically for high-intent queries targeting Harris County District Court, Fort Bend Justice Center, or Montgomery County filing procedures.
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] text-slate-500 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>6 Sections · Localized Filing Maps</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: SEO Source */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif font-bold text-slate-900 text-base">
                  Step 4: SEO Optimization Engine
                </h3>
                <p className="text-xs text-slate-500">
                  Select how keyword frequencies, headings, and NLP entities are gathered.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  onClick={() => setSeoSource('surfer')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    seoSource === 'surfer'
                      ? 'border-blue-600 bg-blue-50/40'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                    <LineChart className="w-4 h-4 text-emerald-600" />
                    <span>Surfer SEO API</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Automated live API connection targeting 80+ Surfer Content Score with real-time NLP keywords.
                  </p>
                  <div className="mt-3 text-[10px] text-emerald-700 font-semibold">
                    ✓ Connected to Surfer Org
                  </div>
                </div>

                <div
                  onClick={() => setSeoSource('manual')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    seoSource === 'manual'
                      ? 'border-blue-600 bg-blue-50/40'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                    <Sliders className="w-4 h-4 text-blue-600" />
                    <span>Manual SEO Brief</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Uses predefined target word count benchmarks, custom secondary keywords, and agency guidelines.
                  </p>
                </div>

                <div
                  onClick={() => setSeoSource('existing')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    seoSource === 'existing'
                      ? 'border-blue-600 bg-blue-50/40'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                    <Layers className="w-4 h-4 text-purple-600" />
                    <span>Existing Template Clones</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Replicates layout and keyword density from high-ranking pages (e.g. Houston Car Accident).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Content Settings */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif font-bold text-slate-900 text-base">
                  Step 5: Content & Generation Parameters
                </h3>
                <p className="text-xs text-slate-500">
                  Configure editorial voice, length, and local citation depth.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Editorial Tone
                  </label>
                  <select
                    value={contentSettings.tone}
                    onChange={(e) =>
                      setContentSettings({ ...contentSettings, tone: e.target.value })
                    }
                    className="w-full text-xs p-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option>Authoritative Legal & Conversion-Focused</option>
                    <option>Empathetic & Victim-Centered</option>
                    <option>Aggressive Courtroom Litigation Stance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Word Count per Page ({contentSettings.wordCount} words)
                  </label>
                  <input
                    type="range"
                    min="1800"
                    max="3200"
                    step="50"
                    value={contentSettings.wordCount}
                    onChange={(e) =>
                      setContentSettings({
                        ...contentSettings,
                        wordCount: parseInt(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>1,800w</span>
                    <span className="font-bold text-blue-600">Surfer Target: 2,100–2,500w</span>
                    <span>3,200w</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={contentSettings.includeLocalReferences}
                    onChange={(e) =>
                      setContentSettings({
                        ...contentSettings,
                        includeLocalReferences: e.target.checked,
                      })
                    }
                    className="rounded text-blue-600"
                  />
                  <span className="text-xs font-medium text-slate-800">
                    Include local court & highways
                  </span>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={contentSettings.includeAttorneyCta}
                    onChange={(e) =>
                      setContentSettings({
                        ...contentSettings,
                        includeAttorneyCta: e.target.checked,
                      })
                    }
                    className="rounded text-blue-600"
                  />
                  <span className="text-xs font-medium text-slate-800">
                    Embed CallRail DNI number
                  </span>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={contentSettings.includeRelatedPages}
                    onChange={(e) =>
                      setContentSettings({
                        ...contentSettings,
                        includeRelatedPages: e.target.checked,
                      })
                    }
                    className="rounded text-blue-600"
                  />
                  <span className="text-xs font-medium text-slate-800">
                    Build internal link silos
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 6: Review & Final Generate */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif font-bold text-slate-900 text-base">
                  Step 6: Review & Execute Generation Run
                </h3>
                <p className="text-xs text-slate-500">
                  Verify the parameters below before triggering automated page creation.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400">Practice Areas:</span>
                    <div className="font-bold text-slate-900 mt-0.5">
                      {selectedPracticeIds.length} Selected
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">Target Cities:</span>
                    <div className="font-bold text-slate-900 mt-0.5">
                      {selectedCityIds.length} Cities
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">Template:</span>
                    <div className="font-bold text-slate-900 mt-0.5">
                      Practice + City Master
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">SEO Audit Engine:</span>
                    <div className="font-bold text-emerald-700 mt-0.5">
                      Surfer SEO API Active
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-700">
                    Total Output:{' '}
                    <strong className="text-sm text-blue-600 font-mono">
                      {totalCalculatedPages} Pages
                    </strong>{' '}
                    will be created as drafts.
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Estimated generation time: ~3.5 seconds
                  </div>
                </div>
              </div>

              {/* Big CTA Button */}
              <div className="pt-2">
                <button
                  onClick={handleStartGeneration}
                  disabled={totalCalculatedPages === 0}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>Generate {totalCalculatedPages} Pages Now</span>
                </button>
              </div>
            </div>
          )}

          {/* Wizard Footer Nav Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-xs rounded-lg transition-colors flex items-center gap-1 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {currentStep < 6 && (
              <button
                onClick={() => setCurrentStep((prev) => Math.min(6, prev + 1))}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg transition-colors flex items-center gap-1 shadow-sm"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
