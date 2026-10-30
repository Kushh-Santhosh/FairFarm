import React, { useState, useMemo } from 'react';
import { useTranslation } from '../../i18n';
import { store } from '../../services/store';
import { BuyerProfile, BuyerOffer } from '../../types';
import {
  Store,
  Search,
  Filter,
  CheckCircle2,
  ShieldCheck,
  Star,
  MapPin,
  Calendar,
  CreditCard,
  Truck,
  ArrowRight,
  MessageSquare,
  X,
  Sparkles,
} from 'lucide-react';

interface BuyerMarketplaceProps {
  onAcceptOffer: (buyer: BuyerProfile, offer: BuyerOffer) => void;
}

export const BuyerMarketplace: React.FC<BuyerMarketplaceProps> = ({ onAcceptOffer }) => {
  const { t } = useTranslation();
  const buyers = store.getBuyers();
  const buyerOffers = store.getBuyerOffers();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [activeBuyerModal, setActiveBuyerModal] = useState<BuyerProfile | null>(null);
  const [enquirySuccessMessage, setEnquirySuccessMessage] = useState<string | null>(null);

  const categories = ['All', 'Retail Chain', 'Food Processor', 'Wholesale Trader', 'Distributor', 'Institutional Buyer'];
  const crops = ['All', 'Tomato', 'Beans', 'Onion', 'Potato', 'Ragi'];

  const filteredBuyers = useMemo(() => {
    return buyers.filter((buyer) => {
      const matchesSearch =
        buyer.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        buyer.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        buyer.cropsPurchased.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = selectedCategory === 'All' || buyer.businessCategory === selectedCategory;
      const matchesCrop = selectedCrop === 'All' || buyer.cropsPurchased.includes(selectedCrop);

      return matchesSearch && matchesCat && matchesCrop;
    });
  }, [buyers, searchQuery, selectedCategory, selectedCrop]);

  const handleSendEnquiry = (buyer: BuyerProfile) => {
    setEnquirySuccessMessage(`Enquiry sent directly to ${buyer.contactPerson}. They will respond on your registered phone.`);
    setTimeout(() => setEnquirySuccessMessage(null), 4000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-[#E5E0D0] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-800">
              <Store className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-forest-dark">
              {t.buyers.title}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 max-w-2xl">
            {t.buyers.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>10 Verified Demo Buyers</span>
          </span>
        </div>
      </div>

      {/* Enquiry Toast Alert */}
      {enquirySuccessMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-semibold text-emerald-900 flex items-center gap-2 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{enquirySuccessMessage}</span>
        </div>
      )}

      {/* 2. Search & Category Filters */}
      <div className="bg-white p-4 rounded-2xl border border-[#E5E0D0] shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search bar */}
          <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-gray-300 bg-gray-50 text-xs">
            <Search className="w-4 h-4 text-mutedGrey shrink-0" />
            <input
              type="text"
              placeholder={t.buyers.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:outline-none w-full text-xs text-forest-dark"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Crop Dropdown Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-600 shrink-0">Crop:</span>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-xl text-xs font-medium text-forest-dark focus:ring-2 focus:ring-forest focus:outline-none bg-white"
            >
              {crops.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-gray-100">
          <span className="text-xs font-bold text-gray-500 mr-1">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-forest text-white shadow-xs'
                  : 'bg-cream text-forest-dark hover:bg-cream-dark border border-[#E5E0D0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Buyer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBuyers.map((buyer) => {
          // Find matching top offer for this buyer
          const matchingOffer = buyerOffers.find((o) => o.buyerId === buyer.id) || buyerOffers[0];

          return (
            <div
              key={buyer.id}
              className="bg-white rounded-2xl border border-[#E5E0D0] hover:border-forest/40 hover:shadow-md transition-all flex flex-col justify-between p-5"
            >
              <div>
                {/* Data Source Badge */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
                  <span className="font-mono text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    BUYER-SUBMITTED OFFER
                  </span>
                  <span className="text-[10px] text-mutedGrey font-medium">Direct RFQ</span>
                </div>

                {/* Header info */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-bold text-sm text-forest-dark leading-snug">
                      {buyer.businessName}
                    </h3>
                    <span className="text-[11px] text-mutedGrey font-medium">
                      {buyer.businessCategory}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-700" />
                    <span>{buyer.verificationStatus}</span>
                  </span>
                </div>

                {/* Location */}
                <div className="text-xs text-gray-600 flex items-center gap-1 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-forest shrink-0" />
                  <span className="truncate">{buyer.location}</span>
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-3 text-xs mb-4 pb-3 border-b border-gray-100">
                  <span className="flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{buyer.rating}</span>
                  </span>
                  <span className="text-mutedGrey text-[11px]">
                    ({buyer.reviewCount} farmer reviews)
                  </span>
                  <span className="text-mutedGrey text-[11px] ml-auto">
                    {buyer.completedTransactionsCount} orders completed
                  </span>
                </div>

                {/* Crops & Price Offer Box */}
                <div className="bg-cream p-3 rounded-xl border border-[#E5E0D0] mb-4 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-mutedGrey">Featured Offer:</span>
                    <span className="font-bold text-forest-dark">
                      {matchingOffer.crop} •{' '}
                      <span className="text-forest text-sm font-extrabold">
                        ₹{matchingOffer.offeredPricePerKg}/kg
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-gray-600">
                    <span>Payment Terms:</span>
                    <span className="font-medium truncate max-w-[170px] text-right">
                      {buyer.paymentTerms}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-gray-600">
                    <span>Collection Mode:</span>
                    <span className="font-semibold text-forest">
                      {buyer.collectionAvailability}
                    </span>
                  </div>
                </div>

                {/* Crops Accepted tags */}
                <div className="mb-4">
                  <div className="text-[11px] text-mutedGrey font-medium mb-1.5">Purchases:</div>
                  <div className="flex flex-wrap gap-1">
                    {buyer.cropsPurchased.map((cropName) => (
                      <span
                        key={cropName}
                        className="text-[10px] bg-gray-100 text-gray-700 font-medium px-2 py-0.5 rounded"
                      >
                        {cropName}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
                <button
                  onClick={() => setActiveBuyerModal(buyer)}
                  className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-gray-50 border border-gray-300 text-forest-dark font-semibold text-xs transition-colors"
                >
                  {t.common.viewDetails}
                </button>

                <button
                  onClick={() => onAcceptOffer(buyer, matchingOffer)}
                  className="flex-1 py-2 px-3 rounded-xl bg-forest hover:bg-forest-dark text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95"
                >
                  <span>{t.buyers.acceptCta}</span>
                  <ArrowRight className="w-3 h-3 text-gold" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. BUYER PROFILE & HISTORY MODAL */}
      {activeBuyerModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-[#E5E0D0] animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-gray-100 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg text-forest-dark">
                    {activeBuyerModal.businessName}
                  </h3>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    {activeBuyerModal.verificationStatus}
                  </span>
                </div>
                <p className="text-xs text-mutedGrey">
                  Category: {activeBuyerModal.businessCategory} • Contact: {activeBuyerModal.contactPerson}
                </p>
              </div>
              <button
                onClick={() => setActiveBuyerModal(null)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-cream border border-[#E5E0D0]">
                <div>
                  <span className="text-mutedGrey block">Daily Procurement Volume:</span>
                  <span className="font-bold text-forest-dark text-sm">
                    {activeBuyerModal.dailyDemandKg.toLocaleString()} kg/day
                  </span>
                </div>
                <div>
                  <span className="text-mutedGrey block">Payment Settlement:</span>
                  <span className="font-bold text-forest-dark text-sm">
                    {activeBuyerModal.paymentTerms}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-forest-dark mb-1">Procurement Address & Yard</h4>
                <p className="text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                  {activeBuyerModal.location}, District: {activeBuyerModal.district}, Karnataka
                </p>
              </div>

              <div>
                <h4 className="font-bold text-forest-dark mb-1">Quality Grading Policy</h4>
                <p className="text-gray-600 leading-relaxed">
                  Transparent digital weighbridge slips provided. Rejection threshold capped at max 3% for standard transit defects. Direct dispute escalation enabled via FAIRFARM FPO ombudsman.
                </p>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    handleSendEnquiry(activeBuyerModal);
                    setActiveBuyerModal(null);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold flex items-center gap-1.5 hover:bg-gray-50"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{t.buyers.enquireCta}</span>
                </button>

                <button
                  onClick={() => {
                    const topOffer = buyerOffers.find((o) => o.buyerId === activeBuyerModal.id) || buyerOffers[0];
                    setActiveBuyerModal(null);
                    onAcceptOffer(activeBuyerModal, topOffer);
                  }}
                  className="px-5 py-2.5 bg-forest hover:bg-forest-dark text-white rounded-xl font-bold flex items-center gap-2 shadow-sm"
                >
                  <span>{t.buyers.acceptCta}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

