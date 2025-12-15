import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, Play, Pause, Volume2, ChevronRight, Star, Circle, Square, Triangle } from 'lucide-react';

const BrutalismPortfolio = ({data = {}, inPreview}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [time, setTime] = useState(new Date());
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (section) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const shapes = [Circle, Square, Triangle];
  const colors = ['bg-red-500', 'bg-blue-500', 'bg-yellow-400', 'bg-green-500'];

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
    <div className="min-h-screen bg-white text-black font-mono">
      {/* Floating Shapes Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(15)].map((_, i) => {
          const Shape = shapes[i % shapes.length];
          return (
            <div
              key={i}
              className={`absolute ${colors[i % colors.length]} opacity-20`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${50 + Math.random() * 100}px`,
                height: `${50 + Math.random() * 100}px`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animation: `float ${10 + Math.random() * 20}s ease-in-out infinite`
              }}
            >
              <Shape className="w-full h-full" fill="currentColor" />
            </div>
          );
        })}
      </div>

      {/* Brutal Navigation */}
      <nav className="relative z-50 bg-black text-white border-b-8 border-black sticky top-0">
        <div className="max-w-4xl mx-auto px-3 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-yellow-400 border-4 border-black flex items-center justify-center transform -rotate-3">
                <span className="text-2xl font-black text-black">DEV</span>
              </div>
              <div>
                <div className="text-2xl font-black">PORTFOLIO</div>
                <div className="text-xs text-yellow-400 flex items-center gap-2">
                  {isPlaying ? <Volume2 className="w-3 h-3 animate-pulse" /> : <Pause className="w-3 h-3" />}
                  {time.toLocaleTimeString()}
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex gap-2">
              {['HOME', 'PROJECTS', 'SKILLS', 'CONTACT'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`px-6 py-3 font-black border-4 border-black transition-all duration-200 hover:translate-x-1 hover:translate-y-1 ${
                    activeSection === item.toLowerCase()
                      ? 'bg-yellow-400 text-black shadow-none' 
                      : 'bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button 
              className="md:hidden p-3 bg-red-500 border-4 border-black"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden mt-4 space-y-2">
              {['HOME', 'PROJECTS', 'SKILLS', 'CONTACT'].map(item => (
                <button
                  key={item}
                  onClick={() => {
                    scrollToSection(item.toLowerCase());
                    setMenuOpen(false);
                  }}
                  className={`block w-full text-left px-6 py-4 font-black border-4 border-black ${
                    activeSection === item.toLowerCase() ? 'bg-yellow-400' : 'bg-white text-black'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Status Bar */}
          <div className="mb-12 flex justify-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-400 border-4 border-black transform -rotate-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-black" />
              <span className="text-sm font-black">AVAILABLE FOR HIRE</span>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-5xl md:text-5xl font-black mb-8 leading-none">
              <span className="block transform hover:-rotate-2 transition-transform inline-block">FULL</span>
              <span className="block transform hover:rotate-2 transition-transform inline-block">STACK</span>
              <span className="block text-transparent bg-clip-text" style={{
                backgroundImage: 'repeating-linear-gradient(45deg, #000 0px, #000 10px, #FACC15 10px, #FACC15 20px)'
              }}>
                DEVELOPER
              </span>
            </h1>
            
            <div className="mb-12 max-w-3xl mx-auto">
              <p className="text-2xl md:text-3xl font-bold leading-tight bg-black text-white p-6 border-4 border-black transform rotate-1">
                BUILDING DIGITAL EXPERIENCES THAT BREAK THE RULES AND MAKE AN IMPACT
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center mb-12 flex-wrap">
              {[
                { icon: Github, bg: 'bg-blue-500', label: 'GITHUB' },
                { icon: Linkedin, bg: 'bg-red-500', label: 'LINKEDIN' },
                { icon: Mail, bg: 'bg-yellow-400', label: 'EMAIL' }
              ].map(({ icon: Icon, bg, label }, index) => (
                <button
                  key={index}
                  className={`group relative p-6 ${bg} border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200`}
                >
                  <Icon className="w-8 h-8" />
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 text-xs font-black opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border-2 border-black">
                    {label}
                  </span>
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('projects')}
                className="group px-8 py-5 bg-yellow-400 border-4 border-black font-black text-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all duration-200 flex items-center justify-center gap-2"
              >
                VIEW WORK
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-5 bg-white border-4 border-black font-black text-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all duration-200">
                HIRE ME
              </button>
            </div>
          </div>

          {/* Decorative Text */}
          <div className="absolute -left-20 top-1/2 transform -rotate-90 text-9xl font-black text-gray-200 opacity-50 hidden xl:block">
            CODE
          </div>
          <div className="absolute -right-20 top-1/2 transform rotate-90 text-9xl font-black text-gray-200 opacity-50 hidden xl:block">
            DESIGN
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-20 px-4 bg-yellow-400 border-y-8 border-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="inline-block px-6 py-3 bg-black text-white border-4 border-black font-black text-sm mb-6 transform -rotate-1">
              SELECTED WORKS
            </div>
            <h2 className="text-4xl md:text-8xl font-black mb-4">
              PROJECTS
            </h2>
            <div className="w-32 h-2 bg-black" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all duration-200"
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-black text-white border-4 border-black flex items-center justify-center font-black text-xl">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <div className="text-xs font-black">{project.year}</div>
                        <div className={`text-xs font-black ${project.status === 'LIVE' ? 'text-green-600' : 'text-orange-600'}`}>
                          [{project.status}]
                        </div>
                      </div>
                    </div>
                    <Star className="w-6 h-6" />
                  </div>

                  <h3 className="text-3xl font-black mb-4 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm font-bold mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {project.tech && project.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 bg-black text-white text-xs font-black border-2 border-black"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {project.highlights && project.highlights.length > 0 && (
                    <div className="flex gap-2 mb-6">
                      {project.highlights.map((highlight, i) => (
                        <span 
                          key={i}
                          className={`px-3 py-1 ${i % 2 === 0 ? 'bg-red-500' : 'bg-blue-500'} text-white text-xs font-black border-2 border-black`}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  )}

                  <button className="w-full py-4 bg-black text-white font-black border-4 border-black hover:bg-yellow-400 hover:text-black transition-colors duration-200 flex items-center justify-center gap-2">
                    VIEW PROJECT
                    <Play className="w-4 h-4" />
                  </button>
                </div>

                {/* Decorative Corner */}
                <div className={`absolute -top-3 -right-3 w-12 h-12 ${colors[index % colors.length]} border-4 border-black`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-20 px-6 bg-red-500">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="inline-block px-6 py-3 bg-white text-black border-4 border-black font-black text-sm mb-6 transform rotate-1">
              TECHNICAL STACK
            </div>
            <h2 className="text-6xl md:text-8xl font-black mb-4 text-white">
              SKILLS
            </h2>
            <div className="w-32 h-2 bg-white" />
          </div>

          {skills.length > 0 && (
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {skills.map(([category, items], index) => (
                <div 
                  key={category}
                  className={`${colors[index % colors.length]} border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}
                >
                  <h3 className="text-3xl font-black mb-6">{category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {(items || []).map((skill, i) => (
                      <span 
                        key={i}
                        className="px-4 py-2 bg-white border-4 border-black text-black font-black text-sm hover:bg-black hover:text-white transition-colors duration-200 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Achievements */}
          {achievements.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className="bg-white border-4 border-black p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all duration-200"
                >
                  <div className="text-5xl font-black mb-2">
                    {achievement?.number || '0'}
                  </div>
                  <div className="text-sm font-black">
                    {achievement?.label || 'Achievement'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-6 bg-blue-500">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 text-center">
            <div className="inline-block px-6 py-3 bg-yellow-400 text-black border-4 border-black font-black text-sm mb-6 transform -rotate-2">
              LET'S TALK
            </div>
            <h2 className="text-6xl md:text-8xl font-black mb-4 text-white">
              CONTACT
            </h2>
          </div>

          <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-black mb-2">YOUR NAME</label>
                <input
                  type="text"
                  placeholder="JOHN DOE"
                  className="w-full px-4 py-3 bg-yellow-100 border-4 border-black focus:outline-none focus:bg-yellow-200 font-bold placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-black mb-2">YOUR EMAIL</label>
                <input
                  type="email"
                  placeholder="HELLO@EMAIL.COM"
                  className="w-full px-4 py-3 bg-yellow-100 border-4 border-black focus:outline-none focus:bg-yellow-200 font-bold placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-black mb-2">YOUR MESSAGE</label>
                <textarea
                  placeholder="LET'S BUILD SOMETHING AMAZING..."
                  rows="5"
                  className="w-full px-4 py-3 bg-yellow-100 border-4 border-black focus:outline-none focus:bg-yellow-200 font-bold placeholder-gray-500 resize-none"
                />
              </div>
              <button className="w-full py-4 bg-yellow-400 border-4 border-black font-black text-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
                SEND MESSAGE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black text-white border-t-8 border-black py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm font-black">
              © 2024 PORTFOLIO - ALL RIGHTS RESERVED
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-400 animate-pulse" />
              <span className="text-sm font-black">MADE WITH BRUTALISM & LOVE</span>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
      `}</style>
    </div>
  );
};

export default BrutalismPortfolio;