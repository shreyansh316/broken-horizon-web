import os
from PIL import Image, ImageDraw, ImageFont

def create_placeholder(filename, title):
    width, height = 1920, 1080
    bg_color = (25, 25, 25)
    text_color = (200, 200, 200)
    
    img = Image.new('RGB', (width, height), color=bg_color)
    draw = ImageDraw.Draw(img)
    
    # Try to load a font, otherwise use default
    try:
        font = ImageFont.truetype("arial.ttf", 64)
        small_font = ImageFont.truetype("arial.ttf", 32)
    except:
        font = ImageFont.load_default()
        small_font = ImageFont.load_default()
        
    text = f"{title}"
    subtext = "[ IMAGE PENDING GENERATION QUOTA RESET ]"
    
    # Use bounding box to center text
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    bbox2 = draw.textbbox((0, 0), subtext, font=small_font)
    text_width2 = bbox2[2] - bbox2[0]
    text_height2 = bbox2[3] - bbox2[1]
    
    x = (width - text_width) / 2
    y = (height - text_height) / 2 - 40
    
    x2 = (width - text_width2) / 2
    y2 = (height - text_height2) / 2 + 40
    
    draw.text((x, y), text, fill=text_color, font=font)
    draw.text((x2, y2), subtext, fill=(255, 100, 100), font=small_font)
    
    output_dir = r"e:\GameDev\Broken_Horizon_Interactive_Site\public\assets\images\gameplay"
    os.makedirs(output_dir, exist_ok=True)
    img.save(os.path.join(output_dir, filename))
    print(f"Created {filename}")

images_to_generate = [
    ("BH_Ajmer_HillLake_02.jpg", "AJMER - Aravalli Lake Drive"),
    ("BH_Pali_IndustrialRoad_01.jpg", "PALI - Industrial District"),
    ("BH_Pali_RuralRoad_02.jpg", "PALI - Rural Highway"),
    ("BH_Jodhpur_BlueCity_01.jpg", "JODHPUR - Blue City Alleys"),
    ("BH_Jodhpur_NightHighway_02.jpg", "JODHPUR - Night Highway Pursuit"),
    ("BH_Jaisalmer_GoldenDunes_01.jpg", "JAISALMER - Golden Dunes"),
    ("BH_Jaisalmer_DesertSettlement_02.jpg", "JAISALMER - Desert Settlement"),
    ("BH_Barmer_IndustrialCorridor_01.jpg", "BARMER - Industrial Corridor"),
    ("BH_Barmer_HighwayCheckpoint_02.jpg", "BARMER - Remote Checkpoint"),
    ("BH_Udaipur_LakeDrive_01.jpg", "UDAIPUR - Lakeside Drive"),
    ("BH_Udaipur_BoatInvestigation_02.jpg", "UDAIPUR - Boat Investigation"),
    ("BH_Rajsamand_ReservoirRoad_01.jpg", "RAJSAMAND - Marble Pit Run"),
    ("BH_Rajsamand_AravalliRoad_02.jpg", "RAJSAMAND - Mountain Winding Road"),
    ("BH_Sikar_HistoricTown_01.jpg", "SIKAR - Historic Haveli Town"),
    ("BH_Sikar_RuralFarmRoad_02.jpg", "SIKAR - Agricultural Plains"),
    ("BH_Global_PoliceCheckpoint_01.jpg", "GLOBAL - Police Checkpoint"),
    ("BH_Global_MehtaGarage_02.jpg", "GLOBAL - Mehta Garage"),
    ("BH_Global_EvidencePhotography_03.jpg", "GLOBAL - Evidence Gathering"),
    ("BH_Global_DynamicRoadsideEvent_04.jpg", "GLOBAL - Dynamic Roadside Event")
]

for filename, title in images_to_generate:
    create_placeholder(filename, title)
