import React, { useState, useEffect, useRef } from 'react';
import { 
  Code, 
  Palette, 
  Zap, 
  Award, 
  Send, 
  ArrowRight, 
  Star, 
  Briefcase,
  User,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  ExternalLink
} from 'lucide-react';

const GlassPortfolio = ({data = {}}) => {
  const [scrollY, setScrollY] = useState(0);
  const [activeProject, setActiveProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Transform portfolioData to component format
  const projects = (data?.projects || []).map((project, index) => ({
    id: index + 1,
    title: project?.title || 'Untitled Project',
    description: project?.description || 'No description available',
    tech: project?.tech || [],
    highlights: project?.highlights || [],
    link: project?.link || '#',
    gradient: [
      'from-blue-400 via-purple-500 to-pink-500',
      'from-emerald-400 via-cyan-500 to-blue-500',
      'from-orange-400 via-red-500 to-pink-500',
      'from-violet-400 via-purple-500 to-fuchsia-500',
      'from-amber-400 via-orange-500 to-red-500',
      'from-teal-400 via-green-500 to-emerald-500'
    ][index % 6],
    stats: {
      performance: project?.highlights?.[0]?.split(': ')[1] || '99%',
      speed: project?.highlights?.[1]?.split(': ')[1] || '2.5x',
      users: project?.highlights?.[2]?.split(': ')[1] || '50K+'
    }
  }));

  const services = (data?.services || []).map((service, index) => ({
    icon: [Code, Palette, Zap, Award, Briefcase, User][index] || Code,
    title: service?.title || 'Service',
    desc: service?.desc || 'Service description'
  }));

  const stats = (data?.achievements || []).map((achievement, index) => ({
    value: achievement?.number || '0',
    label: achievement?.label || 'Stat',
    icon: [Briefcase, Award, User, Star][index] || Briefcase
  }));

  const testimonials = data?.testimonials || [
    { name: 'Sarah Chen', role: 'CTO at TechCorp', text: 'Exceptional work delivered beyond expectations.' },
    { name: 'Michael Rodriguez', role: 'Founder, StartupX', text: 'Transformed our vision into reality with incredible attention to detail.' }
  ];

  // Floating particles background
  const FloatingParticles = () => {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 text-slate-800 overflow-x-hidden">
      <FloatingParticles />
      
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-50">
        <div 
          className="absolute inset-0 transition-transform duration-1000"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
                rgba(59, 130, 246, 0.1) 0%, 
                transparent 50%),
              radial-gradient(circle at ${100 - mousePosition.x / window.innerWidth * 100}% ${mousePosition.y / window.innerHeight * 100}%, 
                rgba(139, 92, 246, 0.1) 0%, 
                transparent 50%)
            `,
            transform: `translate(${scrollY * 0.02}px, ${scrollY * 0.01}px)`
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Portfolio
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Work', 'Services', 'Skills', 'Contact'].map((item) => (
              <button 
                key={item}
                className="text-slate-600 hover:text-blue-600 transition-colors font-medium"
              >
                {item}
              </button>
            ))}
          </div>

          <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105">
            Get In Touch
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl mx-auto text-center">
          <div 
            className="mb-8 transition-transform duration-1000"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-slate-200/50 mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-slate-600">Available for new projects</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Creative
              </span>
              <br />
              <span className="text-slate-800">Developer</span>
            </h1>

            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Building digital experiences that blend innovative technology with stunning design
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-semibold hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-3">
              <span>View My Work</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl font-semibold hover:shadow-lg transition-all hover:scale-105">
              Download CV
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 hover:border-blue-300/50 transition-all hover:scale-105 shadow-sm"
                  style={{
                    transform: `translateY(${scrollY * 0.1 * (idx + 1)}px)`
                  }}
                >
                  <StatIcon className="mx-auto mb-3 text-blue-500" size={24} />
                  <div className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center p-1">
            <div className="w-1 h-3 bg-slate-400 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">What I Do</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive digital services to bring your ideas to life
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => {
              const ServiceIcon = service.icon;
              return (
                <div
                  key={i}
                  className="group p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-slate-200/50 hover:border-blue-300/50 transition-all duration-500 hover:scale-105 shadow-sm"
                  style={{
                    transform: `translateY(${scrollY * 0.05 * (i + 1)}px)`
                  }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <ServiceIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative py-32 px-6 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Featured Projects</h2>
            <p className="text-lg text-slate-600">Showcasing my latest and greatest work</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <div
                key={project.id}
                className="group bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/50 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105"
                onMouseEnter={() => setActiveProject(project.id)}
                onMouseLeave={() => setActiveProject(null)}
              >
                {/* Project Header */}
                <div className={`h-4 bg-gradient-to-r ${project.gradient}`} />
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  {project.tech && project.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 3).map((tech, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-sm">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {project.highlights.slice(0, 2).map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-slate-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex justify-between pt-4 border-t border-slate-200/50">
                    {Object.entries(project.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="font-bold text-slate-800">{value}</div>
                        <div className="text-xs text-slate-500 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Technical Skills</h2>
            <p className="text-lg text-slate-600">Technologies I work with</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.skills && Object.entries(data.skills).map(([category, skills], idx) => (
              <div
                key={category}
                className="p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-slate-200/50 hover:border-blue-300/50 transition-all hover:scale-105"
              >
                <h3 className="text-lg font-bold text-slate-800 mb-4 pb-3 border-b border-slate-200/50">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {(skills || []).map((skill, skillIdx) => (
                    <span
                      key={skillIdx}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
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

      {/* Testimonials */}
      <section className="relative py-32 px-6 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Client Testimonials</h2>
            <p className="text-lg text-slate-600">What people say about working with me</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-slate-800">{testimonial.name}</div>
                  <div className="text-sm text-slate-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-16 bg-white/80 backdrop-blur-sm rounded-[3rem] border border-slate-200/50 shadow-2xl">
            <Briefcase className="w-16 h-16 mx-auto mb-8 text-blue-500" />
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              {data?.contact?.message || "Let's collaborate on your next project!"}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-4 text-slate-600">
                <Mail className="w-5 h-5" />
                <span>{data?.contact?.email || 'contact@example.com'}</span>
              </div>
              <button className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-semibold hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-3">
                <Send className="w-5 h-5" />
                Start Conversation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl" />
              <div>
                <div className="text-xl font-bold">Portfolio</div>
                <div className="text-slate-400 text-sm">{data?.footer?.text || '© 2025 All rights reserved'}</div>
              </div>
            </div>

            <div className="flex gap-6">
              {(data?.contact?.socials || []).map((social, idx) => {
                const SocialIcon = [Github, Linkedin, Twitter, Mail][idx] || Github;
                return (
                  <button
                    key={idx}
                    className="w-12 h-12 bg-slate-700 rounded-2xl flex items-center justify-center hover:bg-slate-600 transition-colors hover:scale-110"
                  >
                    <SocialIcon className="w-5 h-5" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default GlassPortfolio;