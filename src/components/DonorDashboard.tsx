import React from 'react';
import {
  Utensils,
  Plus,
  Clock,
  CheckCircle2,
  FileText,
  DollarSign,
  Award,
  Sparkles,
  Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DonorDashboard: React.FC = () => {
  const { donations, setIsPostModalOpen, triggerConfetti } = useApp();

  const myDonations = donations.filter(d => d.donorName.includes('Grand') || d.donorName.includes('Golden') || d.donorName.includes('Green') || d.donorName.includes('Student') || d.donorName.includes('Nexus') || d.donorName.includes('Sunset'));

  const totalKg = myDonations.reduce((acc, d) => acc + d.quantityKg, 0);
  const totalCo2 = Math.round(totalKg * 2.5);
  const estimatedTaxCredit = Math.round(totalKg * 6.5); // $6.50 per kg estimated market tax credit

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Donor Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/20 via-[#1a0e36] to-violet-950 border border-amber-500/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs">
              🍲 Donor Portal
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold">
              FSSAI Hygiene Verified (99%)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
            Restaurant & Event Donor Command Center
          </h2>
          <p className="text-xs text-violet-300/80 mt-1">
            Manage active surplus food listings, track collection status in real-time, and download tax credit statements.
          </p>
        </div>

        <button
          onClick={() => setIsPostModalOpen(true)}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-extrabold text-xs shadow-xl shadow-amber-500/25 flex items-center gap-2 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          Post Surplus Food
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-[#160b29] border border-violet-800/50 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-violet-300">
            <Utensils className="w-4 h-4 text-amber-400" />
            Total Surplus Listed
          </div>
          <div className="text-2xl font-black text-white font-mono">{totalKg} kg</div>
          <div className="text-[10px] text-amber-400">100% diverted from landfill</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#160b29] border border-violet-800/50 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-violet-300">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Carbon Offset Saved
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">{totalCo2} kg</div>
          <div className="text-[10px] text-emerald-300">Verified CO₂e Reduction</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#160b29] border border-violet-800/50 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-violet-300">
            <DollarSign className="w-4 h-4 text-amber-400" />
            Est. Tax Deduction
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono">${estimatedTaxCredit}</div>
          <div className="text-[10px] text-violet-400">IRS Section 170(e)(3) compliant</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#160b29] border border-violet-800/50 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-violet-300">
            <Award className="w-4 h-4 text-violet-400" />
            Hygiene Badge Rating
          </div>
          <div className="text-2xl font-black text-white font-mono">99.2%</div>
          <div className="text-[10px] text-amber-400">Top 5% Donor Rank</div>
        </div>

      </div>

      {/* Donor Active Listings Table */}
      <div className="p-6 rounded-3xl bg-[#160b29] border border-violet-800/50 shadow-xl space-y-4">
        
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            Active & Past Surplus Food Listings
          </h3>
          <button
            onClick={() => {
              triggerConfetti();
              alert(`Tax Credit Statement Downloaded!\nTotal value: $${estimatedTaxCredit}.00 USD\nReference ID: TX-${Date.now()}`);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-violet-900/60 hover:bg-violet-800 text-amber-300 text-xs font-semibold border border-violet-700/60 flex items-center gap-1.5 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            Export Tax Deduction Receipt
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-violet-200">
            <thead className="bg-violet-950/80 text-violet-400 font-bold border-b border-violet-800">
              <tr>
                <th className="p-3">Meal Item</th>
                <th className="p-3">Category</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Expiry Window</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Match Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-violet-900/40">
              {myDonations.map(item => (
                <tr key={item.id} className="hover:bg-violet-900/20 transition-colors">
                  <td className="p-3 font-bold text-white">
                    {item.title}
                    <div className="text-[10px] text-violet-400 font-normal">{item.id}</div>
                  </td>
                  <td className="p-3 capitalize">{item.foodCategory}</td>
                  <td className="p-3">{item.quantityDescription}</td>
                  <td className="p-3">
                    <span className="flex items-center gap-1 text-amber-300">
                      <Clock className="w-3 h-3" />
                      {item.pickupWindow}
                    </span>
                  </td>
                  <td className="p-3">
                    {item.status === 'available' ? (
                      <span className="px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold flex items-center gap-1 w-fit">
                        <Zap className="w-3 h-3 fill-current" />
                        Awaiting Recipient
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1 w-fit">
                        <CheckCircle2 className="w-3 h-3" />
                        {item.claimInfo?.ngoName || 'Reserved'}
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right font-mono font-extrabold text-amber-400">
                    {item.matchScore?.toFixed(0)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
