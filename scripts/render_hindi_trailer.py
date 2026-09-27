import os
import sys
import wave
import struct
import subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_MP4 = os.path.join(PROJECT_ROOT, "public", "assets", "video", "broken-horizon-hindi-trailer.mp4")
TEMP_WAV = os.path.join(PROJECT_ROOT, "public", "assets", "video", "temp_trailer_audio.wav")

WIDTH = 1280
HEIGHT = 720
FPS = 24
DURATION_SEC = 84
TOTAL_FRAMES = FPS * DURATION_SEC

# Shots definitions
SHOTS = [
    {
        "start": 0.0, "end": 6.0,
        "image": "public/assets/images/gameplay/BH_Jaipur_PinkCityMarket_01.jpg",
        "speaker": "काव्या (KAVYA)",
        "hindi": "हर शहर की अपनी एक कहानी होती है... लेकिन कुछ कहानियाँ छुपाई जाती हैं।",
        "eng": "Every city has its story... but some stories are kept buried.",
        "zoom": 1.05, "pan_y": -15
    },
    {
        "start": 6.0, "end": 12.0,
        "image": "public/assets/images/characters/character-arjun-mehta.jpg",
        "speaker": "अर्जुन (ARJUN)",
        "hindi": "मेरे लिए तो ये बस एक और सुबह थी।",
        "eng": "For me, it was just another morning on the highway.",
        "zoom": 1.06, "pan_y": 10
    },
    {
        "start": 12.0, "end": 20.0,
        "image": "public/assets/images/gameplay/BH_Jaipur_AmberFortApproach_01.jpg",
        "speaker": "पुलिस अधिकारी (OFFICER)",
        "hindi": "कागज़ात दिखाइए। कहाँ से आ रहे हो? — गैरेज से।",
        "eng": "Show me your papers. Where are you coming from? — From the garage.",
        "zoom": 1.05, "pan_y": -10
    },
    {
        "start": 20.0, "end": 27.0,
        "image": "public/assets/images/trailer/broken-horizon-reveal-trailer-poster.jpg",
        "speaker": "अर्जुन / अधिकारी (ARJUN / OFFICER)",
        "hindi": "ये मेरा रास्ता नहीं है। — शायद आपको याद नहीं।",
        "eng": "This isn't my route. — Perhaps your memory fails you.",
        "zoom": 1.07, "pan_y": -15
    },
    {
        "start": 27.0, "end": 33.0,
        "image": "public/assets/images/characters/character-kavya-rathore.jpg",
        "speaker": "काव्या (KAVYA)",
        "hindi": "ये तीसरी बार है... एक ही सड़क। अलग रिकॉर्ड।",
        "eng": "This is the third time... Same road. Completely different manifests.",
        "zoom": 1.06, "pan_y": 10
    },
    {
        "start": 33.0, "end": 40.0,
        "image": "public/assets/images/world-network/BH_WorldNetwork_JaipurBypass.webp",
        "speaker": "अर्जुन / काव्या (ARJUN / KAVYA)",
        "hindi": "तुम मेरा पीछा कर रही थीं? — मैं तुम्हारा नहीं... सच का पीछा कर रही थी।",
        "eng": "You were following me? — Not you... I was following the truth.",
        "zoom": 1.06, "pan_y": -10
    },
    {
        "start": 40.0, "end": 47.0,
        "image": "public/assets/images/gameplay/BH_Jaipur_BypassNightRain_01.jpg",
        "speaker": "अज्ञात कॉलर (UNKNOWN CALL)",
        "hindi": "जितना पता है... उतना ही रहने दो। — अब मामला बड़ा है।",
        "eng": "Leave it alone while you still can. — It's too late for that now.",
        "zoom": 1.05, "pan_y": 15
    },
    {
        "start": 47.0, "end": 57.0,
        "image": "public/assets/images/gameplay/BH_Jodhpur_NightHighway_02.jpg",
        "speaker": "अर्जुन / काव्या (PURSUIT)",
        "hindi": "पकड़कर बैठो! — तुमने कहा था तुम इसमें शामिल नहीं हो! — था नहीं!",
        "eng": "Hold on tight! — You said you weren't involved! — I wasn't!",
        "zoom": 1.08, "pan_y": -15
    },
    {
        "start": 57.0, "end": 65.0,
        "image": "public/assets/images/world-network/BH_WorldNetwork_TharDesertSea.webp",
        "speaker": "काव्या / अर्जुन (HIGHWAY ESCAPE)",
        "hindi": "वो हमें रोक नहीं रहे थे... वो देख रहे थे हम कहाँ जा रहे हैं।",
        "eng": "They weren't trying to stop us... They were tracking where we were heading.",
        "zoom": 1.05, "pan_y": 10
    },
    {
        "start": 65.0, "end": 73.0,
        "image": "public/assets/images/world-network/BH_WorldNetwork_SambharSaltFlats.webp",
        "speaker": "काव्या (KAVYA)",
        "hindi": "ये जगह... दो बार मौजूद है।",
        "eng": "This road... exists twice in the registry.",
        "zoom": 1.06, "pan_y": -10
    },
    {
        "start": 73.0, "end": 81.0,
        "image": "public/assets/images/world-network/BH_WorldNetwork_JaisalmerBastion.webp",
        "speaker": "काव्या (CONSPIRACY MONTAGE)",
        "hindi": "किसी ने सड़कें बदलीं। फिर रिकॉर्ड बदले। और अब... लोगों की ज़िंदगी बदल रही है।",
        "eng": "Someone altered the routes. Then altered the records. And now... people are disappearing.",
        "zoom": 1.07, "pan_y": 10
    },
    {
        "start": 81.0, "end": 84.0,
        "image": "public/assets/images/hero/hero-keyart-ue5.jpg",
        "speaker": "BROKEN HORIZON",
        "hindi": "जब रास्ता ही बदल जाए... तो सच कहाँ मिलेगा?",
        "eng": "When the road itself shifts... where will truth be found?",
        "zoom": 1.04, "pan_y": -5
    }
]

