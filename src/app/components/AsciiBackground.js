"use client";

import { useEffect, useRef, useState } from 'react';

// Helper function for debouncing
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Optimized ASCII Background using Canvas
const AsciiBackground = ({ rows = 20 }) => {
  const canvasRef = useRef(null);
  const [viewportDimensions, setViewportDimensions] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const animationTimeRef = useRef(0);
  const animFrameRef = useRef(null);
  
  // First, set mounted state to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Track viewport dimensions with debounce
  useEffect(() => {
    if (!isMounted) return;
    
    const updateDimensions = debounce(() => {
      setViewportDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }, 100); // 100ms debounce for resize
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [isMounted]);
  
  // Use canvas for rendering instead of DOM elements
  useEffect(() => {
    if (!isMounted || !canvasRef.current || viewportDimensions.width === 0) return;
    
    // Canvas setup and animation - same as in main file
    // ...existing canvas animation code...
    
  }, [isMounted, viewportDimensions]);
  
  // Don't render anything on server
  if (!isMounted) {
    return null;
  }

  return (
    <canvas 
      ref={canvasRef} 
      className="ascii-bg"
      style={{ 
        width: '100%', 
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        opacity: 0.4,
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 100%)'
      }}
    />
  );
};

export default AsciiBackground;
