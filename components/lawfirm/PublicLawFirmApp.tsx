'use client';

import React from 'react';
import { useApp } from '@/lib/context';
import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';
import StickyCtaBar from './StickyCtaBar';
import ConsultationModal from './ConsultationModal';

import PublicHomePage from './PublicHomePage';
import PublicPracticeCityPage from './PublicPracticeCityPage';
import {
  PublicAttorneysPage,
  PublicResultsPage,
  PublicAboutPage,
  PublicContactPage,
} from './PublicOtherPages';

export default function PublicLawFirmApp() {
  const { publicRoute } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-slate-900 selection:bg-amber-400 selection:text-slate-950">
      {/* Public Law Firm Top Bar & Navigation */}
      <PublicHeader />

      {/* Main View Router */}
      <main className="flex-1">
        {publicRoute === 'home' && <PublicHomePage />}
        {publicRoute === 'page' && <PublicPracticeCityPage />}
        {publicRoute === 'attorneys' && <PublicAttorneysPage />}
        {publicRoute === 'results' && <PublicResultsPage />}
        {publicRoute === 'about' && <PublicAboutPage />}
        {publicRoute === 'contact' && <PublicContactPage />}
        {publicRoute === 'practice-areas' && <PublicHomePage />}
        {publicRoute === 'locations' && <PublicHomePage />}
        {publicRoute === 'faq' && <PublicHomePage />}
      </main>

      {/* Sticky Bottom-Right Hovering CTA (Desktop) + Mobile Fixed Bottom Bar */}
      <StickyCtaBar />

      {/* Universal Free Consultation Multi-Step Modal */}
      <ConsultationModal />

      {/* Authoritative Law Firm Footer */}
      <PublicFooter />
    </div>
  );
}
