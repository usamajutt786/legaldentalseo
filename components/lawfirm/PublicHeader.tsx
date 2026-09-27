'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import { Phone, Clock, Shield, Menu, X, ChevronDown } from 'lucide-react';

export default function PublicHeader() {
  const {
    publicRoute,
    setPublicRoute,
    currentPhoneNumber,
    setConsultationModalOpen,
    trafficSource,
    practiceAreas,
    cities,
    setSelectedPageId,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [practicesDropdown, setPracticesDropdown] = useState(false);
  const [locationsDropdown, setLocationsDropdown] = useState(false);

  const navigateTo = (route: any) => {
    setPublicRoute(route);
    setMobileMenuOpen(false);
    setPracticesDropdown(false);
    setLocationsDropdown(false);
  };

  const selectPracticePage = (citySlug: string, practiceSlug: string) => {
    // find or generate
    const pageId = `page-${citySlug}-${practiceSlug}`;
    setSelectedPageId(pageId);
    setPublicRoute('page');
    setPracticesDropdown(false);
    setLocationsDropdown(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-slate-950 text-white border-b border-slate-800">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 border-b border-slate-800/80 text-[11px] text-slate-300 py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>Available 24/7/365 · Free Consultation</span>
            </span>
            <span className="hidden md:inline text-slate-500">·</span>
            <span className="hidden md:inline text-slate-400">
              No Fee Unless We Win · 99% Success Rate
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
              <span className="text-emerald-400 font-medium">CallRail DNI Active:</span>
              <span className="capitalize">{trafficSource.replace('_', ' ')}</span>
            </div>
            <a
              href={`tel:${currentPhoneNumber.replace(/\D/g, '')}`}
              className="font-mono font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>{currentPhoneNumber}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation (3-Zone Top Bar Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Zone 1: Single element wordmark */}
        <button
          onClick={() => navigateTo('home')}
          className="text-left group focus:outline-none"
        >
          <div className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
            Harrison & Cole
          </div>
          <div className="text-[10px] uppercase tracking-widest text-slate-400 -mt-0.5">
            Injury Attorneys · Texas Trial Lawyers
          </div>
        </button>

        {/* Zone 2: Clean 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-300">
          <button
            onClick={() => navigateTo('home')}
            className={`hover:text-white transition-colors pb-0.5 ${
              publicRoute === 'home' ? 'text-amber-400 border-b border-amber-400' : ''
            }`}
          >
            Home
          </button>

          {/* Practice Areas Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setPracticesDropdown(!practicesDropdown);
                setLocationsDropdown(false);
              }}
              className="flex items-center gap-1 hover:text-white transition-colors pb-0.5"
            >
              <span>Practice Areas</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            {practicesDropdown && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-lg shadow-xl p-2 z-50 animate-in fade-in">
                <div className="text-[10px] font-semibold text-slate-400 uppercase px-2 py-1">
                  Programmatic Landing Pages
                </div>
                {practiceAreas.slice(0, 7).map((pa) => (
                  <button
                    key={pa.id}
                    onClick={() => selectPracticePage('houston', pa.slug)}
                    className="w-full text-left px-2.5 py-1.5 text-xs text-slate-200 hover:bg-slate-800 rounded transition-colors"
                  >
                    Houston {pa.name}
                  </button>
                ))}
                <button
                  onClick={() => selectPracticePage('katy', 'truck-accident-lawyer')}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-amber-400 hover:bg-slate-800 rounded transition-colors font-medium"
                >
                  Katy Truck Accident Lawyer →
                </button>
              </div>
            )}
          </div>

          {/* Locations Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setLocationsDropdown(!locationsDropdown);
                setPracticesDropdown(false);
              }}
              className="flex items-center gap-1 hover:text-white transition-colors pb-0.5"
            >
              <span>Locations</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            {locationsDropdown && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-lg shadow-xl p-2 z-50 animate-in fade-in">
                <div className="text-[10px] font-semibold text-slate-400 uppercase px-2 py-1">
                  Greater Houston Service Areas
                </div>
                {cities.slice(0, 7).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => selectPracticePage(c.slug, 'car-accident-lawyer')}
                    className="w-full text-left px-2.5 py-1.5 text-xs text-slate-200 hover:bg-slate-800 rounded transition-colors"
                  >
                    {c.name} Car Accident Lawyer
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => navigateTo('attorneys')}
            className={`hover:text-white transition-colors pb-0.5 ${
              publicRoute === 'attorneys' ? 'text-amber-400 border-b border-amber-400' : ''
            }`}
          >
            Attorneys
          </button>
          <button
            onClick={() => navigateTo('results')}
            className={`hover:text-white transition-colors pb-0.5 ${
              publicRoute === 'results' ? 'text-amber-400 border-b border-amber-400' : ''
            }`}
          >
            Case Results
          </button>
          <button
            onClick={() => navigateTo('about')}
            className={`hover:text-white transition-colors pb-0.5 ${
              publicRoute === 'about' ? 'text-amber-400 border-b border-amber-400' : ''
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => navigateTo('contact')}
            className={`hover:text-white transition-colors pb-0.5 ${
              publicRoute === 'contact' ? 'text-amber-400 border-b border-amber-400' : ''
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`tel:${currentPhoneNumber.replace(/\D/g, '')}`}
            className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 py-1.5 px-3 rounded-lg border border-amber-400/40 hover:border-amber-400 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{currentPhoneNumber}</span>
          </a>

          <button
            onClick={() => setConsultationModalOpen(true)}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg transition-colors whitespace-nowrap shadow-sm"
          >
            Free Case Evaluation
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-slate-300 hover:text-white p-2"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-3">
          <nav className="flex flex-col gap-2 text-sm text-slate-200">
            <button
              onClick={() => navigateTo('home')}
              className="text-left py-2 px-2 hover:bg-slate-800 rounded font-medium"
            >
              Home
            </button>
            <button
              onClick={() => selectPracticePage('houston', 'car-accident-lawyer')}
              className="text-left py-2 px-2 hover:bg-slate-800 rounded font-medium text-amber-400"
            >
              Houston Car Accident Lawyer (Sample Page)
            </button>
            <button
              onClick={() => selectPracticePage('katy', 'truck-accident-lawyer')}
              className="text-left py-2 px-2 hover:bg-slate-800 rounded font-medium text-amber-400"
            >
              Katy Truck Accident Lawyer (Sample Page)
            </button>
            <button
              onClick={() => navigateTo('attorneys')}
              className="text-left py-2 px-2 hover:bg-slate-800 rounded"
            >
              Attorneys
            </button>
            <button
              onClick={() => navigateTo('results')}
              className="text-left py-2 px-2 hover:bg-slate-800 rounded"
            >
              Case Results ($145M+)
            </button>
            <button
              onClick={() => navigateTo('about')}
              className="text-left py-2 px-2 hover:bg-slate-800 rounded"
            >
              About Firm
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="text-left py-2 px-2 hover:bg-slate-800 rounded"
            >
              Contact
            </button>
          </nav>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setConsultationModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg text-center"
            >
              Free Case Evaluation
            </button>
            <a
              href={`tel:${currentPhoneNumber.replace(/\D/g, '')}`}
              className="w-full py-2 text-center text-xs font-bold text-amber-400 border border-amber-400/40 rounded-lg"
            >
              Call {currentPhoneNumber}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
