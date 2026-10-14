/**
 * ==============================================================================
 * CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - SERVICIO DE PAISAJES SONOROS PROCEDURALES
 * ==============================================================================
 * Archivo: soundscapeService.ts
 * Generador procedural de audio con Web Audio API (cero dependencias externas).
 * Pistas disponibles:
 * 1. Lluvia Suave (Pink noise con filtro paso-bajo)
 * 2. Ondas Binaurales Gamma 40Hz (Frecuencia de concentración activa)
 * 3. Chimenea / Crepitar (Noise con ráfagas aleatorias)
 * 4. Murmullo / Cafetería (Banda media con resonancia suave)
 * ==============================================================================
 */

export type SoundTrackId = 'rain' | 'binaural40' | 'campfire' | 'stream';

export interface SoundTrackState {
  id: SoundTrackId;
  name: string;
  icon: string;
  volume: number; // 0 a 100
  isPlaying: boolean;
}

class SoundscapeService {
  private ctx: AudioContext | null = null;
  private nodes: Map<
    SoundTrackId,
    {
      gainNode: GainNode;
      sources: (AudioNode | number)[];
    }
  > = new Map();

  private isMasterPlaying: boolean = false;
  private masterGain: GainNode | null = null;

  private async initContext(): Promise<void> {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch (err) {
        console.warn('[SoundscapeService] No se pudo reanudar AudioContext:', err);
      }
    }
  }

  // Generador de Pink Noise (Lluvia)
  private createRainTrack(gain: GainNode) {
    if (!this.ctx) return [];
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
      b6 = white * 0.115926;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    // Filtro para simular gotas y lluvia constante
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, this.ctx.currentTime);

    noiseSource.connect(filter);
    filter.connect(gain);
    noiseSource.start();

    return [noiseSource, filter];
  }

  // Generador de Ondas Gamma 40Hz
  private createBinauralTrack(gain: GainNode) {
    if (!this.ctx) return [];
    // Tono base a 200 Hz y tono contralateral a 240 Hz = batimiento de 40 Hz (Gamma)
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(200, this.ctx.currentTime);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(240, this.ctx.currentTime);

    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.3, this.ctx.currentTime);

    osc1.connect(subGain);
    osc2.connect(subGain);
    subGain.connect(gain);

    osc1.start();
    osc2.start();

    return [osc1, osc2, subGain];
  }

  // Generador de Fuego / Crepitar
  private createCampfireTrack(gain: GainNode) {
    if (!this.ctx) return [];
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.04;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);
    filter.Q.setValueAtTime(2.0, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    noise.start();

    return [noise, filter];
  }

  // Generador de Corriente de Agua / Murmullo
  private createStreamTrack(gain: GainNode) {
    if (!this.ctx) return [];
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.05;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    noise.start();

    return [noise, filter];
  }

  public setTrackVolume(id: SoundTrackId, volumePercentage: number) {
    this.initContext();
    const vol = Math.max(0, Math.min(100, volumePercentage)) / 100;

    let track = this.nodes.get(id);
    if (!track && this.ctx && this.masterGain) {
      const gainNode = this.ctx.createGain();
      gainNode.gain.setValueAtTime(vol, this.ctx.currentTime);
      gainNode.connect(this.masterGain);

      let sources: any[] = [];
      if (id === 'rain') sources = this.createRainTrack(gainNode);
      if (id === 'binaural40') sources = this.createBinauralTrack(gainNode);
      if (id === 'campfire') sources = this.createCampfireTrack(gainNode);
      if (id === 'stream') sources = this.createStreamTrack(gainNode);

      track = { gainNode, sources };
      this.nodes.set(id, track);
    } else if (track && this.ctx) {
      track.gainNode.gain.setTargetAtTime(vol, this.ctx.currentTime, 0.05);
    }
  }

  public toggleMaster(): boolean {
    this.initContext();
    if (!this.ctx || !this.masterGain) return false;

    if (this.isMasterPlaying) {
      this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
      this.isMasterPlaying = false;
    } else {
      this.masterGain.gain.setTargetAtTime(0.8, this.ctx.currentTime, 0.1);
      this.isMasterPlaying = true;
    }
    return this.isMasterPlaying;
  }

  public stopAll() {
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
    this.isMasterPlaying = false;
  }

  public getIsPlaying(): boolean {
    return this.isMasterPlaying;
  }
}

export const soundscapeService = new SoundscapeService();
