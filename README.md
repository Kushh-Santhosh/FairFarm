# FAIRFARM 🌾
**The smarter way from farm to fair price.**

> **Team:** FENSTA  
> **Challenge:** FROM FARM TO A FAIR PRICE  
> **Core Principle:** *"Compare what the farmer keeps, not just what the buyer offers."*

---

## 🌾 Overview
**FAIRFARM** is a farmer-centric agricultural market intelligence and assisted-selling platform designed for Indian farmers. 

Farmers often see headline buyer quotes—such as ₹14/kg versus a local village trader's ₹10/kg—and assume the higher number guarantees more profit. In reality, transportation costs, loading/hamali charges, commissions, market fees, and unexpected transit grading deductions can turn that ₹14 offer into a lower payout.

FAIRFARM solves this by computing **estimated NET EARNINGS** dynamically across:
1. **Local Village Aggregators / Traders** (Minimal transport, lower headline price)
2. **Nearby APMC Mandis** (Moderate distance, licensed commission agents, auction fees)
3. **Distant Corporate Wholesale Buyers** (High headline price, longer freight, higher net payout)
4. **FPO Collective Selling Pools** (Shared bulk freight, zero commission, maximum net payout)

---

## 🏆 Mandatory Financial Test Scenario (Passed 100%)

Benchmark input: **1,000 kg Tomatoes (Grade A)**
* **Local Village Trader:**
  * Price: ₹10/kg | Gross: ₹10,000
  * Expenses: ₹300 transport + ₹100 loading + ₹100 commission = **₹500**
  * **Estimated Net: ₹9,500** (₹9.50/kg)
* **Nearby APMC Mandi (Kolar):**
  * Price: ₹12/kg | Gross: ₹12,000
  * Expenses: ₹1,000 transport + ₹200 loading + ₹300 fees = **₹1,500**
  * **Estimated Net: ₹10,500** (₹10.50/kg)
