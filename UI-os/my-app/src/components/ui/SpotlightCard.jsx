import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function SpotlightCard({
  children,
  className = "",
  onClick,
  bgImage = null,     // unique per card
  bgOpacity = 0.15,   // optional
  style = {},
}) {
  const ref = useRef(null);

  // subtle 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  function handleMove(e) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    // spotlight cursor position
    ref.current.style.setProperty("--mx", `${localX}px`);
    ref.current.style.setProperty("--my", `${localY}px`);

    // 3d tilt
    x.set(localX - rect.width / 2);
    y.set(localY - rect.height / 2);
  }

  function handleLeave() {
    if (!ref.current) return;

    ref.current.style.setProperty("--mx", `-200px`);
    ref.current.style.setProperty("--my", `-200px`);

    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, ...style }}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`relative rounded-xl overflow-hidden cursor-pointer ${className}`}
    >
      {/* Surface */}
      <div className="relative bg-[rgba(255,255,255,0.03)] backdrop-blur-xl rounded-xl border border-[rgba(255,255,255,0.06)] shadow-[0_6px_30px_rgba(0,0,0,0.55)] h-full p-6">

        {/* Background Image Layer */}
        {bgImage && (
          <div
            className="absolute inset-0 bg-cover bg-center pointer-events-none"
            style={{ backgroundImage: `url(${bgImage})`, opacity: bgOpacity }}
          ></div>
        )}

        {/* Spotlight Glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(360px circle at var(--mx) var(--my), rgba(124,58,237,0.15), transparent 40%)",
            mixBlendMode: "screen",
          }}
        />

        {/* Inner Glow */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          whileHover={{
            boxShadow: "inset 0 0 30px rgba(124,58,237,0.12)",
          }}
        />

        {/* CONTENT */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
