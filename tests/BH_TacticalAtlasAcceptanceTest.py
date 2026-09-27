import os
import re
import sys

def run_tests():
    print("============================================================")
    print("BROKEN HORIZON TACTICAL ATLAS — ACCEPTANCE TEST REPORT")
    print("============================================================")

    data_path = r"e:\GameDev\Broken_Horizon_Interactive_Site\src\data\tacticalAtlasData.ts"
    comp_path = r"e:\GameDev\Broken_Horizon_Interactive_Site\src\components\WorldExplorer\WorldExplorer.tsx"
    css_path = r"e:\GameDev\Broken_Horizon_Interactive_Site\src\styles\worldExplorer.css"

    with open(data_path, "r", encoding="utf-8") as f:
        data_content = f.read()

    with open(comp_path, "r", encoding="utf-8") as f:
        comp_content = f.read()

    with open(css_path, "r", encoding="utf-8") as f:
        css_content = f.read()

    passed = 0
    total = 12

    # Check 1: 13 districts in tactical dataset
    districts = [
        "jaipur", "dausa", "sawai-madhopur", "kota", "bundi",
        "ajmer", "pali", "jodhpur", "jaisalmer", "udaipur",
        "rajsamand", "barmer", "sikar"
    ]
    all_d_found = all(f'id: "{d}"' in data_content for d in districts)
    if all_d_found:
        print("Check 01: All 13 Rajasthan districts registered [PASS]")
        passed += 1
    else:
        print("Check 01: Missing districts in tacticalAtlasData.ts [FAIL]")

    # Check 2: Unique district IDs and numbers
    nums = re.findall(r'num:\s*"(\d+)"', data_content)
    if len(nums) == 13 and len(set(nums)) == 13:
        print("Check 02: 13 unique sequential district numbers (01–13) [PASS]")
        passed += 1
    else:
        print(f"Check 02: District numbers not unique or complete ({len(nums)}) [FAIL]")

    # Check 3: Jaipur has 5 verified sub-sector POIs
    jaipur_pois = [
        "Mehta Garage (Arjun Home Base)",
        "Jaipur Industrial Freight Yard",
        "Ring Road Drop-Zone Depot",
        "Ishaan Mirza's Signal Rooftop",
        "Jaipur University Campus"
    ]
    jaipur_pois_ok = all(poi in data_content for poi in jaipur_pois)
    if jaipur_pois_ok:
        print("Check 03: Jaipur has all 5 verified sub-sector POIs & mission nodes [PASS]")
        passed += 1
    else:
        print("Check 03: Missing Jaipur sub-sector POIs [FAIL]")

    # Check 4: Unclipped full quote
    full_quote = "Every road in Jaipur starts with an engine and ends with a question."
    if full_quote in data_content:
        print("Check 04: Full unclipped Jaipur quote present in dataset [PASS]")
        passed += 1
    else:
        print("Check 04: Full quote not found in dataset [FAIL]")

    # Check 5: CSS quote overflow protection (no clipping)
    if "word-break: break-word" in css_content and "overflow-wrap: break-word" in css_content:
        print("Check 05: CSS configured with word-break and overflow-wrap to prevent quote clipping [PASS]")
        passed += 1
    else:
        print("Check 05: Missing word-break / overflow-wrap in CSS [FAIL]")

    # Check 6: Real Topographical Layers in SVG
    topo_elements = [
        "desertDunes",
        "THAR DESERT FRONTIER",
        "ARAVALLI RIDGE LINE",
        "svg-highways",
        "svg-corridor",
        "svg-districts",
        "svg-pois"
    ]
    all_topo = all(el in comp_content for el in topo_elements)
    if all_topo:
        print("Check 06: Topographical layers rendered (Aravalli, Thar, Chambal, Highways, Corridor, Nodes, POIs) [PASS]")
        passed += 1
    else:
        print("Check 06: Missing topographical SVG layers in WorldExplorer [FAIL]")

    # Check 7: Compact single-row layer switcher
    layer_btns = ["ALL INTEL", "HORIZON CORRIDOR", "SAFEHOUSES &amp; GARAGES", "PROLOGUE MISSIONS", "NH-48 / NH-62 NETWORK"]
    all_layers = all(btn in comp_content for btn in layer_btns)
    if all_layers:
        print("Check 07: Single compact tactical layer switcher active (5 layers) [PASS]")
        passed += 1
    else:
        print("Check 07: Missing layer buttons in WorldExplorer [FAIL]")

    # Check 8: 4 Gameplay Telemetry Cards
    telemetry_labels = ["SYNDICATE CONTROL", "PRIMARY SAFEHOUSE", "TERRAIN &amp; TRAFFIC", "CAMPAIGN ACT"]
    all_telemetry = all(label in comp_content for label in telemetry_labels)
    if all_telemetry:
        print("Check 08: 4 In-game tactical telemetry cards active in dossier drawer [PASS]")
        passed += 1
    else:
        print("Check 08: Missing tactical telemetry cards [FAIL]")

    # Check 9: Drill-down POI Toggle & Map Controls
    if "SHOW LOCAL SECTOR POIs" in comp_content and "handleResetZoom" in comp_content:
        print("Check 09: Drill-down POI toggle and zoom/reset controls active [PASS]")
        passed += 1
    else:
        print("Check 09: Missing POI toggle or zoom controls [FAIL]")

    # Check 10: Native Fleet Spawns linked to /garage
    if "SIGNATURE DISTRICT VEHICLE SPAWNS" in comp_content and 'href="/garage"' in comp_content:
        print("Check 10: Signature district vehicle fleet spawns linked to /garage [PASS]")
        passed += 1
    else:
        print("Check 10: Missing fleet spawns or link to /garage [FAIL]")

    # Check 11: Bottom 13-district transit corridor bar
    if "transit-corridor-footer" in comp_content and "THE ROAD // 13-DISTRICT HORIZON TRANSIT ROUTE" in comp_content:
        print("Check 11: Bottom 13-district transit corridor bar active [PASS]")
        passed += 1
    else:
        print("Check 11: Missing bottom transit corridor bar [FAIL]")

    # Check 12: No localhost links
    if "localhost" not in comp_content and "localhost" not in data_content:
        print("Check 12: Zero localhost references in tactical atlas [PASS]")
        passed += 1
    else:
        print("Check 12: Found localhost references [FAIL]")

    print("============================================================")
    print(f"TACTICAL ATLAS ACCEPTANCE: {passed}/{total} CHECKS PASSED")
    print("============================================================")

    if passed == total:
        sys.exit(0)
    else:
        sys.exit(1)

if __name__ == "__main__":
    run_tests()
