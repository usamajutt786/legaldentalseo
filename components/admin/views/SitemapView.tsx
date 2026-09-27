'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import {
  Network,
  RotateCw,
  CheckCircle2,
  FileCode,
  ExternalLink,
  Layers,
} from 'lucide-react';

export default function SitemapView() {
  const { addToast } = useApp();

  const [isRegenerating, setIsRegenerating] = useState(false);
  const [selectedXml, setSelectedXml] = useState<'main' | 'practice' | 'locations' | 'blog'>('practice');

  const sitemaps = [
    {
      id: 'main',
      name: 'Main Sitemap Index',
      url: '/sitemap.xml',
      urlsCount: 15,
      lastModified: 'Today, 2:45 PM',
      status: 'Indexed by Googlebot',
    },
    {
      id: 'practice',
      name: 'Programmatic Practice Pages Sitemap',
      url: '/sitemap-practice-areas.xml',
      urlsCount: 1246,
      lastModified: 'Today, 2:45 PM',
      status: 'Indexed by Googlebot',
    },
    {
      id: 'locations',
      name: 'Texas Locations & Court Hubs Sitemap',
      url: '/sitemap-locations.xml',
      urlsCount: 20,
      lastModified: 'Yesterday, 11:30 AM',
      status: 'Indexed by Googlebot',
    },
    {
      id: 'blog',
      name: 'Legal Guides & Crash Reports Sitemap',
      url: '/sitemap-articles.xml',
      urlsCount: 38,
      lastModified: 'Sep 20, 2026',
      status: 'Indexed by Googlebot',
    },
  ];

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      addToast({
        type: 'success',
        title: 'Sitemap XML Rebuilt',
        description: 'All 1,284 canonical URLs indexed. Pinged Google and Bing Search Consoles.',
      });
    }, 1200);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <Network className="w-3.5 h-3.5" />
            Search Engine Indexing
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
            XML Sitemap Architecture
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Automated sitemap partitioning indexing 1,284 live URLs with priority tagging and daily lastmod timestamps.
          </p>
        </div>

        <button
          onClick={handleRegenerate}
          disabled={isRegenerating}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow disabled:opacity-50"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
          <span>{isRegenerating ? 'Rebuilding XML...' : 'Regenerate Sitemaps'}</span>
        </button>
      </div>

      {/* Sitemaps List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sitemaps.map((sm) => (
          <div
            key={sm.id}
            className={`p-5 rounded-xl border transition-all cursor-pointer ${
              selectedXml === sm.id
                ? 'bg-blue-50/50 border-blue-500 shadow-sm'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
            onClick={() => setSelectedXml(sm.id as any)}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-slate-900 text-xs sm:text-sm">
                {sm.name}
              </span>
              <span className="font-mono text-xs font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                {sm.urlsCount.toLocaleString()} URLs
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-500 mt-2">
              {sm.url}
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
              <span>{sm.lastModified}</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {sm.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* XML Code Structure View */}
      <div className="bg-slate-950 text-slate-100 rounded-xl border border-slate-800 p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-amber-400" />
            <span className="font-mono font-bold text-white">
              Raw Output: /sitemap-practice-areas.xml (Excerpt)
            </span>
          </div>
          <span className="text-slate-400 font-mono text-[10px]">
            1,246 entries total
          </span>
        </div>

        <pre className="font-mono text-xs text-amber-300/90 leading-relaxed overflow-x-auto max-h-56 p-2 bg-slate-900 rounded-lg">
{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.harrisoncoleinjurylaw.com/houston/car-accident-lawyer/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.harrisoncoleinjurylaw.com/katy/truck-accident-lawyer/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.harrisoncoleinjurylaw.com/sugar-land/slip-and-fall-lawyer/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.harrisoncoleinjurylaw.com/cypress/car-accident-lawyer/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`}
        </pre>
      </div>
    </div>
  );
}
