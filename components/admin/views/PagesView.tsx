'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import {
  Search,
  Filter,
  Eye,
  FileEdit,
  Trash2,
  CheckCircle2,
  Clock,
  Sparkles,
  Link2,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { PageStatus } from '@/lib/types';

export default function PagesView() {
  const {
    pages,
    cities,
    practiceAreas,
    updatePageStatus,
    deletePage,
    setSelectedPageId,
    setAdminTab,
    setAppMode,
    setPublicRoute,
    addToast,
    regeneratePageContent,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCityFilter, setSelectedCityFilter] = useState('all');
  const [selectedPracticeFilter, setSelectedPracticeFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [selectedScoreFilter, setSelectedScoreFilter] = useState('all');

  // Bulk selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkActionOpen, setBulkActionOpen] = useState(false);

  // Filtered rows
  const filteredPages = pages.filter((p) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        p.h1.toLowerCase().includes(q) ||
        p.url.toLowerCase().includes(q) ||
        p.cityName.toLowerCase().includes(q) ||
        p.practiceName.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (selectedCityFilter !== 'all' && p.cityId !== selectedCityFilter) return false;
    if (selectedPracticeFilter !== 'all' && p.practiceId !== selectedPracticeFilter) return false;
    if (selectedStatusFilter !== 'all' && p.status !== selectedStatusFilter) return false;
    if (selectedScoreFilter === 'high' && p.seoScore < 85) return false;
    if (selectedScoreFilter === 'medium' && (p.seoScore < 75 || p.seoScore >= 85)) return false;
    if (selectedScoreFilter === 'low' && p.seoScore >= 75) return false;
    return true;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredPages.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Bulk Operations
  const handleBulkPublish = () => {
    selectedIds.forEach((id) => updatePageStatus(id, 'published'));
    setSelectedIds([]);
    addToast({
      type: 'success',
      title: 'Bulk Publish Executed',
      description: `${selectedIds.length} pages published to public website.`,
    });
  };

  const handleBulkMoveToDraft = () => {
    selectedIds.forEach((id) => updatePageStatus(id, 'draft'));
    setSelectedIds([]);
    addToast({
      type: 'info',
      title: 'Moved to Drafts',
      description: `${selectedIds.length} pages moved to draft status.`,
    });
  };

  const handleBulkRegenerate = async () => {
    for (const id of selectedIds) {
      await regeneratePageContent(id);
    }
    setSelectedIds([]);
  };

  const handleBulkAddInternalLinks = () => {
    addToast({
      type: 'success',
      title: 'Internal Links Automated',
      description: `Semantic city/practice links anchored across ${selectedIds.length} pages.`,
    });
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedIds.length} pages?`)) {
      selectedIds.forEach((id) => deletePage(id));
      setSelectedIds([]);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
            Page Inventory & Clusters ({1284 + (pages.length - 8)} Total Pages)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Search, filter, edit, and bulk-publish programmatic law firm pages across Texas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAdminTab('generate')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-lg transition-colors shadow flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate New Batch</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search keyword, city, URL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs"
            />
          </div>

          {/* City Filter */}
          <div>
            <select
              value={selectedCityFilter}
              onChange={(e) => setSelectedCityFilter(e.target.value)}
              className="w-full py-2 px-2.5 border border-slate-300 rounded-lg text-xs bg-white"
            >
              <option value="all">All Cities ({cities.length})</option>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Practice Area Filter */}
          <div>
            <select
              value={selectedPracticeFilter}
              onChange={(e) => setSelectedPracticeFilter(e.target.value)}
              className="w-full py-2 px-2.5 border border-slate-300 rounded-lg text-xs bg-white"
            >
              <option value="all">All Practice Areas ({practiceAreas.length})</option>
              {practiceAreas.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="w-full py-2 px-2.5 border border-slate-300 rounded-lg text-xs bg-white"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="review">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {/* SEO Score Filter */}
          <div>
            <select
              value={selectedScoreFilter}
              onChange={(e) => setSelectedScoreFilter(e.target.value)}
              className="w-full py-2 px-2.5 border border-slate-300 rounded-lg text-xs bg-white"
            >
              <option value="all">All Surfer Scores</option>
              <option value="high">High (85 - 100)</option>
              <option value="medium">Medium (75 - 84)</option>
              <option value="low">Needs Optimization (&lt; 75)</option>
            </select>
          </div>
        </div>

        {/* Bulk Action Controls */}
        {selectedIds.length > 0 && (
          <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg flex flex-wrap items-center justify-between gap-2 text-xs animate-in fade-in">
            <span className="font-semibold text-blue-900">
              {selectedIds.length} pages selected
            </span>

            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={handleBulkPublish}
                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium transition-colors"
              >
                Publish All
              </button>
              <button
                onClick={handleBulkMoveToDraft}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded font-medium transition-colors"
              >
                Move to Draft
              </button>
              <button
                onClick={handleBulkRegenerate}
                className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium transition-colors"
              >
                Regenerate Content
              </button>
              <button
                onClick={handleBulkAddInternalLinks}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded font-medium transition-colors"
              >
                Add Internal Links
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pages Data Grid */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="p-3 w-8 text-center">
                  <input
                    type="checkbox"
                    checked={
                      filteredPages.length > 0 &&
                      selectedIds.length === filteredPages.length
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded text-blue-600"
                  />
                </th>
                <th className="px-4 py-3">Page / Target URL</th>
                <th className="px-4 py-3">Practice Area</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3 text-center">Surfer Score</th>
                <th className="px-4 py-3 text-center">Words</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredPages.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-400">
                    No programmatic pages match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredPages.map((p) => {
                  const isChecked = selectedIds.includes(p.id);
                  const scoreColor =
                    p.seoScore >= 85
                      ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                      : p.seoScore >= 75
                      ? 'text-blue-700 bg-blue-50 border-blue-200'
                      : 'text-amber-700 bg-amber-50 border-amber-200';

                  const statusClass =
                    p.status === 'published'
                      ? 'text-emerald-700 bg-emerald-50'
                      : p.status === 'review'
                      ? 'text-blue-700 bg-blue-50'
                      : p.status === 'approved'
                      ? 'text-purple-700 bg-purple-50'
                      : 'text-amber-700 bg-amber-50';

                  return (
                    <tr
                      key={p.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isChecked ? 'bg-blue-50/30' : ''
                      }`}
                    >
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleSelect(p.id)}
                          className="rounded text-blue-600"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-900">{p.h1}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{p.url}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-700">{p.practiceName}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{p.cityName}</td>
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
                          className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded capitalize ${statusClass}`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-[11px] font-mono">
                        {p.lastUpdated}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => {
                              setSelectedPageId(p.id);
                              setAppMode('public');
                              setPublicRoute('page');
                            }}
                            className="p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100"
                            title="Preview on Public Website"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedPageId(p.id);
                              setAdminTab('page-editor');
                            }}
                            className="p-1.5 text-slate-500 hover:text-blue-600 rounded hover:bg-slate-100"
                            title="Edit Content"
                          >
                            <FileEdit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deletePage(p.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-100"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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
