import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Briefcase, FolderGit2, User, Mail, Phone, MapPin, ExternalLink, Award, Star, ChevronRight, Github, Linkedin, Twitter, Menu, X } from 'lucide-react';

const ElegantPortfolio = ({data = {}}) => {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { icon: Briefcase, value: (data.experience || []).length + '+', label: 'Years Experience' },
    { icon: FolderGit2, value: (data.projects || []).length + '+', label: 'Projects Completed' },
    { icon: Award, value: data.achievements?.[0]?.number || '99%', label: 'Client Satisfaction' },
    { icon: User, value: data.achievements?.[3]?.number || '10+', label: 'Team Members' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-medium text-gray-900">
                {data.contact?.email?.split('@')[0] || 'Developer'}
              </span>
            </motion.div>
            
            <div className="hidden md:flex items-center gap-8">
              {['Home', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ y: -1 }}
                  onClick={() => setActiveSection(item.toLowerCase())}
                  className={`relative text-sm font-medium transition-colors duration-300 ${
                    activeSection === item.toLowerCase()
                      ? 'text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <motion.div 
                      layoutId="navIndicator"
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-gray-900"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              {['Home', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ x: 4 }}
                  onClick={() => {
                    setActiveSection(item.toLowerCase());
                    setMenuOpen(false);
                  }}
                  className={`block w-full text-left px-6 py-3 text-sm font-medium transition-colors border-b border-gray-100 last:border-b-0 ${
                    activeSection === item.toLowerCase() ? 'text-gray-900 bg-gray-50' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="relative inline-block mb-12">
            <div className="w-28 h-28 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
              <User className="w-12 h-12 text-gray-700" />
            </div>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-light mb-6 leading-tight">
            <span className="text-gray-900">Full Stack</span>
            <br />
            <span className="text-gray-600">Developer</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Creating elegant digital solutions with modern technologies and thoughtful design principles
          </motion.p>

          {/* Stats */}
          <motion.div variants={containerVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-2xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  className="text-center group"
                >
                  <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <Icon className="w-5 h-5 text-gray-700" />
                  </div>
                  <div className="text-2xl font-light text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button 
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
              onClick={() => setActiveSection('projects')}
              className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 flex items-center gap-2"
            >
              View My Work
              <ChevronRight className="w-4 h-4" />
            </motion.button>
            <motion.button 
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
              className="px-8 py-3 bg-white text-gray-900 rounded-lg font-medium border border-gray-300 hover:border-gray-400 transition-all duration-300"
            >
              Download CV
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Experience Section */}
      {activeSection === 'experience' && (
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-light mb-4 text-gray-900">Professional Experience</h2>
              <p className="text-gray-600">My journey through technology and design</p>
            </motion.div>

            <div className="space-y-8">
              {(data.experience || []).map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-gray-700" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-medium text-gray-900 mb-2">{exp.role}</h3>
                          <p className="text-gray-700 font-medium mb-1">{exp.company}</p>
                          <p className="text-gray-500 text-sm">{exp.location} • {exp.period}</p>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {(exp.achievements || []).map((achievement, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + i * 0.1 }}
                            className="flex items-start gap-3 text-gray-600"
                          >
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                            {achievement}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {activeSection === 'projects' && (
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-light mb-4 text-gray-900">Featured Projects</h2>
              <p className="text-gray-600">Selected work that showcases my expertise</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(data.projects || []).map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
                    <FolderGit2 className="w-5 h-5 text-gray-700" />
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(project.tech || []).map((tech, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs border border-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {(project.highlights || []).map((highlight, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs border border-blue-200 flex items-center gap-1"
                      >
                        <Award className="w-3 h-3" />
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <motion.button 
                    whileHover={{ x: 2 }}
                    className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 text-sm"
                  >
                    View Details
                    <ExternalLink className="w-3 h-3" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {activeSection === 'skills' && (
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-light mb-4 text-gray-900">Technical Skills</h2>
              <p className="text-gray-600">Technologies and tools I work with</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(data.skills || {}).map(([category, skills], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Code2 className="w-4 h-4 text-gray-700" />
                    </div>
                    <h3 className="font-medium text-gray-900">{category}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {(skills || []).map((skill, i) => (
                      <motion.span 
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm border border-gray-200 hover:bg-gray-200 transition-all duration-300 cursor-pointer"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {activeSection === 'contact' && (
        <section className="py-20 px-6 bg-white">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-light mb-8 text-gray-900">Let's Work Together</h2>
              
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                <p className="text-gray-600 mb-12 max-w-md mx-auto leading-relaxed">
                  {data.contact?.message || 'Let\'s work together on your next project'}
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-gray-700" />
                    </div>
                    <div className="font-medium text-gray-900">{data.contact?.email || 'email@example.com'}</div>
                    <div className="text-gray-600 text-sm">Email</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-gray-700" />
                    </div>
                    <div className="font-medium text-gray-900">{data.contact?.phone || '+1234567890'}</div>
                    <div className="text-gray-600 text-sm">Phone</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-gray-700" />
                    </div>
                    <div className="font-medium text-gray-900">{data.contact?.location || 'Location'}</div>
                    <div className="text-gray-600 text-sm">Location</div>
                  </div>
                </div>

                <div className="flex gap-3 justify-center mb-8">
                  {(data.contact?.socials || []).map((social, index) => {
                    const Icon = social === 'GitHub' ? Github : 
                                social === 'LinkedIn' ? Linkedin : Twitter;
                    return (
                      <motion.a
                        key={social}
                        whileHover={{ y: -1, scale: 1.05 }}
                        href="#"
                        className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-all duration-300"
                      >
                        <Icon className="w-4 h-4 text-gray-700" />
                      </motion.a>
                    );
                  })}
                </div>

                <motion.button 
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                  className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all duration-300"
                >
                  Start a Conversation
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Home Section - Default */}
      {activeSection === 'home' && (
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-light mb-12 text-gray-900"
            >
              Services & Expertise
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {(data.services || []).map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -2 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-gray-700" />
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400"
          >
            {data.footer?.text || '© 2024 All rights reserved'}
          </motion.p>
        </div>
      </footer>
    </div>
  );
};

export default ElegantPortfolio;