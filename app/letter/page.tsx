"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const LETTER_LINES = [
  "My Dearest Love 💖",
  "",
  "Today is extra special — because the world got you.",
  "And somehow, I got lucky enough to know you. 🌸",
  "",
  "Every single day with you feels like a beautiful dream",
  "that I never want to wake up from. 💫",
  "",
  "You make everything brighter, warmer, and so much",
  "more worth living. I'm so grateful for every moment,",
  "every laugh, every quiet second by your side. 🥰",
  "",
  "On your birthday, I want you to know:",
  "you are the most beautiful, precious, and loved person",
  "in my entire world. 🌍💕",
  "",
  "So today — and every day — I hope you feel",
  "just as loved as you make me feel. 💖",
  "",
  "Happy Birthday, my love.",
  "",
  "Forever yours,",
  "Dudu 🐻💗",
];

export default function LetterPage() {
  const router = useRouter();
  const [visibleLines, setVisibleLines] = useState(0);
  const [done, setDone] = useState(false);
  const [petals, setPetals] = useState<
    { id: number; x: number; rotation: number; duration: number; delay: number; size: number }[]
  >([]);

  useEffect(() => {
    // Falling petals
    setPetals(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        rotation: Math.random() * 360,
        duration: 4 + Math.random() * 4,
        delay: Math.random() * 5,
        size: 14 + Math.random() * 14,
      }))
    );

    // Reveal letter lines one by one
    let line = 0;
    const iv = setInterval(() => {
      line++;
      setVisibleLines(line);
      if (line >= LETTER_LINES.length) {
        clearInterval(iv);
        setTimeout(() => setDone(true), 800);
      }
    }, 260);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const audio = new Audio("/letter-song.mp3");
    audio.loop = true;
    audio.play().catch((err) => console.log("Letter BGM autoplay blocked or failed:", err));
    return () => {
      audio.pause();
    };
  }, []);

  return (
    <main
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden py-16 px-4 pb-10"
      style={{
        background:
          "linear-gradient(145deg,#fff0f6 0%,#ffe8f2 40%,#ffdcea 70%,#fff0f6 100%)",
      }}
    >
      <style>{`
        @keyframes petalFall {
          0% { opacity: 0.8; transform: translateY(-40px) rotate(0deg); }
          100% { opacity: 0; transform: translateY(110vh) rotate(360deg); }
        }
      `}</style>

      {/* Falling flower petals */}
      {petals.map((p) => (
        <div
          key={p.id}
          className="fixed pointer-events-none z-0"
          style={{
            left: `${p.x}%`,
            top: "-30px",
            fontSize: p.size,
            animation: `petalFall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          🌸
        </div>
      ))}

      {/* Glow blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute rounded-full"
          style={{
            width: 450,
            height: 450,
            background:
              "radial-gradient(circle,rgba(255,100,150,0.1) 0%,transparent 70%)",
            top: -150,
            left: -150,
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 400,
            height: 400,
            background:
              "radial-gradient(circle,rgba(255,180,210,0.12) 0%,transparent 70%)",
            bottom: -100,
            right: -100,
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* ── Envelope / Letter Card ────────────────────── */}
      <motion.div
        className="relative z-10 w-full max-w-[640px]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Envelope flap top decoration */}
        <div
          className="flex items-center justify-center gap-3 mb-4"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          <div className="flex-1 border-t-2 border-dashed border-pink-200" />
          <span className="text-3xl">💌</span>
          <span
            className="text-2xl font-black"
            style={{ color: "#c2185b" }}
          >
            A Letter For You
          </span>
          <span className="text-3xl">💌</span>
          <div className="flex-1 border-t-2 border-dashed border-pink-200" />
        </div>

        {/* Letter card */}
        <div
          className="bg-white/90 backdrop-blur-md rounded-[2rem] shadow-[0_20px_60px_rgba(255,100,150,0.12)] border border-pink-100/60 px-8 py-10 md:px-12 md:py-12 relative overflow-hidden"
        >
          {/* Paper lines background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(transparent, transparent 31px, rgba(255,182,193,0.18) 31px, rgba(255,182,193,0.18) 32px)",
              backgroundPositionY: "40px",
            }}
          />

          {/* Letter content */}
          <div className="relative z-10 space-y-[2px]">
            {LETTER_LINES.slice(0, visibleLines).map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
                className={`leading-relaxed ${
                  i === 0
                    ? "font-dancing text-4xl md:text-5xl font-black text-[#880e4f] mb-4"
                    : line === ""
                    ? "h-3"
                    : i >= LETTER_LINES.length - 3
                    ? "font-dancing text-2xl md:text-3xl font-extrabold text-[#c2185b]"
                    : "font-nunito text-[1.05rem] md:text-[1.12rem] font-semibold text-[#5c0632]"
                }`}
                style={{
                  fontFamily:
                    i === 0 || i >= LETTER_LINES.length - 3
                      ? "'Dancing Script', cursive"
                      : "'Nunito', sans-serif",
                }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Blinking cursor while typing */}
          {visibleLines < LETTER_LINES.length && (
            <motion.span
              className="inline-block w-[2px] h-5 bg-pink-400 ml-1 align-middle"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          )}

          {/* Wax seal at the bottom */}
          <AnimatePresence>
            {done && (
              <motion.div
                className="flex flex-col items-center justify-center mt-8 gap-4"
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-[0_4px_16px_rgba(255,100,150,0.25)]"
                  style={{ background: "linear-gradient(135deg,#ff4d7e,#c2185b)" }}
                >
                  💖
                </div>
                {/* Bubu Dudu GIF inside the card to prevent overlap */}
                <motion.div
                  className="mt-2 pointer-events-none"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://media1.tenor.com/m/mKr-KcMW9RcAAAAC/cute-bears.gif"
                    alt="Bubu Dudu together"
                    className="w-24 h-24 object-contain opacity-95"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Continue button */}
        <AnimatePresence>
          {done && (
            <motion.div
              className="flex justify-center mt-8 relative z-[50]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={() => router.push("/welcome")}
                className="px-12 py-4 rounded-full font-black text-white text-xl shadow-[0_6px_28px_rgba(255,100,150,0.4)] relative z-[50] cursor-pointer"
                style={{
                  background: "linear-gradient(135deg,#ff4d7e,#c2185b)",
                  fontFamily: "'Nunito',sans-serif",
                  letterSpacing: "0.04em",
                }}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
              >
                Open Your Surprise 🎁✨
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
