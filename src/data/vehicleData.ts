export interface FleetVehicle {
  id: string;
  name: string;
  ref: string;
  topSpeed: string;
  district: string;
  desc: string;
  category: string;
  affinity: 'ARJUN SPEC' | 'KAVYA SPEC' | 'DUAL OPERATIVE';
  brand: string;
  image: string;
  stats: {
    speed: number;
    armor: number;
    handling: number;
    cargo: number;
  };
}

export const fleetData: FleetVehicle[] = [
  {
    "id": "eb39c6b9",
    "name": "Surya-Maru 800 Classic",
    "ref": "Maruti 800",
    "topSpeed": "115 km/h",
    "district": "Jaipur Old City",
    "desc": "Low-profile alley getaway car.",
    "category": "CARS: LOW / ECONOMY",
    "affinity": "DUAL OPERATIVE",
    "brand": "SURYA-MARU",
    "image": "https://picsum.photos/seed/bh_veh_eb39c6b9/800/450",
    "stats": {
      "speed": 41,
      "armor": 56,
      "handling": 59,
      "cargo": 55
    }
  },
  {
    "id": "47f02c2d",
    "name": "Surya-Maru Altiro LX",
    "ref": "Alto K10",
    "topSpeed": "125 km/h",
    "district": "Dausa / Sikar",
    "desc": "Everyday rural commuter hatchback.",
    "category": "CARS: LOW / ECONOMY",
    "affinity": "DUAL OPERATIVE",
    "brand": "SURYA-MARU",
    "image": "https://picsum.photos/seed/bh_veh_47f02c2d/800/450",
    "stats": {
      "speed": 44,
      "armor": 50,
      "handling": 57,
      "cargo": 37
    }
  },
  {
    "id": "2710497d",
    "name": "Tara Nano-Pod CX",
    "ref": "Tata Nano",
    "topSpeed": "105 km/h",
    "district": "Jaipur Markets",
    "desc": "Ultra-compact bazaar infiltrator.",
    "category": "CARS: LOW / ECONOMY",
    "affinity": "DUAL OPERATIVE",
    "brand": "TARA MOTORS",
    "image": "https://picsum.photos/seed/bh_veh_2710497d/800/450",
    "stats": {
      "speed": 37,
      "armor": 37,
      "handling": 50,
      "cargo": 55
    }
  },
  {
    "id": "bdc706dd",
    "name": "Surya-Maru Wagon-Box CNG",
    "ref": "WagonR Taxi",
    "topSpeed": "130 km/h",
    "district": "Ajmer / Kota",
    "desc": "Fleet cab with roof luggage rack; perfect social disguise.",
    "category": "CARS: LOW / ECONOMY",
    "affinity": "DUAL OPERATIVE",
    "brand": "SURYA-MARU",
    "image": "https://picsum.photos/seed/bh_veh_bdc706dd/800/450",
    "stats": {
      "speed": 46,
      "armor": 39,
      "handling": 41,
      "cargo": 58
    }
  },
  {
    "id": "71ccfd2b",
    "name": "Tara Indica-Vista Diesel",
    "ref": "Tata Indica",
    "topSpeed": "135 km/h",
    "district": "Jaipur Ring Road",
    "desc": "High-mileage diesel highway hatchback.",
    "category": "CARS: LOW / ECONOMY",
    "affinity": "DUAL OPERATIVE",
    "brand": "TARA MOTORS",
    "image": "https://picsum.photos/seed/bh_veh_71ccfd2b/800/450",
    "stats": {
      "speed": 48,
      "armor": 30,
      "handling": 53,
      "cargo": 56
    }
  },
  {
    "id": "6f325d8c",
    "name": "Surya-Maru Eeco-Van Cargo",
    "ref": "Maruti Eeco",
    "topSpeed": "120 km/h",
    "district": "Pali / Kota",
    "desc": "Sliding-door micro-van used for covert equipment drops.",
    "category": "CARS: LOW / ECONOMY",
    "affinity": "DUAL OPERATIVE",
    "brand": "SURYA-MARU",
    "image": "https://picsum.photos/seed/bh_veh_6f325d8c/800/450",
    "stats": {
      "speed": 42,
      "armor": 58,
      "handling": 52,
      "cargo": 85
    }
  },
  {
    "id": "c50b2dfd",
    "name": "Mahendra Jeeto-Pax Mini",
    "ref": "Mahindra Supro",
    "topSpeed": "110 km/h",
    "district": "Bundi",
    "desc": "Rural shared passenger van.",
    "category": "CARS: LOW / ECONOMY",
    "affinity": "DUAL OPERATIVE",
    "brand": "MAHENDRA & SONS",
    "image": "https://picsum.photos/seed/bh_veh_c50b2dfd/800/450",
    "stats": {
      "speed": 39,
      "armor": 56,
      "handling": 43,
      "cargo": 48
    }
  },
  {
    "id": "c94ed7b8",
    "name": "Surya-Maru Swift-Desire Tour",
    "ref": "Dzire Tour Yellow-Plate",
    "topSpeed": "145 km/h",
    "district": "Jaipur Airport",
    "desc": "Commercial yellow-plate sedan that blends into airport queues.",
    "category": "CARS: LOW / ECONOMY",
    "affinity": "DUAL OPERATIVE",
    "brand": "SURYA-MARU",
    "image": "https://picsum.photos/seed/bh_veh_c94ed7b8/800/450",
    "stats": {
      "speed": 51,
      "armor": 35,
      "handling": 47,
      "cargo": 54
    }
  },
  {
    "id": "62a008e2",
    "name": "Tara Tiago-NRG Cross",
    "ref": "Tata Tiago NRG",
    "topSpeed": "142 km/h",
    "district": "Sawai Madhopur",
    "desc": "Raised-suspension budget hatch for rough village tracks.",
    "category": "CARS: LOW / ECONOMY",
    "affinity": "DUAL OPERATIVE",
    "brand": "TARA MOTORS",
    "image": "https://picsum.photos/seed/bh_veh_62a008e2/800/450",
    "stats": {
      "speed": 50,
      "armor": 58,
      "handling": 42,
      "cargo": 49
    }
  },
  {
    "id": "64fb9661",
    "name": "Hindustan Monarch Classic",
    "ref": "HM Ambassador",
    "topSpeed": "118 km/h",
    "district": "Jaipur Collectorate",
    "desc": "Vintage steel-bodied bureaucratic sedan with high ramming mass.",
    "category": "CARS: LOW / ECONOMY",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_64fb9661/800/450",
    "stats": {
      "speed": 42,
      "armor": 59,
      "handling": 58,
      "cargo": 44
    }
  },
  {
    "id": "118672f1",
    "name": "Premier Padmini-Cab Retro",
    "ref": "Premier Padmini",
    "topSpeed": "112 km/h",
    "district": "Bundi Old Town",
    "desc": "Classic narrow-lane mechanical relic kept by veteran mechanics.",
    "category": "CARS: LOW / ECONOMY",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_118672f1/800/450",
    "stats": {
      "speed": 40,
      "armor": 55,
      "handling": 61,
      "cargo": 50
    }
  },
  {
    "id": "1bdf6613",
    "name": "Surya-Maru Omni-Shadow",
    "ref": "Maruti Omni",
    "topSpeed": "116 km/h",
    "district": "Kota Industrial",
    "desc": "Infamous utility van with zero electronics to trace.",
    "category": "CARS: LOW / ECONOMY",
    "affinity": "DUAL OPERATIVE",
    "brand": "SURYA-MARU",
    "image": "https://picsum.photos/seed/bh_veh_1bdf6613/800/450",
    "stats": {
      "speed": 41,
      "armor": 48,
      "handling": 55,
      "cargo": 43
    }
  },
  {
    "id": "44791893",
    "name": "Mahendra Bolera Rugged",
    "ref": "Mahindra Bolero",
    "topSpeed": "140 km/h",
    "district": "Dausa / Barmer",
    "desc": "Leaf-spring rural workhorse built to survive unpaved craters.",
    "category": "CARS: MEDIUM / SEDAN & SUV",
    "affinity": "DUAL OPERATIVE",
    "brand": "MAHENDRA & SONS",
    "image": "https://picsum.photos/seed/bh_veh_44791893/800/450",
    "stats": {
      "speed": 50,
      "armor": 33,
      "handling": 47,
      "cargo": 55
    }
  },
  {
    "id": "08bd8d50",
    "name": "Mahendra Scorpina S11",
    "ref": "Mahindra Scorpio Classic",
    "topSpeed": "165 km/h",
    "district": "Jaipur / Jodhpur",
    "desc": "High-stance muscle SUV favored by local fixers and politicians.",
    "category": "CARS: MEDIUM / SEDAN & SUV",
    "affinity": "DUAL OPERATIVE",
    "brand": "MAHENDRA & SONS",
    "image": "https://picsum.photos/seed/bh_veh_08bd8d50/800/450",
    "stats": {
      "speed": 58,
      "armor": 47,
      "handling": 60,
      "cargo": 53
    }
  },
  {
    "id": "481da1cd",
    "name": "Tara Nexa-EV Dark",
    "ref": "Tata Nexon EV",
    "topSpeed": "160 km/h",
    "district": "Jaipur New City",
    "desc": "Silent electric compact SUV ideal for night surveillance tails.",
    "category": "CARS: MEDIUM / SEDAN & SUV",
    "affinity": "DUAL OPERATIVE",
    "brand": "TARA MOTORS",
    "image": "https://picsum.photos/seed/bh_veh_481da1cd/800/450",
    "stats": {
      "speed": 57,
      "armor": 37,
      "handling": 48,
      "cargo": 46
    }
  },
  {
    "id": "7ec61cdf",
    "name": "Surya-Maru Brezza-Urban",
    "ref": "Vitara Brezza",
    "topSpeed": "158 km/h",
    "district": "Kota / Ajmer",
    "desc": "Reliable mid-size city crossover.",
    "category": "CARS: MEDIUM / SEDAN & SUV",
    "affinity": "DUAL OPERATIVE",
    "brand": "SURYA-MARU",
    "image": "https://picsum.photos/seed/bh_veh_7ec61cdf/800/450",
    "stats": {
      "speed": 56,
      "armor": 49,
      "handling": 65,
      "cargo": 60
    }
  },
  {
    "id": "325eecde",
    "name": "Tara Harrier-Kryotec",
    "ref": "Tata Harrier",
    "topSpeed": "180 km/h",
    "district": "Udaipur / Jaipur",
    "desc": "Wide-body highway cruiser with heavy front bash-plate.",
    "category": "CARS: MEDIUM / SEDAN & SUV",
    "affinity": "DUAL OPERATIVE",
    "brand": "TARA MOTORS",
    "image": "https://picsum.photos/seed/bh_veh_325eecde/800/450",
    "stats": {
      "speed": 64,
      "armor": 32,
      "handling": 53,
      "cargo": 45
    }
  },
  {
    "id": "23f23ca4",
    "name": "Mahendra XUV-500 Cheetah",
    "ref": "XUV500",
    "topSpeed": "178 km/h",
    "district": "Jodhpur",
    "desc": "Seven-seater highway pursuit crossover.",
    "category": "CARS: MEDIUM / SEDAN & SUV",
    "affinity": "DUAL OPERATIVE",
    "brand": "MAHENDRA & SONS",
    "image": "https://picsum.photos/seed/bh_veh_23f23ca4/800/450",
    "stats": {
      "speed": 63,
      "armor": 60,
      "handling": 47,
      "cargo": 41
    }
  },
  {
    "id": "ede246f1",
    "name": "Surya-Maru Ciaz-Executive",
    "ref": "Maruti Ciaz",
    "topSpeed": "170 km/h",
    "district": "Jaipur Secretariat",
    "desc": "Mid-tier civil-service sedan with tinted rear glass.",
    "category": "CARS: MEDIUM / SEDAN & SUV",
    "affinity": "DUAL OPERATIVE",
    "brand": "SURYA-MARU",
    "image": "https://picsum.photos/seed/bh_veh_ede246f1/800/450",
    "stats": {
      "speed": 60,
      "armor": 60,
      "handling": 40,
      "cargo": 54
    }
  },
  {
    "id": "08abe2f9",
    "name": "Bharat-Verna Turbo",
    "ref": "Hyundai Verna",
    "topSpeed": "190 km/h",
    "district": "Jaipur Ring Road",
    "desc": "Tuned street-sprint sedan used in Drivers' League night runs.",
    "category": "CARS: MEDIUM / SEDAN & SUV",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_08abe2f9/800/450",
    "stats": {
      "speed": 67,
      "armor": 52,
      "handling": 45,
      "cargo": 37
    }
  },
  {
    "id": "64bf2421",
    "name": "Kaveri Creta-Knight",
    "ref": "Hyundai Creta",
    "topSpeed": "175 km/h",
    "district": "Udaipur / Kota",
    "desc": "Blacked-out urban SUV with panoramic roof camera mount.",
    "category": "CARS: MEDIUM / SEDAN & SUV",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_64bf2421/800/450",
    "stats": {
      "speed": 62,
      "armor": 51,
      "handling": 56,
      "cargo": 56
    }
  },
  {
    "id": "131c3bf4",
    "name": "Mahendra TUV-Battlebox",
    "ref": "TUV300",
    "topSpeed": "148 km/h",
    "district": "Rajsamand Quarries",
    "desc": "Boxy ladder-frame sub-4m tank.",
    "category": "CARS: MEDIUM / SEDAN & SUV",
    "affinity": "DUAL OPERATIVE",
    "brand": "MAHENDRA & SONS",
    "image": "https://picsum.photos/seed/bh_veh_131c3bf4/800/450",
    "stats": {
      "speed": 52,
      "armor": 46,
      "handling": 64,
      "cargo": 51
    }
  },
  {
    "id": "fcf13b61",
    "name": "Tara Sumo-Victa Spacio",
    "ref": "Tata Sumo",
    "topSpeed": "138 km/h",
    "district": "Sikar / Dausa",
    "desc": "Ten-seat inter-village transport mule.",
    "category": "CARS: MEDIUM / SEDAN & SUV",
    "affinity": "DUAL OPERATIVE",
    "brand": "TARA MOTORS",
    "image": "https://picsum.photos/seed/bh_veh_fcf13b61/800/450",
    "stats": {
      "speed": 49,
      "armor": 54,
      "handling": 62,
      "cargo": 34
    }
  },
  {
    "id": "31fbdbc3",
    "name": "Surya-Maru Gypsy-King 4WD",
    "ref": "Maruti Gypsy",
    "topSpeed": "145 km/h",
    "district": "Sawai Madhopur / Jaisalmer",
    "desc": "Lightweight soft-top 4x4 capable of climbing rocky ridges.",
    "category": "CARS: MEDIUM / SEDAN & SUV",
    "affinity": "DUAL OPERATIVE",
    "brand": "SURYA-MARU",
    "image": "https://picsum.photos/seed/bh_veh_31fbdbc3/800/450",
    "stats": {
      "speed": 51,
      "armor": 94,
      "handling": 75,
      "cargo": 50
    }
  },
  {
    "id": "f9f93191",
    "name": "Mahendra Thar-Roxx 4x4",
    "ref": "Mahindra Thar",
    "topSpeed": "168 km/h",
    "district": "All Districts",
    "desc": "Custom lift-kit, snorkel, winch, and reinforced roll-cage.",
    "category": "CARS: LUXURY & ARMORED 4X4",
    "affinity": "ARJUN SPEC",
    "brand": "MAHENDRA & SONS",
    "image": "https://picsum.photos/seed/bh_veh_f9f93191/800/450",
    "stats": {
      "speed": 60,
      "armor": 32,
      "handling": 48,
      "cargo": 30
    }
  },
  {
    "id": "ec78ebad",
    "name": "Tara Safari-Storme VIP",
    "ref": "Tata Safari",
    "topSpeed": "185 km/h",
    "district": "Jaipur / Udaipur",
    "desc": "Flagship SUV with strobe-light grille slots.",
    "category": "CARS: LUXURY & ARMORED 4X4",
    "affinity": "DUAL OPERATIVE",
    "brand": "TARA MOTORS",
    "image": "https://picsum.photos/seed/bh_veh_ec78ebad/800/450",
    "stats": {
      "speed": 66,
      "armor": 59,
      "handling": 67,
      "cargo": 30
    }
  },
  {
    "id": "32a73b50",
    "name": "Mahendra Scorpina-N Carbon",
    "ref": "Scorpio-N",
    "topSpeed": "188 km/h",
    "district": "Jodhpur / Barmer",
    "desc": "Body-on-frame 4x4 used by Horizon Cell squad leaders.",
    "category": "CARS: LUXURY & ARMORED 4X4",
    "affinity": "DUAL OPERATIVE",
    "brand": "MAHENDRA & SONS",
    "image": "https://picsum.photos/seed/bh_veh_32a73b50/800/450",
    "stats": {
      "speed": 67,
      "armor": 52,
      "handling": 49,
      "cargo": 33
    }
  },
  {
    "id": "33c297b3",
    "name": "Toyo Fortuner-Legender (\"Politician Spec\")",
    "ref": "Toyota Fortuner",
    "topSpeed": "195 km/h",
    "district": "All Highways",
    "desc": "Pearl-white flagship SUV that intimidates toll-booth staff automatically.",
    "category": "CARS: LUXURY & ARMORED 4X4",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_33c297b3/800/450",
    "stats": {
      "speed": 69,
      "armor": 31,
      "handling": 70,
      "cargo": 41
    }
  },
  {
    "id": "11f29b9d",
    "name": "Mahendra XUV-700 Adreno",
    "ref": "XUV700",
    "topSpeed": "200 km/h",
    "district": "Jaipur-Udaipur NH",
    "desc": "High-speed AWD cruiser with radar dash-HUD.",
    "category": "CARS: LUXURY & ARMORED 4X4",
    "affinity": "DUAL OPERATIVE",
    "brand": "MAHENDRA & SONS",
    "image": "https://picsum.photos/seed/bh_veh_11f29b9d/800/450",
    "stats": {
      "speed": 71,
      "armor": 43,
      "handling": 46,
      "cargo": 59
    }
  },
  {
    "id": "87abe053",
    "name": "Vardhan Meridian Sentinel V8 (Khandelwal Spec)",
    "ref": "Armored Land Cruiser",
    "topSpeed": "190 km/h",
    "district": "Horizon Facilities",
    "desc": "Bullet-resistant B6 glass, run-flat tires, and encrypted radio array.",
    "category": "CARS: LUXURY & ARMORED 4X4",
    "affinity": "DUAL OPERATIVE",
    "brand": "VARDHAN MERIDIAN FLEET",
    "image": "https://picsum.photos/seed/bh_veh_87abe053/800/450",
    "stats": {
      "speed": 67,
      "armor": 37,
      "handling": 63,
      "cargo": 54
    }
  },
  {
    "id": "71b03e0b",
    "name": "JLR Prithvi-Rover Autobiography",
    "ref": "Range Rover",
    "topSpeed": "225 km/h",
    "district": "Udaipur Luxury Hotels",
    "desc": "Vikram Vardhan's executive convoy flagship.",
    "category": "CARS: LUXURY & ARMORED 4X4",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_71b03e0b/800/450",
    "stats": {
      "speed": 80,
      "armor": 51,
      "handling": 74,
      "cargo": 41
    }
  },
  {
    "id": "b26e0baa",
    "name": "Mercer-Bharath S-Guard Limo",
    "ref": "S-Class Maybach",
    "topSpeed": "230 km/h",
    "district": "Jaipur Airport VIP",
    "desc": "Ultra-luxury corporate sedan for boardroom social stealth missions.",
    "category": "CARS: LUXURY & ARMORED 4X4",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_b26e0baa/800/450",
    "stats": {
      "speed": 82,
      "armor": 32,
      "handling": 58,
      "cargo": 56
    }
  },
  {
    "id": "4f0805e1",
    "name": "Bavaria M5-Thar Edition",
    "ref": "BMW M5",
    "topSpeed": "265 km/h",
    "district": "Jaipur Ring Road",
    "desc": "Imported super-sedan unlocked via Drivers' League finale.",
    "category": "CARS: LUXURY & ARMORED 4X4",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_4f0805e1/800/450",
    "stats": {
      "speed": 94,
      "armor": 51,
      "handling": 65,
      "cargo": 52
    }
  },
  {
    "id": "daef1b2e",
    "name": "Gurkha-Force Extreme 4x4x4",
    "ref": "Force Gurkha",
    "topSpeed": "150 km/h",
    "district": "Jaisalmer Deep Dunes",
    "desc": "Factory differential locks and roof rack for deep-desert survival.",
    "category": "CARS: LUXURY & ARMORED 4X4",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_daef1b2e/800/450",
    "stats": {
      "speed": 53,
      "armor": 54,
      "handling": 69,
      "cargo": 59
    }
  },
  {
    "id": "ff0de4b8",
    "name": "Rajputana Classic-350 Cast-Iron",
    "ref": "Royal Enfield Classic 350",
    "topSpeed": "120 km/h",
    "district": "All Districts",
    "desc": "Heavy thumping cruiser; stable on gravel and sand edges.",
    "category": "BIKES & SCOOTERS",
    "affinity": "DUAL OPERATIVE",
    "brand": "RAJPUTANA ROYAL",
    "image": "https://picsum.photos/seed/bh_veh_ff0de4b8/800/450",
    "stats": {
      "speed": 42,
      "armor": 42,
      "handling": 71,
      "cargo": 51
    }
  },
  {
    "id": "a9fdfb48",
    "name": "Rajputana Bullet-Standard 500",
    "ref": "RE Bullet 500",
    "topSpeed": "130 km/h",
    "district": "Jodhpur / Bundi",
    "desc": "High-torque vintage iron frame.",
    "category": "BIKES & SCOOTERS",
    "affinity": "DUAL OPERATIVE",
    "brand": "RAJPUTANA ROYAL",
    "image": "https://picsum.photos/seed/bh_veh_a9fdfb48/800/450",
    "stats": {
      "speed": 46,
      "armor": 59,
      "handling": 64,
      "cargo": 37
    }
  },
  {
    "id": "132d86d6",
    "name": "Rajputana Himadri-450 Rally",
    "ref": "RE Himalayan",
    "topSpeed": "145 km/h",
    "district": "Udaipur Hills / Barmer",
    "desc": "Long-travel adventure bike built for rocky ridge trails (Kavya favorite).",
    "category": "BIKES & SCOOTERS",
    "affinity": "DUAL OPERATIVE",
    "brand": "RAJPUTANA ROYAL",
    "image": "https://picsum.photos/seed/bh_veh_132d86d6/800/450",
    "stats": {
      "speed": 51,
      "armor": 53,
      "handling": 58,
      "cargo": 39
    }
  },
  {
    "id": "95d05aa7",
    "name": "Rajputana Continental-GT Cafe",
    "ref": "RE Continental GT 650",
    "topSpeed": "170 km/h",
    "district": "Jaipur Night Sprint",
    "desc": "Twin-cylinder cafe racer.",
    "category": "BIKES & SCOOTERS",
    "affinity": "DUAL OPERATIVE",
    "brand": "RAJPUTANA ROYAL",
    "image": "https://picsum.photos/seed/bh_veh_95d05aa7/800/450",
    "stats": {
      "speed": 60,
      "armor": 59,
      "handling": 52,
      "cargo": 44
    }
  },
  {
    "id": "b2905aa5",
    "name": "Shakti Splendor-Plus Commuter",
    "ref": "Hero Splendor",
    "topSpeed": "95 km/h",
    "district": "Every Village & City",
    "desc": "80 km/l fuel economy; blends into any crowd instantly.",
    "category": "BIKES & SCOOTERS",
    "affinity": "DUAL OPERATIVE",
    "brand": "SHAKTI MOTO",
    "image": "https://picsum.photos/seed/bh_veh_b2905aa5/800/450",
    "stats": {
      "speed": 33,
      "armor": 50,
      "handling": 61,
      "cargo": 36
    }
  },
  {
    "id": "0fc11ebe",
    "name": "Chetak-Bajra Pulsar-220F Fairing",
    "ref": "Bajaj Pulsar 220F",
    "topSpeed": "144 km/h",
    "district": "Kota / Jaipur",
    "desc": "Street-fighter motorcycle favored by night couriers.",
    "category": "BIKES & SCOOTERS",
    "affinity": "DUAL OPERATIVE",
    "brand": "CHETAK-BAJRA",
    "image": "https://picsum.photos/seed/bh_veh_0fc11ebe/800/450",
    "stats": {
      "speed": 51,
      "armor": 57,
      "handling": 67,
      "cargo": 56
    }
  },
  {
    "id": "e46e1c43",
    "name": "Kaveri Apache-RTR Track",
    "ref": "TVS Apache RTR",
    "topSpeed": "150 km/h",
    "district": "Ajmer / Kota",
    "desc": "Agile urban pursuit motorcycle.",
    "category": "BIKES & SCOOTERS",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_e46e1c43/800/450",
    "stats": {
      "speed": 53,
      "armor": 50,
      "handling": 48,
      "cargo": 30
    }
  },
  {
    "id": "2aba3f75",
    "name": "Duke-Bharat 390 Street",
    "ref": "KTM Duke 390",
    "topSpeed": "168 km/h",
    "district": "Jaipur University",
    "desc": "High-revving hooligan bike for rooftop/stairway escapes.",
    "category": "BIKES & SCOOTERS",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_2aba3f75/800/450",
    "stats": {
      "speed": 60,
      "armor": 47,
      "handling": 75,
      "cargo": 41
    }
  },
  {
    "id": "3d9fb2cc",
    "name": "Yama-RX100 Two-Stroke Legend",
    "ref": "Yamaha RX100",
    "topSpeed": "115 km/h",
    "district": "Old Jaipur Market",
    "desc": "Featherweight 2-stroke pocket rocket for bazaar foot-chase routes.",
    "category": "BIKES & SCOOTERS",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_3d9fb2cc/800/450",
    "stats": {
      "speed": 41,
      "armor": 43,
      "handling": 41,
      "cargo": 32
    }
  },
  {
    "id": "df0ceecf",
    "name": "Shakti Activa-125 MetalBody",
    "ref": "Honda Activa",
    "topSpeed": "90 km/h",
    "district": "Udaipur / Jaipur",
    "desc": "Quiet automatic scooter with under-seat camera bag storage.",
    "category": "BIKES & SCOOTERS",
    "affinity": "KAVYA SPEC",
    "brand": "SHAKTI MOTO",
    "image": "https://picsum.photos/seed/bh_veh_df0ceecf/800/450",
    "stats": {
      "speed": 32,
      "armor": 49,
      "handling": 72,
      "cargo": 57
    }
  },
  {
    "id": "9f78bd9a",
    "name": "Chetak-Electric Neo",
    "ref": "Bajaj Chetak EV",
    "topSpeed": "85 km/h",
    "district": "Udaipur Old City",
    "desc": "Retro-styled silent electric scooter for zero-noise stealth tails.",
    "category": "BIKES & SCOOTERS",
    "affinity": "DUAL OPERATIVE",
    "brand": "CHETAK-BAJRA",
    "image": "https://picsum.photos/seed/bh_veh_9f78bd9a/800/450",
    "stats": {
      "speed": 30,
      "armor": 49,
      "handling": 50,
      "cargo": 58
    }
  },
  {
    "id": "6318ab76",
    "name": "Oli-S1 Pro Hyper-Scoot",
    "ref": "Ola S1 Pro",
    "topSpeed": "115 km/h",
    "district": "Jaipur Tech Park",
    "desc": "High-acceleration digital electric scooter.",
    "category": "BIKES & SCOOTERS",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_6318ab76/800/450",
    "stats": {
      "speed": 41,
      "armor": 18,
      "handling": 53,
      "cargo": 35
    }
  },
  {
    "id": "8d4e9a69",
    "name": "Shakti X-Pulse 200 Dirt",
    "ref": "Hero XPulse 200",
    "topSpeed": "128 km/h",
    "district": "Rajsamand Quarries",
    "desc": "Lightweight dual-sport scrambler.",
    "category": "BIKES & SCOOTERS",
    "affinity": "DUAL OPERATIVE",
    "brand": "SHAKTI MOTO",
    "image": "https://picsum.photos/seed/bh_veh_8d4e9a69/800/450",
    "stats": {
      "speed": 45,
      "armor": 53,
      "handling": 57,
      "cargo": 34
    }
  },
  {
    "id": "6b8e57ce",
    "name": "Jawa-Yezdi Roadking Twin",
    "ref": "Yezdi Roadking",
    "topSpeed": "132 km/h",
    "district": "Pali / Jodhpur",
    "desc": "Classic twin-exhaust highway motorcycle.",
    "category": "BIKES & SCOOTERS",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_6b8e57ce/800/450",
    "stats": {
      "speed": 47,
      "armor": 32,
      "handling": 40,
      "cargo": 33
    }
  },
  {
    "id": "a1e6aba4",
    "name": "Chetak-Bajra RE-Auto (Jaipur Green/Yellow)",
    "ref": "Bajaj RE Auto",
    "topSpeed": "65 km/h",
    "district": "Jaipur / Kota",
    "desc": "Can U-turn in 2.8 meters; ultimate crowded market getaway vehicle.",
    "category": "AUTO & LOCAL TRANSIT",
    "affinity": "DUAL OPERATIVE",
    "brand": "CHETAK-BAJRA",
    "image": "https://picsum.photos/seed/bh_veh_a1e6aba4/800/450",
    "stats": {
      "speed": 23,
      "armor": 53,
      "handling": 74,
      "cargo": 48
    }
  },
  {
    "id": "7411f275",
    "name": "Tirupati E-Rickshaw (\"Toto\")",
    "ref": "Indian E-Rickshaw",
    "topSpeed": "35 km/h",
    "district": "Bundi / Ajmer Lanes",
    "desc": "Silent battery rickshaw for narrow heritage alleys.",
    "category": "AUTO & LOCAL TRANSIT",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_7411f275/800/450",
    "stats": {
      "speed": 12,
      "armor": 33,
      "handling": 69,
      "cargo": 43
    }
  },
  {
    "id": "a0427668",
    "name": "Vikram-Diesel Tempo (\"Bada Auto\")",
    "ref": "Vikram 3-Wheeler",
    "topSpeed": "58 km/h",
    "district": "Dausa / Sikar",
    "desc": "Shared 8-passenger rural diesel three-wheeler.",
    "category": "AUTO & LOCAL TRANSIT",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_a0427668/800/450",
    "stats": {
      "speed": 20,
      "armor": 48,
      "handling": 63,
      "cargo": 46
    }
  },
  {
    "id": "db6c74f3",
    "name": "Piaggio-Ape Cargo 3W",
    "ref": "Ape Xtra LDX",
    "topSpeed": "55 km/h",
    "district": "Pali Textile Market",
    "desc": "Three-wheeled flatbed for smuggling server crates through bazaars.",
    "category": "AUTO & LOCAL TRANSIT",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_db6c74f3/800/450",
    "stats": {
      "speed": 19,
      "armor": 52,
      "handling": 47,
      "cargo": 100
    }
  },
  {
    "id": "e4d1fb8c",
    "name": "Jugaad Rural Farm-Cart",
    "ref": "Rajasthani Diesel Pump Cart",
    "topSpeed": "45 km/h",
    "district": "Rural Dausa / Barmer",
    "desc": "Improvised water-pump engine bolted to a wooden flatbed.",
    "category": "AUTO & LOCAL TRANSIT",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_e4d1fb8c/800/450",
    "stats": {
      "speed": 16,
      "armor": 30,
      "handling": 43,
      "cargo": 59
    }
  },
  {
    "id": "64c38d6a",
    "name": "Force-Trax Toofan 12-Seater",
    "ref": "Force Trax Cruiser",
    "topSpeed": "115 km/h",
    "district": "Inter-Village Routes",
    "desc": "Long-wheelbase rural people-mover.",
    "category": "AUTO & LOCAL TRANSIT",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_64c38d6a/800/450",
    "stats": {
      "speed": 41,
      "armor": 32,
      "handling": 61,
      "cargo": 33
    }
  },
  {
    "id": "83728dd5",
    "name": "Tara Ace \"Chota Hathi\" Mini-Truck",
    "ref": "Tata Ace",
    "topSpeed": "80 km/h",
    "district": "Jaipur Markets",
    "desc": "Small last-mile delivery truck.",
    "category": "TRUCKS & HEAVY FREIGHT",
    "affinity": "DUAL OPERATIVE",
    "brand": "TARA MOTORS",
    "image": "https://picsum.photos/seed/bh_veh_83728dd5/800/450",
    "stats": {
      "speed": 28,
      "armor": 88,
      "handling": 24,
      "cargo": 92
    }
  },
  {
    "id": "ee636d44",
    "name": "Mahendra Bolera Pik-Up 4WD",
    "ref": "Mahindra Bolero Pik-Up",
    "topSpeed": "120 km/h",
    "district": "Dausa / Mandi",
    "desc": "Overloaded flatbed pickup with wooden side-rails.",
    "category": "TRUCKS & HEAVY FREIGHT",
    "affinity": "DUAL OPERATIVE",
    "brand": "MAHENDRA & SONS",
    "image": "https://picsum.photos/seed/bh_veh_ee636d44/800/450",
    "stats": {
      "speed": 42,
      "armor": 78,
      "handling": 57,
      "cargo": 53
    }
  },
  {
    "id": "81f80ff7",
    "name": "Tara 1613 LPT Cargo",
    "ref": "Tata LPT 1613",
    "topSpeed": "98 km/h",
    "district": "Jaipur Industrial Yard",
    "desc": "6-wheel medium freight truck from Mission 1 (*The Last Delivery*).",
    "category": "TRUCKS & HEAVY FREIGHT",
    "affinity": "ARJUN SPEC",
    "brand": "TARA MOTORS",
    "image": "https://picsum.photos/seed/bh_veh_81f80ff7/800/450",
    "stats": {
      "speed": 35,
      "armor": 56,
      "handling": 58,
      "cargo": 90
    }
  },
  {
    "id": "fe717156",
    "name": "Ashoka Viking 12-Wheel Hauler (\"Horn Please\")",
    "ref": "Ashok Leyland 3118",
    "topSpeed": "92 km/h",
    "district": "NH-48 / Kota",
    "desc": "Decorated wooden-cabin national permit truck.",
    "category": "TRUCKS & HEAVY FREIGHT",
    "affinity": "DUAL OPERATIVE",
    "brand": "ASHOKA HEAVY",
    "image": "https://picsum.photos/seed/bh_veh_fe717156/800/450",
    "stats": {
      "speed": 32,
      "armor": 53,
      "handling": 48,
      "cargo": 47
    }
  },
  {
    "id": "d39de58e",
    "name": "Tara Signa 4923 Container Rig",
    "ref": "Tata Signa 4923.S",
    "topSpeed": "95 km/h",
    "district": "Inland Container Depots",
    "desc": "40-foot sealed Horizon Meridian container tractor-trailer.",
    "category": "TRUCKS & HEAVY FREIGHT",
    "affinity": "DUAL OPERATIVE",
    "brand": "TARA MOTORS",
    "image": "https://picsum.photos/seed/bh_veh_d39de58e/800/450",
    "stats": {
      "speed": 33,
      "armor": 77,
      "handling": 70,
      "cargo": 100
    }
  },
  {
    "id": "ade5c8b5",
    "name": "Eklavya Pro-3015 Cold-Chain",
    "ref": "Eicher Pro 3015",
    "topSpeed": "100 km/h",
    "district": "Pali / Ajmer",
    "desc": "Refrigerated box truck used as a decoy server carrier.",
    "category": "TRUCKS & HEAVY FREIGHT",
    "affinity": "DUAL OPERATIVE",
    "brand": "EKLAVYA COMMERCIAL",
    "image": "https://picsum.photos/seed/bh_veh_ade5c8b5/800/450",
    "stats": {
      "speed": 35,
      "armor": 47,
      "handling": 42,
      "cargo": 43
    }
  },
  {
    "id": "5fd7e941",
    "name": "BharatBenz 3528C Quarry Tipper",
    "ref": "BharatBenz Dumper",
    "topSpeed": "85 km/h",
    "district": "Rajsamand Marble Quarries",
    "desc": "Heavy hydraulic rock-dump truck capable of crushing roadblocks.",
    "category": "TRUCKS & HEAVY FREIGHT",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_5fd7e941/800/450",
    "stats": {
      "speed": 30,
      "armor": 58,
      "handling": 51,
      "cargo": 36
    }
  },
  {
    "id": "d404f293",
    "name": "Ashoka Petro-Tanker 24KL",
    "ref": "Indian Oil/HP Fuel Tanker",
    "topSpeed": "88 km/h",
    "district": "Barmer Refinery Route",
    "desc": "Volatile fuel carrier used in Chapter 7 pipeline missions.",
    "category": "TRUCKS & HEAVY FREIGHT",
    "affinity": "DUAL OPERATIVE",
    "brand": "ASHOKA HEAVY",
    "image": "https://picsum.photos/seed/bh_veh_d404f293/800/450",
    "stats": {
      "speed": 31,
      "armor": 73,
      "handling": 68,
      "cargo": 50
    }
  },
  {
    "id": "f1e2f849",
    "name": "Mehta Garage Heavy Wrecker",
    "ref": "Tata 1212 Recovery",
    "topSpeed": "94 km/h",
    "district": "Mehta Garage",
    "desc": "Hydraulic crane and wheel-lift for vehicle recovery side missions.",
    "category": "TRUCKS & HEAVY FREIGHT",
    "affinity": "ARJUN SPEC",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_f1e2f849/800/450",
    "stats": {
      "speed": 33,
      "armor": 93,
      "handling": 53,
      "cargo": 57
    }
  },
  {
    "id": "e2036799",
    "name": "Sonalika-Swaraj 855 Farm Tractor",
    "ref": "Swaraj 855 FE",
    "topSpeed": "42 km/h",
    "district": "Sikar / Dausa Farms",
    "desc": "High-torque agricultural tractor with trolley hitch.",
    "category": "TRUCKS & HEAVY FREIGHT",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_e2036799/800/450",
    "stats": {
      "speed": 15,
      "armor": 31,
      "handling": 61,
      "cargo": 50
    }
  },
  {
    "id": "19f8a1f8",
    "name": "JCB-Bharat 3DX Backhoe Loader",
    "ref": "JCB 3DX",
    "topSpeed": "38 km/h",
    "district": "Horizon Construction Sites",
    "desc": "Armored front bucket used in *Sandline* blockade missions.",
    "category": "TRUCKS & HEAVY FREIGHT",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_19f8a1f8/800/450",
    "stats": {
      "speed": 13,
      "armor": 49,
      "handling": 42,
      "cargo": 34
    }
  },
  {
    "id": "4df4e6e4",
    "name": "Vardhan Mobile Command Rig (Chapter 9 Boss)",
    "ref": "Armored 8x8 Server Truck",
    "topSpeed": "110 km/h",
    "district": "Jaisalmer Highway",
    "desc": "Rolling EMP-shielded data vault from Mission 117 (*Command Vehicle*).",
    "category": "TRUCKS & HEAVY FREIGHT",
    "affinity": "DUAL OPERATIVE",
    "brand": "VARDHAN MERIDIAN FLEET",
    "image": "https://picsum.photos/seed/bh_veh_4df4e6e4/800/450",
    "stats": {
      "speed": 39,
      "armor": 90,
      "handling": 45,
      "cargo": 94
    }
  },
  {
    "id": "33a2e697",
    "name": "RSRTC \"Rajasthan Roadways\" Express",
    "ref": "State Transport Bus",
    "topSpeed": "95 km/h",
    "district": "All District Terminals",
    "desc": "Blue-and-white state bus that stops at every rural stand.",
    "category": "BUSES & COACHES",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_33a2e697/800/450",
    "stats": {
      "speed": 33,
      "armor": 38,
      "handling": 55,
      "cargo": 37
    }
  },
  {
    "id": "9e0dfad7",
    "name": "JCTSL Jaipur Low-Floor City Bus",
    "ref": "Tata Marcopolo City Bus",
    "topSpeed": "85 km/h",
    "district": "Jaipur Urban Routes",
    "desc": "Wide-door city transit bus.",
    "category": "BUSES & COACHES",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_9e0dfad7/800/450",
    "stats": {
      "speed": 30,
      "armor": 33,
      "handling": 49,
      "cargo": 58
    }
  },
  {
    "id": "392caf55",
    "name": "Mewar Travels Multi-Axle Sleeper (\"Night Bus\")",
    "ref": "Volvo B11R Sleeper",
    "topSpeed": "125 km/h",
    "district": "Udaipur\u2013Jaipur Highway",
    "desc": "Featured in Mission 6 (*Night Bus*) & Mission 20 (*The Last Bus*).",
    "category": "BUSES & COACHES",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_392caf55/800/450",
    "stats": {
      "speed": 44,
      "armor": 43,
      "handling": 51,
      "cargo": 40
    }
  },
  {
    "id": "edb95ad2",
    "name": "Ashoka Yellow School Bus",
    "ref": "Ashok Leyland Sunshine",
    "topSpeed": "80 km/h",
    "district": "Sikar / Jaipur",
    "desc": "Creates dynamic morning/afternoon traffic spikes.",
    "category": "BUSES & COACHES",
    "affinity": "DUAL OPERATIVE",
    "brand": "ASHOKA HEAVY",
    "image": "https://picsum.photos/seed/bh_veh_edb95ad2/800/450",
    "stats": {
      "speed": 28,
      "armor": 32,
      "handling": 48,
      "cargo": 56
    }
  },
  {
    "id": "882faf90",
    "name": "Force Traveller-26 Tourist Minibus",
    "ref": "Tempo Traveller",
    "topSpeed": "110 km/h",
    "district": "Ajmer / Pushkar / Udaipur",
    "desc": "Hotel shuttle and wedding-guest transport van.",
    "category": "BUSES & COACHES",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_882faf90/800/450",
    "stats": {
      "speed": 39,
      "armor": 49,
      "handling": 58,
      "cargo": 36
    }
  },
  {
    "id": "d51e7d18",
    "name": "Desert-Star Rural Roof-Rider Bus",
    "ref": "Private Rural Stage Carriage",
    "topSpeed": "88 km/h",
    "district": "Barmer / Jaisalmer",
    "desc": "Packed desert route bus carrying cargo on the roof rack.",
    "category": "BUSES & COACHES",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_d51e7d18/800/450",
    "stats": {
      "speed": 31,
      "armor": 47,
      "handling": 50,
      "cargo": 54
    }
  },
  {
    "id": "f1b0ec97",
    "name": "Rajasthan Police Highway Interceptor",
    "ref": "Scorpio Police PCR",
    "topSpeed": "175 km/h",
    "district": "Highway Checkpoints",
    "desc": "Equipped with ANPR license-plate scanner and roof siren bar.",
    "category": "POLICE & EMERGENCY",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_f1b0ec97/800/450",
    "stats": {
      "speed": 62,
      "armor": 53,
      "handling": 46,
      "cargo": 39
    }
  },
  {
    "id": "f95665ed",
    "name": "Jaipur City PCR Bolera Patrol",
    "ref": "Bolero Police Van",
    "topSpeed": "140 km/h",
    "district": "Urban Stations",
    "desc": "Standard district patrol response unit.",
    "category": "POLICE & EMERGENCY",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_f95665ed/800/450",
    "stats": {
      "speed": 50,
      "armor": 55,
      "handling": 51,
      "cargo": 53
    }
  },
  {
    "id": "7811870e",
    "name": "Inspector Aditi Chauhan\u2019s Unmarked Sedan",
    "ref": "Unmarked Ciaz/Verna",
    "topSpeed": "185 km/h",
    "district": "Jaipur Crime Branch",
    "desc": "Dash-strobe detective car with police radio scanner.",
    "category": "POLICE & EMERGENCY",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_7811870e/800/450",
    "stats": {
      "speed": 66,
      "armor": 41,
      "handling": 71,
      "cargo": 51
    }
  },
  {
    "id": "02f32e6d",
    "name": "State Armed Force Riot Vajra Van",
    "ref": "Tata Armored Troop Carrier",
    "topSpeed": "95 km/h",
    "district": "High-Heat Lockdowns",
    "desc": "Deployed when District Heat exceeds 80%.",
    "category": "POLICE & EMERGENCY",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_02f32e6d/800/450",
    "stats": {
      "speed": 33,
      "armor": 57,
      "handling": 58,
      "cargo": 82
    }
  },
  {
    "id": "edd22a16",
    "name": "108 Sanjeevani Emergency Ambulance",
    "ref": "Force Traveller Ambulance",
    "topSpeed": "120 km/h",
    "district": "District Hospitals",
    "desc": "Grants hospital access and bypasses toll gates with sirens active.",
    "category": "POLICE & EMERGENCY",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_edd22a16/800/450",
    "stats": {
      "speed": 42,
      "armor": 49,
      "handling": 66,
      "cargo": 52
    }
  },
  {
    "id": "692daa0b",
    "name": "Jaipur Municipal Fire Tender",
    "ref": "Tata 1615 Water Bowser",
    "topSpeed": "90 km/h",
    "district": "Fire Stations",
    "desc": "Responds during Mission 7 (*The Garage Fire*) and warehouse arsons.",
    "category": "POLICE & EMERGENCY",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_692daa0b/800/450",
    "stats": {
      "speed": 32,
      "armor": 55,
      "handling": 48,
      "cargo": 50
    }
  },
  {
    "id": "384ced24",
    "name": "Vande-Marwar Semi-High-Speed Express",
    "ref": "Vande Bharat Express",
    "topSpeed": "160 km/h",
    "district": "Jaipur\u2013Ajmer\u2013Udaipur Line",
    "desc": "Aerodynamic white-and-orange electric chair-car trainset.",
    "category": "TRAINS & RAIL",
    "affinity": "DUAL OPERATIVE",
    "brand": "BHARAT-RAIL",
    "image": "https://picsum.photos/seed/bh_veh_384ced24/800/450",
    "stats": {
      "speed": 57,
      "armor": 52,
      "handling": 71,
      "cargo": 91
    }
  },
  {
    "id": "ca85fe8b",
    "name": "WAG-12B Heavy Twin-Section Freight",
    "ref": "Indian Railways WAG-12",
    "topSpeed": "120 km/h",
    "district": "Kota\u2013Pali Freight Corridor",
    "desc": "12,000 HP electric locomotive hauling 90 double-stack containers.",
    "category": "TRAINS & RAIL",
    "affinity": "DUAL OPERATIVE",
    "brand": "BHARAT-RAIL",
    "image": "https://picsum.photos/seed/bh_veh_ca85fe8b/800/450",
    "stats": {
      "speed": 42,
      "armor": 94,
      "handling": 61,
      "cargo": 60
    }
  },
  {
    "id": "aabc7f91",
    "name": "WDP-4D \"Thar Link\" Diesel Locomotive",
    "ref": "EMD WDP-4D",
    "topSpeed": "130 km/h",
    "district": "Jodhpur\u2013Jaisalmer Desert Rail",
    "desc": "Dual-cab diesel hauler crossing desert tracks.",
    "category": "TRAINS & RAIL",
    "affinity": "DUAL OPERATIVE",
    "brand": "BHARAT-RAIL",
    "image": "https://picsum.photos/seed/bh_veh_aabc7f91/800/450",
    "stats": {
      "speed": 46,
      "armor": 56,
      "handling": 48,
      "cargo": 32
    }
  },
  {
    "id": "c53dc1a7",
    "name": "Palace-on-Dunes Heritage Luxury Train",
    "ref": "Palace on Wheels",
    "topSpeed": "110 km/h",
    "district": "Sawai Madhopur / Udaipur",
    "desc": "Mobile social-stealth environment for elite investor missions.",
    "category": "TRAINS & RAIL",
    "affinity": "DUAL OPERATIVE",
    "brand": "BHARAT-RAIL",
    "image": "https://picsum.photos/seed/bh_veh_c53dc1a7/800/450",
    "stats": {
      "speed": 39,
      "armor": 37,
      "handling": 27,
      "cargo": 96
    }
  },
  {
    "id": "b57862da",
    "name": "Plasser Track-Maintenance Tower Car",
    "ref": "OHE Inspection Car",
    "topSpeed": "75 km/h",
    "district": "Kota Rail Yard",
    "desc": "Drivable yellow rail-yard inspection vehicle used in *The Freight Switch*.",
    "category": "TRAINS & RAIL",
    "affinity": "DUAL OPERATIVE",
    "brand": "BHARAT-RAIL",
    "image": "https://picsum.photos/seed/bh_veh_b57862da/800/450",
    "stats": {
      "speed": 26,
      "armor": 45,
      "handling": 71,
      "cargo": 32
    }
  },
  {
    "id": "acef74ae",
    "name": "PinkCity Metro 4-Car Stainless Trainset",
    "ref": "Jaipur Metro BEML",
    "topSpeed": "80 km/h",
    "district": "Jaipur Elevated/Underground",
    "desc": "Playable transit & evacuation interior in Chapter 1\u20132.",
    "category": "METRO TRANSIT",
    "affinity": "DUAL OPERATIVE",
    "brand": "PINKCITY METRO CORP",
    "image": "https://picsum.photos/seed/bh_veh_acef74ae/800/450",
    "stats": {
      "speed": 28,
      "armor": 40,
      "handling": 14,
      "cargo": 83
    }
  },
  {
    "id": "60b4ed7d",
    "name": "PinkCity Metro Night Maintenance Shunter",
    "ref": "Metro Tunnel Locomotive",
    "topSpeed": "50 km/h",
    "district": "Jaipur Metro Depot",
    "desc": "Used to infiltrate underground server conduits after hours.",
    "category": "METRO TRANSIT",
    "affinity": "DUAL OPERATIVE",
    "brand": "PINKCITY METRO CORP",
    "image": "https://picsum.photos/seed/bh_veh_60b4ed7d/800/450",
    "stats": {
      "speed": 17,
      "armor": 55,
      "handling": 53,
      "cargo": 51
    }
  },
  {
    "id": "52158ac1",
    "name": "East-Meridian Airport Express Monorail",
    "ref": "International Act Transit",
    "topSpeed": "100 km/h",
    "district": "International Expansion",
    "desc": "High-speed terminal link train.",
    "category": "METRO TRANSIT",
    "affinity": "DUAL OPERATIVE",
    "brand": "CUSTOM / OTHER",
    "image": "https://picsum.photos/seed/bh_veh_52158ac1/800/450",
    "stats": {
      "speed": 35,
      "armor": 48,
      "handling": 58,
      "cargo": 34
    }
  },
  {
    "id": "47d6cf7d",
    "name": "IndusAir A320neo Domestic Jet",
    "ref": "IndiGo / Air India A320",
    "topSpeed": "840 km/h",
    "district": "Jaipur International Airport",
    "desc": "Apron & cargo-bay infiltration environment.",
    "category": "AIRPLANES & HELICOPTERS",
    "affinity": "DUAL OPERATIVE",
    "brand": "INDUSAIR & DECCAN CARGO",
    "image": "https://picsum.photos/seed/bh_veh_47d6cf7d/800/450",
    "stats": {
      "speed": 100,
      "armor": 56,
      "handling": 49,
      "cargo": 39
    }
  },
  {
    "id": "69d9d317",
    "name": "Deccan-Freighter 747-8F Cargo Plane",
    "ref": "International Cargo Jet",
    "topSpeed": "890 km/h",
    "district": "Airport Cargo Terminal",
    "desc": "Featured in *The Cargo Plane* mission carrying offshore servers.",
    "category": "AIRPLANES & HELICOPTERS",
    "affinity": "DUAL OPERATIVE",
    "brand": "INDUSAIR & DECCAN CARGO",
    "image": "https://picsum.photos/seed/bh_veh_69d9d317/800/450",
    "stats": {
      "speed": 100,
      "armor": 36,
      "handling": 46,
      "cargo": 88
    }
  },
  {
    "id": "8234f6f2",
    "name": "Vardhan Meridian Bell-429 Corporate Chopper",
    "ref": "Twin-Engine VIP Helicopter",
    "topSpeed": "275 km/h",
    "district": "Udaipur Helipads / Jaisalmer",
    "desc": "Used by Vikram Vardhan and Khandelwal for rapid extraction.",
    "category": "AIRPLANES & HELICOPTERS",
    "affinity": "DUAL OPERATIVE",
    "brand": "VARDHAN MERIDIAN FLEET",
    "image": "https://picsum.photos/seed/bh_veh_8234f6f2/800/450",
    "stats": {
      "speed": 98,
      "armor": 43,
      "handling": 48,
      "cargo": 36
    }
  },
  {
    "id": "d08036af",
    "name": "Pichola Electric Solar Ferry",
    "ref": "Udaipur Lake Boat",
    "topSpeed": "32 km/h",
    "district": "Lake Pichola / Fateh Sagar",
    "desc": "Silent night boat used in Mission 60 (*The Lake Ledger*).",
    "category": "WATER & ROPEWAY",
    "affinity": "DUAL OPERATIVE",
    "brand": "MEWAR MARINE & ARAVALLI ROPEWAYS",
    "image": "https://picsum.photos/seed/bh_veh_d08036af/800/450",
    "stats": {
      "speed": 11,
      "armor": 60,
      "handling": 60,
      "cargo": 56
    }
  },
  {
    "id": "4b6e16e7",
    "name": "Chambal Rescue & Patrol Speedboat",
    "ref": "Inflatable Rigid Hull Boat",
    "topSpeed": "75 km/h",
    "district": "Kota River / Rajsamand Dam",
    "desc": "High-speed water pursuit craft.",
    "category": "WATER & ROPEWAY",
    "affinity": "DUAL OPERATIVE",
    "brand": "MEWAR MARINE & ARAVALLI ROPEWAYS",
    "image": "https://picsum.photos/seed/bh_veh_4b6e16e7/800/450",
    "stats": {
      "speed": 26,
      "armor": 43,
      "handling": 68,
      "cargo": 39
    }
  },
  {
    "id": "cb766644",
    "name": "Aravalli Fort Aerial Ropeway Cabin",
    "ref": "Doppelmayr Gondola",
    "topSpeed": "22 km/h",
    "district": "Bundi / Hilltop Fort",
    "desc": "Suspended cable-car used for vertical stealth in *Ropeway Line*.",
    "category": "WATER & ROPEWAY",
    "affinity": "DUAL OPERATIVE",
    "brand": "MEWAR MARINE & ARAVALLI ROPEWAYS",
    "image": "https://picsum.photos/seed/bh_veh_cb766644/800/450",
    "stats": {
      "speed": 7,
      "armor": 58,
      "handling": 50,
      "cargo": 31
    }
  }
];
