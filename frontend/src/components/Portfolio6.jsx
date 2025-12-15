import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';
import { Code2, Briefcase, FolderGit2, User, Mail, Phone, MapPin, ExternalLink, Award, Star, ChevronRight, Github, Linkedin, Twitter, Menu, X } from 'lucide-react';

// 3D Floating Elements
const FloatingSkill = ({ position, skill, color, delay = 0 }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Box ref={meshRef} position={position} args={[1.2, 0.3, 0.3]}>
        <meshStandardMaterial color={color} />
        <Text
          position={[0, 0, 0.2]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="center"
          maxWidth={1}
        >
          {skill}
        </Text>
      </Box>
    </Float>
  );
};

const ExperienceOrb = ({ position, company, color, delay = 0 }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.7}>
      <Sphere ref={meshRef} position={position} args={[0.4]}>
        <meshStandardMaterial color={color} />
        <Text
          position={[0, 0, 0.5]}
          fontSize={0.1}
          color="white"
          anchorX="center"
          anchorY="center"
          maxWidth={0.8}
        >
          {company}
        </Text>
      </Sphere>
    </Float>
  );
};

const MiniScene = ({ type, data }) => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} />
      
      {type === 'skills' && 
        Object.entries(data.skills || {}).flatMap(([category, skills], categoryIndex) =>
          (skills || []).slice(0, 4).map((skill, skillIndex) => (
            <FloatingSkill
              key={skill}
              position={[
                Math.cos((skillIndex / 4) * Math.PI * 2) * 3,
                skillIndex * 0.5 - 1,
                Math.sin((skillIndex / 4) * Math.PI * 2) * 3
              ]}
              skill={skill}
              color={categoryIndex === 0 ? "#3b82f6" : categoryIndex === 1 ? "#8b5cf6" : "#06b6d4"}
              delay={skillIndex * 0.5}
            />
          ))
        )
      }
      
      {type === 'experience' &&
        (data.experience || []).map((exp, index) => (
          <ExperienceOrb
            key={exp.company}
            position={[
              Math.cos((index / (data.experience?.length || 1)) * Math.PI * 2) * 2.5,
              index * 0.8 - 1,
              Math.sin((index / (data.experience?.length || 1)) * Math.PI * 2) * 2.5
            ]}
            company={exp.company?.split(' ')[0] || 'Company'}
            color={index === 0 ? "#06b6d4" : index === 1 ? "#8b5cf6" : "#3b82f6"}
            delay={index * 0.8}
          />
        ))
      }
    </Canvas>
  );
};

