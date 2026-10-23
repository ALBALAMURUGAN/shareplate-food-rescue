import React from 'react';
import {
  Building2,
  Clock,
  CheckCircle2,
  MapPin,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NgoDashboard: React.FC = () => {
  const { donations, ngos, setIsClaimModalOpen, setSelectedDonation, triggerConfetti } = useApp();

  const myNgo = ngos[0]; // Hope Haven Shelter
  const priorityMatches = donations.filter(d => d.status === 'available');
  const claimedItems = donations.filter(d => d.status === 'claimed' || d.status === 'in_transit' || d.status === 'delivered');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* NGO Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-violet-950 via-[#1b0d36] to-violet-900 border border-violet-800/60 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-violet-800 text-amber-300 font-bold text-xs flex items-center gap-1">
              <Building2 className="w-4 h-4 text-amber-400" />
              Verified Charity Recipient
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-bold">
              Hope Haven Food Shelter
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
            Recipient Shelter Dispatch Portal
          </h2>
          <p className="text-xs text-violet-300/80 mt-1">
            Automated priority matching connects available surplus food from nearby restaurants directly to your kitchen.
          </p>
        </div>

        {/* Capacity Meter Card */}
        <div className="p-4 rounded-2xl bg-violet-950/80 border border-violet-800 shrink-0 space-y-1 w-full md:w-64">
          <div className="flex items-center justify-between text-xs text-violet-300">
            <span>Daily Kitchen Need</span>
            <span className="font-bold text-amber-400">180 / 450 Meals</span>
          </div>
          <div className="w-full h-2 rounded-full bg-violet-900 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full w-[40%]" />
          </div>
          <div className="text-[10px] text-amber-300 font-semibold text-right">
            40% Daily Capacity Fulfilled
          </div>
        </div>
      </div>

      {/* Priority Recommendations Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            AI Priority Matches For Your Shelter
          </h3>
          <span className="text-xs text-amber-400 font-bold">
            Sorted by Proximity & Expiry Urgency
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {priorityMatches.slice(0, 4).map(item => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[#160b29] border border-violet-800/60 hover:border-amber-400/60 transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300">{item.donorName}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs">
                    {item.matchScore?.toFixed(0)}% Match
                  </span>
                </div>

                <h4 className="text-base font-extrabold text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h4>

                <div className="flex items-center gap-3 text-xs text-violet-300">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    {item.location.distanceKm} km ({item.location.address})
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {item.pickupWindow}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-violet-950/80 text-xs text-violet-200 flex items-center justify-between">
                  <span>Quantity: <strong className="text-white">{item.quantityDescription}</strong></span>
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    {item.hygieneScore}% Certified
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedDonation(item);
                  setIsClaimModalOpen(true);
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Reserve Donation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Reserved & Active Deliveries Tracker */}
      <div className="p-6 rounded-3xl bg-[#160b29] border border-violet-800/50 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            Active Reserved Pickups & Delivery Log
          </h3>
          <button
            onClick={() => {
              triggerConfetti();
              alert(`Distribution Audit Report Downloaded!\nNGO: ${myNgo.name}\nTotal Meals Received: 890`);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-violet-900/60 hover:bg-violet-800 text-amber-300 text-xs font-semibold border border-violet-700/60 flex items-center gap-1.5 transition-all"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Download Distribution Log
          </button>
        </div>

        <div className="space-y-3">
          {claimedItems.map(item => (
            <div key={item.id} className="p-4 rounded-2xl bg-violet-950/60 border border-violet-800/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-bold text-white text-sm">{item.title}</div>
                <div className="text-violet-300/80">
                  Donor: {item.donorName} • Courier: {item.claimInfo?.volunteerName || 'Volunteer Assigned'}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  ETA ~{item.claimInfo?.etaMinutes || 18} mins
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
