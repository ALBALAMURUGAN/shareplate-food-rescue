import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Building2,
  MapPin,
  Clock,
  Sparkles,
  Zap,
  Navigation
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ClaimModal: React.FC = () => {
  const { isClaimModalOpen, setIsClaimModalOpen, selectedDonation, claimDonation, ngos, volunteers } = useApp();

  const [selectedNgo, setSelectedNgo] = useState(ngos[0].name);
  const [selectedVolunteer, setSelectedVolunteer] = useState(volunteers[0].id);
  const [notes, setNotes] = useState('Standard hot container transport assigned.');

  if (!isClaimModalOpen || !selectedDonation) return null;

  const handleConfirmClaim = () => {
    claimDonation(selectedDonation.id, selectedNgo, selectedVolunteer, notes);
    setIsClaimModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#160b29] border border-violet-700/60 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl space-y-6 p-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-violet-800/60 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-400 text-slate-950 font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">Reserve Surplus Donation</h3>
              <p className="text-xs text-amber-300 font-bold">
                {selectedDonation.matchScore?.toFixed(0)}% Smart Proximity Match
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsClaimModalOpen(false)}
            className="p-2 rounded-xl bg-violet-900/60 hover:bg-violet-800 text-violet-200 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Item Summary Card */}
        <div className="p-4 rounded-2xl bg-violet-950/80 border border-violet-800 space-y-2 text-xs">
          <div className="font-extrabold text-white text-sm">{selectedDonation.title}</div>
          <div className="text-violet-300">Donor: {selectedDonation.donorName}</div>
          <div className="flex items-center justify-between pt-1 border-t border-violet-900 text-amber-300">
            <span>{selectedDonation.quantityDescription}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {selectedDonation.pickupWindow}
            </span>
          </div>
        </div>

        {/* Claim Form Inputs */}
        <div className="space-y-4 text-xs">
          <div>
            <label className="text-violet-300 font-bold block mb-1">Claiming Recipient NGO:</label>
            <select
              value={selectedNgo}
              onChange={(e) => setSelectedNgo(e.target.value)}
              className="w-full p-3 rounded-xl bg-violet-950 border border-violet-800 text-white focus:outline-none focus:border-amber-400"
            >
              {ngos.map(ngo => (
                <option key={ngo.id} value={ngo.name}>
                  {ngo.name} ({ngo.type})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-violet-300 font-bold block mb-1">Assign Courier Rider Dispatch:</label>
            <select
              value={selectedVolunteer}
              onChange={(e) => setSelectedVolunteer(e.target.value)}
              className="w-full p-3 rounded-xl bg-violet-950 border border-violet-800 text-white focus:outline-none focus:border-amber-400"
            >
              {volunteers.map(vol => (
                <option key={vol.id} value={vol.id}>
                  {vol.name} — {vol.vehicleType} ({vol.completedRescues} rescues, {vol.rating}★)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-violet-300 font-bold block mb-1">Dispatch & Transport Notes:</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 rounded-xl bg-violet-950 border border-violet-800 text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-violet-800 flex items-center justify-between gap-3">
          <button
            onClick={() => setIsClaimModalOpen(false)}
            className="px-5 py-2.5 rounded-xl bg-violet-900/50 hover:bg-violet-800 text-violet-200 font-bold text-xs"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmClaim}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Confirm & Trigger Dispatch Chime</span>
          </button>
        </div>

      </div>
    </div>
  );
};
