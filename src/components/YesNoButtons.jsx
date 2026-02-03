import { useEffect, useRef, useState } from "react";

export default function YesNoButtons({ onYes }) {
  const [yesScale, setYesScale] = useState(1);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [bounds, setBounds] = useState({ w: 0, h: 0 });
  const [showNo, setShowNo] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const noRef = useRef(null);
  const yesRef = useRef(null);

  const moveNo = () => {
    const btn = noRef.current;
    const yesBtn = yesRef.current;
    if (!btn || !yesBtn) return;
    const margin = 12;

    const growStep = isMobile ? 0.18 : 0.35;
    const maxScale = isMobile ? 8 : 12;

    const yesWidth = yesBtn.offsetWidth * yesScale;
    const yesHeight = yesBtn.offsetHeight * yesScale;
    const yesRadius = Math.max(yesWidth, yesHeight) / 2;
    const yesCenter = { x: bounds.w / 2, y: bounds.h / 2 };
    const noRadius = Math.max(btn.offsetWidth, btn.offsetHeight) / 2;
    const minGap = yesRadius + noRadius + 16; // keep some breathing room

    const availableW = bounds.w - margin * 2;
    const availableH = bounds.h - margin * 2;

    // If YES essentially fills the container, hide NO.
    if (yesWidth >= availableW || yesHeight >= availableH) {
      setShowNo(false);
      setYesScale((s) => Math.min(s + growStep, maxScale)); // keep inflating a bit
      return;
    }
    setShowNo(true);

    const maxX = Math.max(margin, bounds.w - btn.offsetWidth - margin);
    const maxY = Math.max(margin, bounds.h - btn.offsetHeight - margin);

    const pickPosition = () => {
      const x = Math.random() * (maxX - margin) + margin;
      const y = Math.random() * (maxY - margin) + margin;
      const dx = x + btn.offsetWidth / 2 - yesCenter.x;
      const dy = y + btn.offsetHeight / 2 - yesCenter.y;
      const dist = Math.hypot(dx, dy);
      return { x, y, valid: dist > minGap };
    };

    let candidate = pickPosition();
    let attempts = 0;
    while (!candidate.valid && attempts < 40) {
      candidate = pickPosition();
      attempts += 1;
    }

    if (!candidate.valid) {
      // fall back to farthest corner that fits
      const corners = [
        { x: margin, y: margin },
        { x: margin, y: maxY },
        { x: maxX, y: margin },
        { x: maxX, y: maxY },
      ];
      const scored = corners
        .map((c) => {
          const dx = c.x + btn.offsetWidth / 2 - yesCenter.x;
          const dy = c.y + btn.offsetHeight / 2 - yesCenter.y;
          const dist = Math.hypot(dx, dy);
          return { ...c, valid: dist > minGap, dist };
        })
        .filter((c) => c.valid)
        .sort((a, b) => b.dist - a.dist);
      if (scored.length === 0) {
        setShowNo(false);
        setYesScale((s) => Math.min(s + 0.35, 12));
        return;
      }
      candidate = scored[0];
    }

    setNoPos({ x: candidate.x, y: candidate.y });
    setYesScale((s) => Math.min(s + growStep, maxScale)); // grow faster each dodge
    shakeScreen();
  };

  const shakeScreen = () => {
    document.body.animate(
      [
        { transform: "translate(0, 0)" },
        { transform: "translate(-4px, 2px)" },
        { transform: "translate(4px, -2px)" },
        { transform: "translate(0, 0)" },
      ],
      { duration: 250 }
    );
  };

  useEffect(() => {
    const updateBounds = () => {
      const c = containerRef.current;
      if (!c) return;
      const rect = c.getBoundingClientRect();
      setBounds({ w: rect.width, h: rect.height });
      setIsMobile(window.innerWidth < 640);
    };
    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  useEffect(() => {
    if (bounds.w && bounds.h) moveNo(); // place the NO button once bounds are known
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bounds.w, bounds.h]);

  return (
    <div ref={containerRef} className="relative w-full h-72 sm:h-80 overflow-hidden">
      <button
        ref={yesRef}
        onClick={onYes}
        style={{
          transform: `translate(-50%, -50%) scale(${yesScale})`,
          transformOrigin: "center",
        }}
        className="absolute left-1/2 top-1/2 rounded-full bg-rose-400 px-6 py-3 text-white font-bold shadow-float transition transform-gpu"
      >
        YES
      </button>
      {showNo && (
        <button
          ref={noRef}
          onMouseEnter={moveNo}
          onPointerEnter={moveNo}
          onPointerDown={moveNo} // mobile: moves as you try to tap
          onClick={moveNo}
          style={{ left: noPos.x, top: noPos.y }}
          className="absolute rounded-full bg-white/90 border border-rose-200 px-4 py-2 text-rose-500 font-semibold shadow-sm transition-all duration-300"
        >
          NO
        </button>
      )}
    </div>
  );
}
