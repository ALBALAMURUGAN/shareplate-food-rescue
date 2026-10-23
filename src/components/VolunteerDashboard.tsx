import React, { useState } from 'react';
import {
  Navigation,
  CheckCircle2,
  Phone,
  Building2,
  Award,
  Sparkles,
  MapPin,
  Clock,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const VolunteerDashboard: React.FC = () => {
  const { donations, updateDonationStatus, triggerConfetti } = useApp();
  const [taskStep, setTaskStep] = useState<'accepted' | 'arrived' | 'collected' | 'delivered'>('accepted');

  const activeTask = donations.find(d => d.status === 'claimed' || d.status === 'in_transit') || donations[0];

  const handleNextStep = () => {
    if (taskStep === 'accepted') {
      setTaskStep('arrived');
    } else if (taskStep === 'arrived') {
      setTaskStep('collected');
      updateDonationStatus(activeTask.id, 'in_transit', 'Marcus Vance');
    } else if (taskStep === 'collected') {
      setTaskStep('delivered');
      updateDonationStatus(activeTask.id, 'delivered', 'Marcus Vance');
      triggerConfetti();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Volunteer Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-[#121c29] to-violet-950 border border-emerald-500/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs">
              🚴 Volunteer Courier
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold">
              Hero Rank #14 • 142 Rescues
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
            Rescue Rider Dispatch Cockpit
          </h2>
          <p className="text-xs text-violet-300/80 mt-1">
            Accept priority rescue dispatches, navigate optimal routes, and confirm hygienic handovers to shelters.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-violet-200">
          <div className="p-3 rounded-2xl bg-violet-950/80 border border-violet-800 text-center">
            <div className="text-amber-400 font-extrabold text-lg">142</div>
            <div className="text-[10px] text-violet-400">Total Rescues</div>
          </div>
          <div className="p-3 rounded-2xl bg-violet-950/80 border border-violet-800 text-center">
            <div className="text-emerald-400 font-extrabold text-lg">4.98 ★</div>
            <div className="text-[10px] text-violet-400">Rider Rating</div>
          </div>
        </div>
      </div>

      {/* Active Rescue Task Card */}
      <div className="p-6 rounded-3xl bg-[#160b29] border border-violet-800/60 shadow-xl space-y-6">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400 fill-current" />
            <h3 className="text-lg font-bold text-white">Active Rescue Mission #SP-{activeTask.id}</h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs">
            Priority Dispatch
          </span>
        </div>

        {/* Workflow Progress Stepper */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          
          <div className={`p-3 rounded-xl border transition-all ${
            taskStep === 'accepted' ? 'bg-amber-400 text-slate-950 font-bold border-amber-300' : 'bg-violet-950/80 text-violet-300 border-violet-800'
          }`}>
            1. Task Accepted
          </div>

          <div className={`p-3 rounded-xl border transition-all ${
            taskStep === 'arrived' ? 'bg-amber-400 text-slate-950 font-bold border-amber-300' : 'bg-violet-950/80 text-violet-300 border-violet-800'
          }`}>
            2. Arrived at Donor
          </div>

          <div className={`p-3 rounded-xl border transition-all ${
            taskStep === 'collected' ? 'bg-amber-400 text-slate-950 font-bold border-amber-300' : 'bg-violet-950/80 text-violet-300 border-violet-800'
          }`}>
            3. Inspected & Picked
          </div>

          <div className={`p-3 rounded-xl border transition-all ${
            taskStep === 'delivered' ? 'bg-emerald-400 text-slate-950 font-bold border-emerald-300' : 'bg-violet-950/80 text-violet-300 border-violet-800'
          }`}>
            4. Handover to NGO
          </div>

        </div>

        {/* Task Detail Card */}
        <div className="grid md:grid-cols-2 gap-6 p-5 rounded-2xl bg-violet-950/50 border border-violet-800">
          
          <div className="space-y-3 text-xs">
            <div className="text-amber-400 font-bold text-sm">Pickup Details (Donor)</div>
            <div className="text-white font-extrabold text-base">{activeTask.donorName}</div>
            <p className="text-violet-200">{activeTask.title} ({activeTask.quantityDescription})</p>
            <div className="flex items-center gap-2 text-violet-300">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{activeTask.location.address} ({activeTask.location.distanceKm} km)</span>
            </div>
            <div className="flex items-center gap-2 text-violet-300">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Pickup Window: {activeTask.pickupWindow}</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Hygiene Verified: {activeTask.hygieneScore}% Pass</span>
            </div>
          </div>

          <div className="space-y-3 text-xs border-t md:border-t-0 md:border-l border-violet-800 md:pl-6 pt-4 md:pt-0">
            <div className="text-amber-400 font-bold text-sm">Delivery Destination (Shelter)</div>
            <div className="text-white font-extrabold text-base">Hope Haven Food Shelter</div>
            <p className="text-violet-200">Contact: Sister Maria Santos</p>
            <div className="flex items-center gap-2 text-violet-300">
              <Building2 className="w-4 h-4 text-violet-400" />
              <span>412 Sanctuary Street, Central Ward</span>
            </div>
            <div className="flex items-center gap-2 text-violet-300">
              <Phone className="w-4 h-4 text-amber-400" />
              <span>+1 (555) 901-2345</span>
            </div>
          </div>

        </div>

        {/* Workflow Action Button */}
        <div>
          {taskStep !== 'delivered' ? (
            <button
              onClick={handleNextStep}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Navigation className="w-4 h-4 fill-current" />
              {taskStep === 'accepted' && 'Confirm Arrival at Donor Location'}
              {taskStep === 'arrived' && 'Confirm Food Inspection & Collection'}
              {taskStep === 'collected' && 'Confirm Delivery Handover to Shelter'}
            </button>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-center font-bold text-xs flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Rescue Mission Complete! 62 kg Surplus Food Successfully Handed Over.</span>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
