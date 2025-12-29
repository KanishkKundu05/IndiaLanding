"use client";

import React, { useEffect, useRef, useState } from "react";

interface RevealLineProps {
  children: React.ReactNode;
  progress: number;
  delay?: number;
}

function RevealLine({ children, progress, delay = 0 }: RevealLineProps) {
  // Apply delay by adjusting the progress for this line
  const adjustedProgress = Math.max(0, Math.min(1, (progress - delay) / (1 - delay)));

  // Text starts 100% below (fully hidden) and slides up to 0% (fully visible)
  const translateY = 100 * (1 - adjustedProgress);

  return (
    <div style={{ overflow: "hidden" }}>
      <div
        style={{
          transform: `translateY(${translateY}%)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  );
}

interface ScrollSlideUpProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollSlideUp({ children, className = "" }: ScrollSlideUpProps) {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start animation earlier - when element enters viewport
      // Complete around when divider reaches 100% opacity (0.45)
      const startTrigger = windowHeight * 1.2;
      const endTrigger = windowHeight * 0.45;

      if (rect.top >= startTrigger) {
        setProgress(0);
      } else if (rect.top <= endTrigger) {
        setProgress(1);
      } else {
        const scrollProgress = (startTrigger - rect.top) / (startTrigger - endTrigger);
        setProgress(Math.min(1, Math.max(0, scrollProgress)));
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Wrap each child with RevealLine, staggering the reveal
  const childArray = React.Children.toArray(children);
  const delayIncrement = 0.15; // Stagger each line by 15% of the animation

  return (
    <div ref={ref} className={className}>
      {childArray.map((child, index) => (
        <RevealLine key={index} progress={progress} delay={index * delayIncrement}>
          {child}
        </RevealLine>
      ))}
    </div>
  );
}
