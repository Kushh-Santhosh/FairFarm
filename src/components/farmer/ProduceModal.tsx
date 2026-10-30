import React, { useState } from 'react';
import { useTranslation } from '../../i18n';
import { store } from '../../services/store';
import {
  Sprout,
  Scale,
  MapPin,
  Calendar,
  CheckCircle2,
  X,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProduceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProduceCreated: (crop: string, qty: number) => void;
}

const POPULAR_CROPS = [
  { name: 'Tomato', icon: '🍅', varieties: ['Hybrid Shivam', 'Sahu', 'Abhinav', 'Country Local'] },
  { name: 'Onion', icon: '🧅', varieties: ['Bellary Red', 'Nashik Pink', 'White Garlic'] },
  { name: 'Potato', icon: '🥔', varieties: ['Hassan Jyoti', 'Kufri Pukhraj', 'Chipsona'] },
  { name: 'Beans', icon: '🫘', varieties: ['French Bush', 'Ring Beans', 'Flat Broad'] },
  { name: 'Ragi', icon: '🌾', varieties: ['GPU-28 Finger Millet', 'Indaf-9', 'ML-365'] },
  { name: 'Maize', icon: '🌽', varieties: ['Yellow Hybrid', 'Sweet Corn', 'Kargil 900M'] },
  { name: 'Groundnut', icon: '🥜', varieties: ['TMV-2 Pods', 'Kadiri-6', 'JL-24'] },
];

