import { useCallback, useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const AMBIENT_GAIN = 0.032;

export default function SoundManager() {
  const [soundOn, setSoundOn] = useState(() => localStorage.getItem('tezgah_sound') !== 'off');
  const soundOnRef = useRef(soundOn);
  const ctxRef = useRef<AudioContext | null>(null);
  const ambientRef = useRef<GainNode | null>(null);

  // Build AudioContext + pink noise ambient chain (gain=0 until unlocked)
  const initCtx = useCallback((): AudioContext => {
    if (ctxRef.current) return ctxRef.current;

    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    ctxRef.current = ctx;

    // Pink noise buffer (Paul Kellett's algorithm)
    const sr = ctx.sampleRate;
    const buf = ctx.createBuffer(1, sr * 6, sr);
    const d = buf.getChannelData(0);
    let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
    for (let i = 0; i < d.length; i++) {
      const w = Math.random() * 2 - 1;
      b0=0.99886*b0+w*0.0555179; b1=0.99332*b1+w*0.0750759;
      b2=0.96900*b2+w*0.1538520; b3=0.86650*b3+w*0.3104856;
      b4=0.55000*b4+w*0.5329522; b5=-0.7616*b5-w*0.0168980;
      d[i] = (b0+b1+b2+b3+b4+b5+b6+w*0.5362)*0.11;
      b6 = w * 0.115926;
    }

    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;

    // Very low-pass → only sub-200Hz rumble passes → showroom presence
    const lpf = ctx.createBiquadFilter();
    lpf.type = 'lowpass';
    lpf.frequency.value = 180;
    lpf.Q.value = 0.6;

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0;
    ambientRef.current = masterGain;

    src.connect(lpf);
    lpf.connect(masterGain);
    masterGain.connect(ctx.destination);
    src.start();

    return ctx;
  }, []);

  const fadeAmbient = useCallback((target: number, duration = 1.5) => {
    if (!ctxRef.current || !ambientRef.current) return;
    const now = ctxRef.current.currentTime;
    ambientRef.current.gain.cancelScheduledValues(now);
    ambientRef.current.gain.setValueAtTime(ambientRef.current.gain.value, now);
    ambientRef.current.gain.linearRampToValueAtTime(target, now + duration);
  }, []);

  const playClick = useCallback(() => {
    if (!ctxRef.current || !soundOnRef.current) return;
    const ctx = ctxRef.current;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(860, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.07);
    g.gain.setValueAtTime(0.055, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.11);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.12);
  }, []);

  // Listen to every click on interactive elements
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!soundOnRef.current) return;
      if (!(e.target as Element).closest('a, button, [role="button"]')) return;

      const isFirst = !ctxRef.current;
      initCtx();

      if (isFirst) {
        // First gesture → fade in ambient over 3 s
        fadeAmbient(AMBIENT_GAIN, 3);
      }

      playClick();
    };

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [initCtx, fadeAmbient, playClick]);

  const toggle = () => {
    const next = !soundOn;
    soundOnRef.current = next;
    setSoundOn(next);
    localStorage.setItem('tezgah_sound', next ? 'on' : 'off');

    if (next) {
      // Turning ON — init if needed (we're inside a click = valid gesture)
      if (!ctxRef.current) initCtx();
      fadeAmbient(AMBIENT_GAIN, 2);
    } else {
      fadeAmbient(0, 1);
    }
  };

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2 bg-neutral-900/75 backdrop-blur-sm text-white/55 hover:text-white border border-white/10 hover:border-amber-500/40 rounded-full px-3 py-2 text-xs font-medium transition-all duration-200"
      title={soundOn ? 'Sesi kapat' : 'Sesi aç'}
    >
      {soundOn
        ? <Volume2 className="h-3.5 w-3.5 text-amber-400" />
        : <VolumeX className="h-3.5 w-3.5" />}
      <span className="hidden sm:inline">{soundOn ? 'Ses Açık' : 'Ses Kapalı'}</span>
    </button>
  );
}
