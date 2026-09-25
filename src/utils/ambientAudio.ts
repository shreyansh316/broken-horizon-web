// Ambient Procedural Audio Engine for Broken Horizon
// Generates low desert wind, gentle atmospheric drone, and subtle night harmonics via Web Audio API.

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    this.ctx = new AudioCtx();
  }

  public toggle(): boolean {
    this.init();
    if (!this.ctx) return false;

    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isRunning = true;

    // Master Gain with slow cinematic fade-in
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.28, this.ctx.currentTime + 2.5);
    this.masterGain.connect(this.ctx.destination);

    // 1. Procedural Desert Wind (Pink/Brown noise passed through lowpass filter with slow LFO)
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // Gain boost
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.setValueAtTime(260, this.ctx.currentTime);

    // Wind modulation LFO
    const windLfo = this.ctx.createOscillator();
    windLfo.frequency.setValueAtTime(0.18, this.ctx.currentTime);
    const windLfoGain = this.ctx.createGain();
    windLfoGain.gain.setValueAtTime(140, this.ctx.currentTime);
    windLfo.connect(windLfoGain);
    windLfoGain.connect(windFilter.frequency);
    windLfo.start();

    this.noiseNode.connect(windFilter);
    windFilter.connect(this.masterGain);
    this.noiseNode.start();

    // 2. Cinematic Tense Desert Sub Drone (55Hz + 110Hz harmonically detuned)
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'sine';
    this.droneOsc1.frequency.setValueAtTime(55, this.ctx.currentTime); // Low A1

    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'triangle';
    this.droneOsc2.frequency.setValueAtTime(82.4, this.ctx.currentTime); // E2
    this.droneOsc2.detune.setValueAtTime(4, this.ctx.currentTime);

    const droneFilter = this.ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(180, this.ctx.currentTime);

    const droneGain = this.ctx.createGain();
    droneGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    this.droneOsc1.connect(droneFilter);
    this.droneOsc2.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(this.masterGain);

    this.droneOsc1.start();
    this.droneOsc2.start();
  }

  public stop() {
    if (!this.ctx || !this.masterGain) {
      this.isRunning = false;
      return;
    }

    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);

    setTimeout(() => {
      try {
        this.noiseNode?.stop();
        this.droneOsc1?.stop();
        this.droneOsc2?.stop();
        this.noiseNode?.disconnect();
        this.droneOsc1?.disconnect();
        this.droneOsc2?.disconnect();
        this.masterGain?.disconnect();
      } catch {
        // cleanup safe
      }
      this.isRunning = false;
    }, 900);
  }

  public getState(): boolean {
    return this.isRunning;
  }
}

export const ambientAudio = new AmbientAudioEngine();
