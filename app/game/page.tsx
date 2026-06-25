"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface Heart {
  id: number;
  x: number;          // starting x (px)
  size: number;
  rotation: number;
  popped: boolean;
  floatDuration: number; // seconds to travel from bottom to top
  driftX: number;        // px horizontal drift during travel
}

interface PopParticle {
  id: number;
  x: number;
  y: number;
}

export default function GamePage() {
  const router = useRouter();
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [caught, setCaught] = useState(0);
  const [popParticles, setPopParticles] = useState<PopParticle[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const [showCounter, setShowCounter] = useState(false);
  const heartIdRef = useRef(0);
  const particleIdRef = useRef(0);
  const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const spawnHeart = useCallback(() => {
    if (!containerRef.current) return;
    const w = containerRef.current.clientWidth;
    const id = ++heartIdRef.current;
    const floatDuration = 5 + Math.random() * 6; // 5–11s to float up
    const newHeart: Heart = {
      id,
      x: 80 + Math.random() * (w - 160),
      size: 36 + Math.random() * 28,
      rotation: -15 + Math.random() * 30,
      popped: false,
      floatDuration,
      driftX: -60 + Math.random() * 120, // gentle left/right sway
    };
    setHearts((prev) => [...prev.slice(-16), newHeart]);
    // Auto-remove after it has floated past the top
    setTimeout(
      () => setHearts((prev) => prev.filter((h) => h.id !== id)),
      (floatDuration + 0.5) * 1000
    );
  }, []);

  useEffect(() => {
    setShowCounter(true);
    spawnHeart();
    spawnIntervalRef.current = setInterval(spawnHeart, 1400);
    return () => {
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
    };
  }, [spawnHeart]);

  const catchHeart = useCallback(
    (id: number, heartEl: HTMLButtonElement | null) => {
      if (gameWon) return;
      // Get current position from the element for pop particle placement
      const rect = heartEl?.getBoundingClientRect();
      const px = rect ? rect.left + rect.width / 2 : 0;
      const py = rect ? rect.top + rect.height / 2 : 0;

      setHearts((prev) =>
        prev.map((h) => (h.id === id ? { ...h, popped: true } : h))
      );
      // Pop particles burst at current screen position
      const pid = ++particleIdRef.current;
      setPopParticles((prev) => [...prev, { id: pid, x: px, y: py }]);
      setTimeout(
        () => setPopParticles((prev) => prev.filter((p) => p.id !== pid)),
        800
      );
      // Remove heart after pop animation
      setTimeout(
        () => setHearts((prev) => prev.filter((h) => h.id !== id)),
        300
      );
      setCaught((prev) => {
        const next = prev + 1;
        if (next >= 10) {
          if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
          setGameWon(true);
          setTimeout(() => router.push("/candle"), 3200);
        }
        return next;
      });
    },
    [gameWon, router]
  );

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden select-none"
      style={{
        background:
          "linear-gradient(135deg,#fff0f6 0%,#ffe4f0 35%,#ffd6e8 65%,#ffcde4 100%)",
      }}
    >
      {/* Soft blurred blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle,rgba(255,100,150,0.13) 0%,transparent 70%)",
            top: -180,
            left: -180,
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 400,
            height: 400,
            background:
              "radial-gradient(circle,rgba(255,160,200,0.12) 0%,transparent 70%)",
            bottom: -120,
            right: -120,
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* ── Header ──────────────────────────────────────── */}
      <motion.div
        className="relative z-30 flex flex-col items-center pt-8 px-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1
          className="text-3xl md:text-4xl font-extrabold text-center"
          style={{
            fontFamily: "'Dancing Script', cursive",
            color: "#880e4f",
            textShadow: "0 2px 8px rgba(255,182,193,0.4)",
          }}
        >
          🎮 Mini Love Game 💖
        </h1>
        <p
          className="mt-2 text-[1rem] md:text-[1.1rem] font-bold text-center"
          style={{ color: "#c2185b", fontFamily: "'Nunito', sans-serif" }}
        >
          Catch 10 hearts to unlock your birthday surprise ❤️
        </p>

        {/* Counter pill */}
        {showCounter && (
          <motion.div
            className="mt-4 bg-white/90 backdrop-blur-md rounded-full px-8 py-3 border-2 border-pink-200 shadow-[0_4px_20px_rgba(255,100,150,0.18)] flex items-center gap-3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span
              className="text-3xl font-black"
              style={{ color: "#880e4f", fontFamily: "'Nunito', sans-serif" }}
            >
              {caught}
            </span>
            <span className="text-xl text-pink-400">/ 10</span>
            <span className="text-2xl">❤️</span>
          </motion.div>
        )}
      </motion.div>

      {/* ── Bubu (left) ─────────────────────────────────── */}
      <motion.div
        className="absolute bottom-0 left-4 md:left-12 z-20 flex flex-col items-center"
        initial={{ x: -120 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        {/* Speech bubble */}
        <motion.div
          className="mb-2 bg-white border-2 border-pink-200 rounded-2xl px-4 py-2 text-[0.85rem] font-extrabold shadow-md max-w-[140px] text-center"
          style={{ color: "#880e4f", fontFamily: "'Nunito', sans-serif" }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          Click them all! 💖
          <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-pink-100 rotate-45" />
        </motion.div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://media1.tenor.com/m/DSPmi9MwrbcAAAAC/screen-bubu.gif"
          alt="Bubu"
          className="w-28 md:w-36 h-auto object-contain"
        />
      </motion.div>

      {/* ── Dudu (right) ────────────────────────────────── */}
      <motion.div
        className="absolute bottom-0 right-4 md:right-12 z-20 flex flex-col items-center"
        initial={{ x: 120 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <motion.div
          className="mb-2 bg-white border-2 border-pink-200 rounded-2xl px-4 py-2 text-[0.85rem] font-extrabold shadow-md max-w-[140px] text-center"
          style={{ color: "#880e4f", fontFamily: "'Nunito', sans-serif" }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        >
          You can do it! 🥰
          <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-pink-100 rotate-45" />
        </motion.div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://media1.tenor.com/m/jmWqHgGS0ToAAAAC/dudu-bubu.gif"
          alt="Dudu"
          className="w-28 md:w-36 h-auto object-contain"
        />
      </motion.div>

      {/* ── Floating hearts (rise from bottom) ──────────── */}
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.button
            key={heart.id}
            className="absolute z-10 cursor-pointer focus:outline-none"
            // Start just below the visible area, at a random x
            style={{ left: heart.x, bottom: 0 }}
            initial={{
              y: 0,
              x: 0,
              scale: 0.4,
              opacity: 0,
              rotate: heart.rotation,
            }}
            animate={
              heart.popped
                ? { scale: 0, opacity: 0 }
                : {
                    // Float upward past the top of the screen
                    y: [
                      0,
                      -window.innerHeight * 0.3,
                      -window.innerHeight * 0.6,
                      -window.innerHeight * 1.1,
                    ],
                    // Gentle sway left and right
                    x: [
                      0,
                      heart.driftX * 0.3,
                      heart.driftX * -0.2,
                      heart.driftX * 0.5,
                    ],
                    scale: [0.4, 1, 1, 0.6],
                    opacity: [0, 1, 1, 0],
                    rotate: [
                      heart.rotation,
                      heart.rotation + 8,
                      heart.rotation - 8,
                      heart.rotation,
                    ],
                  }
            }
            exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
            transition={{
              duration: heart.floatDuration,
              ease: "easeInOut",
              times: [0, 0.15, 0.7, 1],
            }}
            onClick={(e) => catchHeart(heart.id, e.currentTarget)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.8 }}
          >
            <span style={{ fontSize: heart.size, display: "block", lineHeight: 1 }}>
              💗
            </span>
          </motion.button>
        ))}
      </AnimatePresence>

      {/* ── Pop particles (fixed position = screen coords) ── */}
      <AnimatePresence>
        {popParticles.map((p) => (
          <motion.div
            key={p.id}
            className="pointer-events-none fixed z-40 flex items-center justify-center"
            style={{ left: p.x - 30, top: p.y - 30, width: 60, height: 60 }}
            initial={{ opacity: 1, scale: 0.5 }}
            animate={{ opacity: 0, scale: 2.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="text-4xl">✨</span>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* +1 floating label (fixed = screen coords) */}
      <AnimatePresence>
        {popParticles.map((p) => (
          <motion.div
            key={`label-${p.id}`}
            className="pointer-events-none fixed z-40 font-black text-xl"
            style={{
              left: p.x - 20,
              top: p.y - 28,
              color: "#c2185b",
              fontFamily: "'Nunito',sans-serif",
              textShadow: "0 1px 6px white",
            }}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
          >
            ❤️ +1
          </motion.div>
        ))}
      </AnimatePresence>

      {/* ── Win overlay ─────────────────────────────────── */}
      <AnimatePresence>
        {gameWon && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            style={{ background: "rgba(255,235,245,0.96)", backdropFilter: "blur(8px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.5, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex flex-col items-center gap-6"
            >
              {/* Hug GIF */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://media1.tenor.com/m/mKr-KcMW9RcAAAAC/cute-bears.gif"
                alt="Bubu Dudu Hug"
                className="w-44 h-44 object-contain rounded-3xl shadow-2xl"
              />
              <motion.h2
                className="text-4xl md:text-5xl font-black text-center"
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  color: "#880e4f",
                }}
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                You unlocked my heart ❤️
              </motion.h2>
              <p
                className="font-bold text-[1.1rem] text-pink-500 text-center"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Next stop... 🎂 Blow the candle!
              </p>
              {/* Progress dots */}
              <div className="flex gap-3 mt-2">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full bg-pink-400"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
