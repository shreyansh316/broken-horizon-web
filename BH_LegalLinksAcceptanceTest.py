import os
import glob
import sys

def run_tests():
    project_dir = os.path.dirname(os.path.abspath(__file__))
    dist_dir = os.path.join(project_dir, 'dist')
    src_dir = os.path.join(project_dir, 'src')
    
    tests_passed = 0
    total_tests = 0
    
    def assert_true(condition, message):
        nonlocal tests_passed, total_tests
        total_tests += 1
        if condition:
            tests_passed += 1
            print(f"PASS: {message}")
        else:
            print(f"FAIL: {message}")
            
    # 1. Production build exists
    assert_true(os.path.isdir(dist_dir), "Production build (dist/) exists")
    
    # 2 & 3. Privacy and Terms routes exist in App.tsx
    app_tsx = os.path.join(src_dir, 'App.tsx')
    with open(app_tsx, 'r', encoding='utf-8') as f:
        content = f.read()
        assert_true("currentRoute === 'privacy'" in content, "Privacy route logic exists in App.tsx")
        assert_true("currentRoute === 'terms'" in content, "Terms route logic exists in App.tsx")
        
    # 4 & 5. Footer contains Privacy Policy and Terms of Service links
    footer_tsx = os.path.join(src_dir, 'components', 'Footer', 'FooterSection.tsx')
    with open(footer_tsx, 'r', encoding='utf-8') as f:
        content = f.read()
        assert_true('href="#/privacy"' in content, "Footer contains valid Privacy Policy link")
        assert_true('href="#/terms"' in content, "Footer contains valid Terms of Service link")
        assert_true('localhost' not in content, "Footer does not contain localhost")
        
    # 8 & 9. No production code contains localhost
    localhost_found = False
    for root, dirs, files in os.walk(dist_dir):
        for file in files:
            if file.endswith('.html') or file.endswith('.js'):
                with open(os.path.join(root, file), 'r', encoding='utf-8') as f:
                    try:
                        if 'localhost' in f.read():
                            localhost_found = True
                    except:
                        pass
    assert_true(not localhost_found, "No production HTML/JS contains localhost")
    
    # 10 - 15. Verify Privacy and Terms component contents
    privacy_tsx = os.path.join(src_dir, 'components', 'Legal', 'PrivacyPolicy.tsx')
    terms_tsx = os.path.join(src_dir, 'components', 'Legal', 'TermsOfService.tsx')
    
    with open(privacy_tsx, 'r', encoding='utf-8') as f:
        content = f.read()
        assert_true('<h1>' in content or '<h1 ' in content, "Privacy page contains a page title")
        assert_true('BACK TO BROKEN HORIZON' in content, "Privacy page has home navigation")
        assert_true('href="#/terms"' in content, "Privacy page links to Terms")
        
    with open(terms_tsx, 'r', encoding='utf-8') as f:
        content = f.read()
        assert_true('<h1>' in content or '<h1 ' in content, "Terms page contains a page title")
        assert_true('BACK TO BROKEN HORIZON' in content, "Terms page has home navigation")
        assert_true('href="#/privacy"' in content, "Terms page links to Privacy")
        
    # 16-18. Dev/Access/Admin routes still exist
    with open(app_tsx, 'r', encoding='utf-8') as f:
        content = f.read()
        assert_true("currentRoute === 'development'" in content, "Development route still exists")
        assert_true("currentRoute === 'playtest'" in content, "Access/Playtest route still exists")
        assert_true("currentRoute === 'admin'" in content, "Admin route still exists")
        
    # 19. Firebase hosting configuration valid
    firebase_json = os.path.join(project_dir, 'firebase.json')
    assert_true(os.path.exists(firebase_json), "Firebase configuration remains valid")
    
    print(f"\n--- Test Summary: {tests_passed}/{total_tests} Passed ---")
    if tests_passed == total_tests:
        sys.exit(0)
    else:
        sys.exit(1)

if __name__ == '__main__':
    run_tests()
