# Broken Horizon — Transport Division Implementation Report

**Target Route:** `https://broken-horizon.web.app/garage`  
**Internal Identity:** `BROKEN HORIZON TRANSPORT DIVISION // BROKEN HORIZON TRANSPORT SYSTEMS`  
**Date:** September 26, 2026  
**Status:** IMPLEMENTED & DEPLOYED  

---

## 1. Executive Summary
The former single-vehicle "Mehta Garage Tuning Lab" at `/garage` has been completely removed and replaced by the **Broken Horizon Transport Division**: an in-universe catalog of original, fictional Indian vehicles engineered specifically for the roads, deserts, cities, mountains, and highways of Rajasthan in Broken Horizon.

---

## 2. Core Metrics
- **Categories:** 12 Transport Divisions (01 City Cars, 02 SUV & Crossover, 03 Motorcycles, 04 Scooters, 05 Auto-Rickshaws, 06 Buses, 07 Trucks & Heavy Transport, 08 Pickups & Utility, 09 Police & Security, 10 Emergency, 11 Off-Road & Desert, 12 Rail / Special Transport)
- **Vehicles:** 60 Unique Original Fictional Vehicles (5 per category)
- **Unique Vehicle Images:** 60 Unique Image Assets located in `public/assets/images/transport/`
- **Fictional Manufacturers:** 7 Registered In-Universe Brands
  1. `ARAVALLI MOTORS` (Jaipur Industrial Corridor RJ-14)
  2. `BHARAT ROADWORKS` (Kota Freight Works RJ-20)
  3. `RAJPUTANA MOBILITY` (Jodhpur Engineering Yards RJ-19)
  4. `THAR VEHICLE SYSTEMS` (Jaisalmer Outpost RJ-15)
  5. `MEHTA COMMERCIAL VEHICLES` (Jaipur Bypass RJ-14)
  6. `HORIZON AUTOMOTIVE` (Meridian Tech District, Udaipur RJ-27)
  7. `DESERTLINE INDUSTRIES` (Barmer Refinery Sector RJ-04)

---

## 3. Verification Matrix
| Verification Item | Status | Details |
|---|---|---|
| Old Garage Removed | **PASS** | `GarageExplorer` imports and single-car repair sliders removed from routing |
| Transport Page Displayed | **PASS** | Renders "TRANSPORT BUILT FOR THE HORIZON" and full fleet ecosystem |
| Minimum 5 Vehicles / Category | **PASS** | Exactly 60 vehicles across 12 categories |
| Unique Vehicle IDs | **PASS** | 60 distinct identifiers |
| Unique Image Paths | **PASS** | 60 dedicated `.jpg` assets in `public/assets/images/transport/` |
| No Broken Images | **PASS** | Verified 100% on disk |
| Fictional Branding (No Real Logos) | **PASS** | Zero real-world trademarked automobile names |
| Manufacturer Showcase | **PASS** | "THE MAKERS" company cards with interactive brand filtering |
| Interactive Filters | **PASS** | Category tabs, Manufacturer dropdown, and Status dropdown active |
| Search Functionality | **PASS** | Real-time text search indexing model, brand, role, environment, and description |
| Vehicle Detail Modal | **PASS** | Displays gameplay role, environment, and concept specifications |
| Full-Screen Lightbox | **PASS** | Next (→), Previous (←), Close (ESC) and keyboard listener active |
| Vehicle Comparator | **PASS** | Up to 3 vehicles compared side-by-side in floating dock drawer |
| Automated Acceptance Test | **PASS** | 18/18 tests passed (`tests/BH_TransportDivisionAcceptanceTest.py`) |
| Production Build | **PASS** | `npm run build` compiled with zero errors (Vite + TypeScript) |
| Firebase Deployment | **PASS** | Deployed to production hosting at `https://broken-horizon.web.app` |
| Live Verification | **PASS** | `/garage` loads Transport Division with full interactive stack |

---

## 4. Vehicle Breakdown by Category

### 01 // CITY CARS
- **Aravalli M1** (Aravalli Motors) — Compact urban hatchback (Jaipur Old City & Johari Bazaar) [IMPLEMENTED]
- **Horizon C2** (Horizon Automotive) — Premium compact sedan (Jaipur Tech Corridor & Civil Lines) [ACTIVE DEVELOPMENT]
- **Rajputana Aura** (Rajputana Mobility) — Compact family sedan (Ajmer Expressway & Kishangarh) [ACTIVE DEVELOPMENT]
- **Mehta Urban 5** (Mehta Commercial) — Practical family hatchback (Jaipur Bypass & Sikar Road) [IMPLEMENTED]
- **Bharat Eon** (Bharat Roadworks) — Compact economy vehicle (Kota Industrial Ring & Station Road) [WORLD CONCEPT]

