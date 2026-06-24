import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hide default cursor
    document.documentElement.style.cursor = 'none';

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element;
      setHovered(!!el.closest('a, button, [role="button"], input, select, textarea, label, [tabindex]'));
    };

    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const animate = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.1;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.documentElement.style.cursor = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  const ringSize = hovered ? 42 : 32;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          borderRadius: '50%',
          backgroundColor: '#f59e0b',
          zIndex: 99999,
          pointerEvents: 'none',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s ease',
          willChange: 'transform',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          borderRadius: '50%',
          border: `1.5px solid ${hovered ? '#f59e0b' : 'rgba(245,158,11,0.55)'}`,
          backgroundColor: hovered ? 'rgba(245,158,11,0.08)' : 'transparent',
          zIndex: 99998,
          pointerEvents: 'none',
          opacity: visible ? 1 : 0,
          scale: clicked ? '0.75' : '1',
          transition: 'width 0.18s ease, height 0.18s ease, margin 0.18s ease, border-color 0.18s ease, background-color 0.18s ease, scale 0.12s ease, opacity 0.2s ease',
          willChange: 'transform',
        }}
      />
    </>
  );
}
