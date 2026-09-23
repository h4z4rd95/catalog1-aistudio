// Procedural Web Audio synthesizer for Awwwards-grade tactile feedback

class AudioEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = false;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.init();
      this.playChime(520, 0.08);
    }
    return this.enabled;
  }

  public playClick(pitch: number = 800, duration: number = 0.03) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.4, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  public playTick(pitch: number = 900) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.5, this.ctx.currentTime + 0.015);

      gain.gain.setValueAtTime(0.025, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.015);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.015);
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  public playChime(freq: number = 600, duration: number = 0.25) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // ignore
    }
  }

  public playCyberBlip() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.setValueAtTime(800, this.ctx.currentTime + 0.02);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // ignore
    }
  }

  public playGlitchSound() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.setValueAtTime(140, this.ctx.currentTime + 0.04);
      osc.frequency.setValueAtTime(80, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {
      // ignore
    }
  }

  // Generative Harmonic Ambient Music Engine (Silky, Meditative, Zero-Noise Bell Drops & Sub-Pad)
  private ambientSubOsc: OscillatorNode | null = null;
  private ambientSubGain: GainNode | null = null;
  private ambientMasterGain: GainNode | null = null;
  private ambientTimer: number | null = null;
  public droneActive: boolean = false;
  public ambientPreset: 'SANCTUARY' | 'SOLFEGGIO_528' | 'ZEN_WARMTH' | 'CELESTIAL' = 'SANCTUARY';
  public ambientVolume: number = 0.035;

  public toggleAmbientDrone(): boolean {
    if (this.droneActive) {
      this.stopAmbientDrone();
    } else {
      this.startAmbientDrone();
    }
    return this.droneActive;
  }

  public setAmbientVolume(vol: number) {
    this.ambientVolume = Math.max(0, Math.min(1, vol));
    if (this.ambientMasterGain && this.ctx) {
      try {
        this.ambientMasterGain.gain.setValueAtTime(this.ambientMasterGain.gain.value, this.ctx.currentTime);
        this.ambientMasterGain.gain.linearRampToValueAtTime(this.ambientVolume, this.ctx.currentTime + 0.15);
      } catch {
        // ignore
      }
    }
  }

  public setAmbientPreset(preset: 'SANCTUARY' | 'SOLFEGGIO_528' | 'ZEN_WARMTH' | 'CELESTIAL') {
    this.ambientPreset = preset;
    if (this.droneActive) {
      this.startAmbientDrone();
    }
  }

  // Play a single soft, pure crystal bell note with a long musical decay (Brian Eno ambient piano style)
  private playAmbientMelodicNote(freq: number) {
    if (!this.ctx || !this.droneActive || !this.ambientMasterGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Lowpass filter ensures velvety warmth with zero harsh treble
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      const attack = 0.35;
      const decay = 3.8;

      // Soft envelope: swell gently then decay into silence
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.25, now + attack);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + attack + decay);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.ambientMasterGain);

      osc.start(now);
      osc.stop(now + attack + decay + 0.1);

      setTimeout(() => {
        try {
          osc.disconnect();
          filter.disconnect();
          noteGain.disconnect();
        } catch {
          // ignore
        }
      }, (attack + decay + 0.3) * 1000);
    } catch {
      // ignore
    }
  }

  public startAmbientDrone() {
    this.init();
    if (!this.ctx) return;

    try {
      this.stopAmbientDrone();

      // Master output bus
      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(this.ambientVolume, this.ctx.currentTime + 1.5);
      masterGain.connect(this.ctx.destination);
      this.ambientMasterGain = masterGain;

      // Extremely soft, deep, warm foundation sub-pad (110Hz or 130Hz at imperceptible volume, strictly lowpassed at 180Hz)
      const subFilter = this.ctx.createBiquadFilter();
      subFilter.type = 'lowpass';
      subFilter.frequency.setValueAtTime(160, this.ctx.currentTime);
      subFilter.connect(masterGain);

      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(65.41, this.ctx.currentTime); // C2 warm grounding frequency
      subGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

      subOsc.connect(subFilter);
      subGain.connect(subFilter);
      subOsc.start();

      this.ambientSubOsc = subOsc;
      this.ambientSubGain = subGain;
      this.droneActive = true;

      // Peaceful melodic scales for each mood
      const scales: Record<string, number[]> = {
        SANCTUARY: [155.56, 196.0, 233.08, 261.63, 311.13, 392.0, 466.16], // Eb Major Pentatonic
        SOLFEGGIO_528: [174.0, 285.0, 396.0, 417.0, 528.0, 639.0], // Solfeggio Sacred Frequencies
        ZEN_WARMTH: [110.0, 164.81, 220.0, 261.63, 329.63, 392.0], // A Minor Warm Bowl
        CELESTIAL: [185.0, 246.94, 277.18, 369.99, 440.0, 554.37], // F# Lydian Star Chimes
      };

      // Trigger first gentle note immediately
      const currentScale = scales[this.ambientPreset] || scales.SANCTUARY;
      this.playAmbientMelodicNote(currentScale[0]);

      // Schedule subsequent gentle bell notes organically every 2.2 to 3.8 seconds
      const scheduleNextNote = () => {
        if (!this.droneActive) return;
        const scale = scales[this.ambientPreset] || scales.SANCTUARY;
        const randomNote = scale[Math.floor(Math.random() * scale.length)];
        this.playAmbientMelodicNote(randomNote);

        const nextDelay = 2200 + Math.random() * 1600;
        this.ambientTimer = window.setTimeout(scheduleNextNote, nextDelay);
      };

      this.ambientTimer = window.setTimeout(scheduleNextNote, 2400);
    } catch {
      this.droneActive = false;
    }
  }

  public stopAmbientDrone() {
    if (this.ambientTimer) {
      clearTimeout(this.ambientTimer);
      this.ambientTimer = null;
    }

    if (this.ambientMasterGain && this.ctx) {
      try {
        this.ambientMasterGain.gain.setValueAtTime(this.ambientMasterGain.gain.value, this.ctx.currentTime);
        this.ambientMasterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);

        const sub = this.ambientSubOsc;
        const master = this.ambientMasterGain;

        setTimeout(() => {
          try {
            sub?.stop();
            sub?.disconnect();
            master?.disconnect();
          } catch {
            // ignore
          }
        }, 900);
      } catch {
        // ignore
      }
    }

    this.ambientSubOsc = null;
    this.ambientSubGain = null;
    this.ambientMasterGain = null;
    this.droneActive = false;
  }
}

export const soundFx = new AudioEngine();
