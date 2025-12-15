import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, Github, Linkedin, Mail, Zap, Terminal } from 'lucide-react';
import * as THREE from 'three';

const ThreeDCyberPortfolio = ({data = {}}) => {
  const mountRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [loading, setLoading] = useState(true);

  // Default data structure
  const defaultData = {
    projects: [
      {
        title: "Cyberpunk VR Experience",
        description: "Immersive virtual reality environment with real-time ray tracing and spatial audio",
        tech: ["Three.js", "WebXR", "GLSL"],
        year: "2024",
        status: "LIVE",
        highlights: ["VR", "Real-time"]
      },
      {
        title: "Neural Network Visualizer",
        description: "Interactive 3D visualization of deep learning models and data flow",
        tech: ["React", "D3.js", "WebGL"],
        year: "2024",
        status: "LIVE",
        highlights: ["AI", "Interactive"]
      },
      {
        title: "Holographic UI System",
        description: "Futuristic user interface with particle effects and gesture controls",
        tech: ["Three.js", "GSAP", "Canvas"],
        year: "2023",
        status: "LIVE",
        highlights: ["UI/UX", "Animation"]
      },
      {
        title: "Quantum Simulator",
        description: "Real-time quantum computing visualization with procedural effects",
        tech: ["WebGL", "Compute Shaders"],
        year: "2023",
        status: "DEV",
        highlights: ["Science", "Simulation"]
      }
    ],
    skills: {
      "3D & Graphics": ["Three.js", "WebGL", "Blender", "GLSL Shaders"],
      "Frontend": ["React", "Next.js", "TypeScript", "Tailwind"],
      "Animation": ["GSAP", "Framer Motion", "CSS Animations"],
      "Tools": ["Git", "Webpack", "Vite", "Figma"]
    },
    achievements: [
      { number: "99%", label: "Client Satisfaction" },
      { number: "50+", label: "Projects Completed" },
      { number: "5+", label: "Years Experience" },
      { number: "10+", label: "Team Members" }
    ]
  };

  // Merge provided data with defaults - safe array handling
  const portfolioData = {
    projects: Array.isArray(data.projects) && data.projects.length > 0 ? data.projects : defaultData.projects,
    skills: (data.skills && Object.keys(data.skills).length > 0) ? data.skills : defaultData.skills,
    achievements: Array.isArray(data.achievements) && data.achievements.length > 0 ? data.achievements : defaultData.achievements
  };
 
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.001);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 3000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 50;
      positions[i + 1] = (Math.random() - 0.5) * 50;
      positions[i + 2] = (Math.random() - 0.5) * 50;

      const color = Math.random() > 0.5 ? new THREE.Color(0x00ffff) : new THREE.Color(0xff00ff);
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Rotating grid
    const gridHelper = new THREE.GridHelper(20, 20, 0x00ffff, 0xff00ff);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    // Floating cubes
    const cubes = [];
    for (let i = 0; i < 8; i++) {
      const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      const material = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x00ffff : 0xff00ff,
        wireframe: true,
        transparent: true,
        opacity: 0.6
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      cubes.push(cube);
      scene.add(cube);
    }

    // Central wireframe sphere
    const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Lights
    const pointLight1 = new THREE.PointLight(0x00ffff, 1, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff00ff, 1, 100);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Rotate particles
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;

      // Rotate grid
      gridHelper.rotation.y += 0.002;

      // Animate cubes
      cubes.forEach((cube, i) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.position.y += Math.sin(time + i) * 0.002;
      });

      // Pulse sphere
      sphere.rotation.y += 0.005;
      sphere.scale.set(
        1 + Math.sin(time) * 0.1,
        1 + Math.sin(time) * 0.1,
        1 + Math.sin(time) * 0.1
      );

      // Camera follow mouse
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Animate lights
      pointLight1.position.x = Math.sin(time) * 5;
      pointLight1.position.z = Math.cos(time) * 5;
      pointLight2.position.x = Math.cos(time) * 5;
      pointLight2.position.z = Math.sin(time) * 5;

      renderer.render(scene, camera);
    };

    animate();
    setTimeout(() => setLoading(false), 1000);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
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
    <div className="min-h-screen bg-black text-cyan-400 font-mono overflow-x-hidden">
      {/* Loading Screen */}
      {loading && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-cyan-400 mb-4 animate-pulse">
              LOADING...
            </div>
            <div className="flex gap-2 justify-center">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-magenta-500 animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3D Background */}
      <div ref={mountRef} className="fixed inset-0 z-0" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black bg-opacity-70 backdrop-blur-sm border-b-2 border-cyan-400">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Terminal className="w-6 h-6 text-cyan-400" />
              <span className="text-cyan-400 font-bold">CYBER3D</span>
            </div>

            <div className="hidden md:flex gap-1">
              {['HOME', 'PROJECTS', 'SKILLS', 'CONTACT'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`px-4 py-2 text-sm font-bold transition-all ${
                    activeSection === item.toLowerCase()
                      ? 'bg-cyan-400 text-black' 
                      : 'text-cyan-400 hover:bg-cyan-400 hover:bg-opacity-20'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button className="md:hidden text-cyan-400" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden mt-4 space-y-2 border-t border-cyan-400 pt-4">
              {['HOME', 'PROJECTS', 'SKILLS', 'CONTACT'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-4 py-2 text-cyan-400 hover:bg-cyan-400 hover:bg-opacity-20"
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
          <div className="max-w-4xl text-center">
            <div className="mb-6">
              <div className="inline-block px-4 py-2 border border-green-400 text-green-400 text-sm mb-4">
                SYSTEM ONLINE
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-6 text-cyan-400">
              3D DEVELOPER
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Building immersive digital experiences through cutting-edge 3D technology and interactive design
            </p>
            <div className="flex gap-4 justify-center mb-8">
              <Github className="w-8 h-8 text-cyan-400 hover:text-magenta-500 cursor-pointer transition-colors" />
              <Linkedin className="w-8 h-8 text-cyan-400 hover:text-magenta-500 cursor-pointer transition-colors" />
              <Mail className="w-8 h-8 text-cyan-400 hover:text-magenta-500 cursor-pointer transition-colors" />
            </div>
            <div className="flex gap-4 justify-center flex-wrap">
              <button 
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-cyan-400 text-black font-bold hover:bg-magenta-500 transition-all flex items-center gap-2"
              >
                <Zap className="w-5 h-5" />
                VIEW PROJECTS
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 border-2 border-magenta-500 text-magenta-500 font-bold hover:bg-magenta-500 hover:text-black transition-all"
              >
                CONTACT
              </button>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-20 px-6 bg-black bg-opacity-80">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-cyan-400 mb-12 text-center">
              PROJECTS
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {portfolioData.projects.map((project, i) => (
                <div
                  key={i}
                  className="bg-black bg-opacity-50 border-2 border-cyan-400 p-6 hover:border-magenta-500 transition-all backdrop-blur-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-2xl font-bold text-magenta-500">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="text-xs">
                      <div className="text-gray-500">{project.year}</div>
                      <div className={project.status === 'LIVE' ? 'text-green-400' : 'text-yellow-400'}>
                        {project.status}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-cyan-400 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {Array.isArray(project.tech) && project.tech.map((tech, j) => (
                      <span key={j} className="px-2 py-1 border border-cyan-400 text-cyan-400 text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {Array.isArray(project.highlights) && project.highlights.map((h, j) => (
                      <span key={j} className="px-2 py-1 bg-magenta-500 text-black text-xs font-bold">
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
        <section id="skills" className="py-20 px-6 bg-black bg-opacity-80">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-magenta-500 mb-12 text-center">
              TECH STACK
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {Object.entries(portfolioData.skills).map(([cat, items]) => (
                <div key={cat} className="bg-black bg-opacity-50 border-2 border-magenta-500 p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">
                    {cat.toUpperCase()}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(items) && items.map((skill, j) => (
                      <span key={j} className="px-3 py-2 border border-cyan-400 text-cyan-400 text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {portfolioData.achievements.map((ach, i) => (
                <div key={i} className="bg-black bg-opacity-50 border-2 border-cyan-400 p-6 text-center backdrop-blur-sm">
                  <div className="text-4xl font-black text-magenta-500 mb-2">
                    {ach.number}
                  </div>
                  <div className="text-xs text-cyan-400">
                    {ach.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 px-6 bg-black bg-opacity-80">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-cyan-400 mb-12 text-center">
              GET IN TOUCH
            </h2>
            <div className="bg-black bg-opacity-50 border-2 border-cyan-400 p-8 backdrop-blur-sm">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-cyan-400">NAME</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-black border-2 border-magenta-500 text-cyan-400 focus:outline-none focus:border-cyan-400"
                    placeholder="Your name..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-cyan-400">EMAIL</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-black border-2 border-magenta-500 text-cyan-400 focus:outline-none focus:border-cyan-400"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-cyan-400">MESSAGE</label>
                  <textarea
                    rows="5"
                    className="w-full px-4 py-3 bg-black border-2 border-magenta-500 text-cyan-400 focus:outline-none focus:border-cyan-400 resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <button className="w-full py-3 bg-cyan-400 text-black font-bold hover:bg-magenta-500 transition-all flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  SEND MESSAGE
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 bg-black bg-opacity-90 border-t-2 border-magenta-500">
          <div className="text-center text-gray-500 text-sm">
            © 2024 CYBER3D PORTFOLIO
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ThreeDCyberPortfolio;