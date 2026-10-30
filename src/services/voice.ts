import { AppLanguage } from '../types';

class VoiceService {
  private synth: SpeechSynthesis | null = null;
  private audioCtx: AudioContext | null = null;
  private isSpeaking = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  private initAudio() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public playTone(freq1: number, freq2: number = 0, durationMs: number = 200) {
    try {
      this.initAudio();
      if (!this.audioCtx) return;

      const osc1 = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();

      osc1.frequency.value = freq1;
      osc1.type = 'sine';

      gainNode.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + durationMs / 1000);

      osc1.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);

      osc1.start();
      osc1.stop(this.audioCtx.currentTime + durationMs / 1000);

      if (freq2 > 0) {
        const osc2 = this.audioCtx.createOscillator();
        osc2.frequency.value = freq2;
        osc2.type = 'sine';
        osc2.connect(gainNode);
        osc2.start();
        osc2.stop(this.audioCtx.currentTime + durationMs / 1000);
      }
    } catch (e) {
      console.warn('Audio tone error:', e);
    }
  }

  public playDtmf(key: string) {
    // Standard Dual-Tone Multi-Frequency (DTMF)
    const dtmfFreqs: Record<string, [number, number]> = {
      '1': [697, 1209],
      '2': [697, 1336],
      '3': [697, 1477],
      '4': [770, 1209],
      '5': [770, 1336],
      '6': [770, 1477],
      '7': [852, 1209],
      '8': [852, 1336],
      '9': [852, 1477],
      '*': [941, 1209],
      '0': [941, 1336],
      '#': [941, 1477],
    };
    const freqs = dtmfFreqs[key] || [440, 880];
    this.playTone(freqs[0], freqs[1], 150);
  }

  public playDialingRingtone() {
    this.playTone(400, 450, 600);
  }

  public playCallConnectedTone() {
    this.playTone(523.25, 659.25, 300); // C5 + E5 harmonic
  }

  public playCallEndedTone() {
    this.playTone(480, 620, 350);
  }

  /**
   * Browser Speech Synthesis (Text-to-Speech)
   * Note: Does NOT request microphone permission.
   */
  public speak(text: string, lang: AppLanguage = 'en', onEnd?: () => void) {
    if (!this.synth) {
      if (onEnd) setTimeout(onEnd, 1500);
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    const langMap: Record<AppLanguage, string> = {
      en: 'en-IN',
      kn: 'kn-IN',
      te: 'te-IN',
      ta: 'ta-IN',
      hi: 'hi-IN',
    };

    const targetLang = langMap[lang] || 'en-IN';
    utterance.lang = targetLang;
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Graceful regional voice resolution with fallbacks
    const voices = this.synth.getVoices();
    const matchedVoice =
      voices.find((v) => v.lang.toLowerCase() === targetLang.toLowerCase()) ||
      voices.find((v) => v.lang.toLowerCase().startsWith(lang)) ||
      voices.find((v) => v.lang.toLowerCase().includes('in')) ||
      null;

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    try {
      this.synth.speak(utterance);
    } catch (err) {
      console.warn('SpeechSynthesis error:', err);
      this.isSpeaking = false;
      if (onEnd) onEnd();
    }
  }

  public stop() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {
        // ignore
      }
    }
    this.isSpeaking = false;
  }

  public getSpeakingState() {
    return this.isSpeaking;
  }

  /**
   * Browser Speech Recognition (Speech-to-Text)
   * Prompts microphone permission ONLY when explicitly invoked by user click.
   */
  public isRecognitionSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!((window as unknown as { SpeechRecognition: unknown }).SpeechRecognition ||
              (window as unknown as { webkitSpeechRecognition: unknown }).webkitSpeechRecognition);
  }

  public createRecognizer(
    lang: AppLanguage,
    onResult: (transcript: string) => void,
    onError: (errorMsg: string) => void,
    onEnd: () => void
  ) {
    if (!this.isRecognitionSupported()) {
      onError('Speech recognition is not supported in this browser.');
      return null;
    }

    const SpeechRecognitionClass =
      (window as unknown as { SpeechRecognition: any }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition: any }).webkitSpeechRecognition;

    const recognition = new SpeechRecognitionClass();
    const langMap: Record<AppLanguage, string> = {
      en: 'en-IN',
      kn: 'kn-IN',
      te: 'te-IN',
      ta: 'ta-IN',
      hi: 'hi-IN',
    };

    recognition.lang = langMap[lang] || 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      onResult(text);
    };

    recognition.onerror = (event: any) => {
      onError(event.error === 'not-allowed' ? 'Microphone permission denied.' : event.error);
    };

    recognition.onend = () => {
      onEnd();
    };

    return recognition;
  }
}

export const voiceService = new VoiceService();
