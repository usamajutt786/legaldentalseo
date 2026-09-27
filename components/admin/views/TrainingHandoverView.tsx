'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import {
  GraduationCap,
  CheckCircle2,
  FileText,
  BookOpen,
  Terminal,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Layers,
  X,
} from 'lucide-react';

export default function TrainingHandoverView() {
  const { setAdminTab } = useApp();

  const [activeDocModal, setActiveDocModal] = useState<string | null>(null);

  // Checklists
  const [completedSteps, setCompletedSteps] = useState<number[]>([1, 2]);

  const toggleCheck = (id: number) => {
    setCompletedSteps((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const operationalPlaybooks = [
    {
      id: 1,
      title: 'How to Add a New Target City',
      targetTab: 'cities',
      duration: '3 mins',
      summary: 'Navigate to Cities, input Municipality Name, County Courthouse details, and major accident corridors (e.g. I-45, Loop 610).',
    },
    {
      id: 2,
      title: 'How to Add a New Practice Area Discipline',
      targetTab: 'practice-areas',
      duration: '4 mins',
      summary: 'Define practice title (e.g. Commercial Van Accident), category, and average historical settlement figure.',
    },
    {
      id: 3,
      title: 'Running the Programmatic Batch Generator',
      targetTab: 'generate',
      duration: '5 mins',
      summary: 'Multi-select your target cities and practice areas in the 6-step wizard to produce drafts with Surfer SEO recommendations.',
    },
    {
      id: 4,
      title: 'Bulk CSV Importing for 100+ Targets',
      targetTab: 'bulk-import',
      duration: '4 mins',
      summary: 'Format your spreadsheet columns as "City, Practice Area", upload the file, and click "Create Page Drafts".',
    },
    {
      id: 5,
      title: 'Safely Updating Global Reusable Blocks',
      targetTab: 'global-sections',
      duration: '5 mins',
      summary: 'Edit universal firm policies (e.g. $145M settlement total, contingency fee rules) to propagate updates across all 1,246 live pages.',
    },
    {
      id: 6,
      title: 'Editorial Review & Approval Workflow',
      targetTab: 'review-queue',
      duration: '6 mins',
      summary: 'Inspect Surfer scores, verify local court citations, approve internal link suggestions, and push live.',
    },
    {
      id: 7,
      title: 'Managing CallRail Dynamic Number Insertion',
      targetTab: 'call-tracking',
      duration: '3 mins',
      summary: 'Update Organic, Google Ads, or Direct phone tracking pools and test instant number rotation.',
    },
    {
      id: 8,
      title: 'Production Deployments & Instant Rollbacks',
      targetTab: 'deployments',
      duration: '4 mins',
      summary: 'Push Git tags to trigger edge CDN cache revalidation, or execute an instant rollback to restore previous releases.',
    },
  ];

  const docArticles: Record<string, { title: string; content: string }> = {
    developer_handover: {
      title: 'Developer Handover Specification',
      content: `The LexScale law firm SEO platform is architected entirely in modern Next.js with React and Tailwind CSS.
State is centrally orchestrated via the AppContext with zero reliance on fragile external backend microservices during preview.
Key File References:
- /lib/mockData.ts: Contains baseline data models for 20 cities, 74 practice areas, and initial page cluster indexes.
- /components/lawfirm/: Houses public high-converting law-firm website pages, sticky CTA drawers, and intake modals.
- /components/admin/: Houses the 20 internal management views including Surfer SEO, CallRail DNI, and template builders.
- /lib/types.ts: Complete TypeScript interfaces enforcing type safety across page records, sitemaps, and deployment states.`,
    },
    deployment_guide: {
      title: 'Edge Deployment Architecture & CDN Guide',
      content: `1. Continuous Integration: Every git commit triggers static optimization and asset minification.
2. Sitemap Regeneration: Sitemaps partition automatically into chunks of 1,000 URLs to avoid Googlebot timeout thresholds.
3. Edge Caching: Generated HTML is cached with stale-while-revalidate headers at edge nodes across North America.
4. Rollback Protocol: If an erroneous batch generation occurs, administrators can trigger instant rollback in the Deployments tab without redeploying code.`,
    },
    troubleshooting_guide: {
      title: 'Operational Troubleshooting Guide',
      content: `Q: A phone number does not swap when testing Google Ads?
A: Check CallRail DNI settings to confirm Dynamic Number Insertion toggle is active, and verify the PPC tracking parameter is detected.

Q: Surfer SEO score shows below 75?
A: Open the Page Editor and check the right-hand Surfer panel. Add 2-3 mentions of underrepresented NLP entities (e.g. "modified comparative fault").

Q: Global section changes are not visible?
A: Confirm the "Update All Pages" confirmation modal was approved in Global Sections.`,
    },
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
          <GraduationCap className="w-3.5 h-3.5" />
          Internal Agency Onboarding
        </div>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
          Team Training & Developer Handover Playbooks
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Empowering your in-house team to independently operate, generate, and maintain 2,000+ programmatic legal pages.
        </p>
      </div>

      {/* 4 Documentation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => setActiveDocModal('developer_handover')}
          className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-500 cursor-pointer transition-colors"
        >
          <div className="text-blue-600 mb-2">
            <Terminal className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-xs">
            Developer Handover Spec
          </h3>
          <p className="text-[11px] text-slate-500 mt-1">
            Component architecture, data flow, and file layout documentation.
          </p>
        </div>

        <div
          onClick={() => setActiveDocModal('deployment_guide')}
          className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-500 cursor-pointer transition-colors"
        >
          <div className="text-emerald-600 mb-2">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-xs">
            Deployment & CDN Guide
          </h3>
          <p className="text-[11px] text-slate-500 mt-1">
            Edge caching, Googlebot sitemap ingestion, and Vercel pipeline rules.
          </p>
        </div>

        <div
          onClick={() => setActiveDocModal('troubleshooting_guide')}
          className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-500 cursor-pointer transition-colors"
        >
          <div className="text-amber-600 mb-2">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-xs">
            Troubleshooting Runbook
          </h3>
          <p className="text-[11px] text-slate-500 mt-1">
            Surfer score diagnostics, CallRail debugging, and rollback steps.
          </p>
        </div>
      </div>

      {/* Operational Playbooks Checklist */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h3 className="font-serif font-bold text-base text-slate-900">
              Agency Operational Training Checklist
            </h3>
            <div className="text-xs text-slate-500 mt-0.5">
              Completed: <strong>{completedSteps.length}</strong> of {operationalPlaybooks.length} playbooks
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {operationalPlaybooks.map((pb) => {
            const isCompleted = completedSteps.includes(pb.id);

            return (
              <div
                key={pb.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-slate-50/50"
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleCheck(pb.id)}
                    className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                      isCompleted
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>

                  <div>
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      <span>{pb.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        ({pb.duration})
                      </span>
                    </div>
                    <p className="text-slate-600 mt-1 leading-relaxed">
                      {pb.summary}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setAdminTab(pb.targetTab as any)}
                  className="self-end sm:self-center px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg text-xs transition-colors shrink-0 flex items-center gap-1 shadow-xs"
                >
                  <span>Open Tool</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Doc Modal */}
      {activeDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-serif font-bold text-base text-slate-900">
                {docArticles[activeDocModal]?.title}
              </h3>
              <button
                onClick={() => setActiveDocModal(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <pre className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-sans leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
              {docArticles[activeDocModal]?.content}
            </pre>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveDocModal(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-medium"
              >
                Close Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