def generate_soundtrack(wav_path, duration_sec, sr=44100):
    print("Generating cinematic soundtrack...")
    total_samples = int(sr * duration_sec)
    audio = np.zeros(total_samples, dtype=np.float32)
    t = np.linspace(0, duration_sec, total_samples, False)

    # 1. Low drone foundation (48Hz + 96Hz + 144Hz)
    drone = 0.25 * np.sin(2 * np.pi * 48 * t) + 0.15 * np.sin(2 * np.pi * 96 * t)
    audio += drone

    # 2. Temple bell resonances (0s, 3s, 5s)
    for bell_t in [0.5, 3.2, 5.8]:
        idx = int(bell_t * sr)
        bell_len = int(3.5 * sr)
        if idx + bell_len <= total_samples:
            bt = np.linspace(0, 3.5, bell_len, False)
            envelope = np.exp(-1.8 * bt)
            bell_sig = 0.3 * (np.sin(2 * np.pi * 880 * bt) + 0.6 * np.sin(2 * np.pi * 1760 * bt) + 0.3 * np.sin(2 * np.pi * 2640 * bt)) * envelope
            audio[idx:idx+bell_len] += bell_sig

    # 3. Engine sound (6s to 12s and 47s to 57s)
    # Low frequency rumble
    engine_env = np.zeros(total_samples, dtype=np.float32)
    engine_env[int(6*sr):int(12*sr)] = 0.2
    engine_env[int(47*sr):int(57*sr)] = 0.45 # pursuit boost
    engine_env[int(57*sr):int(65*sr)] = 0.15
    engine_rumble = (np.sin(2 * np.pi * 65 * t) + 0.5 * np.sin(2 * np.pi * 130 * t) + 0.25 * np.random.normal(0, 0.1, total_samples)) * engine_env
    audio += engine_rumble.astype(np.float32)

    # 4. Camera shutter clicks (27.5s, 29.8s, 31.5s)
    for click_t in [27.5, 29.8, 31.5]:
        c_idx = int(click_t * sr)
        c_len = int(0.08 * sr)
        if c_idx + c_len < total_samples:
            audio[c_idx:c_idx+c_len] += 0.4 * np.random.normal(0, 0.4, c_len).astype(np.float32)

    # 5. Percussion impact hits (at suspense transitions: 20s, 33s, 40s, 47s, 65s, 73s, 81s)
    for hit_t in [20.0, 33.0, 40.0, 47.0, 65.0, 73.0, 81.0]:
        h_idx = int(hit_t * sr)
        h_len = int(2.0 * sr)
        if h_idx + h_len < total_samples:
            ht = np.linspace(0, 2.0, h_len, False)
            h_env = np.exp(-3.0 * ht)
            hit_sig = 0.55 * np.sin(2 * np.pi * (80 - 30 * ht) * ht) * h_env
            audio[h_idx:h_idx+h_len] += hit_sig.astype(np.float32)

    # 6. Wind sweep (65s to 73s)
    wind_env = np.zeros(total_samples, dtype=np.float32)
    wind_env[int(65*sr):int(73*sr)] = 0.18
    audio += (np.random.normal(0, 0.1, total_samples) * wind_env).astype(np.float32)

    # 7. Climax rhythm in pursuit (47s - 57s) and conspiracy (73s - 81s)
    for b in np.arange(47.0, 56.5, 0.5):
        b_idx = int(b * sr)
        b_len = int(0.2 * sr)
        if b_idx + b_len < total_samples:
            bt = np.linspace(0, 0.2, b_len, False)
            audio[b_idx:b_idx+b_len] += 0.35 * np.sin(2 * np.pi * 90 * bt) * np.exp(-12.0 * bt)

    # Normalize audio to prevent clipping
    max_val = np.max(np.abs(audio))
    if max_val > 0.01:
        audio = (audio / max_val) * 0.88

    int16_audio = (audio * 32767).astype(np.int16)
    with wave.open(wav_path, "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sr)
        wf.writeframes(int16_audio.tobytes())
    print(f"Soundtrack written to {wav_path} ({os.path.getsize(wav_path)} bytes)")

def render_trailer():
    os.makedirs(os.path.dirname(OUTPUT_MP4), exist_ok=True)
    generate_soundtrack(TEMP_WAV, DURATION_SEC)

    # Load fonts
    try:
        font_hindi_lg = ImageFont.truetype("mangal.ttf", 26)
        font_hindi_sm = ImageFont.truetype("mangal.ttf", 21)
        font_title_hi = ImageFont.truetype("mangal.ttf", 30)
    except Exception:
        font_hindi_lg = ImageFont.load_default()
        font_hindi_sm = ImageFont.load_default()
        font_title_hi = ImageFont.load_default()

    try:
        font_eng = ImageFont.truetype("arial.ttf", 17)
        font_speaker = ImageFont.truetype("arial.ttf", 15)
        font_title = ImageFont.truetype("arial.ttf", 48)
        font_sub = ImageFont.truetype("arial.ttf", 22)
    except Exception:
        font_eng = ImageFont.load_default()
        font_speaker = ImageFont.load_default()
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()

    # Preload and resize shot images
    loaded_images = []
    for shot in SHOTS:
        img_path = os.path.join(PROJECT_ROOT, shot["image"])
        if os.path.exists(img_path):
            img = Image.open(img_path).convert("RGB")
        else:
            img = Image.new("RGB", (WIDTH, HEIGHT), (20, 20, 25))
        loaded_images.append(img)

    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    cmd = [
        ffmpeg_exe, "-y",
        "-f", "rawvideo", "-vcodec", "rawvideo",
        "-s", f"{WIDTH}x{HEIGHT}", "-pix_fmt", "bgr24", "-r", str(FPS),
        "-i", "-",
        "-i", TEMP_WAV,
        "-c:v", "libx264", "-preset", "medium", "-crf", "22",
        "-c:a", "aac", "-b:a", "192k",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        OUTPUT_MP4
    ]

    print(f"Launching FFmpeg encoder to produce {OUTPUT_MP4}...")
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stderr=subprocess.DEVNULL)

    for frame_idx in range(TOTAL_FRAMES):
        t_sec = frame_idx / float(FPS)

        # Find current shot
        shot_idx = -1
        for i, s in enumerate(SHOTS):
            if s["start"] <= t_sec < s["end"]:
                shot_idx = i
                break

        if shot_idx != -1:
            shot = SHOTS[shot_idx]
            base_img = loaded_images[shot_idx]
            shot_prog = (t_sec - shot["start"]) / (shot["end"] - shot["start"])

            # Ken burns effect: scale & pan
            zoom = 1.0 + (shot["zoom"] - 1.0) * shot_prog
            sw = int(WIDTH * zoom)
            sh = int(HEIGHT * zoom)
            scaled = base_img.resize((sw, sh), Image.Resampling.BILINEAR)

            # Crop center with pan
            pan_y = int(shot["pan_y"] * shot_prog)
            crop_x = (sw - WIDTH) // 2
            crop_y = max(0, min((sh - HEIGHT) // 2 + pan_y, sh - HEIGHT))
            frame_img = scaled.crop((crop_x, crop_y, crop_x + WIDTH, crop_y + HEIGHT))

            # Fade in/out at cut transitions
            fade_dur = 0.4
            fade_in = min(1.0, (t_sec - shot["start"]) / fade_dur)
            fade_out = min(1.0, (shot["end"] - t_sec) / fade_dur)
            alpha = min(fade_in, fade_out)

            draw = ImageDraw.Draw(frame_img, "RGBA")

            # Cinematic letterbox bars
            bar_h = 42
            draw.rectangle([0, 0, WIDTH, bar_h], fill=(0, 0, 0, 255))
            draw.rectangle([0, HEIGHT - bar_h, WIDTH, HEIGHT], fill=(0, 0, 0, 255))

            # Subtitle container card
            sub_h = 100
            sub_y = HEIGHT - bar_h - sub_h - 10
            draw.rectangle([120, sub_y, WIDTH - 120, sub_y + sub_h], fill=(7, 8, 11, 210), outline=(234, 88, 12, 100), width=1)

            # Speaker Pill
            draw.rectangle([140, sub_y + 12, 140 + 190, sub_y + 36], fill=(234, 88, 12, 230))
            draw.text((150, sub_y + 14), shot["speaker"], font=font_speaker, fill=(0, 0, 0))

            # Hindi spoken line
            draw.text((345, sub_y + 12), shot["hindi"], font=font_hindi_lg, fill=(255, 255, 255))
            # English translation
            draw.text((145, sub_y + 54), shot["eng"], font=font_eng, fill=(215, 215, 220))

            # Top branding watermark
            draw.text((45, 12), "BROKEN HORIZON // OFFICIAL HINDI GAME TRAILER", font=font_speaker, fill=(234, 88, 12, 200))
            draw.text((WIDTH - 280, 12), "UNREAL ENGINE 4.27 PRE-ALPHA", font=font_speaker, fill=(180, 180, 180, 180))

            # Fade overlay if needed
            if alpha < 1.0:
                overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, int((1.0 - alpha) * 255)))
                frame_img.paste(overlay, (0, 0), overlay)

        else:
            # End Title Slate (84s - end)
            frame_img = Image.new("RGB", (WIDTH, HEIGHT), (6, 7, 9))
            draw = ImageDraw.Draw(frame_img)

            # Glowing orange title
            draw.text((WIDTH // 2 - 270, HEIGHT // 2 - 130), "BROKEN HORIZON", font=font_title, fill=(234, 88, 12))
            draw.text((WIDTH // 2 - 160, HEIGHT // 2 - 60), "THE HORIZON IS BROKEN", font=font_sub, fill=(240, 240, 245))

            # Hindi quote
            draw.text((WIDTH // 2 - 250, HEIGHT // 2 + 10), "जब रास्ता ही बदल जाए... तो सच कहाँ मिलेगा?", font=font_title_hi, fill=(255, 215, 170))

            # Release info
            draw.text((WIDTH // 2 - 145, HEIGHT // 2 + 95), "COMING SOON · PC GAME", font=font_sub, fill=(160, 160, 170))
            draw.text((WIDTH // 2 - 130, HEIGHT // 2 + 130), "UNREAL ENGINE 4.27", font=font_eng, fill=(234, 88, 12))

        # Convert RGB to BGR for rawvideo stream
        frame_bgr = np.array(frame_img)[:, :, ::-1]
        proc.stdin.write(frame_bgr.tobytes())

        if frame_idx % 240 == 0:
            pct = int((frame_idx / TOTAL_FRAMES) * 100)
            print(f"Render progress: {pct}% ({frame_idx}/{TOTAL_FRAMES} frames)")

    proc.stdin.close()
    proc.wait()

    # Clean up temporary audio
    if os.path.exists(TEMP_WAV):
        os.remove(TEMP_WAV)

    final_size = os.path.getsize(OUTPUT_MP4)
    print(f"Trailer successfully rendered! Output: {OUTPUT_MP4} ({final_size / (1024*1024):.2f} MB)")

if __name__ == "__main__":
    render_trailer()
