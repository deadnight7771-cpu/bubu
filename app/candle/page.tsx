"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  size: number;
  duration: number;
}

function createConfetti(): ConfettiPiece[] {
  const colors = ["#ff4d7e", "#ffb3c6", "#ff85a8", "#ffe0ec", "#f06292", "#fff", "#c2185b", "#ffd700", "#ff69b4"];
  return Array.from({ length: 120 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 1.2,
    size: 6 + Math.random() * 10,
    duration: 2 + Math.random() * 2,
  }));
}

export default function CandlePage() {
  const router = useRouter();
  const [blown, setBlown] = useState(false);
  const [micError, setMicError] = useState(false);
  const [listening, setListening] = useState(false);
  const [flameIntensity, setFlameIntensity] = useState(1);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [hint, setHint] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const blownRef = useRef(false);
  const threshold = 40; // RMS threshold for "blow" detection

  const stopMic = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    audioContextRef.current?.close();
  }, []);

  const detectBlow = useCallback(() => {
    if (!analyserRef.current) return;
    const data = new Uint8Array(analyserRef.current.fftSize);
    analyserRef.current.getByteTimeDomainData(data);
    // Compute RMS volume
    let sumSquares = 0;
    for (const v of data) {
      const normalized = v / 128 - 1;
      sumSquares += normalized * normalized;
    }
    const rms = Math.sqrt(sumSquares / data.length) * 100;
    setFlameIntensity(Math.max(0.1, 1 - rms / threshold));

    if (rms > threshold && !blownRef.current) {
      blownRef.current = true;
      stopMic();
      setBlown(true);
      setListening(false);
      setConfetti(createConfetti());
      setTimeout(() => router.push("/letter"), 4000);
      return;
    }
    rafRef.current = requestAnimationFrame(detectBlow);
  }, [stopMic, router]);

  const startListening = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const ctx = new AudioContext();
      audioContextRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      analyserRef.current = analyser;
      setListening(true);
      setMicError(false);
      rafRef.current = requestAnimationFrame(detectBlow);
    } catch {
      setMicError(true);
    }
  }, [detectBlow]);

  useEffect(() => {
    // Show hint after 2s
    const t = setTimeout(() => setHint(true), 2000);
    return () => {
      clearTimeout(t);
      stopMic();
    };
  }, [stopMic]);

  useEffect(() => {
    if (blown) {
      const audio = new Audio("/happy-birthday.mp3");
      audio.play().catch((err) => console.log("Happy Birthday audio playback failed:", err));
      return () => {
        audio.pause();
      };
    }
  }, [blown]);

  return (
    <main
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(160deg,#1a0a15 0%,#2d0e22 40%,#3d1230 70%,#1a0a15 100%)",
      }}
    >
      {/* Stars background */}
      {Array.from({ length: 60 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/60"
          style={{
            width: 1 + Math.random() * 2,
            height: 1 + Math.random() * 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 70}%`,
            opacity: 0.3 + Math.random() * 0.6,
            animation: `twinkle ${1.5 + Math.random() * 2.5}s ease-in-out ${Math.random() * 2}s infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle { from { opacity: 0.2; } to { opacity: 0.9; } }
        @keyframes flameFlicker {
          0%, 100% { transform: scale(1) skewX(0deg); opacity: 1; }
          25% { transform: scale(1.08, 1.15) skewX(4deg); opacity: 0.95; }
          50% { transform: scale(0.95, 1.1) skewX(-3deg); opacity: 1; }
          75% { transform: scale(1.05, 1.2) skewX(2deg); opacity: 0.97; }
        }
        @keyframes confettiFall {
          0% { opacity: 1; transform: translateY(-20px) rotate(0deg); }
          100% { opacity: 0; transform: translateY(110vh) rotate(720deg); }
        }
        @keyframes waxDrip {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.05); }
        }
      `}</style>

      {/* ── Title ──────────────────────────────────────── */}
      <motion.div
        className="text-center mb-6 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1
          className="text-4xl md:text-5xl font-black mb-2"
          style={{ fontFamily: "'Dancing Script', cursive", color: "#ff85a8" }}
        >
          🎂 Blow The Candle 🎂
        </h1>
        <p
          className="font-bold text-pink-300 text-[1rem]"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          Make a wish and blow the candle out! ✨
        </p>
      </motion.div>

      {/* ── Cake ──────────────────────────────────────── */}
      <motion.div
        className="relative flex flex-col items-center mb-8"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {/* Candle + Flame */}
        {!blown && (
          <div className="flex flex-col items-center mb-[-4px] z-10">
            {/* Flame */}
            <motion.div
              style={{
                width: 22 * flameIntensity,
                height: 36 * flameIntensity,
                background: "radial-gradient(ellipse at 60% 70%, #fff7aa 0%, #ffcc00 30%, #ff8800 65%, transparent 100%)",
                borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                boxShadow: `0 0 ${20 * flameIntensity}px ${12 * flameIntensity}px rgba(255,160,0,0.5)`,
                filter: "blur(0.5px)",
                animation: "flameFlicker 0.4s ease-in-out infinite",
                opacity: flameIntensity,
              }}
            />
            {/* Wick */}
            <div
              style={{
                width: 2,
                height: 12,
                background: "#333",
                borderRadius: 2,
                marginTop: -2,
              }}
            />
            {/* Candle body */}
            <div
              style={{
                width: 14,
                height: 50,
                background: "linear-gradient(to right, #ff85a8, #ff4d7e, #ff85a8)",
                borderRadius: "4px 4px 2px 2px",
                boxShadow: "inset -3px 0 6px rgba(0,0,0,0.15)",
                animation: "waxDrip 3s ease-in-out infinite",
              }}
            >
              {/* Wax drips */}
              <div
                style={{
                  position: "absolute",
                  top: 8,
                  left: 3,
                  width: 4,
                  height: 10,
                  background: "#ff85a8",
                  borderRadius: "0 0 4px 4px",
                  opacity: 0.7,
                }}
              />
            </div>
          </div>
        )}

        {/* Blown out — smoke effect */}
        {blown && (
          <div className="flex flex-col items-center mb-[-4px] z-10">
            <motion.div
              className="text-4xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1, y: [-10, -30], opacity: [1, 0] }}
              transition={{ duration: 1.5, repeat: 2 }}
            >
              💨
            </motion.div>
            <div
              style={{
                width: 14,
                height: 50,
                background: "linear-gradient(to right, #9e9e9e, #bdbdbd, #9e9e9e)",
                borderRadius: "4px 4px 2px 2px",
                boxShadow: "inset -3px 0 6px rgba(0,0,0,0.15)",
              }}
            />
          </div>
        )}

        {/* ── CAKE LAYERS ──────────────────────────────── */}
        <div className="flex flex-col items-center">
          {/* Top tier */}
          <div
            className="relative"
            style={{
              width: 140,
              height: 52,
              background: "linear-gradient(to bottom, #ffd6e8, #ffadd5)",
              borderRadius: "8px 8px 4px 4px",
              boxShadow: "0 4px 12px rgba(255,100,150,0.25), inset 0 2px 4px rgba(255,255,255,0.5)",
            }}
          >
            <div
              className="absolute inset-x-0 top-0 flex justify-around px-3"
              style={{ marginTop: -10 }}
            >
              {["🌸", "💗", "🌸"].map((e, i) => (
                <span key={i} className="text-lg">{e}</span>
              ))}
            </div>
            <div className="absolute inset-x-0 top-1 text-center text-xs font-bold text-pink-600 pt-4">
              Happy Birthday!
            </div>
          </div>
          {/* Frosting drip */}
          <div
            style={{
              width: 160,
              height: 12,
              background: "white",
              borderRadius: "0 0 8px 8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
            }}
          />
          {/* Mid tier */}
          <div
            style={{
              width: 190,
              height: 65,
              background: "linear-gradient(to bottom, #ffcde8, #ff9fc5)",
              borderRadius: "4px",
              boxShadow: "0 4px 14px rgba(255,100,150,0.2), inset 0 2px 4px rgba(255,255,255,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            {["💕", "🎂", "💕"].map((e, i) => (
              <span key={i} className="text-2xl">{e}</span>
            ))}
          </div>
          {/* Frosting drip 2 */}
          <div
            style={{
              width: 210,
              height: 14,
              background: "white",
              borderRadius: "0 0 10px 10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
            }}
          />
          {/* Bottom tier */}
          <div
            style={{
              width: 240,
              height: 72,
              background: "linear-gradient(to bottom, #ffb3d1, #ff7bad)",
              borderRadius: "4px",
              boxShadow: "0 6px 20px rgba(255,100,150,0.3), inset 0 2px 4px rgba(255,255,255,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
            }}
          >
            {["🍓", "❤️", "🍓", "❤️", "🍓"].map((e, i) => (
              <span key={i} className="text-xl">{e}</span>
            ))}
          </div>
          {/* Cake board */}
          <div
            style={{
              width: 270,
              height: 18,
              background: "linear-gradient(to bottom, #d4a0c0, #b07090)",
              borderRadius: "0 0 12px 12px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.12)",
            }}
          />
        </div>
      </motion.div>

      {/* ── Controls ──────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {!blown && !listening && (
          <motion.div
            key="btn"
            className="flex flex-col items-center gap-3 mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <motion.button
              onClick={startListening}
              className="px-10 py-4 rounded-full font-black text-white text-lg shadow-[0_4px_24px_rgba(255,100,150,0.4)]"
              style={{
                background: "linear-gradient(135deg,#ff4d7e,#c2185b)",
                fontFamily: "'Nunito',sans-serif",
                letterSpacing: "0.04em",
              }}
              whileHover={{ scale: 1.06, boxShadow: "0 6px 32px rgba(255,100,150,0.55)" }}
              whileTap={{ scale: 0.95 }}
            >
              🎤 Allow Mic & Start
            </motion.button>

            {micError && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-pink-300 font-bold text-sm text-center max-w-[280px]"
                style={{ fontFamily: "'Nunito',sans-serif" }}
              >
                ⚠️ Mic access denied. Please allow microphone and try again.
              </motion.p>
            )}

            {hint && !micError && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-pink-300/80 text-sm font-semibold"
                style={{ fontFamily: "'Nunito',sans-serif" }}
              >
                Tap the button, then blow towards your mic 💨
              </motion.p>
            )}
          </motion.div>
        )}

        {listening && !blown && (
          <motion.div
            key="listening"
            className="flex flex-col items-center gap-3 mt-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-6xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            >
              🎤
            </motion.div>
            <p
              className="text-pink-300 font-black text-xl text-center"
              style={{ fontFamily: "'Nunito',sans-serif" }}
            >
              Listening... blow now! 💨
            </p>
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full bg-pink-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {blown && (
          <motion.div
            key="success"
            className="flex flex-col items-center gap-4 mt-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-black text-center"
              style={{ fontFamily: "'Dancing Script',cursive", color: "#ff85a8" }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🎉 Wish Granted! 🎉
            </motion.h2>
            <p
              className="text-pink-300 font-bold text-lg text-center"
              style={{ fontFamily: "'Nunito',sans-serif" }}
            >
              Opening your love letter... 💌
            </p>
            <div className="flex gap-3">
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
        )}
      </AnimatePresence>

      {/* ── Confetti ──────────────────────────────────── */}
      <AnimatePresence>
        {blown &&
          confetti.map((c) => (
            <motion.div
              key={c.id}
              className="fixed pointer-events-none z-50"
              style={{
                left: `${c.x}%`,
                top: "-20px",
                width: c.size,
                height: c.size,
                background: c.color,
                borderRadius: Math.random() > 0.4 ? "50%" : "3px",
              }}
              animate={{
                y: ["0px", "110vh"],
                rotate: [0, 720],
                opacity: [1, 0],
              }}
              transition={{
                duration: c.duration,
                delay: c.delay,
                ease: "linear",
              }}
            />
          ))}
      </AnimatePresence>
    </main>
  );
}
