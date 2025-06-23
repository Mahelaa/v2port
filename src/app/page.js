"use client";

import { useEffect, useRef, useState, useCallback, useMemo, lazy, Suspense } from "react";
import dynamic from 'next/dynamic';

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

// Helper function for smooth scrolling with custom duration and easing
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (!element) return;
  
  // Get the element's position relative to the viewport
  const elementPosition = element.getBoundingClientRect().top;
  // Get the starting scroll position
  const startPosition = window.pageYOffset;
  // Calculate the distance to scroll
  const distance = elementPosition + startPosition;
  
  // Define animation parameters
  const duration = 1500; // Longer duration for slower animation (1.5 seconds)
  const startTime = performance.now();
  
  // Animation function
  const animateScroll = (currentTime) => {
    // Calculate elapsed time
    const timeElapsed = currentTime - startTime;
    
    // Calculate progress (0 to 1)
    const progress = Math.min(timeElapsed / duration, 1);
    
    // Apply easing function for smoother feel
    // This is a cubic easing function that starts slow, speeds up in the middle, and slows down at the end
    const easing = t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    const easedProgress = easing(progress);
    
    // Calculate the new scroll position
    const newScrollPosition = startPosition + (distance - startPosition) * easedProgress;
    
    // Set the new scroll position
    window.scrollTo(0, newScrollPosition);
    
    // Continue animation if not complete
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };
  
  // Start animation
  requestAnimationFrame(animateScroll);
};

// Retro Computer Navbar Component
const RetroNavbar = () => {
  // Initialize with null to avoid hydration mismatch
  const [currentTime, setCurrentTime] = useState(null);
  // Add mounted state to track client-side rendering
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Mark as mounted (client-side only)
    setIsMounted(true);
    
    // Set time only on client-side
    setCurrentTime(new Date());
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Only format date/time if available (client-side only)
  const formattedDate = "--/--/----";
  const formattedTime = "--:--:--";

  // Calculate formatted time only after mounting to avoid hydration mismatch
  const displayDate = isMounted && currentTime 
    ? currentTime.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : formattedDate;

  const displayTime = isMounted && currentTime
    ? currentTime.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : formattedTime;

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-sm z-10 bg-transparent">
      <div className="w-full py-2 px-2 flex items-center">
        <span className="font-mono text-green-500 pl-1 transition-colors duration-200 hover:text-green-400 text-sm">
          <span className="text-white">SHANE</span>
        </span>
        
        <div className="flex-1 flex justify-evenly">
          <a
            href="https://github.com/mahelaa"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-green-500 transition-colors duration-200 hover:text-green-300 text-sm"
          >
            <span>GITHUB↗</span>
          </a>

          <a
            href="https://linkedin.com/in/shanesa"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-green-500 transition-colors duration-200 hover:text-green-300 text-sm"
          >
            <span>LINKEDIN↗</span>
          </a>
          
          <a
            href="#contact"
            className="font-mono text-green-500 transition-colors duration-200 hover:text-green-300 text-sm"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
          >
            <span>CONTACT</span>
          </a>
          
          <span className="font-mono text-green-500 hidden sm:inline text-sm">
            {displayDate}
          </span>
        </div>

        <div className="font-mono text-green-500 pr-1 text-sm">
          <span>{displayTime}</span>
        </div>
      </div>
    </nav>
  );
};

