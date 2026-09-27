'use client';

import React from 'react';
import { useApp } from '@/lib/context';
import { Phone, FileText, MessageSquare, Shield, X } from 'lucide-react';

export default function StickyCtaBar() {
  const {
    currentPhoneNumber,
    stickyCtaConfig,
    setConsultationModalOpen,
    setPublicRoute,
    trafficSource,
  } = useApp();

  const [desktopDismissed, setDesktopDismissed] = React.useState(false);

  if (!stickyCtaConfig.desktopEnabled && !stickyCtaConfig.mobileEnabled) return null;

  return (
    <>
      {/* Mobile Fixed Bottom Action Bar (<= 15% viewport height compliance) */}
      {stickyCtaConfig.mobileEnabled && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-2 shadow-2xl">
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`tel:${currentPhoneNumber.replace(/\D/g, '')}`}
              className="py-2.5 px-3 bg-slate-900 border border-amber-500/40 text-amber-400 font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 active:bg-slate-800"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{stickyCtaConfig.primaryButtonText}</span>
            </a>
            <button
              onClick={() => setConsultationModalOpen(true)}
              className="py-2.5 px-3 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 shadow-md active:bg-amber-400"
            >
              <FileText className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{stickyCtaConfig.secondaryButtonText}</span>
            </button>
          </div>
        </div>
      )}

      {/* Desktop Floating Bottom-Right Card */}
      {stickyCtaConfig.desktopEnabled && !desktopDismissed && (
        <div className="hidden md:block fixed bottom-6 right-6 z-40 max-w-xs w-full bg-slate-900 text-white rounded-xl shadow-2xl border border-slate-700/80 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          {/* Header Strip */}
          <div className="bg-slate-950 px-3.5 py-2 border-b border-slate-800 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 text-amber-400 font-medium">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Available 24/7 · No Fee Unless We Win</span>
            </div>
            <button
              onClick={() => setDesktopDismissed(true)}
              className="text-slate-400 hover:text-white p-0.5"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4">
            <div className="text-xs font-serif font-bold text-white mb-1 leading-snug">
              {stickyCtaConfig.headline}
            </div>
            <p className="text-[11px] text-slate-300 mb-3">
              Speak directly with an attorney right now or request an instant free evaluation.
            </p>

            <div className="space-y-2">
              <a
                href={`tel:${currentPhoneNumber.replace(/\D/g, '')}`}
                className="w-full py-2 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {currentPhoneNumber}</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setConsultationModalOpen(true)}
                  className="py-1.5 px-2 bg-slate-800 hover:bg-slate-750 hover:text-amber-400 border border-slate-700 text-slate-200 text-[11px] font-medium rounded-lg transition-colors flex items-center justify-center gap-1"
                >
                  <FileText className="w-3 h-3" />
                  <span>Free Review</span>
                </button>
                <button
                  onClick={() => setPublicRoute('contact')}
                  className="py-1.5 px-2 bg-slate-800 hover:bg-slate-750 hover:text-amber-400 border border-slate-700 text-slate-200 text-[11px] font-medium rounded-lg transition-colors flex items-center justify-center gap-1"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>Contact Form</span>
                </button>
              </div>
            </div>

            <div className="mt-2 text-[10px] text-slate-400 text-center font-mono">
              CallRail Tracking: {trafficSource.toUpperCase()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
