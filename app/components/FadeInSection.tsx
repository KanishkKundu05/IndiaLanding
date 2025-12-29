"use client";

import { useEffect, useRef, useState } from "react";

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function FadeInSection({ children, className = "" }: FadeInSectionProps) {
  const [opacity, setOpacity] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start fading in when element is 90% from the top of viewport
      // Fully visible when element is 45% from the top (slower fade)
      const startFade = windowHeight * 0.90;
      const endFade = windowHeight * 0.45;

      if (rect.top >= startFade) {
        setOpacity(0);
      } else if (rect.top <= endFade) {
        setOpacity(1);
      } else {
        // Linear interpolation between startFade and endFade
        const progress = (startFade - rect.top) / (startFade - endFade);
        setOpacity(Math.min(1, Math.max(0, progress)));
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity,
        transition: "opacity 0.3s ease-out",
      }}
    >
      {children}
    </div>
  );
}
