import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserRole,
  DonationItem,
  NGO,
  Volunteer,
  SystemNotification,
  AuditLog,
  SmartMatchWeights,
  FoodCategory,
  UrgencyLevel,
} from '../types';
import {
  INITIAL_DONATIONS,
  MOCK_NGOS,
  MOCK_VOLUNTEERS,
  MOCK_NOTIFICATIONS,
  MOCK_AUDIT_LOGS,
  SYSTEM_METRICS,
} from '../data/mockData';
import { DEFAULT_MATCH_WEIGHTS, sortDonationsByPriority } from '../lib/matchEngine';

interface AppContextType {
  // Navigation & Role State
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Data Collections
  donations: DonationItem[];
  ngos: NGO[];
  volunteers: Volunteer[];
  notifications: SystemNotification[];
  auditLogs: AuditLog[];
  metrics: typeof SYSTEM_METRICS;

  // Smart Matching Engine
  matchWeights: SmartMatchWeights;
  setMatchWeights: React.Dispatch<React.SetStateAction<SmartMatchWeights>>;

  // Filters
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: FoodCategory | 'all';
  setSelectedCategory: (cat: FoodCategory | 'all') => void;
  selectedUrgency: UrgencyLevel | 'all';
  setSelectedUrgency: (urgency: UrgencyLevel | 'all') => void;
  selectedDiet: string;
  setSelectedDiet: (diet: string) => void;
  maxDistanceKm: number;
  setMaxDistanceKm: (dist: number) => void;

  // Modals & Triggers
  isPostModalOpen: boolean;
  setIsPostModalOpen: (open: boolean) => void;
  isClaimModalOpen: boolean;
  setIsClaimModalOpen: (open: boolean) => void;
  isSandboxOpen: boolean;
  setIsSandboxOpen: (open: boolean) => void;
  selectedDonation: DonationItem | null;
  setSelectedDonation: (donation: DonationItem | null) => void;

  // Audio & Notification Toggles
  audioChimeEnabled: boolean;
  setAudioChimeEnabled: (enabled: boolean) => void;

