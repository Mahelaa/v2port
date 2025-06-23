"use client";

import { useRef } from 'react';

// Extracted Projects Showcase Component
const ProjectsShowcase = () => {
  const containerRef = useRef(null);

  return (
    <section 
      className="projects-showcase" 
      id="projects" 
      ref={containerRef}
      style={{ 
        position: 'relative',
        marginTop: '-5rem',
        paddingTop: '5rem',
      }}
    >
      {/* Content Container */}
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
          {/* Project Cards */}
          <div className="projects-showcase__card">
            <div className="projects-showcase__card-content">
              <h3 className="projects-showcase__card-title">&gt; Project Alpha</h3>
              <p className="projects-showcase__card-desc">
                A full-stack application built with Next.js and Node.js
              </p>
              <div className="projects-showcase__card-tags">
                <span className="projects-showcase__tag">Next.js</span>
                <span className="projects-showcase__tag">React</span>
                <span className="projects-showcase__tag">Node.js</span>
              </div>
            </div>
          </div>
          
          <div className="projects-showcase__card">
            <div className="projects-showcase__card-content">
              <h3 className="projects-showcase__card-title">&gt; Project Beta</h3>
              <p className="projects-showcase__card-desc">
                Real-time data visualization dashboard
              </p>
              <div className="projects-showcase__card-tags">
                <span className="projects-showcase__tag">D3.js</span>
                <span className="projects-showcase__tag">TypeScript</span>
                <span className="projects-showcase__tag">WebSockets</span>
              </div>
            </div>
          </div>
          
          <div className="projects-showcase__card">
            <div className="projects-showcase__card-content">
              <h3 className="projects-showcase__card-title">&gt; Project Gamma</h3>
              <p className="projects-showcase__card-desc">
                AI-powered recommendation engine
              </p>
              <div className="projects-showcase__card-tags">
                <span className="projects-showcase__tag">Python</span>
                <span className="projects-showcase__tag">TensorFlow</span>
                <span className="projects-showcase__tag">Flask</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;