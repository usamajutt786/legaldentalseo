'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import {
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Download,
} from 'lucide-react';

export default function BulkImportView() {
  const { importCsvDrafts, setAdminTab } = useApp();

  const sampleCsvContent = `City, Practice Area
Houston, Car Accident Lawyer
Houston, Truck Accident Lawyer
Katy, Car Accident Lawyer
Cypress, Slip and Fall Lawyer`;

  const [csvText, setCsvText] = useState(sampleCsvContent);
  const [includeDuplicateRow, setIncludeDuplicateRow] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importedSuccessCount, setImportedSuccessCount] = useState<number | null>(null);

  // Parse lines
  const parseRows = () => {
    const rawLines = csvText.trim().split('\n');
    const header = rawLines[0];
    const dataLines = rawLines.slice(1);

    const rows = dataLines
      .map((line, i) => {
        const parts = line.split(',');
        const city = parts[0]?.trim() || '';
        const practice = parts[1]?.trim() || '';

        const isValid = city.length > 0 && practice.length > 0;
        const isDuplicate = city.toLowerCase() === 'houston' && practice.toLowerCase() === 'car accident lawyer';

        return {
          id: i + 1,
          city,
          practice,
          valid: isValid,
          isDuplicate: includeDuplicateRow && i === 1 ? true : false,
          error:
            includeDuplicateRow && i === 1
              ? 'Duplicate: Target URL already indexed in database'
              : !isValid
              ? 'Invalid: Missing city or practice discipline'
              : null,
        };
      })
      .filter((r) => r.city || r.practice);

    return rows;
  };

  const rows = parseRows();
  const validRowsCount = rows.filter((r) => r.valid && !r.isDuplicate).length;
  const errorRowsCount = rows.filter((r) => !r.valid || r.isDuplicate).length;

  const handleCreateDrafts = async () => {
    setIsProcessing(true);
    const validPairs = rows
      .filter((r) => r.valid && !r.isDuplicate)
      .map((r) => ({ city: r.city, practice: r.practice }));

    const count = await importCsvDrafts(validPairs);
    setIsProcessing(false);
    setImportedSuccessCount(count);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
          <UploadCloud className="w-3.5 h-3.5" />
          Batch Ingestion
        </div>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
          Bulk CSV Page Importer
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Paste or upload CSV files containing city and practice area targets to generate programmatic drafts at scale.
        </p>
      </div>

      {/* CSV Input Panel */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <h3 className="font-serif font-bold text-base text-slate-900">
              CSV Data Input
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => {
                setIncludeDuplicateRow(!includeDuplicateRow);
                setImportedSuccessCount(null);
              }}
              className={`px-2.5 py-1 rounded border text-[11px] font-medium transition-colors ${
                includeDuplicateRow
                  ? 'bg-rose-50 border-rose-300 text-rose-800'
                  : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}
            >
              Simulate Error State: {includeDuplicateRow ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={() => {
                setCsvText(sampleCsvContent);
                setIncludeDuplicateRow(false);
                setImportedSuccessCount(null);
              }}
              className="px-2.5 py-1 text-blue-600 hover:underline"
            >
              Reset Sample
            </button>
          </div>
        </div>

        <textarea
          rows={5}
          value={csvText}
          onChange={(e) => {
            setCsvText(e.target.value);
            setImportedSuccessCount(null);
          }}
          className="w-full p-3 font-mono text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="City, Practice Area"
        />

        {/* Validation Status Strip */}
        <div className="flex flex-wrap items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>{validRowsCount} valid rows</span>
            </span>
            <span
              className={`flex items-center gap-1.5 font-bold ${
                errorRowsCount > 0 ? 'text-rose-700' : 'text-slate-500'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{errorRowsCount} errors</span>
            </span>
          </div>

          <button
            onClick={handleCreateDrafts}
            disabled={validRowsCount === 0 || isProcessing}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow disabled:opacity-50"
          >
            {isProcessing ? (
              <span>Creating Drafts...</span>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Create {validRowsCount} Page Drafts</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success Banner if Imported */}
      {importedSuccessCount !== null && (
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="font-bold">
              {importedSuccessCount} new programmatic page drafts created and loaded into Editorial Review.
            </span>
          </div>
          <button
            onClick={() => setAdminTab('pages')}
            className="px-3 py-1.5 bg-emerald-700 text-white font-medium rounded-lg hover:bg-emerald-600"
          >
            View Pages →
          </button>
        </div>
      )}

      {/* Parsed Preview Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 font-serif font-bold text-slate-900 text-sm">
          Parsed CSV Table Preview
        </div>

        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Practice Area</th>
              <th className="px-4 py-3">Target Slug</th>
              <th className="px-4 py-3">Validation Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {rows.map((r) => (
              <tr
                key={r.id}
                className={
                  r.error ? 'bg-rose-50/50' : 'hover:bg-slate-50 transition-colors'
                }
              >
                <td className="px-4 py-3 font-mono text-slate-400">{r.id}</td>
                <td className="px-4 py-3 font-bold text-slate-900">{r.city}</td>
                <td className="px-4 py-3 text-slate-700">{r.practice}</td>
                <td className="px-4 py-3 font-mono text-blue-700 text-[11px]">
                  /{r.city.toLowerCase().replace(/\s+/g, '-')}/
                  {r.practice.toLowerCase().replace(/\s+/g, '-')}/
                </td>
                <td className="px-4 py-3">
                  {r.error ? (
                    <span className="text-[10px] text-rose-700 bg-rose-100 font-semibold px-2 py-0.5 rounded">
                      {r.error}
                    </span>
                  ) : (
                    <span className="text-[10px] text-emerald-700 bg-emerald-100 font-semibold px-2 py-0.5 rounded">
                      ✓ Ready for Draft Creation
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
