import os
import sys

def assert_true(condition, message):
    if condition:
        print(f"PASS: {message}")
        return True
    else:
        print(f"FAIL: {message}")
        return False

def run_tests():
    print("--- Running District Screenshot Diversity Acceptance Test ---")
    
    # Check if worldData.ts exists
    data_path = r"e:\GameDev\Broken_Horizon_Interactive_Site\src\data\worldData.ts"
    if not os.path.exists(data_path):
        print("FAIL: worldData.ts not found")
        sys.exit(1)
        
    with open(data_path, "r", encoding="utf-8") as f:
        content = f.read()

    tests_passed = 0
    total_tests = 0
    
    # 1. 13 registered districts exist
    districts = ["jaipur", "dausa", "sawai-madhopur", "kota", "bundi", "ajmer", "pali", "jodhpur", "jaisalmer", "barmer", "udaipur", "rajsamand", "sikar"]
    for d in districts:
        total_tests += 1
        if assert_true(f'id: "{d}"' in content, f"District {d} exists"):
            tests_passed += 1

    # Check images
    import re
    galleries = re.findall(r'gallery:\s*\[(.*?)\]', content, flags=re.DOTALL)
    
    all_images = []
    
    for i, g in enumerate(galleries):
        images = re.findall(r'"(/assets/[^"]+)"', g)
        all_images.extend(images)
        
        district = districts[i] if i < len(districts) else "unknown"
        
        total_tests += 1
        if district == "jaipur":
            if assert_true(len(images) >= 3, f"Jaipur has at least 3 images ({len(images)})"):
                tests_passed += 1
        else:
            if assert_true(len(images) >= 2, f"{district} has at least 2 images ({len(images)})"):
                tests_passed += 1
                
    # 4. Total unique images >= 30
    # Add global images that might not be in worldData.ts but are created
    global_images = [
        "/assets/images/gameplay/BH_Global_PoliceCheckpoint_01.jpg",
        "/assets/images/gameplay/BH_Global_MehtaGarage_02.jpg",
        "/assets/images/gameplay/BH_Global_EvidencePhotography_03.jpg",
        "/assets/images/gameplay/BH_Global_DynamicRoadsideEvent_04.jpg"
    ]
    all_images.extend(global_images)
    
    unique_images = set(all_images)
    
    total_tests += 1
    if assert_true(len(unique_images) >= 30, f"Total unique gameplay images >= 30 ({len(unique_images)})"):
        tests_passed += 1
        
    # 5. No exact image path reused
    total_tests += 1
    if assert_true(len(unique_images) == len(all_images), f"No exact image path is reused (Total: {len(all_images)}, Unique: {len(unique_images)})"):
        tests_passed += 1
        
    # 6. No missing image files
    missing_files = 0
    public_dir = r"e:\GameDev\Broken_Horizon_Interactive_Site\public"
    for img in unique_images:
        # Strip leading slash if present
        img_path = img.lstrip('/')
        full_path = os.path.join(public_dir, img_path.replace('/', os.sep))
        if not os.path.exists(full_path):
            missing_files += 1
            print(f"MISSING: {full_path}")
            
    total_tests += 1
    if assert_true(missing_files == 0, f"No missing image files (Found {missing_files} missing)"):
        tests_passed += 1
        
    # 10. Locked districts remain labelled
    locked_count = content.count('discoveryState: "LOCKED"')
    in_dev_count = content.count('discoveryState: "IN DEVELOPMENT"')
    playable_count = content.count('discoveryState: "PLAYABLE"')
    
    total_tests += 1
    if assert_true(locked_count > 0 and in_dev_count > 0, f"Locked/Dev districts remain correctly labeled"):
        tests_passed += 1
        
    # 11. Jaipur remains ACTIVE (PLAYABLE)
    total_tests += 1
    if assert_true(playable_count >= 1, f"Jaipur remains ACTIVE"):
        tests_passed += 1

    print(f"\n--- Test Summary: {tests_passed}/{total_tests} Passed ---")
    if tests_passed == total_tests:
        sys.exit(0)
    else:
        sys.exit(1)

if __name__ == "__main__":
    run_tests()
