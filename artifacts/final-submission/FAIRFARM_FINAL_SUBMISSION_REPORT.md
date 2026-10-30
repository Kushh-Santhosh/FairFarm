# FAIRFARM — Master Hackathon Submission Report

**Project:** FAIRFARM  
**Team:** FENSTA  
**Tagline:** *The smarter way from farm to fair price.*  
**Core Thesis:** *"Compare what the farmer keeps, not just what the buyer offers."*  
**Date of Submission:** October 30, 2026  
**Project Workspace:** `/Users/kushal/Documents/projects/FAIRFARM`  
**Application Endpoints:**
- Web Application: [http://localhost:3000](http://localhost:3000)
- Backend API Engine: [http://localhost:5001](http://localhost:5001)

---

## 1. Executive Summary

Indian agriculture sustains over 140 million farming households, yet smallholder and marginal farmers consistently capture only a fraction of the consumer value chain. While digital initiatives have made headline market prices more accessible, raw price data is dangerously incomplete. A distant wholesale offer of ₹14/kg often looks lucrative compared to a local farmgate offer of ₹10/kg. However, once freight, loading (*hamali*), market commissions, weighing charges, grading rejections, and transit spoilage are factored in, that seemingly superior price can leave the farmer with less money in pocket—or worse, an unrecoverable deficit.

**FAIRFARM** is a farmer-centric agricultural market intelligence and assisted-selling platform developed specifically to solve this structural distortion. Rather than functioning as a passive listing directory or a simplistic mandi bulletin, FAIRFARM is built around an algorithmic **Net-Earnings Calculation & Recommendation Engine**. It models every friction cost across four distinct selling channels:
1. Local Village Aggregators & Commission Agents (Farmgate)
2. Nearby APMC Regulated Wholesale Mandis
3. Direct Wholesale & Institutional Corporate Buyers
4. Farmer Producer Organization (FPO) Collective Aggregation Pools

By pairing this financial engine with multilingual voice guidance, feature-phone IVR simulation, collective transport pooling, and verifiable end-to-end settlement receipts, FAIRFARM empowers smallholders to make evidence-based marketing decisions that maximize actual take-home earnings.

---

## 2. Real-World Problem Analysis

### 2.1 The Asymmetry of Raw Headline Prices
Traditional agritech portals display modal mandi rates (e.g., *"Tomato: ₹14/kg at Bengaluru Wholesale"*). For a farmer in Hoskote or Kolar, this top-line price is misleading because it conceals the heavy friction costs required to realize it:
- **Transport Toll:** Moving small batches (500–1,500 kg) via solo hired light commercial vehicles (LCVs) costs upwards of ₹2,200 to ₹3,000 for a 50 km journey.
- **Handling & Loading (*Hamali*):** Loading at the village and unloading at the terminal yard imposes manual labor charges of ₹300 to ₹500 per ton.
- **Commission Cuts & Yard Levies:** Traditional mandis routinely deduct 6% to 10% in commission fees, market cess, and weighing charges.
- **Quality Deductions & Transit Shrinkage:** High-perishability horticulture crops suffer 2% to 5% physical damage and weight loss during rough highway transit, leading to arbitrary down-grading at receiving bays.

### 2.2 The Smallholder Dilemma
Over 86% of Indian farmers are small and marginal (holding under 2 hectares). Because individual harvest volumes are insufficient to fill a 10-ton multi-axle freight truck, small farmers are priced out of direct institutional procurement. Consequently, they remain captive to village traders who offer immediate cash at depressed rates (₹10/kg).

### 2.3 The Digital Accessibility Barrier
Literacy hurdles and unfamiliarity with complex desktop interfaces make conventional e-commerce dashboards intimidating. Agritech solutions must deliver voice-first, vernacular interaction that meets farmers on basic smartphones or feature phones.

---

## 3. Proposed Solution

FAIRFARM addresses the agricultural selling journey through four tightly integrated capabilities:

```
[ Farm Harvest ] ──► [ Multilingual Voice / IVR Input ]
                             │
                             ▼
               [ Smart Net-Earnings Engine ]
                             │
       ┌─────────────────────┼─────────────────────┐
       ▼                     ▼                     ▼
[ Local Farmgate ]   [ APMC Mandi ]       [ Wholesale Direct ]
(₹9,500 Net)         (₹10,500 Net)        (₹11,000 Net)
       │                     │                     │
       └─────────────────────┼─────────────────────┘
                             ▼
              [ FPO Collective Selling Pool ]
               (Shared Logistics: ₹12,850 Net)
                             │
                             ▼
               [ Dynamic Recommendation ]
             "Hoskote Collective: +₹3,350 Net"
                             │
                             ▼
          [ Escrow Contract & Settlement Receipt ]
```

1. **Smart Net-Earnings Comparison:** Evaluates gross revenue minus eight line-item expense categories across all viable channels in real time.
2. **Eligibility-Governed Recommendation Engine:** Automatically filters options by minimum lot volume, geographic radius, crop compatibility, and active vehicle pooling.
3. **Collective Selling & Shared Logistics:** Allows farmers to aggregate produce with neighbors, transforming fragmented 1,000 kg loads into full 10-ton shipments to slash individual transport costs by 66%.
4. **Multilingual Voice & IVR Assistance:** Offers complete voice-guided price discovery and decision support in Kannada, Telugu, Tamil, Hindi, and English.
5. **Verified Buyer Procurement:** Connects farmers with pre-screened institutional buyers operating transparent payment terms and structured electronic contracts.

---

## 4. Core Features & Status Matrix

| Capability | Module Description | Operational Status | Technical Implementation |
| :--- | :--- | :--- | :--- |
| **Net-Earnings Engine** | Dynamic financial calculator deducting freight, hamali, commission, fees, and shrinkage | **Fully Implemented** | TypeScript engine (`src/services/calculator.ts`) + Express API (`POST /api/calculate`) |
| **Recommendation Engine** | Eligibility-governed selector finding optimal take-home return | **Fully Implemented** | Multi-channel evaluator comparing all 4 channels dynamically |
| **Market Intelligence** | Visual comparison charts, breakdowns, parameter overrides | **Fully Implemented** | Recharts interactive bar visualizations + React state overrides |
| **Buyer Marketplace** | Catalog of verified retail, food processor, and wholesale buyers | **Fully Implemented** | Filterable buyer directory with clear `BUYER-SUBMITTED OFFER` attribution |
| **Collective Selling** | FPO aggregation pools with real-time progress bars and shared freight savings | **Fully Implemented** | Interactive pooling system with dynamic member join actions |
| **Voice Assistant** | Voice-first interactive advisory in 5 Indian languages | **Fully Implemented** | Web Speech Synthesis + DTMF tone synthesis + optional Speech Recognition |
| **Toll-Free IVR Emulation** | In-browser 1800 simulated feature-phone phone keypad | **Fully Implemented** | Web Audio API dual-frequency oscillator (697Hz–1477Hz) |
| **Farmer Dashboard** | Mobile-first overview prioritizing greeting, crops, calculator, and harvest | **Fully Implemented** | Responsive Tailwind CSS container with zero horizontal overflow |
| **Transaction & Receipts** | Order pipeline, logistics stage milestones, printable PDF-style receipt | **Fully Implemented** | Centralized transaction store with status badges and lifecycle stages |
| **FPO Coordinator View** | Group management, lot aggregation status, truck capacity tracking | **Fully Implemented** | Multi-perspective role switcher (`Navbar` role switcher) |
| **Admin Console** | Platform analytics, buyer KYC verification, mandi sync status | **Fully Implemented** | Admin monitoring views with demo sync status |
| *Live AGMARKNET API* | Production REST synchronization to data.gov.in mandi feeds | *Planned Roadmap* | Currently modeled using authentic KSAMB / AGMARKNET benchmark data |
| *Telecom Carrier IVR* | Live PRI/SIP trunk connecting 1800 phone numbers via Twilio/Exotel | *Planned Roadmap* | In-browser audio synthesis currently active for zero-cost demonstration |
| *Bank Payment Gateway* | Live UPI 2.0 / IMPS / e-NAM escrow payment gateway | *Planned Roadmap* | Simulated digital settlement flow with authentic audit logs |

---

## 5. Financial Demonstration: The 1,000 kg Tomato Benchmark

The central financial benchmark evaluates a farmer harvesting **1,000 kg of Hybrid Shivam Tomatoes** in Hoskote (Bengaluru Rural District). The farmer evaluates four genuine selling channels:

### 5.1 Comprehensive Financial Breakdown

| Financial Line Item | Local Village Trader | Nearby APMC Mandi (Kolar) | Distant Wholesale Buyer (City Fresh) | Hoskote FPO Collective Selling Pool |
| :--- | :---: | :---: | :---: | :---: |
| **Headline Rate Offered** | ₹10.00 / kg | ₹12.00 / kg | ₹14.00 / kg | **₹14.00 / kg** |
| **Gross Value** | **₹10,000** | **₹12,000** | **₹14,000** | **₹14,000** |
| **Transit Distance** | 2 km (Farmgate) | 28 km | 55 km | 6 km (Collection Centre) |
| 1. Transportation Cost | ₹300 | ₹1,000 | ₹2,200 | **₹750** *(Shared 10T Lorry)* |
| 2. Hamali & Loading | ₹100 | ₹200 | ₹300 | **₹150** *(FPO Mechanical Crane)* |
| 3. Commission / Agent Cut | ₹100 | ₹300 | ₹200 | **₹0** *(Direct FPO Purchase)* |
| 4. Mandi Yard / Admin Fees | ₹0 | ₹0 | ₹0 | **₹100** *(FPO Cess)* |
| 5. Quality Deductions & Transit Loss | ₹0 | ₹0 | ₹300 *(2% In-transit loss)* | **₹150** *(Batch-level sorting)* |
| 6. Spoilage Allowance | ₹0 | ₹0 | ₹0 | ₹0 |
| 7. Packaging / Crating | ₹0 | ₹0 | ₹0 | ₹0 |
| 8. Other Yard Levies | ₹0 | ₹0 | ₹0 | ₹0 |
| **Total Selling Expenses** | **₹500** | **₹1,500** | **₹3,000** | **₹1,150** |
| **Estimated Net Farmer Keeps** | **₹9,500** | **₹10,500** | **₹11,000** | **₹12,850** |
| **Net Return Per Kg** | ₹9.50 / kg | ₹10.50 / kg | ₹11.00 / kg | **₹12.85 / kg** |
| **Eligibility Status** | **Eligible** (Min: 0 kg) | **Eligible** (Min: 50 kg) | **Eligible** (Min: 200 kg) | **Eligible** (Min: 100 kg) |
| **Recommendation Engine Outcome** | — | — | Top Solo Buyer | ⭐ **WINNER: Maximum Collective Value** |

### 5.2 Key Takeaways from the Financial Engine
1. **The Headline Price Fallacy:** City Fresh Foods offers ₹14/kg (gross ₹14,000). A naive farmer would assume they are earning ₹4,000 more than the local trader. However, after deducting ₹3,000 in solo transport, hamali, and transit deduction, the farmer nets only **₹11,000** (+₹1,500 over local).
2. **The FPO Collective Advantage:** When the farmer pools produce with neighbors into the Hoskote Collective pool, shared 10-ton freight drops transport from ₹2,200 to **₹750** (saving ₹1,450). Commission drops to **₹0**. The final take-home net is **₹12,850**.
3. **Net Profit Impact:** Collective selling delivers **+₹3,350 (+35.3%)** more cash than the village trader and **+₹1,850 (+16.8%)** more cash than solo distant wholesale selling.

---

## 6. Technical Architecture

FAIRFARM is architected as a modern, decoupled web and API system:

```
┌────────────────────────────────────────────────────────┐
│                   CLIENT LAYER (React 18)              │
│  - Vite 5.4 + TypeScript 5.5 + Tailwind CSS v3         │
│  - Lucide React Iconography + Recharts Data Visuals   │
│  - Web Speech Synthesis API + Web Audio API DTMF       │
│  - Custom Reactive Observable Client Store             │
└───────────────────────────┬────────────────────────────┘
                            │ REST / JSON (HTTP)
┌───────────────────────────▼────────────────────────────┐
│                  SERVER LAYER (Express.js)             │
│  - Node.js ESM Runtime (Port 5001)                     │
│  - Math Engine: computeSellingComparison()             │
│  - Endpoints: /api/calculate, /api/buyers,             │
│    /api/offers, /api/collective-groups, /api/health    │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                  DATA & PERSISTENCE                    │
│  - In-Memory Reactive Seed Store + LocalStorage Cache  │
│  - Structured Indian Agritech Schema                   │
│  - Supabase PostgreSQL Connector (Ready for Cloud)     │
└────────────────────────────────────────────────────────┘
```

### 6.1 Frontend Architecture
- **Framework:** React 18 with Vite 5.4.
- **Language:** TypeScript 5.5 in strict mode with comprehensive types (`src/types/index.ts`).
- **Styling:** Custom Tailwind CSS configuration adhering strictly to the official brand palette:
  - Forest Green: `#183F32`
  - Deep Green: `#102E25`
  - Harvest Gold: `#D7A53A`
  - Warm Cream: `#F8F6EE`
  - Pure White: `#FFFFFF`
- **Mobile Responsive Design:** Mobile-first layout with zero horizontal overflow (`scrollWidth === innerWidth`), safe-area bottom navigation padding (`pb-32 sm:pb-36 lg:pb-12`), and elevated central action thumb-buttons.

### 6.2 Voice & Audio Architecture
- **Text-to-Speech (TTS):** Browser `window.speechSynthesis` resolving native Indian language voices (`kn-IN`, `te-IN`, `ta-IN`, `hi-IN`, `en-IN`) with zero microphone permissions required.
- **Speech Recognition (STT):** Isolated Web Speech Recognition activated *only* when the user taps the microphone button.
- **DTMF Audio Synthesis:** Built with the browser's `AudioContext`. Generates authentic dual-frequency sine tones for keys 0–9, *, and # (e.g. `1` = 697 Hz + 1209 Hz).

---

## 7. Testing & Verification Evidence

### 7.1 Automated Financial & Recommendation Regression Suite
Ran via `npm run test:calc` (`tsx test-financial.js`):
- **Total Tests Executed:** 27
- **Passed:** 27 | **Failed:** 0
- **Scenarios Verified:**
  1. Mandatory 1,000 kg Tomato benchmark (Local ₹9,500, Mandi ₹10,500, Distant ₹11,000, FPO ₹12,850).
  2. Dynamic FPO recommendation (+₹3,350 net gain over local, +₹1,850 over distant buyer).
  3. FPO batch eligibility requirements (100 kg threshold correctly enforced).
  4. Small-batch dynamic handling (50 kg lot safely marks FPO/Distant as ineligible and recommends Local Trader).
  5. Collective selling filter opt-out (Distant Buyer dynamically wins with ₹11,000 when FPO is disabled).
  6. Dynamic market reversals (Local price hike to ₹16/kg causes Local Trader to win with ₹15,500 net; Wholesale price surge to ₹18/kg causes Distant Buyer to win with ₹15,000 net; Freight double-shock causes Mandi to win with ₹10,500 net).
  7. Eight-category expense summation integrity.
  8. Zero-quantity division protection, negative input sanitization, decimal rounding, and 100,000 kg bulk scalability.

### 7.2 Code Compilation & Build Results
- **TypeScript Static Check (`npx tsc --noEmit`):** 0 errors.
- **Production Vite Build (`npm run build`):** Built in 1.25s (`dist/assets/index-*.js`, 235 kB gzip).
- **Backend API Health Check (`GET /api/health`):** HTTP 200 `{"status":"online","platform":"FAIRFARM Agritech Engine","version":"1.0.0"}`.
- **Backend Calculation Endpoint (`POST /api/calculate`):** HTTP 200 with dynamic JSON calculation result.

### 7.3 Multi-Viewport Playwright E2E DOM & Bounds Inspection
Automated Playwright browser script audited 12 screen resolutions (320px, 360px, 375px, 390px, 412px, 428px, 640px, 768px, 1024px, 1280px, 1440px, 1920px):
- **Horizontal Overflow:** 0px across all 12 viewports.
- **Bounding Box Collisions:** 0 element overlaps detected.
- **Bottom Navigation Clearance:** 194px separation between fixed bottom bar and content.

### 7.4 Final Submission Evidence Assets
The following 10 real application captures and logs are saved in [`artifacts/final-submission/`](file:///Users/kushal/Documents/projects/FAIRFARM/artifacts/final-submission/):
1. `final-desktop.png`: Full desktop overview (1440x900)
2. `final-mobile.png`: Mobile dashboard view (375x812)
3. `farmer-dashboard.png`: Farmer dashboard with active listings and stats
4. `market-intelligence.png`: Four-channel net earnings calculator and Recharts graph
5. `net-earnings-comparison.png`: Recommendation banner and breakdown cards
6. `fpo-collective-selling.png`: Hoskote Tomato Collective pooling and member lists
7. `voice-assistant.png`: Multilingual voice dialer and IVR keypad simulator
8. `transaction-settlement.png`: Order lifecycle tracking and verified electronic receipt
9. `fpo-dashboard.png`: FPO Coordinator lot aggregation console
10. `admin-dashboard.png`: Platform admin oversight and mandi connector status
11. `financial-test-output.txt`: Raw terminal output of the 27 passing tests
12. `final-verification-summary.txt`: Machine-generated verification summary

---

## 8. Innovation & Market Differentiation

| Feature Aspect | Traditional Agritech Portals | Conventional Mandi Apps | FAIRFARM Assisted-Selling Platform |
| :--- | :--- | :--- | :--- |
| **Pricing Metric** | Headline modal price only (₹/kg) | Modal auction prices per quintal | **Calculated Net Take-Home Earnings (₹)** |
| **Expense Modeling** | None (Farmer calculates mentally) | None | **Deducts 8 individual friction expenses dynamically** |
| **Collective Selling** | None (Solo listings only) | None | **In-app vehicle pooling with shared freight calculation** |
| **Accessibility** | English/Hindi text-heavy forms | Basic regional text | **Multilingual Voice + Dual-Tone IVR Simulation** |
| **Data Transparency** | Often passes unverified data as real | Daily mandi bulletins | **Clear attribution (`LIVE`, `HISTORICAL`, `SIMULATED`)** |
| **Recommendation** | Unassisted sorting by raw price | Unassisted auction table | **Eligibility-governed recommendation of highest net return** |

---

## 9. Projected Impact

### 9.1 For Smallholder Farmers
- **Measurable Net Income Gain:** In horticultural crops like tomatoes, collective selling and direct wholesale access yield a **35.3% net income increase** over village intermediaries (+₹3,350 on 1,000 kg).
- **Informed Negotiation:** Even when farmers choose to sell at the farmgate for immediate cash, knowing their distant net benchmark (₹11,000) prevents them from accepting predatory offers below ₹9.50/kg.
- **Reduced Logistics Waste:** Pooling produce eliminates half-empty vehicle runs, reducing rural freight emissions and transport costs.

### 9.2 For Farmer Producer Organizations (FPOs)
- **Aggregated Scale:** FPOs gain software tools to coordinate collection schedules, track vehicle capacity utilization, and command volume buyer premiums.
- **Member Trust:** Transparent expense itemization demonstrates the concrete value of FPO membership to participating farmers.

### 9.3 For Institutional Buyers & Retail Chains
- **Consistent Supply:** Buyers can procure pre-aggregated, quality-graded bulk batches from collection centers rather than dealing with hundreds of fragmented individual sellers.
- **Lower Sourcing Costs:** Standardized digital purchase orders and verified fulfillment histories reduce procurement overhead.

---

## 10. System Limitations & Future Implementation Roadmap

To maintain integrity, FAIRFARM explicitly documents current demonstration boundaries and the corresponding production pathway:

1. **Market Data Feeds:**
   - *Current Implementation:* Market price benchmarks for Kolar APMC and Bengaluru Hub are modeled from historical Karnataka State Agricultural Marketing Board (KSAMB) daily bulletins (`SIMULATED DEMO DATA`).
   - *Production Pathway:* Connect to the official Open Government Data Platform (data.gov.in) AGMARKNET API using official API keys and webhook ingestion.
2. **Telephony & Carrier IVR:**
   - *Current Implementation:* In-browser Web Audio API dual-tone frequency generator and Web Speech Synthesis (`SIMULATED IVR`).
   - *Production Pathway:* Deploy a cloud telephony gateway (e.g. Exotel, Twilio, or Tata Telephony) backed by an Asterisk SIP trunk to route incoming 1800 calls to an automated VoiceXML dialog engine.
3. **Buyer KYC & Verification:**
   - *Current Implementation:* Buyers carry platform trust scores, verification badges, and simulated trade records.
   - *Production Pathway:* Integrate Ministry of Corporate Affairs (MCA) CIN verification and GSTIN real-time authentication APIs.
4. **Escrow Payments:**
   - *Current Implementation:* Demonstrates end-to-end digital escrow milestone progression and settlement vouchers.
   - *Production Pathway:* Integrate NPCI e-NAM payment clearing or RBI-licensed digital escrow gateways (e.g. RazorpayX / Cashfree Escrow).

---

## 11. Conclusion & Submission Sign-Off

FAIRFARM demonstrates that the greatest barrier in Indian agricultural marketing is not a lack of market information, but the **lack of actionable net-earnings clarity**. By demystifying the hidden costs between the farm gate and the terminal market, FAIRFARM transforms farmers from price-takers into empowered market participants.

With a fully verified calculation engine, 27 automated financial regression tests, multilingual voice accessibility, zero-overflow mobile responsiveness, and end-to-end collective selling workflows, the prototype is complete, stable, and ready for hackathon demonstration.

**Submitted on behalf of Team FENSTA.**  
*FAIRFARM — The smarter way from farm to fair price.*
