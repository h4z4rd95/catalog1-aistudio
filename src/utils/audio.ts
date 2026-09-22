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

  // Generative Harmonic Ambient Soundscape Synthesizer (Lush, Meditative, Silky)
  private ambientVoices: OscillatorNode[] = [];
  private ambientGains: GainNode[] = [];
  private ambientLfos: OscillatorNode[] = [];
  private ambientFilter: BiquadFilterNode | null = null;
  private ambientMasterGain: GainNode | null = null;
  public droneActive: boolean = false;
  public ambientPreset: 'SANCTUARY' | 'SOLFEGGIO_528' | 'ZEN_WARMTH' | 'CELESTIAL' = 'SANCTUARY';
  public ambientVolume: number = 0.022;

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

  public startAmbientDrone() {
    this.init();
    if (!this.ctx) return;

    try {
      this.stopAmbientDrone();

      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(this.ambientVolume, this.ctx.currentTime + 2.0);

      // Warm analog dual-cascaded lowpass filter (gentle slope, silky soft roll-off, zero resonance peak)
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(420, this.ctx.currentTime);
      filter.Q.setValueAtTime(0.707, this.ctx.currentTime); // Standard Butterworth Q for zero whistling

      filter.connect(masterGain);
      masterGain.connect(this.ctx.destination);

      this.ambientMasterGain = masterGain;
      this.ambientFilter = filter;

      // Harmonic chords based on selected soothing ambient preset
      // Uses pure sine oscillators tuned to serene micro-interval ratios
      let chordFreqs: number[] = [];
      if (this.ambientPreset === 'SANCTUARY') {
        // Eb Major 9th (Eb3, Bb3, G4, D5, F5) - Brian Eno style ethereal warmth
        chordFreqs = [155.56, 233.08, 311.13, 392.00, 587.33];
      } else if (this.ambientPreset === 'SOLFEGGIO_528') {
        // 528 Hz Transformation & Harmonic 264Hz / 396Hz / 528Hz / 792Hz crystal chime
        chordFreqs = [132.0, 198.0, 264.0, 396.0, 528.0];
      } else if (this.ambientPreset === 'ZEN_WARMTH') {
        // Deep Singing Bowl 432 Hz Pythagorean Pure Tuning (A 108Hz, E 162Hz, C# 270Hz, E 324Hz)
        chordFreqs = [108.0, 162.0, 216.0, 270.0, 324.0];
      } else {
        // CELESTIAL: F# Major 7 Lydian Air (F#3, C#4, F#4, A#4, D#5)
        chordFreqs = [185.0, 277.18, 369.99, 466.16, 622.25];
      }

      this.ambientVoices = [];
      this.ambientGains = [];
      this.ambientLfos = [];

      chordFreqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const voiceGain = this.ctx.createGain();

        osc.type = 'sine';
        // Subtle micro-cents detuning between voices creates lush natural acoustic phasing without harshness
        const microDetune = (idx - 2) * 1.5;
        osc.frequency.setValueAtTime(freq + microDetune * 0.05, this.ctx.currentTime);

        // Individual voice gain - lower for higher frequencies to ensure rich, non-fatiguing warmth
        const baseVoiceGain = (0.28 / (idx + 1.2));
        voiceGain.gain.setValueAtTime(baseVoiceGain, this.ctx.currentTime);

        // Gentle, slow breathing LFO (0.07Hz - 0.12Hz) to subtly modulate voice volume
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.06 + idx * 0.02, this.ctx.currentTime);
        lfoGain.gain.setValueAtTime(baseVoiceGain * 0.25, this.ctx.currentTime); // 25% gentle swell

        lfo.connect(lfoGain.gain);

        osc.connect(voiceGain);
        voiceGain.connect(filter);

        osc.start();
        lfo.start();

        this.ambientVoices.push(osc);
        this.ambientGains.push(voiceGain);
        this.ambientLfos.push(lfo);
      });

      this.droneActive = true;
    } catch {
      this.droneActive = false;
    }
  }

  public stopAmbientDrone() {
    if (this.ambientMasterGain && this.ctx) {
      try {
        this.ambientMasterGain.gain.setValueAtTime(this.ambientMasterGain.gain.value, this.ctx.currentTime);
        this.ambientMasterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

        const voices = [...this.ambientVoices];
        const lfos = [...this.ambientLfos];
        const master = this.ambientMasterGain;
        const filter = this.ambientFilter;

        setTimeout(() => {
          try {
            voices.forEach((v) => {
              v.stop();
              v.disconnect();
            });
            lfos.forEach((l) => {
              l.stop();
              l.disconnect();
            });
            master?.disconnect();
            filter?.disconnect();
          } catch {
            // ignore
          }
        }, 1300);
      } catch {
        // ignore
      }
    }

    this.ambientVoices = [];
    this.ambientGains = [];
    this.ambientLfos = [];
    this.ambientMasterGain = null;
    this.ambientFilter = null;
    this.droneActive = false;
  }
}

export const soundFx = new AudioEngine();
