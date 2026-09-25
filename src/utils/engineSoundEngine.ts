// Procedural Web Audio Engine Sound & Dyno Simulator for Broken Horizon
// Synthesizes starter motor, inline-6 / V8 exhaust roar, turbo whistle, blow-off valve, and pneumatic wrench SFX

class EngineSoundEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private masterGain: GainNode | null = null;
  private engineGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private turboOsc: OscillatorNode | null = null;
  private turboGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private currentRpm: number = 0;
  private targetRpm: number = 850;
  private animFrameId: number | null = null;
  private onRpmUpdateCallback: ((rpm: number) => void) | null = null;

  private init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    this.ctx = new AudioCtx();
  }

  public getIsRunning(): boolean {
    return this.isRunning;
  }

  public getCurrentRpm(): number {
    return this.currentRpm;
  }

  public startIgnition(onRpmChange?: (rpm: number) => void): boolean {
    this.init();
    if (!this.ctx) return false;

    if (this.isRunning) {
      this.stopEngine();
      return false;
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.onRpmUpdateCallback = onRpmChange || null;
    this.isRunning = true;

    // Master bus
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.4, this.ctx.currentTime + 0.6);
    this.masterGain.connect(this.ctx.destination);

    // Starter motor sound: rapid clicking pulses
    const starterOsc = this.ctx.createOscillator();
    const starterGain = this.ctx.createGain();
    starterOsc.type = 'sawtooth';
    starterOsc.frequency.setValueAtTime(18, this.ctx.currentTime);
    starterOsc.frequency.linearRampToValueAtTime(32, this.ctx.currentTime + 0.45);
    starterGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    starterGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
    starterOsc.connect(starterGain);
    starterGain.connect(this.masterGain);
    starterOsc.start();
    starterOsc.stop(this.ctx.currentTime + 0.55);

    // Initial RPM kick
    this.currentRpm = 200;
    this.targetRpm = 2200; // Cold start rev flare

    // Main Engine sound chain (after starter)
    const startTime = this.ctx.currentTime + 0.4;
    this.engineGain = this.ctx.createGain();
    this.engineGain.gain.setValueAtTime(0.001, startTime);
    this.engineGain.gain.exponentialRampToValueAtTime(0.35, startTime + 0.2);

    // Lowpass filter simulates vehicle exhaust cavity
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(220, startTime);
    this.filter.Q.setValueAtTime(3.5, startTime);

    // Oscillator 1: Primary firing frequency
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = 'sawtooth';
    this.osc1.frequency.setValueAtTime(28, startTime);

    // Oscillator 2: Harmonic richness
    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = 'triangle';
    this.osc2.frequency.setValueAtTime(42, startTime);

    // Sub oscillator: Deep chest rumble
    this.subOsc = this.ctx.createOscillator();
    this.subOsc.type = 'sine';
    this.subOsc.frequency.setValueAtTime(22, startTime);

    // Turbo spool oscillator
    this.turboOsc = this.ctx.createOscillator();
    this.turboOsc.type = 'sine';
    this.turboOsc.frequency.setValueAtTime(900, startTime);
    this.turboGain = this.ctx.createGain();
    this.turboGain.gain.setValueAtTime(0.001, startTime);

    this.osc1.connect(this.filter);
    this.osc2.connect(this.filter);
    this.subOsc.connect(this.engineGain);
    this.turboOsc.connect(this.turboGain);
    this.turboGain.connect(this.masterGain);

    this.filter.connect(this.engineGain);
    this.engineGain.connect(this.masterGain);

    this.osc1.start(startTime);
    this.osc2.start(startTime);
    this.subOsc.start(startTime);
    this.turboOsc.start(startTime);

    // After flare, settle down to idle RPM (~850)
    setTimeout(() => {
      if (this.isRunning) {
        this.targetRpm = 850;
      }
    }, 900);

    this.startRpmLoop();
    return true;
  }

  private startRpmLoop() {
    const update = () => {
      if (!this.isRunning) return;

      // Smooth RPM interpolation
      const diff = this.targetRpm - this.currentRpm;
      this.currentRpm += diff * 0.08;

      if (this.onRpmUpdateCallback) {
        this.onRpmUpdateCallback(Math.round(this.currentRpm));
      }

      // Update sound frequencies based on RPM
      if (this.ctx && this.osc1 && this.osc2 && this.subOsc && this.filter && this.turboOsc && this.turboGain) {
        const baseHz = (this.currentRpm / 60) * 1.5; // Cylinders firing pulse
        const now = this.ctx.currentTime;

        this.osc1.frequency.setTargetAtTime(Math.max(15, baseHz), now, 0.04);
        this.osc2.frequency.setTargetAtTime(Math.max(22, baseHz * 1.5), now, 0.04);
        this.subOsc.frequency.setTargetAtTime(Math.max(12, baseHz * 0.75), now, 0.04);

        // Exhaust filter opens with RPM
        const filterCutoff = 180 + (this.currentRpm / 6500) * 1200;
        this.filter.frequency.setTargetAtTime(filterCutoff, now, 0.05);

        // Turbo whine ramps up above 2000 RPM
        if (this.currentRpm > 1800) {
          const turboHz = 800 + ((this.currentRpm - 1800) / 4700) * 2800;
          const turboVol = Math.min(0.08, ((this.currentRpm - 1800) / 4700) * 0.09);
          this.turboOsc.frequency.setTargetAtTime(turboHz, now, 0.05);
          this.turboGain.gain.setTargetAtTime(turboVol, now, 0.05);
        } else {
          this.turboGain.gain.setTargetAtTime(0.0001, now, 0.08);
        }
      }

      this.animFrameId = requestAnimationFrame(update);
    };

    this.animFrameId = requestAnimationFrame(update);
  }

  public revTo(rpm: number) {
    if (!this.isRunning) return;
    this.targetRpm = Math.min(6400, Math.max(850, rpm));
  }

  public releaseThrottle() {
    if (!this.isRunning) return;
    this.targetRpm = 850;

    // Blow-off valve sound when releasing from high RPM
    if (this.currentRpm > 3200 && this.ctx && this.masterGain) {
      this.playBlowOffValve();
    }
  }

  private playBlowOffValve() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.35;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.08));
    }

    const noiseSrc = this.ctx.createBufferSource();
    noiseSrc.buffer = noiseBuffer;

    const bpf = this.ctx.createBiquadFilter();
    bpf.type = 'bandpass';
    bpf.frequency.setValueAtTime(2600, now);
    bpf.Q.setValueAtTime(2.0, now);

    const bpfGain = this.ctx.createGain();
    bpfGain.gain.setValueAtTime(0.2, now);
    bpfGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    noiseSrc.connect(bpf);
    bpf.connect(bpfGain);
    bpfGain.connect(this.masterGain);

    noiseSrc.start(now);
    noiseSrc.stop(now + 0.35);
  }

  public playPneumaticToolSound() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    // Metallic ratchet burst
    const burstCount = 4;
    for (let i = 0; i < burstCount; i++) {
      const burstTime = now + i * 0.035;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(620 + Math.random() * 120, burstTime);
      osc.frequency.exponentialRampToValueAtTime(140, burstTime + 0.025);

      gain.gain.setValueAtTime(0.18, burstTime);
      gain.gain.exponentialRampToValueAtTime(0.001, burstTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(burstTime);
      osc.stop(burstTime + 0.035);
    }
  }

  public stopEngine() {
    if (!this.isRunning) return;
    this.isRunning = false;
    this.targetRpm = 0;

    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.setTargetAtTime(0.001, now, 0.25);

      setTimeout(() => {
        try {
          this.osc1?.stop();
          this.osc2?.stop();
          this.subOsc?.stop();
          this.turboOsc?.stop();
          this.osc1?.disconnect();
          this.osc2?.disconnect();
          this.subOsc?.disconnect();
          this.turboOsc?.disconnect();
          this.currentRpm = 0;
          if (this.onRpmUpdateCallback) this.onRpmUpdateCallback(0);
        } catch {
          // ignore cleanup errors
        }
      }, 350);
    }
  }
}

export const engineSound = new EngineSoundEngine();
