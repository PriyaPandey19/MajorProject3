import React, { useState, useEffect, useRef } from 'react';
import { 
  Move, 
  Zap, 
  Layers,
  Grid,
  CircleDot,
  Box,
  Hexagon,
  Triangle,
  ArrowUpRight,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  FolderGit2,
  User,
  Award,
  Star,
  Code2,
  Database,
  Cloud,
  Palette
} from 'lucide-react';

const AbstractArtPortfolio = ({data = {}}) => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [cursorTrail, setCursorTrail] = useState([]);
  const canvasRef = useRef(null);
  const trailRef = useRef([]);

  // Mouse trail effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPoint = { x: e.clientX, y: e.clientY, time: Date.now() };
      trailRef.current = [...trailRef.current, newPoint].slice(-20);
      setCursorTrail(trailRef.current);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Abstract shapes animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class AbstractShape {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 200 + 100;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        this.type = Math.floor(Math.random() * 4);
        this.color = this.getRandomColor();
        this.opacity = Math.random() * 0.15 + 0.05;
      }

      getRandomColor() {
        const colors = [
          { r: 255, g: 107, b: 107 },  // Red
          { r: 78, g: 205, b: 196 },   // Teal
          { r: 255, g: 195, b: 113 },  // Orange
          { r: 162, g: 155, b: 254 },  // Purple
          { r: 255, g: 234, b: 167 }   // Yellow
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.x > canvas.width + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = canvas.height + this.size;
        if (this.y > canvas.height + this.size) this.y = -this.size;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        const gradient = ctx.createLinearGradient(-this.size/2, -this.size/2, this.size/2, this.size/2);
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 1)`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.3)`);

        if (this.type === 0) {
          // Circle
          ctx.beginPath();
          ctx.arc(0, 0, this.size/2, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        } else if (this.type === 1) {
          // Square
          ctx.fillStyle = gradient;
          ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
        } else if (this.type === 2) {
          // Triangle
          ctx.beginPath();
          ctx.moveTo(0, -this.size/2);
          ctx.lineTo(this.size/2, this.size/2);
          ctx.lineTo(-this.size/2, this.size/2);
          ctx.closePath();
          ctx.fillStyle = gradient;
          ctx.fill();
        } else {
          // Hexagon
          const sides = 6;
          ctx.beginPath();
          for (let i = 0; i <= sides; i++) {
            const angle = (Math.PI * 2 * i) / sides;
            const x = Math.cos(angle) * this.size/2;
            const y = Math.sin(angle) * this.size/2;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        ctx.restore();
      }
    }

    const shapes = Array.from({ length: 12 }, () => new AbstractShape());

    let animationId;
    const animate = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      shapes.forEach(shape => {
        shape.update();
        shape.draw();
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Transform portfolioData to match the abstract art structure
  const projects = (data.projects || []).map((project, index) => ({
    id: index + 1,
    title: project.title,
    category: (project.tech?.[0] || 'Tech') + " Project",
    description: project.description,
    tech: project.tech || [],
    highlights: project.highlights || [],
    color: [
      "bg-gradient-to-br from-red-400 to-pink-500",
      "bg-gradient-to-br from-teal-400 to-cyan-500", 
      "bg-gradient-to-br from-orange-400 to-yellow-500",
      "bg-gradient-to-br from-purple-400 to-indigo-500",
      "bg-gradient-to-br from-pink-400 to-rose-500",
      "bg-gradient-to-br from-blue-400 to-cyan-500"
    ][index % 6],
    shape: [Triangle, CircleDot, Box, Hexagon, Layers, Grid][index % 6]
  }));

  const skills = Object.entries(data.skills || {}).map(([category, items], index) => ({
    category,
    items: (items || []).slice(0, 4),
    icon: [Box, Layers, Hexagon, Grid, Code2, Database, Cloud, Palette][index % 8]
  }));

  const stats = [
    { icon: Briefcase, value: (data.experience || []).length + '+', label: 'Years Experience' },
    { icon: FolderGit2, value: (data.projects || []).length + '+', label: 'Projects Completed' },
    { icon: Award, value: data.achievements?.[0]?.number || '99%', label: 'Client Satisfaction' },
    { icon: User, value: data.achievements?.[3]?.number || '10+', label: 'Team Members' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Abstract Background Canvas */}
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
      />

      {/* Mouse Trail */}
      <svg className="fixed inset-0 pointer-events-none z-10">
        <path
          d={cursorTrail.map((point, i) => 
            i === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`
          ).join(' ')}
          stroke="url(#gradient)"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff6b6b" />
            <stop offset="50%" stopColor="#4ecdc4" />
            <stop offset="100%" stopColor="#a29bfe" />
          </linearGradient>
        </defs>
      </svg>

      {/* Navigation */}
      <nav className="sticky top-0 w-full bg-white/70 backdrop-blur-xl z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-400 via-teal-400 to-purple-400 rounded-xl rotate-45" />
            <span className="text-2xl font-black tracking-tight">
              {(data.contact?.email || 'PORTFOLIO').split('@')[0].toUpperCase()}
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button className="hover:text-red-500 transition-colors">Work</button>
            <button className="hover:text-teal-500 transition-colors">Skills</button>
            <button className="hover:text-orange-500 transition-colors">About</button>
            <button className="hover:text-purple-500 transition-colors">Contact</button>
          </div>
          
          <button className="px-6 py-2.5 bg-gradient-to-r from-red-400 via-teal-400 to-purple-400 text-white rounded-lg font-bold hover:scale-105 transition-transform">
            Let's Talk
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center gap-3">
              <Move className="text-red-500 animate-bounce" size={24} />
              <span className="text-sm font-bold tracking-wider uppercase text-gray-600">
                {data.services?.[0]?.title || 'Services'}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black mb-8 leading-none">
              <span className="block text-gray-900">Full Stack</span>
              <span className="block bg-gradient-to-r from-red-500 via-teal-500 to-purple-500 bg-clip-text text-transparent">
                Developer
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              {data.services?.[0]?.desc || 'Creating innovative solutions'} • {data.services?.[1]?.desc || 'with modern technology'}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-2xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-gray-200">
                      <Icon className="w-6 h-6 text-gray-700" />
                    </div>
                    <div className="text-2xl font-black text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-4 justify-center mb-16">
              <button className="group px-8 py-4 bg-gray-900 text-white rounded-xl font-bold hover:scale-105 transition-all shadow-lg">
                <span className="flex items-center gap-2">
                  Explore Work
                  <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                </span>
              </button>
              <button className="px-8 py-4 border-2 border-gray-900 rounded-xl font-bold hover:bg-gray-900 hover:text-white transition-all">
                <span className="flex items-center gap-2">
                  <Download size={20} />
                  Resume
                </span>
              </button>
            </div>

            {/* Geometric shapes decoration */}
            <div className="flex justify-center gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl rotate-12 animate-pulse" />
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full animate-pulse delay-100" />
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-500 rotate-45 animate-pulse delay-200" />
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl -rotate-12 animate-pulse delay-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-6xl font-black mb-4 text-gray-900">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600">
              {(data.projects || []).length}+ innovative solutions delivered
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <div className={`h-64 ${project.color} flex items-center justify-center relative overflow-hidden`}>
                  <project.shape 
                    size={100} 
                    className="text-white/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="p-6">
                  <div className="text-sm font-bold text-gray-500 mb-2">{project.category}</div>
                  <h3 className="text-2xl font-black mb-3 text-gray-900">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.highlights.slice(0, 2).map((highlight, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-gradient-to-r from-red-500/10 to-purple-500/10 text-red-700 rounded-full text-xs font-semibold border border-red-200"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <button className="flex items-center gap-2 text-gray-900 font-bold hover:gap-3 transition-all">
                    View Project
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative py-32 px-6 z-10 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-black mb-4 text-gray-900">
              Technical Skills
            </h2>
            <p className="text-xl text-gray-600">
              Technologies and tools I excel with
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className="p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-400 via-teal-400 to-purple-400 rounded-2xl flex items-center justify-center mb-6 rotate-12 hover:rotate-0 transition-transform">
                  <skill.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-black mb-4 text-gray-900">{skill.category}</h3>
                <ul className="space-y-2">
                  {skill.items.map((item) => (
                    <li key={item} className="text-gray-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="relative py-32 px-6 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-black mb-4 text-gray-900">
              Experience
            </h2>
            <p className="text-xl text-gray-600">
              Professional journey and achievements
            </p>
          </div>

          <div className="space-y-8">
            {(data.experience || []).map((exp, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-200"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-purple-400 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black mb-2 text-gray-900">{exp.role}</h3>
                    <p className="text-xl text-red-500 font-bold mb-1">{exp.company}</p>
                    <p className="text-gray-600 mb-4">{exp.location} • {exp.period}</p>
                    <ul className="space-y-3">
                      {(exp.achievements || []).map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600">
                          <Star className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-32 px-6 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Zap className="mx-auto mb-6 text-orange-500" size={64} />
          <h2 className="text-6xl font-black mb-6 text-gray-900">
            {data.contact?.heading?.split(' ')[0] || 'Get'}
            <br />
            <span className="bg-gradient-to-r from-red-500 via-teal-500 to-purple-500 bg-clip-text text-transparent">
              {data.contact?.heading?.split(' ').slice(1).join(' ') || 'In Touch'}
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            {data.contact?.message || 'Let\'s work together on your next project'}
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <div className="font-black text-gray-900 text-lg">{data.contact?.email || 'email@example.com'}</div>
              <div className="text-gray-600">Email</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <div className="font-black text-gray-900 text-lg">{data.contact?.phone || '+1234567890'}</div>
              <div className="text-gray-600">Phone</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div className="font-black text-gray-900 text-lg">{data.contact?.location || 'Location'}</div>
              <div className="text-gray-600">Location</div>
            </div>
          </div>

          <div className="flex gap-4 justify-center mb-8">
            {(data.contact?.socials || []).map((social, index) => {
              const Icon = social === 'GitHub' ? Github : 
                          social === 'LinkedIn' ? Linkedin : Twitter;
              return (
                <button 
                  key={social}
                  className="w-12 h-12 bg-gray-100 hover:bg-gray-900 rounded-xl flex items-center justify-center transition-all group"
                >
                  <Icon className="text-gray-600 group-hover:text-white transition-colors" size={20} />
                </button>
              );
            })}
          </div>

          <button className="px-12 py-5 bg-gradient-to-r from-red-500 via-teal-500 to-purple-500 text-white rounded-2xl font-black text-lg hover:scale-105 transition-transform shadow-2xl">
            Get In Touch
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 border-t border-gray-200 z-10 bg-white/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 via-teal-400 to-purple-400 rounded-xl rotate-45" />
              <span className="text-2xl font-black">
                {(data.contact?.email || 'PORTFOLIO').split('@')[0].toUpperCase()}
              </span>
            </div>

            <div className="flex gap-6">
              {(data.contact?.socials || []).map((social, index) => {
                const Icon = social === 'GitHub' ? Github : 
                            social === 'LinkedIn' ? Linkedin : Twitter;
                return (
                  <button 
                    key={social}
                    className="w-12 h-12 bg-gray-100 hover:bg-gray-900 rounded-xl flex items-center justify-center transition-all group"
                  >
                    <Icon className="text-gray-600 group-hover:text-white transition-colors" size={20} />
                  </button>
                );
              })}
            </div>

            <div className="text-gray-600 text-sm">
              {data.footer?.text || '© 2024 All rights reserved'}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AbstractArtPortfolio;