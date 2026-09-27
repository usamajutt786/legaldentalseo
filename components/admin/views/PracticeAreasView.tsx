'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import { Plus, Search, Edit2, Trash2, Check, X, Scale } from 'lucide-react';
import { PracticeArea } from '@/lib/types';

export default function PracticeAreasView() {
  const { practiceAreas, addPracticeArea, updatePracticeArea, deletePracticeArea } = useApp();

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<{
    name: string;
    slug: string;
    category: PracticeArea['category'];
    statAvgSettlement: string;
    searchVolume: string;
    difficulty: number;
    active: boolean;
  }>({
    name: '',
    slug: '',
    category: 'Motor Vehicle',
    statAvgSettlement: '$450,000',
    searchVolume: '1,200 / mo',
    difficulty: 60,
    active: true,
  });

  const filtered = practiceAreas.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingId(null);
    setForm({
      name: '',
      slug: '',
      category: 'Motor Vehicle',
      statAvgSettlement: '$500,000',
      searchVolume: '1,500 / mo',
      difficulty: 65,
      active: true,
    });
    setModalOpen(true);
  };

  const openEdit = (p: PracticeArea) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      slug: p.slug,
      category: p.category,
      statAvgSettlement: p.statAvgSettlement,
      searchVolume: p.searchVolume,
      difficulty: p.difficulty,
      active: p.active,
    });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (editingId) {
      updatePracticeArea(editingId, { ...form, slug });
    } else {
      addPracticeArea({ ...form, slug });
    }
    setModalOpen(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
            Practice Area Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure legal practice disciplines used to dynamically generate city + service pages.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-lg transition-colors shadow flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Practice Area</span>
        </button>
      </div>

      {/* Search Toolbar */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="relative max-w-sm w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search practice areas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="text-xs text-slate-500">
          Showing <strong>{filtered.length}</strong> of {practiceAreas.length} practice areas
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((pa) => (
          <div
            key={pa.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  {pa.category}
                </span>
                <button
                  onClick={() => updatePracticeArea(pa.id, { active: !pa.active })}
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded transition-colors ${
                    pa.active
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {pa.active ? 'Active' : 'Inactive'}
                </button>
              </div>

              <h3 className="font-serif font-bold text-slate-900 text-base mt-2">
                {pa.name}
              </h3>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                /{pa.slug}/
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px]">Avg Settlement:</span>
                  <div className="font-mono font-bold text-slate-800">{pa.statAvgSettlement}</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px]">Search Volume:</span>
                  <div className="font-mono text-slate-600">{pa.searchVolume}</div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => openEdit(pa)}
                className="px-2.5 py-1 text-slate-600 hover:text-blue-600 rounded text-xs flex items-center gap-1 hover:bg-slate-50"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete practice area "${pa.name}"?`)) {
                    deletePracticeArea(pa.id);
                  }
                }}
                className="px-2 py-1 text-slate-400 hover:text-rose-600 rounded text-xs hover:bg-slate-50"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Add Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-serif font-bold text-base text-slate-900">
                {editingId ? 'Edit Practice Area' : 'Create Practice Area'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Practice Area Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Rideshare Accident Lawyer"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">URL Slug</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="e.g. rideshare-accident-lawyer"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option>Motor Vehicle</option>
                    <option>Premises Liability</option>
                    <option>Catastrophic</option>
                    <option>Workplace</option>
                    <option>General</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Avg Settlement Claim</label>
                  <input
                    type="text"
                    value={form.statAvgSettlement}
                    onChange={(e) => setForm({ ...form, statAvgSettlement: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium shadow"
                >
                  Save Practice Area
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
