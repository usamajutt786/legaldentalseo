'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import { X, ShieldCheck, CheckCircle2, Phone, ArrowRight, Clock } from 'lucide-react';

export default function ConsultationModal() {
  const { consultationModalOpen, setConsultationModalOpen, currentPhoneNumber, addToast } = useApp();

  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    injuryType: 'Car Accident',
    incidentDate: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!consultationModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      addToast({
        type: 'success',
        title: 'Case Evaluation Request Received',
        description: 'An intake attorney has been assigned to your confidential inquiry.',
      });
    }, 1000);
  };

  const handleClose = () => {
    setConsultationModalOpen(false);
    setTimeout(() => {
      setSubmitted(false);
      setStep(1);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              100% Confidential Case Review
            </div>
            <h3 className="text-xl font-serif font-bold text-white mt-1">
              Free Case Evaluation
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Zero upfront fees · No attorney fees unless we win compensation
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-serif font-bold text-slate-900">
                Evaluation Request Submitted
              </h4>
              <p className="text-sm text-slate-600 mt-2 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{formData.fullName || 'friend'}</strong>. Our rapid response intake team is reviewing your incident details. An attorney will call you shortly.
              </p>

              <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 text-left">
                <div className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  Need Immediate Help?
                </div>
                <div>Call our 24/7 direct attorney line right now:</div>
                <a
                  href={`tel:${currentPhoneNumber.replace(/\D/g, '')}`}
                  className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 px-3 py-1.5 rounded transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {currentPhoneNumber}
                </a>
              </div>

              <button
                onClick={handleClose}
                className="mt-6 w-full py-2.5 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Michael Vance"
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
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(713) 555-0199"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Injury / Incident Type
                  </label>
                  <select
                    value={formData.injuryType}
                    onChange={(e) => setFormData({ ...formData, injuryType: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  >
                    <option>Car Accident</option>
                    <option>18-Wheeler Truck Crash</option>
                    <option>Slip and Fall / Premises</option>
                    <option>Motorcycle Accident</option>
                    <option>Commercial Fleet Collision</option>
                    <option>Wrongful Death</option>
                    <option>Workplace / Industrial Injury</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Approximate Date
                  </label>
                  <input
                    type="date"
                    value={formData.incidentDate}
                    onChange={(e) => setFormData({ ...formData, incidentDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Briefly describe what happened and your injuries
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell us where the collision took place, who was at fault, and if you received medical treatment..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Case Information...</span>
                  ) : (
                    <>
                      <span>Submit Free Case Evaluation</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-[11px] text-slate-500 text-center leading-normal">
                Submitting this form does not create an attorney-client relationship. All transmissions are encrypted and held in strict confidence.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