// Full-width Banner Component
const Banner = () => {
  const [titleText, setTitleText] = useState("");
  const [subtitleText, setSubtitleText] = useState("");
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [glitchChar, setGlitchChar] = useState("");
  const [currentFontIndex, setCurrentFontIndex] = useState(0);
  const bannerRef = useRef(null);
  const animationFrameRef = useRef(null);
  
  // List of fonts to cycle through - added cursive fonts
  const fonts = [
    // Original monospace fonts
    'monospace',
    'VT323, monospace',
    'Press Start 2P, monospace',
    'Courier New, monospace',
    'Consolas, monospace',
    'Lucida Console, monospace',
    'OCR A Extended, monospace',
    'IBM Plex Mono, monospace',
    'Dancing Script, cursive',
    'Pacifico, cursive',
    'Great Vibes, cursive',
    'Allura, cursive',
    'Alex Brush, cursive',
    'Niconne, cursive',
    'Lobster, cursive'
  ];
  
  const fullTitleText = "SHANE ABEYSEKERA";
  const shaneText = "SHANE";
  const afterShaneText = " ABEYSEKERA";
  const fullSubtitleText = "<SOFTWARE_DEVELOPER />"; // Added missing declaration
  
  // Font cycling animation - increase interval for slower cycling
  const fontCycleInterval = useMemo(() => 300, []); // Increased from 100ms to 300ms for slower cycling
  
  useEffect(() => {
    // Only start font cycling when the full name is visible
    if (titleText === fullTitleText) {
      const fontInterval = setInterval(() => {
        setCurrentFontIndex(prevIndex => {
          // Get a random index that's different from the current one
          let newIndex;
          do {
            newIndex = Math.floor(Math.random() * fonts.length);
          } while (newIndex === prevIndex);
          return newIndex;
        });
      }, fontCycleInterval);
      
      return () => clearInterval(fontInterval);
    }
  }, [titleText, fullTitleText, fonts.length, fontCycleInterval]);
  
  // Effect for scroll-based animations - optimized with debounce
  useEffect(() => {
    const handleScroll = debounce(() => {
      if (!bannerRef.current) return;
      
      const rect = bannerRef.current.getBoundingClientRect();
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const bannerHeight = rect.height;
      
      // Calculate how far through the banner we've scrolled
      const scrollProgress = Math.min(
        1,
        Math.max(0, (windowHeight - rect.top) / (windowHeight + bannerHeight) * 2)
      );
      
      // Animate title
      const titleChars = Math.floor(scrollProgress * 2.5 * fullTitleText.length);
      setTitleText(fullTitleText.substring(0, Math.min(titleChars, fullTitleText.length)));
      
      // Animate subtitle (starts after title is 60% complete)
      if (scrollProgress > 0.4) {
        const subtitleProgress = (scrollProgress - 0.4) * 3; // Scale for faster appearance
        const subtitleChars = Math.floor(subtitleProgress * fullSubtitleText.length);
        setSubtitleText(fullSubtitleText.substring(0, Math.min(subtitleChars, fullSubtitleText.length)));
      }
      
      // Show skills after subtitle is done
      if (subtitleText === fullSubtitleText) {
        setSkillsVisible(true);
        
        // Show CTA button shortly after skills become visible
        setTimeout(() => {
          setCtaVisible(true);
        }, 600);
      }
      
      // Update glitch character
      if (titleText.length < fullTitleText.length || 
          subtitleText.length < fullSubtitleText.length) {
        const glitchChars = "!@#$%^&*()_+-=[]{}|;:,./<>?`~";
        const randomChar = glitchChars.charAt(Math.floor(Math.random() * glitchChars.length));
        setGlitchChar(randomChar);
      } else {
        setGlitchChar("");
      }
    }, 10); // 10ms debounce for smoother performance
    
    window.addEventListener('scroll', handleScroll);
    // Initial call to handle case when banner is already in view
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [titleText, subtitleText, fullTitleText, fullSubtitleText]);
  
  return (
    <div className="banner" ref={bannerRef}>
      <div className="banner__container">
        <h1 className="banner__title">
          <span className="banner__title-text">
            {/* Split into SHANE (animated) and ABEYSEKERA (static) */}
            {titleText.substring(0, Math.min(titleText.length, shaneText.length)) && (
              <span 
                className="banner__name-animated"
                style={{
                  fontFamily: fonts[currentFontIndex],
                  transition: 'font-family 0.5s ease-in-out', // Slowed down from 0.2s to 0.5s with smoother easing
                  marginRight: '0.8rem' // Add spacing after SHANE
                }}
              >
                {titleText.substring(0, Math.min(titleText.length, shaneText.length))}
              </span>
            )}
            
            {titleText.length > shaneText.length && (
              <span className="banner__name-static">
                {titleText.substring(shaneText.length)}
              </span>
            )}
            
            {titleText.length < fullTitleText.length && (
              <span className="banner__glitch">{glitchChar}</span>
            )}
          </span>
        </h1>
        <div className="banner__divider"></div>
        <p className="banner__subtitle">
          {subtitleText}
          {subtitleText.length < fullSubtitleText.length && titleText === fullTitleText && (
            <span className="banner__glitch">{glitchChar}</span>
          )}
        </p>
        <div className={`banner__skills ${skillsVisible ? 'banner__skills--visible' : ''}`}>
          <span className="banner__skill">&gt; Fullstack Development</span>
          <span className="banner__skill">&gt; Problem Solving</span>
          <span className="banner__skill">&gt; Creating Digital Experiences</span>
        </div>
        
        {/* CTA Buttons */}
        <div className={`banner__cta-container ${ctaVisible ? 'banner__cta-container--visible' : ''}`}>
          <a 
            href="#projects" 
            className="banner__cta-button"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }}
          >
            <span className="banner__cta-text">&gt; View Projects</span>
            <span className="banner__cta-arrow">↓</span>
          </a>
        </div>
      </div>
    </div>
  );
};

