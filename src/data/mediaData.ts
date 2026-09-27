export interface ScreenshotItem {
  id: string;
  number: string;
  title: string;
  location: string;
  caption: string;
  image: string;
  thumbSpan?: "span-wide" | "span-tall" | "span-normal";
}

export const screenshotsData: ScreenshotItem[] = [
  {
    id: "shot-01",
    number: "01",
    title: "NIGHT HIGHWAY PURSUIT",
    location: "National Highway 48 Bypass // Central Corridor",
    caption: "Custom scrambler motorcycle accelerating through an ancient sandstone checkpoint gate under sodium streetlights.",
    image: "/assets/images/screenshots/screenshot-01.jpg",
    thumbSpan: "span-wide",
  },
  {
    id: "shot-02",
    number: "02",
    title: "DUNE TRAVERSAL AT SUNDOWN",
    location: "Sam Sand Dunes // Jaisalmer Frontier",
    caption: "Heavy 4x4 expedition vehicle executing a high-angle drift along the crest of the Thar desert dunes.",
    image: "/assets/images/screenshots/screenshot-02.jpg",
    thumbSpan: "span-tall",
  },
  {
    id: "shot-03",
    number: "03",
    title: "TERRACOTTA BAZAAR TRAFFIC",
    location: "Johari Bazaar District // Jaipur",
    caption: "Wet asphalt reflects neon shopfronts and evening headlights as traffic navigates narrow historic alleys.",
    image: "/assets/images/screenshots/screenshot-03.jpg",
    thumbSpan: "span-normal",
  },
  {
    id: "shot-04",
    number: "04",
    title: "SUBTERRANEAN ANOMALY",
    location: "Chand Baori Sub-Levels // Dausa Sector",
    caption: "Tactical flashlight beams pierce subterranean mist inside an ancient stepwell where illicit communications cables were routed.",
    image: "/assets/images/screenshots/screenshot-04.jpg",
    thumbSpan: "span-wide",
  },
  {
    id: "shot-05",
    number: "05",
    title: "HIGHWAY OVERLOOK AT GOLDEN HOUR",
    location: "Old Military Road // Western Pass",
    caption: "Distant mountain fortresses rise against a golden sunset sky as the highway cuts an unbroken line across the desert.",
    image: "/assets/images/screenshots/screenshot-05.jpg",
    thumbSpan: "span-tall",
  },
  {
    id: "shot-06",
    number: "06",
    title: "NOCTURNAL REPAIR BAY",
    location: "Arjun Mehta Garage // Jaipur Industrial Outskirts",
    caption: "Tuned 4x4 resting under tungsten bay lamps amidst engine parts, spare suspension coils and communications gear.",
    image: "/assets/images/screenshots/screenshot-06.jpg",
    thumbSpan: "span-normal",
  },
  {
    id: "shot-07",
    number: "07",
    title: "PERIMETER RECONNAISSANCE",
    location: "Horizon Corridor Fence Line // Barmer Perimeter",
    caption: "Long-range optical surveillance overlooking fortified transmission relay towers along the secured expressway boundary.",
    image: "/assets/images/screenshots/screenshot-07.jpg",
    thumbSpan: "span-wide",
  },
  {
    id: "shot-08",
    number: "08",
    title: "CORRIDOR TRANSIT ARCH",
    location: "State Boundary Toll Barrier // Ajmer Gap",
    caption: "Speeding past high-elevation communication antennas at midnight during an off-grid courier transport.",
    image: "/assets/images/screenshots/screenshot-08.jpg",
    thumbSpan: "span-normal",
  },
];