  // Actions
  createDonation: (donationData: Partial<DonationItem>) => void;
  claimDonation: (donationId: string, ngoName: string, volunteerId?: string, notes?: string) => void;
  updateDonationStatus: (donationId: string, newStatus: DonationItem['status'], volunteerName?: string) => void;
  markNotificationAsRead: (id: string) => void;
  triggerConfetti: () => void;
  addAuditLog: (actor: string, role: string, action: string, details: string, status?: 'success' | 'warning' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('ngo');
  const [activeTab, setActiveTab] = useState<string>('feed'); // 'feed' | 'map' | 'dashboard' | 'visualizer' | 'impact'

  const [donations, setDonations] = useState<DonationItem[]>(INITIAL_DONATIONS);
  const [ngos] = useState<NGO[]>(MOCK_NGOS);
  const [volunteers] = useState<Volunteer[]>(MOCK_VOLUNTEERS);
  const [notifications, setNotifications] = useState<SystemNotification[]>(MOCK_NOTIFICATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(MOCK_AUDIT_LOGS);
  const [metrics, setMetrics] = useState(SYSTEM_METRICS);

  const [matchWeights, setMatchWeights] = useState<SmartMatchWeights>(DEFAULT_MATCH_WEIGHTS);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'all'>('all');
  const [selectedUrgency, setSelectedUrgency] = useState<UrgencyLevel | 'all'>('all');
  const [selectedDiet, setSelectedDiet] = useState('all');
  const [maxDistanceKm, setMaxDistanceKm] = useState(15);

  // Modal States
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<DonationItem | null>(null);

  const [audioChimeEnabled, setAudioChimeEnabled] = useState(true);

  // Recalculate match scores whenever matchWeights or donations update
  useEffect(() => {
    const sorted = sortDonationsByPriority(donations, undefined, matchWeights);
    setDonations(sorted);
  }, [matchWeights]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#8B5CF6', '#FBBF24', '#C084FC', '#34D399'],
      });
    } catch {
      // fallback
    }
  };

  const playNotificationChime = () => {
    if (!audioChimeEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch {
      // WebAudio fallback
    }
  };

  const addAuditLog = (
    actor: string,
    role: string,
    action: string,
    details: string,
    status: 'success' | 'warning' | 'info' = 'success'
  ) => {
    const newLog: AuditLog = {
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      actor,
      role,
      action,
      details,
      status,
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const createDonation = (donationData: Partial<DonationItem>) => {
    const newId = `DON-${Math.floor(9000 + Math.random() * 1000)}`;
    const newItem: DonationItem = {
      id: newId,
      title: donationData.title || 'Surplus Food Donation',
      donorName: donationData.donorName || 'Gourmet Bistro',
      donorType: donationData.donorType || 'restaurant',
      donorVerified: true,
      donorRating: 4.9,
      donorPhone: donationData.donorPhone || '+1 (555) 000-1122',
      foodCategory: donationData.foodCategory || 'cooked',
      quantityDescription: donationData.quantityDescription || '50 Servings (~20 kg)',
      quantityKg: donationData.quantityKg || 20,
      servings: donationData.servings || 50,
      expiryTimestamp: donationData.expiryTimestamp || new Date(Date.now() + 3 * 3600 * 1000).toISOString(),
      pickupWindow: donationData.pickupWindow || 'Within 3 hours',
      location: donationData.location || {
        address: '100 Main Street',
        city: 'Metropolis',
        lat: 40.7500,
        lng: -73.9800,
        distanceKm: 2.1,
      },
      status: 'available',
      dietaryTags: donationData.dietaryTags || ['Vegetarian'],
      storageRequirement: donationData.storageRequirement || 'Hot (>60°C)',
      urgencyLevel: donationData.urgencyLevel || 'high',
      imageUrl: donationData.imageUrl || '/food-buffet.png',
      hygieneScore: 98,
      createdAt: new Date().toISOString(),
      description: donationData.description || 'Fresh surplus food ready for immediate dispatch to verified recipient shelter.',
      allergens: donationData.allergens || [],
      co2SavedKg: (donationData.quantityKg || 20) * 2.5,
    };

    setDonations(prev => [newItem, ...prev]);

    // Push notification
    const newNotif: SystemNotification = {
      id: `NOTIF-${Date.now()}`,
      title: '✨ New Surplus Listed!',
      message: `${newItem.donorName} posted ${newItem.quantityDescription}. Smart match engine calculated priority.`,
      type: 'alert',
      timestamp: 'Just now',
      read: false,
      linkId: newItem.id,
    };
    setNotifications(prev => [newNotif, ...prev]);
    playNotificationChime();
    addAuditLog(newItem.donorName, 'donor', 'LISTING_CREATED', `Created surplus donation ${newId} (${newItem.quantityKg}kg)`);

    // Update global metrics
    setMetrics(m => ({
      ...m,
      totalFoodRescuedKg: m.totalFoodRescuedKg + newItem.quantityKg,
      estimatedWasteReducedKg: m.estimatedWasteReducedKg + newItem.quantityKg,
    }));
  };

  const claimDonation = (
    donationId: string,
    ngoName: string,
    volunteerId?: string,
    notes?: string
  ) => {
    const selectedVol = volunteers.find(v => v.id === volunteerId) || volunteers[0];
    setDonations(prev =>
      prev.map(item => {
        if (item.id === donationId) {
          return {
            ...item,
            status: 'claimed',
            claimInfo: {
              ngoId: 'NGO-101',
              ngoName: ngoName || 'Hope Haven Shelter',
              claimedAt: new Date().toISOString(),
              volunteerId: selectedVol.id,
              volunteerName: `${selectedVol.name} (${selectedVol.vehicleType})`,
              etaMinutes: Math.floor(15 + Math.random() * 20),
              notes: notes || 'Instant NGO reservation via Smart Matching algorithm.',
            },
          };
        }
        return item;
      })
    );

    triggerConfetti();
    playNotificationChime();

    const notif: SystemNotification = {
      id: `NOTIF-${Date.now()}`,
      title: '🎯 Donation Reserved!',
      message: `${ngoName} successfully claimed donation #${donationId}. Dispatch assigned to ${selectedVol.name}.`,
      type: 'claim',
      timestamp: 'Just now',
      read: false,
      linkId: donationId,
    };
    setNotifications(prev => [notif, ...prev]);

    addAuditLog(
      ngoName,
      'ngo',
      'CLAIM_RESERVATION',
      `Claimed item ${donationId}. Dispatch assigned to courier ${selectedVol.name}.`
    );

    setMetrics(m => ({
      ...m,
      donationsCompleted: m.donationsCompleted + 1,
    }));
  };

  const updateDonationStatus = (
    donationId: string,
    newStatus: DonationItem['status'],
    volunteerName?: string
  ) => {
    setDonations(prev =>
      prev.map(item => {
        if (item.id === donationId) {
          return { ...item, status: newStatus };
        }
        return item;
      })
    );

    if (newStatus === 'delivered') {
      triggerConfetti();
    }

    addAuditLog(
      volunteerName || 'Volunteer Courier',
      'volunteer',
      `STATUS_UPDATE_${newStatus.toUpperCase()}`,
      `Order ${donationId} status updated to ${newStatus}`
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        activeTab,
        setActiveTab,
        donations,
        ngos,
        volunteers,
        notifications,
        auditLogs,
        metrics,
        matchWeights,
        setMatchWeights,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedUrgency,
        setSelectedUrgency,
        selectedDiet,
        setSelectedDiet,
        maxDistanceKm,
        setMaxDistanceKm,
        isPostModalOpen,
        setIsPostModalOpen,
        isClaimModalOpen,
        setIsClaimModalOpen,
        isSandboxOpen,
        setIsSandboxOpen,
        selectedDonation,
        setSelectedDonation,
        audioChimeEnabled,
        setAudioChimeEnabled,
        createDonation,
        claimDonation,
        updateDonationStatus,
        markNotificationAsRead,
        triggerConfetti,
        addAuditLog,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
