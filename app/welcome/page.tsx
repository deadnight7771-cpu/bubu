"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import AnimatedButton from "@/components/AnimatedButton";

// Dynamic import for background particles to avoid SSR window issues
const BackgroundHearts = dynamic(() => import("@/components/BackgroundHearts"), { ssr: false });

export default function WelcomePage() {
  const features = [
    {
      id: "01",
      title: "Our Memories",
      desc: "Moments we'll cherish forever 💖",
      gif: "https://media1.tenor.com/m/mKr-KcMW9RcAAAAC/cute-bears.gif",
    },
    {
      id: "02",
      title: "Love Letter",
      desc: "A letter straight from my heart 💖",
      gif: "https://media1.tenor.com/m/_YoesJxE1tYAAAAC/panda-%C3%B6p%C3%BCc%C3%BCk.gif",
    },
    {
      id: "03",
      title: "100 Reasons",
      desc: "100 reasons why I love you 💖",
      gif: "https://media1.tenor.com/m/N7GiO8UsfooAAAAC/bubu-dudu-heart.gif",
    },
    {
      id: "04",
      title: "Playlist",
      desc: "Our favorite songs 💖",
      gif: "https://media1.tenor.com/m/1fQGHw3EjhcAAAAC/bubu-dudu-love.gif",
    },
    {
      id: "05",
      title: "Cute Quiz",
      desc: "Let's see how well you know me 💖",
      gif: "https://media1.tenor.com/m/DSPmi9MwrbcAAAAC/screen-bubu.gif",
    },
    {
      id: "06",
      title: "Our Timeline",
      desc: "A story of us, told in time 💖",
      gif: "https://media1.tenor.com/m/cVzKULzKpVgAAAAC/bubu-dudu-images-bubu-dudu-love.gif",
    },
    {
      id: "07",
      title: "Scratch Card",
      desc: "Scratch and win a cute surprise 💖",
      gif: "https://media1.tenor.com/m/HKQ9w2VpTHwAAAAC/ily.gif",
    },
    {
      id: "08",
      title: "Final Gift",
      desc: "The best surprise is saved for last 💖",
      gif: "https://media1.tenor.com/m/PHSt6JUShPgAAAAC/bubu-dudu-sseeyall.gif",
    },
  ];

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Autoplay blocked:", err));
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => console.log("Autoplay blocked:", err));
      setIsPlaying(true);
    }
  };

  const handleBegin = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().catch((err) => console.log("Audio play error:", err));
      setIsPlaying(true);
    }
    document.getElementById("features-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main
      className="min-h-screen w-full relative flex flex-col items-center justify-start overflow-x-hidden py-16 px-4"
      style={{
        background: "url('/bg.png') center/cover no-repeat fixed",
        backgroundColor: "#fff0f4",
      }}
    >
      {/* Background Music Audio Element */}
      <audio
        ref={audioRef}
        src="/love-song.mp3"
        loop
      />

      {/* Floating Music Disk Controller */}
      <div className="fixed top-6 right-6 md:right-8 z-[100]">
        <motion.button
          onClick={togglePlay}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-white/90 backdrop-blur-md rounded-full border-2 border-pink-200 shadow-[0_4px_16px_rgba(255,100,150,0.15)] flex items-center justify-center cursor-pointer relative"
        >
          {/* Vinyl Ring */}
          <div className="absolute inset-1 rounded-full border-2 border-pink-100/50" />
          
          {/* Icon / Music Note */}
          <motion.div
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={isPlaying ? { duration: 4, repeat: Infinity, ease: "linear" } : {}}
            className="text-2xl"
          >
            {isPlaying ? "🎵" : "🔇"}
          </motion.div>

          {/* Tiny pulse when playing */}
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
          )}
        </motion.button>
      </div>

      {/* Background Hearts (SSR-safe floating particles) */}
      <BackgroundHearts />

      {/* Hanging Hearts Decoration (Top-Left) */}
      <div className="absolute top-0 left-0 w-48 h-48 select-none pointer-events-none origin-top-left z-10">
        <motion.svg
          width="180"
          height="180"
          viewBox="0 0 180 180"
          fill="none"
          className="drop-shadow-sm"
          animate={{ rotate: [-1.5, 1.5, -1.5], y: [0, 2, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M 0 10 Q 40 40 90 20 T 180 30"
            stroke="#fda4af"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <path
            d="M 0 25 C 30 70 70 80 120 50"
            stroke="#fda4af"
            strokeWidth="1.5"
          />
          {/* Heart 1 */}
          <line x1="30" y1="42" x2="30" y2="70" stroke="#fda4af" strokeWidth="1.2" />
          <path d="M 25 70 C 25 65, 35 65, 35 70 C 35 75, 30 80, 30 83 C 30 80, 25 75, 25 70 Z" fill="#ff4d7e" />
          {/* Heart 2 */}
          <line x1="75" y1="36" x2="75" y2="95" stroke="#fda4af" strokeWidth="1.2" />
          <path d="M 68 95 C 68 88, 82 88, 82 95 C 82 102, 75 109, 75 113 C 75 109, 68 102, 68 95 Z" fill="#ff85a8" />
          {/* Heart 3 */}
          <line x1="120" y1="50" x2="120" y2="80" stroke="#fda4af" strokeWidth="1.2" />
          <path d="M 115 80 C 115 75, 125 75, 125 80 C 125 85, 120 90, 120 93 C 120 90, 115 85, 115 80 Z" fill="#ff4d7e" />
          {/* Heart 4 */}
          <line x1="155" y1="28" x2="155" y2="55" stroke="#fda4af" strokeWidth="1.2" />
          <path d="M 150 55 C 150 50, 160 50, 160 55 C 160 60, 155 65, 155 68 C 155 65, 150 60, 150 55 Z" fill="#f43f5e" />
        </motion.svg>
      </div>

      {/* Floating Hot Air Balloon (Top-Right) */}
      <motion.div
        className="absolute top-8 right-6 md:right-16 z-10 w-28 h-40 select-none pointer-events-none hidden md:flex flex-col items-center origin-bottom"
        animate={{
          y: [0, -18, 0],
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-20 h-24 rounded-t-full bg-gradient-to-b from-[#ff85a8] to-[#ff4d7e] relative shadow-[0_8px_20px_rgba(255,77,126,0.25)] border border-pink-300/40 flex overflow-hidden rounded-b-[70%_35%]">
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-7 bg-white/20" />
          <div className="absolute inset-y-0 left-0 w-4 bg-white/10" />
          <div className="absolute inset-y-0 right-0 w-4 bg-white/10" />
          <div className="absolute inset-x-0 bottom-0 h-4 bg-rose-500/20" />
        </div>
        <div className="flex justify-between w-12 h-5 px-2 relative -mt-0.5">
          <div className="w-[1.5px] h-full bg-[#8d5b4c]/70 transform -rotate-12" />
          <div className="w-[1.5px] h-full bg-[#8d5b4c]/70 transform rotate-12" />
        </div>
        <div className="w-12 h-10 bg-gradient-to-b from-[#c0997e] to-[#916b50] rounded-b-md border border-[#855e43] shadow-md relative -mt-0.5 flex items-end justify-center overflow-visible">
          <div className="absolute inset-x-0 top-1 h-[2px] bg-[#6d4a31]/30" />
          <div className="absolute inset-x-0 bottom-2 h-[2px] bg-[#6d4a31]/30" />
          <div className="absolute -top-7 w-12 h-10 overflow-hidden flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://media1.tenor.com/m/PHSt6JUShPgAAAAC/bubu-dudu-sseeyall.gif"
              alt="Bubu Dudu in Balloon"
              className="w-10 h-10 object-contain"
            />
          </div>
        </div>
      </motion.div>

      {/* Main Greeting Section */}
      <div className="flex flex-col items-center justify-center max-w-lg w-full mt-10 md:mt-16 relative">
        
        {/* Floating Bubu (Left of Card) */}
        <div className="absolute -left-24 bottom-16 w-28 h-28 hidden lg:block z-20">
          {/* Speech Bubble */}
          <div className="absolute -top-16 -left-10 bg-white border-2 border-pink-200 shadow-[0_6px_16px_rgba(255,100,150,0.15)] text-[#5c0632] font-black px-4 py-2 rounded-2xl text-[0.9rem] max-w-[150px] leading-snug text-center animate-bounce">
            I&apos;m so excited for you 💖
            <div className="absolute bottom-[-6px] left-[40%] w-3 h-3 bg-white border-r border-b border-pink-100 rotate-45" />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://media1.tenor.com/m/DSPmi9MwrbcAAAAC/screen-bubu.gif"
            alt="Bubu"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Floating Dudu (Right of Card) */}
        <div className="absolute -right-20 bottom-16 w-24 h-24 hidden lg:block z-20">
          {/* Speech Bubble */}
          <div className="absolute -top-14 -right-8 bg-white border-2 border-pink-200 shadow-[0_6px_16px_rgba(255,100,150,0.15)] text-[#5c0632] font-black px-5 py-2 rounded-2xl text-[0.9rem] text-center animate-bounce" style={{ animationDelay: "0.2s" }}>
            Hehe 💖
            <div className="absolute bottom-[-6px] right-[40%] w-3 h-3 bg-white border-r border-b border-pink-100 rotate-45" />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://media1.tenor.com/m/jmWqHgGS0ToAAAAC/dudu-bubu.gif"
            alt="Dudu"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Cursive Main Title */}
        <motion.h1
          className="font-dancing text-6xl md:text-7xl text-[#880e4f] font-black mb-2 leading-tight text-center drop-shadow-[0_2px_4px_rgba(255,182,193,0.3)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Hi My Love 💖
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-nunito font-extrabold text-base tracking-[3px] uppercase text-[#c2185b] mb-6 text-center select-none drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          • Welcome to your special surprise •
        </motion.p>

        {/* White Card */}
        <motion.div
          className="bg-white/85 backdrop-blur-md border border-pink-100/50 rounded-[2.5rem] shadow-[0_15px_40px_rgba(255,100,150,0.1)] p-8 w-full relative z-10 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Top Heart Separator */}
          <div className="flex items-center justify-center mb-6 gap-2">
            <div className="w-12 border-t border-dashed border-pink-200" />
            <span className="text-pink-400 text-xs">💖</span>
            <div className="w-12 border-t border-dashed border-pink-200" />
          </div>

          <div className="space-y-6">
            <p className="font-nunito font-extrabold text-[#5c0632] text-[1.25rem] md:text-[1.4rem] italic leading-relaxed">
              Today isn&apos;t just another day... 💖
            </p>
            <p className="font-dancing text-4xl md:text-5xl font-extrabold text-[#880e4f] leading-snug drop-shadow-[0_1px_2px_rgba(255,182,193,0.4)] my-1">
              Today the world got its prettiest girl. 💖
            </p>
            <p className="font-nunito font-extrabold text-[#5c0632] text-[1.25rem] md:text-[1.4rem]">
              So I made something only for you... 💖
            </p>
          </div>

          {/* Bottom Heart Separator */}
          <div className="flex items-center justify-center mt-6 gap-2">
            <div className="w-12 border-t border-dashed border-pink-200" />
            <span className="text-pink-400 text-xs">💖</span>
            <div className="w-12 border-t border-dashed border-pink-200" />
          </div>
        </motion.div>

        {/* Begin Button */}
        <motion.div
          className="-mt-7 w-64 max-w-full text-center relative z-20"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <AnimatedButton onClick={handleBegin} style={{ width: "100%", padding: "18px 32px" }}>
            Let&apos;s Begin ✨
          </AnimatedButton>
          <span className="text-[0.95rem] font-extrabold text-[#c2185b] mt-4 block select-none drop-shadow-[0_1px_1px_white] text-center">
            🎧 Turn on the volume and enjoy the journey 💖
          </span>
        </motion.div>
      </div>

      {/* Grid Container section */}
      <section id="features-section" className="max-w-6xl w-full mt-24 pt-8">
        
        {/* Section Title */}
        <h2 className="font-dancing text-5xl md:text-6xl text-[#880e4f] font-black text-center mb-10 drop-shadow-[0_2px_4px_rgba(255,182,193,0.4)]">
          💖 Here&apos;s what&apos;s waiting for you 💖
        </h2>

        {/* Features Grid (1 column on mobile, 2 on tablet, 4 on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6">
          {features.map((f, i) => (
            <motion.div
              key={f.id}
              className="
                bg-white/80 backdrop-blur-md rounded-3xl p-5 border border-pink-100/50
                shadow-[0_4px_20px_rgba(255,100,150,0.03)] hover:shadow-[0_12px_30px_rgba(255,100,150,0.12)]
                flex flex-col items-center text-center cursor-pointer relative group overflow-hidden
                transition-all duration-300
              "
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              {/* Card Number Badge */}
              <div className="absolute top-4 left-4 bg-pink-100/90 text-[#880e4f] font-black text-[0.85rem] px-3 py-1 rounded-full border border-pink-200">
                {f.id}
              </div>

              {/* GIF Circle container */}
              <div className="w-20 h-20 rounded-2xl bg-pink-50/50 flex items-center justify-center mt-3 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-inner border border-pink-100/30 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.gif}
                  alt={f.title}
                  className="w-16 h-16 object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="font-dancing text-3xl text-[#880e4f] font-extrabold mb-1.5 group-hover:text-rose-700 transition-colors">
                {f.title}
              </h3>

              {/* Description */}
              <p className="font-nunito font-bold text-[0.95rem] text-[#5c0632] leading-snug">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Headphones footer message */}
        <div className="text-center mt-12 mb-6">
          <p className="text-[#880e4f] font-extrabold tracking-widest text-[0.95rem] uppercase select-none drop-shadow-[0_1px_1px_white]">
            🎵 Best experienced with headphones 💖
          </p>
        </div>
      </section>
    </main>
  );
}
