"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const EMOJIS = ["💗", "💕", "✨", "🌸", "💖", "🌟", "💝", "🎀", "⭐", "🩷", "🌺"];

interface HeartConfig {
  id: number;
  emoji: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
}

function FloatingHeart({ config }: { config: HeartConfig }) {
  return (
    <motion.div
      className="fixed pointer-events-none select-none z-0"
      style={{
        left: config.left,
        bottom: -40,
        fontSize: config.size,
      }}
      animate={{
        y: [0, "-115vh"],
        opacity: [0, 0.8, 0.5, 0],
        rotate: [-10, 15],
        scale: [0.9, 1.1],
      }}
      transition={{
        duration: config.duration,
        delay: config.delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {config.emoji}
    </motion.div>
  );
}

export default function BackgroundHearts() {
  const hearts = useMemo<HeartConfig[]>(
    () =>
      Array.from({ length: 32 }, (_, i) => ({
        id: i,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        left: `${Math.random() * 100}vw`,
        size: 12 + Math.random() * 16,
        duration: 10 + Math.random() * 14,
        delay: Math.random() * 14,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((h) => (
        <FloatingHeart key={h.id} config={h} />
      ))}
    </div>
  );
}
