import json
import re
import os

raw_data = """
### SECTION A: CARS — LOW / ECONOMY (12 Vehicles)
1. **Surya-Maru 800 Classic** | Ref: Maruti 800 | 115 km/h | Jaipur Old City | Low-profile alley getaway car.
2. **Surya-Maru Altiro LX** | Ref: Alto K10 | 125 km/h | Dausa / Sikar | Everyday rural commuter hatchback.
3. **Tara Nano-Pod CX** | Ref: Tata Nano | 105 km/h | Jaipur Markets | Ultra-compact bazaar infiltrator.
4. **Surya-Maru Wagon-Box CNG** | Ref: WagonR Taxi | 130 km/h | Ajmer / Kota | Fleet cab with roof luggage rack; perfect social disguise.
5. **Tara Indica-Vista Diesel** | Ref: Tata Indica | 135 km/h | Jaipur Ring Road | High-mileage diesel highway hatchback.
6. **Surya-Maru Eeco-Van Cargo** | Ref: Maruti Eeco | 120 km/h | Pali / Kota | Sliding-door micro-van used for covert equipment drops.
7. **Mahendra Jeeto-Pax Mini** | Ref: Mahindra Supro | 110 km/h | Bundi | Rural shared passenger van.
8. **Surya-Maru Swift-Desire Tour** | Ref: Dzire Tour Yellow-Plate | 145 km/h | Jaipur Airport | Commercial yellow-plate sedan that blends into airport queues.
9. **Tara Tiago-NRG Cross** | Ref: Tata Tiago NRG | 142 km/h | Sawai Madhopur | Raised-suspension budget hatch for rough village tracks.
10. **Hindustan Monarch Classic** | Ref: HM Ambassador | 118 km/h | Jaipur Collectorate | Vintage steel-bodied bureaucratic sedan with high ramming mass.
11. **Premier Padmini-Cab Retro** | Ref: Premier Padmini | 112 km/h | Bundi Old Town | Classic narrow-lane mechanical relic kept by veteran mechanics.
12. **Surya-Maru Omni-Shadow** | Ref: Maruti Omni | 116 km/h | Kota Industrial | Infamous utility van with zero electronics to trace.

### SECTION B: CARS — MEDIUM / SEDANS & COMPACT SUVs (12 Vehicles)
13. **Mahendra Bolera Rugged** | Ref: Mahindra Bolero | 140 km/h | Dausa / Barmer | Leaf-spring rural workhorse built to survive unpaved craters.
14. **Mahendra Scorpina S11** | Ref: Mahindra Scorpio Classic | 165 km/h | Jaipur / Jodhpur | High-stance muscle SUV favored by local fixers and politicians.
15. **Tara Nexa-EV Dark** | Ref: Tata Nexon EV | 160 km/h | Jaipur New City | Silent electric compact SUV ideal for night surveillance tails.
16. **Surya-Maru Brezza-Urban** | Ref: Vitara Brezza | 158 km/h | Kota / Ajmer | Reliable mid-size city crossover.
17. **Tara Harrier-Kryotec** | Ref: Tata Harrier | 180 km/h | Udaipur / Jaipur | Wide-body highway cruiser with heavy front bash-plate.
18. **Mahendra XUV-500 Cheetah** | Ref: XUV500 | 178 km/h | Jodhpur | Seven-seater highway pursuit crossover.
19. **Surya-Maru Ciaz-Executive** | Ref: Maruti Ciaz | 170 km/h | Jaipur Secretariat | Mid-tier civil-service sedan with tinted rear glass.
20. **Bharat-Verna Turbo** | Ref: Hyundai Verna | 190 km/h | Jaipur Ring Road | Tuned street-sprint sedan used in Drivers' League night runs.
21. **Kaveri Creta-Knight** | Ref: Hyundai Creta | 175 km/h | Udaipur / Kota | Blacked-out urban SUV with panoramic roof camera mount.
22. **Mahendra TUV-Battlebox** | Ref: TUV300 | 148 km/h | Rajsamand Quarries | Boxy ladder-frame sub-4m tank.
23. **Tara Sumo-Victa Spacio** | Ref: Tata Sumo | 138 km/h | Sikar / Dausa | Ten-seat inter-village transport mule.
24. **Surya-Maru Gypsy-King 4WD** | Ref: Maruti Gypsy | 145 km/h | Sawai Madhopur / Jaisalmer | Lightweight soft-top 4x4 capable of climbing rocky ridges.

### SECTION C: CARS — LUXURY, OFF-ROAD 4X4 & CORPORATE FLEET (10 Vehicles)
25. **Mahendra Thar-Roxx 4x4 (Arjun Signature)** | Ref: Mahindra Thar | 168 km/h | All Districts | Custom lift-kit, snorkel, winch, and reinforced roll-cage.
26. **Tara Safari-Storme VIP** | Ref: Tata Safari | 185 km/h | Jaipur / Udaipur | Flagship SUV with strobe-light grille slots.
27. **Mahendra Scorpina-N Carbon** | Ref: Scorpio-N | 188 km/h | Jodhpur / Barmer | Body-on-frame 4x4 used by Horizon Cell squad leaders.
28. **Toyo Fortuner-Legender ("Politician Spec")** | Ref: Toyota Fortuner | 195 km/h | All Highways | Pearl-white flagship SUV that intimidates toll-booth staff automatically.
29. **Mahendra XUV-700 Adreno** | Ref: XUV700 | 200 km/h | Jaipur-Udaipur NH | High-speed AWD cruiser with radar dash-HUD.
30. **Vardhan Meridian Sentinel V8 (Khandelwal Spec)** | Ref: Armored Land Cruiser | 190 km/h | Horizon Facilities | Bullet-resistant B6 glass, run-flat tires, and encrypted radio array.
31. **JLR Prithvi-Rover Autobiography** | Ref: Range Rover | 225 km/h | Udaipur Luxury Hotels | Vikram Vardhan's executive convoy flagship.
32. **Mercer-Bharath S-Guard Limo** | Ref: S-Class Maybach | 230 km/h | Jaipur Airport VIP | Ultra-luxury corporate sedan for boardroom social stealth missions.
33. **Bavaria M5-Thar Edition** | Ref: BMW M5 | 265 km/h | Jaipur Ring Road | Imported super-sedan unlocked via Drivers' League finale.
34. **Gurkha-Force Extreme 4x4x4** | Ref: Force Gurkha | 150 km/h | Jaisalmer Deep Dunes | Factory differential locks and roof rack for deep-desert survival.

### SECTION D: BIKES, CRUISERS & SCOOTERS (14 Vehicles)
35. **Rajputana Classic-350 Cast-Iron** | Ref: Royal Enfield Classic 350 | 120 km/h | All Districts | Heavy thumping cruiser; stable on gravel and sand edges.
36. **Rajputana Bullet-Standard 500** | Ref: RE Bullet 500 | 130 km/h | Jodhpur / Bundi | High-torque vintage iron frame.
37. **Rajputana Himadri-450 Rally** | Ref: RE Himalayan | 145 km/h | Udaipur Hills / Barmer | Long-travel adventure bike built for rocky ridge trails (Kavya favorite).
38. **Rajputana Continental-GT Cafe** | Ref: RE Continental GT 650 | 170 km/h | Jaipur Night Sprint | Twin-cylinder cafe racer.
39. **Shakti Splendor-Plus Commuter** | Ref: Hero Splendor | 95 km/h | Every Village & City | 80 km/l fuel economy; blends into any crowd instantly.
40. **Chetak-Bajra Pulsar-220F Fairing** | Ref: Bajaj Pulsar 220F | 144 km/h | Kota / Jaipur | Street-fighter motorcycle favored by night couriers.
41. **Kaveri Apache-RTR Track** | Ref: TVS Apache RTR | 150 km/h | Ajmer / Kota | Agile urban pursuit motorcycle.
42. **Duke-Bharat 390 Street** | Ref: KTM Duke 390 | 168 km/h | Jaipur University | High-revving hooligan bike for rooftop/stairway escapes.
43. **Yama-RX100 Two-Stroke Legend** | Ref: Yamaha RX100 | 115 km/h | Old Jaipur Market | Featherweight 2-stroke pocket rocket for bazaar foot-chase routes.
44. **Shakti Activa-125 MetalBody (Kavya Prologue)** | Ref: Honda Activa | 90 km/h | Udaipur / Jaipur | Quiet automatic scooter with under-seat camera bag storage.
45. **Chetak-Electric Neo** | Ref: Bajaj Chetak EV | 85 km/h | Udaipur Old City | Retro-styled silent electric scooter for zero-noise stealth tails.
46. **Oli-S1 Pro Hyper-Scoot** | Ref: Ola S1 Pro | 115 km/h | Jaipur Tech Park | High-acceleration digital electric scooter.
47. **Shakti X-Pulse 200 Dirt** | Ref: Hero XPulse 200 | 128 km/h | Rajsamand Quarries | Lightweight dual-sport scrambler.
48. **Jawa-Yezdi Roadking Twin** | Ref: Yezdi Roadking | 132 km/h | Pali / Jodhpur | Classic twin-exhaust highway motorcycle.

### SECTION E: 3-WHEELERS & LOCAL TRANSIT (6 Vehicles)
49. **Chetak-Bajra RE-Auto (Jaipur Green/Yellow)** | Ref: Bajaj RE Auto | 65 km/h | Jaipur / Kota | Can U-turn in 2.8 meters; ultimate crowded market getaway vehicle.
50. **Tirupati E-Rickshaw ("Toto")** | Ref: Indian E-Rickshaw | 35 km/h | Bundi / Ajmer Lanes | Silent battery rickshaw for narrow heritage alleys.
51. **Vikram-Diesel Tempo ("Bada Auto")** | Ref: Vikram 3-Wheeler | 58 km/h | Dausa / Sikar | Shared 8-passenger rural diesel three-wheeler.
52. **Piaggio-Ape Cargo 3W** | Ref: Ape Xtra LDX | 55 km/h | Pali Textile Market | Three-wheeled flatbed for smuggling server crates through bazaars.
53. **Jugaad Rural Farm-Cart** | Ref: Rajasthani Diesel Pump Cart | 45 km/h | Rural Dausa / Barmer | Improvised water-pump engine bolted to a wooden flatbed.
54. **Force-Trax Toofan 12-Seater** | Ref: Force Trax Cruiser | 115 km/h | Inter-Village Routes | Long-wheelbase rural people-mover.

### SECTION F: TRUCKS, COMMERCIAL & HEAVY FREIGHT (12 Vehicles)
55. **Tara Ace "Chota Hathi" Mini-Truck** | Ref: Tata Ace | 80 km/h | Jaipur Markets | Small last-mile delivery truck.
56. **Mahendra Bolera Pik-Up 4WD** | Ref: Mahindra Bolero Pik-Up | 120 km/h | Dausa / Mandi | Overloaded flatbed pickup with wooden side-rails.
57. **Tara 1613 LPT Cargo (Arjun Prologue Truck)** | Ref: Tata LPT 1613 | 98 km/h | Jaipur Industrial Yard | 6-wheel medium freight truck from Mission 1 (*The Last Delivery*).
58. **Ashoka Viking 12-Wheel Hauler ("Horn Please")** | Ref: Ashok Leyland 3118 | 92 km/h | NH-48 / Kota | Decorated wooden-cabin national permit truck.
59. **Tara Signa 4923 Container Rig** | Ref: Tata Signa 4923.S | 95 km/h | Inland Container Depots | 40-foot sealed Horizon Meridian container tractor-trailer.
60. **Eklavya Pro-3015 Cold-Chain** | Ref: Eicher Pro 3015 | 100 km/h | Pali / Ajmer | Refrigerated box truck used as a decoy server carrier.
61. **BharatBenz 3528C Quarry Tipper** | Ref: BharatBenz Dumper | 85 km/h | Rajsamand Marble Quarries | Heavy hydraulic rock-dump truck capable of crushing roadblocks.
62. **Ashoka Petro-Tanker 24KL** | Ref: Indian Oil/HP Fuel Tanker | 88 km/h | Barmer Refinery Route | Volatile fuel carrier used in Chapter 7 pipeline missions.
63. **Mehta Garage Heavy Wrecker (Arjun Tow Rig)** | Ref: Tata 1212 Recovery | 94 km/h | Mehta Garage | Hydraulic crane and wheel-lift for vehicle recovery side missions.
64. **Sonalika-Swaraj 855 Farm Tractor** | Ref: Swaraj 855 FE | 42 km/h | Sikar / Dausa Farms | High-torque agricultural tractor with trolley hitch.
65. **JCB-Bharat 3DX Backhoe Loader** | Ref: JCB 3DX | 38 km/h | Horizon Construction Sites | Armored front bucket used in *Sandline* blockade missions.
66. **Vardhan Mobile Command Rig (Chapter 9 Boss)** | Ref: Armored 8x8 Server Truck | 110 km/h | Jaisalmer Highway | Rolling EMP-shielded data vault from Mission 117 (*Command Vehicle*).

### SECTION G: BUSES & INTERCITY COACHES (6 Vehicles)
67. **RSRTC "Rajasthan Roadways" Express** | Ref: State Transport Bus | 95 km/h | All District Terminals | Blue-and-white state bus that stops at every rural stand.
68. **JCTSL Jaipur Low-Floor City Bus** | Ref: Tata Marcopolo City Bus | 85 km/h | Jaipur Urban Routes | Wide-door city transit bus.
69. **Mewar Travels Multi-Axle Sleeper ("Night Bus")** | Ref: Volvo B11R Sleeper | 125 km/h | Udaipur–Jaipur Highway | Featured in Mission 6 (*Night Bus*) & Mission 20 (*The Last Bus*).
70. **Ashoka Yellow School Bus** | Ref: Ashok Leyland Sunshine | 80 km/h | Sikar / Jaipur | Creates dynamic morning/afternoon traffic spikes.
71. **Force Traveller-26 Tourist Minibus** | Ref: Tempo Traveller | 110 km/h | Ajmer / Pushkar / Udaipur | Hotel shuttle and wedding-guest transport van.
72. **Desert-Star Rural Roof-Rider Bus** | Ref: Private Rural Stage Carriage | 88 km/h | Barmer / Jaisalmer | Packed desert route bus carrying cargo on the roof rack.

### SECTION H: POLICE, EMERGENCY & SECURITY FLEET (6 Vehicles)
73. **Rajasthan Police Highway Interceptor** | Ref: Scorpio Police PCR | 175 km/h | Highway Checkpoints | Equipped with ANPR license-plate scanner and roof siren bar.
74. **Jaipur City PCR Bolera Patrol** | Ref: Bolero Police Van | 140 km/h | Urban Stations | Standard district patrol response unit.
75. **Inspector Aditi Chauhan’s Unmarked Sedan** | Ref: Unmarked Ciaz/Verna | 185 km/h | Jaipur Crime Branch | Dash-strobe detective car with police radio scanner.
76. **State Armed Force Riot Vajra Van** | Ref: Tata Armored Troop Carrier | 95 km/h | High-Heat Lockdowns | Deployed when District Heat exceeds 80%.
77. **108 Sanjeevani Emergency Ambulance** | Ref: Force Traveller Ambulance | 120 km/h | District Hospitals | Grants hospital access and bypasses toll gates with sirens active.
78. **Jaipur Municipal Fire Tender** | Ref: Tata 1615 Water Bowser | 90 km/h | Fire Stations | Responds during Mission 7 (*The Garage Fire*) and warehouse arsons.

### SECTION I: TRAINS & RAILWAYS (5 Vehicles)
79. **Vande-Marwar Semi-High-Speed Express** | Ref: Vande Bharat Express | 160 km/h | Jaipur–Ajmer–Udaipur Line | Aerodynamic white-and-orange electric chair-car trainset.
80. **WAG-12B Heavy Twin-Section Freight** | Ref: Indian Railways WAG-12 | 120 km/h | Kota–Pali Freight Corridor | 12,000 HP electric locomotive hauling 90 double-stack containers.
81. **WDP-4D "Thar Link" Diesel Locomotive** | Ref: EMD WDP-4D | 130 km/h | Jodhpur–Jaisalmer Desert Rail | Dual-cab diesel hauler crossing desert tracks.
82. **Palace-on-Dunes Heritage Luxury Train** | Ref: Palace on Wheels | 110 km/h | Sawai Madhopur / Udaipur | Mobile social-stealth environment for elite investor missions.
83. **Plasser Track-Maintenance Tower Car** | Ref: OHE Inspection Car | 75 km/h | Kota Rail Yard | Drivable yellow rail-yard inspection vehicle used in *The Freight Switch*.

### SECTION J: METRO, AVIATION, WATER & ROPEWAY (9 Vehicles)
84. **PinkCity Metro 4-Car Stainless Trainset** | Ref: Jaipur Metro BEML | 80 km/h | Jaipur Elevated/Underground | Playable transit & evacuation interior in Chapter 1–2.
85. **PinkCity Metro Night Maintenance Shunter** | Ref: Metro Tunnel Locomotive | 50 km/h | Jaipur Metro Depot | Used to infiltrate underground server conduits after hours.
86. **East-Meridian Airport Express Monorail** | Ref: International Act Transit | 100 km/h | International Expansion | High-speed terminal link train.
87. **IndusAir A320neo Domestic Jet** | Ref: IndiGo / Air India A320 | 840 km/h | Jaipur International Airport | Apron & cargo-bay infiltration environment.
88. **Deccan-Freighter 747-8F Cargo Plane** | Ref: International Cargo Jet | 890 km/h | Airport Cargo Terminal | Featured in *The Cargo Plane* mission carrying offshore servers.
89. **Vardhan Meridian Bell-429 Corporate Chopper** | Ref: Twin-Engine VIP Helicopter | 275 km/h | Udaipur Helipads / Jaisalmer | Used by Vikram Vardhan and Khandelwal for rapid extraction.
90. **Pichola Electric Solar Ferry** | Ref: Udaipur Lake Boat | 32 km/h | Lake Pichola / Fateh Sagar | Silent night boat used in Mission 60 (*The Lake Ledger*).
91. **Chambal Rescue & Patrol Speedboat** | Ref: Inflatable Rigid Hull Boat | 75 km/h | Kota River / Rajsamand Dam | High-speed water pursuit craft.
92. **Aravalli Fort Aerial Ropeway Cabin** | Ref: Doppelmayr Gondola | 22 km/h | Bundi / Hilltop Fort | Suspended cable-car used for vertical stealth in *Ropeway Line*.
"""

