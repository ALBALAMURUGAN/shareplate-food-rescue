import React from 'react';
import {
  Sliders,
  Sparkles,
  Zap,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Cpu
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SmartMatchVisualizer: React.FC = () => {
  const { matchWeights, setMatchWeights, donations, ngos, triggerConfetti, setIsClaimModalOpen, setSelectedDonation } = useApp();

  const handleWeightChange = (key: keyof typeof matchWeights, value: number | boolean) => {
    setMatchWeights(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetDefaults = () => {
    setMatchWeights({
      distanceWeight: 0.40,
      expiryWeight: 0.45,
      capacityWeight: 0.15,
      maxRadiusKm: 15,
      urgentBoost: true,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-violet-950 via-[#1b0d36] to-violet-900 border border-violet-800/60 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold mb-2">
              <Cpu className="w-3.5 h-3.5" />
              Unique Core Engine: Smart Proximity & Urgency Dispatch
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Interactive Matching Engine Playground
            </h2>
            <p className="text-sm text-violet-300/80 mt-1 max-w-2xl">
              Adjust parameters in real-time to observe how the Python-based prioritization algorithm re-ranks surplus food items based on recipient proximity, collection deadlines, and dietary capacity.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetDefaults}
              className="px-4 py-2 rounded-xl bg-violet-900/60 hover:bg-violet-800 text-violet-200 text-xs font-semibold border border-violet-700/50 flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Algorithm
            </button>
            <button
              onClick={() => {
                triggerConfetti();
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-extrabold shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-all"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              Simulate Matching Cycle
            </button>
          </div>
        </div>
      </div>

      {/* Control Sliders Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Slider 1: Expiry Deadline Weight */}
        <div className="p-5 rounded-2xl bg-[#160b29] border border-violet-800/50 hover:border-amber-400/40 transition-all space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
              <Clock className="w-4 h-4 text-amber-400" />
              Expiry Urgency Weight
            </div>
            <span className="text-sm font-mono font-extrabold text-amber-400">
              {Math.round(matchWeights.expiryWeight * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0.10"
            max="0.80"
            step="0.05"
            value={matchWeights.expiryWeight}
            onChange={(e) => handleWeightChange('expiryWeight', parseFloat(e.target.value))}
            className="w-full accent-amber-400 bg-violet-950 cursor-pointer"
          />
          <p className="text-xs text-violet-300/70">
            Higher weight forces food expiring in &lt; 2 hours to jump straight to top priority.
          </p>
        </div>

        {/* Slider 2: Distance Proximity Weight */}
        <div className="p-5 rounded-2xl bg-[#160b29] border border-violet-800/50 hover:border-amber-400/40 transition-all space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
              <MapPin className="w-4 h-4 text-amber-400" />
              Distance Proximity Weight
            </div>
            <span className="text-sm font-mono font-extrabold text-amber-400">
              {Math.round(matchWeights.distanceWeight * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0.10"
            max="0.80"
            step="0.05"
            value={matchWeights.distanceWeight}
            onChange={(e) => handleWeightChange('distanceWeight', parseFloat(e.target.value))}
            className="w-full accent-amber-400 bg-violet-950 cursor-pointer"
          />
          <p className="text-xs text-violet-300/70">
            Prioritizes recipient shelters located closest to the donor’s pickup address.
          </p>
        </div>

        {/* Slider 3: Radius & Boost Settings */}
        <div className="p-5 rounded-2xl bg-[#160b29] border border-violet-800/50 hover:border-amber-400/40 transition-all space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
              <Sliders className="w-4 h-4 text-amber-400" />
              Max Radius Threshold
            </div>
            <span className="text-sm font-mono font-extrabold text-amber-400">
              {matchWeights.maxRadiusKm} km
            </span>
          </div>
          <input
            type="range"
            min="2"
            max="30"
            step="1"
            value={matchWeights.maxRadiusKm}
            onChange={(e) => handleWeightChange('maxRadiusKm', parseInt(e.target.value))}
            className="w-full accent-amber-400 bg-violet-950 cursor-pointer"
          />

          <div className="flex items-center justify-between pt-2 border-t border-violet-900/50">
            <span className="text-xs text-violet-200">15% Critical Urgency Multiplier</span>
            <input
              type="checkbox"
              checked={matchWeights.urgentBoost}
              onChange={(e) => handleWeightChange('urgentBoost', e.target.checked)}
              className="w-4 h-4 accent-amber-400 cursor-pointer"
            />
          </div>
        </div>

      </div>

      {/* Live Ranking Priority Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">Live Priority Dispatch Queue</h3>
          </div>
          <span className="text-xs text-violet-300/80">
            {donations.length} Active Listings Evaluated
          </span>
        </div>

        <div className="grid gap-4">
          {donations.map((item, index) => {
            const score = item.matchScore || 85;
            const targetNGO = ngos[index % ngos.length];

            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-[#160b29] border border-violet-800/50 hover:border-amber-400/60 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
              >
                {/* Priority Rank & Details */}
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl font-mono font-extrabold flex items-center justify-center shrink-0 text-sm shadow-md ${
                    index === 0
                      ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300'
                      : index === 1
                      ? 'bg-violet-700 text-white'
                      : 'bg-violet-950 text-violet-300 border border-violet-800'
                  }`}>
                    #{index + 1}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white group-hover:text-amber-300 transition-colors">
                        {item.title}
                      </span>
                      {item.urgencyLevel === 'critical' && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold animate-pulse flex items-center gap-1">
                          <Zap className="w-3 h-3 fill-current" />
                          CRITICAL
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-violet-300/80">
                      Donor: <strong className="text-violet-200">{item.donorName}</strong> ({item.quantityDescription})
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-violet-400 flex-wrap">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        {item.location.distanceKm} km to {targetNGO.name}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        Window: {item.pickupWindow}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Score Circular Gauge & Action */}
                <div className="flex items-center gap-6 self-end md:self-center">
                  
                  <div className="text-right">
                    <div className="text-xs text-violet-400 font-medium">Smart Score</div>
                    <div className="text-2xl font-mono font-black text-amber-400">
                      {score.toFixed(1)}%
                    </div>
                    <div className="w-24 h-1.5 rounded-full bg-violet-950 overflow-hidden mt-1">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>

                  {item.status === 'available' ? (
                    <button
                      onClick={() => {
                        setSelectedDonation(item);
                        setIsClaimModalOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs shadow-md transition-all active:scale-95"
                    >
                      Instant Claim
                    </button>
                  ) : (
                    <span className="px-3 py-1 rounded-xl bg-violet-950 text-amber-300 text-xs font-semibold border border-violet-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                      Reserved
                    </span>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Algorithm Logic Code Showcase */}
      <div className="p-6 rounded-2xl bg-[#0e071e] border border-violet-900/60 font-mono text-xs space-y-3">
        <div className="flex items-center justify-between text-amber-300 font-bold border-b border-violet-900/60 pb-2">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            Python Backend Score Function Math Equation
          </span>
          <span className="text-[10px] bg-violet-900 text-violet-200 px-2 py-0.5 rounded">
            backend/match_engine.py
          </span>
        </div>
        <pre className="text-violet-200/90 overflow-x-auto leading-relaxed">
{`# Priority Formula Execution
def calculate_match_score(distance_km, hours_remaining, diet_match_bool):
    dist_score = max(0, 100 * (1 - (distance_km / ${matchWeights.maxRadiusKm})))
    expiry_score = 100 if hours_remaining <= 1.5 else (90 if hours_remaining <= 3 else 60)
    diet_score = 100 if diet_match_bool else 50
    
    total = (dist_score * ${matchWeights.distanceWeight}) + (expiry_score * ${matchWeights.expiryWeight}) + (diet_score * ${matchWeights.capacityWeight})
    if hours_remaining <= 2.5 and ${matchWeights.urgentBoost ? 'True' : 'False'}:
        total = min(100.0, total * 1.15)
    return round(total, 2)`}
        </pre>
      </div>

    </div>
  );
};
