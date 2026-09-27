'use client';

import React from 'react';
import { useApp } from '@/lib/context';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export default function Toaster() {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        const Icon =
          toast.type === 'success'
            ? CheckCircle2
            : toast.type === 'error'
            ? AlertCircle
            : toast.type === 'warning'
            ? AlertTriangle
            : Info;

        const borderClass =
          toast.type === 'success'
            ? 'border-emerald-500/40 bg-slate-900/95 text-white'
            : toast.type === 'error'
            ? 'border-rose-500/40 bg-slate-900/95 text-white'
            : toast.type === 'warning'
            ? 'border-amber-500/40 bg-slate-900/95 text-white'
            : 'border-blue-500/40 bg-slate-900/95 text-white';

        const iconColor =
          toast.type === 'success'
            ? 'text-emerald-400'
            : toast.type === 'error'
            ? 'text-rose-400'
            : toast.type === 'warning'
            ? 'text-amber-400'
            : 'text-blue-400';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg border shadow-xl backdrop-blur-md transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 ${borderClass}`}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 text-xs">
              <div className="font-semibold text-slate-100">{toast.title}</div>
              {toast.description && (
                <div className="text-slate-300 mt-0.5 leading-relaxed">{toast.description}</div>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
