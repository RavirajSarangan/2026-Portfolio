"use client";

import React, { useEffect, useRef, useState } from "react";

interface ComponentLoaderProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  fallback?: React.ReactNode;
}

export default function ComponentLoader({
  children,
  threshold = 0.1,
  rootMargin = "100px",
  className = "",
  fallback = null,
}: ComponentLoaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div ref={containerRef} className={className}>
      {isVisible ? children : fallback}
    </div>
  );
}
