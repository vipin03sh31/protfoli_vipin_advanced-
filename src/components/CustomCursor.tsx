import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const down = () => setClicking(true);
    const up = () => setClicking(false);

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(
        !!target.closest("a, button, [data-cursor='hover'], input, textarea, [role='button']")
      );
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", checkHover);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", checkHover);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9999] mix-blend-difference"
        style={{ left: 0, top: 0 }}
        animate={{
          x: pos.x - (hovering ? 20 : 6),
          y: pos.y - (hovering ? 20 : 6),
          scale: clicking ? 0.7 : 1,
        }}
        transition={{ type: "spring", mass: 0.2, stiffness: 800, damping: 30 }}
      >
        <div
          className={`rounded-full bg-white transition-all duration-200 ${
            hovering ? "h-10 w-10 opacity-40" : "h-3 w-3 opacity-100"
          }`}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed z-[9998]"
        style={{ left: 0, top: 0 }}
        animate={{ x: pos.x - 16, y: pos.y - 16 }}
        transition={{ type: "spring", mass: 0.6, stiffness: 200, damping: 20 }}
      >
        <div className="h-8 w-8 rounded-full border border-[var(--neon-cyan)] opacity-60" />
      </motion.div>
    </>
  );
}
