import re

file_path = r"e:\GameDev\Broken_Horizon_Interactive_Site\src\data\worldData.ts"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

replacements = {
    "jaipur": {
        "image": '"/assets/images/gameplay/BH_Jaipur_PinkCityMarket_01.jpg"',
        "gallery": '[\n      "/assets/images/gameplay/BH_Jaipur_PinkCityMarket_01.jpg",\n      "/assets/images/gameplay/BH_Jaipur_RingRoad_02.jpg",\n      "/assets/images/gameplay/BH_Jaipur_HaveliInvestigation_03.jpg",\n      "/assets/images/gameplay/BH_Jaipur_TransportYard_04.jpg"\n    ]'
    },
    "dausa": {
        "image": '"/assets/images/gameplay/BH_Dausa_RuralHighway_01.jpg"',
        "gallery": '[\n      "/assets/images/gameplay/BH_Dausa_RuralHighway_01.jpg",\n      "/assets/images/gameplay/BH_Dausa_FortApproach_02.jpg"\n    ]'
    },
    "sawai-madhopur": {
        "image": '"/assets/images/gameplay/BH_SawaiMadhopur_ForestRoad_01.jpg"',
        "gallery": '[\n      "/assets/images/gameplay/BH_SawaiMadhopur_ForestRoad_01.jpg",\n      "/assets/images/gameplay/BH_SawaiMadhopur_NightCheckpoint_02.jpg"\n    ]'
    },
    "kota": {
        "image": '"/assets/images/gameplay/BH_Kota_UrbanRoad_01.jpg"',
        "gallery": '[\n      "/assets/images/gameplay/BH_Kota_UrbanRoad_01.jpg",\n      "/assets/images/gameplay/BH_Kota_Riverfront_02.jpg"\n    ]'
    },
    "bundi": {
        "image": '"/assets/images/gameplay/BH_Bundi_OldCity_01.jpg"',
        "gallery": '[\n      "/assets/images/gameplay/BH_Bundi_OldCity_01.jpg",\n      "/assets/images/gameplay/BH_Bundi_HillRoad_02.jpg"\n    ]'
    },
    "ajmer": {
        "image": '"/assets/images/gameplay/BH_Ajmer_CityMarket_01.jpg"',
        "gallery": '[\n      "/assets/images/gameplay/BH_Ajmer_CityMarket_01.jpg",\n      "/assets/images/gameplay/BH_Ajmer_HillLake_02.jpg"\n    ]'
    },
    "pali": {
        "image": '"/assets/images/gameplay/BH_Pali_IndustrialRoad_01.jpg"',
        "gallery": '[\n      "/assets/images/gameplay/BH_Pali_IndustrialRoad_01.jpg",\n      "/assets/images/gameplay/BH_Pali_RuralRoad_02.jpg"\n    ]'
    },
    "jodhpur": {
        "image": '"/assets/images/gameplay/BH_Jodhpur_BlueCity_01.jpg"',
        "gallery": '[\n      "/assets/images/gameplay/BH_Jodhpur_BlueCity_01.jpg",\n      "/assets/images/gameplay/BH_Jodhpur_NightHighway_02.jpg"\n    ]'
    },
    "jaisalmer": {
        "image": '"/assets/images/gameplay/BH_Jaisalmer_GoldenDunes_01.jpg"',
        "gallery": '[\n      "/assets/images/gameplay/BH_Jaisalmer_GoldenDunes_01.jpg",\n      "/assets/images/gameplay/BH_Jaisalmer_DesertSettlement_02.jpg"\n    ]'
    },
    "barmer": {
        "image": '"/assets/images/gameplay/BH_Barmer_IndustrialCorridor_01.jpg"',
        "gallery": '[\n      "/assets/images/gameplay/BH_Barmer_IndustrialCorridor_01.jpg",\n      "/assets/images/gameplay/BH_Barmer_HighwayCheckpoint_02.jpg"\n    ]'
    },
    "udaipur": {
        "image": '"/assets/images/gameplay/BH_Udaipur_LakeDrive_01.jpg"',
        "gallery": '[\n      "/assets/images/gameplay/BH_Udaipur_LakeDrive_01.jpg",\n      "/assets/images/gameplay/BH_Udaipur_BoatInvestigation_02.jpg"\n    ]'
    },
    "rajsamand": {
        "image": '"/assets/images/gameplay/BH_Rajsamand_ReservoirRoad_01.jpg"',
        "gallery": '[\n      "/assets/images/gameplay/BH_Rajsamand_ReservoirRoad_01.jpg",\n      "/assets/images/gameplay/BH_Rajsamand_AravalliRoad_02.jpg"\n    ]'
    },
    "sikar": {
        "image": '"/assets/images/gameplay/BH_Sikar_HistoricTown_01.jpg"',
        "gallery": '[\n      "/assets/images/gameplay/BH_Sikar_HistoricTown_01.jpg",\n      "/assets/images/gameplay/BH_Sikar_RuralFarmRoad_02.jpg"\n    ]'
    }
}

for district, data in replacements.items():
    # Find the block for this district
    pattern = r'(id:\s*"' + district + r'".*?image:\s*)(.*?)(,\s*gallery:\s*\[.*?\])'
    
    def repl(m):
        return m.group(1) + data["image"] + ",\n    gallery: " + data["gallery"]
        
    content = re.sub(pattern, repl, content, flags=re.DOTALL)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated worldData.ts")
