"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo } from "react";

interface CharConfig {
  id: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
}

const CORNER_GIFS = [
  "https://media1.tenor.com/m/DSPmi9MwrbcAAAAC/screen-bubu.gif", // Top-Left
  "https://media1.tenor.com/m/mKr-KcMW9RcAAAAC/cute-bears.gif",  // Top-Right
  "https://media1.tenor.com/m/cVzKULzKpVgAAAAC/bubu-dudu-images-bubu-dudu-love.gif", // Bottom-Left
  "https://media1.tenor.com/m/jmWqHgGS0ToAAAAC/dudu-bubu.gif",   // Bottom-Right
];

const POSITIONS = [
  { top: "16px", left: "16px" }, // Top-Left
  { top: "16px", right: "16px" }, // Top-Right
  { bottom: "16px", left: "16px" }, // Bottom-Left
  { bottom: "16px", right: "16px" }, // Bottom-Right
];

export default function FloatingCharacters() {
  const chars = useMemo<CharConfig[]>(
    () =>
      POSITIONS.map((pos, i) => ({
        id: i,
        ...pos,
        size: 110 + Math.random() * 15,
        duration: 3.5 + Math.random() * 1.5,
        delay: i * 0.4,
        rotate: i % 2 === 0 ? -3 : 3,
      })),
    []
  );

  return (
    <>
      {chars.map((c, i) => (
        <motion.div
          key={c.id}
          className="fixed z-[2] pointer-events-none"
          style={{ 
            top: c.top, 
            left: c.left,
            right: c.right,
            bottom: c.bottom 
          }}
          animate={{
            y: [0, -12, 0],
            rotate: [-c.rotate, c.rotate, -c.rotate],
          }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CORNER_GIFS[i]}
            alt="Bubu Dudu"
            width={c.size}
            height={c.size}
            className="rounded-full object-cover shadow-md"
            style={{
              width: c.size,
              height: c.size,
              boxShadow: "0 4px 20px rgba(255,100,150,0.2)",
            }}
          />
        </motion.div>
      ))}
    </>
  );
}
