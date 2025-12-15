import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, Zap, Terminal, Cpu, Radio } from 'lucide-react';

const NeonCyberpunkPortfolio = ({data = {}}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [glitchText, setGlitchText] = useState('DEVELOPER');
  const [scanLine, setScanLine] = useState(0);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const glitchChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()';
      const original = 'DEVELOPER';
      if (Math.random() > 0.95) {
        setGlitchText(original.split('').map(char => 
          Math.random() > 0.7 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
        ).join(''));
        setTimeout(() => setGlitchText(original), 100);
      }
    }, 200);

    const scanInterval = setInterval(() => {
      setScanLine(prev => (prev + 2) % 100);
    }, 50);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(scanInterval);
    };
  }, []);

  const scrollToSection = (section) => {
    setActiveSection(section);
    setMenuOpen(false);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Transform data with safe defaults
  const projects = (data?.projects || []).map((project, index) => ({
    title: project?.title || 'Untitled Project',
    description: project?.description || 'No description available',
    tech: project?.tech || [],
    highlights: project?.highlights || [],
    link: project?.link || '#',
    year: project?.year || new Date().getFullYear(),
    status: project?.status || 'LIVE'
  }));

  const skills = data?.skills ? Object.entries(data.skills) : [];
  const achievements = data?.achievements || [];

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-mono relative overflow-hidden">
      {/* Scanline Effect */}
      <div 
        className="fixed w-full h-1 bg-cyan-400 opacity-20 pointer-events-none z-50"
        style={{ 
          top: `${scanLine}%`,
          boxShadow: '0 0 10px #00ffff'
        }}
      />

      {/* Grid Background */}
      <div className="fixed inset-0 opacity-10" style={{
        backgroundImage: `
          linear-gradient(#00ffff 1px, transparent 1px),
          linear-gradient(90deg, #00ffff 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        perspective: '500px',
        transform: 'rotateX(60deg) translateZ(-100px)'
      }} />

      {/* Corner Decorations */}
      <div className="fixed top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-400 opacity-50" />
      <div className="fixed top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-magenta-500 opacity-50" />
      <div className="fixed bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-magenta-500 opacity-50" />
      <div className="fixed bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-cyan-400 opacity-50" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black bg-opacity-90 border-b-2 border-cyan-400" style={{
        boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
      }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Terminal className="w-8 h-8 text-magenta-500" style={{
                filter: 'drop-shadow(0 0 10px #ff00ff)'
              }} />
              <div>
                <div className="text-cyan-400 font-bold tracking-wider" style={{
                  textShadow: '0 0 10px #00ffff'
                }}>
                  CYBERDEV
                </div>
                <div className="text-xs text-magenta-500">v2.0.24</div>
              </div>
            </div>

            <div className="hidden md:flex gap-1">
              {['HOME', 'PROJECTS', 'SKILLS', 'CONTACT'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`px-6 py-2 text-sm font-bold tracking-wider transition-all duration-300 ${
                    activeSection === item.toLowerCase()
                      ? 'bg-cyan-400 text-black' 
                      : 'text-cyan-400 hover:bg-cyan-400 hover:bg-opacity-20'
                  }`}
                  style={{
                    clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
                    boxShadow: activeSection === item.toLowerCase() ? '0 0 20px rgba(0, 255, 255, 0.8)' : 'none'
                  }}
                >
                  {'>'} {item}
                </button>
              ))}
            </div>

            <button 
              className="md:hidden text-cyan-400"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden mt-4 space-y-2 border-t-2 border-cyan-400 pt-4">
              {['HOME', 'PROJECTS', 'SKILLS', 'CONTACT'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-4 py-3 text-cyan-400 hover:bg-cyan-400 hover:bg-opacity-20 transition-all duration-300"
                >
                  {'>'} {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-24 relative">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-8 flex justify-center items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" style={{
              boxShadow: '0 0 20px #00ff00'
            }} />
            <span className="text-green-400 text-sm tracking-widest font-bold">SYSTEM ONLINE</span>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" style={{
              boxShadow: '0 0 20px #00ff00'
            }} />
          </div>

          <div className="mb-8">
            <div className="text-magenta-500 text-sm mb-2 tracking-widest">{'<FULL-STACK>'}</div>
            <h1 className="text-4xl md:text-6xl font-black mb-4" style={{
              textShadow: '0 0 20px #00ffff, 0 0 40px #00ffff',
              color: '#00ffff'
            }}>
              {glitchText}
            </h1>
            <div className="text-magenta-500 text-sm tracking-widest">{'</FULL-STACK>'}</div>
          </div>

          <div className="mb-12 max-w-3xl mx-auto">
            <p className="text-lg text-gray-400 leading-relaxed border-l-4 border-cyan-400 pl-6">
              [INITIALIZING...] Building next-generation digital experiences through code, creativity, and cutting-edge technology. System ready for deployment.
            </p>
          </div>

          <div className="flex gap-4 justify-center mb-12 flex-wrap">
            {[
              { icon: Github, label: 'GITHUB' },
              { icon: Linkedin, label: 'LINKEDIN' },
              { icon: Mail, label: 'EMAIL' }
            ].map(({ icon: Icon, label }, index) => (
              <button
                key={index}
                className="group relative p-6 bg-black border-2 border-cyan-400 hover:bg-cyan-400 hover:bg-opacity-20 transition-all duration-300"
                style={{
                  clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)',
                  boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
                }}
              >
                <Icon className="w-8 h-8 text-cyan-400" />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {label}
                </span>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => scrollToSection('projects')}
              className="group px-10 py-4 bg-cyan-400 text-black font-bold text-lg hover:bg-magenta-500 transition-all duration-300 flex items-center justify-center gap-3"
              style={{
                clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.8)'
              }}
            >
              <Zap className="w-6 h-6" />
              ACCESS PROJECTS
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-10 py-4 border-2 border-magenta-500 text-magenta-500 font-bold text-lg hover:bg-magenta-500 hover:text-black transition-all duration-300"
              style={{
                clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
                boxShadow: '0 0 30px rgba(255, 0, 255, 0.5)'
              }}
            >
              CONNECT
            </button>
          </div>

          {/* Floating Icons */}
          <div className="absolute top-20 left-10 opacity-20">
            <Cpu className="w-16 h-16 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
          </div>
          <div className="absolute bottom-20 right-10 opacity-20">
            <Radio className="w-16 h-16 text-magenta-500 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 relative border-t-2 border-cyan-400">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-2 h-2 bg-magenta-500 animate-pulse" />
              <span className="text-magenta-500 text-sm tracking-widest font-bold">{'<SECTION ID="PROJECTS" />'}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-cyan-400 mb-4" style={{
              textShadow: '0 0 20px #00ffff'
            }}>
              PROJECT_DATABASE
            </h2>
            <div className="h-1 w-64 bg-gradient-to-r from-cyan-400 to-magenta-500" style={{
              boxShadow: '0 0 10px #00ffff'
            }} />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative bg-black border-2 border-cyan-400 p-6 hover:border-magenta-500 transition-all duration-300"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)',
                  boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
                }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-magenta-500 opacity-50" />
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-cyan-400 opacity-50" />

                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-magenta-500 flex items-center justify-center font-black text-black text-xl">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-bold">[{project.year}]</div>
                      <div className={`text-xs font-bold ${project.status === 'LIVE' ? 'text-green-400' : 'text-yellow-400'}`}>
                        STATUS: {project.status}
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-cyan-400 group-hover:text-magenta-500 transition-colors">
                  {'> '}{project.title}
                </h3>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {project.tech && project.tech.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-black border border-cyan-400 text-cyan-400 text-xs font-bold"
                      >
                        [{tech}]
                      </span>
                    ))}
                  </div>
                )}

                {project.highlights && project.highlights.length > 0 && (
                  <div className="flex gap-2">
                    {project.highlights.map((highlight, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-magenta-500 text-black text-xs font-bold"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                )}

                <div className="absolute bottom-6 right-6">
                  <Zap className="w-6 h-6 text-magenta-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 relative border-t-2 border-magenta-500">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-2 h-2 bg-cyan-400 animate-pulse" />
              <span className="text-cyan-400 text-sm tracking-widest font-bold">{'<SECTION ID="SKILLS" />'}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-magenta-500 mb-4" style={{
              textShadow: '0 0 20px #ff00ff'
            }}>
              TECH_STACK
            </h2>
            <div className="h-1 w-64 bg-gradient-to-r from-magenta-500 to-cyan-400" style={{
              boxShadow: '0 0 10px #ff00ff'
            }} />
          </div>

          {skills.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {skills.map(([category, items], index) => (
                <div 
                  key={category}
                  className="bg-black border-2 border-magenta-500 p-8"
                  style={{
                    clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)',
                    boxShadow: '0 0 20px rgba(255, 0, 255, 0.3)'
                  }}
                >
                  <h3 className="text-2xl font-bold mb-6 text-cyan-400">
                    {'<'}{category.toUpperCase()}{' />'}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {(items || []).map((skill, i) => (
                      <span 
                        key={i}
                        className="px-4 py-2 bg-black border border-cyan-400 text-cyan-400 text-sm font-bold hover:bg-cyan-400 hover:text-black transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {achievements.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className="bg-black border-2 border-cyan-400 p-8 text-center hover:border-magenta-500 transition-all duration-300"
                  style={{
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
                  }}
                >
                  <div className="text-5xl font-black mb-2 text-magenta-500" style={{
                    textShadow: '0 0 20px #ff00ff'
                  }}>
                    {achievement?.number || '0'}
                  </div>
                  <div className="text-xs text-cyan-400 font-bold tracking-wider">
                    {achievement?.label || 'Achievement'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 relative border-t-2 border-cyan-400 border-b-2">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-2 h-2 bg-magenta-500 animate-pulse" />
              <span className="text-magenta-500 text-sm tracking-widest font-bold">{'<SECTION ID="CONTACT" />'}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-cyan-400 mb-4" style={{
              textShadow: '0 0 20px #00ffff'
            }}>
              INITIALIZE_CONTACT
            </h2>
          </div>

          <div 
            className="bg-black border-2 border-cyan-400 p-8"
            style={{
              clipPath: 'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)',
              boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
            }}
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2 text-cyan-400">{'> NAME'}</label>
                <input
                  type="text"
                  placeholder="Enter your designation..."
                  className="w-full px-4 py-3 bg-black border-2 border-magenta-500 text-cyan-400 focus:outline-none focus:border-cyan-400 transition-colors duration-300 font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-cyan-400">{'> EMAIL'}</label>
                <input
                  type="email"
                  placeholder="your@email.protocol"
                  className="w-full px-4 py-3 bg-black border-2 border-magenta-500 text-cyan-400 focus:outline-none focus:border-cyan-400 transition-colors duration-300 font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-cyan-400">{'> MESSAGE'}</label>
                <textarea
                  placeholder="[TRANSMIT YOUR MESSAGE HERE...]"
                  rows="5"
                  className="w-full px-4 py-3 bg-black border-2 border-magenta-500 text-cyan-400 focus:outline-none focus:border-cyan-400 resize-none transition-colors duration-300 font-mono"
                />
              </div>
              <button 
                className="w-full py-4 bg-cyan-400 text-black font-bold text-lg hover:bg-magenta-500 transition-all duration-300 flex items-center justify-center gap-3"
                style={{
                  clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
                  boxShadow: '0 0 30px rgba(0, 255, 255, 0.8)'
                }}
              >
                <Zap className="w-6 h-6" />
                TRANSMIT_MESSAGE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-black border-t-2 border-magenta-500">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 font-bold">
            <span>{'</'}</span>
            <span className="text-cyan-400">© 2024 CYBERDEV_PORTFOLIO</span>
            <span>{'>'}</span>
          </div>
          <div className="text-xs text-magenta-500 mt-2">POWERED BY NEON & CODE</div>
        </div>
      </footer>
    </div>
  );
};

export default NeonCyberpunkPortfolio;