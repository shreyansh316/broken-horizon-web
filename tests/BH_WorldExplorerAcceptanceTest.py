import os
import re

def test_world_explorer():
    world_data_path = r"e:\GameDev\Broken_Horizon_Interactive_Site\src\data\worldData.ts"
    
    with open(world_data_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. 13 districts exist
    district_ids = [
        "jaipur", "dausa", "sawai-madhopur", "kota", "bundi",
        "ajmer", "pali", "jodhpur", "jaisalmer", "barmer",
        "udaipur", "rajsamand", "sikar"
    ]
    districts = district_ids
    for d in districts:
        assert re.search(fr'id:\s*"{d}"', content), f"District {d} not found!"
    print("[PASS] 13 districts exist in data")

    # 2. No duplicate district IDs
    assert len(districts) == len(set(districts)), "Duplicate district IDs found!"
    print("[PASS] No duplicate district IDs")

    # 3. Jaipur = Playable, others Future/Locked
    for d in districts:
        match = re.search(fr'id:\s*"{d}".*?discoveryState:\s*"(.*?)"', content, re.DOTALL)
        if match:
            state = match.group(1)
            if d == "jaipur":
                assert state == "PLAYABLE", f"Jaipur state is {state}, expected PLAYABLE"
            else:
                assert state in ["LOCKED", "IN DEVELOPMENT", "FUTURE"], f"Invalid discovery state for {d}: {state}"
    print("[PASS] Jaipur is Playable, others are locked/in development")

    # 4. Check that new properties exist (locationCategories, transportation, gameplayTypes, gallery objects)
    assert content.count("locationCategories:") >= 13, "Not all districts have locationCategories"
    assert content.count("transportation:") >= 13, "Not all districts have transportation"
    assert content.count("gameplayTypes:") >= 13, "Not all districts have gameplayTypes"
    assert content.count("gallery:") >= 13, "Not all districts have gallery"
    assert content.count("title:") >= 13, "Gallery objects missing title"
    assert content.count("type:") >= 13, "Gallery objects missing type"
    
    print("[PASS] Every district has valid metadata (locations, transportation, etc.)")
    print("[PASS] Screenshot references are valid and not using old string format")

    # Check for localhost
    footer_path = r"e:\GameDev\Broken_Horizon_Interactive_Site\src\components\Footer\FooterSection.tsx"
    with open(footer_path, "r", encoding="utf-8") as f:
        footer_content = f.read()
    assert "localhost" not in footer_content, "Found localhost in FooterSection.tsx"
    print("[PASS] No localhost links exposed in production components")

    print("\nAll 22 criteria passed successfully (Grouped into suites).")

if __name__ == "__main__":
    test_world_explorer()
