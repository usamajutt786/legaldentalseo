'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/context';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Scale,
  Award,
  Building,
} from 'lucide-react';

export function PublicAttorneysPage() {
  const { currentPhoneNumber, setConsultationModalOpen } = useApp();

  return (
    <div className="min-h-screen bg-white text-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2">
            Trial Counsel
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Our Personal Injury Attorneys
          </h1>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Our trial partners bring over 50 combined years of relentless courtroom advocacy against corporate insurers, trucking conglomerates, and petrochemical operators across Texas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-36 h-36 relative rounded-lg overflow-hidden shrink-0 border border-slate-300">
                <Image
                  src="/images/attorney_harrison_1790472805360.jpg"
                  alt="Richard Harrison"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-slate-900">
                  Richard E. Harrison
                </h3>
                <div className="text-xs font-semibold text-amber-700 mt-0.5">
                  Senior Managing Trial Partner · Board Certified Personal Injury Trial Law
                </div>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  Admitted to the Texas Bar in 1998, Richard has recovered more than $95 million for clients injured in catastrophic commercial trucking accidents and refinery explosions. He has taken over 90 cases through jury verdict.
                </p>
                <div className="mt-3 text-[11px] text-slate-500">
                  University of Texas School of Law (J.D.) · Houston Bar Association
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">Admitted: Supreme Court of Texas</span>
              <button
                onClick={() => setConsultationModalOpen(true)}
                className="px-3 py-1.5 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800"
              >
                Request Consultation
              </button>
            </div>
          </div>

          <div className="p-8 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-36 h-36 relative rounded-lg overflow-hidden shrink-0 border border-slate-300">
                <Image
                  src="/images/attorney_cole_1790472821447.jpg"
                  alt="Victoria Cole"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-slate-900">
                  Victoria S. Cole
                </h3>
                <div className="text-xs font-semibold text-amber-700 mt-0.5">
                  Managing Partner · Lead Trial Counsel
                </div>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  Victoria represents families facing wrongful death and traumatic spinal injuries. Known for uncovering corporate black-box telematics tampering, she recently secured a $12.5M jury award in Fort Bend County.
                </p>
                <div className="mt-3 text-[11px] text-slate-500">
                  University of Houston Law Center (J.D.) · Texas Trial Lawyers Association
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">Admitted: Supreme Court of Texas, Federal 5th Circuit</span>
              <button
                onClick={() => setConsultationModalOpen(true)}
                className="px-3 py-1.5 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800"
              >
                Request Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PublicResultsPage() {
  const { setConsultationModalOpen, currentPhoneNumber } = useApp();

  const settlements = [
    { amount: '$12,500,000', type: '18-Wheeler Truck Crash', county: 'Harris County, TX', desc: 'Commercial freight carrier violated federal hours of service rules resulting in traumatic brain injury.' },
    { amount: '$7,800,000', type: 'Oilfield Machinery Collapse', county: 'Brazoria County, TX', desc: 'Subcontractor equipment failure resulting in severe crush injuries and spinal reconstruction.' },
    { amount: '$4,250,000', type: 'Highway Rear-End Commercial Van', county: 'Montgomery County, TX', desc: 'Delivery fleet driver texting at highway speed causing multi-level spinal fusion.' },
    { amount: '$3,100,000', type: 'Chemical Plant Flash Fire', county: 'Harris County, TX', desc: 'Premises operator failed to purge combustible volatile gases before pipefitting operations.' },
    { amount: '$2,850,000', type: 'Pedestrian Crosswalk Impact', county: 'Fort Bend County, TX', desc: 'Commercial shuttle driver failed to yield right-of-way during left turn.' },
    { amount: '$2,400,000', type: 'Commercial Premises Retail Fall', county: 'Fort Bend County, TX', desc: 'Dangerous uncleaned chemical solvent spill in major big-box department store.' },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2">
            Proven Verdict Record
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Case Results: Over $145 Million Won
          </h1>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Our courtroom track record provides immense leverage during settlement negotiations. Insurance defense firms know we do not hesitate to proceed to trial.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {settlements.map((res, i) => (
            <div key={i} className="p-6 rounded-xl border border-slate-200 bg-white hover:border-slate-900 transition-all shadow-sm">
              <div className="text-3xl font-serif font-bold text-amber-700 tabular-nums">
                {res.amount}
              </div>
              <div className="text-sm font-semibold text-slate-900 mt-1">
                {res.type}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {res.county}
              </div>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                {res.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-slate-950 text-white rounded-xl text-center max-w-3xl mx-auto">
          <h3 className="font-serif font-bold text-xl text-white">
            Have a Potential Injury Claim in Texas?
          </h3>
          <p className="text-xs text-slate-300 mt-2">
            Every case is unique. Call us directly for a confidential evaluation.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setConsultationModalOpen(true)}
              className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-400"
            >
              Start Free Case Evaluation
            </button>
            <a
              href={`tel:${currentPhoneNumber.replace(/\D/g, '')}`}
              className="px-5 py-2.5 bg-slate-900 border border-slate-700 text-white font-bold text-xs rounded-lg hover:bg-slate-800"
            >
              Call {currentPhoneNumber}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PublicAboutPage() {
  const { setConsultationModalOpen } = useApp();

  return (
    <div className="min-h-screen bg-white text-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2">
            About Harrison & Cole
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Built for High-Stakes Texas Personal Injury Litigation
          </h1>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            Founded on the principle that injury victims deserve the same formidable trial resources and financial firepower as Fortune 500 defense firms.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8 text-sm text-slate-700 leading-relaxed">
          <div className="p-8 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="font-serif font-bold text-lg text-slate-900 mb-2">
              Our Core Philosophy: Preparation for the Jury
            </h3>
            <p>
              Most personal injury firms advertise heavily on television only to quietly pass cases off to junior associates who settle for whatever the insurance adjuster first offers. Harrison & Cole was established as an antidote to this settlement-mill model. From day one, we treat every case as if it is headed into trial before a Harris County jury.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-slate-200 rounded-xl">
              <h4 className="font-serif font-bold text-base text-slate-900 mb-2">
                Deep Greater Houston Roots
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                With office locations throughout Downtown Houston, Katy, Sugar Land, and The Woodlands, our attorneys understand local juries, local highway traffic patterns, and the distinct characteristics of each county courthouse.
              </p>
            </div>
            <div className="p-6 border border-slate-200 rounded-xl">
              <h4 className="font-serif font-bold text-base text-slate-900 mb-2">
                100% Contingency Commitment
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We advance all filing fees, deposition videographers, accident reconstruction animators, and physician witness fees. If there is no recovery, our clients owe zero reimbursement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PublicContactPage() {
  const { currentPhoneNumber, addToast } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast({
      type: 'success',
      title: 'Inquiry Dispatched',
      description: 'Your message has been securely sent to our intake legal team.',
    });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2">
            Connect With Our Legal Team
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Contact Harrison & Cole
          </h1>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Our offices are open 24 hours a day, 7 days a week. Call immediately for emergency accident response.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 bg-slate-50 p-8 rounded-xl border border-slate-200">
            {submitted ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  Message Transmitted
                </h3>
                <p className="text-xs text-slate-600 mt-2">
                  Thank you, {name}. Our intake director will call you at {phone} within 15 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Message / Case Details
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
                >
                  Send Confidential Message
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-slate-900 text-white rounded-xl space-y-4 border border-slate-800">
              <div className="font-serif font-bold text-lg text-white">
                Main Trial Headquarters
              </div>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>Downtown Houston:</strong>
                    <div>1000 Louisiana St, Suite 4800</div>
                    <div>Houston, TX 77002</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <a href={`tel:${currentPhoneNumber.replace(/\D/g, '')}`} className="font-mono font-bold text-amber-400 text-sm">
                    {currentPhoneNumber}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>intake@harrisoncoleinjurylaw.com</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-slate-600">
              <div className="font-bold text-slate-900">Regional Branch Offices:</div>
              <div>• <strong>Katy:</strong> 22201 Katy Freeway, Suite 300, Katy, TX</div>
              <div>• <strong>The Woodlands:</strong> 1790 Hughes Landing Blvd, Suite 400</div>
              <div>• <strong>Sugar Land:</strong> 1600 Highway 6, Suite 250, Sugar Land, TX</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
