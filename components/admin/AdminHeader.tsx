'use client';

import React from 'react';
import { useApp } from '@/lib/context';
import {
  Sparkles,
  Search,
  ExternalLink,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export default function AdminHeader() {
  const {
    adminTab,
    setAdminTab,
    setAppMode,
    setPublicRoute,
    surferConnected,
  } = useApp();

  const tabLabels: Record<string, string> = {
    dashboard: 'Platform Dashboard',
    pages: 'Page Inventory & Management',
    generate: 'Programmatic Page Generator Wizard',
    'single-generate': 'Single Page Quick Generator',
    'practice-areas': 'Practice Areas Management',
    cities: 'Cities & Counties Database',
    templates: 'Programmatic Template Builder',
    'global-sections': 'Global Reusable Content Blocks',
    'surfer-seo': 'Surfer SEO API Integration',
    'internal-linking': 'Automated Internal Linking Engine',
    'seo-settings': 'Global SEO URL & Meta Patterns',
    'schema-ui': 'JSON-LD Schema Automation',
    'call-tracking': 'CallRail Dynamic Number Insertion',
    'cta-settings': 'Sticky CTA Toolbar Configuration',
    'bulk-import': 'Bulk CSV Keyword & Page Importer',
    'review-queue': 'Content Review & Editorial Workflow',
    'page-editor': 'Visual Page Content Editor',
    'page-preview': 'Device Layout Preview Frame',
    sitemap: 'XML Sitemaps Architecture',
    scalability: 'Scalability & Automation Multiplier',
    training: 'Team Training & Developer Handover',
    deployments: 'Deployments, GitHub & Instant Rollback',
    security: 'Security, SSL & Compliance Hardening',
  };

  return (
    <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between text-xs sticky top-0 z-30">
      {/* Breadcrumb Trail */}
      <div className="flex items-center gap-2">
        <span className="text-slate-400 font-medium">LexScale</span>
        <span className="text-slate-300">/</span>
        <span className="font-semibold text-slate-800">
          {tabLabels[adminTab] || 'SEO Command Center'}
        </span>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Surfer SEO badge */}
        <button
          onClick={() => setAdminTab('surfer-seo')}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Surfer SEO API: {surferConnected ? 'Connected' : 'Offline'}</span>
        </button>

        {/* Quick Launch Wizard */}
        <button
          onClick={() => setAdminTab('generate')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Generate New Pages</span>
        </button>

        <button
          onClick={() => {
            setAppMode('public');
            setPublicRoute('home');
          }}
          className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </header>
  );
}