const ModernGlassPortfolio = ({data = {}}) => {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const stats = [
    { icon: Briefcase, value: (data.experience || []).length + '+', label: 'Years Experience' },
    { icon: FolderGit2, value: (data.projects || []).length + '+', label: 'Projects Completed' },
    { icon: Award, value: (data.achievements?.[0]?.number || "99%"), label: 'Client Satisfaction' },
    { icon: User, value: (data.achievements?.[3]?.number || "10+"), label: 'Team Members' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {data.contact?.email?.split('@')[0] || 'Developer'}
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              {['Home', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item.toLowerCase())}
                  className={`font-medium transition-all duration-300 ${
                    activeSection === item.toLowerCase()
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-600 hover:text-blue-500'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            {['Home', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveSection(item.toLowerCase());
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-6 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <span className={`font-medium ${
                  activeSection === item.toLowerCase() ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  {item}
                </span>
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl">
            <User className="w-16 h-16 text-white" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Full Stack
            </span>
            <br />
            <span className="text-gray-900">Developer</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Creating beautiful, functional web applications with modern technologies and user-centered design
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setActiveSection('projects')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg"
            >
              View My Work
              <ChevronRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-semibold border border-gray-300 hover:border-blue-300 transition-all duration-300 hover:scale-105 shadow-lg">
              Download CV
            </button>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      {activeSection === 'experience' && (
        <section className="py-20 px-6 bg-white/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Experience</h2>
              <p className="text-xl text-gray-600">My journey through the tech industry</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                {(data.experience || []).map((exp, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-500 hover:scale-105"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{exp.role}</h3>
                        <p className="text-blue-600 font-semibold text-lg mb-1">{exp.company}</p>
                        <p className="text-gray-500 mb-4">{exp.location} • {exp.period}</p>
                        <ul className="space-y-3">
                          {(exp.achievements || []).map((achievement, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-700">
                              <Star className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl p-8 text-white shadow-2xl">
                <div className="h-96 rounded-2xl overflow-hidden bg-black/20">
                  <MiniScene type="experience" data={data} />
                </div>
                <div className="mt-6">
                  <h3 className="text-2xl font-bold mb-4">Career Journey</h3>
                  <p className="text-blue-100 leading-relaxed">
                    Each sphere represents a company where I've contributed and grown professionally. 
                    The orbital paths show the progression of my career journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {activeSection === 'projects' && (
        <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
              <p className="text-xl text-gray-600">Some of my recent work and innovations</p>
            </div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {(data.projects || []).map((project, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-6 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <FolderGit2 className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(project.tech || []).map((tech, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm border border-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {(project.highlights || []).map((highlight, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm border border-blue-200 flex items-center gap-1"
                      >
                        <Award className="w-3 h-3" />
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-2 border border-gray-300 group-hover:border-blue-300">
                    View Case Study
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {activeSection === 'skills' && (
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Technical Skills</h2>
              <p className="text-xl text-gray-600">Technologies and tools I work with</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl p-8 text-white shadow-2xl">
                <div className="h-96 rounded-2xl overflow-hidden bg-black/20">
                  <MiniScene type="skills"  data={data}/>
                </div>
                <div className="mt-6">
                  <h3 className="text-2xl font-bold mb-4">Skills Visualization</h3>
                  <p className="text-green-100 leading-relaxed">
                    Each floating element represents a technology in my toolkit. 
                    The colors indicate different categories of expertise.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                {Object.entries(data.skills || {}).map(([category, skills]) => (
                  <div key={category} className="bg-white rounded-3xl p-6 shadow-xl border border-gray-200/50">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{category}</h3>
                    <div className="flex flex-wrap gap-3">
                      {(skills || []).map((skill, i) => (
                        <span 
                          key={i}
                          className="px-4 py-2 bg-gray-50 text-gray-700 rounded-xl text-sm border border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all duration-300 cursor-pointer"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {activeSection === 'contact' && (
        <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Let's Work Together</h2>
            
            <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-200/50">
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                {data.contact?.message || 'Let\'s work together on your next project'}
              </p>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="font-semibold text-gray-900">{data.contact?.email || 'email@example.com'}</div>
                  <div className="text-gray-600 text-sm">Email</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-2xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="font-semibold text-gray-900">{data.contact?.phone || '+1234567890'}</div>
                  <div className="text-gray-600 text-sm">Phone</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-2xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="font-semibold text-gray-900">{data.contact?.location || 'Location'}</div>
                  <div className="text-gray-600 text-sm">Location</div>
                </div>
              </div>

              <div className="flex gap-4 justify-center mb-8">
                {(data.contact?.socials || []).map((social, index) => {
                  const Icon = social === 'GitHub' ? Github : 
                              social === 'LinkedIn' ? Linkedin : Twitter;
                  return (
                    <a
                      key={social}
                      href="#"
                      className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center hover:bg-blue-100 hover:text-blue-600 transition-all duration-300 hover:scale-110"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>

              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 shadow-lg">
                Start a Conversation
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Home Section - Default */}
      {activeSection === 'home' && (
        <section className="py-20 px-6 bg-gradient-to-br from-white to-blue-50">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">What I Do</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {(data.services || []).map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-600">{data.footer?.text || '© 2024 All rights reserved'}</p>
        </div>
      </footer>
    </div>
  );
};

export default ModernGlassPortfolio;