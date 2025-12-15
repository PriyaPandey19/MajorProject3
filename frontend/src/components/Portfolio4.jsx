import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Sphere, Box, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, ChevronRight, Star, Award, Code, User, Briefcase, BookOpen, Database, Cloud } from 'lucide-react';

// 3D Components
const FloatingElement = ({ position, children, color = "#3b82f6", type = "box" }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  if (type === "sphere") {
    return (
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <Sphere ref={meshRef} position={position} args={[0.3]}>
          <meshStandardMaterial color={color} />
          {children}
        </Sphere>
      </Float>
    );
  }

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Box ref={meshRef} position={position} args={[1, 0.2, 0.2]}>
        <meshStandardMaterial color={color} />
        {children}
      </Box>
    </Float>
  );
};

const ThreeDScene = ({ activeSection, data }) => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }} className="w-full h-full">
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls enableZoom={false} enablePan={false} />
      
      {/* Central Sphere */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <Sphere position={[0, 0, 0]} args={[1]}>
          <meshStandardMaterial color="#2563eb" />
        </Sphere>
      </Float>

      {/* Skills */}
      {activeSection === 'skills' && 
        Object.entries(data.skills || {}).flatMap(([category, skills], categoryIndex) =>
          (skills || []).slice(0, 8).map((skill, skillIndex) => (
            <FloatingElement
              key={`${category}-${skill}`}
              position={[
                Math.cos((skillIndex / 8) * Math.PI * 2) * 4,
                skillIndex * 0.3 - 1,
                Math.sin((skillIndex / 8) * Math.PI * 2) * 4
              ]}
              color={categoryIndex === 0 ? "#ef4444" : categoryIndex === 1 ? "#06b6d4" : "#8b5cf6"}
            >
              <Text
                position={[0, 0, 0.15]}
                fontSize={0.08}
                color="white"
                anchorX="center"
                anchorY="center"
              >
                {skill.length > 8 ? skill.substring(0, 8) : skill}
              </Text>
            </FloatingElement>
          ))
        )
      }

      {/* Experience */}
      {activeSection === 'experience' &&
        (data.experience || []).map((exp, index) => (
          <FloatingElement
            key={index}
            position={[
              Math.cos((index / (data.experience?.length || 1)) * Math.PI * 2) * 3,
              index * 0.8 - 1,
              Math.sin((index / (data.experience?.length || 1)) * Math.PI * 2) * 3
            ]}
            type="sphere"
            color={index === 0 ? "#06b6d4" : "#8b5cf6"}
          >
            <Text
              position={[0, 0, 0.35]}
              fontSize={0.06}
              color="white"
              anchorX="center"
              anchorY="center"
            >
              {exp.company?.split(' ')[0] || 'Company'}
            </Text>
          </FloatingElement>
        ))
      }

      {/* Projects */}
      {activeSection === 'projects' &&
        (data.projects || []).map((project, index) => (
          <FloatingElement
            key={index}
            position={[
              Math.cos((index / (data.projects?.length || 1)) * Math.PI * 2) * 3.5,
              index * 0.6 - 1,
              Math.sin((index / (data.projects?.length || 1)) * Math.PI * 2) * 3.5
            ]}
            color={index === 0 ? "#ef4444" : index === 1 ? "#06b6d4" : "#8b5cf6"}
          >
            <Text
              position={[0, 0, 0.15]}
              fontSize={0.07}
              color="white"
              anchorX="center"
              anchorY="center"
            >
              {project.title?.split(' ')[0] || 'Project'}
            </Text>
          </FloatingElement>
        ))
      }
    </Canvas>
  );
};

