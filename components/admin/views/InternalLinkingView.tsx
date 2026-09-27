'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import {
  Link2,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  Check,
  RotateCcw,
} from 'lucide-react';

export default function InternalLinkingView() {
  const {
    pages,
    selectedPageId,
    setSelectedPageId,
    approveInternalLink,
    rejectInternalLink,
    approveAllInternalLinks,
  } = useApp();

  const currentPage = pages.find((p) => p.id === selectedPageId) || pages[0];

  // Links for current page
  const links = currentPage.internalLinks;

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <Link2 className="w-3.5 h-3.5" />
            PageRank Silo Architecture
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
            Automated Internal Linking Engine
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Algorithmic semantic link distribution passing authority between same-city practice areas and same-practice nearby cities.
          </p>
        </div>

        <button
          onClick={approveAllInternalLinks}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors shadow flex items-center gap-1.5"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Approve All Link Proposals</span>
        </button>
      </div>

      {/* Rules Explainer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-white rounded-lg border border-slate-200">
          <div className="font-bold text-slate-900">Rule 1: Same City Silo</div>
          <div className="text-slate-500 mt-0.5 text-[11px]">
            Houston Car Crash → Houston Truck & Slip & Fall
          </div>
        </div>
        <div className="p-3 bg-white rounded-lg border border-slate-200">
          <div className="font-bold text-slate-900">Rule 2: Nearby Municipalities</div>
          <div className="text-slate-500 mt-0.5 text-[11px]">
            Houston Car Crash → Katy & Sugar Land Car Crash
          </div>
        </div>
        <div className="p-3 bg-white rounded-lg border border-slate-200">
          <div className="font-bold text-slate-900">Rule 3: Parent Category Hub</div>
          <div className="text-slate-500 mt-0.5 text-[11px]">
            Motor Vehicle Hub → All Sub-Vehicular Claims
          </div>
        </div>
        <div className="p-3 bg-white rounded-lg border border-slate-200">
          <div className="font-bold text-slate-900">Rule 4: County Court Hubs</div>
          <div className="text-slate-500 mt-0.5 text-[11px]">
            Harris County Hub → Houston, Cypress, Pasadena
          </div>
        </div>
      </div>

      {/* Interactive Page Link Inspector */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-200 gap-3">
          <div>
            <span className="text-[11px] text-slate-400 font-mono">Examining Source Page:</span>
            <div className="font-serif font-bold text-slate-900 text-base">
              {currentPage.h1} ({currentPage.cityName})
            </div>
            <div className="text-xs text-blue-600 font-mono">{currentPage.url}</div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Switch Page:</span>
            <select
              value={currentPage.id}
              onChange={(e) => setSelectedPageId(e.target.value)}
              className="text-xs p-1.5 border border-slate-300 rounded-lg bg-white font-medium"
            >
              {pages.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.h1}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Links Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Anchor Text</th>
                <th className="px-4 py-3">Target URL</th>
                <th className="px-4 py-3">Relationship Rule</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {links.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-slate-400">
                    No links suggested yet. Internal link generation runs on draft creation.
                  </td>
                </tr>
              ) : (
                links.map((link) => {
                  const isApproved = link.status === 'approved';
                  const isRejected = link.status === 'rejected';

                  return (
                    <tr key={link.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3 font-bold text-slate-900">
                        {link.anchorText}
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px] text-blue-700">
                        {link.targetUrl}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                          {link.relationship}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded capitalize ${
                            isApproved
                              ? 'bg-emerald-50 text-emerald-700'
                              : isRejected
                              ? 'bg-rose-50 text-rose-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {link.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => approveInternalLink(currentPage.id, link.id)}
                            className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium rounded text-[11px] transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => rejectInternalLink(currentPage.id, link.id)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium rounded text-[11px] transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
