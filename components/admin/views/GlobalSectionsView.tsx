'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import {
  Layers,
  Edit2,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Clock,
  ArrowRight,
  X,
} from 'lucide-react';
import { GlobalSectionBlock } from '@/lib/types';

export default function GlobalSectionsView() {
  const { globalSections, updateGlobalSection, addToast } = useApp();

  const [editingBlock, setEditingBlock] = useState<GlobalSectionBlock | null>(null);
  const [formHeadline, setFormHeadline] = useState('');
  const [formSubheadline, setFormSubheadline] = useState('');
  const [formBody, setFormBody] = useState('');
  const [formBadge, setFormBadge] = useState('');

  // Warning Modal
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [isUpdatingAll, setIsUpdatingAll] = useState(false);

  const openEditor = (block: GlobalSectionBlock) => {
    setEditingBlock(block);
    setFormHeadline(block.headline);
    setFormSubheadline(block.subheadline);
    setFormBody(block.bodyContent);
    setFormBadge(block.badgeText);
  };

  const handleTriggerSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Open warning confirmation modal
    setWarningModalOpen(true);
  };

  const handleConfirmUpdateAll = () => {
    if (!editingBlock) return;
    setIsUpdatingAll(true);

    setTimeout(() => {
      updateGlobalSection(editingBlock.id, {
        headline: formHeadline,
        subheadline: formSubheadline,
        bodyContent: formBody,
        badgeText: formBadge,
      });

      setIsUpdatingAll(false);
      setWarningModalOpen(false);
      setEditingBlock(null);
    }, 1000);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
          <Layers className="w-3.5 h-3.5" />
          Master Content Synchronization
        </div>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
          Global Reusable Content Blocks
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          These universal blocks are embedded across all generated practice pages. Editing updates 1,246 URLs instantly.
        </p>
      </div>

      {/* Grid of Global Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {globalSections.map((block) => (
          <div
            key={block.id}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-mono text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Global Block: {block.key}
                </span>
                <span className="text-[11px] font-semibold text-blue-700 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  {block.usedOnPagesCount} Pages
                </span>
              </div>

              <h3 className="font-serif font-bold text-base text-slate-900 mt-3">
                {block.name}
              </h3>
              <div className="text-xs font-semibold text-amber-800 mt-1">
                {block.headline}
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                {block.bodyContent}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">{block.lastUpdated}</span>
              <button
                onClick={() => openEditor(block)}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit Block</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Slide-out / Modal Editor for Global Section */}
      {editingBlock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="font-serif font-bold text-base text-slate-900">
                  Editing Master Global Block: {editingBlock.name}
                </h3>
                <div className="text-xs text-amber-700 font-semibold mt-0.5">
                  Universal block synced across {editingBlock.usedOnPagesCount} pages
                </div>
              </div>
              <button
                onClick={() => setEditingBlock(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleTriggerSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Headline *
                </label>
                <input
                  type="text"
                  required
                  value={formHeadline}
                  onChange={(e) => setFormHeadline(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Subheadline / Supporting Claim
                </label>
                <input
                  type="text"
                  value={formSubheadline}
                  onChange={(e) => setFormSubheadline(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Main Legal Body Content *
                </label>
                <textarea
                  rows={5}
                  required
                  value={formBody}
                  onChange={(e) => setFormBody(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Trust Badge Text
                </label>
                <input
                  type="text"
                  value={formBadge}
                  onChange={(e) => setFormBadge(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingBlock(null)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium shadow"
                >
                  Review & Update Pages
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EXACT PROMPT REQUIREMENT: Warning Confirmation Modal */}
      {warningModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-serif font-bold text-lg text-slate-900">
                Confirm Global Content Propagation
              </h3>
              <p className="text-sm font-semibold text-amber-900 bg-amber-50 p-3 rounded-lg border border-amber-200 mt-3">
                &ldquo;This section is currently used on 1,246 pages.&rdquo;
              </p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Applying these edits will immediately re-render this content block on every Houston, Katy, Sugar Land, and regional practice page.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setWarningModalOpen(false)}
                disabled={isUpdatingAll}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmUpdateAll}
                disabled={isUpdatingAll}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg shadow transition-colors flex items-center gap-1.5"
              >
                {isUpdatingAll ? (
                  <span>Updating 1,246 Pages...</span>
                ) : (
                  <span>Update All Pages</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
