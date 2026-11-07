// Ambient Web Audio Tone Generator for Living Gallery Experience
class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  public isPlaying: boolean = false;

  private init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();

    // Low-pass filter for warm, cavernous room drone
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = "lowpass";
    this.filterNode.frequency.setValueAtTime(180, this.ctx.currentTime);

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);

    this.filterNode.connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);
  }

  public toggle(): boolean {
    this.init();
    if (!this.ctx || !this.gainNode || !this.filterNode) return false;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      // Fade out
      this.gainNode.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
      setTimeout(() => {
        if (this.osc1) {
          try { this.osc1.stop(); this.osc1.disconnect(); } catch {}
          this.osc1 = null;
        }
        if (this.osc2) {
          try { this.osc2.stop(); this.osc2.disconnect(); } catch {}
          this.osc2 = null;
        }
      }, 1200);
      this.isPlaying = false;
    } else {
      // Create subtle dual drone: 55Hz (A1) and 82.4Hz (E2) perfect fifth
      this.osc1 = this.ctx.createOscillator();
      this.osc2 = this.ctx.createOscillator();

      this.osc1.type = "sine";
      this.osc1.frequency.setValueAtTime(55, this.ctx.currentTime);

      this.osc2.type = "triangle";
      this.osc2.frequency.setValueAtTime(82.4, this.ctx.currentTime);

      this.osc1.connect(this.filterNode);
      this.osc2.connect(this.filterNode);

      this.osc1.start();
      this.osc2.start();

      this.gainNode.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.gainNode.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + 2.5); // very soft
      this.isPlaying = true;
    }

    return this.isPlaying;
  }

  public playHoverTone() {
    if (!this.isPlaying || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {}
  }
}

export const ambientSound = new AmbientAudioEngine();
