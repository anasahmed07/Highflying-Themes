"use client";
import React, { useRef, useEffect } from "react";

interface ThemeCardGroupProps {
  children?: React.ReactNode;
  className?: string;
}

export default function ThemeCardGroup({ children, className = "" }: ThemeCardGroupProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      // If vertical scroll is greater, let the page scroll
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        // Allow page to scroll
        return;
      }
      // Otherwise, scroll horizontally
      if (el.scrollWidth > el.clientWidth) {
        e.preventDefault();
        el.scrollLeft += e.deltaY + e.deltaX;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section className={`overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 whitespace-nowrap overflow-x-auto hide-scrollbar"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {children}
        </div>
        <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
} 