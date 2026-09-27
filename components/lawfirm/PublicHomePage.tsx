'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/context';
import {
  ShieldCheck,
  Scale,
  Award,
  DollarSign,
  Phone,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  MapPin,
  Clock,
  Car,
  Truck,
  AlertTriangle,
  UserCheck,
  Briefcase,
  Layers,
} from 'lucide-react';

export default function PublicHomePage() {
  const {
    currentPhoneNumber,
    setConsultationModalOpen,
    setSelectedPageId,
    setPublicRoute,
    cities,
    practiceAreas,
    setAppMode,
    setAdminTab,
  } = useApp();

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSelectPage = (citySlug: string, practiceSlug: string) => {
    setSelectedPageId(`page-${citySlug}-${practiceSlug}`);
    setPublicRoute('page');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const results = [
    {
      amount: '$12,500,000',
      type: '18-Wheeler Catastrophic Collision',
      location: 'I-10 Katy Corridor',
      description: 'Severe traumatic brain injury and orthopedic reconstruction caused by fatigued commercial freight driver violating FMCSA service hours.',
    },
    {
      amount: '$4,250,000',
      type: 'Multi-Vehicle Commercial Crash',
      location: 'I-45 North Freeway, Houston',
      description: 'Rear-end commercial pickup fleet collision resulting in cervical spine fusion surgery and permanent disability.',
    },
    {
      amount: '$3,100,000',
      type: 'Industrial Premises Chemical Explosion',
      location: 'Pasadena Refinery District',
      description: 'Catastrophic burns and respiratory damage caused by subcontractor failure to adhere to OSHA flammability protocols.',
    },
    {
      amount: '$2,400,000',
      type: 'Commercial Retail Slip & Fall',
      location: 'Sugar Land Retail Center',
      description: 'Unmarked toxic cleaning solvent spill causing lumbar vertebrae fracture and permanent neurological impairment.',
    },
  ];

  const testimonials = [
    {
      quote: 'When an 18-wheeler slammed into my car on the Katy Freeway, the trucking company offered a quick $50,000 check. Harrison & Cole took the case, uncovered deleted logbooks, and won a life-changing $4.2M settlement.',
      name: 'Robert M. Castillo',
      caseType: 'Commercial Truck Accident',
      location: 'Katy, TX',
    },
    {
      quote: 'Richard Harrison stood before the Harris County jury with quiet, commanding authority. The insurance defense lawyers were completely outmatched. I couldn’t recommend a better trial firm.',
      name: 'Elena Rostova',
      caseType: 'Severe Auto Collision',
      location: 'Houston, TX',
    },
    {
      quote: 'They treated my family with tremendous compassion while being absolute bulldogs against the corporate insurance lawyers. True professionals who answer their phones 24 hours a day.',
      name: 'David & Karen Thornton',
      caseType: 'Wrongful Death Claim',
      location: 'Sugar Land, TX',
    },
  ];

  const faqs = [
    {
      q: 'How much does it cost to retain Harrison & Cole for an injury claim?',
      a: 'Zero dollars out of pocket. We operate on a strict contingency fee agreement. We advance 100% of the investigative, medical expert, and litigation costs. If we do not recover financial compensation for your injury, you owe us nothing.',
    },
    {
      q: 'How do I know if I have a valid personal injury claim in Texas?',
      a: 'If you suffered injuries due to another person’s or corporation’s negligence—whether an inattentive driver, reckless trucking company, or negligent property owner—you likely have a claim. Under Texas proportionate responsibility law, you can recover damages as long as you are not more than 50% at fault.',
    },
    {
      q: 'How long do I have to file an accident lawsuit in Texas?',
      a: 'Under Texas Civil Practice and Remedies Code § 16.003, the statute of limitations is two (2) years from the date of the accident. Failing to file within this window permanently extinguishes your claim.',
    },
    {
      q: 'What is the average timeline for an injury lawsuit in Harris County?',
      a: 'Straightforward settlements with tender of policy limits may resolve in 3 to 6 months. Complex commercial trucking or multi-party litigation requiring court filings and depositions typically takes 12 to 18 months to reach trial verdict or maximum settlement value.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* HERO SECTION */}
      <section className="relative bg-slate-950 text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src="/images/lawyer_courtroom_hero_1790472783938.jpg"
            alt="Harrison & Cole Trial Attorneys"
            fill
            className="object-cover object-center"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 lg:py-28">
          <div className="max-w-2xl">
            {/* Subtle editorial kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Greater Houston Trial Lawyers · Over $145M Recovered</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight [text-wrap:balance]">
              Fierce Advocacy. Proven Courtroom Results.
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              When catastrophic accidents occur on I-45, I-10, or Texas job sites, corporate insurance adjusters fight to protect their bottom line. At Harrison & Cole, we prepare every claim for jury trial to force maximum financial settlements.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setConsultationModalOpen(true)}
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-lg transition-all shadow-lg hover:shadow-amber-500/20 flex items-center gap-2"
              >
                <span>Free Case Evaluation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${currentPhoneNumber.replace(/\D/g, '')}`}
                className="px-5 py-3.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-white font-bold text-sm rounded-lg transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call {currentPhoneNumber}</span>
              </a>
            </div>

            {/* CallRail source note */}
            <div className="mt-4 text-[11px] text-slate-400 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
              <span>
                24/7 Rapid Intake Response · Free Confidential Consultation
              </span>
            </div>
          </div>

          {/* Trust Indicators Strip */}
          <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl">
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-400 tabular-nums">
                $145M+
              </div>
              <div className="text-xs text-slate-300 mt-1">Total Client Recoveries</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums">
                99%
              </div>
              <div className="text-xs text-slate-300 mt-1">Trial & Settlement Success Rate</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums">
                140+
              </div>
              <div className="text-xs text-slate-300 mt-1">Jury Verdicts Taken to Judgment</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-400 tabular-nums">
                $0
              </div>
              <div className="text-xs text-slate-300 mt-1">Upfront Fees (No Win, No Fee)</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US (Global Block Preview) */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2">
              The Harrison & Cole Distinction
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
              Why Injured Texans Trust Our Trial Lawyers
            </h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Unlike advertising settlement mills that accept pennies on the dollar to avoid the courtroom, our firm investigates every case with full courtroom trial resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-slate-900 mb-2">
                Respected Courtroom Trial Advocates
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Insurance companies maintain internal risk databases. When Harrison & Cole files an appearance, adjusters know we have the trial capital and willingness to proceed to a jury verdict.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center mb-4">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-slate-900 mb-2">
                Full Financial Investigation War Chest
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We invest tens of thousands in forensic accident reconstruction, ECM black box analysis, toxicologists, and life-care planners to substantiate maximum damages.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-slate-900 mb-2">
                Zero Financial Risk for Your Family
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Under our strict contingency guarantee, you owe zero attorney fees, zero filing fees, and zero investigative charges unless we win compensation for your claim.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRACTICE AREAS PROGRAMMATIC HUB */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2">
                Legal Capabilities
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                Our Practice Areas Across Texas
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Click any practice area to view our localized programmatic landing pages.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSelectPage('houston', 'car-accident-lawyer')}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
              >
                <span>View Houston Car Accident Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceAreas.slice(0, 9).map((pa) => (
              <div
                key={pa.id}
                className="group p-6 rounded-xl border border-slate-200 hover:border-slate-900 transition-all hover:shadow-md bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-semibold text-amber-700 mb-1">
                    {pa.category}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    {pa.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Aggressive legal representation against negligent motorists, trucking corporations, and insurance adjusters.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">
                    Avg: {pa.statAvgSettlement}
                  </span>
                  <button
                    onClick={() => handleSelectPage('houston', pa.slug)}
                    className="font-semibold text-slate-900 group-hover:text-amber-600 flex items-center gap-1"
                  >
                    <span>View Houston Page</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Notice: Programmatic Architecture */}
          <div className="mt-10 p-4 bg-slate-900 text-white rounded-xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="font-semibold text-amber-400">SEO Platform Matrix: </span>
                <span>These {practiceAreas.length} practice areas automatically scale across 20 cities to produce 1,280+ unique landing pages.</span>
              </div>
            </div>
            <button
              onClick={() => {
                setAppMode('admin');
                setAdminTab('scalability');
              }}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg transition-colors whitespace-nowrap"
            >
              Open Scalability Calculator →
            </button>
          </div>
        </div>
      </section>

      {/* NOTABLE VERDICTS & SETTLEMENTS */}
      <section className="py-16 sm:py-20 bg-slate-950 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              Proven Courtroom Results
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Significant Verdicts & Settlements
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              A sample of the multi-million dollar recoveries secured by our Texas trial team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((res, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-400 tabular-nums">
                  {res.amount}
                </div>
                <div className="text-sm font-semibold text-white mt-1">
                  {res.type}
                </div>
                <div className="text-xs text-emerald-400 flex items-center gap-1.5 mt-1 font-medium">
                  <MapPin className="w-3 h-3" />
                  <span>{res.location}</span>
                </div>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  {res.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEET OUR ATTORNEYS */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2">
              Leadership & Trial Partners
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
              Meet Harrison & Cole Trial Partners
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Seasoned trial lawyers with over 50 combined years of high-stakes courtroom litigation experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Attorney 1 */}
            <div className="flex flex-col sm:flex-row gap-6 p-6 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="w-36 h-36 relative rounded-lg overflow-hidden shrink-0 border border-slate-300">
                <Image
                  src="/images/attorney_harrison_1790472805360.jpg"
                  alt="Richard Harrison, Senior Managing Partner"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-slate-900">
                  Richard E. Harrison
                </h3>
                <div className="text-xs font-semibold text-amber-700 mt-0.5">
                  Senior Managing Trial Partner · Board Certified
                </div>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  With 28 years of courtroom trial experience, Richard has tried more than 90 cases to verdict in Texas District and Federal courts. He focuses on catastrophic trucking crashes and traumatic brain injuries.
                </p>
                <div className="mt-3 text-[11px] text-slate-500">
                  J.D., University of Texas School of Law · Martindale-Hubbell AV Preeminent
                </div>
              </div>
            </div>

            {/* Attorney 2 */}
            <div className="flex flex-col sm:flex-row gap-6 p-6 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="w-36 h-36 relative rounded-lg overflow-hidden shrink-0 border border-slate-300">
                <Image
                  src="/images/attorney_cole_1790472821447.jpg"
                  alt="Victoria Cole, Managing Partner"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-slate-900">
                  Victoria S. Cole
                </h3>
                <div className="text-xs font-semibold text-amber-700 mt-0.5">
                  Managing Partner · Lead Trial Counsel
                </div>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  Victoria is a recognized leader in commercial fleet liability and wrongful death claims. She has secured over $65 million for injured families across Fort Bend and Harris County.
                </p>
                <div className="mt-3 text-[11px] text-slate-500">
                  J.D., University of Houston Law Center · Texas Trial Lawyers Association
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT TESTIMONIALS */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2">
              Client Testimonials
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
              Words From the Clients We’ve Fought For
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <p className="text-xs text-slate-700 italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="font-serif font-bold text-slate-900 text-sm">
                    {t.name}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {t.caseType} · {t.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS SERVED (20 CITIES) */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2">
              Local Court & Community Presence
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
              Greater Houston & Texas Locations Served
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              We represent injured victims across 20 municipalities in Harris, Fort Bend, Montgomery, and Brazoria counties.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {cities.map((city) => (
              <button
                key={city.id}
                onClick={() => handleSelectPage(city.slug, 'car-accident-lawyer')}
                className="p-3 text-left rounded-lg border border-slate-200 hover:border-slate-900 hover:bg-slate-50 transition-colors group"
              >
                <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors flex items-center justify-between">
                  <span>{city.name}</span>
                  <MapPin className="w-3 h-3 text-slate-400 group-hover:text-amber-700" />
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                  {city.county}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2">
              Frequently Asked Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
              Personal Injury Claims in Texas
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif font-bold text-slate-900 text-sm hover:text-amber-800 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="py-16 sm:py-20 bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            Time is Limited to Protect Your Claim
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight [text-wrap:balance]">
            Do Not Let Insurance Adjusters Undervalue Your Injury
          </h2>
          <p className="mt-4 text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Our Texas trial lawyers are ready to review your crash report and medical records today. 100% free consultation.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setConsultationModalOpen(true)}
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-lg transition-colors shadow-lg"
            >
              Start Free Case Evaluation
            </button>
            <a
              href={`tel:${currentPhoneNumber.replace(/\D/g, '')}`}
              className="px-6 py-3.5 bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white font-bold text-sm rounded-lg transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call {currentPhoneNumber}</span>
            </a>
          </div>

          <div className="mt-4 text-[11px] text-slate-400">
            Available 24 hours a day, 7 days a week · Calls answered by live intake staff
          </div>
        </div>
      </section>
    </div>
  );
}
