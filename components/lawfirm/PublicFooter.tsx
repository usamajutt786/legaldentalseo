'use client';

import React from 'react';
import { useApp } from '@/lib/context';
import { Phone, MapPin, Mail, Shield, Scale, Clock, ExternalLink } from 'lucide-react';

export default function PublicFooter() {
  const {
    currentPhoneNumber,
    cities,
    practiceAreas,
    setSelectedPageId,
    setPublicRoute,
    setAppMode,
    setAdminTab,
  } = useApp();

  const handleCityPracticeClick = (citySlug: string, practiceSlug: string) => {
    setSelectedPageId(`page-${citySlug}-${practiceSlug}`);
    setPublicRoute('page');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-24 md:pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          {/* Col 1: Firm Identity */}
          <div className="space-y-4">
            <div>
              <div className="text-xl font-serif font-bold text-white tracking-tight">
                Harrison & Cole
              </div>
              <div className="text-[10px] uppercase tracking-widest text-amber-400 mt-0.5 font-semibold">
                Injury Attorneys · Texas Trial Lawyers
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Relentless trial advocacy for individuals and families catastrophically injured across Houston and Greater Texas. Over $145 million recovered against commercial trucking fleets and insurance conglomerates.
            </p>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <a href={`tel:${currentPhoneNumber.replace(/\D/g, '')}`} className="font-bold text-white hover:text-amber-400">
                  {currentPhoneNumber}
                </a>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800">
                  24/7 Intake
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>1000 Louisiana St, Suite 4800, Houston, TX 77002</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>intake@harrisoncoleinjurylaw.com</span>
              </div>
            </div>
          </div>

          {/* Col 2: Top Practice Areas */}
          <div>
            <div className="text-white font-semibold uppercase tracking-wider text-xs mb-3 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              Practice Areas
            </div>
            <ul className="space-y-1.5 text-slate-400">
              {practiceAreas.slice(0, 8).map((pa) => (
                <li key={pa.id}>
                  <button
                    onClick={() => handleCityPracticeClick('houston', pa.slug)}
                    className="hover:text-amber-400 transition-colors text-left"
                  >
                    Houston {pa.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Texas Service Cities */}
          <div>
            <div className="text-white font-semibold uppercase tracking-wider text-xs mb-3 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Cities Served
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-slate-400">
              {cities.slice(0, 14).map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleCityPracticeClick(c.slug, 'car-accident-lawyer')}
                  className="hover:text-amber-400 transition-colors text-left truncate"
                >
                  {c.name} Injury Law
                </button>
              ))}
            </div>
          </div>

          {/* Col 4: Rapid Case Evaluation & Demo Nav */}
          <div className="space-y-3">
            <div className="text-white font-semibold uppercase tracking-wider text-xs mb-1 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              No-Fee Guarantee
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              We advance all investigation and expert court fees. You will never pay an out-of-pocket dollar unless we secure financial compensation for your injury.
            </p>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
              <div className="text-[11px] font-semibold text-amber-400">
                SEO Programmatic Architecture
              </div>
              <p className="text-[11px] text-slate-400">
                This public site is dynamically powered by LexScale Programmatic SEO. Over 1,280 pages generated from template matrices.
              </p>
              <button
                onClick={() => {
                  setAppMode('admin');
                  setAdminTab('dashboard');
                }}
                className="w-full py-1.5 px-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-[11px] font-medium transition-colors flex items-center justify-center gap-1"
              >
                <span>Open Internal SEO Dashboard</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer & Bar Ethics Notice */}
        <div className="py-6 border-b border-slate-900 text-[11px] text-slate-400 space-y-2 leading-relaxed">
          <p>
            <strong>ATTORNEY ADVERTISING & ETHICS NOTICE:</strong> The personal injury and accident information presented on this website is for general educational purposes only and does not constitute formal legal advice. Neither visiting this website nor contacting Harrison & Cole via online form creates an attorney-client relationship. Past case results ($145M+ total recoveries, specific verdicts and settlements) do not guarantee or predict future outcomes, as each personal injury claim depends on distinct factual, liability, and insurance circumstances.
          </p>
          <p>
            Principal office: 1000 Louisiana St, Suite 4800, Houston, TX 77002. Lawyers licensed by the Supreme Court of Texas. Unless specifically noted in individual attorney biographies, attorneys are not certified by the Texas Board of Legal Specialization.
          </p>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} Harrison & Cole Injury Attorneys, LLP. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-slate-300 cursor-pointer">Accessibility</span>
            <span>·</span>
            <span className="text-amber-400 font-mono">DNI Tracking Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
