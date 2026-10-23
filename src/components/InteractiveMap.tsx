import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Navigation,
  CheckCircle2,
  Phone,
  Building2,
  Zap,
  Info,
  Layers,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DonationItem } from '../types';

export const InteractiveMap: React.FC = () => {
  const { donations, ngos, volunteers, setSelectedDonation, setIsClaimModalOpen } = useApp();
  const [selectedMapPin, setSelectedMapPin] = useState<DonationItem | null>(donations[0] || null);
  const [courierPos, setCourierPos] = useState({ x: 45, y: 55 });

  // Simulate courier movement animation along route
  useEffect(() => {
    const interval = setInterval(() => {
      setCourierPos(prev => ({
        x: prev.x >= 70 ? 30 : prev.x + 0.8,
        y: prev.y >= 75 ? 40 : prev.y + 0.5,
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-[#160b29] border border-violet-800/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-2xl font-extrabold text-white">
              Real-Time Rescue Routing & Location Map
            </h2>
          </div>
          <p className="text-xs text-violet-300/80 mt-1">
            Visualizing surplus food pickup pins, nearby recipient shelters, and live active courier riders in Metropolis.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span>Donation Pins ({donations.length})</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-900/60 border border-violet-700/50 text-violet-200">
            <Building2 className="w-3.5 h-3.5 text-violet-300" />
            <span>Shelters ({ngos.length})</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Map Viewport & Drawer Layout */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Visual Map Canvas Container (7 cols) */}
        <div className="lg:col-span-8 relative h-[520px] rounded-3xl bg-[#0e071e] border border-violet-800/60 overflow-hidden shadow-2xl group">
          
          {/* Map Grid / Topography Lines SVG Background */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8B5CF6" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mapGrid)" />
            {/* Radius Proximity Circle */}
            <circle cx="50%" cy="50%" r="180" fill="rgba(139, 92, 246, 0.05)" stroke="#F59E0B" strokeWidth="1" strokeDasharray="4 4" className="animate-pulse" />
          </svg>

          {/* Animated Route Line from Donor to Shelter */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path
              d="M 220 180 Q 320 280 480 340"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="3"
              strokeDasharray="6 6"
              className="animate-pulse"
            />
          </svg>

          {/* Live Courier Rider Marker */}
          <div
            className="absolute z-30 transition-all duration-1000 transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${courierPos.x}%`, top: `${courierPos.y}%` }}
          >
            <div className="p-2 rounded-full bg-amber-400 text-slate-950 font-bold shadow-xl shadow-amber-400/50 flex items-center justify-center text-xs animate-bounce border-2 border-white">
              🚴 Marcus (En Route)
            </div>
          </div>

          {/* Donation Pickup Pins */}
          {donations.map((item, idx) => {
            // Map lat/lng into visual percentage coordinates
            const posX = 20 + ((item.location.lng + 73.99) * 1200) % 65;
            const posY = 15 + ((40.77 - item.location.lat) * 1200) % 70;
            const isSelected = selectedMapPin?.id === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedMapPin(item)}
                className="absolute z-20 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group/pin"
                style={{ left: `${posX}%`, top: `${posY}%` }}
              >
                {/* Radar pulse for critical items */}
                {item.urgencyLevel === 'critical' && (
                  <div className="absolute -inset-3 rounded-full bg-amber-400/40 animate-ping pointer-events-none" />
                )}

                <div className={`p-2.5 rounded-2xl flex items-center gap-1.5 shadow-xl transition-all ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-300 scale-110 font-bold'
                    : 'bg-violet-950/90 text-amber-300 border border-violet-700/80 hover:scale-105'
                }`}>
                  <MapPin className="w-4 h-4 fill-current" />
                  <span className="text-xs font-mono">{idx + 1}</span>
                </div>
              </div>
            );
          })}

          {/* NGO Shelter Pins */}
          {ngos.map((ngo, idx) => {
            const posX = 15 + (idx * 22) % 75;
            const posY = 25 + (idx * 18) % 65;

            return (
              <div
                key={ngo.id}
                className="absolute z-10 cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${posX}%`, top: `${posY}%` }}
              >
                <div className="px-2.5 py-1 rounded-xl bg-violet-900/90 text-violet-200 border border-violet-600/60 shadow-lg text-[10px] font-bold flex items-center gap-1 backdrop-blur-md">
                  <Building2 className="w-3 h-3 text-amber-400" />
                  <span>{ngo.name}</span>
                </div>
              </div>
            );
          })}

          {/* Map Overlay Control Legend */}
          <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-violet-950/90 border border-violet-800/60 backdrop-blur-md flex items-center justify-between text-xs text-violet-200">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                Donor Surplus Pin
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-violet-600" />
                Recipient Shelter
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                Active Volunteer
              </span>
            </div>

            <div className="text-[10px] font-mono text-amber-400">
              Live Coordinates: 40.7580° N, 73.9855° W
            </div>
          </div>

        </div>

        {/* Selected Location Detail Drawer (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {selectedMapPin ? (
            <div className="p-6 rounded-3xl bg-[#160b29] border border-violet-800/60 shadow-xl space-y-5">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Pickup Location Details
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono text-xs font-bold">
                  {selectedMapPin.matchScore?.toFixed(0)}% Match Score
                </span>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-white">
                  {selectedMapPin.title}
                </h3>
                <p className="text-xs text-violet-300/80 mt-1">
                  Listed by <strong className="text-violet-100">{selectedMapPin.donorName}</strong>
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-violet-950/80 border border-violet-800 flex items-center justify-between">
                  <span className="text-violet-400">Address:</span>
                  <span className="font-semibold text-white">{selectedMapPin.location.address}</span>
                </div>
                <div className="p-3 rounded-xl bg-violet-950/80 border border-violet-800 flex items-center justify-between">
                  <span className="text-violet-400">Pickup Window:</span>
                  <span className="font-semibold text-amber-300">{selectedMapPin.pickupWindow}</span>
                </div>
                <div className="p-3 rounded-xl bg-violet-950/80 border border-violet-800 flex items-center justify-between">
                  <span className="text-violet-400">Donor Phone:</span>
                  <span className="font-semibold text-white flex items-center gap-1">
                    <Phone className="w-3 h-3 text-amber-400" />
                    {selectedMapPin.donorPhone}
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2">
                {selectedMapPin.status === 'available' ? (
                  <button
                    onClick={() => {
                      setSelectedDonation(selectedMapPin);
                      setIsClaimModalOpen(true);
                    }}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Navigation className="w-4 h-4 fill-current" />
                    Reserve & Request Pickup
                  </button>
                ) : (
                  <div className="p-3 rounded-2xl bg-violet-950 text-amber-300 text-xs font-bold border border-violet-800 flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>Already Claimed</span>
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-[#160b29] border border-violet-800/60 text-center text-violet-300 text-xs">
              Click any pin on the map to inspect location details and navigation route.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