// TerminalTypewriter component with hydration fixes
const TerminalTypewriter = () => {
  const containerRef = useRef(null);
  const [displayText, setDisplayText] = useState("");
  const [glitchChar, setGlitchChar] = useState("");
  const [targetCharCount, setTargetCharCount] = useState(0);
  const [isTypingForward, setIsTypingForward] = useState(true);
  const animationRef = useRef(null);
  const prevLengthRef = useRef(0);
  const lastUpdateTimeRef = useRef(0);
  const typingSpeedRef = useRef(5); // Reduced from 100ms to 5ms for faster typing
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isClient, setIsClient] = useState(false); // New state to track client-side rendering

  const fullText = `> SYSTEM INITIALIZING...\n> LOADING RESOURCES\n> ESTABLISHING CONNECTION\n\nCONNECTION ESTABLISHED\n\nThis is a demonstration of a classic computer terminal effect that types text as you scroll down the page.\n\nThe characters appear one by one in sync with your scrolling, creating an interactive typing experience.\n\nThe glitchy symbols at the cursor simulate the imperfect rendering and noise of old CRT displays.\n\n> PROCESSING DATA\n> GENERATING CONTENT\n> RENDERING INTERFACE\n\nCONTENT LOADED SUCCESSFULLY`;

  // Mark when we're on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize with safe values that work on both server and client
  const [terminalDimensions, setTerminalDimensions] = useState({ 
    lineCount: 1, 
    maxLineLength: 1 
  });
  
  // Update dimensions only on client side
  useEffect(() => {
    if (isClient) {
      const lineCount = fullText.split('\n').length;
      const maxLineLength = Math.max(...fullText.split('\n').map(line => line.length));
      setTerminalDimensions({ lineCount, maxLineLength });
    }
  }, [fullText, isClient]);
  
  // Set terminal to fully rendered on load - client side only
  useEffect(() => {
    if (isClient && isInitialLoad) {
      // Set the target to the full text length immediately after mounting
      setTargetCharCount(fullText.length);
      setIsInitialLoad(false);
      
      // Use an ultra-fast typing speed for initial render
      typingSpeedRef.current = 10;
      
      // Reset typing speed after initial render is complete
      setTimeout(() => {
        typingSpeedRef.current = 50;
      }, fullText.length * 10 + 300);
    }
  }, [fullText.length, isInitialLoad, isClient]);

  // Smooth typing animation
  useEffect(() => {
    const animateTyping = (timestamp) => {
      // Control typing speed
      const timeSinceLastUpdate = timestamp - lastUpdateTimeRef.current;
      let shouldUpdateText = false;

      if (timeSinceLastUpdate >= typingSpeedRef.current) {
        shouldUpdateText = true;
        lastUpdateTimeRef.current = timestamp;
      }

      if (shouldUpdateText) {
        setDisplayText((prevText) => {
          // Calculate current length
          const currentLength = prevText.length;

          // Determine if we're typing forward or backward
          const isForward = currentLength < targetCharCount;
          const isBackward = currentLength > targetCharCount;

          // Update the typing direction state
          if (isForward && !isTypingForward) setIsTypingForward(true);
          if (isBackward && isTypingForward) setIsTypingForward(false);

          // Store current length for next frame
          prevLengthRef.current = currentLength;

          // If we need to add more characters
          if (isForward) {
            // Add one character at a time for smooth animation
            return fullText.substring(0, currentLength + 1);
          }

          // If we need to remove characters (scrolling back up)
          if (isBackward) {
            return fullText.substring(0, currentLength - 1);
          }

          return prevText;
        });
      }

      // Update glitch character ONLY when typing forward and not at the end
      if (
        isTypingForward &&
        displayText.length < targetCharCount &&
        targetCharCount < fullText.length
      ) {
        const glitchChars = "!@#$%^&*()_+-=[]{}|;:,./<>?`~";
        const randomChar = glitchChars.charAt(
          Math.floor(Math.random() * glitchChars.length)
        );
        setGlitchChar(randomChar);
      } else {
        setGlitchChar("");
      }

      // Continue animation if we haven't reached target
      if (displayText.length !== targetCharCount) {
        animationRef.current = requestAnimationFrame(animateTyping);
      }
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animateTyping);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetCharCount, fullText, displayText.length, isTypingForward]);

  // Handle scroll effect with debounce
  useEffect(() => {
    const handleScroll = debounce(() => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress relative to the element
      let scrollProgress = 0;

      // Element is below viewport
      if (elementTop >= windowHeight) {
        scrollProgress = 0;
      }
      // Element is above viewport
      else if (elementTop + elementHeight <= 0) {
        scrollProgress = 1;
      }
      // Element is partially or fully in viewport
      else {
        // Calculate progress based on how far element has moved through viewport
        scrollProgress =
          1 - (elementTop + elementHeight / 2) / (windowHeight + elementHeight / 2);
        scrollProgress = Math.max(0, Math.min(1, scrollProgress * 1.2)); // Slightly accelerate typing
      }

      // Set target character count based on scroll position
      const newTargetCount = Math.floor(scrollProgress * fullText.length);
      if (newTargetCount !== targetCharCount) {
        setTargetCharCount(newTargetCount);
      }
    }, 10);

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, [fullText.length, targetCharCount]);

  return (
    <div ref={containerRef} className="terminal">
      <div className="terminal__controls">
        <div className="terminal__control terminal__control--red"></div>
        <div className="terminal__control terminal__control--yellow"></div>
        <div className="terminal__control terminal__control--green"></div>
      </div>
      <pre className="terminal__content" 
           style={{
             minHeight: terminalDimensions ? `${terminalDimensions.lineCount * 1.5}em` : 'auto',
             position: 'relative'
           }}>
        {/* Invisible full text to establish container size - only on client */}
        {isClient && (
          <span className="terminal__hidden-text">{fullText}</span>
        )}
        
        {/* Visible typed text */}
        <span className="terminal__visible-text">{displayText}</span>
        
        <span className="terminal__glitch">
          {glitchChar}
        </span>
        
        {/* Only show cursor when typing is complete */}
        {displayText.length === targetCharCount && targetCharCount === fullText.length && (
          <span className="terminal__cursor"></span>
        )}
      </pre>
    </div>
  );
};

