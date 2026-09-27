'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import {
  CheckSquare,
  Eye,
  FileEdit,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Clock,
  Send,
} from 'lucide-react';
import { PageStatus } from '@/lib/types';

export default function ReviewQueueView() {
  const {
    pages,
    updatePageStatus,
    setSelectedPageId,
    setAdminTab,
    setAppMode,
    setPublicRoute,
    addToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<PageStatus | 'all'>('review');

  const reviewItems = pages.filter((p) => {
    if (activeTab === 'all') return true;
    return p.status === activeTab;
  });

  const handleApprove = (pageId: string) => {
    updatePageStatus(pageId, 'approved');
  };

  const handlePublish = (pageId: string) => {
    updatePageStatus(pageId, 'published');
  };

  const handleRequestChanges = (pageId: string) => {
    updatePageStatus(pageId, 'draft');
    addToast({
      type: 'warning',
      title: 'Changes Requested',
      description: 'Page routed back to editorial draft queue with reviewer notes.',
    });
  };

  const handlePreview = (pageId: string) => {
    setSelectedPageId(pageId);
    setAppMode('public');
    setPublicRoute('page');
  };

  const handleEdit = (pageId: string) => {
    setSelectedPageId(pageId);
    setAdminTab('page-editor');
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <CheckSquare className="w-3.5 h-3.5" />
            Editorial Governance
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
            Content Review & Approval Queue
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Multi-stage quality assurance: Generated → Draft → Review → Approved → Published.
          </p>
        </div>

        {/* Workflow Pipeline Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs">
          {(['all', 'draft', 'review', 'approved', 'published'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`px-3 py-1.5 rounded-md font-medium capitalize transition-colors ${
                activeTab === status
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {status} ({pages.filter((p) => status === 'all' || p.status === status).length})
            </button>
          ))}
        </div>
      </div>

      {/* Review Cards / Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Page Title / Target Slug</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3">Practice Area</th>
                <th className="px-4 py-3 text-center">Surfer Score</th>
                <th className="px-4 py-3 text-center">Word Count</th>
                <th className="px-4 py-3">Links Status</th>
                <th className="px-4 py-3">Current State</th>
                <th className="px-4 py-3 text-right">Review Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {reviewItems.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    No items in this queue stage. All programmatic pages are processed.
                  </td>
                </tr>
              ) : (
                reviewItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900">{item.h1}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{item.url}</div>
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800">{item.cityName}</td>
                    <td className="px-4 py-3 text-slate-600">{item.practiceName}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-mono font-bold text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                        {item.seoScore}/100
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center font-mono text-slate-600">
                      {item.wordCount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[11px] text-blue-700 font-medium bg-blue-50 px-2 py-0.5 rounded">
                        {item.internalLinks.length} Approved Links
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handlePreview(item.id)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100"
                          title="Preview"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleEdit(item.id)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 rounded hover:bg-slate-100"
                          title="Edit"
                        >
                          <FileEdit className="w-3.5 h-3.5" />
                        </button>

                        {item.status !== 'approved' && item.status !== 'published' && (
                          <button
                            onClick={() => handleApprove(item.id)}
                            className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium text-[10px] transition-colors"
                          >
                            Approve
                          </button>
                        )}

                        {item.status !== 'published' && (
                          <button
                            onClick={() => handlePublish(item.id)}
                            className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium text-[10px] transition-colors"
                          >
                            Publish
                          </button>
                        )}

                        {item.status !== 'draft' && (
                          <button
                            onClick={() => handleRequestChanges(item.id)}
                            className="px-2 py-1 text-slate-500 hover:text-rose-600 rounded text-[10px]"
                          >
                            Request Changes
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
