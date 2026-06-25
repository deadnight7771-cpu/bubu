"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef, useState, useCallback } from "react";
import AnimatedButton from "./AnimatedButton";

// ── Secret date ──────────────────────────────────────────────
const SECRET = { dd: "27", mm: "08", yyyy: "2007" };

// ── Confetti burst ────────────────────────────────────────────
function triggerConfetti() {
  const colors = ["#ff4d7e", "#ffb3c6", "#ff85a8", "#ffe0ec", "#f06292", "#fff", "#c2185b"];
  for (let i = 0; i < 160; i++) {
    const el = document.createElement("div");
    const size = 6 + Math.random() * 10;
    el.style.cssText = `
      position:fixed;z-index:300;pointer-events:none;
      left:${Math.random() * 100}vw;
      top:${Math.random() * 30}vh;
      width:${size}px;height:${size}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      border-radius:${Math.random() > 0.4 ? "50%" : "3px"};
      animation:confettiFall ${2 + Math.random() * 3}s linear ${Math.random() * 0.7}s forwards;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 5500);
  }
}

// ── Main LoginCard ─────────────────────────────────────────────
export default function LoginCard() {
  const router = useRouter();

  const [dd,   setDd]   = useState("");
  const [mm,   setMm]   = useState("");
  const [yyyy, setYyyy] = useState("");
  const [loading,   setLoading]   = useState(false);
  const [shaking,   setShaking]   = useState(false);
  const [success,   setSuccess]   = useState(false);

  const mmRef   = useRef<HTMLInputElement>(null);
  const yyyyRef = useRef<HTMLInputElement>(null);

  const handleDd = useCallback((v: string) => {
    if (v.length <= 2) { setDd(v); if (v.length === 2) mmRef.current?.focus(); }
  }, []);
  const handleMm = useCallback((v: string) => {
    if (v.length <= 2) { setMm(v); if (v.length === 2) yyyyRef.current?.focus(); }
  }, []);
  const handleYyyy = useCallback((v: string) => {
    if (v.length <= 4) setYyyy(v);
  }, []);

  const check = useCallback(async () => {
    const entered = {
      dd:   dd.padStart(2, "0"),
      mm:   mm.padStart(2, "0"),
      yyyy: yyyy,
    };

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);

    if (
      entered.dd   === SECRET.dd &&
      entered.mm   === SECRET.mm &&
      entered.yyyy === SECRET.yyyy
    ) {
      setSuccess(true);
      triggerConfetti();
      await new Promise((r) => setTimeout(r, 900));
      router.push("/game");
    } else {
      setShaking(true);
      setTimeout(() => {
        setShaking(false);
        router.push("/wrong-date");
      }, 500);
    }
  }, [dd, mm, yyyy, router]);

  return (
    <>
      {/* Confetti CSS */}
      <style>{`
        @keyframes confettiFall {
          0%   { opacity:1; transform:translateY(0) rotate(0deg); }
          100% { opacity:0; transform:translateY(100vh) rotate(720deg); }
        }
      `}</style>

      {/* Card (Solid White with rounded corners and soft shadow) */}
      <motion.div
        className="relative z-10 w-full max-w-[400px] mx-4 p-8 rounded-[2.5rem] bg-white shadow-[0_15px_40px_rgba(255,100,150,0.15)] border border-pink-100/30 overflow-hidden"
        initial={{ opacity: 0, y: 50, scale: 0.92 }}
        animate={
          success
            ? { opacity: 0, scale: 1.05 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={
          success
            ? { duration: 0.5 }
            : { duration: 0.8, type: "spring", stiffness: 200, damping: 22 }
        }
      >
        {/* Shimmer */}
        <motion.div
          className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none"
          style={{ x: "-100%" }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)",
            }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {!success && (
            <motion.div
              key="login-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="text-center flex flex-col items-center"
            >
              {/* Bubu Dudu hugging GIF with sparkles */}
              <div className="flex items-center justify-center gap-5 mb-6 mt-2">
                <span className="text-3xl animate-pulse text-amber-400 select-none">✨</span>
                <div className="w-52 h-52 overflow-hidden rounded-2xl flex items-center justify-center bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/bubu-dudu-nobg.gif"
                    alt="Bubu Dudu hugging"
                    className="w-[105%] h-[105%] object-contain"
                  />
                </div>
                <span className="text-3xl animate-pulse text-amber-400 select-none" style={{ animationDelay: "0.5s" }}>✨</span>
              </div>

              {/* Heading */}
              <motion.h1
                className="font-dancing text-5xl md:text-6xl text-[#c2185b] font-bold mb-3 leading-tight drop-shadow-[0_2px_4px_rgba(255,182,193,0.3)]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Welcome My Love 💖
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="font-nunito font-semibold text-[1rem] md:text-[1.1rem] text-[#f06292] mb-5 leading-relaxed max-w-[320px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
              >
                Enter your birthday to unlock<br />your special surprise 🌸
              </motion.p>

              {/* Pulsing hearts row */}
              <motion.div
                className="flex justify-center gap-4 mb-7"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
              >
                {["💕", "💗", "💕"].map((e, i) => (
                  <motion.span
                    key={i}
                    className="text-2xl"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{
                      duration: 1.4,
                      delay: i * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {e}
                  </motion.span>
                ))}
              </motion.div>

              {/* Date Input */}
              <motion.div
                className="w-full"
                animate={shaking ? { x: [-4, 6, -6, 6, -4, 0] } : {}}
                transition={{ duration: 0.45 }}
              >
                <div
                  className="
                    flex items-center w-full
                    bg-white border-2 border-pink-100/90
                    rounded-2xl px-5 py-3
                    focus-within:border-pink-300
                    focus-within:shadow-[0_4px_24px_rgba(255,100,150,0.12)]
                    transition-all duration-300
                    shadow-[0_2px_10px_rgba(255,100,150,0.01)]
                  "
                >
                  <span className="text-[#f48fb1] text-xl mr-4 select-none">📅</span>

                  <div className="flex items-center flex-1 justify-center">
                    <input
                      type="number"
                      placeholder="DD"
                      value={dd}
                      onChange={(e) => handleDd(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && check()}
                      className="w-12 md:w-14 bg-transparent text-center text-xl md:text-2xl font-extrabold text-[#880e4f]
                                 placeholder-pink-200 outline-none py-1"
                      inputMode="numeric"
                      min={1} max={31}
                    />
                    <span className="text-pink-300 font-bold text-xl md:text-2xl px-3 select-none">/</span>
                    <input
                      ref={mmRef}
                      type="number"
                      placeholder="MM"
                      value={mm}
                      onChange={(e) => handleMm(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && check()}
                      className="w-12 md:w-14 bg-transparent text-center text-xl md:text-2xl font-extrabold text-[#880e4f]
                                 placeholder-pink-200 outline-none py-1"
                      inputMode="numeric"
                      min={1} max={12}
                    />
                    <span className="text-pink-300 font-bold text-xl md:text-2xl px-3 select-none">/</span>
                    <input
                      ref={yyyyRef}
                      type="number"
                      placeholder="YYYY"
                      value={yyyy}
                      onChange={(e) => handleYyyy(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && check()}
                      className="w-20 md:w-24 bg-transparent text-center text-xl md:text-2xl font-extrabold text-[#880e4f]
                                 placeholder-pink-200 outline-none py-1"
                      inputMode="numeric"
                      min={1900} max={2099}
                    />
                  </div>
                </div>
              </motion.div>

              {/* 3cm Spacer between Input and Button (Inline style is 100% reliable) */}
              <div style={{ height: "96px" }} className="w-full pointer-events-none" />

              {/* Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="w-full mb-6"
              >
                <AnimatedButton onClick={check} loading={loading}>
                  Unlock My Surprise 💖
                </AnimatedButton>
              </motion.div>

              {/* Footer */}
              <p className="text-[0.85rem] md:text-[0.95rem] text-pink-400 font-bold tracking-wide flex items-center justify-center gap-1.5 select-none">
                <span>🔒 Only for my special person 💗</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
