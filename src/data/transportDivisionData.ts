export interface VehicleConceptSpecs {
  topSpeed: string;
  capacity: string;
  driveType: string;
  fuelType: string;
  transportClass: string;
  engineOutput?: string;
  suspensionType?: string;
}

export type VehicleStatus = 'IMPLEMENTED' | 'ACTIVE DEVELOPMENT' | 'WORLD CONCEPT' | 'FUTURE';

export interface TransportVehicle {
  id: string;
  name: string;
  manufacturer: string;
  category: string;
  categoryId: string;
  subtitle?: string;
  role: string;
  gameplayRole: string;
  environment: string;
  status: VehicleStatus;
  description: string;
  image: string;
  conceptSpecs: VehicleConceptSpecs;
}

export interface FictionalManufacturer {
  id: string;
  name: string;
  shortName: string;
  focus: string;
  description: string;
  origin: string;
  accentColor: string;
  logoBadge: string;
}

export const FICTIONAL_MANUFACTURERS: FictionalManufacturer[] = [
  {
    id: 'aravalli',
    name: 'ARAVALLI MOTORS',
    shortName: 'ARAVALLI',
    focus: 'Urban Mobility & Heavy Engineering',
    description: 'Founded in Jaipur’s industrial corridor, Aravalli Motors engineers narrow-track hatchbacks, agile three-wheelers, and severe-duty quarry dumpers built for Rajasthan’s rocky terrain.',
    origin: 'Jaipur Industrial Corridor (RJ-14)',
    accentColor: '#f97316',
    logoBadge: '▲ ARAVALLI'
  },
  {
    id: 'bharat',
    name: 'BHARAT ROADWORKS',
    shortName: 'BHARAT',
    focus: 'Commercial Freight & State Infrastructure',
    description: 'The industrial pillar of regional transit, fabricating high-capacity freight rigs, intercity state coaches, and municipal emergency response vehicles with heavy-gauge steel construction.',
    origin: 'Kota Freight Works (RJ-20)',
    accentColor: '#10b981',
    logoBadge: '◈ BHARAT'
  },
  {
    id: 'rajputana',
    name: 'RAJPUTANA MOBILITY',
    shortName: 'RAJPUTANA',
    focus: 'Passenger Luxury & Cast-Iron Classics',
    description: 'Combining timeless Rajasthani automotive coachbuilding with heavy cast-iron mechanical drivetrains. Producers of iconic roadsters, family sedans, and presidential VIP carriers.',
    origin: 'Jodhpur Engineering Yards (RJ-19)',
    accentColor: '#eab308',
    logoBadge: '⚔ RAJPUTANA'
  },
  {
    id: 'thar',
    name: 'THAR VEHICLE SYSTEMS',
    shortName: 'THAR',
    focus: 'Extreme Desert Expedition & Dune Running',
    description: 'Engineered specifically for the deep shifting sands of the western frontier. Specializes in low-range 4x4 drivetrains, desert snorkels, and high-clearance tubular sand buggies.',
    origin: 'Jaisalmer Outpost (RJ-15)',
    accentColor: '#f59e0b',
    logoBadge: '☼ THAR'
  },
  {
    id: 'mehta',
    name: 'MEHTA COMMERCIAL VEHICLES',
    shortName: 'MEHTA',
    focus: 'Independent Tuning & Custom Utility',
    description: 'Operating out of Dev Mehta’s iconic compound on the Jaipur Bypass, building un-governed courier scouts, roadside wrecker rigs, and high-torque custom haulers.',
    origin: 'Jaipur Ring Road Bypass (RJ-14)',
    accentColor: '#ea580c',
    logoBadge: '⚡ MEHTA'
  },
  {
    id: 'horizon',
    name: 'HORIZON AUTOMOTIVE',
    shortName: 'HORIZON',
    focus: 'Advanced Connected Systems & Corporate Fleets',
    description: 'The technological transport branch of Vardhan Meridian. Builds whisper-quiet hybrid sedans, automated toll express cruisers, and sealed telemetry-equipped container haulers.',
    origin: 'Meridian Tech District, Udaipur (RJ-27)',
    accentColor: '#3b82f6',
    logoBadge: '⬡ HORIZON'
  },
  {
    id: 'desertline',
    name: 'DESERTLINE INDUSTRIES',
    shortName: 'DESERTLINE',
    focus: 'Heavy Freight Logistics & Mining Tankers',
    description: 'Specialists in multi-axle desert sleeper coaches, heavy oilfield tankers, and reinforced perimeter security trucks that keep cross-desert trade corridors moving 24/7.',
    origin: 'Barmer Refinery Sector (RJ-04)',
    accentColor: '#8b5cf6',
    logoBadge: '═ DESERTLINE'
  }
];

export interface VehicleCategory {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  isWorldConcept?: boolean;
}

export const VEHICLE_CATEGORIES: VehicleCategory[] = [
  { id: 'city', code: '01', name: 'CITY CARS', subtitle: 'Compact vehicles designed for dense Indian urban streets.' },
  { id: 'suv', code: '02', name: 'SUV & CROSSOVER', subtitle: 'Rugged all-weather family and executive long-distance platforms.' },
  { id: 'motorcycle', code: '03', name: 'MOTORCYCLES', subtitle: 'Agile commuters, classic roadsters, and desert highway tourers.' },
  { id: 'scooter', code: '04', name: 'SCOOTERS', subtitle: 'Twist-and-go urban alley explorers and smart electric runabouts.' },
  { id: 'auto', code: '05', name: 'AUTO-RICKSHAWS', subtitle: 'Three-wheeled urban lifeblood for passenger and cargo transit.' },
  { id: 'bus', code: '06', name: 'BUSES', subtitle: 'Low-floor city transit and multi-axle desert highway coaches.' },
  { id: 'truck', code: '07', name: 'TRUCKS & HEAVY TRANSPORT', subtitle: 'National permit multi-axle freight haulers and quarry tippers.' },
  { id: 'pickup', code: '08', name: 'PICKUPS & UTILITY', subtitle: 'Single-cab mandi workhorses and 4WD field breakdown tenders.' },
  { id: 'police', code: '09', name: 'POLICE & SECURITY', subtitle: 'State highway interceptors and tactical armed convoy escorts.' },
  { id: 'emergency', code: '10', name: 'EMERGENCY', subtitle: 'Rapid medical response units, fire bowsers, and rescue trucks.' },
  { id: 'offroad', code: '11', name: 'OFF-ROAD & DESERT', subtitle: 'Sand-rail dune runners and rocky Aravalli mountain crawlers.' },
  { id: 'rail', code: '12', name: 'RAIL / SPECIAL TRANSPORT', subtitle: 'World transport concept: electric trainsets, OHE railcars & heavy transporters.', isWorldConcept: true }
];

