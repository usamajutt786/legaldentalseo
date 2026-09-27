'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import { Plus, Search, Edit2, Trash2, MapPin, X } from 'lucide-react';
import { City } from '@/lib/types';

export default function CitiesView() {
  const { cities, addCity, updateCity, deleteCity } = useApp();

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<{
    name: string;
    state: string;
    slug: string;
    county: string;
    active: boolean;
    population: string;
    courthouseName: string;
    majorHighways: string;
  }>({
    name: '',
    state: 'TX',
    slug: '',
    county: 'Harris County',
    active: true,
    population: '50,000',
    courthouseName: 'Harris County District Court',
    majorHighways: 'I-45, Loop 610',
  });

  const filtered = cities.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.county.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingId(null);
    setForm({
      name: '',
      state: 'TX',
      slug: '',
      county: 'Harris County',
      active: true,
      population: '75,000',
      courthouseName: 'Harris County Civil Courthouse',
      majorHighways: 'I-10, US-59',
    });
    setModalOpen(true);
  };

  const openEdit = (c: City) => {
    setEditingId(c.id);
    setForm({
      name: c.name,
      state: c.state,
      slug: c.slug,
      county: c.county,
      active: c.active,
      population: c.population || '50,000',
      courthouseName: c.courthouseName,
      majorHighways: c.majorHighways.join(', '),
    });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const highwaysArray = form.majorHighways.split(',').map((h) => h.trim());

    if (editingId) {
      updateCity(editingId, {
        name: form.name,
        state: form.state,
        slug,
        county: form.county,
        active: form.active,
        population: form.population,
        courthouseName: form.courthouseName,
        majorHighways: highwaysArray,
      });
    } else {
      addCity({
        name: form.name,
        state: form.state,
        slug,
        county: form.county,
        active: form.active,
        population: form.population,
        courthouseName: form.courthouseName,
        majorHighways: highwaysArray,
      });
    }
    setModalOpen(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
            City & County Locations Database
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage target Texas jurisdictions and local courthouse metadata for programmatic page clusters.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-lg transition-colors shadow flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New City</span>
        </button>
      </div>

      {/* Search Toolbar */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="relative max-w-sm w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search city, county..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="text-xs text-slate-500">
          Showing <strong>{filtered.length}</strong> of {cities.length} municipalities
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">City & State</th>
              <th className="px-4 py-3">County</th>
              <th className="px-4 py-3">URL Slug</th>
              <th className="px-4 py-3">Courthouse Metadata</th>
              <th className="px-4 py-3 text-center">Generated Pages</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filtered.map((city) => (
              <tr key={city.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-bold text-slate-900">{city.name}</div>
                  <div className="text-[11px] text-slate-400">
                    {city.state} · Pop: {city.population || 'N/A'}
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-700">{city.county}</td>
                <td className="px-4 py-3 font-mono text-[11px] text-blue-700">
                  /{city.slug}/
                </td>
                <td className="px-4 py-3 text-slate-600 max-w-xs truncate">
                  {city.courthouseName}
                </td>
                <td className="px-4 py-3 text-center font-mono font-bold text-slate-900">
                  {city.generatedPagesCount}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => updateCity(city.id, { active: !city.active })}
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded transition-colors ${
                      city.active
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {city.active ? 'Active' : 'Disabled'}
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => openEdit(city)}
                      className="p-1.5 text-slate-500 hover:text-blue-600 rounded hover:bg-slate-100"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete city "${city.name}"?`)) {
                          deleteCity(city.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-100"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-serif font-bold text-base text-slate-900">
                {editingId ? 'Edit City Parameters' : 'Add New Texas City'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">City Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Cypress"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">County *</label>
                  <input
                    type="text"
                    required
                    value={form.county}
                    onChange={(e) => setForm({ ...form, county: e.target.value })}
                    placeholder="e.g. Harris County"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="cypress"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Population</label>
                  <input
                    type="text"
                    value={form.population}
                    onChange={(e) => setForm({ ...form, population: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Jurisdiction Courthouse</label>
                <input
                  type="text"
                  value={form.courthouseName}
                  onChange={(e) => setForm({ ...form, courthouseName: e.target.value })}
                  placeholder="e.g. Harris County Civil Courthouse (201 Caroline St)"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Major Corridors / Highways (comma separated)</label>
                <input
                  type="text"
                  value={form.majorHighways}
                  onChange={(e) => setForm({ ...form, majorHighways: e.target.value })}
                  placeholder="US-290, Grand Parkway, Fry Rd"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
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
                  Save City
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
