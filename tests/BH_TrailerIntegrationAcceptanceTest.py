"""
=============================================================================
BROKEN HORIZON — TRAILER INTEGRATION ACCEPTANCE TEST SUITE
=============================================================================
Tests:
 1. trailer section exists
 2. poster asset exists
 3. poster loads
 4. poster maintains 16:9 ratio
 5. play button exists
 6. play button is keyboard accessible
 7. aria-label exists
 8. mobile layout works
 9. desktop layout works
10. no horizontal overflow
11. modal opens
12. modal closes
13. ESC closes modal
14. focus returns correctly
15. no fake video URL
16. no broken asset path
17. existing routes remain functional
18. no localhost references
19. no duplicate trailer implementation
20. reduced-motion behavior exists
=============================================================================
"""

import os
import sys
import json
import time
import asyncio
import subprocess
import threading
import socketserver
import http.server
import urllib.request
import websockets

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST_DIR = os.path.join(PROJECT_ROOT, "dist")
PORT = 9994
CDP_PORT = 9226

def find_browser():
    candidates = [
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        os.path.expanduser(r"~\AppData\Local\Google\Chrome\Application\chrome.exe"),
    ]
    for p in candidates:
        if os.path.exists(p):
            return p
    return None

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST_DIR, **kwargs)

    def do_GET(self):
        path = self.path.split('?')[0].split('#')[0]
        full_path = os.path.join(DIST_DIR, path.lstrip('/'))
        if not os.path.exists(full_path) and '.' not in os.path.basename(path):
            self.path = '/index.html'
        return super().do_GET()

    def log_message(self, format, *args):
        pass

async def send_cdp(ws, method, params=None):
    call_id = int(time.time() * 1000) % 1000000 + int(os.urandom(2).hex(), 16)
    msg = {"id": call_id, "method": method, "params": params or {}}
    await ws.send(json.dumps(msg))
    while True:
        resp = await ws.recv()
        data = json.loads(resp)
        if data.get("id") == call_id:
            return data.get("result", {})

async def eval_js(ws, expr):
    result = await send_cdp(ws, "Runtime.evaluate", {
        "expression": expr,
        "returnByValue": True,
        "awaitPromise": True
    })
    if "exceptionDetails" in result:
        raise RuntimeError(f"JS Eval Error: {result['exceptionDetails']}")
    return result.get("result", {}).get("value")

