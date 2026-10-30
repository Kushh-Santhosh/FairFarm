import React, { useState, useMemo } from 'react';
import { useTranslation } from '../../i18n';
import { store } from '../../services/store';
import { ProduceListing, BuyerOffer } from '../../types';
import {
  Sprout,
  Search,
  Filter,
  MapPin,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  PlusCircle,
  X,
  Phone,
  Scale,
  Send,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BuyerSourcingProps {
  onOfferSubmitted?: () => void;
  onNavigateTransactions?: () => void;
}

export const BuyerSourcing: React.FC<BuyerSourcingProps> = ({
  onOfferSubmitted,
  onNavigateTransactions,
}) => {
  const { t } = useTranslation();
  const listings = store.getProduceListings();
  const currentBuyer = store.getBuyers()[0]; // Default demo buyer: City Fresh Foods

  const [searchCrop, setSearchCrop] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('All');
  const [filterGrade, setFilterGrade] = useState('All');

  // Submit quote modal state
  const [selectedProduce, setSelectedProduce] = useState<ProduceListing | null>(null);
  const [offeredPrice, setOfferedPrice] = useState('14.0');
  const [offerNotes, setOfferNotes] = useState('Prompt NEFT settlement within 24h of weighbridge slip.');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const districts = ['All', 'Bengaluru Rural', 'Kolar', 'Chikkaballapur', 'Ramanagara', 'Mysuru'];
  const grades = ['All', 'A (Premium)', 'B (Standard)', 'C (Fair)'];

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      const matchCrop = item.crop.toLowerCase().includes(searchCrop.toLowerCase()) ||
        item.variety.toLowerCase().includes(searchCrop.toLowerCase());
      const matchDistrict = filterDistrict === 'All' || item.location.district.includes(filterDistrict);
      const matchGrade = filterGrade === 'All' || item.qualityGrade === filterGrade;
      return matchCrop && matchDistrict && matchGrade;
    });
  }, [listings, searchCrop, filterDistrict, filterGrade]);

  const handleSubmitOffer = () => {
    if (!selectedProduce) return;

    const offer: BuyerOffer = {
      id: `offer-${Date.now()}`,
      buyerId: currentBuyer.id,
      buyerName: currentBuyer.businessName,
      buyerCategory: currentBuyer.businessCategory,
      crop: selectedProduce.crop,
      offeredPricePerKg: Number(offeredPrice) || 14.0,
      minQuantityKg: Math.min(500, selectedProduce.quantityKg),
      maxQuantityKg: selectedProduce.quantityKg * 2,
      location: currentBuyer.location,
      distanceKm: 48,
      paymentTerms: 'Direct NEFT within 24 hours of gate weighment',
      collectionType: 'Collection Centre',
      verificationStatus: 'Demo Verified',
      validUntil: '2026-11-15',
    };

    // Store the accepted offer / transaction
    store.acceptBuyerOffer(offer, selectedProduce.quantityKg);

    try {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    } catch (e) {
      // ignore
    }

    setToastMessage(`Purchase offer of ₹${offeredPrice}/kg submitted to ${selectedProduce.farmerName} for ${selectedProduce.quantityKg} kg ${selectedProduce.crop}! Transaction initialized.`);
    setSelectedProduce(null);
    setTimeout(() => setToastMessage(null), 5000);
    if (onOfferSubmitted) onOfferSubmitted();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-forest to-forest-dark text-white p-6 sm:p-7 rounded-2xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-surface/20 text-cream text-xs font-semibold mb-2">
            <Sprout className="w-3.5 h-3.5 text-gold" />
            <span>Farmgate Direct Procurement Sourcing</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            Available Farmer Harvest Batches
          </h1>
          <p className="text-xs sm:text-sm text-[#D8E2DC] mt-1 max-w-2xl leading-relaxed">
            Discover verified produce directly from farmers in the Hoskote, Kolar, and Mysuru clusters. Submit direct bids or contract purchase orders.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-xs text-cream">
          <span className="text-mutedGrey block uppercase text-[10px] font-bold">Active Buyer Account</span>
          <span className="font-bold text-white text-sm">{currentBuyer.businessName}</span>
          <span className="block text-[10px] text-gold mt-0.5">Verified Corporate Purchaser</span>
        </div>
      </div>

      {toastMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-semibold text-emerald-950 flex items-center justify-between gap-2 shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          {onNavigateTransactions && (
            <button
              onClick={onNavigateTransactions}
              className="text-xs font-bold text-forest underline shrink-0 hover:text-forest-dark"
            >
              View Order in Transactions →
            </button>
          )}
        </div>
      )}

      {/* 2. Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-[#E5E0D0] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-xl bg-gray-50 text-xs w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-mutedGrey" />
          <input
            type="text"
            placeholder="Search crop or variety..."
            value={searchCrop}
            onChange={(e) => setSearchCrop(e.target.value)}
            className="bg-transparent border-none focus:outline-none w-full text-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-bold text-gray-600">District:</span>
            <select
              value={filterDistrict}
              onChange={(e) => setFilterDistrict(e.target.value)}
              className="px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs bg-white font-medium"
            >
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-bold text-gray-600">Grade:</span>
            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs bg-white font-medium"
            >
              {grades.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 3. Produce Batches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredListings.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-[#E5E0D0] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-bold text-base text-forest-dark leading-snug">
                    {item.crop}
                  </h3>
                  <div className="text-xs text-mutedGrey">
                    Variety: <strong className="text-gray-700">{item.variety}</strong>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {item.qualityGrade}
                </span>
              </div>

              {/* Quantity highlight */}
              <div className="my-3 p-3 rounded-xl bg-cream border border-[#E5E0D0] flex justify-between items-baseline text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-mutedGrey block">Available Lot</span>
                  <span className="text-xl font-black text-forest-dark">
                    {item.quantityKg.toLocaleString()} <span className="text-xs font-normal text-gray-500">kg</span>
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-mutedGrey block">Min. Ask</span>
                  <span className="text-sm font-bold text-forest">₹{item.minAcceptablePricePerKg}/kg</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-gray-600 mb-4">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-forest shrink-0" />
                  <span>Farmgate: <strong>{item.location.village}, {item.location.district}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-forest shrink-0" />
                  <span>Harvest Ready: <strong>{item.harvestStatus}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-forest shrink-0" />
                  <span>Farmer: <strong>{item.farmerName}</strong> (Verified Producer)</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <button
                onClick={() => {
                  setSelectedProduce(item);
                  setOfferedPrice(String(Math.max(14.0, item.minAcceptablePricePerKg + 2)));
                }}
                className="w-full py-2.5 px-3 bg-forest hover:bg-forest-dark text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Send className="w-3.5 h-3.5 text-gold" />
                <span>Submit Purchase Offer</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 4. SUBMIT OFFER MODAL */}
      {selectedProduce && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E5E0D0] animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div>
                <h3 className="font-bold text-base text-forest-dark">Submit Purchase Order Offer</h3>
                <p className="text-xs text-mutedGrey">
                  To {selectedProduce.farmerName} for {selectedProduce.quantityKg.toLocaleString()} kg {selectedProduce.crop}
                </p>
              </div>
              <button onClick={() => setSelectedProduce(null)} className="p-1 rounded-full hover:bg-gray-100 text-gray-500">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Your Offered Price (₹/kg)</label>
                <input
                  type="number"
                  step="0.5"
                  value={offeredPrice}
                  onChange={(e) => setOfferedPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-bold text-forest-dark"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Payment & Quality Terms</label>
                <textarea
                  rows={2}
                  value={offerNotes}
                  onChange={(e) => setOfferNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="p-3 bg-cream rounded-xl border border-[#E5E0D0] space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Purchase Value:</span>
                  <span className="font-bold text-forest-dark">
                    ₹{(selectedProduce.quantityKg * Number(offeredPrice || 0)).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-mutedGrey text-[11px]">
                  <span>Farmer Min Expectation:</span>
                  <span>₹{selectedProduce.minAcceptablePricePerKg}/kg</span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                <button onClick={() => setSelectedProduce(null)} className="px-4 py-2 text-xs font-semibold text-gray-500">
                  Cancel
                </button>
                <button
                  onClick={handleSubmitOffer}
                  className="px-5 py-2.5 bg-forest text-white rounded-xl text-xs font-bold shadow-xs active:scale-95"
                >
                  Confirm & Transmit Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

