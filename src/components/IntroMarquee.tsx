"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function IntroMarquee({ onComplete }: { onComplete?: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  const handleFinish = () => {
    setIsVisible(false);
    if (onComplete) {
      setTimeout(onComplete, 500);
    }
  };

  useEffect(() => {
    // 3.5s smooth loader
    const duration = 3500;
    const intervalTime = 35;
    const increment = 100 / (duration / intervalTime);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(handleFinish, 300);
          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, intervalTime);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        handleFinish();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(progressTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const items = [
    "MOHAMMAD AARIZ KHAN",
    "FULL-STACK SOFTWARE ENGINEER",
    "CREATIVE AI DEVELOPER",
    "NEXT.JS & TYPESCRIPT",
    "MOHAMMAD AARIZ KHAN"
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.87, 0, 0.13, 1] }}
          className="fixed inset-0 z-[999] bg-[#09090b] flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden"
        >
          {/* Top Bar: Studio tag + Skip button */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">
                PORTFOLIO // 2026
              </span>
            </div>

            <button
              onClick={handleFinish}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white text-zinc-300 hover:text-zinc-950 text-xs font-mono font-semibold tracking-wider uppercase border border-white/15 transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <span>Skip Intro</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Center 3 Rows of Infinite Scrolling Marquees */}
          <div className="space-y-2 sm:space-y-4 my-auto w-full overflow-hidden">
            
            {/* Row 1: Scrolling Left */}
            <div className="flex overflow-hidden w-full whitespace-nowrap">
              <motion.div
                className="flex shrink-0 items-center gap-6"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
              >
                {[...items, ...items].map((text, idx) => (
                  <span
                    key={`r1-${idx}`}
                    className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase text-white tracking-tight flex items-center gap-6"
                  >
                    <span>{text}</span>
                    <span className="text-zinc-700 text-3xl font-normal">•</span>
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Row 2: Scrolling Right (Outlined Text) */}
            <div className="flex overflow-hidden w-full whitespace-nowrap">
              <motion.div
                className="flex shrink-0 items-center gap-6"
                animate={{ x: ["-50%", "0%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
              >
                {[...items, ...items].map((text, idx) => (
                  <span
                    key={`r2-${idx}`}
                    className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.4)] tracking-tight flex items-center gap-6"
                  >
                    <span>{text}</span>
                    <span className="text-zinc-700 text-3xl font-normal">•</span>
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Row 3: Scrolling Left */}
            <div className="flex overflow-hidden w-full whitespace-nowrap">
              <motion.div
                className="flex shrink-0 items-center gap-6"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 32 }}
              >
                {[...items, ...items].map((text, idx) => (
                  <span
                    key={`r3-${idx}`}
                    className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase text-zinc-300 tracking-tight flex items-center gap-6"
                  >
                    <span>{text}</span>
                    <span className="text-zinc-700 text-3xl font-normal">•</span>
                  </span>
                ))}
              </motion.div>
            </div>

          </div>

          {/* Bottom Bar: Loading Track (Without Percentage Numbers) */}
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-500 uppercase tracking-wider">
              <span>INITIALIZING PORTFOLIO</span>
              <span>PRESS ESC TO SKIP</span>
            </div>
            <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-75 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