async def run_tests():
    print("=" * 70)
    print("BROKEN HORIZON — OFFICIAL TRAILER INTEGRATION ACCEPTANCE SUITE")
    print("=" * 70)

    browser_exe = find_browser()
    if not browser_exe:
        raise RuntimeError("No Chromium/Edge browser found for testing.")

    temp_profile = os.path.join(PROJECT_ROOT, "chrome_trailer_test_profile")
    os.makedirs(temp_profile, exist_ok=True)

    # Start HTTP server
    httpd = socketserver.TCPServer(("127.0.0.1", PORT), SPAHandler)
    httpd.allow_reuse_address = True
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()

    # Launch Chrome
    chrome_args = [
        browser_exe,
        "--headless=new",
        f"--remote-debugging-port={CDP_PORT}",
        f"--user-data-dir={temp_profile}",
        "--no-first-run",
        "--no-default-browser-check",
        "--disable-extensions",
        f"http://127.0.0.1:{PORT}/"
    ]
    proc = subprocess.Popen(chrome_args, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(2)

    results = []

    try:
        with urllib.request.urlopen(f"http://127.0.0.1:{CDP_PORT}/json") as r:
            pages = json.loads(r.read().decode())
        page_target = [p for p in pages if p.get("type") == "page"][0]
        ws_url = page_target["webSocketDebuggerUrl"]

        async with websockets.connect(ws_url, max_size=20*1024*1024) as ws:
            await send_cdp(ws, "Page.enable")
            await send_cdp(ws, "DOM.enable")
            await send_cdp(ws, "Runtime.enable")

            # Navigate to homepage
            await send_cdp(ws, "Page.navigate", {"url": f"http://127.0.0.1:{PORT}/"})
            await asyncio.sleep(2)

            # Test 1: Trailer section exists
            t1 = await eval_js(ws, """(() => {
                const sec = document.querySelector('section#trailer');
                if (!sec) return { pass: false, error: 'No section#trailer found' };
                const h2 = sec.querySelector('h2');
                const hasHeading = h2 && h2.textContent.includes('WATCH THE REVEAL TRAILER');
                const hasEyebrow = sec.textContent.includes('THE FIRST WRONG TURN');
                const hasStatus = sec.textContent.includes('TRAILER AVAILABLE') || sec.textContent.includes('TRAILER IN PRODUCTION');
                return {
                    pass: !!(sec && hasHeading && hasEyebrow && hasStatus),
                    heading: h2 ? h2.textContent.trim() : null,
                    hasStatus
                };
            })()""")
            assert t1['pass'], f"Test 1 Failed: {t1}"
            results.append(("01. Trailer section exists & has canonical copy", True, f"Heading: '{t1.get('heading')}'"))

            # Test 2: Poster asset exists
            poster_webp = os.path.join(DIST_DIR, "assets", "images", "trailer", "broken-horizon-reveal-trailer-poster.webp")
            poster_mobile = os.path.join(DIST_DIR, "assets", "images", "trailer", "broken-horizon-reveal-trailer-poster-mobile.webp")
            t2_pass = os.path.exists(poster_webp) and os.path.getsize(poster_webp) > 10000 and os.path.exists(poster_mobile)
            assert t2_pass, f"Test 2 Failed: missing poster webp assets at {poster_webp}"
            results.append(("02. Poster asset exists on disk (Desktop & Mobile WebP)", True, f"Sizes: {os.path.getsize(poster_webp)}B / {os.path.getsize(poster_mobile)}B"))

            # Test 3: Poster loads in DOM
            t3 = await eval_js(ws, """(() => {
                const img = document.querySelector('#trailer img.trailer-frame-poster');
                if (!img) return { pass: false, error: 'No trailer poster img found' };
                return {
                    pass: img.complete && img.naturalWidth > 0,
                    naturalWidth: img.naturalWidth,
                    naturalHeight: img.naturalHeight,
                    src: img.currentSrc || img.src
                };
            })()""")
            assert t3['pass'], f"Test 3 Failed: {t3}"
            results.append(("03. Poster loads successfully in browser", True, f"Dimensions: {t3['naturalWidth']}x{t3['naturalHeight']}"))

            # Test 4: Poster maintains 16:9 ratio
            t4 = await eval_js(ws, """(() => {
                const frame = document.querySelector('#trailer .trailer-cinema-frame');
                if (!frame) return { pass: false, error: 'No frame found' };
                const rect = frame.getBoundingClientRect();
                const ratio = rect.width / rect.height;
                const cs = window.getComputedStyle(frame);
                const has16_9 = cs.aspectRatio.includes('16 / 9') || (ratio >= 1.70 && ratio <= 1.85);
                return {
                    pass: has16_9,
                    aspectRatio: cs.aspectRatio,
                    computedRatio: ratio,
                    width: rect.width,
                    height: rect.height
                };
            })()""")
            assert t4['pass'], f"Test 4 Failed: {t4}"
            results.append(("04. Poster maintains 16:9 aspect ratio", True, f"Aspect Ratio: {t4['aspectRatio']} (Ratio: {t4['computedRatio']:.3f})"))

            # Test 5: Play button exists
            t5 = await eval_js(ws, """(() => {
                const btn = document.querySelector('#trailer .trailer-center-play-btn');
                if (!btn) return { pass: false };
                const svg = btn.querySelector('svg');
                const caption = btn.querySelector('.trailer-play-caption');
                return {
                    pass: !!(btn && svg && caption && caption.textContent.includes('WATCH REVEAL TRAILER')),
                    caption: caption ? caption.textContent.trim() : null
                };
            })()""")
            assert t5['pass'], f"Test 5 Failed: {t5}"
            results.append(("05. Play button exists with icon and caption", True, f"Caption: '{t5['caption']}'"))

            # Test 6: Play button is keyboard accessible
            t6 = await eval_js(ws, """(() => {
                const btn = document.querySelector('#trailer .trailer-center-play-btn');
                if (!btn) return { pass: false };
                btn.focus();
                const isFocused = document.activeElement === btn;
                const isButtonTag = btn.tagName.toLowerCase() === 'button';
                return {
                    pass: isButtonTag && isFocused,
                    tagName: btn.tagName,
                    tabIndex: btn.tabIndex
                };
            })()""")
            assert t6['pass'], f"Test 6 Failed: {t6}"
            results.append(("06. Play button is semantic & keyboard focusable", True, f"Tag: <{t6['tagName'].lower()}>, TabIndex: {t6['tabIndex']}"))

            # Test 7: aria-label exists
            t7 = await eval_js(ws, """(() => {
                const btn = document.querySelector('#trailer .trailer-center-play-btn');
                const aria = btn ? btn.getAttribute('aria-label') : null;
                return {
                    pass: aria === 'Watch Broken Horizon reveal trailer',
                    ariaLabel: aria
                };
            })()""")
            assert t7['pass'], f"Test 7 Failed: {t7}"
            results.append(("07. Accessible aria-label verified", True, f"aria-label: '{t7['ariaLabel']}'"))

            # Test 8: Mobile layout works (375x812)
            await send_cdp(ws, "Emulation.setDeviceMetricsOverride", {
                "width": 375,
                "height": 812,
                "deviceScaleFactor": 2,
                "mobile": True
            })
            await asyncio.sleep(0.5)
            t8 = await eval_js(ws, """(() => {
                const btn = document.querySelector('#trailer .trailer-center-play-btn');
                const frame = document.querySelector('#trailer .trailer-cinema-frame');
                const rectBtn = btn.getBoundingClientRect();
                const rectFrame = frame.getBoundingClientRect();
                return {
                    pass: rectBtn.width >= 44 && rectBtn.height >= 44 && rectFrame.width <= 375,
                    btnWidth: rectBtn.width,
                    btnHeight: rectBtn.height,
                    frameWidth: rectFrame.width
                };
            })()""")
            assert t8['pass'], f"Test 8 Failed: {t8}"
            results.append(("08. Mobile layout verified (375px viewport)", True, f"Play touch target: {t8['btnWidth']}x{t8['btnHeight']}px (>=44px)"))

            # Test 9: Desktop layout works (1440x900)
            await send_cdp(ws, "Emulation.setDeviceMetricsOverride", {
                "width": 1440,
                "height": 900,
                "deviceScaleFactor": 1,
                "mobile": False
            })
            await asyncio.sleep(0.5)
            t9 = await eval_js(ws, """(() => {
                const box = document.querySelector('#trailer .trailer-viewport-box');
                const rect = box.getBoundingClientRect();
                return {
                    pass: rect.width <= 1205 && rect.width > 900,
                    width: rect.width
                };
            })()""")
            assert t9['pass'], f"Test 9 Failed: {t9}"
            results.append(("09. Desktop layout constrained and centered", True, f"Constrained Box Width: {t9['width']}px"))

            # Test 10: No horizontal overflow
            t10 = await eval_js(ws, """(() => {
                const docWidth = document.documentElement.scrollWidth;
                const winWidth = window.innerWidth;
                return {
                    pass: docWidth <= winWidth,
                    scrollWidth: docWidth,
                    innerWidth: winWidth
                };
            })()""")
            assert t10['pass'], f"Test 10 Failed: {t10}"
            results.append(("10. Zero horizontal overflow across page", True, f"scrollWidth ({t10['scrollWidth']}px) <= innerWidth ({t10['innerWidth']}px)"))

            # Test 11: Modal opens
            await eval_js(ws, """(() => {
                const playBtn = document.querySelector('#trailer .trailer-center-play-btn');
                playBtn.focus();
                playBtn.click();
            })()""")
            await asyncio.sleep(0.4)
            t11 = await eval_js(ws, """(() => {
                const modal = document.querySelector('.trailer-modal-backdrop');
                return {
                    pass: !!modal && modal.getAttribute('role') === 'dialog' && modal.getAttribute('aria-modal') === 'true',
                    role: modal ? modal.getAttribute('role') : null,
                    ariaModal: modal ? modal.getAttribute('aria-modal') : null
                };
            })()""")
            assert t11['pass'], f"Test 11 Failed: {t11}"
            results.append(("11. Cinematic modal opens with accessibility attributes", True, "role='dialog', aria-modal='true'"))

            # Test 12: Modal closes via Close button
            await eval_js(ws, """(() => {
                const closeBtn = document.querySelector('.trailer-modal-close');
                if (closeBtn) closeBtn.click();
            })()""")
            await asyncio.sleep(0.4)
            t12 = await eval_js(ws, """(() => {
                const modalAfter = document.querySelector('.trailer-modal-backdrop');
                return {
                    pass: modalAfter === null
                };
            })()""")
            assert t12['pass'], f"Test 12 Failed: {t12}"
            results.append(("12. Modal closes via Close control", True, "Modal cleanly unmounted"))

            # Test 13: ESC key closes modal
            await eval_js(ws, """(() => {
                const playBtn = document.querySelector('#trailer .trailer-center-play-btn');
                playBtn.click();
            })()""")
            await asyncio.sleep(0.4)
            await eval_js(ws, """(() => {
                window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
            })()""")
            await asyncio.sleep(0.4)
            t13 = await eval_js(ws, """(() => {
                const modalAfterEsc = document.querySelector('.trailer-modal-backdrop');
                return {
                    pass: modalAfterEsc === null
                };
            })()""")
            assert t13['pass'], f"Test 13 Failed: {t13}"
            results.append(("13. ESC key dismisses modal", True, "Escape event handled properly"))

            # Test 14: Focus returns correctly to trigger
            await eval_js(ws, """(() => {
                const playBtn = document.querySelector('#trailer .trailer-center-play-btn');
                playBtn.focus();
                playBtn.click();
            })()""")
            await asyncio.sleep(0.4)
            await eval_js(ws, """(() => {
                window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
            })()""")
            await asyncio.sleep(0.4)
            t14 = await eval_js(ws, """(() => {
                const active = document.activeElement;
                const isPlayBtn = active && active.classList.contains('trailer-center-play-btn');
                return {
                    pass: isPlayBtn,
                    activeTag: active ? active.tagName : null,
                    activeClass: active ? active.className : null
                };
            })()""")
            assert t14['pass'], f"Test 14 Failed: {t14}"
            results.append(("14. Focus returns cleanly to trigger button", True, f"Active Element: <{t14['activeTag']}> .{t14['activeClass']}"))

            # Test 15: No fake video URL
            t15 = await eval_js(ws, """(() => {
                // Check if any youtube, vimeo, or fake video embeds exist
                const iframes = Array.from(document.querySelectorAll('iframe'));
                const fakeVideos = iframes.filter(f => f.src.includes('youtube.com') || f.src.includes('vimeo.com'));
                const sec = document.querySelector('#trailer');
                const hasValidStatus = sec.textContent.includes('TRAILER AVAILABLE') || sec.textContent.includes('TRAILER IN PRODUCTION');
                return {
                    pass: fakeVideos.length === 0 && hasValidStatus,
                    fakeIframesCount: fakeVideos.length,
                    hasValidStatus
                };
            })()""")
            assert t15['pass'], f"Test 15 Failed: {t15}"
            results.append(("15. No fake video URL; Status is verified", True, "Zero fake iframes/links"))

            # Test 16: No broken asset paths
            t16 = await eval_js(ws, """(() => {
                const imgs = Array.from(document.querySelectorAll('#trailer img'));
                const broken = imgs.filter(i => !i.complete || i.naturalWidth === 0);
                return {
                    pass: broken.length === 0 && imgs.length > 0,
                    imgCount: imgs.length,
                    brokenCount: broken.length
                };
            })()""")
            assert t16['pass'], f"Test 16 Failed: {t16}"
            results.append(("16. Zero broken asset paths in trailer section", True, f"Loaded Images: {t16['imgCount']}"))

            # Test 17: Existing routes remain functional
            routes = ["#/world", "#/world/jaipur", "#/garage", "#/development", "#/access"]
            route_results = []
            for r_hash in routes:
                await send_cdp(ws, "Page.navigate", {"url": f"http://127.0.0.1:{PORT}/{r_hash}"})
                await asyncio.sleep(0.6)
                chk = await eval_js(ws, "document.body.innerText.length > 100")
                route_results.append(chk)
            assert all(route_results), f"Test 17 Failed: route failures in {routes}"
            results.append(("17. All existing routes remain functional", True, f"Verified {len(routes)} routes: {', '.join(routes)}"))

            # Test 18: No localhost references in bundled assets
            dist_js_dir = os.path.join(DIST_DIR, "assets")
            bad_refs = []
            for fname in os.listdir(dist_js_dir):
                if fname.endswith(".js"):
                    with open(os.path.join(dist_js_dir, fname), "r", encoding="utf-8", errors="ignore") as f:
                        content = f.read()
                        if "http://localhost:" in content or "http://127.0.0.1:" in content:
                            bad_refs.append(fname)
            assert len(bad_refs) == 0, f"Test 18 Failed: found localhost in {bad_refs}"
            results.append(("18. Zero localhost references in production bundle", True, "Clean production build"))

            # Test 19: No duplicate trailer implementation
            await send_cdp(ws, "Page.navigate", {"url": f"http://127.0.0.1:{PORT}/"})
            await asyncio.sleep(0.8)
            t19 = await eval_js(ws, """(() => {
                const trailerSections = document.querySelectorAll('section#trailer');
                const trailerModals = document.querySelectorAll('.trailer-modal-backdrop');
                return {
                    pass: trailerSections.length === 1 && trailerModals.length === 0,
                    sectionCount: trailerSections.length,
                    modalCount: trailerModals.length
                };
            })()""")
            assert t19['pass'], f"Test 19 Failed: {t19}"
            results.append(("19. Single source of truth (zero duplicate implementations)", True, f"Unique section#trailer: {t19['sectionCount']}"))

            # Test 20: prefers-reduced-motion behavior exists
            dist_css_dir = os.path.join(DIST_DIR, "assets")
            css_has_reduced_motion = False
            for fname in os.listdir(dist_css_dir):
                if fname.endswith(".css"):
                    with open(os.path.join(dist_css_dir, fname), "r", encoding="utf-8", errors="ignore") as f:
                        css_text = f.read()
                        if "prefers-reduced-motion" in css_text and "trailer" in css_text:
                            css_has_reduced_motion = True
                            break
            assert css_has_reduced_motion, "Test 20 Failed: no prefers-reduced-motion CSS found for trailer"
            results.append(("20. Reduced-motion accessibility verified in CSS", True, "prefers-reduced-motion media query active"))

    finally:
        proc.terminate()
        try:
            proc.wait(timeout=3)
        except Exception:
            proc.kill()
        httpd.shutdown()

    print("\n" + "=" * 70)
    print("ACCEPTANCE TEST RESULTS:")
    print("=" * 70)
    for name, passed, detail in results:
        status = "[PASS]" if passed else "[FAIL]"
        print(f"{status} {name:<45} | {detail}")
    print("=" * 70)
    print(f"TOTAL: {len(results)}/20 TESTS PASSED (100% SUCCESS)")
    print("=" * 70)

if __name__ == "__main__":
    asyncio.run(run_tests())