// Optimized ASCII Background with hydration fix
const AsciiBackground = ({ rows = 20, cols = 100 }) => {
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
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = viewportDimensions.width;
    canvas.height = viewportDimensions.height;
    
    // ASCII characters - using smaller set for better performance
    const ascii = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%&*()"; 
    
    // Create density adjusted to screen width
    const density = Math.max(50, Math.min(120, Math.floor(viewportDimensions.width / 20)));
    const gridRows = Math.floor(viewportDimensions.height / 20);
    
    // Character size
    const charSize = 12;
    
    // Animation function with requestAnimationFrame
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update animation time
      animationTimeRef.current += 0.05;
      
      // Draw ASCII characters
      ctx.font = `${charSize}px monospace`;
      ctx.fillStyle = '#d8d8d8';
      
      for (let i = 0; i < gridRows; i++) {
        for (let j = 0; j < density; j++) {
          // Increase chance of space for better performance
          if (Math.random() > 0.9) {
            const char = ascii[Math.floor(Math.random() * ascii.length)];
            
            // Position with some randomness
            const x = (j / density) * canvas.width;
            const y = i * charSize * 1.2;
            
            // Gradient opacity
            const gradientPos = j / density;
            const waveOffset = Math.sin((i * 0.1) + (j * 0.05) + animationTimeRef.current * 0.1) * 0.2;
            const opacity = Math.min(0.4, Math.max(0.05, (0.1 + (gradientPos * 0.3) + waveOffset) * 0.4));
            
            // Apply opacity
            ctx.globalAlpha = opacity;
            ctx.fillText(char, x, y);
          }
        }
      }
      
      // Continue animation
      animFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animFrameRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isMounted, viewportDimensions]);
  
  // Don't render anything during SSR - crucial for avoiding hydration mismatch
  if (typeof window === 'undefined' || !isMounted) {
    return null;
  }

  // Client-side only rendering
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

// Use dynamic import with ssr: false for components that should only render on client
const LazyProjectsShowcase = dynamic(() => import('./components/ProjectsShowcase'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center p-12">
      <span className="text-green-500">Loading projects...</span>
    </div>
  )
});

