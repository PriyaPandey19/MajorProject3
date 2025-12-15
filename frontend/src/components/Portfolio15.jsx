import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Folder, FileCode, Globe, Database, Server, ChevronRight } from 'lucide-react';

const Portfolio3D = ({ data = {} }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [terminalText, setTerminalText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const cubeRef = useRef(null);

  const sections = ['home', 'about', 'skills', 'projects', 'contact'];
  const fullText = '> Welcome to my portfolio_';

  // Safe data extraction with defaults
  const skills = data?.skills || {};
  const projects = Array.isArray(data?.projects) ? data.projects : [];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTerminalText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, []);

  useEffect(() => {
    let rafId;
    let rotation = 0;

    const animate = () => {
      if (cubeRef.current) {
        rotation += 0.005;
        cubeRef.current.style.transform = `rotateX(${rotation}rad) rotateY(${rotation}rad)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleScroll = (index) => {
    setCurrentSection(index);
    const element = document.getElementById(sections[index]);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-mono">
      {/* Terminal Navigation */}
      <nav className="sticky top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-cyan-500/30">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span className="text-sm">user@portfolio:~$</span>
          </div>
          <div className="hidden md:flex gap-6">
            {sections.map((section, index) => (
              <button
                key={section}
                onClick={() => handleScroll(index)}
                className={`text-sm hover:text-cyan-300 transition-colors ${
                  currentSection === index ? 'text-cyan-300 underline' : ''
                }`}
              >
                ./{section}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="mb-8 p-6 bg-gray-900/50 border border-cyan-500/30 rounded-lg backdrop-blur-sm">
            <div className="text-xl md:text-2xl">
              {terminalText}
              {showCursor && <span className="animate-pulse">█</span>}
            </div>
          </div>

          <div className="perspective-1000 mb-12">
            <div ref={cubeRef} className="w-40 h-40 mx-auto relative preserve-3d" style={{ transformStyle: 'preserve-3d' }}>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-40 h-40 border-2 border-cyan-500/50 bg-cyan-500/10"
                  style={{
                    transform: `rotateY(${i * 90}deg) translateZ(70px)`,
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <Terminal className="w-12 h-12" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h1 className="text-4xl md:text-4xl font-bold mb-6 text-center text-white">
            {'<'} Full Stack Developer {'/>'}
          </h1>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center px-6 py-20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white mb-8">skills.json</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.keys(skills).length > 0 ? (
              Object.entries(skills).map(([category, items], i) => (
                <div key={i} className="p-6 bg-gray-900/50 border border-cyan-500/30 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">{category}</h3>
                  <div className="space-y-2">
                    {Array.isArray(items) && items.map((item, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm">
                        <span className="text-cyan-500">▸</span>
                        <span className="text-gray-400">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 py-12">
                No skills data available
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center px-6 py-20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white mb-8">projects/</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.length > 0 ? (
              projects.map((project, i) => (
                <div key={i} className="p-6 bg-gray-900/50 border border-cyan-500/30 rounded-lg">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Array.isArray(project.tech) && project.tech.map((tech, j) => (
                      <span key={j} className="px-3 py-1 text-xs bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Array.isArray(project.highlights) && project.highlights.map((h, k) => (
                      <span key={k} className="px-3 py-1 text-xs bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 py-12">
                No projects data available
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio3D;