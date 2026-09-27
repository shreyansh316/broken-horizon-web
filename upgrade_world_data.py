import re

file_path = r"e:\GameDev\Broken_Horizon_Interactive_Site\src\data\worldData.ts"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update the interfaces
interface_updates = """export type DiscoveryStatus = 'PLAYABLE' | 'IN DEVELOPMENT' | 'LOCKED';

export interface Screenshot {
  url: string;
  title: string;
  type: string;
}

export interface MapLandmark {
  id: string;
  name: string;
  districtId: string;
  type: 'landmark' | 'garage' | 'story' | 'character' | 'activity' | 'safehouse';
  x: number;
  y: number;
  description: string;
  affiliation?: string;
}

export interface MapRoute {
  id: string;
  name: string;
  fromId: string;
  toId: string;
  path: string;
  type: 'primary' | 'secondary' | 'corridor';
  distanceKm: number;
  description: string;
}

export interface TransportationInfo {
  category: string;
  options: string[];
}

export interface WorldRegion {
  id: string;
  index: string;
  name: string;
  displayName: string;
  region: string;
  shortDescription: string;
  fullDescription: string;
  description: string;
  biome: string;
  coordinates: string;
  mapCoordinates: { x: number; y: number };
  mapPath: string;
  colorAccent: string;
  populationStyle: string;
  terrain: string;
  climate: string;
  majorLocations: string[];
  locationCategories: string[];
  transportation: TransportationInfo[];
  gameplayTypes: string[];
  landmarks: MapLandmark[];
  activities: string[];
  storyLocations: string[];
  travelTime: string;
  discoveryState: DiscoveryStatus;
  featured: boolean;
  image: string;
  gallery: Screenshot[];
  quote: string;
  characterAffiliation?: {
    name: 'Arjun Mehta' | 'Kavya Rathore';
    role: string;
  };
}"""

# Replace the interfaces up to worldRegions
content = re.sub(r'export type DiscoveryStatus.*?export interface WorldRegion \{.*?\}', interface_updates, content, flags=re.DOTALL)

# Now for each district, we need to replace `gallery: [...]` with the new fields
# locationCategories, transportation, gameplayTypes, and formatted gallery objects.

def convert_filename_to_title(filename):
    match = re.search(r'BH_[^_]+_(.*?)_\d+\.jpg', filename)
    if match:
        name = match.group(1)
        # Add spaces before capital letters
        name = re.sub(r'(?<!^)(?=[A-Z])', ' ', name)
        return name
    return "Gameplay View"

def repl_district(match):
    before = match.group(1)
    gallery_str = match.group(2)
    
    # Extract images from gallery
    images = re.findall(r'"([^"]+)"', gallery_str)
    
    gallery_objects = []
    for img in images:
        title = convert_filename_to_title(img)
        gallery_objects.append(f'      {{ url: "{img}", title: "{title}", type: "Gameplay Environment" }}')
        
    gallery_new = "[\n" + ",\n".join(gallery_objects) + "\n    ]"
    
    # Defaults
    location_cats = '["URBAN", "TRANSPORT", "HERITAGE"]'
    transport = '[\n      { category: "Road", options: ["Cars", "Motorcycles", "Buses", "Trucks"] },\n      { category: "Rail", options: ["Railway"] }\n    ]'
    gameplay = '["DRIVING", "EXPLORATION", "PHOTOGRAPHY"]'
    
    # District specific logic
    if "jaipur" in before.lower() and "pink city" in before.lower():
        location_cats = '["URBAN", "TRANSPORT", "PUBLIC SERVICES", "ECONOMY", "SECURITY", "HERITAGE"]'
        transport = '[\n      { category: "Road", options: ["Cars", "Motorcycles", "Scooters", "Auto-rickshaws", "Buses", "Trucks"] },\n      { category: "Rail", options: ["Railway"] },\n      { category: "Urban", options: ["Metro"] },\n      { category: "Air", options: ["Airport"] }\n    ]'
        gameplay = '["DRIVING", "CHASE", "INVESTIGATION", "STEALTH", "DELIVERY", "RACING"]'
    elif "dausa" in before.lower():
        location_cats = '["TRANSPORT", "HERITAGE", "NATURE"]'
        gameplay = '["DRIVING", "EXPLORATION", "EVIDENCE COLLECTION"]'
    elif "sawai" in before.lower():
        location_cats = '["NATURE", "HERITAGE", "SECURITY"]'
        gameplay = '["OFF-ROAD", "STEALTH", "PHOTOGRAPHY"]'
    elif "kota" in before.lower():
        location_cats = '["URBAN", "NATURE", "PUBLIC SERVICES"]'
        gameplay = '["DRIVING", "CHASE", "EXPLORATION"]'
    elif "bundi" in before.lower():
        location_cats = '["HERITAGE", "URBAN", "NATURE"]'
        gameplay = '["EXPLORATION", "PHOTOGRAPHY", "PUZZLE"]'
    elif "jodhpur" in before.lower():
        location_cats = '["URBAN", "HERITAGE", "TRANSPORT", "NATURE"]'
        transport = '[\n      { category: "Road", options: ["Cars", "Motorcycles", "Buses", "Trucks"] },\n      { category: "Rail", options: ["Railway"] },\n      { category: "Air", options: ["Airport"] }\n    ]'
        gameplay = '["DRIVING", "CHASE", "STEALTH", "EXPLORATION"]'
    elif "udaipur" in before.lower():
        location_cats = '["URBAN", "HERITAGE", "NATURE", "TRANSPORT"]'
        transport = '[\n      { category: "Road", options: ["Cars", "Motorcycles"] },\n      { category: "Rail", options: ["Railway"] },\n      { category: "Air", options: ["Airport"] },\n      { category: "Water", options: ["Boat"] }\n    ]'
        gameplay = '["BOATING", "INVESTIGATION", "PHOTOGRAPHY"]'

    
    new_fields = f"""locationCategories: {location_cats},
    transportation: {transport},
    gameplayTypes: {gameplay},
    gallery: {gallery_new}"""
    
    return before + new_fields

content = re.sub(r'(majorLocations:\s*\[.*?\],\s*landmarks:\s*\[.*?\],\s*activities:\s*\[.*?\],\s*storyLocations:\s*\[.*?\],\s*travelTime:.*?\n.*?discoveryState:.*?\n.*?featured:.*?\n.*?image:.*?\n.*?)\s*gallery:\s*\[(.*?)\]', repl_district, content, flags=re.DOTALL)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated worldData.ts with new fields.")