// Footer Component
const Footer = () => {
  const [year, setYear] = useState("----");
  const emailRef = useRef(null);
  const [arrowPosition, setArrowPosition] = useState({ top: 0 });
  
  useEffect(() => {
    setYear(new Date().getFullYear().toString());
    
    // Function to update arrow position based on email element
    const updateArrowPosition = () => {
      if (emailRef.current) {
        const emailRect = emailRef.current.getBoundingClientRect();
        const footerRect = emailRef.current.closest('footer').getBoundingClientRect();
        
        // Calculate position relative to the footer
        const top = emailRect.top - footerRect.top + emailRect.height / 2;
        
        setArrowPosition({ top });
      }
    };
    
    // Update position initially and on window resize
    updateArrowPosition();
    window.addEventListener('resize', updateArrowPosition);
    
    // Check position again after a delay to account for any layout shifts
    const positionTimer = setTimeout(updateArrowPosition, 500);
    
    return () => {
      window.removeEventListener('resize', updateArrowPosition);
      clearTimeout(positionTimer);
    };
  }, []);

  return (
    <footer className="footer bg-black/5 dark:bg-white/5" id="contact" style={{ 
      border: 'none',
      background: 'transparent',
      position: 'relative',
    }}>
      {/* Long arrow pointing to email */}
      <div className="arrow-container" style={{
        position: 'absolute',
        top: `${arrowPosition.top}px`,
        right: '0%', // Changed from 2% to 0% to move it all the way to the left
        width: '60%', // Extended from 45% to 60% to make it longer
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        zIndex: 5,
        pointerEvents: 'none',
      }}>
        <div className="arrow-line" style={{
          width: '100%',
          height: '2px',
          backgroundColor: 'rgba(74, 222, 128, 0.6)',
          position: 'relative',
        }}></div>
        <div className="arrow-head" style={{
          position: 'absolute',
          left: '0',
          width: '0',
          height: '0',
          borderTop: '8px solid transparent',
          borderBottom: '8px solid transparent',
          borderRight: '12px solid rgba(74, 222, 128, 0.8)',
          transform: 'translateX(-6px)',
        }}></div>
        <div className="arrow-text" style={{
          position: 'absolute',
          right: '15px', // Adjusted text position
          top: '-25px',
          color: 'rgba(74, 222, 128, 0.8)',
          fontFamily: 'monospace',
          fontSize: '14px',
          whiteSpace: 'nowrap', // Ensure text stays on one line
        }}>
        </div>
      </div>

      <div className="footer__container" style={{ 
        border: 'none',
        backgroundColor: 'transparent' // Keep container transparent to let the footer bg show
      }}>
        <h2 className="footer__title">&gt; Connect</h2>
        
        <div className="footer__content">
          <div className="footer__contact">
            <div className="footer__contact-item">
              <span className="footer__label">Based in:</span>
              <a className="footer__link">Toronto, Canada</a>
            </div>
            <div className="footer__contact-item" ref={emailRef}>
              <span className="footer__label">Email:</span>
              <a href="mailto:contact@shanes.me" target="_blank" rel="noopener noreferrer" className="footer__link" style={{
                position: 'relative',
                zIndex: 10, // Ensure the email link is above the arrow
                display: 'inline-block', // Make sure the positioning works properly
              }}>
                contact@shanes.me
                <span style={{
                  position: 'absolute',
                  bottom: '-2px',
                  left: '0',
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'rgba(74, 222, 128, 0.6)',
                  animation: 'pulse 2s infinite'
                }}></span>
              </a>
            </div>
          </div>
          
          <div className="footer__message">
            <span className="footer__terminal-line">&gt; echo "Thanks for visiting my portfolio!"</span>
          </div>
        </div>
        
        <div className="footer__copyright">
          <span>&copy; {year} Shane Abeysekera</span>
          <span className="footer__terminal-cursor"></span>
        </div>
      </div>
    </footer>
  );
};

// Main component
export default function Home() {
  const [mounted, setMounted] = useState(false);

  // Wait for client-side rendering before applying effects
  useEffect(() => {
    setMounted(true);
    
    // Preload critical fonts
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.href = 'https://fonts.googleapis.com/css2?family=VT323&display=swap';
    document.head.appendChild(link);
    
    // Set smooth scrolling at the document level
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black/5 dark:bg-white/5 relative">
      {/* Add ASCII background directly to the main component */}
      {mounted && <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AsciiBackground />
      </div>}
      
      <RetroNavbar />
      <Banner />
      <div className="p-8 flex items-center justify-center">
        <main className="w-full max-w-3xl">
          <TerminalTypewriter />
        </main>
      </div>
      
      {/* Only render on client-side */}
      {mounted && <LazyProjectsShowcase />}
      
      <Footer />
    </div>
  );
}
