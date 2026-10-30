import React, { useState } from 'react';
import { useTranslation } from '../../i18n';
import { store } from '../../services/store';
import { TransportPartner, Shipment, ShipmentStatus } from '../../types';
import {
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  Phone,
  Star,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  PlusCircle,
  X,
} from 'lucide-react';

export const LogisticsCoordination: React.FC = () => {
  const { t } = useTranslation();
  const partners = store.getTransportPartners();
  const shipments = store.getShipments();

  const [activeTab, setActiveTab] = useState<'partners' | 'tracking'>('tracking');
  const [selectedPartnerForBooking, setSelectedPartnerForBooking] = useState<TransportPartner | null>(null);
  const [bookingPickup, setBookingPickup] = useState('Hoskote FPO Collection Centre');
  const [bookingDelivery, setBookingDelivery] = useState('City Fresh Foods Whitefield Hub');
  const [bookingDistanceKm, setBookingDistanceKm] = useState('48');
  const [bookingToast, setBookingToast] = useState<string | null>(null);

  const handleBookTransport = (partner: TransportPartner) => {
    const dist = Number(bookingDistanceKm) || 45;
    const totalCost = partner.baseFare + Math.round(dist * partner.ratePerKm);

    store.bookShipment({
      transportPartnerId: partner.id,
      transportPartnerName: partner.companyName,
      vehicleType: partner.vehicleType,
      pickupLocation: bookingPickup,
      deliveryLocation: bookingDelivery,
      distanceKm: dist,
      totalCost,
      collectionDate: 'Tomorrow, 07:00 AM',
      currentLocationNote: 'Driver assigned. Vehicle inspection scheduled before pickup.',
    });

    setSelectedPartnerForBooking(null);
    setActiveTab('tracking');
    setBookingToast(`Transport booked with ${partner.companyName}! Vehicle assigned for tomorrow.`);
    setTimeout(() => setBookingToast(null), 5000);
  };

  const getStatusBadge = (status: ShipmentStatus) => {
    switch (status) {
      case 'requested':
        return { label: 'Requested', color: 'bg-amber-100 text-amber-800' };
      case 'confirmed':
        return { label: 'Confirmed', color: 'bg-blue-100 text-blue-800' };
      case 'pickup_scheduled':
        return { label: 'Pickup Scheduled', color: 'bg-purple-100 text-purple-800' };
      case 'collected':
        return { label: 'Produce Collected', color: 'bg-indigo-100 text-indigo-800' };
      case 'in_transit':
        return { label: 'In Transit', color: 'bg-emerald-100 text-emerald-800 font-bold animate-pulse' };
      case 'delivered':
        return { label: 'Delivered', color: 'bg-gray-100 text-gray-800' };
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-[#E5E0D0] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-xl bg-forest text-cream">
              <Truck className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-forest-dark">
              {t.logistics.title}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 max-w-2xl">
            {t.logistics.subtitle}
          </p>
        </div>

        {/* Tabs switcher */}
        <div className="flex rounded-xl bg-cream p-1 border border-[#E5E0D0]">
          <button
            onClick={() => setActiveTab('tracking')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'tracking' ? 'bg-forest text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Live Tracking ({shipments.length})
          </button>
          <button
            onClick={() => setActiveTab('partners')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'partners' ? 'bg-forest text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Vehicle Partners ({partners.length})
          </button>
        </div>
      </div>

      {bookingToast && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-semibold text-emerald-950 flex items-center gap-2 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{bookingToast}</span>
        </div>
      )}

      {/* 2. TAB: LIVE TRACKING */}
      {activeTab === 'tracking' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-forest-dark">Active Agricultural Shipments</h2>
            <span className="text-xs text-mutedGrey">Simulated GPS Live Feed</span>
          </div>

          <div className="space-y-4">
            {shipments.map((shipment) => {
              const badge = getStatusBadge(shipment.status);
              return (
                <div
                  key={shipment.id}
                  className="bg-white rounded-2xl border border-[#E5E0D0] shadow-xs p-5 space-y-4"
                >
                  {/* Top info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-forest-dark">{shipment.transportPartnerName}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badge.color}`}>
                          {badge.label}
                        </span>
                      </div>
                      <div className="text-xs text-mutedGrey mt-0.5">
                        {shipment.vehicleType} • Freight Cost: <strong className="text-forest">₹{shipment.totalCost.toLocaleString()}</strong> ({shipment.distanceKm} km)
                      </div>
                    </div>

                    <div className="text-xs text-gray-600 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-mutedGrey" />
                      <span>Collection: {shipment.collectionDate}</span>
                    </div>
                  </div>

                  {/* Route points */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-cream rounded-xl border border-[#E5E0D0]">
                      <span className="text-[10px] text-mutedGrey font-bold uppercase block">Pickup Point:</span>
                      <span className="font-semibold text-forest-dark">{shipment.pickupLocation}</span>
                    </div>
                    <div className="p-3 bg-cream rounded-xl border border-[#E5E0D0]">
                      <span className="text-[10px] text-mutedGrey font-bold uppercase block">Delivery Destination:</span>
                      <span className="font-semibold text-forest-dark">{shipment.deliveryLocation}</span>
                    </div>
                  </div>

                  {/* Current GPS note */}
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span><strong>Live Status:</strong> {shipment.currentLocationNote}</span>
                  </div>

                  {/* 6-Stage Journey Tracker */}
                  <div className="pt-2">
                    <div className="text-xs font-bold text-gray-700 mb-3">Shipment Progress Timeline:</div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                      {shipment.milestones.map((m, idx) => (
                        <div
                          key={idx}
                          className={`p-2.5 rounded-xl border text-[11px] flex flex-col justify-between ${
                            m.completed
                              ? 'bg-forest-surface border-forest/30 text-forest font-semibold'
                              : 'bg-gray-50 border-gray-200 text-gray-400'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] opacity-75">#{idx + 1}</span>
                            {m.completed && <CheckCircle2 className="w-3.5 h-3.5 text-forest" />}
                          </div>
                          <div>
                            <div className="font-bold leading-tight">{m.label}</div>
                            <div className="text-[9px] text-gray-500 mt-1">{m.timestamp}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. TAB: VEHICLE PARTNERS */}
      {activeTab === 'partners' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-2xl border border-[#E5E0D0] p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-start justify-between gap-1 mb-2">
                  <h3 className="font-bold text-sm text-forest-dark leading-snug">{partner.companyName}</h3>
                  <span className="flex items-center gap-1 font-bold text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>{partner.rating}</span>
                  </span>
                </div>

                <div className="text-xs text-forest font-semibold mb-3">
                  {partner.vehicleType}
                </div>

                <div className="p-3 bg-cream rounded-xl border border-[#E5E0D0] space-y-1.5 text-xs mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capacity:</span>
                    <span className="font-bold text-gray-900">{partner.capacityKg.toLocaleString()} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Fare:</span>
                    <span className="font-bold text-gray-900">₹{partner.baseFare}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Standard Rate:</span>
                    <span className="font-bold text-forest">₹{partner.ratePerKm} / km</span>
                  </div>
                </div>

                <div className="text-[11px] text-gray-500 space-y-1 mb-4">
                  <div>Contact: <strong>{partner.contactPerson}</strong> ({partner.phone})</div>
                  <div>Coverage: {partner.availableDistricts.join(', ')}</div>
                </div>
              </div>

              <button
                onClick={() => setSelectedPartnerForBooking(partner)}
                className="w-full py-2.5 px-4 bg-forest hover:bg-forest-dark text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-xs"
              >
                <span>{t.logistics.bookTransport}</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 4. BOOK TRANSPORT MODAL */}
      {selectedPartnerForBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E5E0D0] animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div>
                <h3 className="font-bold text-base text-forest-dark">Book Agricultural Freight</h3>
                <p className="text-xs text-mutedGrey">{selectedPartnerForBooking.companyName}</p>
              </div>
              <button onClick={() => setSelectedPartnerForBooking(null)} className="p-1 rounded-full hover:bg-gray-100 text-gray-500">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Pickup Farmgate / Collection Point</label>
                <input
                  type="text"
                  value={bookingPickup}
                  onChange={(e) => setBookingPickup(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Delivery Destination</label>
                <input
                  type="text"
                  value={bookingDelivery}
                  onChange={(e) => setBookingDelivery(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Estimated Distance (km)</label>
                <input
                  type="number"
                  value={bookingDistanceKm}
                  onChange={(e) => setBookingDistanceKm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs font-bold"
                />
              </div>

              <div className="p-3 bg-cream rounded-xl border border-[#E5E0D0] flex justify-between items-center text-xs">
                <span className="font-bold text-forest-dark">Calculated Freight Cost:</span>
                <span className="text-base font-black text-forest">
                  ₹{(selectedPartnerForBooking.baseFare + Number(bookingDistanceKm || 0) * selectedPartnerForBooking.ratePerKm).toLocaleString()}
                </span>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                <button
                  onClick={() => setSelectedPartnerForBooking(null)}
                  className="px-4 py-2 text-xs font-semibold text-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleBookTransport(selectedPartnerForBooking)}
                  className="px-5 py-2.5 bg-forest text-white rounded-xl text-xs font-bold shadow-xs active:scale-95"
                >
                  Confirm Vehicle Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

