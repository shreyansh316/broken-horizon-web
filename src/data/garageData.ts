// Vehicle Configuration & Tuning Parts Database for Arjun's Mehta Garage 4x4

export interface TuningPartOption {
  id: string;
  name: string;
  shortDesc: string;
  weightDeltaKg: number;
  topSpeedDeltaKmh: number;
  sandFlotation: number; // 0 - 100
  armorRating: number;   // 0 - 100
  fuelRangeKm: number;   // Base 680 km
  stealthDb: number;     // Higher = noisier, lower = stealthier
  icon: string;
}

export interface VehicleConfigState {
  presetName: string;
  livery: 'sandstone-tan' | 'nocturnal-black' | 'terracotta-red' | 'mehta-amber';
  tireType: 'all-terrain' | 'dune-paddles' | 'beadlock-crawler';
  tirePsi: number; // 16 - 42
  suspension: 'factory-heavy' | 'reservoir-25' | 'trophy-40' | 'interceptor-stiff';
  frontBumper: 'factory-tube' | 'stinger-winch' | 'prerunner-cage';
  roofRack: 'none' | 'expedition-fuel' | 'recon-mast';
  telemetry: 'standard-radio' | 'police-scanner' | 'scrambler-jammer';
}

export const LIVERY_OPTIONS = [
  { id: 'sandstone-tan', name: 'Sandstone Camo', hex: '#C2A378', desc: 'Sun-bleached Thar desert pigment for low visual signature over dunes' },
  { id: 'nocturnal-black', name: 'Nocturnal Matte', hex: '#1C1F26', desc: 'Radar-absorbent flat midnight coat for night highway interception' },
  { id: 'terracotta-red', name: 'Terracotta Rust', hex: '#9E3C2B', desc: 'Baked Aravalli clay hue matching Jaipur haveli brick dust' },
  { id: 'mehta-amber', name: 'Mehta Garage Heritage', hex: '#D97706', desc: 'Signature workshop racing livery with hand-stenciled telemetry markings' },
] as const;

export const TIRE_OPTIONS: TuningPartOption[] = [
  {
    id: 'all-terrain',
    name: '35" Radial All-Terrain',
    shortDesc: 'Dual-compound tread engineered for high-speed tarmac & cracked desert wadis.',
    weightDeltaKg: 0,
    topSpeedDeltaKmh: 0,
    sandFlotation: 76,
    armorRating: 70,
    fuelRangeKm: 680,
    stealthDb: 64,
    icon: 'Disc',
  },
  {
    id: 'dune-paddles',
    name: '37" Desert Flotation Paddles',
    shortDesc: 'Deep chevron sand scoops designed to conquer moving barchan dunes without bogging.',
    weightDeltaKg: 20,
    topSpeedDeltaKmh: -14,
    sandFlotation: 98,
    armorRating: 62,
    fuelRangeKm: 610,
    stealthDb: 72,
    icon: 'Waves',
  },
  {
    id: 'beadlock-crawler',
    name: '37" Armored Beadlocks',
    shortDesc: 'Puncture-proof Kevlar sidewalls on forged aluminum locking rims for brutal rocky passes.',
    weightDeltaKg: 48,
    topSpeedDeltaKmh: -6,
    sandFlotation: 82,
    armorRating: 94,
    fuelRangeKm: 640,
    stealthDb: 68,
    icon: 'Shield',
  },
];

export const SUSPENSION_OPTIONS: TuningPartOption[] = [
  {
    id: 'factory-heavy',
    name: 'Mehta Heavy Coils (+0")',
    shortDesc: 'Reinforced dual-rate factory springs with progressive polyurethane bump stops.',
    weightDeltaKg: 0,
    topSpeedDeltaKmh: 0,
    sandFlotation: 70,
    armorRating: 74,
    fuelRangeKm: 680,
    stealthDb: 60,
    icon: 'Sliders',
  },
  {
    id: 'reservoir-25',
    name: '2.5" Remote Reservoir Bypass (+2.5")',
    shortDesc: 'Nitrogen-charged piggyback shocks dissipating extreme desert heat during high-speed whoops.',
    weightDeltaKg: 18,
    topSpeedDeltaKmh: 4,
    sandFlotation: 88,
    armorRating: 82,
    fuelRangeKm: 660,
    stealthDb: 62,
    icon: 'Activity',
  },
  {
    id: 'trophy-40',
    name: 'Long-Travel 4.0" Trophy System (+4.0")',
    shortDesc: 'Maximum articulation 18" wheel travel for soaring across sand crests and rocky washouts.',
    weightDeltaKg: 36,
    topSpeedDeltaKmh: -8,
    sandFlotation: 96,
    armorRating: 88,
    fuelRangeKm: 625,
    stealthDb: 66,
    icon: 'Compass',
  },
  {
    id: 'interceptor-stiff',
    name: 'Highway Interceptor Lowered (-1.0")',
    shortDesc: 'Stiffened track sway bars, lowered center of gravity, and negative camber for tarmac pursuits.',
    weightDeltaKg: -10,
    topSpeedDeltaKmh: 16,
    sandFlotation: 52,
    armorRating: 76,
    fuelRangeKm: 710,
    stealthDb: 58,
    icon: 'Gauge',
  },
];

