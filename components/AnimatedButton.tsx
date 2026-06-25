"use client";

import { motion } from "framer-motion";
import { ButtonHTMLAttributes, useRef } from "react";

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
}

export default function AnimatedButton({
  children,
  loading,
  onClick,
  ...props
}: AnimatedButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    // Ripple effect
    const btn = btnRef.current;
    if (btn) {
      const rect  = btn.getBoundingClientRect();
      const size  = Math.max(rect.width, rect.height);
      const x     = e.clientX - rect.left - size / 2;
      const y     = e.clientY - rect.top  - size / 2;
      const ripple = document.createElement("span");
      ripple.style.cssText = `
        position:absolute;
        width:${size}px;height:${size}px;
        left:${x}px;top:${y}px;
        border-radius:50%;
        background:rgba(255,255,255,0.35);
        transform:scale(0);
        animation:ripple 0.65s linear;
        pointer-events:none;
      `;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    }
    onClick?.(e);
  }

  return (
    <>
      <style>{`
        @keyframes ripple {
          to { transform: scale(4); opacity: 0; }
        }
      `}</style>
      <motion.button
        ref={btnRef}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        onClick={handleClick}
        disabled={loading}
        className="relative w-full overflow-hidden rounded-full bg-gradient-to-r from-pink-400 via-rose-500 to-pink-500 px-8 py-5 text-white font-nunito font-bold text-xl md:text-2xl tracking-wide shadow-[0_8px_28px_rgba(233,30,99,0.42)] hover:shadow-[0_12px_40px_rgba(233,30,99,0.6)] transition-shadow duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
        {...props}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            />
            Checking...
          </span>
        ) : (
          children
        )}
      </motion.button>
    </>
  );
}
