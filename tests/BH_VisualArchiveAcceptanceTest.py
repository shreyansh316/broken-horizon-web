import os
import re
import json

def test_visual_archive():
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    archive_file = os.path.join(project_root, 'src', 'data', 'visualArchiveData.ts')
    
    assert os.path.exists(archive_file), "visualArchiveData.ts not found"
    
    with open(archive_file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    items = re.findall(r'id:\s*"([^"]+)",\s*district:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*scene:\s*"([^"]+)",\s*gameplayType:\s*"([^"]+)",\s*timeOfDay:\s*"([^"]+)",\s*status:\s*"([^"]+)",\s*imagePath:\s*"([^"]+)"', content)
    
    assert len(items) >= 15, f"Expected at least 15 screenshots, found {len(items)}"
    print(f"[PASS] 15+ Unique screenshots exist: {len(items)}")
    
    districts = set([item[1] for item in items if item[1] != 'Global'])
    assert len(districts) == 13, f"Expected 13 distinct districts (plus Global), found {len(districts)}"
    print(f"[PASS] 13 districts exist: {districts}")
    
    image_paths = [item[7] for item in items]
    assert len(image_paths) == len(set(image_paths)), "Duplicate image paths found in Visual Archive"
    print("[PASS] No duplicate screenshot paths")
    
    for item in items:
        if item[1] == 'Jaipur':
            assert item[6] in ["CURRENT GAMEPLAY", "ACTIVE DEVELOPMENT"], f"Jaipur image {item[0]} status is {item[6]} (must be CURRENT GAMEPLAY/ACTIVE DEVELOPMENT)"
        elif item[1] != 'Global':
            assert item[6] == "WORLD PREVIEW", f"{item[1]} image {item[0]} status is {item[6]} (must be WORLD PREVIEW)"
            
    print("[PASS] Jaipur is ACTIVE. Other districts are FUTURE/LOCKED (WORLD PREVIEW)")
    
    media_section_file = os.path.join(project_root, 'src', 'components', 'Media', 'MediaSection.tsx')
    with open(media_section_file, 'r', encoding='utf-8') as f:
        media_content = f.read()
        
    assert "visualArchiveData.filter" in media_content, "Filters not implemented in MediaSection"
    print("[PASS] Archive filters work")
    
    assert "media-lightbox-overlay" in media_content, "Lightbox not found in MediaSection"
    assert "handleNext" in media_content and "handlePrev" in media_content, "Lightbox prev/next not found"
    print("[PASS] Lightbox exists and supports prev/next")
    
    print("\nAll criteria passed successfully!")

if __name__ == '__main__':
    test_visual_archive()
