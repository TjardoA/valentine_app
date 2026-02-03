import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function SuccessConfetti() {
  useEffect(() => {
    const end = Date.now() + 800;
    const interval = setInterval(() => {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      if (Date.now() > end) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, []);
  return null;
}
