import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Code2, Award, ExternalLink, Menu, X } from 'lucide-react';
//import { portfolioData } from "./portfolioData";

export default function Portfolio({ data = {}, inPreview = false  }) {
  const [activeTab, setActiveTab] = useState('experience');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Animate hero on load
    if (heroRef.current) {
      heroRef.current.style.opacity = '0';
      heroRef.current.style.transform = 'translateY(50px)';
      setTimeout(() => {
        heroRef.current.style.transition = 'all 1s ease-out';
        heroRef.current.style.opacity = '1';
        heroRef.current.style.transform = 'translateY(0)';
      }, 100);
    }

    // Animate cards on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0) rotateX(0)';
            }, index * 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => {
      if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) rotateX(-10deg)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, [activeTab]);

  const skills = data?.skills || {};
  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const certifications = Array.isArray(data?.certifications) ? data.certifications : [];
  const hobbies = Array.isArray(data?.hobbies) ? data.hobbies : [];
  const projects = Array.isArray(data?.projects) ? data.projects : [];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* 3D Animated Background */}
      {inPreview ? (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>

          {/* Floating 3D Spheres (contained) */}
          <div 
            className="absolute w-80 h-80 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)',
              left: `${10 + mousePos.x * 0.01}px`,
              top: `${10 + mousePos.y * 0.01}px`,
              transform: `translate(-50%, -50%)`,
              transition: 'all 0.3s ease-out',
              filter: 'blur(48px)'
            }}
          />
          <div 
            className="absolute w-80 h-80 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.22) 0%, transparent 70%)',
              right: `${10 - mousePos.x * 0.01}px`,
              top: `${20 + mousePos.y * 0.015}px`,
              transform: `translate(50%, -50%)`,
              transition: 'all 0.3s ease-out',
              filter: 'blur(48px)'
            }}
          />
          <div 
            className="absolute w-80 h-80 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
              left: `${40 - mousePos.x * 0.005}px`,
              bottom: `${10 - mousePos.y * 0.01}px`,
              transform: `translate(-50%, 50%)`,
              transition: 'all 0.3s ease-out',
              filter: 'blur(48px)'
            }}
          />

          {/* Animated Grid (subtle) */}
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.06) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            transform: `perspective(500px) rotateX(70deg) translateZ(-60px) translate(${-mousePos.x * 0.02}px, ${-mousePos.y * 0.02}px)`,
            transformOrigin: 'center center',
            transition: 'transform 0.12s ease-out',
            opacity: 0.7
          }}></div>

          {/* Floating Particles (contained) */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${4 + Math.random() * 8}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 4}s`,
                opacity: 0.25 + Math.random() * 0.5
              }}
            />
          ))}
        </div>
      ) : (
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>
          
          {/* Floating 3D Spheres */}
          <div 
            className="absolute w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
              left: `${20 + mousePos.x * 0.02}px`,
              top: `${20 + mousePos.y * 0.02}px`,
              transform: `translate(-50%, -50%) scale(${1 + mousePos.x * 0.0001})`,
              transition: 'all 0.3s ease-out',
              filter: 'blur(60px)'
            }}
          />
          <div 
            className="absolute w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
              right: `${20 - mousePos.x * 0.02}px`,
              top: `${40 + mousePos.y * 0.03}px`,
              transform: `translate(50%, -50%) scale(${1.2 - mousePos.x * 0.0001})`,
              transition: 'all 0.3s ease-out',
              filter: 'blur(60px)'
            }}
          />
          <div 
            className="absolute w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
              left: `${50 - mousePos.x * 0.01}px`,
              bottom: `${20 - mousePos.y * 0.02}px`,
              transform: `translate(-50%, 50%) scale(${1.1 + mousePos.y * 0.0001})`,
              transition: 'all 0.3s ease-out',
              filter: 'blur(60px)'
            }}
          />

          {/* Animated Grid */}
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            transform: `perspective(500px) rotateX(60deg) translateZ(-100px) translate(${-mousePos.x * 0.05}px, ${-mousePos.y * 0.05}px)`,
            transformOrigin: 'center center',
            transition: 'transform 0.1s ease-out'
          }}></div>

          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: 0.3 + Math.random() * 0.5
              }}
            />
          ))}
        </div>
      )}

      {/* Navigation */}
      {!inPreview && (
      <nav className={inPreview ? "relative w-full bg-black/50 backdrop-blur-xl z-20 border-b border-cyan-500/20" : "fixed top-0 w-full bg-black/50 backdrop-blur-xl z-50 border-b border-cyan-500/20"}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Portfolio
          </div>
          
          <div className="hidden md:flex gap-8">
            {['Home', 'About', 'Projects', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="relative group hover:text-cyan-400 transition"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenu && (
          <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-cyan-500/20">
            <div className="flex flex-col p-4 gap-4">
              {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="hover:text-cyan-400 transition" 
                  onClick={() => setMobileMenu(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
      )}

      {/* Hero */}
      <section id="home" className={inPreview ? "relative py-8 px-6 flex items-center" : "relative pt-32 pb-20 px-6 min-h-screen flex items-center"}>
        <div className="max-w-6xl mx-auto w-full">
          <div ref={heroRef} className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 z-10">
              <div className="inline-block px-4 py-2 bg-cyan-500/20 backdrop-blur-sm rounded-full text-cyan-400 text-sm mb-6 border border-cyan-500/30">
                👋 Welcome to my portfolio
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Hi, I'm <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">FrontEnd Developer</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Full Stack Developer crafting innovative digital experiences with modern technologies
              </p>
              <div className="flex gap-4 mb-8">
                <a 
                  href="#contact" 
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 rounded-lg font-semibold transition transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
                >
                  Hire Me
                </a>
                <a 
                  href="#projects" 
                  className="px-6 py-3 border border-cyan-500/50 hover:border-cyan-500 hover:bg-cyan-500/10 rounded-lg font-semibold transition transform hover:scale-105"
                >
                  View Work
                </a>
              </div>
              <div className="flex gap-4">
                {[Github, Linkedin, Mail].map((Icon, i) => (
                  <a 
                    key={i}
                    href="#" 
                    className="w-12 h-12 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-500/20 rounded-lg transition transform hover:scale-110 hover:rotate-6"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">About Me</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Passionate developer with expertise in building scalable web applications
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['experience', 'education', 'skills', 'certifications', 'hobbies'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-semibold capitalize transition transform hover:scale-105 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/50'
                    : 'bg-white/5 backdrop-blur-sm border border-cyan-500/30 text-gray-400 hover:border-cyan-500 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="max-w-5xl mx-auto">
            {activeTab === 'experience' && (
              <div className="space-y-6">
                {experience.length > 0 ? (
                  experience.map((exp, idx) => (
                    <div 
                      key={idx} 
                      ref={(el) => (cardsRef.current[idx] = el)}
                      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30 hover:border-cyan-500 hover:bg-white/10 transition transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20"
                      style={{
                        transform: `perspective(1000px) rotateX(${mousePos.y * 0.005}deg)`
                      }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-cyan-400">{exp.role}</h3>
                          <p className="text-gray-300">{exp.company} • {exp.location}</p>
                        </div>
                        <span className="text-gray-400 mt-2 md:mt-0">{exp.period}</span>
                      </div>
                      <ul className="space-y-2">
                        {Array.isArray(exp.achievements) && exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex gap-3 text-gray-300">
                            <span className="text-cyan-400 mt-1">▹</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-400 py-12">No experience data available</div>
                )}
              </div>
            )}

            {activeTab === 'education' && (
              <div className="space-y-6">
                {education.length > 0 ? (
                  education.map((edu, idx) => (
                    <div 
                      key={idx} 
                      ref={(el) => (cardsRef.current[idx] = el)}
                      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 hover:border-purple-500 hover:bg-white/10 transition transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-purple-400">{edu.degree}</h3>
                          <p className="text-gray-300">{edu.school}</p>
                        </div>
                        <div className="text-right mt-2 md:mt-0">
                          <p className="text-gray-400">{edu.period}</p>
                          <p className="text-purple-400 font-semibold">GPA: {edu.gpa}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(edu.courses) && edu.courses.map((course, i) => (
                          <span key={i} className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-gray-300">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-400 py-12">No education data available</div>
                )}
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.keys(skills).length > 0 ? (
                  Object.entries(skills).map(([category, items], idx) => (
                    <div 
                      key={category} 
                      ref={(el) => (cardsRef.current[idx] = el)}
                      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30 hover:border-cyan-500 hover:bg-white/10 transition transform hover:scale-105 hover:rotate-1 hover:shadow-xl hover:shadow-cyan-500/20"
                    >
                      <h3 className="text-xl font-bold text-cyan-400 mb-4">{category}</h3>
                      <div className="space-y-2">
                        {Array.isArray(items) && items.map((skill, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                            <span className="text-gray-300">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-400 py-12">No skills data available</div>
                )}
              </div>
            )}

            {activeTab === 'certifications' && (
              <div className="grid md:grid-cols-2 gap-6">
                {certifications.length > 0 ? (
                  certifications.map((cert, idx) => (
                    <div 
                      key={idx} 
                      ref={(el) => (cardsRef.current[idx] = el)}
                      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30 hover:border-yellow-500 hover:bg-white/10 transition transform hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/20 flex items-start gap-4"
                    >
                      <Award className="text-yellow-400 flex-shrink-0 animate-pulse" size={32} />
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{cert.name}</h3>
                        <p className="text-gray-400">{cert.org}</p>
                        <p className="text-yellow-400 text-sm mt-1">{cert.year}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-400 py-12">No certifications data available</div>
                )}
              </div>
            )}

            {activeTab === 'hobbies' && (
              <div className="grid md:grid-cols-3 gap-6">
                {hobbies.length > 0 ? (
                  hobbies.map((hobby, idx) => (
                    <div 
                      key={idx} 
                      ref={(el) => (cardsRef.current[idx] = el)}
                      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-pink-500/30 hover:border-pink-500 hover:bg-white/10 transition transform hover:scale-110 hover:rotate-3 hover:shadow-xl hover:shadow-pink-500/20 text-center"
                    >
                      <div className="text-5xl mb-3 animate-bounce">{hobby.emoji}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{hobby.title}</h3>
                      <p className="text-gray-400 text-sm">{hobby.desc}</p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-400 py-12">No hobbies data available</div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Featured Projects</h2>
          <p className="text-center text-gray-400 mb-12">Some of my recent work that I'm proud of</p>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.length > 0 ? (
              projects.map((project, idx) => (
                <div 
                  key={idx} 
                  ref={(el) => (cardsRef.current[idx + 20] = el)}
                  className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-cyan-500/30 hover:border-cyan-500 transition transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30"
                  style={{
                    transform: `perspective(1000px) rotateY(${mousePos.x * 0.01}deg)`,
                    transition: 'all 0.3s ease-out'
                  }}
                >
                  <div className="h-48 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center relative overflow-hidden">
                    <Code2 size={64} className="text-cyan-400 opacity-50 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {Array.isArray(project.tech) && project.tech.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-sm text-gray-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-3 text-sm text-gray-400">
                        {Array.isArray(project.highlights) && project.highlights.map((highlight, i) => (
                          <span key={i}>{highlight}</span>
                        ))}
                      </div>
                      <a href={project.link} className="text-cyan-400 hover:text-cyan-300 transition transform hover:scale-125">
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 py-12">No projects data available</div>
            )}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-xl text-gray-400 mb-12">
            I'm currently available for freelance work and full-time opportunities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:your.email@example.com" 
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 rounded-lg font-semibold transition transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center gap-2"
            >
              <Mail size={20} />
              Send Email
            </a>
            <a 
              href="#" 
              className="px-8 py-4 border border-cyan-500/50 hover:border-cyan-500 hover:bg-cyan-500/10 rounded-lg font-semibold transition transform hover:scale-105"
            >
              Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}


      {!inPreview && (
      <footer className="relative py-8 px-6 border-t border-cyan-500/20 text-center text-gray-500">
        <p>© 2024 Your Name. Built with React & Tailwind CSS</p>
      </footer>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-15px) translateX(5px);
          }
        }
      `}</style>
    </div>
  );
}