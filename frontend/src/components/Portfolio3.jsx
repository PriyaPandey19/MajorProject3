import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, ChevronRight, Star, Sparkles, Award, BookOpen, Briefcase, Code, User } from 'lucide-react';

const PortfolioDataDriven = ({data = {}}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Transform skills data for display
  const skillCategories = Object.entries(data.skills || {}).map(([category, skills]) => ({
    name: category,
    skills: skills,
    icon: category === 'Programming' ? Code : 
          category === 'Frontend' ? Sparkles :
          category === 'Backend' ? Briefcase :
          category === 'Database' ? BookOpen : User
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl transition-transform duration-1000"
          style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
        ></div>
        <div 
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl transition-transform duration-1000"
          style={{ transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)` }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 bg-slate-900/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent whitespace-nowrap">
              {data.contact?.email?.split('@')[0] || 'Developer'}
            </span>
          </div>
          
          <div className="hidden md:flex gap-4 flex-wrap justify-end">
            {['Home', 'Experience', 'Projects', 'Skills', 'Education', 'Contact'].map(item => (
              <button
                key={item}
                onClick={() => setActiveSection(item.toLowerCase())}
                className="relative group flex-shrink-0"
              >
                <div className="relative px-3 py-2 rounded-xl transition-all duration-500 group-hover:bg-white/5">
                  <span className={`text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeSection === item.toLowerCase() 
                      ? 'text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text' 
                      : 'text-gray-300 group-hover:text-white'
                  }`}>
                    {item}
                  </span>
                </div>
                <div className={`absolute -bottom-2 left-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-500 group-hover:w-4/5 ${
                  activeSection === item.toLowerCase() ? 'w-4/5' : ''
                }`} style={{ transform: 'translateX(-50%)' }}></div>
              </button>
            ))}
          </div>

          <button 
            className="md:hidden p-2 bg-white/5 rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 flex-shrink-0"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10">
            {['Home', 'Experience', 'Projects', 'Skills', 'Education', 'Contact'].map(item => (
              <button
                key={item}
                onClick={() => {
                  setActiveSection(item.toLowerCase());
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-6 py-3 hover:bg-white/5 transition-all duration-300 border-b border-white/5 last:border-b-0"
              >
                <span className={`text-base font-medium ${
                  activeSection === item.toLowerCase() 
                    ? 'text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text' 
                    : 'text-gray-300'
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
          {/* Avatar */}
          <div className="relative inline-block mb-12">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-1.5 shadow-2xl shadow-cyan-500/25">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                <User className="w-16 h-16 text-cyan-400" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Full Stack
            </span>
            <br />
            <span className="text-white">Developer</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            {(data.services?.[0]?.desc || "Building modern applications")} • {(data.services?.[1]?.desc || "Creating digital experiences")}
          </p>

          {/* Achievements */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {(data.achievements || []).map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-1">{achievement.number}</div>
                <div className="text-sm text-gray-400">{achievement.label}</div>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex gap-6 justify-center mb-12">
            {(data.contact?.socials || []).map((social, index) => {
              const Icon = social === 'GitHub' ? Github : 
                          social === 'LinkedIn' ? Linkedin : Mail;
              return (
                <a
                  key={social}
                  href="#"
                  className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-500 hover:scale-110"
                >
                  <Icon className="w-6 h-6 text-gray-400 hover:text-cyan-400 transition-colors" />
                </a>
              );
            })}
          </div>

          <button 
            onClick={() => setActiveSection('projects')}
            className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 hover:scale-105 flex items-center gap-3 mx-auto"
          >
            View My Projects
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Experience Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Professional
              </span>
              <span className="text-white"> Experience</span>
            </h2>
            <p className="text-xl text-gray-400">Building scalable solutions for modern challenges</p>
          </div>

          <div className="space-y-8">
            {(data.experience || []).map((exp, index) => (
              <div
                key={index}
                className="group bg-slate-800/20 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-cyan-400/30 transition-all duration-500 hover:scale-105"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-cyan-400 text-lg mb-1">{exp.company}</p>
                    <p className="text-gray-400 mb-4">{exp.location} • {exp.period}</p>
                    
                    <ul className="space-y-2">
                      {(exp.achievements || []).map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300">
                          <Star className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="lg:w-48 flex-shrink-0">
                    <div className="bg-cyan-500/10 border border-cyan-400/20 rounded-2xl p-4 text-center">
                      <div className="text-cyan-400 font-bold text-lg">Experience</div>
                      <div className="text-white text-sm">{exp.period}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative py-20 px-6 bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Featured
              </span>
              <span className="text-white"> Projects</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {(data.projects || []).map((project, index) => (
              <div
                key={index}
                className="group bg-slate-800/20 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-500 hover:scale-105 h-full flex flex-col"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed flex-1">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(project.tech || []).map((tech, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-white/5 rounded-lg text-xs text-gray-300 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {(project.highlights || []).map((highlight, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-xs border border-purple-500/20 flex items-center gap-1"
                      >
                        <Award className="w-3 h-3" />
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 group/btn border border-white/10 hover:border-purple-400/30">
                  View Project
                  <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Technical
              </span>
              <span className="text-white"> Skills</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <div
                key={category.name}
                className="group bg-slate-800/20 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-green-400/30 transition-all duration-500"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {(category.skills || []).map((skill, i) => (
                    <span 
                      key={i}
                      className="px-3 py-2 bg-white/5 rounded-lg text-sm text-gray-300 border border-white/10 hover:border-green-400/50 hover:text-green-400 transition-all duration-300 hover:scale-105"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="relative py-20 px-6 bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Education
              </h2>
              <div className="space-y-6">
                {(data.education || []).map((edu, index) => (
                  <div
                    key={index}
                    className="group bg-slate-800/20 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-500"
                  >
                    <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                    <p className="text-cyan-400 mb-2">{edu.school}</p>
                    <p className="text-gray-400 mb-3">{edu.period} • GPA: {edu.gpa}</p>
                    <div className="flex flex-wrap gap-2">
                      {(edu.courses || []).map((course, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-lg text-sm border border-cyan-500/20"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Certifications
              </h2>
              <div className="space-y-4">
                {(data.certifications || []).map((cert, index) => (
                  <div
                    key={index}
                    className="group bg-slate-800/20 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-500"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{cert.name}</h3>
                        <p className="text-purple-400">{cert.org} • {cert.year}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Services */}
              <h2 className="text-3xl font-bold mt-12 mb-8 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Services
              </h2>
              <div className="grid gap-4">
                {(data.services || []).map((service, index) => (
                  <div
                    key={index}
                    className="group bg-slate-800/20 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:border-green-400/30 transition-all duration-300"
                  >
                    <h3 className="font-bold text-white mb-1">{service.title}</h3>
                    <p className="text-gray-400 text-sm">{service.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-slate-800/20 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {data.contact?.heading?.split(' ')[0] || 'Get'}
              </span>
              <span className="text-white"> {data.contact?.heading?.split(' ').slice(1).join(' ') || 'In Touch'}</span>
            </h2>
            
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              {data.contact?.message || 'Let\'s work together on your next project'}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <div className="text-center">
                <Mail className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <p className="text-white font-semibold">{data.contact?.email || 'email@example.com'}</p>
              </div>
              <div className="text-center">
                <Briefcase className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <p className="text-white font-semibold">{data.contact?.phone || '+1234567890'}</p>
              </div>
              <div className="text-center">
                <User className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <p className="text-white font-semibold">{data.contact?.location || 'Location'}</p>
              </div>
            </div>

            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 hover:scale-105">
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-slate-900/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <p className="text-gray-400">{data.footer?.text || '© 2024 All rights reserved'}</p>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioDataDriven;