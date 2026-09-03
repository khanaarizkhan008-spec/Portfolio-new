"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only enable for desktop devices with fine pointer
    const mediaQuery = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    setIsDesktop(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
      if (!e.matches) setIsVisible(false);
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    if (!mediaQuery.matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Add listeners to interactive elements
    const attachHoverListeners = () => {
      const interactiveElements = document.querySelectorAll("a, button, input, textarea, select, [role='button']");
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
    };

    attachHoverListeners();

    const observer = new MutationObserver(() => {
      attachHoverListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [isVisible]);

  if (!isDesktop || !isVisible) {
    return null;
  }

  return (
    <div className="hidden lg:block pointer-events-none">
      <motion.div
        className="fixed top-0 left-0 w-3.5 h-3.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 7,
          y: mousePosition.y - 7,
          scale: isHovering ? 2.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
          mass: 0.3,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 border border-white/30 rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 18,
          y: mousePosition.y - 18,
          scale: isHovering ? 1.6 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          mass: 0.8,
        }}
      />
    </div>
  );
}
