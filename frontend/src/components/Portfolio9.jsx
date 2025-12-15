import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Heart,
  Music,
  Camera,
  Video,
  Mic,
  Headphones,
  Radio,
  Film,
  Play,
  Pause,
  SkipForward,
  Volume2,
  TrendingUp,
  Users,
  Eye,
  ThumbsUp,
  Briefcase,
  GraduationCap,
  Award,
  Star
} from 'lucide-react';

const NeonWavePortfolio = ({data = {}}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [likedProjects, setLikedProjects] = useState([]);
  const canvasRef = useRef(null);

  // Neon wave animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;
    const waves = [];

    class Wave {
      constructor(yOffset, color, amplitude, frequency) {
        this.yOffset = yOffset;
        this.color = color;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.phase = Math.random() * Math.PI * 2;
      }

      draw(time) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;

        for (let x = 0; x < canvas.width; x += 5) {
          const y = this.yOffset + 
            Math.sin((x * this.frequency + time + this.phase) * 0.01) * this.amplitude +
            Math.sin((x * this.frequency * 0.5 + time * 0.5 + this.phase) * 0.01) * (this.amplitude * 0.5);
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    }

    // Create multiple waves with different colors
    waves.push(new Wave(canvas.height * 0.3, '#ff1493', 50, 1));
    waves.push(new Wave(canvas.height * 0.4, '#00ffff', 60, 0.8));
    waves.push(new Wave(canvas.height * 0.5, '#ffff00', 40, 1.2));
    waves.push(new Wave(canvas.height * 0.6, '#00ff00', 55, 0.9));
    waves.push(new Wave(canvas.height * 0.7, '#ff00ff', 45, 1.1));

    let animationId;
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      waves.forEach(wave => wave.draw(time));

      time += 2;
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

  // Map portfolioData projects to the format expected by the component
  const projects = (data?.projects || []).map((project, index) => ({
    id: index + 1,
    title: project?.title || 'Untitled Project',
    category: "tech",
    description: project?.description || 'No description available',
    image: "🚀",
    color: getColorByIndex(index),
    stats: { 
      likes: Math.floor(Math.random() * 10) + 1, 
      views: Math.floor(Math.random() * 100) + 50, 
      shares: Math.floor(Math.random() * 2000) + 500 
    },
    tech: project?.tech || [],
    highlights: project?.highlights || [],
    link: project?.link || '#'
  }));

  function getColorByIndex(index) {
    const colors = [
      "from-pink-500 to-rose-600",
      "from-cyan-500 to-blue-600",
      "from-yellow-500 to-orange-600",
      "from-green-500 to-emerald-600",
      "from-purple-500 to-indigo-600",
      "from-red-500 to-pink-600"
    ];
    return colors[index % colors.length];
  }

  const categories = [
    { id: 'all', name: 'All', icon: Zap },
    { id: 'tech', name: 'Tech', icon: Briefcase },
    { id: 'web', name: 'Web', icon: Video },
    { id: 'ai', name: 'AI', icon: Camera },
    { id: 'crypto', name: 'Crypto', icon: Radio }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const toggleLike = (id) => {
    setLikedProjects(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const stats = (data?.achievements || []).map((achievement, index) => ({
    icon: [TrendingUp, Users, Eye, ThumbsUp][index] || TrendingUp,
    value: achievement?.number || '0',
    label: achievement?.label || 'Stat'
  }));

  const services = (data?.services || []).map((service, index) => ({
    icon: [Music, Video, Camera, Headphones, Film, Mic][index] || Zap,
    title: service?.title || 'Service',
    desc: service?.desc || 'Service description'
  }));

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Neon Wave Background */}
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none opacity-40"
      />

      {/* Header */}
      <header className="fixed top-0 w-full bg-black/50 backdrop-blur-2xl z-50 border-b border-pink-500/20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-xl animate-pulse" />
            <span className="text-2xl font-black tracking-tighter">
              <span className="text-pink-500">DEV</span>
              <span className="text-cyan-500">ZONE</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Projects', 'Experience', 'Skills', 'Contact'].map((item) => (
              <button 
                key={item}
                className="text-gray-300 hover:text-pink-500 transition-colors font-semibold"
              >
                {item}
              </button>
            ))}
          </div>

          <button className="px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full font-bold hover:scale-110 transition-transform">
            Get Started
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-pink-500/20 border border-pink-500/50 rounded-full backdrop-blur-sm animate-pulse">
            <Zap className="text-pink-500" size={16} />
            <span className="text-sm font-bold">Full Stack Developer • Tech Innovator</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-pulse text-5xl md:text-7xl">
              INNOVATE
            </span>
            <span className="block text-3xl md:text-5xl">WITH CODE</span>
          </h1>

          <p className="text-base md:text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
            Passionate full-stack developer creating cutting-edge digital experiences and scalable solutions
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="group px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full font-bold hover:scale-110 transition-all shadow-lg shadow-pink-500/50"
            >
              <span className="flex items-center gap-2">
                {isPlaying ? <Pause /> : <Play />}
                {isPlaying ? 'Pause Demo' : 'View Demo'}
              </span>
            </button>
            <button className="px-8 py-4 border-2 border-pink-500 rounded-full font-bold hover:bg-pink-500/20 transition-all">
              <span className="flex items-center gap-2">
                <Volume2 />
                Contact Me
              </span>
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div 
                key={idx}
                className="p-6 bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-2xl backdrop-blur-sm hover:scale-105 transition-transform"
              >
                <stat.icon className="mx-auto mb-3 text-pink-500" size={32} />
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-40 right-20 text-6xl animate-bounce opacity-20">💻</div>
        <div className="absolute bottom-40 left-20 text-6xl animate-bounce delay-100 opacity-20">🚀</div>
        <div className="absolute top-60 left-40 text-6xl animate-bounce delay-200 opacity-20">⚡</div>
      </section>

      {/* Category Filter */}
      <section className="relative py-16 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 scale-110 shadow-lg shadow-pink-500/50'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                <cat.icon size={18} />
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative py-16 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
              FEATURED PROJECTS
            </h2>
            <p className="text-xl text-gray-400">
              Cutting-edge solutions that push technological boundaries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-3xl overflow-hidden hover:border-pink-500/50 transition-all hover:scale-105"
              >
                <div className={`aspect-video bg-gradient-to-br ${project.color} flex items-center justify-center text-8xl relative overflow-hidden`}>
                  {project.image}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all" />
                  <div className="absolute bottom-4 right-4 text-white/50 text-4xl">
                    🚀
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-black mb-2 group-hover:text-pink-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  
                  {/* Tech Stack */}
                  {project.tech && project.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-pink-500/20 text-pink-300 rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {project.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <Star className="text-yellow-500" size={14} />
                          <span className="text-gray-300">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Heart 
                          className={`cursor-pointer transition-all ${
                            likedProjects.includes(project.id) 
                              ? 'text-pink-500 fill-pink-500' 
                              : 'text-gray-400 hover:text-pink-500'
                          }`}
                          size={16}
                          onClick={() => toggleLike(project.id)}
                        />
                        <span>{project.stats.likes}K</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye size={16} className="text-cyan-500" />
                        <span>{project.stats.views}K</span>
                      </div>
                    </div>
                    <a 
                      href={project.link}
                      className="text-pink-500 font-bold hover:text-pink-400 transition-colors"
                    >
                      View Project →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-32 px-6 z-10 bg-gradient-to-b from-transparent via-pink-500/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500">
              MY SERVICES
            </h2>
            <p className="text-xl text-gray-400">
              Comprehensive development and design solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="p-8 bg-gradient-to-br from-white/10 to-white/0 border border-white/10 rounded-3xl hover:border-pink-500/50 transition-all hover:scale-105"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 rotate-12 hover:rotate-0 transition-transform">
                  <service.icon size={40} />
                </div>
                <h3 className="text-2xl font-black mb-3">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative py-16 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500">
              TECHNICAL SKILLS
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.skills && Object.entries(data.skills).map(([category, skills], idx) => (
              <div
                key={category}
                className="p-6 bg-gradient-to-br from-white/10 to-white/0 border border-white/10 rounded-3xl hover:border-pink-500/50 transition-all"
              >
                <h3 className="text-xl font-black mb-4 text-pink-500">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {(skills || []).map((skill, skillIdx) => (
                    <span
                      key={skillIdx}
                      className="px-3 py-2 bg-pink-500/20 text-pink-300 rounded-lg text-sm font-medium hover:bg-pink-500/30 transition-colors"
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

      {/* CTA Section */}
      <section className="relative py-32 px-6 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-16 bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-3xl backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-cyan-500/10 animate-pulse" />
            
            <Zap className="mx-auto mb-6 text-pink-500 animate-bounce relative z-10" size={64} />
            <h2 className="text-5xl font-black mb-6 relative z-10">
              Ready to Build
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500">
                Something Amazing?
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 relative z-10">
              {data?.contact?.message || "Let's collaborate on your next project!"}
            </p>
            <button className="px-12 py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full font-black text-lg hover:scale-110 transition-transform shadow-2xl relative z-10">
              <span className="flex items-center gap-3">
                <Play />
                START YOUR PROJECT
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-pink-500/20 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-xl" />
              <span className="text-xl font-black">
                <span className="text-pink-500">DEV</span>
                <span className="text-cyan-500">ZONE</span>
              </span>
            </div>

            <div className="text-gray-400 text-sm">
              {data?.footer?.text || '© 2025 All rights reserved'}
            </div>

            <div className="flex gap-4">
              {(data?.contact?.socials || []).map((social, idx) => (
                <button 
                  key={idx}
                  className="w-10 h-10 bg-white/5 hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-500 rounded-full flex items-center justify-center transition-all"
                >
                  <span className="text-xs font-bold">{social[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NeonWavePortfolio;