export const TRANSPORT_VEHICLES: TransportVehicle[] = [
  // =========================================================================
  // 01 CITY CARS
  // =========================================================================
  {
    id: 'aravalli-m1',
    name: 'ARAVALLI M1',
    manufacturer: 'ARAVALLI MOTORS',
    category: 'CITY CARS',
    categoryId: 'city',
    role: 'Compact Hatchback',
    gameplayRole: 'City / Commute / Alley Infiltration',
    environment: 'Jaipur Old City & Johari Bazaar',
    status: 'IMPLEMENTED',
    description: 'Ultra-compact urban hatchback with a 2.4-meter turning radius, designed for Jaipur’s narrow walled-city bazaar lanes where full-sized SUVs crash.',
    image: '/assets/images/transport/aravalli-m1.jpg',
    conceptSpecs: {
      topSpeed: '125 km/h',
      capacity: '4 Passengers',
      driveType: 'Front-Wheel Drive',
      fuelType: 'Petrol / CNG Dual-Tank',
      transportClass: 'Compact Urban Sub-4M',
      engineOutput: '68 BHP @ 6,000 RPM',
      suspensionType: 'MacPherson Strut with Reinforced Bushings'
    }
  },
  {
    id: 'horizon-c2',
    name: 'HORIZON C2',
    manufacturer: 'HORIZON AUTOMOTIVE',
    category: 'CITY CARS',
    categoryId: 'city',
    role: 'Premium Compact Sedan',
    gameplayRole: 'Urban Commuting / Corporate Infiltration',
    environment: 'Jaipur Tech Corridor & Civil Lines',
    status: 'ACTIVE DEVELOPMENT',
    description: 'Streamlined compact sedan with whisper-quiet cabin insulation and encrypted ADAS telemetry, favoured by Meridian corporate contractors.',
    image: '/assets/images/transport/horizon-c2.jpg',
    conceptSpecs: {
      topSpeed: '155 km/h',
      capacity: '5 Passengers',
      driveType: 'Front-Wheel Drive',
      fuelType: 'Hybrid-Electric (1.5L)',
      transportClass: 'Executive Compact Sedan',
      engineOutput: '115 BHP Combined',
      suspensionType: 'Independent Front & Torsion Beam Rear'
    }
  },
  {
    id: 'rajputana-aura',
    name: 'RAJPUTANA AURA',
    manufacturer: 'RAJPUTANA MOBILITY',
    category: 'CITY CARS',
    categoryId: 'city',
    role: 'Compact Family Sedan',
    gameplayRole: 'Highway + City / Inter-District Commute',
    environment: 'Ajmer Expressway & Kishangarh Marble Belt',
    status: 'ACTIVE DEVELOPMENT',
    description: 'Comfort-tuned family sedan featuring heavy-duty leaf springs tailored for corrugated state highways and potholed railway bridge ramps.',
    image: '/assets/images/transport/rajputana-aura.jpg',
    conceptSpecs: {
      topSpeed: '145 km/h',
      capacity: '5 Passengers',
      driveType: 'Front-Wheel Drive',
      fuelType: '1.5L Turbo Diesel',
      transportClass: 'Sub-Compact Sedan',
      engineOutput: '98 BHP @ 4,000 RPM',
      suspensionType: 'Rough-Road Tuned Coilover'
    }
  },
  {
    id: 'mehta-urban-5',
    name: 'MEHTA URBAN 5',
    manufacturer: 'MEHTA COMMERCIAL VEHICLES',
    category: 'CITY CARS',
    categoryId: 'city',
    role: 'Practical Family Hatchback',
    gameplayRole: 'Daily Driving / Quick Courier Escape',
    environment: 'Jaipur Bypass & Sikar Road',
    status: 'IMPLEMENTED',
    description: 'Modified daily hatchback fitted with an aftermarket cold-air intake, steel sump guard, and quick-access trunk compartment for contraband.',
    image: '/assets/images/transport/mehta-urban-5.jpg',
    conceptSpecs: {
      topSpeed: '140 km/h',
      capacity: '4 Passengers',
      driveType: 'Front-Wheel Drive',
      fuelType: '1.2L Tuned Petrol',
      transportClass: 'B-Segment Street Hatchback',
      engineOutput: '88 BHP Tuned',
      suspensionType: 'Reinforced Lower Arms'
    }
  },
  {
    id: 'bharat-eon',
    name: 'BHARAT EON',
    manufacturer: 'BHARAT ROADWORKS',
    category: 'CITY CARS',
    categoryId: 'city',
    role: 'Compact Economy Vehicle',
    gameplayRole: 'Dense Traffic / Low-Profile Transit',
    environment: 'Kota Industrial Ring & Station Road',
    status: 'WORLD CONCEPT',
    description: 'Affordable, lightweight runabout car engineered for extreme fuel efficiency (24 km/l) in bumper-to-bumper Indian junction traffic.',
    image: '/assets/images/transport/bharat-eon.jpg',
    conceptSpecs: {
      topSpeed: '115 km/h',
      capacity: '4 Passengers',
      driveType: 'Front-Wheel Drive',
      fuelType: '0.8L Eco-Petrol',
      transportClass: 'Entry Micro-Hatch',
      engineOutput: '54 BHP Eco',
      suspensionType: 'Standard Gas-Filled Dampers'
    }
  },

  // =========================================================================
  // 02 SUV & CROSSOVER
  // =========================================================================
  {
    id: 'aravalli-x7',
    name: 'ARAVALLI X7',
    manufacturer: 'ARAVALLI MOTORS',
    category: 'SUV & CROSSOVER',
    categoryId: 'suv',
    role: 'Large Family SUV',
    gameplayRole: 'Highway Convoy / High-Mass Ramming',
    environment: 'NH-48 Jaipur-Udaipur Expressway',
    status: 'IMPLEMENTED',
    description: 'Heavy 7-seat body-on-frame SUV with high ground clearance (225mm) and dual auxiliary desert fuel tanks, built for non-stop interstate transit.',
    image: '/assets/images/transport/aravalli-x7.jpg',
    conceptSpecs: {
      topSpeed: '185 km/h',
      capacity: '7 Passengers',
      driveType: 'All-Wheel Drive (AWD)',
      fuelType: '2.2L m-Hawk Diesel',
      transportClass: 'Mid-Size 3-Row Ladder SUV',
      engineOutput: '175 BHP / 400 Nm Torque',
      suspensionType: 'Double Wishbone Front / Multi-Link Rear'
    }
  },
  {
    id: 'tharon-x4',
    name: 'THARON X4',
    manufacturer: 'THAR VEHICLE SYSTEMS',
    category: 'SUV & CROSSOVER',
    categoryId: 'suv',
    role: 'Mid-Size Crossover',
    gameplayRole: 'Rugged Utility / Trail Exploration',
    environment: 'Barmer & Jaisalmer Outskirts',
    status: 'ACTIVE DEVELOPMENT',
    description: 'Short-overhang rugged crossover designed to transition seamlessly from four-lane highway asphalt into loose dune gravel without getting bogged down.',
    image: '/assets/images/transport/tharon-x4.jpg',
    conceptSpecs: {
      topSpeed: '160 km/h',
      capacity: '5 Passengers',
      driveType: 'Part-Time 4WD with Low Range',
      fuelType: '2.0L Turbo Diesel',
      transportClass: 'Compact Adventure 4x4',
      engineOutput: '150 BHP / 350 Nm Torque',
      suspensionType: 'Independent Front / Rigid Rear Axle'
    }
  },
  {
    id: 'horizon-terrain',
    name: 'HORIZON TERRAIN',
    manufacturer: 'HORIZON AUTOMOTIVE',
    category: 'SUV & CROSSOVER',
    categoryId: 'suv',
    role: 'Urban Adventure SUV',
    gameplayRole: 'Surveillance Platform / High-Speed Pursuit',
    environment: 'Udaipur Lake Periphery & Hills',
    status: 'ACTIVE DEVELOPMENT',
    description: 'High-stance monocoque crossover equipped with concealed roof antenna slots and auxiliary optical battery banks for long nocturnal stakeouts.',
    image: '/assets/images/transport/horizon-terrain.jpg',
    conceptSpecs: {
      topSpeed: '175 km/h',
      capacity: '5 Passengers',
      driveType: 'Intelligent Electronic AWD',
      fuelType: '2.0L Petrol-Hybrid',
      transportClass: 'Modern Urban Crossover',
      engineOutput: '190 BHP Combined',
      suspensionType: 'Adaptive Electronic Damping'
    }
  },
  {
    id: 'rajputana-r6',
    name: 'RAJPUTANA R6',
    manufacturer: 'RAJPUTANA MOBILITY',
    category: 'SUV & CROSSOVER',
    categoryId: 'suv',
    role: 'Premium Long-Distance SUV',
    gameplayRole: 'Executive Convoy / Armored Shield',
    environment: 'Jaipur Secretariat & Rajsamand Mines',
    status: 'WORLD CONCEPT',
    description: 'Heavy luxury flagship SUV favoured by district politicians and infrastructure directors. Built with ballistic underbody protection and dark privacy glass.',
    image: '/assets/images/transport/rajputana-r6.jpg',
    conceptSpecs: {
      topSpeed: '195 km/h',
      capacity: '7 Passengers',
      driveType: 'Full-Time 4WD',
      fuelType: '3.0L V6 Turbo Diesel',
      transportClass: 'Full-Size Premium SUV',
      engineOutput: '240 BHP / 550 Nm Torque',
      suspensionType: 'Heavy-Duty Air Suspension with Level Control'
    }
  },
  {
    id: 'desertline-v5',
    name: 'DESERTLINE V5',
    manufacturer: 'DESERTLINE INDUSTRIES',
    category: 'SUV & CROSSOVER',
    categoryId: 'suv',
    role: 'Rugged Crossover',
    gameplayRole: 'Mining Escort / Roadblock Breacher',
    environment: 'Rajsamand Marble Belt & NH-62',
    status: 'WORLD CONCEPT',
    description: 'Heavy steel-bumper crossover equipped with a high-mounted snorkel, recovery winch, and reinforced roof rack for hauling quarry surveyor telemetry.',
    image: '/assets/images/transport/desertline-v5.jpg',
    conceptSpecs: {
      topSpeed: '165 km/h',
      capacity: '5 Passengers',
      driveType: '4WD with Rear Mechanical Locker',
      fuelType: '2.4L Heavy Diesel',
      transportClass: 'Industrial Cross-Utility',
      engineOutput: '160 BHP / 420 Nm Torque',
      suspensionType: 'Heavy Coil Springs with Twin-Tube Shocks'
    }
  },

  // =========================================================================
  // 03 MOTORCYCLES
  // =========================================================================
  {
    id: 'aravalli-160',
    name: 'ARAVALLI 160',
    manufacturer: 'ARAVALLI MOTORS',
    category: 'MOTORCYCLES',
    categoryId: 'motorcycle',
    role: 'Street Motorcycle',
    gameplayRole: 'Street Pursuit / Traffic Slicing',
    environment: 'Kota Education City & Aerodrome Circle',
    status: 'ACTIVE DEVELOPMENT',
    description: 'Aggressive streetfighter motorcycle with short gear ratios and sharp rake geometry, built for rapid sprints through jammed college town intersections.',
    image: '/assets/images/transport/aravalli-160.jpg',
    conceptSpecs: {
      topSpeed: '130 km/h',
      capacity: '2 Riders',
      driveType: 'Chain Drive',
      fuelType: '160cc 4-Valve Petrol',
      transportClass: 'Naked Street Motorcycle',
      engineOutput: '16.5 BHP @ 8,500 RPM',
      suspensionType: 'Telescopic Front / Monoshock Rear'
    }
  },
  {
    id: 'rajputana-250',
    name: 'RAJPUTANA 250',
    manufacturer: 'RAJPUTANA MOBILITY',
    category: 'MOTORCYCLES',
    categoryId: 'motorcycle',
    role: 'Classic Road Motorcycle',
    gameplayRole: 'Classic Cruiser / Desert Highway Touring',
    environment: 'Jodhpur Blue City & Mehrangarh Ridge',
    status: 'IMPLEMENTED',
    description: 'Iconic cast-iron thumper motorcycle with hand-painted gold pinstripes and twin exhausts, delivering unshakeable highway stability in desert crosswinds.',
    image: '/assets/images/transport/rajputana-250.jpg',
    conceptSpecs: {
      topSpeed: '120 km/h',
      capacity: '2 Riders',
      driveType: 'Heavy Sealed Chain',
      fuelType: '250cc Torquey Single',
      transportClass: 'Heritage Classic Cruiser',
      engineOutput: '20.2 BHP / 27 Nm Torque',
      suspensionType: 'Dual Gas-Charged Emulsion Shocks'
    }
  },
  {
    id: 'horizon-xr',
    name: 'HORIZON XR',
    manufacturer: 'HORIZON AUTOMOTIVE',
    category: 'MOTORCYCLES',
    categoryId: 'motorcycle',
    role: 'Adventure Motorcycle',
    gameplayRole: 'Reconnaissance / Ridge Trail Scaling',
    environment: 'Aravalli Switchbacks & Kumbhalgarh Trails',
    status: 'ACTIVE DEVELOPMENT',
    description: 'Long-travel dual-sport enduro with a 21-inch spoke front wheel, capable of jumping railway ditches and running unpaved mountain goat trails.',
    image: '/assets/images/transport/horizon-xr.jpg',
    conceptSpecs: {
      topSpeed: '145 km/h',
      capacity: '2 Riders',
      driveType: 'O-Ring Chain',
      fuelType: '400cc Fuel-Injected Single',
      transportClass: 'Dual-Sport Adventure Enduro',
      engineOutput: '38 BHP @ 7,500 RPM',
      suspensionType: 'Inverted 43mm Long-Travel Forks'
    }
  },
  {
    id: 'desertline-400',
    name: 'DESERTLINE 400',
    manufacturer: 'DESERTLINE INDUSTRIES',
    category: 'MOTORCYCLES',
    categoryId: 'motorcycle',
    role: 'Long-Distance Touring Motorcycle',
    gameplayRole: 'Desert Highway Patrol / Night Courier',
    environment: 'Pokhran & Jaisalmer Deep Highway',
    status: 'WORLD CONCEPT',
    description: 'Parallel-twin highway tourer equipped with lockable aluminum panniers, high windscreen, and dual 50W LED desert spotlights for midnight transit.',
    image: '/assets/images/transport/desertline-400.jpg',
    conceptSpecs: {
      topSpeed: '155 km/h',
      capacity: '2 Riders + 40kg Luggage',
      driveType: 'Sealed O-Ring Chain',
      fuelType: '400cc Parallel Twin',
      transportClass: 'Heavy Highway Tourer',
      engineOutput: '44 BHP @ 8,000 RPM',
      suspensionType: 'Multi-Rate Preload Adjustable Monoshock'
    }
  },
  {
    id: 'bharat-street-125',
    name: 'BHARAT STREET 125',
    manufacturer: 'BHARAT ROADWORKS',
    category: 'MOTORCYCLES',
    categoryId: 'motorcycle',
    role: 'Practical Commuter Motorcycle',
    gameplayRole: 'Everyday Commuter / Invisible Social Disguise',
    environment: 'Every Village, Town & Mandi in Rajasthan',
    status: 'IMPLEMENTED',
    description: 'The definitive 80 km/l Indian commuter motorcycle. Completely unremarkable to police and checkpoint CCTV, granting instant social disguise.',
    image: '/assets/images/transport/bharat-street-125.jpg',
    conceptSpecs: {
      topSpeed: '95 km/h',
      capacity: '2 Riders',
      driveType: 'Fully Enclosed Chain Case',
      fuelType: '125cc Ultra-Reliable Petrol',
      transportClass: 'Mass Commuter Motorcycle',
      engineOutput: '10.5 BHP @ 7,500 RPM',
      suspensionType: 'Dual Hydraulic Springs'
    }
  },

  // =========================================================================
  // 04 SCOOTERS
  // =========================================================================
  {
    id: 'aravalli-city-110',
    name: 'ARAVALLI CITY 110',
    manufacturer: 'ARAVALLI MOTORS',
    category: 'SCOOTERS',
    categoryId: 'scooter',
    role: 'Agile Urban Scooter',
    gameplayRole: 'Narrow Alley Transit / Quick Courier',
    environment: 'Bundi Lanes & Alwar Old City',
    status: 'IMPLEMENTED',
    description: 'Lightweight pressed-metal twist-and-go scooter capable of squeezing past cattle, vegetable carts, and temple procession crowds.',
    image: '/assets/images/transport/aravalli-city-110.jpg',
    conceptSpecs: {
      topSpeed: '85 km/h',
      capacity: '2 Riders',
      driveType: 'CVT Automatic Gearbox',
      fuelType: '110cc 4-Stroke Petrol',
      transportClass: 'Urban Commuter Scooter',
      engineOutput: '8.0 BHP @ 7,000 RPM',
      suspensionType: 'Trailing Link Front / Unit Swing Rear'
    }
  },
  {
    id: 'horizon-e-scoot',
    name: 'HORIZON E-SCOOT',
    manufacturer: 'HORIZON AUTOMOTIVE',
    category: 'SCOOTERS',
    categoryId: 'scooter',
    role: 'Connected Smart Electric Scooter',
    gameplayRole: 'Silent Night Surveillance / Zero Sound',
    environment: 'Jaipur Mansarovar & C-Scheme',
    status: 'ACTIVE DEVELOPMENT',
    description: 'Whisper-quiet electric scooter with high-acceleration electric hub motor, digital mapping screen, and zero thermal engine signature.',
    image: '/assets/images/transport/horizon-e-scoot.jpg',
    conceptSpecs: {
      topSpeed: '105 km/h',
      capacity: '2 Riders',
      driveType: 'Belt-Driven Permanent Magnet Motor',
      fuelType: '4.0 kWh Lithium-Ion Battery (140km Range)',
      transportClass: 'High-Speed Smart EV',
      engineOutput: '8.5 kW Peak Electric',
      suspensionType: 'Telescopic Front / Monoshock Rear'
    }
  },
  {
    id: 'rajputana-family-scoot',
    name: 'RAJPUTANA FAMILY SCOOT',
    manufacturer: 'RAJPUTANA MOBILITY',
    category: 'SCOOTERS',
    categoryId: 'scooter',
    role: 'Heavy Metal-Body Family Scooter',
    gameplayRole: 'Durable Family Transit / Rugged Metal Body',
    environment: 'Sawai Madhopur Town & Dausa Mandi',
    status: 'WORLD CONCEPT',
    description: 'Full-steel sheet-metal retro scooter featuring a front grocery hook, step-through footboard, and a spare tire mounted behind the rear pillion.',
    image: '/assets/images/transport/rajputana-family-scoot.jpg',
    conceptSpecs: {
      topSpeed: '80 km/h',
      capacity: '2 Riders + 20kg Groceries',
      driveType: 'Direct Gearbox 4-Speed',
      fuelType: '125cc 4-Stroke Petrol',
      transportClass: 'Classic Sheet-Metal Scooter',
      engineOutput: '8.5 BHP @ 6,500 RPM',
      suspensionType: 'Dual Coaxial Dampers'
    }
  },
  {
    id: 'bharat-commute',
    name: 'BHARAT COMMUTE',
    manufacturer: 'BHARAT ROADWORKS',
    category: 'SCOOTERS',
    categoryId: 'scooter',
    role: 'High-Mileage Utility Scooter',
    gameplayRole: 'Fleet Messenger / Low Maintenance',
    environment: 'Pali Industrial Town & Rail Station',
    status: 'ACTIVE DEVELOPMENT',
    description: 'High-efficiency fleet scooter equipped with reinforced tubular crash-guards and all-weather drum brakes, common among postal and delivery hubs.',
    image: '/assets/images/transport/bharat-commute.jpg',
    conceptSpecs: {
      topSpeed: '85 km/h',
      capacity: '2 Riders',
      driveType: 'V-Matic CVT',
      fuelType: '115cc Fuel-Injected Petrol',
      transportClass: 'Commercial Fleet Scooter',
      engineOutput: '8.7 BHP @ 7,500 RPM',
      suspensionType: 'Standard Front Forks'
    }
  },
  {
    id: 'mehta-urban-scoot',
    name: 'MEHTA URBAN SCOOT',
    manufacturer: 'MEHTA COMMERCIAL VEHICLES',
    category: 'SCOOTERS',
    categoryId: 'scooter',
    role: 'Custom Tuned Courier Scooter',
    gameplayRole: 'Garage Parts Runner / Tight Getaway',
    environment: 'Jaipur Bypass Repair Bays',
    status: 'IMPLEMENTED',
    description: 'Shop-tuned scooter with modified variator weights for instant standing-start torque and an enlarged under-seat bay holding mechanic socket sets.',
    image: '/assets/images/transport/mehta-urban-scoot.jpg',
    conceptSpecs: {
      topSpeed: '95 km/h',
      capacity: '1 Rider + Heavy Tool Kit',
      driveType: 'Lightened Racing Variator',
      fuelType: '125cc High-Compression Petrol',
      transportClass: 'Tuned Workshop Utility',
      engineOutput: '11.0 BHP Tuned',
      suspensionType: 'Stiffened Heavy Springs'
    }
  },

  // =========================================================================
  // 05 AUTO-RICKSHAWS
  // =========================================================================
  {
    id: 'aravalli-auto-a1',
    name: 'ARAVALLI AUTO A1',
    manufacturer: 'ARAVALLI MOTORS',
    category: 'AUTO-RICKSHAWS',
    categoryId: 'auto',
    role: 'Narrow-Chassis City Passenger Auto',
    gameplayRole: 'Passenger Transit / Alley Evasion',
    environment: 'Jaipur Badi Chaupar to Chandpole',
    status: 'IMPLEMENTED',
    description: 'Classic green-and-yellow three-wheeler with a 2.8m turning circle, capable of performing instant handbrake 180s inside crowded wholesale bazaars.',
    image: '/assets/images/transport/aravalli-auto-a1.jpg',
    conceptSpecs: {
      topSpeed: '65 km/h',
      capacity: 'Driver + 3 Passengers',
      driveType: 'Rear-Wheel Shaft Drive',
      fuelType: 'CNG / Petrol Dual Fuel',
      transportClass: 'L5M Passenger Three-Wheeler',
      engineOutput: '10.0 BHP @ 4,500 RPM',
      suspensionType: 'Trailing Arm Front / Independent Rear'
    }
  },
  {
    id: 'horizon-cargo-auto',
    name: 'HORIZON CARGO AUTO',
    manufacturer: 'HORIZON AUTOMOTIVE',
    category: 'AUTO-RICKSHAWS',
    categoryId: 'auto',
    role: 'Enclosed Cargo Three-Wheeler',
    gameplayRole: 'Equipment Drop / Covert Hardware Hauling',
    environment: 'Jaipur Inland Container Depot',
    status: 'ACTIVE DEVELOPMENT',
    description: 'Enclosed lockable steel cargo three-wheeler used by technicians to move encrypted server racks and optical wiretap gear without raising suspicion.',
    image: '/assets/images/transport/horizon-cargo-auto.jpg',
    conceptSpecs: {
      topSpeed: '60 km/h',
      capacity: 'Driver + 500kg Cargo Payload',
      driveType: 'Differential Axle Drive',
      fuelType: 'Electric BLDC Hub System',
      transportClass: 'L5N Enclosed Freight 3W',
      engineOutput: '7.5 kW Electric',
      suspensionType: 'Heavy Leaf Springs Rear'
    }
  },
  {
    id: 'rajputana-passenger-auto',
    name: 'RAJPUTANA PASSENGER AUTO',
    manufacturer: 'RAJPUTANA MOBILITY',
    category: 'AUTO-RICKSHAWS',
    categoryId: 'auto',
    role: 'Heavy-Frame Rural Shared Auto',
    gameplayRole: 'Rural Shared Taxi / Overloaded Commute',
    environment: 'Dausa-Lalsot Rural Link',
    status: 'WORLD CONCEPT',
    description: 'Heavy diesel 6-seater tempo that ferries passengers between remote village railheads and tehsil courthouses on broken dirt roads.',
    image: '/assets/images/transport/rajputana-passenger-auto.jpg',
    conceptSpecs: {
      topSpeed: '55 km/h',
      capacity: 'Driver + 6 Passengers',
      driveType: 'Shaft Driven Rear Axle',
      fuelType: 'Single-Cylinder Diesel',
      transportClass: 'Heavy Commercial Tempo',
      engineOutput: '9.5 BHP Direct Diesel',
      suspensionType: 'Semi-Elliptic Leaf Springs'
    }
  },
  {
    id: 'bharat-electric-auto',
    name: 'BHARAT ELECTRIC AUTO',
    manufacturer: 'BHARAT ROADWORKS',
    category: 'AUTO-RICKSHAWS',
    categoryId: 'auto',
    role: 'Silent Battery Swap Metro Feeder',
    gameplayRole: 'Silent Eavesdropping / Green Transport',
    environment: 'Udaipur Lakefront & Fateh Sagar Promenade',
    status: 'ACTIVE DEVELOPMENT',
    description: 'Whisper-quiet electric three-wheeler with quick-swap battery bays, common around lake sanctuaries and silent heritage palace perimeters.',
    image: '/assets/images/transport/bharat-electric-auto.jpg',
    conceptSpecs: {
      topSpeed: '50 km/h',
      capacity: 'Driver + 4 Passengers',
      driveType: 'Direct BLDC Rear Differential',
      fuelType: 'Dual Swappable LiFePO4 Packs',
      transportClass: 'Zero-Emission Urban Feeder',
      engineOutput: '6.0 kW Peak',
      suspensionType: 'Hydraulic Dampers All Around'
    }
  },
  {
    id: 'desertline-long-range-auto',
    name: 'DESERTLINE LONG-RANGE AUTO',
    manufacturer: 'DESERTLINE INDUSTRIES',
    category: 'AUTO-RICKSHAWS',
    categoryId: 'auto',
    role: 'High-Clearance Regional Cargo Tempo',
    gameplayRole: 'Highway Periphery Cargo / Spare Mover',
    environment: 'Pali-Jodhpur Highway Edge',
    status: 'WORLD CONCEPT',
    description: 'Stretched-chassis heavy tempo with rooftop carrier rails and reinforced rear leaf springs, built to ferry water canisters and truck tires between highway dhabas.',
    image: '/assets/images/transport/desertline-long-range-auto.jpg',
    conceptSpecs: {
      topSpeed: '58 km/h',
      capacity: 'Driver + 650kg Payload',
      driveType: 'Heavy Commercial Rear Axle',
      fuelType: 'Heavy High-Torque Diesel',
      transportClass: 'Heavy Regional 3W Mule',
      engineOutput: '11.0 BHP High Torque',
      suspensionType: 'Multi-Leaf Heavy Springs'
    }
  },

  // =========================================================================
  // 06 BUSES
  // =========================================================================
  {
    id: 'jaipur-cityline',
    name: 'JAIPUR CITYLINE',
    manufacturer: 'ARAVALLI MOTORS',
    category: 'BUSES',
    categoryId: 'bus',
    role: 'Low-Floor Urban Transit Bus',
    gameplayRole: 'Urban Transit / Multi-Lane Roadblock',
    environment: 'Jaipur Ajmeri Gate & Sindi Camp',
    status: 'IMPLEMENTED',
    description: 'Low-floor urban municipal transit bus featuring wide pneumatic center doors, capable of turning sideways to completely blockade 4-lane city intersections.',
    image: '/assets/images/transport/jaipur-cityline.jpg',
    conceptSpecs: {
      topSpeed: '80 km/h',
      capacity: '42 Seated + 25 Standees',
      driveType: 'Rear Engine Rear-Wheel Drive',
      fuelType: 'CNG Eco-Six Engine',
      transportClass: 'Heavy Urban Low-Floor Bus',
      engineOutput: '230 BHP @ 2,200 RPM',
      suspensionType: 'Full Air Suspension with Kneeling'
    }
  },
  {
    id: 'rajasthan-express',
    name: 'RAJASTHAN EXPRESS',
    manufacturer: 'BHARAT ROADWORKS',
    category: 'BUSES',
    categoryId: 'bus',
    role: 'Intercity State Highway Coach',
    gameplayRole: 'Intercity Transit / Passenger Cover',
    environment: 'NH-48 Jaipur to Udaipur Highway',
    status: 'ACTIVE DEVELOPMENT',
    description: 'The iconic blue-and-white state roadway express coach that connects all thirteen districts, stopping at unlit village stands and highway dhabas.',
    image: '/assets/images/transport/rajasthan-express.jpg',
    conceptSpecs: {
      topSpeed: '100 km/h',
      capacity: '54 Seated Passengers',
      driveType: 'Front Engine RWD',
      fuelType: '6-Cylinder Turbo Diesel',
      transportClass: 'Intercity Stage Carriage',
      engineOutput: '190 BHP @ 2,400 RPM',
      suspensionType: 'Semi-Elliptic Heavy Leaf Springs'
    }
  },
  {
    id: 'horizon-metrobus',
    name: 'HORIZON METROBUS',
    manufacturer: 'HORIZON AUTOMOTIVE',
    category: 'BUSES',
    categoryId: 'bus',
    role: 'Modern Rapid Transit Bus',
    gameplayRole: 'High-Capacity Corridor Shifter',
    environment: 'Jaipur Elevated Arterial Corridor',
    status: 'WORLD CONCEPT',
    description: 'Modern aerodynamic low-emission coach serving rapid transit links between newly privatized expressway toll hubs and luxury business enclaves.',
    image: '/assets/images/transport/horizon-metrobus.jpg',
    conceptSpecs: {
      topSpeed: '95 km/h',
      capacity: '60 Passengers',
      driveType: 'Hybrid RWD System',
      fuelType: 'Electric-CNG Hybrid',
      transportClass: 'Corridor BRTS Express',
      engineOutput: '260 BHP Combined',
      suspensionType: 'Electronically Controlled Air Bellows'
    }
  },
  {
    id: 'desertline-coach',
    name: 'DESERTLINE COACH',
    manufacturer: 'DESERTLINE INDUSTRIES',
    category: 'BUSES',
    categoryId: 'bus',
    role: 'Multi-Axle Desert Highway Sleeper',
    gameplayRole: 'Overnight Transit / Covert Sleeper Berths',
    environment: 'Jaipur-Jaisalmer Overnight Line',
    status: 'ACTIVE DEVELOPMENT',
    description: 'Multi-axle air-conditioned luxury night coach with curtained sleeper berths, featured in key story missions taking protagonists across the desert undetected.',
    image: '/assets/images/transport/desertline-coach.jpg',
    conceptSpecs: {
      topSpeed: '125 km/h',
      capacity: '36 Sleeper Berths',
      driveType: 'Twin Rear Axles (6x2)',
      fuelType: '11.0L Turbo Diesel',
      transportClass: 'Multi-Axle Long-Distance Sleeper',
      engineOutput: '380 BHP / 1,600 Nm Torque',
      suspensionType: 'Full Electronically Controlled Air Bags'
    }
  },
  {
    id: 'bharat-transit',
    name: 'BHARAT TRANSIT',
    manufacturer: 'BHARAT ROADWORKS',
    category: 'BUSES',
    categoryId: 'bus',
    role: 'Rugged Steel-Roof Rural Stage Carriage',
    gameplayRole: 'Rural Mule / Heavy Luggage Carrier',
    environment: 'Barmer-Pali Rural Corridors',
    status: 'WORLD CONCEPT',
    description: 'Rugged steel-body stage carriage carrying milk cans, spare wheels, and sacks of grain on its heavy roof rack, tackling washboard village trails.',
    image: '/assets/images/transport/bharat-transit.jpg',
    conceptSpecs: {
      topSpeed: '85 km/h',
      capacity: '48 Seated + Heavy Roof Rack',
      driveType: 'Heavy Beam Axle RWD',
      fuelType: '5.8L Inline-6 Diesel',
      transportClass: 'Rural All-Weather Bus',
      engineOutput: '160 BHP @ 2,200 RPM',
      suspensionType: 'Parabolic Leaf Springs with Anti-Roll Bar'
    }
  },

  // =========================================================================
  // 07 TRUCKS & HEAVY TRANSPORT
  // =========================================================================
  {
    id: 'bharat-hauler-28',
    name: 'BHARAT HAULER 28',
    manufacturer: 'BHARAT ROADWORKS',
    category: 'TRUCKS & HEAVY TRANSPORT',
    categoryId: 'truck',
    role: '10-Wheel Heavy Freight Truck',
    gameplayRole: 'Heavy Freight / Highway Ramming Machine',
    environment: 'NH-48 Rajasthan Central Freight Corridor',
    status: 'IMPLEMENTED',
    description: '10-wheel national permit freight truck with an ornate hand-painted wooden cabin and immense frontal mass, capable of smashing through hostile road blocks.',
    image: '/assets/images/transport/bharat-hauler-28.jpg',
    conceptSpecs: {
      topSpeed: '90 km/h',
      capacity: '28 Ton GVW (18 Ton Payload)',
      driveType: '6x2 Dual Axle with Lift Axle',
      fuelType: '6.7L Cummins-Spec Turbo Diesel',
      transportClass: 'Heavy Commercial Vehicle (HCV)',
      engineOutput: '250 BHP / 950 Nm Torque',
      suspensionType: 'Semi-Elliptic Multi-Leaf Spring'
    }
  },
  {
    id: 'aravalli-6x4',
    name: 'ARAVALLI 6X4',
    manufacturer: 'ARAVALLI MOTORS',
    category: 'TRUCKS & HEAVY TRANSPORT',
    categoryId: 'truck',
    role: 'Heavy Quarry Dump Truck',
    gameplayRole: 'Quarry Hauling / Industrial Breaching',
    environment: 'Rajsamand Granite & Marble Mines',
    status: 'ACTIVE DEVELOPMENT',
    description: 'Heavy-duty 6x4 construction hauler built to carry massive cut-granite blocks out of open-cast quarries on 20% mountain gradients.',
    image: '/assets/images/transport/aravalli-6x4.jpg',
    conceptSpecs: {
      topSpeed: '80 km/h',
      capacity: '31 Ton GVW',
      driveType: '6x4 Heavy Hub Reduction Tandem',
      fuelType: '8.0L Heavy Diesel',
      transportClass: 'Off-Highway Quarry Tipper',
      engineOutput: '280 BHP / 1,100 Nm Torque',
      suspensionType: 'Inverted Bogie Heavy Suspension'
    }
  },
  {
    id: 'horizon-freighter',
    name: 'HORIZON FREIGHTER',
    manufacturer: 'HORIZON AUTOMOTIVE',
    category: 'TRUCKS & HEAVY TRANSPORT',
    categoryId: 'truck',
    role: 'Long-Distance 40ft Container Rig',
    gameplayRole: 'Sealed Cargo Transport / Mission Target',
    environment: 'Jaipur Outskirts Container Depots',
    status: 'ACTIVE DEVELOPMENT',
    description: '40-foot articulated tractor-trailer unit carrying encrypted Horizon Meridian telecom repeaters and automated highway surveillance hardware.',
    image: '/assets/images/transport/horizon-freighter.jpg',
    conceptSpecs: {
      topSpeed: '95 km/h',
      capacity: '49 Ton GCW Multi-Axle',
      driveType: '6x4 Tractor Unit',
      fuelType: '12.0L Electronic Common-Rail',
      transportClass: 'Articulated Prime Mover',
      engineOutput: '420 BHP / 2,000 Nm Torque',
      suspensionType: 'Air Suspension on Rear Bogie'
    }
  },
  {
    id: 'desertline-tanker',
    name: 'DESERTLINE TANKER',
    manufacturer: 'DESERTLINE INDUSTRIES',
    category: 'TRUCKS & HEAVY TRANSPORT',
    categoryId: 'truck',
    role: '24KL Industrial Petroleum Tanker',
    gameplayRole: 'Volatile Fuel Logistics / Sabotage Target',
    environment: 'Barmer Refinery Corridor & Pokhran',
    status: 'WORLD CONCEPT',
    description: '24,000-liter multi-compartment fuel tanker hauling volatile diesel across unlit desert highways, presenting high explosive tactical opportunities.',
    image: '/assets/images/transport/desertline-tanker.jpg',
    conceptSpecs: {
      topSpeed: '85 km/h',
      capacity: '24,000 Liters Liquid Payload',
      driveType: '6x2 Heavy Commercial',
      fuelType: 'Commercial Turbo Diesel',
      transportClass: 'Hazardous Bulk Liquid Carrier',
      engineOutput: '250 BHP / 950 Nm Torque',
      suspensionType: 'Heavy Parabolic Springs'
    }
  },
  {
    id: 'rajputana-tipper',
    name: 'RAJPUTANA TIPPER',
    manufacturer: 'RAJPUTANA MOBILITY',
    category: 'TRUCKS & HEAVY TRANSPORT',
    categoryId: 'truck',
    role: 'Mining & Construction Heavy Tipper',
    gameplayRole: 'Earthmoving / Roadblock Creation',
    environment: 'Aravalli Road Construction Sites',
    status: 'WORLD CONCEPT',
    description: 'Hydraulic rock-tipper capable of dumping tons of gravel across expressway lanes to block corporate extraction squads in their tracks.',
    image: '/assets/images/transport/rajputana-tipper.jpg',
    conceptSpecs: {
      topSpeed: '75 km/h',
      capacity: '16 Cubic Meter Hardox Body',
      driveType: '6x4 Dual-Drive Axles',
      fuelType: '7.2L Turbocharged Diesel',
      transportClass: 'Construction Hydraulic Tipper',
      engineOutput: '260 BHP / 1,050 Nm Torque',
      suspensionType: 'Bogie Suspension with Torque Rods'
    }
  },

  // =========================================================================
  // 08 PICKUPS & UTILITY
  // =========================================================================
  {
    id: 'aravalli-workhorse',
    name: 'ARAVALLI WORKHORSE',
    manufacturer: 'ARAVALLI MOTORS',
    category: 'PICKUPS & UTILITY',
    categoryId: 'pickup',
    role: 'Heavy-Duty Flatbed Utility Pickup',
    gameplayRole: 'Mandi Hauling / Garage Supply Carrier',
    environment: 'Dausa Mandi & Sikar Grain Markets',
    status: 'IMPLEMENTED',
    description: 'Single-cab rugged flatbed pickup with drop-down wooden gates, the quintessential workhorse of rural grain traders and mechanic workshops.',
    image: '/assets/images/transport/aravalli-workhorse.jpg',
    conceptSpecs: {
      topSpeed: '115 km/h',
      capacity: '1.7 Ton Payload',
      driveType: 'Rear-Wheel Drive Leaf Springs',
      fuelType: '2.5L Direct Injection Diesel',
      transportClass: 'Light Commercial Utility Pickup',
      engineOutput: '75 BHP / 200 Nm Torque',
      suspensionType: 'Rigid Axle with 9-Leaf Springs'
    }
  },
  {
    id: 'horizon-farmer',
    name: 'HORIZON FARMER',
    manufacturer: 'HORIZON AUTOMOTIVE',
    category: 'PICKUPS & UTILITY',
    categoryId: 'pickup',
    role: 'Reinforced Agricultural Utility Carrier',
    gameplayRole: 'All-Terrain Rural Payload Transit',
    environment: 'Chambal Basin Farmlands & Kota Rural',
    status: 'ACTIVE DEVELOPMENT',
    description: 'Raised-clearance utility flatbed equipped with wide low-pressure tires for hauling heavy irrigation pumps and fertilizer bags across mud.',
    image: '/assets/images/transport/horizon-farmer.jpg',
    conceptSpecs: {
      topSpeed: '110 km/h',
      capacity: '1.5 Ton Payload',
      driveType: 'Selectable 4WD with Manual Hubs',
      fuelType: '2.2L Turbo Diesel',
      transportClass: 'Agri-Commercial 4x4',
      engineOutput: '90 BHP / 235 Nm Torque',
      suspensionType: 'Heavy Over-Slung Leaf Springs'
    }
  },
  {
    id: 'rajputana-cargo',
    name: 'RAJPUTANA CARGO',
    manufacturer: 'RAJPUTANA MOBILITY',
    category: 'PICKUPS & UTILITY',
    categoryId: 'pickup',
    role: 'Long-Wheelbase Transport Pickup',
    gameplayRole: 'Heavy Double-Cab Logistics / Crew Mover',
    environment: 'Pali Textile Workshops',
    status: 'ACTIVE DEVELOPMENT',
    description: 'Extended dual-cab utility vehicle combining 5-passenger transport with an open reinforced steel bed, widely used by textile transport crews.',
    image: '/assets/images/transport/rajputana-cargo.jpg',
    conceptSpecs: {
      topSpeed: '125 km/h',
      capacity: '5 Passengers + 1.0 Ton Bed',
      driveType: 'Rear-Wheel Drive',
      fuelType: '2.5L Turbo Diesel',
      transportClass: 'Double-Cab Commercial Pickup',
      engineOutput: '100 BHP / 260 Nm Torque',
      suspensionType: 'Independent Front / Leaf Rear'
    }
  },
  {
    id: 'desertline-pickup',
    name: 'DESERTLINE PICKUP',
    manufacturer: 'DESERTLINE INDUSTRIES',
    category: 'PICKUPS & UTILITY',
    categoryId: 'pickup',
    role: 'Desert-Spec 4WD Utility Truck',
    gameplayRole: 'Pipeline Security / Desert Patrol',
    environment: 'Barmer Pipeline Service Road',
    status: 'WORLD CONCEPT',
    description: 'Desert-specification 4x4 pickup equipped with auxiliary fuel bladders, roof searchlight, high air intake snorkel, and steel bullbar.',
    image: '/assets/images/transport/desertline-pickup.jpg',
    conceptSpecs: {
      topSpeed: '135 km/h',
      capacity: '1.2 Ton Payload',
      driveType: 'Heavy 4WD with Locking Rear Differential',
      fuelType: '2.8L Turbo Diesel',
      transportClass: 'Heavy Extreme Utility',
      engineOutput: '140 BHP / 360 Nm Torque',
      suspensionType: 'Heavy Coil Front / Rigid Leaf Rear'
    }
  },
  {
    id: 'bharat-service-4x4',
    name: 'BHARAT SERVICE 4X4',
    manufacturer: 'BHARAT ROADWORKS',
    category: 'PICKUPS & UTILITY',
    categoryId: 'pickup',
    role: 'Mobile Highway Service Truck',
    gameplayRole: 'Breakdown Recovery / Fast Vehicle Tuning',
    environment: 'NH-48 Emergency Highway Laybys',
    status: 'WORLD CONCEPT',
    description: 'Mobile workshop tender fitted with an onboard compressor, hydraulic jacks, acetylene torches, and replacement truck tires.',
    image: '/assets/images/transport/bharat-service-4x4.jpg',
    conceptSpecs: {
      topSpeed: '120 km/h',
      capacity: 'Mobile Machine Shop Outfit',
      driveType: 'Permanent 4WD',
      fuelType: '2.5L Turbo Diesel',
      transportClass: 'Highway Emergency Service Rig',
      engineOutput: '110 BHP / 280 Nm Torque',
      suspensionType: 'Heavy Multi-Leaf Suspension'
    }
  },

  // =========================================================================
  // 09 POLICE & SECURITY
  // =========================================================================
  {
    id: 'jaipur-patrol-suv',
    name: 'JAIPUR PATROL SUV',
    manufacturer: 'ARAVALLI MOTORS',
    category: 'POLICE & SECURITY',
    categoryId: 'police',
    role: 'Urban Police Patrol SUV',
    gameplayRole: 'Highway Pursuit / Checkpoint Deployment',
    environment: 'Jaipur Police Commissionerate & Outskirts',
    status: 'IMPLEMENTED',
    description: 'State police patrol SUV with roof-mounted LED strobe bar, bumper push-bars, and automated license-plate camera scanners linked to district control.',
    image: '/assets/images/transport/jaipur-patrol-suv.jpg',
    conceptSpecs: {
      topSpeed: '175 km/h',
      capacity: '5 Officers + Prisoner Cage',
      driveType: 'RWD Heavy-Duty Suspension',
      fuelType: '2.2L Police-Tuned Diesel',
      transportClass: 'District Law Enforcement Interceptor',
      engineOutput: '160 BHP / 380 Nm Torque',
      suspensionType: 'Heavy Pursuit-Grade Dampers'
    }
  },
  {
    id: 'highway-interceptor',
    name: 'HIGHWAY INTERCEPTOR',
    manufacturer: 'HORIZON AUTOMOTIVE',
    category: 'POLICE & SECURITY',
    categoryId: 'police',
    role: 'Expressway High-Speed Pursuit Sedan',
    gameplayRole: 'High-Speed Pursuit / Road Block Enforcement',
    environment: 'NH-48 Jaipur-Ajmer Toll Corridor',
    status: 'ACTIVE DEVELOPMENT',
    description: 'High-speed pursuit sedan deployed exclusively on the privatized Horizon Corridor to intercept fleeing haulers and illegal midnight couriers.',
    image: '/assets/images/transport/highway-interceptor.jpg',
    conceptSpecs: {
      topSpeed: '210 km/h',
      capacity: '4 Officers',
      driveType: 'AWD with Electronic Stability Control',
      fuelType: '3.0L Twin-Turbo Petrol',
      transportClass: 'High-Speed Highway Interceptor',
      engineOutput: '280 BHP / 420 Nm Torque',
      suspensionType: 'Sport-Tuned Multilink Suspension'
    }
  },
  {
    id: 'police-motorcycle',
    name: 'POLICE MOTORCYCLE',
    manufacturer: 'RAJPUTANA MOBILITY',
    category: 'POLICE & SECURITY',
    categoryId: 'police',
    role: 'Traffic Enforcement & Escort Bike',
    gameplayRole: 'Traffic Interception / VIP Convoy Escort',
    environment: 'VIP Corridor, Jaipur Secretariat to Airport',
    status: 'ACTIVE DEVELOPMENT',
    description: 'Heavy-duty police motorcycle with dual front sirens, flashing LED side-strobes, radar speed camera mount, and side crash bars.',
    image: '/assets/images/transport/police-motorcycle.jpg',
    conceptSpecs: {
      topSpeed: '145 km/h',
      capacity: '1 Officer',
      driveType: 'Chain Drive',
      fuelType: '350cc Single Cylinder',
      transportClass: 'Police Escort Cruiser',
      engineOutput: '25 BHP @ 6,500 RPM',
      suspensionType: 'Heavy Dual Rear Shocks'
    }
  },
  {
    id: 'security-pickup',
    name: 'SECURITY PICKUP',
    manufacturer: 'DESERTLINE INDUSTRIES',
    category: 'POLICE & SECURITY',
    categoryId: 'police',
    role: 'Armed Perimeter Patrol 4WD',
    gameplayRole: 'Corporate Convoy Escort / Armed Guards',
    environment: 'Horizon Construction Compounds',
    status: 'WORLD CONCEPT',
    description: 'Matte black Horizon Cell private security pickup featuring wire-mesh window cages, rear standing gunner rails, and blinding searchlights.',
    image: '/assets/images/transport/security-pickup.jpg',
    conceptSpecs: {
      topSpeed: '140 km/h',
      capacity: '2 Front + 4 Bed Guards',
      driveType: '4WD with Reinforced Axles',
      fuelType: '2.8L Heavy Diesel',
      transportClass: 'Private Security Armed Utility',
      engineOutput: '150 BHP / 380 Nm Torque',
      suspensionType: 'Heavy Parabolic Leaf Springs'
    }
  },
  {
    id: 'armored-transport-van',
    name: 'ARMORED TRANSPORT VAN',
    manufacturer: 'BHARAT ROADWORKS',
    category: 'POLICE & SECURITY',
    categoryId: 'police',
    role: 'Ballistic Cash & Tactical Van',
    gameplayRole: 'Tactical Squad Carrier / Impenetrable Vault',
    environment: 'State Treasury & Bank Corridor Routes',
    status: 'WORLD CONCEPT',
    description: 'Reinforced armored box van rated against high-caliber assault fire, equipped with run-flat ballistic tires and concealed gun ports.',
    image: '/assets/images/transport/armored-transport-van.jpg',
    conceptSpecs: {
      topSpeed: '105 km/h',
      capacity: '6 Tactical Officers',
      driveType: 'Heavy Dual Rear Wheels',
      fuelType: '4.0L Armored-Spec Diesel',
      transportClass: 'B6 Armored Tactical Carrier',
      engineOutput: '180 BHP / 480 Nm Torque',
      suspensionType: 'Reinforced Heavy-Gauge Springs'
    }
  },

  // =========================================================================
  // 10 EMERGENCY
  // =========================================================================
  {
    id: 'ambulance-van',
    name: 'AMBULANCE VAN',
    manufacturer: 'BHARAT ROADWORKS',
    category: 'EMERGENCY',
    categoryId: 'emergency',
    role: 'Type-B Emergency Patient Van',
    gameplayRole: 'Critical Care Transport / Toll Bypass',
    environment: 'Sawai Man Singh Hospital, Jaipur',
    status: 'IMPLEMENTED',
    description: 'High-roof emergency ambulance equipped with oxygen supply, patient cot, paramedic seat, and priority RFID highway toll transponder.',
    image: '/assets/images/transport/ambulance-van.jpg',
    conceptSpecs: {
      topSpeed: '130 km/h',
      capacity: '2 Crew + 1 Patient + 1 Attendant',
      driveType: 'Rear-Wheel Drive',
      fuelType: '2.6L Common-Rail Diesel',
      transportClass: 'Emergency Medical Vehicle (ALS)',
      engineOutput: '115 BHP @ 3,200 RPM',
      suspensionType: 'Soft-Ride Parabolic Rear Springs'
    }
  },
  {
    id: 'advanced-medical-suv',
    name: 'ADVANCED MEDICAL SUV',
    manufacturer: 'ARAVALLI MOTORS',
    category: 'EMERGENCY',
    categoryId: 'emergency',
    role: 'Rapid-Response Critical Care 4x4',
    gameplayRole: 'Rural Doctor Dispatch / Difficult Terrain',
    environment: 'Desert Health Centers, Barmer & Pokhran',
    status: 'ACTIVE DEVELOPMENT',
    description: 'Raised-chassis 4WD medical response SUV capable of delivering blood, snakebite anti-venom, and defibrillators to inaccessible desert hamlets.',
    image: '/assets/images/transport/advanced-medical-suv.jpg',
    conceptSpecs: {
      topSpeed: '155 km/h',
      capacity: '4 Medical Personnel',
      driveType: '4WD with Terrain Management',
      fuelType: '2.2L Clean Diesel',
      transportClass: 'Rapid Response Medical 4x4',
      engineOutput: '150 BHP / 350 Nm Torque',
      suspensionType: 'Heavy Off-Road Long-Travel Springs'
    }
  },
  {
    id: 'fire-rescue-truck',
    name: 'FIRE RESCUE TRUCK',
    manufacturer: 'BHARAT ROADWORKS',
    category: 'EMERGENCY',
    categoryId: 'emergency',
    role: 'Heavy Municipal Water & Foam Tender',
    gameplayRole: 'Structural Firefighting / Industrial Hazard Response',
    environment: 'Jaipur Fire Station & Industrial Zones',
    status: 'ACTIVE DEVELOPMENT',
    description: 'Municipal fire tender carrying 10,000 liters of water, high-pressure foam cannons, and hydraulic rescue cutters for refinery incidents.',
    image: '/assets/images/transport/fire-rescue-truck.jpg',
    conceptSpecs: {
      topSpeed: '90 km/h',
      capacity: '6 Firefighters + 10KL Water Tank',
      driveType: '4x2 Heavy Fire Chassis',
      fuelType: '6.0L Heavy Diesel',
      transportClass: 'Municipal Fire Bowser Tender',
      engineOutput: '240 BHP / 850 Nm Torque',
      suspensionType: 'Heavy Semi-Elliptic Leaf Springs'
    }
  },
  {
    id: 'highway-rescue-pickup',
    name: 'HIGHWAY RESCUE PICKUP',
    manufacturer: 'MEHTA COMMERCIAL VEHICLES',
    category: 'EMERGENCY',
    categoryId: 'emergency',
    role: 'Accident Extraction & Towing Utility',
    gameplayRole: 'Crash Extraction / Breakdown Rescue',
    environment: 'Aravalli Serpentine Switchback Crashes',
    status: 'WORLD CONCEPT',
    description: 'Heavy 4WD breakdown pickup equipped with hydraulic spreaders, an electric 9,500lb winch, and a folding rear towing crane boom.',
    image: '/assets/images/transport/highway-rescue-pickup.jpg',
    conceptSpecs: {
      topSpeed: '125 km/h',
      capacity: '2 Rescue Operators',
      driveType: '4WD with Winch PTO',
      fuelType: '2.8L Turbo Diesel',
      transportClass: 'Highway Rescue & Recovery Unit',
      engineOutput: '135 BHP / 350 Nm Torque',
      suspensionType: 'Overload Helper Leaf Springs'
    }
  },
  {
    id: 'emergency-motorcycle',
    name: 'EMERGENCY MOTORCYCLE',
    manufacturer: 'RAJPUTANA MOBILITY',
    category: 'EMERGENCY',
    categoryId: 'emergency',
    role: 'First-Responder Medical Bike',
    gameplayRole: 'Traffic Bypass Medical Response',
    environment: 'Dense Jaipur Walled City Markets',
    status: 'WORLD CONCEPT',
    description: 'Compact first-responder motorcycle fitted with siren, flashing red LED strobes, medical oxygen cylinder, and portable cardiac defibrillator.',
    image: '/assets/images/transport/emergency-motorcycle.jpg',
    conceptSpecs: {
      topSpeed: '110 km/h',
      capacity: '1 Paramedic',
      driveType: 'Chain Drive',
      fuelType: '200cc Fuel-Injected Petrol',
      transportClass: 'Rapid First-Responder Motorcycle',
      engineOutput: '18 BHP @ 7,500 RPM',
      suspensionType: 'Telescopic Front / Twin Rear Gas Shocks'
    }
  },

  // =========================================================================
  // 11 OFF-ROAD & DESERT
  // =========================================================================
  {
    id: 'thar-rider-4x4',
    name: 'THAR RIDER 4X4',
    manufacturer: 'THAR VEHICLE SYSTEMS',
    category: 'OFF-ROAD & DESERT',
    categoryId: 'offroad',
    role: 'Desert Safari 4x4 Soft-Top',
    gameplayRole: 'Dune Climbing / Exploration Scout',
    environment: 'Sam Sand Dunes, Jaisalmer',
    status: 'IMPLEMENTED',
    description: 'Iconic open-top short-wheelbase 4x4 with chunky low-pressure sand tires, front winch, and raised snorkel built for carving across Thar sand ridges.',
    image: '/assets/images/transport/thar-rider-4x4.jpg',
    conceptSpecs: {
      topSpeed: '145 km/h',
      capacity: '4 Passengers (Removable Soft Top)',
      driveType: 'Part-Time 4x4 Low-Range Transfer',
      fuelType: '2.2L Turbo Diesel',
      transportClass: 'Extreme Dune Explorer',
      engineOutput: '130 BHP / 300 Nm Torque',
      suspensionType: 'Rigid Live Axles Front & Rear'
    }
  },
  {
    id: 'dune-runner',
    name: 'DUNE RUNNER',
    manufacturer: 'THAR VEHICLE SYSTEMS',
    category: 'OFF-ROAD & DESERT',
    categoryId: 'offroad',
    role: 'Lightweight Sand-Rail Buggy',
    gameplayRole: 'Extreme Sand Sprint / Crest Jumping',
    environment: 'Khaba Fort Desert Flats',
    status: 'ACTIVE DEVELOPMENT',
    description: 'Tubular chromoly frame buggy with long-travel coilover shocks, paddle rear tires, and minimal sheet metal for skimming over treacherous sand bowls.',
    image: '/assets/images/transport/dune-runner.jpg',
    conceptSpecs: {
      topSpeed: '135 km/h',
      capacity: '2 Bucket Seats with 5-Point Harness',
      driveType: 'Rear-Wheel Drive with Spool Locker',
      fuelType: '1.0L High-Revving Petrol',
      transportClass: 'Lightweight Sand Rail Buggy',
      engineOutput: '110 BHP (Dry Weight 680kg)',
      suspensionType: 'Fox Racing Long-Travel Coilovers'
    }
  },
  {
    id: 'desert-scout',
    name: 'DESERT SCOUT',
    manufacturer: 'MEHTA COMMERCIAL VEHICLES',
    category: 'OFF-ROAD & DESERT',
    categoryId: 'offroad',
    role: 'Expedition 4x4 Overland Rig',
    gameplayRole: 'Mobile Safehouse / Long-Range Infiltration',
    environment: 'Thar Deep Frontier & Indo-Pak Border Tracks',
    status: 'ACTIVE DEVELOPMENT',
    description: 'Custom-built desert expedition wagon equipped with rooftop solar panels, auxiliary water cisterns, and a fold-out camp deck for desert nights.',
    image: '/assets/images/transport/desert-scout.jpg',
    conceptSpecs: {
      topSpeed: '130 km/h',
      capacity: '4 Passengers + Camp Setup',
      driveType: 'Dual Diff-Locked 4WD',
      fuelType: '3.0L Heavy Inline-6 Diesel',
      transportClass: 'Overland Expedition Platform',
      engineOutput: '165 BHP / 420 Nm Torque',
      suspensionType: 'Heavy Overland Leaf / Shocker Pack'
    }
  },
  {
    id: 'aravalli-trail-4x4',
    name: 'ARAVALLI TRAIL 4X4',
    manufacturer: 'ARAVALLI MOTORS',
    category: 'OFF-ROAD & DESERT',
    categoryId: 'offroad',
    role: 'Rock-Crawling Mountain Utility',
    gameplayRole: 'Mountain Ascent / Ridge Escapes',
    environment: 'Kumbhalgarh Mountain Slopes',
    status: 'WORLD CONCEPT',
    description: 'Narrow-body mountain crawler with solid front and rear live axles, high articulation suspension, and rock sliders designed for vertical boulder trails.',
    image: '/assets/images/transport/aravalli-trail-4x4.jpg',
    conceptSpecs: {
      topSpeed: '120 km/h',
      capacity: '4 Passengers',
      driveType: 'Solid Live Axles 4x4',
      fuelType: '2.0L Diesel',
      transportClass: 'Technical Rock Crawler',
      engineOutput: '120 BHP / 320 Nm Torque',
      suspensionType: 'High-Articulation 4-Link Suspension'
    }
  },
  {
    id: 'horizon-expedition',
    name: 'HORIZON EXPEDITION',
    manufacturer: 'HORIZON AUTOMOTIVE',
    category: 'OFF-ROAD & DESERT',
    categoryId: 'offroad',
    role: 'Heavy 6x6 Exploration Rig',
    gameplayRole: 'Survey Base / Armored Logistics',
    environment: 'Unsurveyed Desert Tracts',
    status: 'WORLD CONCEPT',
    description: '6x6 all-terrain heavy expedition vehicle housing satellite telemetry mapping hardware, ground-penetrating radar, and water purification units.',
    image: '/assets/images/transport/horizon-expedition.jpg',
    conceptSpecs: {
      topSpeed: '110 km/h',
      capacity: '6 Surveyors / Operators',
      driveType: 'Permanent 6x6 All-Wheel Drive',
      fuelType: '5.0L Industrial Turbo Diesel',
      transportClass: 'Heavy All-Terrain 6x6 Laboratory',
      engineOutput: '320 BHP / 1,200 Nm Torque',
      suspensionType: 'Portal Axles with Central Tire Inflation'
    }
  },

  // =========================================================================
  // 12 RAIL / SPECIAL TRANSPORT (WORLD TRANSPORT CONCEPT)
  // =========================================================================
  {
    id: 'regional-passenger-train',
    name: 'REGIONAL PASSENGER TRAIN',
    manufacturer: 'BHARAT ROADWORKS',
    category: 'RAIL / SPECIAL TRANSPORT',
    categoryId: 'rail',
    subtitle: 'WORLD TRANSPORT CONCEPT',
    role: 'Intercity Electric Multiple Unit',
    gameplayRole: 'Regional Rail Transit / World Concept',
    environment: 'NWR Main Electric Rail Line (Jaipur-Ajmer)',
    status: 'WORLD CONCEPT',
    description: 'Aerodynamic stainless-steel electric trainset linking Jaipur, Ajmer, and Udaipur at high speed across the state rail corridor.',
    image: '/assets/images/transport/regional-passenger-train.jpg',
    conceptSpecs: {
      topSpeed: '160 km/h',
      capacity: '8 Coaches (530 Seated Passengers)',
      driveType: '25kV AC Overhead Electric Traction',
      fuelType: 'Electric Overhead Catenary',
      transportClass: 'Electric Multiple Unit (EMU)',
      engineOutput: '4,000 kW Traction Motor Output',
      suspensionType: 'Air Bellow Secondary Suspension'
    }
  },
  {
    id: 'freight-locomotive',
    name: 'FREIGHT LOCOMOTIVE',
    manufacturer: 'BHARAT ROADWORKS',
    category: 'RAIL / SPECIAL TRANSPORT',
    categoryId: 'rail',
    subtitle: 'WORLD TRANSPORT CONCEPT',
    role: '12,000 HP Heavy Twin-Section Electric Locomotive',
    gameplayRole: 'Heavy Industrial Freight / World Concept',
    environment: 'Dedicated Freight Corridor Track',
    status: 'WORLD CONCEPT',
    description: '12,000 horsepower twin-section freight locomotive hauling 90 double-stacked container flatcars filled with Meridian equipment across Rajasthan.',
    image: '/assets/images/transport/freight-locomotive.jpg',
    conceptSpecs: {
      topSpeed: '120 km/h',
      capacity: '6,000 Ton Freight Load Capacity',
      driveType: 'Bo-Bo Twin Unit Electric Drive',
      fuelType: '25kV AC Electric Catenary',
      transportClass: 'Heavy Freight Electric Locomotive',
      engineOutput: '12,000 HP (8,950 kW)',
      suspensionType: 'Axle Hung Nose Suspended Traction Motors'
    }
  },
  {
    id: 'maintenance-rail-vehicle',
    name: 'MAINTENANCE RAIL VEHICLE',
    manufacturer: 'ARAVALLI MOTORS',
    category: 'RAIL / SPECIAL TRANSPORT',
    categoryId: 'rail',
    subtitle: 'WORLD TRANSPORT CONCEPT',
    role: 'OHE Line & Track Inspection Tower Car',
    gameplayRole: 'Yard Infiltration / Vertical Lift Access',
    environment: 'Kota Railway Marshalling Yard',
    status: 'WORLD CONCEPT',
    description: 'Specialized yellow railcar fitted with a hydraulic roof scissor lift for repairing overhead power lines in rail yards and accessing restricted gantries.',
    image: '/assets/images/transport/maintenance-rail-vehicle.jpg',
    conceptSpecs: {
      topSpeed: '80 km/h',
      capacity: '8 Rail Technicians + Tower Gear',
      driveType: 'Self-Propelled Diesel-Hydraulic Drive',
      fuelType: 'Industrial Heavy Diesel',
      transportClass: 'Overhead Equipment (OHE) Inspection Car',
      engineOutput: '350 BHP Diesel Hydraulic',
      suspensionType: 'Helical Coil Rail Springs'
    }
  },
  {
    id: 'rail-inspection-vehicle',
    name: 'RAIL INSPECTION VEHICLE',
    manufacturer: 'RAJPUTANA MOBILITY',
    category: 'RAIL / SPECIAL TRANSPORT',
    categoryId: 'rail',
    subtitle: 'WORLD TRANSPORT CONCEPT',
    role: 'Remote Track Patroller Trolley',
    gameplayRole: 'Silent Rail Travel / Remote Desert Tracks',
    environment: 'Jaisalmer Desert Branch Rail',
    status: 'WORLD CONCEPT',
    description: 'Lightweight motorized track trolley used by railway linesmen to detect sabotage and track deformities in remote desert heat sweeps.',
    image: '/assets/images/transport/rail-inspection-vehicle.jpg',
    conceptSpecs: {
      topSpeed: '65 km/h',
      capacity: '4 Linesmen + Tool Locker',
      driveType: 'Direct Rail Wheel Drive',
      fuelType: '650cc Twin Diesel',
      transportClass: 'Track Maintenance Motor Trolley',
      engineOutput: '14 BHP @ 3,000 RPM',
      suspensionType: 'Rubber Block Primary Suspension'
    }
  },
  {
    id: 'special-transport-unit',
    name: 'SPECIAL TRANSPORT UNIT',
    manufacturer: 'DESERTLINE INDUSTRIES',
    category: 'RAIL / SPECIAL TRANSPORT',
    categoryId: 'rail',
    subtitle: 'WORLD TRANSPORT CONCEPT',
    role: 'Super-Heavy Modular Hydraulic Transporter',
    gameplayRole: 'Superload Logistics / Moving Platform',
    environment: 'Rajasthan Solar Park, Bhadla',
    status: 'WORLD CONCEPT',
    description: 'Multi-axle hydraulic platform trailer with 96 independently steerable wheels used to transport massive 300-ton electrical substation transformers.',
    image: '/assets/images/transport/special-transport-unit.jpg',
    conceptSpecs: {
      topSpeed: '25 km/h',
      capacity: '350 Ton Superload Capacity',
      driveType: 'Multi-Axle Hydrostatic Drive',
      fuelType: 'Twin Power Pack Diesel Units',
      transportClass: 'Self-Propelled Modular Transporter (SPMT)',
      engineOutput: '490 BHP Power Pack Unit',
      suspensionType: 'Hydraulic Pendular Axle Compensation'
    }
  }
];