* **Distant Wholesale Buyer (City Fresh Foods):**
  * Price: ₹14/kg | Gross: ₹14,000
  * Expenses: ₹2,200 transport + ₹300 loading + ₹200 commission + ₹300 transit quality deduction = **₹3,000**
  * **Estimated Net: ₹11,000** (₹11.00/kg)
  * **Dynamic System Recommendation: DISTANT BUYER (+₹1,500 MORE in farmer's pocket than the local trader)**

---

## 🚀 Key Innovations & Platform Modules

### 1. 🧮 Smart Net-Earnings Engine (`src/services/calculator.ts`)
* Implements mathematical formula:
  $$\text{Gross} = \text{Quantity} \times \text{Price per kg}$$
  $$\text{Total Expenses} = \text{Transport} + \text{Loading} + \text{Commission} + \text{Fees} + \text{Deductions} + \text{Packaging}$$
  $$\text{Estimated Net Earnings} = \text{Gross} - \text{Total Expenses}$$
* Real-time sliders allow farmers or judges to adjust freight distance, loading, and commissions to see instant net recalculations.
* Interactive visual bar charts powered by **Recharts**.

### 2. 📞 Voice Assistant / Simulated IVR Phone (`1800-FAIR-FARM`)
* Accessible to feature phone users without internet access.
* Realistic smartphone UI with Web Audio DTMF numeric keypad (0-9, *, #) and tone synthesis.
* Natural speech synthesis in **Kannada, Telugu, Tamil, Hindi, and English**.
* Step-by-step interactive flow:
  1. Language selection (1: EN, 2: KN, 3: TE, 4: HI)
  2. Crop selection (1: Tomato, 2: Onion, 3: Potato, 4: Other)
  3. Numeric keypad quantity entry with `#` confirmation
  4. District selection (Hoskote, Kolar, Ramanagara, Mysuru)
  5. Voice announcement of the 3 selling options and net earnings recommendation
  6. Replay (1), Request Buyer Callback (2), Connect to FPO Field Coordinator (3), or End Call (4).
* Automatically persists transcripts to activity history.

### 3. 🌐 Multilingual System
Full application internationalization across all components, forms, navigation, and dialogs:
* **English**
* **ಕನ್ನಡ – Kannada** (Regional script for Karnataka agricultural belt)
* **తెలుగు – Telugu**
* **தமிழ் – Tamil**
* **हिन्दी – Hindi**

### 4. 📱 Mobile-First Strategy & Simple Farmer Mode
* **Simple Farmer Mode:** Instant toggle in navbar with high-contrast, giant touch-friendly cards, simplified language, and prominent regional voice assistance.
* Floating persistent **"Find Best Price"** action button.
* 5-item bottom mobile navigation bar (Home, Sell, Market, Buyers, More).
* Installable **Progressive Web Application (PWA)** with `manifest.json`, service worker offline caching, and connection status badges (*Online*, *Offline*, *Sync Pending*).

### 5. 🤝 Collective Selling & FPO Operations (Hoskote Tomato Collective)
* 12 neighbor farmers aggregating produce to hit a 10,000 kg threshold.
* Progress bar dynamically updates when farmers pledge their harvest.
* **Shared Freight Economics:**
  * Individual small truck (Tata Ace): ₹2.20/kg
  * Shared 10T agricultural truck: ₹0.75/kg
  * **Direct Farmer Savings: ₹1.45/kg (₹1,450 saved per tonne!)**

### 6. 🚚 Agricultural Logistics Coordination
* Pre-integrated transport vehicle tiers: Small (Tata Ace 1.5T), Medium (407 4T), Large (10T+).
* Route distance calculator and transparent rate-per-km quotes.
* Live 6-stage shipment tracker:
  `Requested` → `Confirmed` → `Pickup Scheduled` → `Produce Collected` → `In Transit` → `Delivered`.

### 7. 🏪 Verified Buyer Marketplace
* Authenticated buyer network across Retail Chains, Food Processors, APMC Commission Houses, and Institutional Buyers.
* Explicit `"Demo Verified"` indicators.
* One-click offer acceptance directly creates a digital transaction.

### 8. 📝 Transaction Lifecycle & Feedback Loop
* 8-stage progress tracker from purchase order to final bank credit.
* **Estimated vs Actual Audit:** Farmers record actual freight and weighbridge deductions to close the feedback loop.
* Dispute filing mechanism routed to the FPO ombudsman.

### 9. 🛡️ Platform Administration & FPO Hub
* Buyer verification toggles.
* Dispute resolution queue.
* AGMARKNET and e-NAM demonstration data ingestion indicators.

---

## 🎨 Brand Identity & Colors
* **Forest Green:** `#183F32` (Agriculture, trust, reliability)
* **Deep Green:** `#102E25` (Authority, depth)
* **Harvest Gold:** `#D7A53A` (Prosperity, fair value)
* **Warm Cream:** `#F8F6EE` (Warmth, rural accessibility)
* **Earth Brown:** `#8B6241` (Soil, authenticity)
* **Logo:** Uses the official uploaded FAIRFARM emblem with sprouting leaf and sun motifs preserved directly from source assets.

---

## 💻 Tech Stack
* **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, Lucide React, Recharts, Canvas-Confetti
* **Backend:** Node.js, Express, TypeScript (`server/index.ts`)
* **Data Persistence:** Reactive local storage / IndexedDB repository with 15 pre-seeded farmers, 10 buyers, 10 market feeds, 5 collective pools, and 5 logistics partners
* **PWA:** Web App Manifest, Service Worker (`public/sw.js`), standalone mobile display mode

---

## 🛠️ Setup & Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Financial Calculation Test
```bash
npm run test:calc
```

### 3. Start Frontend Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Start Express Backend API (Optional)
```bash
npm run server
```
API running on [http://localhost:5001](http://localhost:5001).

### 5. Production Build
```bash
npm run build
```

---

## 🧑‍🌾 Quick Judge Demonstration Walkthrough
1. **Open FAIRFARM:** Click language selector on the top right and select **ಕನ್ನಡ (Kannada)**. Notice how the entire interface instantly switches to authentic Kannada agricultural terminology.
2. **Switch to Simple Farmer Mode:** Click the **Simple Mode** pill in the header to view high-contrast, giant touch cards.
3. **Run Tomato Net Comparison:**
   * Click **"Find Best Selling Price"** or navigate to **Market Intelligence**.
   * Observe the 1,000 kg tomato benchmark: Local Trader (₹9,500) vs Mandi (₹10,500) vs Distant Buyer (₹11,000).
   * Note the dynamic green badge highlighting the Distant Buyer as the highest net earner.
   * Adjust the sliders in "Adjust Costs & Fees Manually" to see dynamic recalculations.
4. **Explore Collective Selling:**
   * Open **Collective Selling** tab.
   * View the *Hoskote Tomato Collective* (8,500 / 10,000 kg).
   * Click **"Join Group"** and pledge 1,000 kg. Watch the progress bar advance and confetti trigger!
5. **Simulate Voice Phone Call:**
   * Click the green **1800-FAIR-FARM** button.
   * Press the green Call button on the simulated smartphone.
   * Follow the voice prompt with the keypad (1: English, 1: Tomato, 1000#, 1: Hoskote).
   * Hear the voice read aloud your net earnings!
6. **Accept an Offer:**
   * In **Verified Buyers**, click **"Accept Offer & Sell"**.
   * Watch the transaction transition into **My Transactions** with live 8-stage progress tracking.

---
*Developed with dedication by Team Fensta for the agricultural communities of India.*

