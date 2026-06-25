"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AnimatedButton from "@/components/AnimatedButton";
import AnimationLayers from "@/components/AnimationLayers";

export default function WrongDatePage() {
  const router = useRouter();

  return (
    <main
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        background: "url('/bg.png') center/cover no-repeat",
        backgroundColor: "#fff0f4",
      }}
    >
      {/* Soft glow orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500,
            background: "radial-gradient(circle,rgba(255,100,150,0.18) 0%,transparent 70%)",
            top: -150, left: -150,
            animation: "orbDrift1 14s ease-in-out infinite",
            filter: "blur(50px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 400, height: 400,
            background: "radial-gradient(circle,rgba(255,150,180,0.14) 0%,transparent 70%)",
            bottom: -100, right: -100,
            animation: "orbDrift2 18s ease-in-out infinite",
            filter: "blur(50px)",
          }}
        />
      </div>
      <style>{`
        @keyframes orbDrift1 {
          0%,100% { transform:translate(0,0) scale(1); }
          33%     { transform:translate(60px,40px) scale(1.1); }
          66%     { transform:translate(-30px,60px) scale(0.95); }
        }
        @keyframes orbDrift2 {
          0%,100% { transform:translate(0,0); }
          50%     { transform:translate(-50px,-40px) scale(1.08); }
        }
      `}</style>

      {/* Floating background hearts + corner characters */}
      <AnimationLayers />

      {/* Center Card */}
      <motion.div
        className="relative z-10 w-full max-w-[400px] mx-4 p-8 rounded-[2.5rem] bg-white shadow-[0_15px_40px_rgba(255,100,150,0.15)] border border-pink-100/30 overflow-hidden"
        initial={{ opacity: 0, y: 50, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 200, damping: 22 }}
      >
        {/* Shimmer effect inside the card */}
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

        <div className="text-center flex flex-col items-center">
          {/* GIF of Dudu beating Bubu with frying pan / pillow */}
          <div className="flex items-center justify-center gap-5 mb-6 mt-2">
            <span className="text-3xl animate-bounce text-red-500 select-none">💢</span>
            <div className="w-52 h-52 overflow-hidden rounded-2xl flex items-center justify-center bg-white border border-pink-100/50 shadow-[0_8px_20px_rgba(255,100,150,0.15)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://media1.tenor.com/m/eS49dxZbjHMAAAAC/dudu-hit-bubu.gif"
                alt="Dudu beating Bubu"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-3xl animate-bounce text-red-500 select-none" style={{ animationDelay: "0.4s" }}>🍳</span>
          </div>

          {/* Heading */}
          <h1 className="font-dancing text-4xl text-[#c2185b] font-bold mb-3 leading-tight drop-shadow-[0_2px_4px_rgba(255,182,193,0.3)]">
            Sahi Birthdate Daalo! 😠
          </h1>

          {/* Message */}
          <p className="font-nunito font-semibold text-[1rem] text-rose-600 mb-8 leading-relaxed max-w-[280px]">
            Galat birthday daala toh Dudu pitega! Try again, my sleepy princess 🌸
          </p>

          {/* Retry Button */}
          <div className="w-full mb-2">
            <AnimatedButton onClick={() => router.push("/")}>
              Try Again 💕
            </AnimatedButton>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