import hashlib
import random

lines = raw_data.strip().split('\n')
vehicles = []
current_section = ""
current_category = ""

for line in lines:
    line = line.strip()
    if line.startswith('### SECTION'):
        current_section = line.replace('### SECTION ', '').strip()
        if 'CARS — LOW' in current_section: current_category = "CARS: LOW / ECONOMY"
        elif 'CARS — MEDIUM' in current_section: current_category = "CARS: MEDIUM / SEDAN & SUV"
        elif 'CARS — LUXURY' in current_section: current_category = "CARS: LUXURY & ARMORED 4X4"
        elif 'BIKES' in current_section: current_category = "BIKES & SCOOTERS"
        elif '3-WHEELERS' in current_section: current_category = "AUTO & LOCAL TRANSIT"
        elif 'TRUCKS' in current_section: current_category = "TRUCKS & HEAVY FREIGHT"
        elif 'BUSES' in current_section: current_category = "BUSES & COACHES"
        elif 'POLICE' in current_section: current_category = "POLICE & EMERGENCY"
        elif 'TRAINS' in current_section: current_category = "TRAINS & RAIL"
        elif 'METRO' in current_section: current_category = "METRO TRANSIT"
        
        # fix the categories from the 12 tabs:
        # ALL (92), CARS: LOW / ECONOMY (12), CARS: MEDIUM / SEDAN & SUV (12), CARS: LUXURY & ARMORED 4X4 (10),
        # BIKES & SCOOTERS (14), AUTO & LOCAL TRANSIT (6), TRUCKS & HEAVY FREIGHT (12), BUSES & COACHES (6), 
        # POLICE & EMERGENCY (6), TRAINS & RAIL (5), METRO TRANSIT (3), AIRPLANES & HELICOPTERS (3), WATER & ROPEWAY (3)
        if 'METRO' in current_section:
            pass # Handle per vehicle later
    elif line and not line.startswith('#'):
        # Parse vehicle line
        m = re.match(r'\d+\.\s+\*\*(.*?)\*\*\s*\|\s*Ref:\s*(.*?)\s*\|\s*(\d+)\s*km/h\s*\|\s*(.*?)\s*\|\s*(.*)', line)
        if m:
            name, ref, speed, district, desc = m.groups()
            name = name.strip()
            
            # Extract affinity if present
            affinity = "DUAL OPERATIVE"
            if "(Arjun Signature)" in name or "(Arjun" in name:
                affinity = "ARJUN SPEC"
                name = name.replace("(Arjun Signature)", "").replace("(Arjun Prologue Truck)", "").replace("(Arjun Tow Rig)", "").strip()
            elif "(Kavya" in name:
                affinity = "KAVYA SPEC"
                name = name.replace("(Kavya Prologue)", "").strip()
            
            # Determine correct brand
            brand = "CUSTOM / OTHER"
            brands = ["TARA MOTORS", "MAHENDRA & SONS", "SURYA-MARU", "ASHOKA HEAVY", "EKLAVYA COMMERCIAL", 
                     "RAJPUTANA ROYAL", "CHETAK-BAJRA", "SHAKTI MOTO", "VARDHAN MERIDIAN FLEET", "BHARAT-RAIL", 
                     "PINKCITY METRO CORP", "INDUSAIR & DECCAN CARGO", "MEWAR MARINE & ARAVALLI ROPEWAYS"]
            lower_name = name.lower()
            if "tara " in lower_name: brand = "TARA MOTORS"
            elif "mahendra " in lower_name: brand = "MAHENDRA & SONS"
            elif "surya-maru" in lower_name or "surya " in lower_name: brand = "SURYA-MARU"
            elif "ashoka " in lower_name: brand = "ASHOKA HEAVY"
            elif "eklavya " in lower_name: brand = "EKLAVYA COMMERCIAL"
            elif "rajputana " in lower_name: brand = "RAJPUTANA ROYAL"
            elif "chetak" in lower_name or "bajra" in lower_name: brand = "CHETAK-BAJRA"
            elif "shakti " in lower_name: brand = "SHAKTI MOTO"
            elif "vardhan " in lower_name: brand = "VARDHAN MERIDIAN FLEET"
            elif "vande-" in lower_name or "wag-" in lower_name or "wdp-" in lower_name or "plasser" in lower_name or "palace" in lower_name: brand = "BHARAT-RAIL"
            elif "metro" in lower_name: brand = "PINKCITY METRO CORP"
            elif "indusair" in lower_name or "deccan" in lower_name: brand = "INDUSAIR & DECCAN CARGO"
            elif "pichola" in lower_name or "chambal" in lower_name or "ropeway" in lower_name: brand = "MEWAR MARINE & ARAVALLI ROPEWAYS"
            
            # specific adjustments to category based on section J
            actual_category = current_category
            if "METRO, AVIATION" in current_section:
                if "Metro" in name or "Monorail" in name: actual_category = "METRO TRANSIT"
                elif "Air" in name or "Jet" in name or "Plane" in name or "Chopper" in name: actual_category = "AIRPLANES & HELICOPTERS"
                else: actual_category = "WATER & ROPEWAY"
            
            # Generate deterministic stats
            v_id = hashlib.md5(name.encode()).hexdigest()[:8]
            
            # Map speed to 0-100 scale (max speed ~890 km/h, let's scale cars differently or cap at 100 for graph)
            # Actually just map speed to 0-100 logic.
            # Max car speed = 265, so normal 0-100 is speed/3
            speed_stat = min(100, int(int(speed) / 2.8))
            
            armor_stat = 30
            if "Truck" in name or "Rig" in name or "Heavy" in name or "Armored" in name or "Tank" in name or "4WD" in name: armor_stat = random.randint(70, 95)
            elif "Bike" in name or "Scoot" in name: armor_stat = random.randint(10, 25)
            else: armor_stat = random.randint(30, 60)
            
            handling = 50
            if "Bike" in name or "Sport" in name: handling = random.randint(80, 95)
            elif "Truck" in name or "Train" in name: handling = random.randint(10, 30)
            else: handling = random.randint(40, 75)
            
            cargo = 20
            if "Truck" in name or "Cargo" in name or "Rig" in name or "Van" in name or "Train" in name or "Plane" in name: cargo = random.randint(80, 100)
            elif "Bike" in name: cargo = random.randint(0, 15)
            else: cargo = random.randint(30, 60)
            
            img_id = random.randint(1, 999)
            image_url = f"https://picsum.photos/seed/bh_veh_{v_id}/800/450"
            
            vehicles.append({
                "id": v_id,
                "name": name,
                "ref": ref.strip(),
                "topSpeed": f"{speed} km/h",
                "district": district.strip(),
                "desc": desc.strip(),
                "category": actual_category,
                "affinity": affinity,
                "brand": brand,
                "image": image_url,
                "stats": {
                    "speed": speed_stat,
                    "armor": armor_stat,
                    "handling": handling,
                    "cargo": cargo
                }
            })

ts_content = "export interface FleetVehicle {\n"
ts_content += "  id: string;\n"
ts_content += "  name: string;\n"
ts_content += "  ref: string;\n"
ts_content += "  topSpeed: string;\n"
ts_content += "  district: string;\n"
ts_content += "  desc: string;\n"
ts_content += "  category: string;\n"
ts_content += "  affinity: 'ARJUN SPEC' | 'KAVYA SPEC' | 'DUAL OPERATIVE';\n"
ts_content += "  brand: string;\n"
ts_content += "  image: string;\n"
ts_content += "  stats: {\n"
ts_content += "    speed: number;\n"
ts_content += "    armor: number;\n"
ts_content += "    handling: number;\n"
ts_content += "    cargo: number;\n"
ts_content += "  };\n"
ts_content += "}\n\n"

ts_content += f"export const fleetData: FleetVehicle[] = {json.dumps(vehicles, indent=2)};\n"

os.makedirs('src/data', exist_ok=True)
with open('src/data/vehicleData.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Generated {len(vehicles)} vehicles.")
