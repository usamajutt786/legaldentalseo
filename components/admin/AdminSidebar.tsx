'use client';

import React from 'react';
import { useApp } from '@/lib/context';
import { AdminTab } from '@/lib/context';
import {
  LayoutDashboard,
  Files,
  Sparkles,
  FilePlus,
  Scale,
  MapPin,
  LayoutTemplate,
  Layers,
  LineChart,
  Link2,
  Settings2,
  Code2,
  PhoneCall,
  Sliders,
  UploadCloud,
  CheckSquare,
  FileEdit,
  Eye,
  Network,
  Calculator,
  GraduationCap,
  GitBranch,
  ShieldCheck,
  Globe,
} from 'lucide-react';

interface NavItem {
  id: AdminTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  badgeColor?: string;
  group?: string;
}

export default function AdminSidebar() {
  const { adminTab, setAdminTab, pages, setAppMode, setPublicRoute } = useApp();

  const draftCount = pages.filter((p) => p.status === 'draft').length;
  const reviewCount = pages.filter((p) => p.status === 'review').length;

  const navItems: NavItem[] = [
    // Core
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pages', label: 'All Pages', icon: Files, badge: 1284 + (pages.length - 8) },
    { id: 'generate', label: 'Generate Pages', icon: Sparkles, badge: 'Wizard', badgeColor: 'bg-amber-500/20 text-amber-300' },
    { id: 'single-generate', label: 'Single Page Gen', icon: FilePlus },

    // Data Models
    { id: 'practice-areas', label: 'Practice Areas', icon: Scale, badge: 15 },
    { id: 'cities', label: 'Cities & Counties', icon: MapPin, badge: 20 },

    // Content & Templates
    { id: 'templates', label: 'Templates', icon: LayoutTemplate },
    { id: 'global-sections', label: 'Global Sections', icon: Layers, badge: 4 },
    { id: 'page-editor', label: 'Page Editor', icon: FileEdit },
    { id: 'page-preview', label: 'Page Preview', icon: Eye },

    // SEO & Optimization
    { id: 'surfer-seo', label: 'Surfer SEO', icon: LineChart, badge: 'Live', badgeColor: 'bg-emerald-500/20 text-emerald-400' },
    { id: 'internal-linking', label: 'Internal Linking', icon: Link2 },
    { id: 'review-queue', label: 'Review Queue', icon: CheckSquare, badge: reviewCount || 2, badgeColor: 'bg-blue-500/20 text-blue-400' },
    { id: 'bulk-import', label: 'Bulk CSV Import', icon: UploadCloud },
    { id: 'seo-settings', label: 'SEO Patterns', icon: Settings2 },
    { id: 'schema-ui', label: 'Schema (JSON-LD)', icon: Code2 },
    { id: 'sitemap', label: 'Sitemap XML', icon: Network },

    // Lead Generation & Conversions
    { id: 'call-tracking', label: 'Call Tracking (DNI)', icon: PhoneCall },
    { id: 'cta-settings', label: 'Sticky CTA Config', icon: Sliders },

    // Scale & Operations
    { id: 'scalability', label: 'Scale Calculator', icon: Calculator },
    { id: 'training', label: 'Team Training Docs', icon: GraduationCap },
    { id: 'deployments', label: 'Deploy & Rollback', icon: GitBranch, badge: 'v1.4.2' },
    { id: 'security', label: 'Security & Headers', icon: ShieldCheck },
  ];

  return (
    <aside className="w-64 bg-slate-950 text-slate-300 border-r border-slate-800 flex flex-col shrink-0 select-none min-h-screen">
      {/* Brand & Platform Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
              LS
            </div>
            <div>
              <div className="font-bold text-white text-sm tracking-tight">
                LexScale SEO
              </div>
              <div className="text-[10px] text-slate-400">
                Harrison & Cole Law Platform
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links Scroll Container */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 text-xs">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 px-3 py-1">
          Operations & Generation
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = adminTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setAdminTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-medium ${
                    item.badgeColor
                      ? item.badgeColor
                      : isActive
                      ? 'bg-blue-700 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer System Status */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950 text-xs">
        <button
          onClick={() => {
            setAppMode('public');
            setPublicRoute('home');
          }}
          className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-amber-400 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>View Public Law Firm</span>
        </button>
      </div>
    </aside>
  );
}
