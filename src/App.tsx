import React, { useState, useEffect } from 'react';
import { I18nProvider, useTranslation } from './i18n';
import { store } from './services/store';
import { UserRole, SellingOption, BuyerProfile, BuyerOffer } from './types';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { LandingPage } from './components/layout/LandingPage';
import { LanguageSelectorModal } from './components/common/LanguageSelectorModal';

// Module Components
import { FarmerDashboard } from './components/farmer/FarmerDashboard';
import { ProduceModal } from './components/farmer/ProduceModal';
import { MarketIntelligence } from './components/market/MarketIntelligence';
import { BuyerMarketplace } from './components/buyers/BuyerMarketplace';
import { BuyerSourcing } from './components/buyers/BuyerSourcing';
import { CollectiveSelling } from './components/collective/CollectiveSelling';
import { LogisticsCoordination } from './components/logistics/LogisticsCoordination';
import { TransactionManagement } from './components/transactions/TransactionManagement';
import { VoiceAssistant } from './components/voice/VoiceAssistant';
import { FPODashboard } from './components/fpo/FPODashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { HelpCenter } from './components/common/HelpCenter';
import { OnboardingModal } from './components/common/OnboardingModal';

const AppContent: React.FC = () => {
  const { t, isLangModalOpen, closeLangModal } = useTranslation();

  // Reactive state from store
  const [role, setRole] = useState<UserRole>(store.getRole());
  const [isSimpleMode, setIsSimpleMode] = useState<boolean>(store.isSimpleMode());

  // Navigation tab
  const [currentTab, setCurrentTab] = useState<string>('dashboard');

  // Modals
  const [isProduceModalOpen, setIsProduceModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(() => {
    return !localStorage.getItem('fairfarm_onboarded');
  });

  // Calculation parameters passed from produce registration
  const [activeCalcCrop, setActiveCalcCrop] = useState('Tomato');
  const [activeCalcQty, setActiveCalcQty] = useState(1000);

  // Subscribe to reactive store changes
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setRole(store.getRole());
      setIsSimpleMode(store.isSimpleMode());
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleToggleSimpleMode = () => {
    const next = !isSimpleMode;
    store.setSimpleMode(next);
    setIsSimpleMode(next);
  };

  const handleProduceCreated = (crop: string, qty: number) => {
    setActiveCalcCrop(crop);
    setActiveCalcQty(qty);
    setCurrentTab('market-intel');
  };

  const handleAcceptSellingOption = (option: SellingOption, quantityKg: number) => {
    // Generate dummy BuyerOffer from selling option to create transaction
    const offer: BuyerOffer = {
      id: `offer-${Date.now()}`,
      buyerId: option.type === 'distant_buyer' ? 'buyer-1' : option.type === 'nearby_mandi' ? 'buyer-3' : 'buyer-5',
      buyerName: option.name,
      buyerCategory: option.type === 'distant_buyer' ? 'Retail Chain Direct' : option.type === 'nearby_mandi' ? 'APMC Mandi' : 'Local Trader',
      crop: activeCalcCrop,
      offeredPricePerKg: option.pricePerKg,
      minQuantityKg: 100,
      maxQuantityKg: 50000,
      location: option.location,
      distanceKm: option.distanceKm,
      paymentTerms: option.type === 'distant_buyer' ? 'Direct NEFT within 24 hrs' : 'Spot Cash',
      collectionType: option.distanceKm > 20 ? 'Collection Centre' : 'Farmgate',
      verificationStatus: 'Demo Verified',
      validUntil: '2026-11-10',
    };

    store.acceptBuyerOffer(offer, quantityKg);
    setCurrentTab('transactions');
  };

  const handleAcceptBuyerOffer = (buyer: BuyerProfile, offer: BuyerOffer) => {
    store.acceptBuyerOffer(offer, 1000);
    setCurrentTab('transactions');
  };

  return (
    <div className="min-h-screen bg-[#F8F6EE] flex flex-col font-sans w-full max-w-full overflow-x-hidden">
      {/* Top Header Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={(tab) => setCurrentTab(tab)}
        role={role}
        isSimpleMode={isSimpleMode}
        onToggleSimpleMode={handleToggleSimpleMode}
      />

      {/* Main View Area: Public Landing Page vs Authenticated Dashboard Shell */}
      {currentTab === 'landing' ? (
        <LandingPage
          onExplore={() => setCurrentTab('dashboard')}
          onOpenHowItWorks={() => setCurrentTab('voice')}
          onOpenCalculator={() => setCurrentTab('market-intel')}
        />
      ) : (
        <div className="flex-1 flex max-w-7xl w-full mx-auto">
          {/* Left Desktop Sidebar */}
          <Sidebar
            currentTab={currentTab}
            onNavigate={(tab) => setCurrentTab(tab)}
            role={role}
            onOpenAddProduce={() => setIsProduceModalOpen(true)}
          />

          {/* Main Content Area */}
          <main className="flex-1 p-3 sm:p-6 lg:p-8 min-w-0 pb-32 sm:pb-36 lg:pb-12 overflow-x-hidden">
            {currentTab === 'dashboard' && (
              role === 'buyer' ? (
                <BuyerSourcing
                  onOfferSubmitted={() => {}}
                  onNavigateTransactions={() => setCurrentTab('transactions')}
                />
              ) : (
                <FarmerDashboard
                  onNavigate={(tab) => setCurrentTab(tab)}
                  onOpenAddProduce={() => setIsProduceModalOpen(true)}
                  isSimpleMode={isSimpleMode}
                />
              )
            )}

            {currentTab === 'produce' && (
              role === 'buyer' ? (
                <BuyerSourcing
                  onOfferSubmitted={() => {}}
                  onNavigateTransactions={() => setCurrentTab('transactions')}
                />
              ) : (
                <FarmerDashboard
                  onNavigate={(tab) => setCurrentTab(tab)}
                  onOpenAddProduce={() => setIsProduceModalOpen(true)}
                  isSimpleMode={isSimpleMode}
                />
              )
            )}

            {currentTab === 'market-intel' && (
              <MarketIntelligence
                initialCrop={activeCalcCrop}
                initialQuantity={activeCalcQty}
                onAcceptOffer={handleAcceptSellingOption}
                onNavigateCollective={() => setCurrentTab('group-selling')}
              />
            )}

            {currentTab === 'buyers' && (
              <BuyerMarketplace onAcceptOffer={handleAcceptBuyerOffer} />
            )}

            {currentTab === 'group-selling' && (
              <CollectiveSelling onGroupJoined={() => {}} />
            )}

            {currentTab === 'logistics' && <LogisticsCoordination />}

            {currentTab === 'transactions' && <TransactionManagement />}

            {currentTab === 'voice' && <VoiceAssistant />}

            {currentTab === 'fpo' && <FPODashboard />}

            {currentTab === 'admin' && <AdminDashboard />}

            {currentTab === 'help' && <HelpCenter />}
          </main>
        </div>
      )}

      {/* Mobile Bottom Navigation & Floating Action */}
      {currentTab !== 'landing' && (
        <MobileNav
          currentTab={currentTab}
          onNavigate={(tab) => setCurrentTab(tab)}
          role={role}
          onOpenAddProduce={() => setIsProduceModalOpen(true)}
        />
      )}

      {/* Produce Registration Modal */}
      <ProduceModal
        isOpen={isProduceModalOpen}
        onClose={() => setIsProduceModalOpen(false)}
        onProduceCreated={handleProduceCreated}
      />

      {/* Global Redesigned Language Selector Modal */}
      <LanguageSelectorModal
        isOpen={isLangModalOpen}
        onClose={closeLangModal}
      />

      {/* Onboarding Wizard Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => {
          localStorage.setItem('fairfarm_onboarded', 'true');
          setIsOnboardingOpen(false);
        }}
        onComplete={(newRole) => {
          localStorage.setItem('fairfarm_onboarded', 'true');
          setRole(newRole);
          if (newRole === 'farmer') setCurrentTab('dashboard');
          else if (newRole === 'buyer') setCurrentTab('buyers');
          else if (newRole === 'fpo') setCurrentTab('fpo');
          else if (newRole === 'admin') setCurrentTab('admin');
        }}
      />
    </div>
  );
};

export function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}

export default App;
