import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, Github, Linkedin, Mail, Code, Sparkles, Rocket } from 'lucide-react';
import * as THREE from 'three';

const HolographicPortfolio = ({data = {}}) => {
  const mountRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Default data structure
  const defaultData = {
    projects: [
      {
        title: "AI-Powered Design Studio",
        description: "Next-generation design platform with machine learning capabilities and real-time collaboration",
        tech: ["React", "TensorFlow.js", "WebGL"],
        year: "2024",
        status: "LIVE",
        highlights: ["AI", "Collaboration"]
      },
      {
        title: "Immersive Portfolio Platform",
        description: "3D interactive portfolio showcase with holographic effects and gesture controls",
        tech: ["Three.js", "React", "GSAP"],
        year: "2024",
        status: "LIVE",
        highlights: ["3D", "Interactive"]
      },
      {
        title: "Blockchain Explorer",
        description: "Beautiful blockchain visualization tool with real-time transaction tracking",
        tech: ["Next.js", "Web3.js", "D3.js"],
        year: "2023",
        status: "LIVE",
        highlights: ["Web3", "Data Viz"]
      },
      {
        title: "VR Meeting Space",
        description: "Virtual reality conference room with spatial audio and avatar customization",
        tech: ["WebXR", "Three.js", "Node.js"],
        year: "2023",
        status: "DEV",
        highlights: ["VR", "Social"]
      }
    ],
    skills: {
      "Frontend": ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      "3D & Animation": ["Three.js", "WebGL", "GSAP", "Framer Motion"],
      "Backend": ["Node.js", "Python", "GraphQL", "PostgreSQL"],
      "Tools": ["Git", "Docker", "Figma", "Blender"]
    },
    achievements: [
      { number: "50+", label: "Projects Delivered" },
      { number: "98%", label: "Client Satisfaction" },
      { number: "5+", label: "Years Experience" },
      { number: "15+", label: "Awards Won" }
    ]
  };

  // Merge provided data with defaults - safe array/object handling
  const portfolioData = {
    projects: Array.isArray(data.projects) && data.projects.length > 0 ? data.projects : defaultData.projects,
    skills: (data.skills && Object.keys(data.skills).length > 0) ? data.skills : defaultData.skills,
    achievements: Array.isArray(data.achievements) && data.achievements.length > 0 ? data.achievements : defaultData.achievements
  };

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Holographic rings
    const rings = [];
    for (let i = 0; i < 5; i++) {
      const geometry = new THREE.TorusGeometry(2 + i * 0.8, 0.02, 16, 100);
      const material = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x00ffff : 0xff00ff,
        transparent: true,
        opacity: 0.6 - i * 0.1
      });
      const ring = new THREE.Mesh(geometry, material);
      ring.rotation.x = Math.PI / 2;
      rings.push(ring);
      scene.add(ring);
    }

    // DNA Helix
    const helixPoints = [];
    for (let i = 0; i < 200; i++) {
      const angle = (i / 200) * Math.PI * 8;
      const x = Math.cos(angle) * 2;
      const y = (i / 200) * 10 - 5;
      const z = Math.sin(angle) * 2;
      helixPoints.push(new THREE.Vector3(x, y, z));
    }
    const helixGeometry = new THREE.BufferGeometry().setFromPoints(helixPoints);
    const helixMaterial = new THREE.LineBasicMaterial({ 
      color: 0x00ffff,
      transparent: true,
      opacity: 0.5
    });
    const helix = new THREE.Line(helixGeometry, helixMaterial);
    scene.add(helix);

    // Floating orbs
    const orbs = [];
    for (let i = 0; i < 20; i++) {
      const geometry = new THREE.SphereGeometry(0.1, 16, 16);
      const material = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0x00ffff : 0xff00ff,
        transparent: true,
        opacity: 0.8
      });
      const orb = new THREE.Mesh(geometry, material);
      orb.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10
      );
      orbs.push(orb);
      scene.add(orb);
    }

    // Stars
    const starsGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      starVertices.push(x, y, z);
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starsMaterial = new THREE.PointsMaterial({ 
      color: 0xffffff, 
      size: 0.1,
      transparent: true,
      opacity: 0.6
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Animate rings
      rings.forEach((ring, i) => {
        ring.rotation.z += 0.001 * (i + 1);
        ring.position.y = Math.sin(time + i) * 0.5;
      });

      // Rotate helix
      helix.rotation.y += 0.005;

      // Float orbs
      orbs.forEach((orb, i) => {
        orb.position.y += Math.sin(time + i) * 0.01;
        orb.rotation.x += 0.01;
        orb.rotation.y += 0.01;
      });

      // Rotate stars
      stars.rotation.y += 0.0002;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const handleScroll = () => {
      const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setScrollProgress(progress);
      camera.position.z = 8 - progress * 3;
      camera.rotation.x = progress * 0.5;
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-blue-950 to-black text-white font-sans overflow-x-hidden">
      {/* 3D Canvas */}
      <div ref={mountRef} className="fixed inset-0 z-0" />

      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 z-50 transition-all"
        style={{ width: `${scrollProgress * 100}%` }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  HOLO.DEV
                </div>
                <div className="text-xs text-gray-400">Portfolio v3.0</div>
              </div>
            </div>

            <div className="hidden md:flex gap-8">
              {['Home', 'Projects', 'Skills', 'Contact'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-semibold transition-all ${
                    activeSection === item.toLowerCase()
                      ? 'text-cyan-400' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden mt-4 space-y-3 pb-4">
              {['Home', 'Projects', 'Skills', 'Contact'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-4 py-2 text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero */}
        <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-5xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-300">Available for work</span>
            </div>
            
            <h1 className="text-4xl md:text-8xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Creative Developer
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Crafting immersive digital experiences at the intersection of design, technology, and innovation
            </p>

            <div className="flex gap-6 justify-center mb-12">
              <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110">
                <Github className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110">
                <Mail className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <button 
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105 flex items-center gap-2"
              >
                <Rocket className="w-5 h-5" />
                View Projects
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 font-semibold hover:bg-white/20 transition-all"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Featured Work
              </h2>
              <p className="text-xl text-gray-400">Exploring the frontiers of web technology</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {portfolioData.projects.map((project, i) => (
                <div
                  key={i}
                  className="group relative rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:bg-white/10 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-2xl font-black">
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <div className="mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs mb-2">
                      <div className={`w-2 h-2 rounded-full ${project.status === 'LIVE' ? 'bg-green-400' : 'bg-yellow-400'} animate-pulse`} />
                      {project.status}
                    </div>
                    <div className="text-xs text-gray-500">{project.year}</div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {Array.isArray(project.tech) && project.tech.map((tech, j) => (
                      <span key={j} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {Array.isArray(project.highlights) && project.highlights.map((h, j) => (
                      <span key={j} className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-xs font-semibold">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Tech Arsenal
              </h2>
              <p className="text-xl text-gray-400">Tools and technologies I work with</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {Object.entries(portfolioData.skills).map(([cat, items]) => (
                <div key={cat} className="rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:bg-white/10 transition-all">
                  <h3 className="text-2xl font-bold mb-6 capitalize text-cyan-400">
                    {cat}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {Array.isArray(items) && items.map((skill, j) => (
                      <span key={j} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 hover:border-cyan-400/50 transition-all cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {portfolioData.achievements.map((ach, i) => (
                <div key={i} className="rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 p-8 text-center hover:scale-105 transition-all">
                  <div className="text-5xl font-black mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    {ach.number}
                  </div>
                  <div className="text-sm text-gray-400 font-semibold">
                    {ach.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Let's Connect
              </h2>
              <p className="text-xl text-gray-400">Have a project in mind? Let's make it happen</p>
            </div>

            <div className="rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 p-10">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">Your Name</label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">Message</label>
                  <textarea
                    rows="6"
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 resize-none transition-all"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105 flex items-center justify-center gap-2">
                  <Rocket className="w-5 h-5" />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-500">
              © 2024 HOLO.DEV — Crafted with passion and code
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HolographicPortfolio;