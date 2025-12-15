import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, ChevronRight, Star, Zap, Sparkles } from 'lucide-react';
//import { portfolioData } from './portfolioData';

const Portfolio3D = ({data = {}}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Using the portfolioData from your file with safe defaults
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const skills = data?.skills || {};
  const achievements = Array.isArray(data?.achievements) ? data.achievements : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900 to-slate-900"></div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/80 backdrop-blur-md border-b border-slate-700' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Portfolio
            </span>
          </div>
          
          <div className="hidden md:flex gap-8">
            {['Home', 'Projects', 'Skills', 'Contact'].map(item => (
              <button
                key={item}
                onClick={() => setActiveSection(item.toLowerCase())}
                className={`relative px-4 py-2 font-medium transition-all duration-300 hover:text-cyan-400 ${
                  activeSection === item.toLowerCase() ? 'text-cyan-400' : 'text-slate-300'
                }`}
              >
                {item}
                {activeSection === item.toLowerCase() && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400"></div>
                )}
              </button>
            ))}
          </div>

          <button 
            className="md:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-700">
            {['Home', 'Projects', 'Skills', 'Contact'].map(item => (
              <button
                key={item}
                onClick={() => {
                  setActiveSection(item.toLowerCase());
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-6 py-4 hover:bg-slate-800 transition-colors border-b border-slate-700 last:border-b-0"
              >
                <span className={`text-lg font-medium ${
                  activeSection === item.toLowerCase() ? 'text-cyan-400' : 'text-slate-300'
                }`}>
                  {item}
                </span>
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Animated Avatar */}
          <div className="relative mb-8">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 p-1 animate-spin-slow">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-400/20 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-2 -right-2">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-800 rounded-full animate-ping"></div>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Full Stack
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent animate-gradient delay-1000">
              Developer
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Crafting digital experiences with modern technologies and innovative solutions
          </p>

          {/* Social Links */}
          <div className="flex gap-4 justify-center mb-12">
            {[
              { icon: Github, href: "#", color: "hover:text-cyan-400" },
              { icon: Linkedin, href: "#", color: "hover:text-blue-400" },
              { icon: Mail, href: "#", color: "hover:text-rose-400" }
            ].map(({ icon: Icon, href, color }, index) => (
              <a
                key={index}
                href={href}
                className={`p-4 bg-slate-800/50 rounded-xl border border-slate-700 transition-all duration-300 hover:scale-110 hover:border-cyan-400/50 hover:bg-slate-800/80 ${color}`}
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setActiveSection('projects')}
              className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              View My Work
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-slate-800/50 border border-slate-700 rounded-xl font-semibold hover:bg-slate-800/80 transition-all duration-300 hover:scale-105">
              Download CV
            </button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Innovative solutions that push the boundaries of technology
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <div
                  key={index}
                  className="group relative bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10"
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient || 'from-cyan-500 to-blue-500'} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
                  
                  {/* Project Number */}
                  <div className={`absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-r ${project.gradient || 'from-cyan-500 to-blue-500'} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {index + 1}
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {Array.isArray(project.tech) && project.tech.map((tech, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 bg-slate-700/50 rounded-lg text-sm text-slate-300 border border-slate-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {Array.isArray(project.highlights) && project.highlights.map((highlight, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-lg text-sm border border-cyan-500/20 flex items-center gap-1"
                        >
                          <Star className="w-3 h-3" />
                          {highlight}
                        </span>
                      ))}
                    </div>

                    <button className="w-full py-3 bg-slate-700/50 hover:bg-slate-700/80 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group/btn">
                      View Details
                      <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-slate-400 py-12">
                No projects data available
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-20 px-6 bg-slate-800/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Mastering the tools and technologies that power modern applications
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Skills Grid */}
            <div className="grid gap-6">
              {Object.keys(skills).length > 0 ? (
                Object.entries(skills).map(([category, items], index) => (
                  <div 
                    key={category}
                    className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        index === 0 ? 'bg-cyan-400' :
                        index === 1 ? 'bg-blue-400' :
                        index === 2 ? 'bg-purple-400' : 'bg-pink-400'
                      }`} />
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {Array.isArray(items) && items.map((skill, i) => (
                        <span 
                          key={i}
                          className="px-4 py-2 bg-slate-700/50 rounded-xl text-slate-300 border border-slate-600 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300 hover:scale-105"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-400 py-12">
                  No skills data available
                </div>
              )}
            </div>

            {/* Achievements */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold mb-8 text-white">Achievements</h3>
              <div className="grid grid-cols-2 gap-6">
                {achievements.length > 0 ? (
                  achievements.map((achievement, index) => (
                    <div 
                      key={index}
                      className="text-center p-6 bg-slate-700/30 rounded-xl border border-slate-600 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105"
                    >
                      <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                        {achievement.number}
                      </div>
                      <div className="text-slate-400 text-sm">
                        {achievement.label}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center text-slate-400 py-6">
                    No achievements data available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Let's Create Together
          </h2>
          
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? Let's discuss how we can turn your vision into reality.
          </p>

          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 max-w-md mx-auto">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors placeholder-slate-400"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors placeholder-slate-400"
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors placeholder-slate-400 resize-none"
              />
              <button className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-slate-700 bg-slate-900/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <p className="text-slate-400">
            © 2024 Portfolio. Crafted with passion and precision.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Portfolio3D;