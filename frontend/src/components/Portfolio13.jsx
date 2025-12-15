import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal,
  ChevronRight,
  Folder,
  File,
  Code2,
  Server,
  Database,
  Cpu,
  Network,
  Zap,
  Download,
  Mail,
  ExternalLink,
  Play,
  Pause,
  Square
} from 'lucide-react';

const TerminalPortfolio = ({data = {}}) => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeDirectory, setActiveDirectory] = useState('~');
  const [cursorVisible, setCursorVisible] = useState(true);
  const terminalRef = useRef(null);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  // Initial output
  useEffect(() => {
    setOutput([
      { type: 'system', content: 'Welcome to DEV_TERMINAL v2.1.4' },
      { type: 'system', content: 'Type "help" for available commands' },
      { type: 'system', content: '----------------------------------------' },
      { type: 'prompt', content: 'portfolio --init' }
    ]);
  }, []);

  const commands = {
    help: () => [
      'Available commands:',
      '  ls, dir          - List projects',
      '  skills           - Show technical skills',
      '  services         - Display services',
      '  experience       - Show work experience',
      '  contact          - Contact information',
      '  clear            - Clear terminal',
      '  about            - About information',
      '  resume           - Download resume'
    ],
    ls: () => [
      'Projects directory:',
      '📁 neural-network-dashboard/',
      '📁 metaverse-hub/',
      '📁 quantum-pay/',
      '📁 data-stream/',
      '📁 cloud-sync/',
      '📁 sound-wave/'
    ],
    dir: () => commands.ls(),
    skills: () => {
      const skillsOutput = ['Technical Skills:'];
      if (data?.skills) {
        Object.entries(data.skills).forEach(([category, skills]) => {
          skillsOutput.push(`\n${category}:`);
          (skills || []).forEach(skill => {
            skillsOutput.push(`  ▫ ${skill}`);
          });
        });
      }
      return skillsOutput;
    },
    services: () => {
      const servicesOutput = ['Services Offered:'];
      (data?.services || []).forEach(service => {
        servicesOutput.push(`\n⚡ ${service?.title || 'Service'}`);
        servicesOutput.push(`  ${service?.desc || 'Description'}`);
      });
      return servicesOutput;
    },
    experience: () => {
      const expOutput = ['Work Experience:'];
      (data?.experience || []).forEach(exp => {
        expOutput.push(`\n🏢 ${exp?.role || 'Role'}`);
        expOutput.push(`  ${exp?.company || 'Company'} | ${exp?.period || 'Period'}`);
        if (exp?.location) {
          expOutput.push(`  Location: ${exp.location}`);
        }
        (exp?.achievements || []).forEach(achievement => {
          expOutput.push(`  ▸ ${achievement}`);
        });
      });
      return expOutput;
    },
    contact: () => [
      'Contact Information:',
      `📧 Email: ${data?.contact?.email || 'contact@example.com'}`,
      `📞 Phone: ${data?.contact?.phone || 'N/A'}`,
      `📍 Location: ${data?.contact?.location || 'Location'}`,
      '',
      'Social Links:',
      ...(data?.contact?.socials || []).map(social => `  🔗 ${social}`)
    ],
    about: () => [
      'About:',
      'Full-stack developer specializing in cutting-edge',
      'technology solutions. Passionate about creating',
      'efficient, scalable, and user-friendly applications.',
      '',
      'Key Achievements:',
      ...(data?.achievements || []).map(ach => `  ✅ ${ach?.number || '0'} ${ach?.label || 'Achievement'}`)
    ],
    resume: () => {
      window.open('#', '_blank');
      return ['📄 Opening resume download...'];
    },
    clear: () => {
      setOutput([]);
      return [];
    }
  };

  const handleCommand = async (e) => {
    if (e.key === 'Enter' && command.trim()) {
      const cmd = command.trim().toLowerCase();
      setIsProcessing(true);
      
      // Add user command to output
      setOutput(prev => [...prev, { type: 'user', content: `${activeDirectory} $ ${command}` }]);

      // Process command
      setTimeout(() => {
        if (commands[cmd]) {
          const result = commands[cmd]();
          setOutput(prev => [...prev, ...result.map(content => ({ type: 'system', content }))]);
        } else if (cmd.startsWith('cd ')) {
          const dir = cmd.slice(3);
          setActiveDirectory(dir);
          setOutput(prev => [...prev, { type: 'system', content: `Changed directory to ${dir}` }]);
        } else if (cmd === 'neural-network-dashboard' || cmd === './neural-network-dashboard') {
          const project = (data?.projects || [])[0];
          if (project) {
            setOutput(prev => [
              ...prev,
              { type: 'system', content: `Project: ${project?.title || 'Project'}` },
              { type: 'system', content: `Description: ${project?.description || 'No description'}` },
              { type: 'system', content: 'Tech Stack:' },
              ...(project?.tech || []).map(tech => ({ type: 'system', content: `  ▸ ${tech}` })),
              { type: 'system', content: 'Highlights:' },
              ...(project?.highlights || []).map(h => ({ type: 'system', content: `  ✅ ${h}` }))
            ]);
          }
        } else {
          setOutput(prev => [
            ...prev,
            { type: 'error', content: `Command not found: ${cmd}` },
            { type: 'system', content: 'Type "help" for available commands' }
          ]);
        }
        
        setCommand('');
        setIsProcessing(false);
      }, 500);
    }
  };

  // Transform data for visual components
  const projects = (data?.projects || []).map((project, index) => ({
    ...project,
    id: index + 1,
    title: project?.title || 'Untitled Project',
    description: project?.description || 'No description available',
    tech: project?.tech || [],
    highlights: project?.highlights || [],
    link: project?.link || '#',
    icon: [Cpu, Network, Server, Database, Zap, Code2][index] || Code2
  }));

  const stats = data?.achievements || [];

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono overflow-hidden">
      {/* Terminal Header */}
      <div className="sticky top-0 w-full bg-gray-800 border-b border-gray-700 z-50">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Terminal className="text-green-400" size={20} />
            <span className="text-white font-bold">DEV_TERMINAL</span>
          </div>
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Visual Dashboard */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-green-400 transition-colors"
              >
                <div className="text-2xl font-bold text-white mb-2">{stat?.number || '0'}</div>
                <div className="text-green-400 text-sm">{stat?.label || 'Stat'}</div>
              </div>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="mb-12">
            <h2 className="text-xl text-white mb-6 flex items-center gap-3">
              <Folder className="text-green-400" size={20} />
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => {
                const ProjectIcon = project.icon;
                return (
                  <div
                    key={project.id}
                    className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-green-400 transition-all hover:scale-105"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <ProjectIcon className="text-green-400" size={20} />
                      <h3 className="text-white font-bold">{project.title}</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    {project.tech && project.tech.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.slice(0, 3).map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-700 text-green-400 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <button className="w-full py-2 bg-gray-700 hover:bg-green-400 hover:text-gray-900 transition-all rounded text-sm font-bold flex items-center justify-center gap-2">
                      <ExternalLink size={14} />
                      Execute Project
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Terminal Interface */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            {/* Terminal Header */}
            <div className="bg-gray-900 px-6 py-3 border-b border-gray-700 flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-400 text-sm">terminal --portfolio</span>
            </div>

            {/* Terminal Output */}
            <div
              ref={terminalRef}
              className="h-96 overflow-y-auto p-6 space-y-2"
            >
              {output.map((line, index) => (
                <div
                  key={index}
                  className={`${
                    line.type === 'error' ? 'text-red-400' :
                    line.type === 'user' ? 'text-cyan-400' :
                    line.type === 'prompt' ? 'text-yellow-400' :
                    'text-green-400'
                  } text-sm font-mono whitespace-pre-wrap`}
                >
                  {line.content}
                </div>
              ))}
              
              {/* Command Input */}
              <div className="flex items-center gap-2">
                <span className="text-cyan-400">{activeDirectory} $</span>
                <div className="flex-1 flex items-center">
                  <input
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyDown={handleCommand}
                    className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono"
                    placeholder={isProcessing ? "Processing..." : "Type command..."}
                    disabled={isProcessing}
                    autoFocus
                  />
                  {cursorVisible && !isProcessing && (
                    <div className="w-2 h-4 bg-green-400 animate-pulse" />
                  )}
                </div>
                {isProcessing && (
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Commands */}
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="text-gray-400 text-sm">Quick commands:</span>
            {['ls', 'skills', 'services', 'experience', 'contact', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  setCommand(cmd);
                  // Trigger command execution
                  const event = new KeyboardEvent('keydown', { key: 'Enter' });
                  document.dispatchEvent(event);
                }}
                className="px-3 py-1 bg-gray-700 hover:bg-green-400 hover:text-gray-900 transition-all rounded text-xs font-bold"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-gray-800 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-gray-400 text-sm mb-4">
            {data?.footer?.text || '© 2025 All rights reserved'}
          </div>
          <div className="text-gray-500 text-xs">
            Terminal Interface • Developer Portfolio • Interactive Experience
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TerminalPortfolio;