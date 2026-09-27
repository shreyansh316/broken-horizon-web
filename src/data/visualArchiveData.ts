export interface VisualArchiveItem {
  id: string;
  district: string;
  title: string;
  scene: string;
  gameplayType: string;
  timeOfDay: string;
  status: 'CURRENT GAMEPLAY' | 'ACTIVE DEVELOPMENT' | 'WORLD PREVIEW';
  imagePath: string;
  altText: string;
  categories: string[];
}

export const visualArchiveData: VisualArchiveItem[] = [
  {
    id: "jaipur-pink-city-market",
    district: "Jaipur",
    title: "Pink City Market",
    scene: "Urban Market",
    gameplayType: "Driving / Exploration",
    timeOfDay: "Day",
    status: "CURRENT GAMEPLAY",
    imagePath: "/assets/images/gameplay/BH_Jaipur_PinkCityMarket_01.jpg",
    altText: "Broken Horizon Jaipur Pink City market gameplay",
    categories: ["URBAN", "MARKET", "VEHICLE"]
  },
  {
    id: "jaipur-ring-road",
    district: "Jaipur",
    title: "Ring Road Bypass",
    scene: "Urban Highway",
    gameplayType: "High-Speed Driving",
    timeOfDay: "Dusk",
    status: "CURRENT GAMEPLAY",
    imagePath: "/assets/images/gameplay/BH_Jaipur_RingRoad_02.jpg",
    altText: "Broken Horizon Jaipur Ring Road highway driving",
    categories: ["URBAN", "HIGHWAY", "VEHICLE"]
  },
  {
    id: "jaipur-haveli",
    district: "Jaipur",
    title: "Haveli Investigation",
    scene: "Historic Courtyard",
    gameplayType: "Investigation",
    timeOfDay: "Night",
    status: "ACTIVE DEVELOPMENT",
    imagePath: "/assets/images/gameplay/BH_Jaipur_HaveliInvestigation_03.jpg",
    altText: "Broken Horizon Jaipur Haveli Investigation",
    categories: ["URBAN", "HERITAGE", "INVESTIGATION"]
  },
  {
    id: "jaipur-transport-yard",
    district: "Jaipur",
    title: "Transport Yard",
    scene: "Industrial Zone",
    gameplayType: "Stealth / Exploration",
    timeOfDay: "Night",
    status: "ACTIVE DEVELOPMENT",
    imagePath: "/assets/images/gameplay/BH_Jaipur_TransportYard_04.jpg",
    altText: "Broken Horizon Jaipur Transport Yard gameplay",
    categories: ["URBAN", "INDUSTRIAL", "STEALTH", "TRANSPORT"]
  },
  {
    id: "dausa-highway",
    district: "Dausa",
    title: "Rural Highway",
    scene: "Farmland Route",
    gameplayType: "Exploration",
    timeOfDay: "Day",
    status: "WORLD PREVIEW",
    imagePath: "/assets/images/gameplay/BH_Dausa_RuralHighway_01.jpg",
    altText: "Broken Horizon Dausa Rural Highway",
    categories: ["RURAL", "HIGHWAY", "VEHICLE"]
  },
  {
    id: "dausa-stepwell",
    district: "Dausa",
    title: "Stepwell Reconnaissance",
    scene: "Ancient Stepwell",
    gameplayType: "Investigation",
    timeOfDay: "Morning",
    status: "WORLD PREVIEW",
    imagePath: "/assets/images/gameplay/BH_Dausa_FortApproach_02.jpg",
    altText: "Broken Horizon Dausa Stepwell Investigation",
    categories: ["RURAL", "HERITAGE", "INVESTIGATION"]
  },
  {
    id: "sawaimadhopur-forest",
    district: "Sawai Madhopur",
    title: "Forest Road",
    scene: "Dry Deciduous Forest",
    gameplayType: "Off-road Driving",
    timeOfDay: "Day",
    status: "WORLD PREVIEW",
    imagePath: "/assets/images/gameplay/BH_SawaiMadhopur_ForestRoad_01.jpg",
    altText: "Broken Horizon Sawai Madhopur Forest Road",
    categories: ["FOREST", "RURAL", "VEHICLE"]
  },
  {
    id: "sawaimadhopur-night",
    district: "Sawai Madhopur",
    title: "Night Checkpoint",
    scene: "Forest Border",
    gameplayType: "Stealth",
    timeOfDay: "Night",
    status: "WORLD PREVIEW",
    imagePath: "/assets/images/gameplay/BH_SawaiMadhopur_NightCheckpoint_02.jpg",
    altText: "Broken Horizon Sawai Madhopur Night Checkpoint",
    categories: ["FOREST", "SECURITY", "STEALTH"]
  },
  {
    id: "kota-urban",
    district: "Kota",
    title: "Urban Road",
    scene: "City Street",
    gameplayType: "Driving",
    timeOfDay: "Day",
    status: "WORLD PREVIEW",
    imagePath: "/assets/images/gameplay/BH_Kota_UrbanRoad_01.jpg",
    altText: "Broken Horizon Kota Urban Road",
    categories: ["URBAN", "VEHICLE"]
  },
  {
    id: "kota-river",
    district: "Kota",
    title: "Riverfront Bridge",
    scene: "Urban River",
    gameplayType: "Cinematic Event",
    timeOfDay: "Evening",
    status: "WORLD PREVIEW",
    imagePath: "/assets/images/gameplay/BH_Kota_Riverfront_02.jpg",
    altText: "Broken Horizon Kota River Bridge",
    categories: ["URBAN", "TRANSPORT"]
  },
  {
    id: "bundi-city",
    district: "Bundi",
    title: "Old City",
    scene: "Heritage Streets",
    gameplayType: "Exploration",
    timeOfDay: "Day",
    status: "WORLD PREVIEW",
    imagePath: "/assets/images/gameplay/BH_Bundi_OldCity_01.jpg",
    altText: "Broken Horizon Bundi Old City",
    categories: ["URBAN", "HERITAGE", "EXPLORATION"]
  },
  {
    id: "bundi-hill",
    district: "Bundi",
    title: "Fort Approach",
    scene: "Hill Road",
    gameplayType: "Vehicle Ascent",
    timeOfDay: "Sunset",
    status: "WORLD PREVIEW",
    imagePath: "/assets/images/gameplay/BH_Bundi_HillRoad_02.jpg",
    altText: "Broken Horizon Bundi Fort Approach",
    categories: ["RURAL", "HERITAGE", "VEHICLE"]
  },
  {
    id: "ajmer-market",
    district: "Ajmer",
    title: "Dense City Market",
    scene: "Urban Center",
    gameplayType: "Exploration",
    timeOfDay: "Day",
    status: "WORLD PREVIEW",
    imagePath: "/assets/images/gameplay/BH_Ajmer_CityMarket_01.jpg",
    altText: "Broken Horizon Ajmer City Market",
    categories: ["URBAN", "MARKET"]
  },
  {
    id: "ajmer-hills",
    district: "Ajmer",
    title: "Aravalli Hill Lake",
    scene: "Reservoir Road",
    gameplayType: "Driving",
    timeOfDay: "Morning",
    status: "WORLD PREVIEW",
    imagePath: "/assets/images/gameplay/BH_Ajmer_HillLake_02.jpg",
    altText: "Broken Horizon Ajmer Aravalli Lake Road",
    categories: ["RURAL", "LAKE", "VEHICLE"]
  },
  {
    id: "pali-industrial",
    district: "Pali",
    title: "Industrial Corridor",
    scene: "Factories",
    gameplayType: "Investigation",
    timeOfDay: "Day",
    status: "WORLD PREVIEW",
    imagePath: "/assets/images/gameplay/BH_Pali_IndustrialRoad_01.jpg",
    altText: "Broken Horizon Pali Industrial Corridor",
    categories: ["INDUSTRIAL", "URBAN", "INVESTIGATION"]
  },
  {
    id: "pali-rural",
    district: "Pali",
    title: "Rural Transition",
    scene: "Village Road",
    gameplayType: "Driving",
    timeOfDay: "Sunset",
    status: "WORLD PREVIEW",
    imagePath: "/assets/images/gameplay/BH_Pali_RuralRoad_02.jpg",
    altText: "Broken Horizon Pali Rural Road",
    categories: ["RURAL", "VEHICLE"]
  },
  {
    id: "jodhpur-blue",
    district: "Jodhpur",
    title: "Blue City",
    scene: "Historic Urban",
    gameplayType: "Exploration",
    timeOfDay: "Day",
    status: "WORLD PREVIEW",
    imagePath: "/assets/images/gameplay/BH_Jodhpur_BlueCity_01.jpg",
    altText: "Broken Horizon Jodhpur Blue City",
    categories: ["URBAN", "HERITAGE"]
  },
  {
    id: "jodhpur-night",
    district: "Jodhpur",
    title: "Night Highway Pursuit",
    scene: "Dry Terrain Highway",
    gameplayType: "Evasion / Survival",
    timeOfDay: "Night",
    status: "WORLD PREVIEW",
    imagePath: "/assets/images/gameplay/BH_Jodhpur_NightHighway_02.jpg",
    altText: "Broken Horizon Jodhpur Night Highway Pursuit",
    categories: ["DESERT", "HIGHWAY", "VEHICLE", "STEALTH"]
  },
  {
    id: "jaisalmer-dunes",
    district: "Jaisalmer",
    title: "Golden Dunes",
    scene: "Deep Desert",
    gameplayType: "Off-road Driving",
    timeOfDay: "Sunset",
    status: "WORLD PREVIEW",
    imagePath: "/assets/images/gameplay/BH_Jaisalmer_GoldenDunes_01.jpg",
    altText: "Broken Horizon Jaisalmer Golden Dunes",
    categories: ["DESERT", "VEHICLE"]
  },
  {
    id: "jaisalmer-fort",
    district: "Jaisalmer",
    title: "Desert Settlement",
    scene: "Fortress Approach",
    gameplayType: "Investigation",
    timeOfDay: "Sunrise",
    status: "WORLD PREVIEW",
    imagePath: "/assets/images/gameplay/BH_Jaisalmer_DesertSettlement_02.jpg",
    altText: "Broken Horizon Jaisalmer Desert Fortress",
    categories: ["DESERT", "HERITAGE", "INVESTIGATION"]
  },
  {
    id: "barmer-industrial",
    district: "Barmer",
    title: "Desert Industry",
    scene: "Pipeline Corridor",
    gameplayType: "Driving",
    timeOfDay: "Day",
    status: "WORLD PREVIEW",
    imagePath: "/assets/images/gameplay/BH_Barmer_IndustrialCorridor_01.jpg",
    altText: "Broken Horizon Barmer Industrial Corridor",
    categories: ["DESERT", "INDUSTRIAL", "VEHICLE"]
  },
  {
    id: "barmer-highway",
    district: "Barmer",
    title: "Highway Checkpoint",
    scene: "Remote Road",
    gameplayType: "Stealth",
    timeOfDay: "Sunset",
    status: "WORLD PREVIEW",
    imagePath: "/assets/images/gameplay/BH_Barmer_HighwayCheckpoint_02.jpg",
    altText: "Broken Horizon Barmer Highway Checkpoint",
    categories: ["DESERT", "HIGHWAY", "SECURITY", "STEALTH"]
  },
  {
    id: "udaipur-lake",
    district: "Udaipur",
    title: "Lakeside City",
    scene: "Waterfront",
    gameplayType: "Exploration",
    timeOfDay: "Evening",
    status: "WORLD PREVIEW",
    imagePath: "/assets/images/gameplay/BH_Udaipur_LakeDrive_01.jpg",
    altText: "Broken Horizon Udaipur Lake City",
    categories: ["URBAN", "LAKE", "HERITAGE"]
  },
  {
    id: "udaipur-boat",
    district: "Udaipur",
    title: "Boat Investigation",
    scene: "Lake Waters",
    gameplayType: "Boating / Investigation",
    timeOfDay: "Sunset",
    status: "WORLD PREVIEW",
    imagePath: "/assets/images/gameplay/BH_Udaipur_BoatInvestigation_02.jpg",
    altText: "Broken Horizon Udaipur Boat Investigation",
    categories: ["LAKE", "TRANSPORT", "INVESTIGATION"]
  },
  {
    id: "rajsamand-reservoir",
    district: "Rajsamand",
    title: "Reservoir Road",
    scene: "Lake Hills",
    gameplayType: "Driving",
    timeOfDay: "Day",
    status: "WORLD PREVIEW",
    imagePath: "/assets/images/gameplay/BH_Rajsamand_ReservoirRoad_01.jpg",
    altText: "Broken Horizon Rajsamand Reservoir",
    categories: ["RURAL", "LAKE", "VEHICLE"]
  },
  {
    id: "rajsamand-aravalli",
    district: "Rajsamand",
    title: "Aravalli Mountain Road",
    scene: "Winding Ascent",
    gameplayType: "Vehicle Exploration",
    timeOfDay: "Golden Hour",
    status: "WORLD PREVIEW",
    imagePath: "/assets/images/gameplay/BH_Rajsamand_AravalliRoad_02.jpg",
    altText: "Broken Horizon Rajsamand Aravalli Road",
    categories: ["RURAL", "HIGHWAY", "VEHICLE"]
  },
  {
    id: "sikar-historic",
    district: "Sikar",
    title: "Historic Town Street",
    scene: "Haveli Town",
    gameplayType: "Exploration",
    timeOfDay: "Morning",
    status: "WORLD PREVIEW",
    imagePath: "/assets/images/gameplay/BH_Sikar_HistoricTown_01.jpg",
    altText: "Broken Horizon Sikar Historic Town",
    categories: ["URBAN", "HERITAGE"]
  },
  {
    id: "sikar-agri",
    district: "Sikar",
    title: "Agricultural Road",
    scene: "Farms",
    gameplayType: "Driving",
    timeOfDay: "Day",
    status: "WORLD PREVIEW",
    imagePath: "/assets/images/gameplay/BH_Sikar_RuralFarmRoad_02.jpg",
    altText: "Broken Horizon Sikar Agricultural Road",
    categories: ["RURAL", "VEHICLE"]
  },
  {
    id: "global-police",
    district: "Global",
    title: "Police Checkpoint",
    scene: "Security Encounter",
    gameplayType: "Evasion / Stealth",
    timeOfDay: "Night",
    status: "CURRENT GAMEPLAY",
    imagePath: "/assets/images/gameplay/BH_Global_PoliceCheckpoint_01.jpg",
    altText: "Broken Horizon Police Checkpoint Encounter",
    categories: ["SECURITY", "STEALTH"]
  },
  {
    id: "global-garage",
    district: "Global",
    title: "Mehta Garage",
    scene: "Tuning Lab",
    gameplayType: "Customization",
    timeOfDay: "Night",
    status: "CURRENT GAMEPLAY",
    imagePath: "/assets/images/gameplay/BH_Global_MehtaGarage_02.jpg",
    altText: "Broken Horizon Mehta Garage Gameplay",
    categories: ["VEHICLE", "URBAN"]
  },
  {
    id: "global-evidence",
    district: "Global",
    title: "Evidence Photography",
    scene: "Investigation Scene",
    gameplayType: "Investigation",
    timeOfDay: "Day",
    status: "CURRENT GAMEPLAY",
    imagePath: "/assets/images/gameplay/BH_Global_EvidencePhotography_03.jpg",
    altText: "Broken Horizon Evidence Collection",
    categories: ["INVESTIGATION"]
  },
  {
    id: "global-event",
    district: "Global",
    title: "Dynamic Roadside Event",
    scene: "Random Encounter",
    gameplayType: "Exploration",
    timeOfDay: "Dusk",
    status: "ACTIVE DEVELOPMENT",
    imagePath: "/assets/images/gameplay/BH_Global_DynamicRoadsideEvent_04.jpg",
    altText: "Broken Horizon Dynamic Roadside Event",
    categories: ["HIGHWAY", "VEHICLE"]
  }
];
