import { initStrudel, hush } from '@strudel/web';

class AudioManager {
  constructor() {
    this.initialized = false;
    this.currentMusic = null;
  }

  init() {
    if (this.initialized) return true;
    try {
      initStrudel();
      this.initialized = true;
      console.log('[Audio] Strudel initialized');
      return true;
    } catch (e) {
      console.warn('[Audio] Strudel init failed:', e);
      return false;
    }
  }

  playTrack(patternFn) {
    if (!this.initialized) {
      if (!this.init()) return;
    }
    this.stop();
    // hush() needs a scheduler tick to process before new pattern starts
    setTimeout(() => {
      try {
        this.currentMusic = patternFn();
        console.log('[Audio] Playing track');
      } catch (e) {
        console.warn('[Audio] Track error:', e);
      }
    }, 100);
  }

  stop() {
    try { 
      hush(); 
      console.log('[Audio] Stopped');
    } catch (e) { /* noop */ }
    this.currentMusic = null;
  }
}

export const audioManager = new AudioManager();
