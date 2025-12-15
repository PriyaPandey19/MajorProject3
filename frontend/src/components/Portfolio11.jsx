import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowUpRight, 
  Menu, 
  X,
  Code,
  Palette,
  Database,
  Cloud,
  Terminal,
  Smartphone,
  Shield,
  Mail,
  MapPin,
  Calendar,
  Award,
  Star,
  ExternalLink,
  Download
} from 'lucide-react';

const BrutalistPortfolio = ({data = {}}) => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const canvasRef = useRef(null);

  // Brutalist grid animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drawGrid = () => {
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      const size = 40;
      
      for (let x = 0; x < canvas.width; x += size) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += size) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    drawGrid();
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawGrid();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Transform data to brutalist format
  const projects = (data?.projects || []).map((project, index) => ({
    ...project,
    id: index + 1,
    title: project?.title || 'Untitled Project',
    description: project?.description || 'No description available',
    tech: project?.tech || [],
    highlights: project?.highlights || [],
    link: project?.link || '#',
    color: ['#000', '#ff0000', '#0000ff', '#ffff00', '#00ff00', '#ff00ff'][index % 6],
    accent: index % 2 === 0
  }));

  const services = (data?.services || []).map((service, index) => ({
    ...service,
    title: service?.title || 'Service',
    desc: service?.desc || 'Service description',
    icon: [Terminal, Database, Cloud, Shield, Smartphone, Palette][index] || Terminal,
    number: (index + 1).toString().padStart(2, '0')
  }));

  const stats = data?.achievements || [];

  const experience = data?.experience || [
    {
      role: "Senior Developer",
      company: "Tech Corp",
      period: "2022-Present",
      achievements: ["Led team of 5 developers", "Improved performance by 60%"]
    }
  ];

  const skills = data?.skills ? Object.entries(data.skills) : [];

  return (
    <div className="min-h-screen bg-white text-black font-mono overflow-x-hidden">
      {/* Brutalist Grid Background */}
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 opacity-10 pointer-events-none"
      />

      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-black tracking-tighter">
              DEV_PORTFOLIO
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {['WORK', 'ABOUT', 'SERVICES', 'CONTACT'].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item.toLowerCase())}
                  className={`text-sm font-bold border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-all ${
                    activeSection === item.toLowerCase() ? 'bg-black text-white' : 'bg-white text-black'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden border-2 border-black p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 border-2 border-black bg-white">
              {['WORK', 'ABOUT', 'SERVICES', 'CONTACT'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setActiveSection(item.toLowerCase());
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 border-b-2 border-black last:border-b-0 font-bold hover:bg-black hover:text-white transition-all ${
                    activeSection === item.toLowerCase() ? 'bg-black text-white' : ''
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
      <section className="pt-32 pb-20 px-4 border-b-4 border-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="border-4 border-black p-2 inline-block mb-6">
                <div className="bg-black text-white px-3 py-1 text-sm font-bold">
                  AVAILABLE FOR WORK
                </div>
              </div>
              
              <h1 className="text-5xl md:text-5xl font-black leading-tight mb-6">
                BUILDING
                <br />
                <span className="bg-black text-white px-2">DIGITAL</span>
                <br />
                EXPERIENCES
              </h1>
              
              <p className="text-lg mb-8 leading-relaxed">
                CREATING BOLD, FUNCTIONAL SOLUTIONS THAT CHALLENGE CONVENTION AND DELIVER RESULTS.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="border-4 border-black bg-black text-white px-8 py-4 font-bold hover:bg-white hover:text-black transition-all flex items-center gap-3">
                  <span>VIEW PROJECTS</span>
                  <ArrowUpRight size={20} />
                </button>
                <button className="border-4 border-black bg-white text-black px-8 py-4 font-bold hover:bg-black hover:text-white transition-all flex items-center gap-3">
                  <Download size={20} />
                  <span>DOWNLOAD CV</span>
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="border-4 border-black p-6 hover:bg-black hover:text-white transition-all"
                >
                  <div className="text-3xl font-black mb-2">{stat?.number || '0'}</div>
                  <div className="text-sm font-bold">{stat?.label || 'Stat'}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 border-b-4 border-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">SELECTED WORK</h2>
            <div className="border-2 border-black inline-block px-4 py-1">
              <span className="text-sm font-bold">RECENT PROJECTS</span>
            </div>
          </div>

          <div className="space-y-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`border-4 border-black transition-all ${
                  project.accent ? 'bg-black text-white' : 'bg-white text-black'
                }`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-2xl font-black">{project.title}</h3>
                        <div 
                          className={`w-4 h-4 border-2 ${
                            project.accent ? 'border-white' : 'border-black'
                          }`}
                          style={{ backgroundColor: project.color }}
                        />
                      </div>
                      
                      <p className="text-lg mb-6 leading-relaxed">
                        {project.description}
                      </p>

                      {project.tech && project.tech.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.map((tech, idx) => (
                            <span 
                              key={idx}
                              className={`px-3 py-1 border-2 text-sm font-bold ${
                                project.accent 
                                  ? 'border-white text-white' 
                                  : 'border-black text-black'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {project.highlights && project.highlights.length > 0 && (
                        <div className="space-y-2">
                          {project.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <div 
                                className={`w-2 h-2 ${
                                  project.accent ? 'bg-white' : 'bg-black'
                                }`}
                              />
                              <span className="text-sm font-medium">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="lg:w-48">
                      <button className={`w-full border-2 px-6 py-3 font-bold transition-all flex items-center justify-center gap-2 ${
                        project.accent
                          ? 'border-white text-white hover:bg-white hover:text-black'
                          : 'border-black text-black hover:bg-black hover:text-white'
                      }`}>
                        <ExternalLink size={16} />
                        VIEW PROJECT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 border-b-4 border-black bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">SERVICES</h2>
            <div className="border-2 border-white inline-block px-4 py-1">
              <span className="text-sm font-bold">WHAT I OFFER</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <div
                  key={index}
                  className="border-4 border-white p-6 hover:bg-white hover:text-black transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-black opacity-50">
                      {service.number}
                    </div>
                    <ServiceIcon className="group-hover:scale-110 transition-transform" size={32} />
                  </div>
                  
                  <h3 className="text-xl font-black mb-3">{service.title}</h3>
                  <p className="leading-relaxed">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="py-20 px-4 border-b-4 border-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-4">TECHNICAL SKILLS</h2>
              <div className="border-2 border-black inline-block px-4 py-1">
                <span className="text-sm font-bold">TECH STACK</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map(([category, skillList], index) => (
                <div key={category} className="border-4 border-black p-6">
                  <h3 className="text-xl font-black mb-4 pb-2 border-b-2 border-black">
                    {category}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {(skillList || []).map((skill, idx) => (
                      <div
                        key={idx}
                        className="border-2 border-black px-3 py-2 text-center hover:bg-black hover:text-white transition-all"
                      >
                        <span className="text-sm font-bold">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      <section className="py-20 px-4 border-b-4 border-black bg-black text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">EXPERIENCE</h2>
            <div className="border-2 border-white inline-block px-4 py-1">
              <span className="text-sm font-bold">PROFESSIONAL JOURNEY</span>
            </div>
          </div>

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="border-4 border-white p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-black">{exp?.role || 'Role'}</h3>
                    <div className="text-lg opacity-80">{exp?.company || 'Company'}</div>
                  </div>
                  <div className="border-2 border-white px-3 py-1">
                    <span className="text-sm font-bold">{exp?.period || 'Period'}</span>
                  </div>
                </div>
                
                {exp?.achievements && exp.achievements.length > 0 && (
                  <div className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-white" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">GET IN TOUCH</h2>
            <div className="border-2 border-black inline-block px-4 py-1">
              <span className="text-sm font-bold">LET'S WORK TOGETHER</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="border-4 border-black p-6">
                <h3 className="text-xl font-black mb-4">CONTACT INFO</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail size={20} />
                    <span className="font-bold">{data?.contact?.email || 'contact@example.com'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={20} />
                    <span className="font-bold">{data?.contact?.location || 'Location'}</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="border-4 border-black p-6">
                <h3 className="text-xl font-black mb-4">CONNECT</h3>
                <div className="grid grid-cols-2 gap-3">
                  {(data?.contact?.socials || []).map((social, index) => (
                    <button
                      key={index}
                      className="border-2 border-black px-4 py-3 font-bold hover:bg-black hover:text-white transition-all"
                    >
                      {social}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="border-4 border-black p-6">
              <h3 className="text-xl font-black mb-4">SEND MESSAGE</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="YOUR NAME"
                  className="w-full border-2 border-black px-4 py-3 font-bold focus:outline-none focus:bg-black focus:text-white transition-all"
                />
                <input
                  type="email"
                  placeholder="YOUR EMAIL"
                  className="w-full border-2 border-black px-4 py-3 font-bold focus:outline-none focus:bg-black focus:text-white transition-all"
                />
                <textarea
                  placeholder="YOUR MESSAGE"
                  rows={4}
                  className="w-full border-2 border-black px-4 py-3 font-bold focus:outline-none focus:bg-black focus:text-white transition-all resize-none"
                />
                <button className="w-full border-4 border-black bg-black text-white px-6 py-4 font-bold hover:bg-white hover:text-black transition-all">
                  SEND MESSAGE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-black text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="border-2 border-white inline-block px-4 py-2 mb-4">
            <span className="text-sm font-bold">{data?.footer?.text || '© 2025 All rights reserved'}</span>
          </div>
          <div className="text-sm opacity-80">
            BOLD DESIGN • FUNCTIONAL CODE • CREATIVE SOLUTIONS
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BrutalistPortfolio;