export const ProduceModal: React.FC<ProduceModalProps> = ({
  isOpen,
  onClose,
  onProduceCreated,
}) => {
  const { t } = useTranslation();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [crop, setCrop] = useState('Tomato');
  const [variety, setVariety] = useState('Hybrid Shivam');
  const [quantityValue, setQuantityValue] = useState('1000');
  const [unit, setUnit] = useState<'kg' | 'tonnes'>('kg');
  const [qualityGrade, setQualityGrade] = useState<'A (Premium)' | 'B (Standard)' | 'C (Fair)'>('A (Premium)');
  const [harvestStatus, setHarvestStatus] = useState<'Ready for Sale' | 'Harvesting in 3 Days' | 'Harvesting Next Week'>('Ready for Sale');

  const [village, setVillage] = useState('Doddagattiganabbe');
  const [district, setDistrict] = useState('Bengaluru Rural');
  const [state, setState] = useState('Karnataka');
  const [pinCode, setPinCode] = useState('562114');

  const [harvestDate, setHarvestDate] = useState('2026-10-31');
  const [sellingDate, setSellingDate] = useState('2026-11-01');
  const [minPrice, setMinPrice] = useState('11');

  if (!isOpen) return null;

  const currentCropObj = POPULAR_CROPS.find((c) => c.name === crop) || POPULAR_CROPS[0];
  const finalQuantityKg = unit === 'tonnes' ? Number(quantityValue) * 1000 : Number(quantityValue);

  const handleSubmit = () => {
    store.addProduceListing({
      farmerId: store.getFarmer().id,
      farmerName: store.getFarmer().name,
      crop,
      variety,
      quantityKg: finalQuantityKg,
      qualityGrade,
      harvestStatus,
      location: {
        village,
        district,
        state,
        pinCode,
      },
      expectedHarvestDate: harvestDate,
      preferredSellingDate: sellingDate,
      minAcceptablePricePerKg: Number(minPrice),
    });

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore
    }

    onProduceCreated(crop, finalQuantityKg);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-[#E5E0D0] animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-100 text-forest">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-forest-dark">{t.produce.title}</h3>
              <p className="text-[11px] text-mutedGrey">{t.produce.subtitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 text-gray-500">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Indicators */}
        <div className="grid grid-cols-4 gap-1.5 mb-5 text-[11px] font-semibold text-center">
          <div className={`p-1.5 rounded-lg ${step === 1 ? 'bg-forest text-white' : 'bg-cream text-gray-600'}`}>
            1. Crop
          </div>
          <div className={`p-1.5 rounded-lg ${step === 2 ? 'bg-forest text-white' : 'bg-cream text-gray-600'}`}>
            2. Quantity
          </div>
          <div className={`p-1.5 rounded-lg ${step === 3 ? 'bg-forest text-white' : 'bg-cream text-gray-600'}`}>
            3. Location
          </div>
          <div className={`p-1.5 rounded-lg ${step === 4 ? 'bg-forest text-white' : 'bg-cream text-gray-600'}`}>
            4. Review
          </div>
        </div>

        {/* STEP 1: Crop & Variety */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Select Crop</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {POPULAR_CROPS.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => {
                      setCrop(c.name);
                      setVariety(c.varieties[0]);
                    }}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      crop === c.name
                        ? 'border-forest bg-forest-surface ring-2 ring-forest/30 font-bold text-forest-dark'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="text-2xl mb-1">{c.icon}</div>
                    <div className="text-xs">{c.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Variety</label>
              <select
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-forest focus:outline-none"
              >
                {currentCropObj.varieties.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* STEP 2: Quantity & Quality */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Available Quantity</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={quantityValue}
                  onChange={(e) => setQuantityValue(e.target.value)}
                  placeholder="e.g. 1000"
                  className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm font-bold focus:ring-2 focus:ring-forest focus:outline-none"
                />
                <div className="flex rounded-lg border border-gray-300 overflow-hidden text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setUnit('kg')}
                    className={`px-3 py-2 ${unit === 'kg' ? 'bg-forest text-white' : 'bg-gray-50 text-gray-700'}`}
                  >
                    kg
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnit('tonnes')}
                    className={`px-3 py-2 ${unit === 'tonnes' ? 'bg-forest text-white' : 'bg-gray-50 text-gray-700'}`}
                  >
                    Tonnes
                  </button>
                </div>
              </div>
              <div className="text-[11px] text-mutedGrey mt-1">
                Total weight: <span className="font-semibold text-forest-dark">{finalQuantityKg.toLocaleString()} kg</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Quality Grade</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(['A (Premium)', 'B (Standard)', 'C (Fair)'] as const).map((grade) => (
                  <button
                    key={grade}
                    type="button"
                    onClick={() => setQualityGrade(grade)}
                    className={`p-2.5 rounded-xl border text-center font-medium ${
                      qualityGrade === grade
                        ? 'border-forest bg-forest-surface text-forest font-bold ring-2 ring-forest/30'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Harvest Readiness</label>
              <select
                value={harvestStatus}
                onChange={(e) => setHarvestStatus(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-forest focus:outline-none"
              >
                <option value="Ready for Sale">Ready for Immediate Sale (Harvested)</option>
                <option value="Harvesting in 3 Days">Harvesting in 3 Days</option>
                <option value="Harvesting Next Week">Harvesting Next Week</option>
              </select>
            </div>
          </div>
        )}

        {/* STEP 3: Location & Timeline */}
        {step === 3 && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Village / Town</label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-forest focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">District</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-forest focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Preferred Selling Date</label>
                <input
                  type="date"
                  value={sellingDate}
                  onChange={(e) => setSellingDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-forest focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Min Price Expectation (₹/kg)</label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-forest focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Review Summary */}
        {step === 4 && (
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-forest-surface border border-forest/20 text-xs space-y-2">
              <div className="flex justify-between items-center border-b border-forest/10 pb-2">
                <span className="text-gray-600">Crop & Variety:</span>
                <span className="font-bold text-forest-dark">{crop} ({variety})</span>
              </div>
              <div className="flex justify-between items-center border-b border-forest/10 pb-2">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-bold text-forest-dark">{finalQuantityKg.toLocaleString()} kg ({qualityGrade})</span>
              </div>
              <div className="flex justify-between items-center border-b border-forest/10 pb-2">
                <span className="text-gray-600">Farmgate Location:</span>
                <span className="font-bold text-forest-dark">{village}, {district}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Expected Selling Date:</span>
                <span className="font-bold text-forest-dark">{sellingDate}</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span>
                Upon listing, FAIRFARM will automatically compute your estimated net earnings across all local traders, mandis, and corporate wholesale buyers.
              </span>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s - 1) as any)}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
            >
              Back
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-400"
            >
              Cancel
            </button>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s + 1) as any)}
              className="px-5 py-2.5 bg-forest hover:bg-forest-dark text-white rounded-xl text-xs font-bold flex items-center gap-2 ml-auto shadow-sm"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-gradient-to-r from-forest to-forest-dark text-white rounded-xl text-xs font-bold flex items-center gap-2 ml-auto shadow-md hover:shadow-lg active:scale-95 transition-all"
            >
              <CheckCircle2 className="w-4 h-4 text-gold" />
              <span>Submit & Compare Net Earnings</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