### 02 // SUV & CROSSOVER
- **Aravalli X7** (Aravalli Motors) — Large 7-seater family SUV (NH-48 Jaipur-Udaipur Expressway) [IMPLEMENTED]
- **Tharon X4** (Thar Vehicle Systems) — Mid-size rugged crossover (Barmer & Jaisalmer Outskirts) [ACTIVE DEVELOPMENT]
- **Horizon Terrain** (Horizon Automotive) — Urban adventure surveillance crossover (Udaipur Lake Periphery) [ACTIVE DEVELOPMENT]
- **Rajputana R6** (Rajputana Mobility) — Premium long-distance flagship SUV (Jaipur Secretariat) [WORLD CONCEPT]
- **Desertline V5** (Desertline Industries) — Mining escort & roadblock rammer (Rajsamand Marble Belt) [WORLD CONCEPT]

### 03 // MOTORCYCLES
- **Aravalli 160** (Aravalli Motors) — Street pursuit naked motorcycle (Kota Education City) [ACTIVE DEVELOPMENT]
- **Rajputana 250** (Rajputana Mobility) — Cast-iron thumper roadster (Jodhpur Blue City) [IMPLEMENTED]
- **Horizon XR** (Horizon Automotive) — Dual-sport adventure enduro (Aravalli Switchbacks) [ACTIVE DEVELOPMENT]
- **Desertline 400** (Desertline Industries) — Twin-cylinder desert highway tourer (Pokhran & Jaisalmer) [WORLD CONCEPT]
- **Bharat Street 125** (Bharat Roadworks) — Everyday 80 km/l commuter motorcycle (Statewide) [IMPLEMENTED]

### 04 // SCOOTERS
- **Aravalli City 110** (Aravalli Motors) — Agile urban alley scooter (Bundi Lanes & Alwar Old City) [IMPLEMENTED]
- **Horizon E-Scoot** (Horizon Automotive) — Connected smart electric scooter (Jaipur Mansarovar) [ACTIVE DEVELOPMENT]
- **Rajputana Family Scoot** (Rajputana Mobility) — Heavy metal-body retro family scooter (Sawai Madhopur) [WORLD CONCEPT]
- **Bharat Commute** (Bharat Roadworks) — Commercial utility fleet scooter (Pali Industrial Town) [ACTIVE DEVELOPMENT]
- **Mehta Urban Scoot** (Mehta Commercial) — Custom-tuned workshop parts runner (Jaipur Bypass Bays) [IMPLEMENTED]

### 05 // AUTO-RICKSHAWS
- **Aravalli Auto A1** (Aravalli Motors) — Narrow-chassis city passenger auto (Jaipur Badi Chaupar) [IMPLEMENTED]
- **Horizon Cargo Auto** (Horizon Automotive) — Enclosed lockable cargo three-wheeler (Jaipur Container Depot) [ACTIVE DEVELOPMENT]
- **Rajputana Passenger Auto** (Rajputana Mobility) — Heavy-frame rural 6-seater tempo (Dausa-Lalsot Rural Link) [WORLD CONCEPT]
- **Bharat Electric Auto** (Bharat Roadworks) — Silent battery-swap lakefront feeder (Udaipur Lakefront) [ACTIVE DEVELOPMENT]
- **Desertline Long-Range Auto** (Desertline Industries) — High-clearance highway regional tempo (Pali-Jodhpur Edge) [WORLD CONCEPT]

### 06 // BUSES
- **Jaipur Cityline** (Aravalli Motors) — Low-floor urban transit bus (Jaipur Ajmeri Gate) [IMPLEMENTED]
- **Rajasthan Express** (Bharat Roadworks) — Intercity state highway coach (NH-48 Jaipur to Udaipur) [ACTIVE DEVELOPMENT]
- **Horizon Metrobus** (Horizon Automotive) — Modern corridor rapid transit bus (Jaipur Elevated Corridor) [WORLD CONCEPT]
- **Desertline Coach** (Desertline Industries) — Multi-axle overnight sleeper coach (Jaipur-Jaisalmer Line) [ACTIVE DEVELOPMENT]
- **Bharat Transit** (Bharat Roadworks) — Rugged steel-roof rural stage carriage (Barmer-Pali Rural) [WORLD CONCEPT]

### 07 // TRUCKS & HEAVY TRANSPORT
- **Bharat Hauler 28** (Bharat Roadworks) — 10-wheel heavy national permit truck (NH-48 Central Freight) [IMPLEMENTED]
- **Aravalli 6x4** (Aravalli Motors) — Heavy open-cast quarry dump truck (Rajsamand Granite Mines) [ACTIVE DEVELOPMENT]
- **Horizon Freighter** (Horizon Automotive) — 40ft sealed container tractor-trailer (Jaipur Container Depot) [ACTIVE DEVELOPMENT]
- **Desertline Tanker** (Desertline Industries) — 24KL petroleum fuel tanker (Barmer Refinery Corridor) [WORLD CONCEPT]
- **Rajputana Tipper** (Rajputana Mobility) — Hydraulic heavy rock dumper (Aravalli Road Construction) [WORLD CONCEPT]