export const BUMPER_OPTIONS: TuningPartOption[] = [
  {
    id: 'factory-tube',
    name: 'Tubular Bullbar',
    shortDesc: 'Minimalist 2" DOM tubular steel bumper with recovery D-rings.',
    weightDeltaKg: 0,
    topSpeedDeltaKmh: 0,
    sandFlotation: 80,
    armorRating: 70,
    fuelRangeKm: 680,
    stealthDb: 60,
    icon: 'Shield',
  },
  {
    id: 'stinger-winch',
    name: 'Steel Stinger + 12K Winch',
    shortDesc: 'Aggressive stinger hoop to prevent end-over rollbacks, backed by a synthetic-rope 12,000 lb winch.',
    weightDeltaKg: 42,
    topSpeedDeltaKmh: -4,
    sandFlotation: 76,
    armorRating: 92,
    fuelRangeKm: 650,
    stealthDb: 64,
    icon: 'Anchor',
  },
  {
    id: 'prerunner-cage',
    name: 'Tactical Pre-Runner Cage',
    shortDesc: 'Full front-clip exoskeleton with integrated quadruple high-intensity laser spotlights.',
    weightDeltaKg: 58,
    topSpeedDeltaKmh: -8,
    sandFlotation: 72,
    armorRating: 98,
    fuelRangeKm: 630,
    stealthDb: 70,
    icon: 'Crosshair',
  },
];

export const ROOFRACK_OPTIONS: TuningPartOption[] = [
  {
    id: 'none',
    name: 'Clean Aerodynamic Roof',
    shortDesc: 'Zero roof drag profile for stealth sprints along radar-monitored stretches.',
    weightDeltaKg: 0,
    topSpeedDeltaKmh: 6,
    sandFlotation: 80,
    armorRating: 75,
    fuelRangeKm: 680,
    stealthDb: 55,
    icon: 'Minus',
  },
  {
    id: 'expedition-fuel',
    name: 'Aux Fuel Rack (+50L)',
    shortDesc: 'Low-profile extruded rack mounting dual 25L NATO diesel jerricans and traction escape boards.',
    weightDeltaKg: 55,
    topSpeedDeltaKmh: -6,
    sandFlotation: 74,
    armorRating: 80,
    fuelRangeKm: 890,
    stealthDb: 65,
    icon: 'Fuel',
  },
  {
    id: 'recon-mast',
    name: 'Recon Strobe & Gear Tray',
    shortDesc: 'Mounts high-gain perimeter LED bars, spare tire carrier, and collapsible recovery shovel.',
    weightDeltaKg: 68,
    topSpeedDeltaKmh: -9,
    sandFlotation: 71,
    armorRating: 85,
    fuelRangeKm: 810,
    stealthDb: 69,
    icon: 'Layers',
  },
];

export const TELEMETRY_OPTIONS: TuningPartOption[] = [
  {
    id: 'standard-radio',
    name: 'Commercial UHF Radio',
    shortDesc: 'Clean dual-band transceiver for short-range team voice comms and weather dispatch.',
    weightDeltaKg: 2,
    topSpeedDeltaKmh: 0,
    sandFlotation: 80,
    armorRating: 70,
    fuelRangeKm: 680,
    stealthDb: 65,
    icon: 'Radio',
  },
  {
    id: 'police-scanner',
    name: 'State Patrol Frequency Intercept',
    shortDesc: 'Decodes Rajasthan State Highway Patrol checkpoint dispatches and roadblocks within 15 km.',
    weightDeltaKg: 6,
    topSpeedDeltaKmh: 0,
    sandFlotation: 80,
    armorRating: 72,
    fuelRangeKm: 675,
    stealthDb: 58,
    icon: 'Wifi',
  },
  {
    id: 'scrambler-jammer',
    name: 'Optical & Radar Countermeasure Scrambler',
    shortDesc: 'Horizon Corridor electronic warfare rig that ghosts vehicle signature from speed traps and automated cameras.',
    weightDeltaKg: 14,
    topSpeedDeltaKmh: -2,
    sandFlotation: 79,
    armorRating: 75,
    fuelRangeKm: 660,
    stealthDb: 34,
    icon: 'ShieldAlert',
  },
];