const CleanPortfolio3D = ({data = {}}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const skillCategories = Object.entries(data.skills || {}).map(([category, skills]) => ({
    name: category,
    skills: skills,
    icon: category === 'Programming' ? Code : 
          category === 'Frontend' ? Code :
          category === 'Backend' ? Cloud :
          category === 'Database' ? Database : BookOpen
  }));

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Code className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">
              {data.contact?.email?.split('@')[0] || 'Developer'}
            </span>
          </div>
          
          <div className="hidden md:flex gap-6">
            {['Home', 'Experience', 'Projects', 'Skills', 'Contact'].map(item => (
              <button
                key={item}
                onClick={() => setActiveSection(item.toLowerCase())}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeSection === item.toLowerCase() 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
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

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            {['Home', 'Experience', 'Projects', 'Skills', 'Contact'].map(item => (
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
      <section className="pt-20 pb-16 px-6 bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-8 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
            Full Stack
            <br />
            <span className="text-blue-600">Developer</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Building modern web applications with cutting-edge technologies
          </p>

          <div className="flex gap-6 justify-center mb-12">
            {(data.contact?.socials || []).map((social, index) => {
              const Icon = social === 'GitHub' ? Github : 
                          social === 'LinkedIn' ? Linkedin : Mail;
              return (
                <a
                  key={social}
                  href="#"
                  className="p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:scale-110 shadow-sm"
                >
                  <Icon className="w-5 h-5 text-gray-600 hover:text-blue-600" />
                </a>
              );
            })}
          </div>

          <button 
            onClick={() => setActiveSection('projects')}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto shadow-lg"
          >
            View My Work
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 3D Preview Section */}
      <section className="py-12 px-6 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Interactive 3D Portfolio
          </h2>
          <p className="text-gray-600">
            Navigate through sections to see 3D visualization of my skills and experience
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto h-64 bg-gradient-to-br from-blue-50 to-gray-100 rounded-xl border border-gray-200 overflow-hidden">
          <ThreeDScene activeSection={activeSection} data={data} />
        </div>
      </section>

      {/* Content Sections */}
      <div className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          
          {/* Experience Section */}
          {activeSection === 'experience' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Professional Experience</h2>
              <div className="space-y-6">
                {(data.experience || []).map((exp, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{exp.role}</h3>
                        <p className="text-blue-600 font-semibold mb-1">{exp.company}</p>
                        <p className="text-gray-500 text-sm mb-4">{exp.location} • {exp.period}</p>
                        <ul className="space-y-2">
                          {(exp.achievements || []).map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-700">
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
            </div>
          )}

          {/* Projects Section */}
          {activeSection === 'projects' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Featured Projects</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {(data.projects || []).map((project, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
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
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm border border-blue-200 flex items-center gap-1"
                        >
                          <Award className="w-3 h-3" />
                          {highlight}
                        </span>
                      ))}
                    </div>

                    <button className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 border border-gray-300">
                      View Project
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Section */}
          {activeSection === 'skills' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Technical Skills</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillCategories.map((category, index) => (
                  <div
                    key={category.name}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <category.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {(category.skills || []).map((skill, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-sm border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Section */}
          {activeSection === 'contact' && (
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>
              
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <p className="text-gray-600 mb-8 text-lg">
                  {data.contact?.message || 'Let\'s work together on your next project'}
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <Mail className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="font-semibold text-gray-900">{data.contact?.email || 'email@example.com'}</p>
                  </div>
                  <div className="text-center">
                    <Briefcase className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="font-semibold text-gray-900">{data.contact?.phone || '+1234567890'}</p>
                  </div>
                  <div className="text-center">
                    <User className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="font-semibold text-gray-900">{data.contact?.location || 'Location'}</p>
                  </div>
                </div>

                <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg">
                  Send Message
                </button>
              </div>
            </div>
          )}

          {/* Home Section */}
          {activeSection === 'home' && (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Welcome to My Portfolio</h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {(data.achievements || []).map((achievement, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{achievement.number}</div>
                    <div className="text-gray-600 font-medium">{achievement.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-600">{data.footer?.text || '© 2024 All rights reserved'}</p>
        </div>
      </footer>
    </div>
  );
};

export default CleanPortfolio3D;