"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useSpring, useTransform } from "framer-motion";

export default function ScrollProgressBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAdmin = pathname.startsWith("/admin");
  const show = !isHome && !isAdmin;

  const [progress, setProgress] = useState(0);
  const springProgress = useSpring(0, { stiffness: 250, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (!show) return;

    const onScroll = () => {
      const el = document.documentElement;
      const scrollTop = window.scrollY || el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(pct);
      springProgress.set(pct);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [show, springProgress]);

  const scaleX = useTransform(springProgress, [0, 100], [0, 1]);

  if (!show) return null;

  return (
    <>
      {/* ─── Top progress bar ─── */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-[999] h-[2px] origin-left pointer-events-none"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #f59e0b 0%, #f97316 60%, #ef4444 100%)",
        }}
      >
        {/* Glowing travelling tip */}
        <motion.span
          className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(251,191,36,0.8) 0%, transparent 70%)",
            opacity: progress > 1 ? 1 : 0,
          }}
        />
      </motion.div>

      {/* ─── Circular progress indicator ─── */}
      <div
        aria-label={`Page scroll progress: ${Math.round(progress)}%`}
        className="fixed bottom-6 right-6 z-[998] w-12 h-12 flex items-center justify-center"
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          className="-rotate-90 absolute inset-0"
        >
          {/* Track */}
          <circle
            cx="24" cy="24" r="20"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="2.5"
          />
          {/* Progress arc */}
          <motion.circle
            cx="24" cy="24" r="20"
            fill="none"
            stroke="url(#scrollGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 20}`}
            animate={{ strokeDashoffset: 2 * Math.PI * 20 * (1 - progress / 100) }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
          <defs>
            <linearGradient id="scrollGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
        </svg>

        {/* Percentage label */}
        <span className="relative z-10 text-[9px] font-bold tabular-nums text-zinc-400">
          {Math.round(progress)}
        </span>
      </div>
    </>
  );
}
