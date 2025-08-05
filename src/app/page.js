"use client";

import { useEffect, useRef, useState } from "react";

// Retro Computer Navbar Component
const RetroNavbar = () => {
  // Initialize with null to avoid hydration mismatch
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    // Set time only on client-side
    setCurrentTime(new Date());
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Only format date/time if available (client-side only)
  const formattedDate = currentTime 
    ? currentTime.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "--/--/----";

  const formattedTime = currentTime
    ? currentTime.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "--:--:--";

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-sm z-10 bg-transparent">
      <div className="w-full py-2 px-2 flex items-center">
        <span className="font-mono text-green-500 pl-1 transition-colors duration-200 hover:text-green-400">
          <span className="text-white">SHANE</span>
        </span>
        
        <div className="flex-1 flex justify-evenly">
          <a
            href="https://github.com/mahelaa"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-green-500 transition-colors duration-200 hover:text-green-300"
          >
            <span>GITHUB↗</span>
          </a>

          <a
            href="https://linkedin.com/in/shanesa"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-green-500 transition-colors duration-200 hover:text-green-300"
          >
            <span>LINKEDIN↗</span>
          </a>
          
          <span className="font-mono text-green-500 hidden sm:inline">
            {formattedDate}
          </span>
        </div>

        <div className="font-mono text-green-500 pr-1">
          <span>{formattedTime}</span>
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
  
  // List of fonts to cycle through
  const fonts = [
    'monospace',
    'VT323, monospace',
    'Press Start 2P, monospace',
    'Courier New, monospace',
    'Consolas, monospace',
    'Lucida Console, monospace',
    'OCR A Extended, monospace',
    'IBM Plex Mono, monospace'
  ];
  
  const fullTitleText = "SHANE ABEYSEKERA";
  const shaneText = "SHANE";
  const afterShaneText = " ABEYSEKERA";
  const fullSubtitleText = "<SOFTWARE_DEVELOPER />"; // Added missing declaration
  
  // Font cycling animation - much faster cycling
  useEffect(() => {
    // Only start font cycling when the full name is visible
    if (titleText === fullTitleText) {
      const fontInterval = setInterval(() => {
        setCurrentFontIndex(prevIndex => (prevIndex + 1) % fonts.length);
      }, 100); // Ultra fast cycling (100ms instead of 300ms)
      
      return () => clearInterval(fontInterval);
    }
  }, [titleText, fullTitleText, fonts.length]);
  
  // Effect for scroll-based animations
  useEffect(() => {
    const handleScroll = () => {
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
    };
    
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
                  transition: 'font-family 0.01s linear', // Faster transition (was 0.2s ease)
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
          <a href="#projects" className="banner__cta-button">
            <span className="banner__cta-text">&gt; View Projects</span>
            <span className="banner__cta-arrow">↓</span>
          </a>
          <a href="mailto:contact@shanes.me" className="banner__cta-button banner__cta-button--email">
            <span className="banner__cta-text">&gt; Email Me</span>
            <span className="banner__cta-arrow">@</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const TerminalTypewriter = () => {
  const containerRef = useRef(null);
  const [displayText, setDisplayText] = useState("");
  const [glitchChar, setGlitchChar] = useState("");
  const [targetCharCount, setTargetCharCount] = useState(0);
  const [isTypingForward, setIsTypingForward] = useState(true);
  const animationRef = useRef(null);
  const prevLengthRef = useRef(0);
  const lastUpdateTimeRef = useRef(0);
  const typingSpeedRef = useRef(100); // Time in ms between character updates - higher = slower

  const fullText = `> SYSTEM INITIALIZING...\n> LOADING RESOURCES\n> ESTABLISHING CONNECTION\n\nCONNECTION ESTABLISHED\n\nThis is a demonstration of a classic computer terminal effect that types text as you scroll down the page.\n\nThe characters appear one by one in sync with your scrolling, creating an interactive typing experience.\n\nThe glitchy symbols at the cursor simulate the imperfect rendering and noise of old CRT displays.\n\n> PROCESSING DATA\n> GENERATING CONTENT\n> RENDERING INTERFACE\n\nCONTENT LOADED SUCCESSFULLY`;

  // Client-side only calculations to avoid hydration mismatch
  const [terminalDimensions, setTerminalDimensions] = useState({ 
    lineCount: 1, 
    maxLineLength: 1 
  });
  
  // Move calculations to useEffect to run only client-side
  useEffect(() => {
    const lineCount = fullText.split('\n').length;
    const maxLineLength = Math.max(...fullText.split('\n').map(line => line.length));
    setTerminalDimensions({ lineCount, maxLineLength });
  }, [fullText]);

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

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
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
    };

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
        {typeof window !== 'undefined' && (
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

// ASCII Background Component - with improved responsiveness
const AsciiBackground = ({ rows = 30, cols = 200 }) => {
  const [asciiGrid, setAsciiGrid] = useState([]);
  const [viewportDimensions, setViewportDimensions] = useState({ width: 0, height: 0 });
  
  // Track viewport dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setViewportDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    // Set initial dimensions
    updateDimensions();
    
    // Update on resize
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // Generate and update ASCII grid
  useEffect(() => {
    // Only generate grid on client and when viewport dimensions are known
    if (viewportDimensions.width === 0) return;
    
    // Adjust columns based on viewport width for consistent density
    const dynamicCols = Math.max(300, Math.floor(viewportDimensions.width / 8)); 
    
    // ASCII characters to use - only standard ASCII, no special characters
    const ascii = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%&*()_+-=/\\|[]{}~.<>?!";
    
    // Create initial grid - adjusting for full width
    const createGrid = () => {
      const grid = [];
      
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < dynamicCols; j++) {
          // Higher chance of space for better readability
          const char = Math.random() > 0.85 
            ? ascii[Math.floor(Math.random() * ascii.length)] 
            : ' ';
          
          // Calculate gradient position (0.0 to 1.0)
          const gradientPos = j / dynamicCols;
          
          // Store character and its gradient value
          row.push({
            char,
            opacity: getGradientOpacity(gradientPos, i)
          });
        }
        grid.push(row);
      }
      
      return grid;
    };
    
    // Helper function for gradient effect
    const getGradientOpacity = (position, row) => {
      // Create a wave-like pattern that varies with row
      const waveOffset = Math.sin(row * 0.2) * 0.2;
      
      // Different gradient patterns
      const pattern = Math.floor(row / 10) % 3;
      
      if (pattern === 0) {
        // Left to right fade - increase base opacity
        return 0.15 + (position * 0.3) + waveOffset;
      } else if (pattern === 1) {
        // Center focus - increase peak opacity
        return 0.15 + (0.4 - Math.abs(position - 0.5) * 0.5) + waveOffset;
      } else {
        // Right to left fade - increase base opacity
        return 0.15 + ((1 - position) * 0.3) + waveOffset;
      }
    };
    
    // Initialize or regenerate grid when dimensions change
    setAsciiGrid(createGrid());
    
    // Glitch effect - randomly change characters
    const glitchInterval = setInterval(() => {
      setAsciiGrid(prevGrid => {
        // Create a copy of the grid
        const newGrid = [...prevGrid.map(row => [...row])];
        
        // Change random characters
        const numChanges = Math.floor(Math.random() * 30) + 15;
        
        for (let i = 0; i < numChanges; i++) {
          const row = Math.floor(Math.random() * newGrid.length);
          const col = Math.floor(Math.random() * newGrid[0].length);
          
          // 50% chance to just use a space to create more "noise"
          const char = Math.random() > 0.5 
            ? ascii[Math.floor(Math.random() * ascii.length)] 
            : ' ';
          
          // Preserve the opacity value of the original character
          const opacity = newGrid[row][col].opacity;
          newGrid[row][col] = { char, opacity };
        }
        
        return newGrid;
      });
    }, 150);  // Update every 150ms
    
    return () => clearInterval(glitchInterval);
  }, [asciiGrid.length, rows, viewportDimensions]);

  return (
    <div className="ascii-bg" style={{ 
      width: '100vw', 
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      zIndex: 0,
      opacity: 0.5 // Lower the overall opacity of the entire ASCII container
    }}>
      {asciiGrid.map((row, i) => (
        <div key={i} className="ascii-bg__row">
          {row.map((item, j) => {
            // Use much lower opacity values for a more subtle effect
            const opacity = Math.min(0.6, Math.max(0.05, item.opacity * 0.6));
            
            return (
              <span 
                key={`${i}-${j}`} 
                className="ascii-bg__char"
                style={{
                  opacity: opacity,
                  color: '#c0c0c0', // Lighter grey color
                  fontSize: '8px', // Smaller font size makes it less intrusive
                }}
              >
                {item.char}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// New Projects Showcase Component
const ProjectsShowcase = () => {
  return (
    <section className="projects-showcase" id="projects" style={{ position: 'relative' }}>
      <div className="projects-showcase__ascii-container" style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%', 
        height: '100%',
        overflow: 'hidden',
        zIndex: 1
      }}>
        <AsciiBackground rows={40} />
      </div>
      
      <div className="projects-showcase__container" style={{ 
        position: 'relative',
        zIndex: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        backdropFilter: 'blur(1px)',
        padding: '2rem',
        borderRadius: '0.5rem',
      }}>
        <h2 className="projects-showcase__title">Featured Projects</h2>
        <div className="projects-showcase__grid">
          <a href="https://github.com/mahelaa/spotify-track-clustering" target="_blank" rel="noopener noreferrer" 
             className="projects-showcase__card">
            <div className="projects-showcase__card-content">
              <h3 className="projects-showcase__card-title">&gt; Spotify Track Clustering</h3>
              <p className="projects-showcase__card-desc">
                ML-powered application that clusters Spotify tracks based on audio features using K-means clustering
              </p>
              <div className="projects-showcase__card-tags">
                <span className="projects-showcase__tag">Python</span>
                <span className="projects-showcase__tag">Scikit-learn</span>
                <span className="projects-showcase__tag">Spotify API</span>
              </div>
            </div>
          </a>
          
          <a href="https://github.com/mahelaa/Design-Patterns-Space-Invaders" target="_blank" rel="noopener noreferrer" 
             className="projects-showcase__card">
            <div className="projects-showcase__card-content">
              <h3 className="projects-showcase__card-title">&gt; Space Invaders</h3>
              <p className="projects-showcase__card-desc">
                Java implementation of Space Invaders showcasing various design patterns
              </p>
              <div className="projects-showcase__card-tags">
                <span className="projects-showcase__tag">Java</span>
                <span className="projects-showcase__tag">Design Patterns</span>
                <span className="projects-showcase__tag">OOP</span>
              </div>
            </div>
          </a>
          
          <a href="https://github.com/mahelaa/INFO2300-Final-Project" target="_blank" rel="noopener noreferrer" 
             className="projects-showcase__card">
            <div className="projects-showcase__card-content">
              <h3 className="projects-showcase__card-title">&gt; Ithaca Music Scene</h3>
              <p className="projects-showcase__card-desc">
                Dynamic web platform for Ithaca's music community to discover and share local events
              </p>
              <div className="projects-showcase__card-tags">
                <span className="projects-showcase__tag">PHP</span>
                <span className="projects-showcase__tag">MySQL</span>
                <span className="projects-showcase__tag">JavaScript</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer" id="contact">
      <div className="footer__container">
        <h2 className="footer__title">&gt; Connect</h2>
        
        <div className="footer__content">
          <div className="footer__contact">
            <div className="footer__contact-item">
              <span className="footer__label">Based in:</span>
              <a className="footer__link">Toronto, Canada</a>
            </div>
            <div className="footer__contact-item">
              <span className="footer__label">GitHub:</span>
              <a href="https://github.com/mahelaa" target="_blank" rel="noopener noreferrer" className="footer__link">github.com/mahelaa</a>
            </div>
            <div className="footer__contact-item">
              <span className="footer__label">LinkedIn:</span>
              <a href="https://linkedin.com/in/shanesa" target="_blank" rel="noopener noreferrer" className="footer__link">linkedin.com/in/shanesa</a>
            </div>
          </div>
          
          <div className="footer__message">
            <span className="footer__terminal-line">&gt; echo "Thanks for visiting my portfolio!"</span>
            <p className="footer__description">
              I'm passionate about creating efficient, user-friendly solutions. 
              Let's collaborate on your next project.
            </p>
          </div>
        </div>
        
        <div className="footer__copyright">
          <span>&copy; {currentYear} Shane Abeysekera</span>
          <span className="footer__terminal-cursor"></span>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black/5 dark:bg-white/5">
      <RetroNavbar />
      <Banner />
      <div className="p-8 flex items-center justify-center">
        <main className="w-full max-w-3xl">
          <TerminalTypewriter />
        </main>
      </div>
      <ProjectsShowcase />
      <Footer />
    </div>
  );
}