export const TUNING_PRESETS: { name: string; desc: string; config: VehicleConfigState }[] = [
  {
    name: 'Thar Dune Conqueror',
    desc: 'Max sand flotation with low-pressure paddle tires, 4" long-travel shocks, and aux fuel for deep desert traverses.',
    config: {
      presetName: 'Thar Dune Conqueror',
      livery: 'sandstone-tan',
      tireType: 'dune-paddles',
      tirePsi: 18,
      suspension: 'trophy-40',
      frontBumper: 'factory-tube',
      roofRack: 'expedition-fuel',
      telemetry: 'standard-radio',
    },
  },
  {
    name: 'NH-62 Highway Interceptor',
    desc: 'Lowered, stiffened aerodynamics, nocturnal stealth coat, high tire PSI, and police scanner for high-speed night runs.',
    config: {
      presetName: 'NH-62 Highway Interceptor',
      livery: 'nocturnal-black',
      tireType: 'all-terrain',
      tirePsi: 38,
      suspension: 'interceptor-stiff',
      frontBumper: 'factory-tube',
      roofRack: 'none',
      telemetry: 'police-scanner',
    },
  },
  {
    name: 'Horizon Corridor Infiltrator',
    desc: 'Heavily armored beadlocks, stinger winch, active electronic scrambler, and terracotta camo for covert perimeter breaches.',
    config: {
      presetName: 'Horizon Corridor Infiltrator',
      livery: 'terracotta-red',
      tireType: 'beadlock-crawler',
      tirePsi: 24,
      suspension: 'reservoir-25',
      frontBumper: 'stinger-winch',
      roofRack: 'recon-mast',
      telemetry: 'scrambler-jammer',
    },
  },
];

// Helper to calculate total performance metrics
export function calculateVehicleTelemetry(config: VehicleConfigState) {
  const tire = TIRE_OPTIONS.find((t) => t.id === config.tireType) || TIRE_OPTIONS[0];
  const susp = SUSPENSION_OPTIONS.find((s) => s.id === config.suspension) || SUSPENSION_OPTIONS[0];
  const bumper = BUMPER_OPTIONS.find((b) => b.id === config.frontBumper) || BUMPER_OPTIONS[0];
  const roof = ROOFRACK_OPTIONS.find((r) => r.id === config.roofRack) || ROOFRACK_OPTIONS[0];
  const telem = TELEMETRY_OPTIONS.find((t) => t.id === config.telemetry) || TELEMETRY_OPTIONS[0];

  const totalWeightDelta = tire.weightDeltaKg + susp.weightDeltaKg + bumper.weightDeltaKg + roof.weightDeltaKg + telem.weightDeltaKg;
  const curbWeightKg = 2180 + totalWeightDelta;

  // Base top speed = 175 km/h
  const psiSpeedBonus = (config.tirePsi - 28) * 0.45;
  const topSpeedKmh = Math.round(175 + tire.topSpeedDeltaKmh + susp.topSpeedDeltaKmh + bumper.topSpeedDeltaKmh + roof.topSpeedDeltaKmh + telem.topSpeedDeltaKmh + psiSpeedBonus);

  // 0-100 km/h acceleration (base = 7.8s)
  const weightPenalty = (totalWeightDelta / 100) * 0.35;
  const zeroToHundredSec = Number((7.8 + weightPenalty - (config.suspension === 'interceptor-stiff' ? 0.4 : 0)).toFixed(1));

  // Sand Flotation (0-100%): Low PSI gives huge flotation bonus!
  const psiFlotationBonus = Math.max(0, (32 - config.tirePsi) * 1.5);
  const sandFlotationPct = Math.min(99, Math.round((tire.sandFlotation * 0.45 + susp.sandFlotation * 0.35 + 10) + psiFlotationBonus));

  // Armor Rating (0-100)
  const armorRating = Math.min(100, Math.round(bumper.armorRating * 0.4 + tire.armorRating * 0.3 + susp.armorRating * 0.3));

  // Fuel Range (km)
  const baseRange = 680;
  const fuelBonus = config.roofRack === 'expedition-fuel' ? 210 : config.roofRack === 'recon-mast' ? 90 : 0;
  const fuelRangeKm = baseRange + fuelBonus - Math.round(totalWeightDelta * 0.25);

  // Radar & Acoustic Detectability (dB): Lower is more stealthy!
  const stealthDb = Math.round(telem.stealthDb + (config.roofRack !== 'none' ? 6 : 0) + (config.tireType === 'dune-paddles' ? 5 : 0));

  return {
    curbWeightKg,
    topSpeedKmh,
    zeroToHundredSec,
    sandFlotationPct,
    armorRating,
    fuelRangeKm,
    stealthDb,
    horsePower: 345,
    torqueNm: 750,
  };
}