### 08 // PICKUPS & UTILITY
- **Aravalli Workhorse** (Aravalli Motors) — Single-cab flatbed utility pickup (Dausa Mandi & Sikar) [IMPLEMENTED]
- **Horizon Farmer** (Horizon Automotive) — All-terrain agricultural carrier (Chambal Basin Farmlands) [ACTIVE DEVELOPMENT]
- **Rajputana Cargo** (Rajputana Mobility) — Double-cab utility vehicle (Pali Textile Workshops) [ACTIVE DEVELOPMENT]
- **Desertline Pickup** (Desertline Industries) — Desert-spec 4x4 with auxiliary bladders (Barmer Pipeline Road) [WORLD CONCEPT]
- **Bharat Service 4x4** (Bharat Roadworks) — Mobile emergency repair breakdown tender (NH-48 Laybys) [WORLD CONCEPT]

### 09 // POLICE & SECURITY
- **Jaipur Patrol SUV** (Aravalli Motors) — Urban law enforcement patrol unit (Jaipur Police Commissionerate) [IMPLEMENTED]
- **Highway Interceptor** (Horizon Automotive) — High-speed expressway pursuit sedan (NH-48 Toll Corridor) [ACTIVE DEVELOPMENT]
- **Police Motorcycle** (Rajputana Mobility) — Traffic enforcement & VIP escort cruiser (Jaipur Secretariat) [ACTIVE DEVELOPMENT]
- **Security Pickup** (Desertline Industries) — Armed perimeter patrol 4WD with cage (Horizon Compounds) [WORLD CONCEPT]
- **Armored Transport Van** (Bharat Roadworks) — Ballistic tactical squad & cash carrier (State Treasury Routes) [WORLD CONCEPT]

### 10 // EMERGENCY
- **Ambulance Van** (Bharat Roadworks) — Type-B emergency patient transport van (SMS Hospital, Jaipur) [IMPLEMENTED]
- **Advanced Medical SUV** (Aravalli Motors) — Rapid-response critical care 4x4 (Desert Health Centers, Barmer) [ACTIVE DEVELOPMENT]
- **Fire Rescue Truck** (Bharat Roadworks) — Municipal water & foam fire bowser (Jaipur Fire Station) [ACTIVE DEVELOPMENT]
- **Highway Rescue Pickup** (Mehta Commercial) — Accident extraction & towing unit (Aravalli Switchbacks) [WORLD CONCEPT]
- **Emergency Motorcycle** (Rajputana Mobility) — First-responder medical motorbike (Jaipur Walled City) [WORLD CONCEPT]

### 11 // OFF-ROAD & DESERT
- **Thar Rider 4x4** (Thar Vehicle Systems) — Soft-top desert dune climbing 4x4 (Sam Sand Dunes, Jaisalmer) [IMPLEMENTED]
- **Dune Runner** (Thar Vehicle Systems) — Tubular chromoly sand-rail buggy (Khaba Fort Desert Flats) [ACTIVE DEVELOPMENT]
- **Desert Scout** (Mehta Commercial) — Overland long-range expedition rig (Thar Deep Frontier) [ACTIVE DEVELOPMENT]
- **Aravalli Trail 4x4** (Aravalli Motors) — Solid live-axle mountain rock crawler (Kumbhalgarh Slopes) [WORLD CONCEPT]
- **Horizon Expedition** (Horizon Automotive) — Heavy 6x6 exploration laboratory (Unsurveyed Desert Tracts) [WORLD CONCEPT]

### 12 // RAIL / SPECIAL TRANSPORT (WORLD TRANSPORT CONCEPT)
- **Regional Passenger Train** (Bharat Roadworks) — Electric multiple unit trainset (NWR Electric Main Line) [WORLD CONCEPT]
- **Freight Locomotive** (Bharat Roadworks) — 12,000 HP twin-section electric hauler (Freight Corridor) [WORLD CONCEPT]
- **Maintenance Rail Vehicle** (Aravalli Motors) — Overhead equipment inspection tower car (Kota Marshalling Yard) [WORLD CONCEPT]
- **Rail Inspection Vehicle** (Rajputana Mobility) — Remote diesel track inspection trolley (Jaisalmer Branch Rail) [WORLD CONCEPT]
- **Special Transport Unit** (Desertline Industries) — 96-wheel modular hydraulic platform (Bhadla Solar Park) [WORLD CONCEPT]

---

## 5. Known Limitations
- Categories marked as **WORLD CONCEPT** (such as Rail and Heavy Specialized Units) represent in-universe world lore and transport infrastructure, not directly drivable player vehicles in the current Prologue release build.
- All technical specifications are strictly labeled **CONCEPT SPECIFICATION** for worldbuilding consistency.
