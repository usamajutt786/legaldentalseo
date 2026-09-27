'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/context';
import {
  ShieldCheck,
  Phone,
  Scale,
  DollarSign,
  Clock,
  ArrowRight,
  AlertTriangle,
  ChevronDown,
  MapPin,
  CheckCircle2,
  FileText,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export default function PublicPracticeCityPage() {
  const {
    selectedPageId,
    setSelectedPageId,
    pages,
    currentPhoneNumber,
    setConsultationModalOpen,
    globalSections,
    setAppMode,
    setAdminTab,
    cities,
    practiceAreas,
    trafficSource,
  } = useApp();

  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactNotes, setContactNotes] = useState('');

  // Find page data or fallback to Houston Car Accident
  const currentPage = pages.find((p) => p.id === selectedPageId) || pages[0];

  const cityObj = cities.find((c) => c.id === currentPage.cityId) || cities[0];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // Switcher helper
  const handlePageSwitch = (newId: string) => {
    setSelectedPageId(newId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* PROGRAMMATIC ARCHITECTURE DEMO BANNER */}
      <div className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500/20 text-amber-400 font-semibold px-2 py-0.5 rounded border border-amber-500/40 text-[11px] flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Programmatic SEO Dynamic Template
            </span>
            <span className="text-slate-400 hidden sm:inline">
              URL: <code className="text-amber-300 font-mono">{currentPage.url}</code>
            </span>
            <span className="text-emerald-400 text-[11px]">
              Surfer Score: {currentPage.seoScore}/100
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-[11px]">Switch Example:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePageSwitch('page-houston-car')}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                  currentPage.id === 'page-houston-car'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                Houston Car Crash
              </button>
              <button
                onClick={() => handlePageSwitch('page-katy-truck')}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                  currentPage.id === 'page-katy-truck'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                Katy 18-Wheeler Truck
              </button>
              <button
                onClick={() => handlePageSwitch('page-sugar-land-slip')}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                  currentPage.id === 'page-sugar-land-slip'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                Sugar Land Slip & Fall
              </button>
            </div>
            <button
              onClick={() => {
                setAppMode('admin');
                setAdminTab('page-editor');
              }}
              className="text-xs text-blue-400 hover:text-blue-300 underline ml-2 hidden md:inline"
            >
              Edit in SEO Admin →
            </button>
          </div>
        </div>
      </div>

      {/* BREADCRUMB */}
      <div className="bg-slate-100/80 border-b border-slate-200 text-xs text-slate-500 py-2.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 flex-wrap">
          <button onClick={() => setSelectedPageId('home')} className="hover:text-slate-900">
            Home
          </button>
          <span>/</span>
          <span className="text-slate-600">Locations</span>
          <span>/</span>
          <span className="text-slate-600">{currentPage.cityName}</span>
          <span>/</span>
          <span className="text-slate-900 font-semibold">{currentPage.practiceName}</span>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="bg-slate-950 text-white py-14 sm:py-20 border-b border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {currentPage.cityName}, Texas Trial Team · {cityObj.county}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight [text-wrap:balance]">
                {currentPage.h1}
              </h1>

              <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                {currentPage.introText}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setConsultationModalOpen(true)}
                  className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-lg transition-colors flex items-center gap-2 shadow-lg"
                >
                  <span>Free Case Evaluation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`tel:${currentPhoneNumber.replace(/\D/g, '')}`}
                  className="px-5 py-3.5 bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white font-bold text-sm rounded-lg transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call {currentPhoneNumber}</span>
                </a>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% No Win, No Fee Guarantee</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>24/7 Rapid Incident Intake</span>
                </div>
              </div>
            </div>

            {/* Right Quick Case Evaluation Card */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-xl p-6 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-900">
                    Get Help in {currentPage.cityName}
                  </h3>
                  <div className="text-[11px] text-slate-500">
                    Direct confidential case evaluation
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded border border-emerald-200">
                  Online
                </span>
              </div>

              {formSubmitted ? (
                <div className="py-8 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                  <div className="font-serif font-bold text-base text-slate-900">
                    Thank You, {contactName || 'Valued Client'}
                  </div>
                  <p className="text-xs text-slate-600 mt-2">
                    Our {currentPage.cityName} attorney team has received your incident details. An intake counsel will call {contactPhone || 'you'} shortly.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 text-xs text-blue-600 hover:underline"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="mt-4 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. David Martinez"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="(713) 555-0188"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tell us about your injury
                    </label>
                    <textarea
                      rows={2}
                      value={contactNotes}
                      onChange={(e) => setContactNotes(e.target.value)}
                      placeholder="Location, date, injuries sustained..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow"
                  >
                    <span>Request Free Case Evaluation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="text-[10px] text-slate-400 text-center">
                    All communications protected by Attorney-Client Privilege.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT WRAPPER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* SECTION 1: Localized Legal Content */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-bold text-slate-900">
                Understanding Your Legal Rights in {currentPage.cityName}, TX
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {currentPage.mainContentText}
              </p>
              <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-amber-900">
                    Texas Proportionate Responsibility Rule (§ 33.001)
                  </div>
                  <p className="mt-1 leading-relaxed">
                    Under Texas law, if an insurance carrier succeeds in assigning 51% or more of fault to you, you are legally barred from recovering any compensation. Our {currentPage.cityName} litigation team vigorously defends your liability percentage using traffic reconstruction data.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: COMMON CAUSES IN THIS CITY */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-bold text-slate-900">
                Common Causes of {currentPage.practiceName.replace(' Lawyer', '')} Accidents in {currentPage.cityName}
              </h2>
              <p className="text-xs text-slate-600">
                Based on TxDOT collision reporting in {cityObj.county}, the following negligence factors frequently trigger catastrophic crashes along {cityObj.majorHighways.join(', ')}:
              </p>
              <div className="space-y-2.5">
                {currentPage.commonCauses.map((cause, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-800 flex items-start gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-amber-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{cause}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* GLOBAL REUSABLE SECTION 1 (Visibly Identified as requested in prompt) */}
            <section className="p-6 bg-slate-900 text-white rounded-xl border-2 border-amber-500/40 relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                    Global Section 1 (Cookie-Cutter Block)
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  Used across {globalSections[0]?.usedOnPagesCount || 1246} pages
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                {globalSections[0]?.headline || 'Over $145 Million Won for Texas Victims'}
              </h2>
              <p className="text-xs text-amber-300 font-medium mt-1">
                {globalSections[0]?.subheadline}
              </p>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                {globalSections[0]?.bodyContent}
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>{globalSections[0]?.badgeText}</span>
                <span className="text-[11px] text-emerald-400">Synced via Template Engine</span>
              </div>
            </section>

            {/* SECTION 3: INJURIES & COMPENSATION */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-bold text-slate-900">
                Catastrophic Injuries & Recoverable Compensation
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">
                Injuries sustained in motor vehicle collisions and industrial accidents in {currentPage.cityName} often require extensive hospitalization, surgical intervention, and long-term physical therapy. At Harrison & Cole, we pursue full recovery for:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="font-serif font-bold text-sm text-slate-900 mb-1">
                    Economic Damages
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li>Immediate emergency room care and surgery</li>
                    <li>Ongoing physical therapy and medication</li>
                    <li>Lost wages and Diminished Future Earning Capacity</li>
                    <li>Property repair or full vehicle replacement</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="font-serif font-bold text-sm text-slate-900 mb-1">
                    Non-Economic Damages
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li>Physical pain and suffering</li>
                    <li>Mental anguish and PTSD trauma</li>
                    <li>Loss of enjoyment of life</li>
                    <li>Loss of consortium (for spouses)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* GLOBAL REUSABLE SECTION 2 (Contingency Guarantee) */}
            <section className="p-6 bg-slate-50 rounded-xl border-2 border-emerald-600/40 relative">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold">
                    Global Section 2 (Cookie-Cutter Block)
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">
                  Used across {globalSections[1]?.usedOnPagesCount || 1246} pages
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                {globalSections[1]?.headline || 'You Pay Zero Dollars Unless We Win'}
              </h2>
              <p className="text-xs text-slate-600 font-medium mt-1">
                {globalSections[1]?.subheadline}
              </p>
              <p className="text-xs text-slate-700 mt-3 leading-relaxed">
                {globalSections[1]?.bodyContent}
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-emerald-800">
                  {globalSections[1]?.badgeText}
                </span>
                <span className="text-[11px] text-slate-400">Universal Firm Policy</span>
              </div>
            </section>

            {/* WHAT TO DO AFTER AN ACCIDENT */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-bold text-slate-900">
                What To Do Immediately After an Accident in {currentPage.cityName}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-sm">
                  <div className="text-xs font-bold text-amber-700 mb-1">
                    Step 1: Contact Law Enforcement
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Ensure an officer files a formal Texas Peace Officer’s Crash Report (Form CR-3). Obtain the investigating officer&apos;s badge number.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-sm">
                  <div className="text-xs font-bold text-amber-700 mb-1">
                    Step 2: Seek Immediate Medical Care
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Adrenaline often masks serious soft-tissue and internal spinal injuries. Medical documentation creates critical causation proof.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-sm">
                  <div className="text-xs font-bold text-amber-700 mb-1">
                    Step 3: Document Collision Scene
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Photograph vehicle resting positions, skid marks, road conditions, and commercial carrier markings before tow trucks clear the scene.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-sm">
                  <div className="text-xs font-bold text-amber-700 mb-1">
                    Step 4: Do Not Give Recorded Statements
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Decline insurer interview requests until you have spoken to Harrison & Cole. Adjusters will use recorded answers to deny claims.
                  </p>
                </div>
              </div>
            </section>

            {/* GLOBAL REUSABLE SECTION 3 (4-Step Evaluation Protocol) */}
            <section className="p-6 bg-slate-900 text-white rounded-xl border-2 border-blue-500/40 relative">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold">
                    Global Section 3 (Cookie-Cutter Block)
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  Used across {globalSections[2]?.usedOnPagesCount || 1246} pages
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                {globalSections[2]?.headline || 'Our 4-Step Rapid Case Evaluation Protocol'}
              </h2>
              <p className="text-xs text-blue-300 font-medium mt-1">
                {globalSections[2]?.subheadline}
              </p>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                {globalSections[2]?.bodyContent}
              </p>
            </section>

            {/* LOCALIZED FAQ */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-bold text-slate-900">
                Frequently Asked Questions About {currentPage.cityName} {currentPage.practiceName} Claims
              </h2>

              <div className="space-y-3">
                {currentPage.faqList.map((faq, i) => {
                  const isOpen = activeFaq === i;
                  return (
                    <div
                      key={i}
                      className="border border-slate-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : i)}
                        className="w-full text-left p-4 bg-slate-50 flex items-center justify-between font-serif font-bold text-sm text-slate-900 hover:text-amber-800"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="p-4 text-xs text-slate-600 leading-relaxed border-t border-slate-200 bg-white">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SILOD INTERNAL LINKS SECTION */}
            <section className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-slate-900 text-base">
                  Related Practice Areas in {currentPage.cityName} & Surrounding Hubs
                </h3>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded">
                  Semantic SEO Internal Links
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {currentPage.internalLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      // navigate to target or find
                      const target = pages.find((p) => p.url === link.targetUrl);
                      if (target) {
                        setSelectedPageId(target.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="p-3 text-left bg-white rounded-lg border border-slate-200 hover:border-slate-900 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-semibold text-slate-900 group-hover:text-amber-700">
                        {link.anchorText}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {link.relationship}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-700" />
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Sticky Attorney Card */}
            <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 space-y-4 sticky top-20 shadow-xl">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-amber-400 relative mb-3">
                  <Image
                    src="/images/attorney_harrison_1790472805360.jpg"
                    alt="Attorney Richard Harrison"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="font-serif font-bold text-lg text-white">
                  Richard E. Harrison
                </div>
                <div className="text-xs text-amber-400">
                  Lead Trial Partner · {currentPage.cityName} Claims
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg text-xs space-y-2 border border-slate-800">
                <div className="text-slate-400 text-[11px]">Local Court Jurisdiction:</div>
                <div className="font-semibold text-slate-200 text-xs flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{currentPage.localCourthouse}</span>
                </div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800">
                  Regional Impact:
                </div>
                <div className="text-slate-300 text-xs">
                  {currentPage.statAccidentsYear}
                </div>
              </div>

              <a
                href={`tel:${currentPhoneNumber.replace(/\D/g, '')}`}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call {currentPhoneNumber}</span>
              </a>

              <button
                onClick={() => setConsultationModalOpen(true)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs rounded-lg transition-colors"
              >
                Schedule Free Consultation
              </button>

              <div className="pt-2 text-[10px] text-slate-400 text-center">
                DNI CallRail Tracking: <span className="font-mono text-amber-400">{trafficSource.toUpperCase()}</span>
              </div>
            </div>

            {/* Surfer SEO Inspector Box for Demo */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  Surfer SEO Audit
                </span>
                <span className="text-emerald-700 font-bold text-xs bg-emerald-100 px-2 py-0.5 rounded">
                  Score {currentPage.seoScore}
                </span>
              </div>

              <div className="text-xs text-slate-600">
                Word Count: <strong>{currentPage.wordCount}</strong> / 2,400 recommended
              </div>

              <div className="text-[11px] font-semibold text-slate-700 uppercase pt-2 border-t border-slate-200">
                NLP Keywords Density:
              </div>

              <div className="space-y-1.5">
                {currentPage.surferKeywords.slice(0, 4).map((kw, i) => (
                  <div key={i} className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-600 truncate max-w-[170px]">{kw.term}</span>
                    <span className="font-mono font-medium text-emerald-700 bg-emerald-50 px-1 rounded">
                      {kw.frequency}x ({kw.recommended})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
