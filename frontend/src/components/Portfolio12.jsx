import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowUpRight,
  Minus,
  Plus,
  Grid,
  List,
  Eye,
  Code,
  Palette,
  Database,
  Cloud,
  Mail,
  MapPin,
  Calendar,
  ExternalLink,
  Download,
  Menu,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const MinimalPortfolio = ({data = {}}) => {
  const [activeView, setActiveView] = useState('grid');
  const [expandedProject, setExpandedProject] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset;
      const trackLength = docHeight - winHeight;
      setScrollProgress(scrollTop / trackLength * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Transform data to minimal format
  const projects = (data?.projects || []).map((project, index) => ({
    ...project,
    id: index + 1,
    title: project?.title || 'Untitled Project',
    description: project?.description || 'No description available',
    tech: project?.tech || [],
    highlights: project?.highlights || [],
    link: project?.link || '#',
    year: 2024 - index,
    category: (project?.tech && project.tech[0]) || 'Development'
  }));

  const services = (data?.services || []).map((service, index) => ({
    ...service,
    title: service?.title || 'Service',
    desc: service?.desc || 'Service description',
    number: (index + 1).toString().padStart(2, '0')
  }));

  const stats = data?.achievements || [];

  const experience = data?.experience || [
    {
      role: "Senior Developer",
      company: "Tech Company",
      period: "2022-Present",
      achievements: ["Led development teams", "Built scalable applications"]
    }
  ];

  const skills = data?.skills ? Object.entries(data.skills) : [];

  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-x-hidden">
      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
        <div 
          className="h-full bg-black transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="sticky top-1 w-full z-40 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-light tracking-tight">
              Portfolio
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {['Work', 'About', 'Services', 'Contact'].map((item) => (
                <button
                  key={item}
                  className="text-sm font-light hover:text-gray-600 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 border-t border-gray-200 pt-4 space-y-2">
              {['Work', 'About', 'Services', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left py-2 text-sm font-light hover:text-gray-600 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
              Hi!
              <br />
              <span className="font-normal">I'm Full Stack Developer</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Creating clean, functional digital experiences with precision and purpose.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-light mb-2">{stat?.number || '0'}</div>
                <div className="text-sm text-gray-500">{stat?.label || 'Stat'}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-3xl font-light mb-2">Selected Work</h2>
              <div className="w-12 h-px bg-black" />
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setActiveView('grid')}
                className={`p-2 rounded-md transition-all ${
                  activeView === 'grid' ? 'bg-black text-white' : 'text-gray-500'
                }`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setActiveView('list')}
                className={`p-2 rounded-md transition-all ${
                  activeView === 'list' ? 'bg-black text-white' : 'text-gray-500'
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>

          {/* Projects Grid/List */}
          <div className={`
            ${activeView === 'grid' 
              ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' 
              : 'space-y-8'
            }
          `}>
            {projects.map((project) => (
              <div
                key={project.id}
                className={`
                  group border border-gray-200 hover:border-black transition-all duration-300
                  ${activeView === 'list' ? 'flex items-start gap-6 p-6' : 'p-6'}
                  ${expandedProject === project.id ? 'bg-gray-50' : ''}
                `}
              >
                {/* Project Header */}
                <div className={activeView === 'list' ? 'flex-1' : ''}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">{project.year}</div>
                      <h3 className="text-xl font-light mb-2 group-hover:font-normal transition-all">
                        {project.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                      className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      {expandedProject === project.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  {project.tech && project.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 3).map((tech, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-light"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-light">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Expanded Content */}
                  {expandedProject === project.id && (
                    <div className="mt-6 space-y-4 animate-fadeIn">
                      {project.highlights && project.highlights.length > 0 && (
                        <div className="space-y-2">
                          {project.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-sm">
                              <Minus size={16} className="text-gray-400" />
                              <span className="text-gray-600">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <button className="flex items-center gap-2 text-sm font-light hover:text-gray-600 transition-colors">
                        <ExternalLink size={16} />
                        View Project Details
                      </button>
                    </div>
                  )}

                  {/* Action Button */}
                  {activeView === 'grid' && (
                    <button className="w-full mt-4 py-3 border border-gray-300 hover:border-black transition-colors text-sm font-light flex items-center justify-center gap-2">
                      View Project
                      <ArrowUpRight size={16} />
                    </button>
                  )}
                </div>

                {/* List View Additional Info */}
                {activeView === 'list' && expandedProject === project.id && (
                  <div className="w-48 space-y-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Category</div>
                      <div className="text-sm font-light">{project.category}</div>
                    </div>
                    <button className="w-full py-2 border border-gray-300 hover:border-black transition-colors text-sm font-light flex items-center justify-center gap-2">
                      View Details
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light mb-4">Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-8 bg-white border border-gray-200 hover:border-black transition-all duration-300 group"
              >
                <div className="text-2xl font-light text-gray-400 mb-4">
                  {service.number}
                </div>
                <h3 className="text-xl font-light mb-4 group-hover:font-normal transition-all">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="py-20 px-6 border-t border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {skills.map(([category, skillList], index) => (
                <div key={category}>
                  <h3 className="text-xl font-light mb-6 pb-2 border-b border-gray-200">
                    {category}
                  </h3>
                  <div className="space-y-3">
                    {(skillList || []).map((skill, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                      >
                        <span className="text-gray-700">{skill}</span>
                        <div className="w-16 h-px bg-gray-300" />
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
      <section className="py-20 px-6 border-t border-gray-200 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light mb-16 text-center">Experience</h2>
          
          <div className="space-y-12">
            {experience.map((exp, index) => (
              <div key={index} className="flex gap-8">
                <div className="w-24 flex-shrink-0">
                  <div className="text-sm text-gray-500">{exp?.period || 'Period'}</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-light mb-2">{exp?.role || 'Role'}</h3>
                  <div className="text-gray-600 mb-4">{exp?.company || 'Company'}</div>
                  {exp?.achievements && exp.achievements.length > 0 && (
                    <div className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Plus size={16} className="text-gray-400 mt-1 flex-shrink-0" />
                          <span className="text-gray-600">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Interested in working together? Let's discuss your next project.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-3 border border-black bg-black text-white hover:bg-white hover:text-black transition-all duration-300 font-light flex items-center gap-3">
              <Mail size={16} />
              Start Conversation
            </button>
            <button className="px-8 py-3 border border-gray-300 hover:border-black transition-all duration-300 font-light flex items-center gap-3">
              <Download size={16} />
              Download Resume
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-gray-500 text-sm mb-4">
            {data?.footer?.text || '© 2025 All rights reserved'}
          </div>
          <div className="text-gray-400 text-xs">
            Minimal Design • Functional Code • Clean Aesthetics
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MinimalPortfolio;