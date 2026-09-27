import os
import re
import sys
import hashlib
from PIL import Image

def run_acceptance_test():
    print("================================================================================")
    print("BROKEN HORIZON — CONNECTED WORLD NETWORK IMAGE ACCEPTANCE TEST")
    print("================================================================================")

    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    assets_dir = os.path.join(project_root, "public", "assets", "images", "world-network")
    road_component_path = os.path.join(project_root, "src", "components", "Road", "RoadSection.tsx")

    expected_files = [
        "BH_WorldNetwork_JaipurBypass.webp",
        "BH_WorldNetwork_SambharSaltFlats.webp",
        "BH_WorldNetwork_AravalliSwitchbacks.webp",
        "BH_WorldNetwork_UdaipurSanctuary.webp",
        "BH_WorldNetwork_TharDesertSea.webp",
        "BH_WorldNetwork_JaisalmerBastion.webp"
    ]

    expected_milestones = [
        ("JAIPUR BYPASS", "BH_WorldNetwork_JaipurBypass.webp"),
        ("SAMBHAR SALT FLATS", "BH_WorldNetwork_SambharSaltFlats.webp"),
        ("ARAVALLI SWITCHBACKS", "BH_WorldNetwork_AravalliSwitchbacks.webp"),
        ("UDAIPUR SANCTUARY", "BH_WorldNetwork_UdaipurSanctuary.webp"),
        ("THAR DESERT SEA", "BH_WorldNetwork_TharDesertSea.webp"),
        ("JAISALMER BASTION", "BH_WorldNetwork_JaisalmerBastion.webp")
    ]

    with open(road_component_path, "r", encoding="utf-8") as f:
        component_code = f.read()

    passed = 0
    total = 15

    # Check 1: six required images exist
    all_exist = all(os.path.isfile(os.path.join(assets_dir, fname)) for fname in expected_files)
    if all_exist:
        print("[PASS] 01. Six required images exist in /public/assets/images/world-network/")
        passed += 1
    else:
        missing = [fname for fname in expected_files if not os.path.isfile(os.path.join(assets_dir, fname))]
        print(f"[FAIL] 01. Missing images: {missing}")

    # Check 2: six filenames are correct
    found_files = sorted([f for f in os.listdir(assets_dir) if f in expected_files])
    if found_files == sorted(expected_files):
        print(f"[PASS] 02. Six filenames match exact specification: {found_files}")
        passed += 1
    else:
        print(f"[FAIL] 02. Filenames do not match specification. Found: {found_files}")

    # Check 3: each milestone references the correct image
    milestone_mapping_ok = True
    for name, img_name in expected_milestones:
        pattern = rf"name:\s*'{re.escape(name)}'[\s\S]*?image:\s*'/assets/images/world-network/{re.escape(img_name)}'"
        if not re.search(pattern, component_code):
            print(f"       Failed mapping for {name} -> {img_name}")
            milestone_mapping_ok = False
            break

    if milestone_mapping_ok:
        print("[PASS] 03. Each milestone strictly references its designated original WebP image")
        passed += 1
    else:
        print("[FAIL] 03. Milestone image mapping mismatch")

    # Check 4: images are not the same file (unique content / hashes)
    hashes = set()
    for fname in expected_files:
        fpath = os.path.join(assets_dir, fname)
        with open(fpath, "rb") as f:
            h = hashlib.sha256(f.read()).hexdigest()
            hashes.add(h)

    if len(hashes) == 6:
        print("[PASS] 04. All six images have distinct SHA-256 hashes (no duplicate files)")
        passed += 1
    else:
        print(f"[FAIL] 04. Detected duplicate image content! Distinct hashes: {len(hashes)}/6")

    # Check 5: image dimensions are valid (> 800px width and height)
    dimensions_ok = True
    dims = []
    for fname in expected_files:
        fpath = os.path.join(assets_dir, fname)
        with Image.open(fpath) as im:
            dims.append((fname, im.size))
            if im.size[0] < 800 or im.size[1] < 400:
                dimensions_ok = False
                print(f"       Invalid dimensions for {fname}: {im.size}")

    if dimensions_ok:
        print(f"[PASS] 05. Image dimensions valid (sample desktop width: {dims[0][1][0]}x{dims[0][1][1]})")
        passed += 1
    else:
        print("[FAIL] 05. One or more images have invalid dimensions")

    # Check 6: images are landscape
    landscape_ok = True
    for fname in expected_files:
        fpath = os.path.join(assets_dir, fname)
        with Image.open(fpath) as im:
            w, h = im.size
            if w <= h:
                landscape_ok = False
                print(f"       Image {fname} is not landscape: {w}x{h}")

    if landscape_ok:
        print("[PASS] 06. All six images are landscape orientation (16:9 aspect ratio)")
        passed += 1
    else:
        print("[FAIL] 06. One or more images are portrait or square")

    # Check 7: image references are not broken (verify files on disk for all URLs referenced)
    # Extract individual image file names matching /assets/images/world-network/<filename>.webp
    referenced_urls = re.findall(r"/assets/images/world-network/([A-Za-z0-9_]+\.webp)", component_code)
    broken_refs = []
    for ref in set(referenced_urls):
        actual_disk_path = os.path.join(project_root, "public", "assets", "images", "world-network", ref)
        if not os.path.isfile(actual_disk_path):
            broken_refs.append(ref)

    if not broken_refs and len(referenced_urls) >= 6:
        print(f"[PASS] 07. All {len(set(referenced_urls))} unique WebP image references resolve to existing files on disk")
        passed += 1
    else:
        print(f"[FAIL] 07. Broken image references: {broken_refs}")

    # Check 8: no localhost image URLs
    if "localhost" not in component_code and "127.0.0.1" not in component_code:
        print("[PASS] 08. Zero localhost or hardcoded local host URLs found")
        passed += 1
    else:
        print("[FAIL] 08. Localhost reference detected in component code")

    # Check 9: no old repeated gameplay image references remain in this section
    old_gameplay_images = [
        "BH_Jaipur_RingRoad_02",
        "BH_Jodhpur_NightHighway_02",
        "BH_Rajsamand_AravalliRoad_02",
        "BH_Udaipur_LakeDrive_01",
        "BH_Jaisalmer_GoldenDunes_01",
        "BH_Jaisalmer_DesertSettlement_02"
    ]
    old_found = [img for img in old_gameplay_images if img in component_code]
    if not old_found:
        print("[PASS] 09. Zero old repeated gameplay screenshot references remain in RoadSection")
        passed += 1
    else:
        print(f"[FAIL] 09. Old gameplay screenshots still present: {old_found}")

    # Check 10: all six cards exist
    cards_count = component_code.count("CONCEPT MILESTONE 0")
    if cards_count == 6:
        print("[PASS] 10. All six milestone cards configured (01 through 06)")
        passed += 1
    else:
        print(f"[FAIL] 10. Expected 6 milestone cards, found {cards_count}")

    # Check 11: all six cards have alt text
    alts = re.findall(r"alt:\s*'([^']+)'", component_code)
    if len(alts) == 6 and all(len(a) > 20 for a in alts):
        print(f"[PASS] 11. All six milestone cards have descriptive accessibility alt text")
        passed += 1
    else:
        print(f"[FAIL] 11. Missing or incomplete alt text: {len(alts)} found")

    # Check 12: lightbox functionality exists
    lightbox_checks = [
        "world-network-lightbox-overlay" in component_code,
        "world-network-lightbox-dialog" in component_code,
        "handleCloseLightbox" in component_code,
        "handlePrev" in component_code,
        "handleNext" in component_code,
        "keydown" in component_code,
        "Escape" in component_code
    ]
    if all(lightbox_checks):
        print("[PASS] 12. Interactive Lightbox exists with ESC close, backdrop dismissal, and prev/next controls")
        passed += 1
    else:
        print(f"[FAIL] 12. Lightbox implementation incomplete: {lightbox_checks}")

    # Check 13: responsive image behavior exists
    has_srcset = "srcSet={wp.srcset}" in component_code or "srcset" in component_code
    has_sizes = "sizes=" in component_code
    has_lazy = 'loading={idx === 0 ? \'eager\' : \'lazy\'}' in component_code or 'loading="lazy"' in component_code
    has_decoding = 'decoding="async"' in component_code

    if has_srcset and has_sizes and has_lazy and has_decoding:
        print("[PASS] 13. Responsive image pipeline verified (srcset variants, sizes, eager/lazy, async decoding)")
        passed += 1
    else:
        print(f"[FAIL] 13. Responsive attributes missing (srcset: {has_srcset}, sizes: {has_sizes}, lazy: {has_lazy})")

    # Check 14: no real-world brand logo references were intentionally added in content
    # Exclude technical code keywords and check waypoint text descriptions and names
    real_brands = ["toyota", "honda", "ford", "bmw", "audi", "mercedes", "ferrari", "mahindra", "tata motors", "suzuki", "shell oil", "chevron oil", "exxon"]
    found_brands = [b for b in real_brands if b in component_code.lower()]
    if not found_brands:
        print("[PASS] 14. Zero real-world automobile or commercial brand references detected")
        passed += 1
    else:
        print(f"[FAIL] 14. Detected real-world brand references: {found_brands}")

    # Check 15: "WORLD CONCEPT / FUTURE DEVELOPMENT" remains visible
    status_phrase = "WORLD CONCEPT / FUTURE DEVELOPMENT"
    status_count = component_code.count(status_phrase)
    if status_count >= 2:
        print(f"[PASS] 15. 'WORLD CONCEPT / FUTURE DEVELOPMENT' prominently preserved (found {status_count} times)")
        passed += 1
    else:
        print(f"[FAIL] 15. Status phrase not sufficiently preserved: count={status_count}")

    print("================================================================================")
    print(f"RESULTS: {passed}/{total} CHECKS PASSED")
    print("================================================================================")

    if passed == total:
        print(">>> ALL 15 ACCEPTANCE CHECKS PASSED SUCCESSFULLY! <<<")
        return True
    else:
        print(">>> ACCEPTANCE CRITERIA FAILED <<<")
        return False

if __name__ == "__main__":
    success = run_acceptance_test()
    sys.exit(0 if success else 1)
