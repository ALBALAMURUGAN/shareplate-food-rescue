import React, { useState } from 'react';
import {
  TrendingUp,
  Sparkles,
  Award,
  Download,
  Calculator
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ImpactSection: React.FC = () => {
  const { metrics, triggerConfetti } = useApp();

  // Interactive Waste Calculator State
  const [dailyLeftoverKg, setDailyLeftoverKg] = useState<number>(25);
  const [orgType, setOrgType] = useState<'restaurant' | 'hotel' | 'caterer'>('restaurant');

  // Calculations
  const annualKgRescued = dailyLeftoverKg * 365;
  const annualMealsServed = Math.round(annualKgRescued * 2.5);
  const annualCo2Saved = Math.round(annualKgRescued * 2.5);
  const estimatedTaxCredit = Math.round(annualKgRescued * 6.5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Impact Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Quantifiable Environmental & Social Impact
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Turning Leftover Food into Measurable Future Progress
        </h2>

        <p className="text-sm text-violet-300/80">
          Real-time metrics calculated from verified donation handovers across the SharePlate rescue network.
        </p>
      </div>

      {/* Visual Scrolling Percentage Rings Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        
        {/* Ring Gauge 1 */}
        <div className="p-6 rounded-3xl bg-[#160b29] border border-violet-800/60 shadow-xl text-center space-y-4 relative overflow-hidden group hover:border-amber-400/60 transition-all">
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="56" cy="56" r="48" stroke="#2a1240" strokeWidth="8" fill="none" />
              <circle
                cx="56"
                cy="56"
                r="48"
                stroke="#F59E0B"
                strokeWidth="8"
                fill="none"
                strokeDasharray="301"
                strokeDashoffset="33" // ~89%
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <span className="absolute font-mono text-2xl font-black text-amber-400">89%</span>
          </div>

          <div>
            <h4 className="font-extrabold text-white text-base">Expiry Rescue Success</h4>
            <p className="text-xs text-violet-300/70 mt-1">Donations saved before collection deadline expiration</p>
          </div>
        </div>

        {/* Ring Gauge 2 */}
        <div className="p-6 rounded-3xl bg-[#160b29] border border-violet-800/60 shadow-xl text-center space-y-4 relative overflow-hidden group hover:border-amber-400/60 transition-all">
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="56" cy="56" r="48" stroke="#2a1240" strokeWidth="8" fill="none" />
              <circle
                cx="56"
                cy="56"
                r="48"
                stroke="#8B5CF6"
                strokeWidth="8"
                fill="none"
                strokeDasharray="301"
                strokeDashoffset="18" // ~94%
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <span className="absolute font-mono text-2xl font-black text-violet-300">94%</span>
          </div>

          <div>
            <h4 className="font-extrabold text-white text-base">Local Sub-30m Dispatch</h4>
            <p className="text-xs text-violet-300/70 mt-1">Volunteers arrived at donor within 30 minutes</p>
          </div>
        </div>

        {/* Ring Gauge 3 */}
        <div className="p-6 rounded-3xl bg-[#160b29] border border-violet-800/60 shadow-xl text-center space-y-4 relative overflow-hidden group hover:border-amber-400/60 transition-all">
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="56" cy="56" r="48" stroke="#2a1240" strokeWidth="8" fill="none" />
              <circle
                cx="56"
                cy="56"
                r="48"
                stroke="#10B981"
                strokeWidth="8"
                fill="none"
                strokeDasharray="301"
                strokeDashoffset="66" // ~78%
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <span className="absolute font-mono text-2xl font-black text-emerald-400">78%</span>
          </div>

          <div>
            <h4 className="font-extrabold text-white text-base">Methane Reductions</h4>
            <p className="text-xs text-violet-300/70 mt-1">Reduction in organic landfill methane gas</p>
          </div>
        </div>

        {/* Ring Gauge 4 */}
        <div className="p-6 rounded-3xl bg-[#160b29] border border-violet-800/60 shadow-xl text-center space-y-4 relative overflow-hidden group hover:border-amber-400/60 transition-all">
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="56" cy="56" r="48" stroke="#2a1240" strokeWidth="8" fill="none" />
              <circle
                cx="56"
                cy="56"
                r="48"
                stroke="#FBBF24"
                strokeWidth="8"
                fill="none"
                strokeDasharray="301"
                strokeDashoffset="0" // 100%
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <span className="absolute font-mono text-2xl font-black text-amber-300">100%</span>
          </div>

          <div>
            <h4 className="font-extrabold text-white text-base">Food Safety Hygiene</h4>
            <p className="text-xs text-violet-300/70 mt-1">Verified temperature & hygiene logs</p>
          </div>
        </div>

      </div>

      {/* Interactive Waste Savings Calculator */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-violet-950 via-[#1e0f3d] to-violet-900 border border-violet-800/60 shadow-2xl space-y-6">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-violet-800/50 pb-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Calculator className="w-4 h-4" />
              Interactive Impact Calculator
            </div>
            <h3 className="text-2xl font-extrabold text-white">
              Calculate Your Organization’s Food Rescue Potential
            </h3>
          </div>

          <button
            onClick={() => {
              triggerConfetti();
              alert(`Report Generated!\nAnnual Rescued: ${annualKgRescued} kg\nEst. Tax Deduction: $${estimatedTaxCredit}`);
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold text-xs shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download ESG Impact Report
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls */}
          <div className="lg:col-span-6 space-y-5">
            
            <div className="space-y-2">
              <label className="text-xs text-violet-300 font-bold">Organization Type:</label>
              <div className="grid grid-cols-3 gap-2">
                {(['restaurant', 'hotel', 'caterer'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => setOrgType(type)}
                    className={`py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                      orgType === type
                        ? 'bg-amber-400 text-slate-950 shadow'
                        : 'bg-violet-900/40 text-violet-300 border border-violet-800'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-violet-200">
                <span>Estimated Daily Food Leftover (kg):</span>
                <span className="font-extrabold font-mono text-amber-400 text-sm">{dailyLeftoverKg} kg / day</span>
              </div>
              <input
                type="range"
                min="5"
                max="200"
                step="5"
                value={dailyLeftoverKg}
                onChange={(e) => setDailyLeftoverKg(parseInt(e.target.value))}
                className="w-full accent-amber-400 bg-violet-950 cursor-pointer"
              />
            </div>

          </div>

          {/* Dynamic Results Display */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            
            <div className="p-4 rounded-2xl bg-violet-950/80 border border-violet-800 text-center">
              <div className="text-xs text-violet-400">Annual Food Saved</div>
              <div className="text-2xl font-black text-amber-400 font-mono mt-1">
                {(annualKgRescued / 1000).toFixed(1)} <span className="text-xs text-white">Tonnes</span>
              </div>
              <div className="text-[10px] text-violet-300 mt-1">Diverted from landfill</div>
            </div>

            <div className="p-4 rounded-2xl bg-violet-950/80 border border-violet-800 text-center">
              <div className="text-xs text-violet-400">Meals Served to Shelters</div>
              <div className="text-2xl font-black text-white font-mono mt-1">
                {annualMealsServed.toLocaleString()}
              </div>
              <div className="text-[10px] text-amber-300 mt-1">Instant hunger relief</div>
            </div>

            <div className="p-4 rounded-2xl bg-violet-950/80 border border-violet-800 text-center">
              <div className="text-xs text-violet-400">Est. Tax Deduction</div>
              <div className="text-2xl font-black text-amber-400 font-mono mt-1">
                ${estimatedTaxCredit.toLocaleString()}
              </div>
              <div className="text-[10px] text-emerald-400 mt-1">US Tax Code 170(e)(3)</div>
            </div>

            <div className="p-4 rounded-2xl bg-violet-950/80 border border-violet-800 text-center">
              <div className="text-xs text-violet-400">CO₂ Carbon Prevented</div>
              <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                {annualCo2Saved.toLocaleString()} <span className="text-xs text-white">kg</span>
              </div>
              <div className="text-[10px] text-violet-300 mt-1">Verified ESG Offset</div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
