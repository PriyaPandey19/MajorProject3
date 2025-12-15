import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Code2, Cpu, Database, Network, Zap, Sparkles, Globe, Shield, Cog, Mail } from 'lucide-react';

const CyberTerminalPortfolio = ({data = {}}) => {
  const [activeSystem, setActiveSystem] = useState('core');
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [command, setCommand] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalRef = useRef(null);

  // System modules based on portfolio data
  const systems = {
    core: { 
      name: 'CORE SYSTEM', 
      icon: Cpu, 
      color: 'text-cyan-400',
      description: 'Main Developer Profile' 
    },
    experience: { 
      name: 'EXPERIENCE MODULE', 
      icon: Network, 
      color: 'text-green-400',
      description: 'Professional Timeline' 
    },
    projects: { 
      name: 'PROJECTS DATABASE', 
      icon: Database, 
      color: 'text-purple-400',
      description: 'Portfolio Projects' 
    },
    skills: { 
      name: 'SKILLS MATRIX', 
      icon: Code2, 
      color: 'text-yellow-400',
      description: 'Technical Capabilities' 
    },
    security: { 
      name: 'SECURITY CLEARANCE', 
      icon: Shield, 
      color: 'text-red-400',
      description: 'Contact Access' 
    }
  };

  // Initialize terminal
  useEffect(() => {
    addToTerminal('system', 'INITIALIZING CYBER PORTFOLIO SYSTEM...');
    addToTerminal('success', 'System boot sequence complete');
    addToTerminal('info', 'Type "help" for available commands');
    addToTerminal('prompt', 'guest@portfolio:~$ _');
  }, []);

  const addToTerminal = (type, message) => {
    setTerminalOutput(prev => [...prev, { type, message, timestamp: Date.now() }]);
  };

  const executeCommand = async (cmd) => {
    if (!cmd.trim()) return;
    
    setIsProcessing(true);
    addToTerminal('command', `guest@portfolio:~$ ${cmd}`);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const cleanCmd = cmd.toLowerCase().trim();
    
    switch(cleanCmd) {
      case 'help':
        addToTerminal('system', 'AVAILABLE COMMANDS:');
        addToTerminal('system', '  core        - Access main profile');
        addToTerminal('system', '  experience  - View professional history');
        addToTerminal('system', '  projects    - Browse portfolio projects');
        addToTerminal('system', '  skills      - Display technical skills');
        addToTerminal('system', '  contact     - Request access clearance');
        addToTerminal('system', '  clear       - Clear terminal');
        addToTerminal('system', '  help        - Show this message');
        break;
      
      case 'core':
        setActiveSystem('core');
        addToTerminal('success', 'ACCESS GRANTED: CORE SYSTEM');
        break;
      
      case 'experience':
        setActiveSystem('experience');
        addToTerminal('success', 'ACCESS GRANTED: EXPERIENCE MODULE');
        break;
      
      case 'projects':
        setActiveSystem('projects');
        addToTerminal('success', 'ACCESS GRANTED: PROJECTS DATABASE');
        break;
      
      case 'skills':
        setActiveSystem('skills');
        addToTerminal('success', 'ACCESS GRANTED: SKILLS MATRIX');
        break;
      
      case 'contact':
        setActiveSystem('security');
        addToTerminal('success', 'ACCESSING SECURITY CLEARANCE PROTOCOL...');
        break;
      
      case 'clear':
        setTerminalOutput([]);
        break;
      
      default:
        addToTerminal('error', `COMMAND NOT FOUND: ${cmd}`);
        addToTerminal('info', 'Type "help" for available commands');
    }
    
    addToTerminal('prompt', 'guest@portfolio:~$ _');
    setCommand('');
    setIsProcessing(false);
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    executeCommand(command);
  };

  // Scroll to bottom of terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono overflow-hidden">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-green-500/30 bg-gray-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Terminal className="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <div className="text-lg font-bold text-green-400">CYBER_PORTFOLIO.exe</div>
                <div className="text-green-500 text-sm">v2.0.1 - ONLINE</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div className="text-green-400 text-sm">SYSTEM ACTIVE</div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* System Navigation */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-gray-800/50 border border-green-500/30 rounded-lg p-4">
              <h3 className="text-green-400 font-bold mb-4 text-lg">SYSTEM MODULES</h3>
              <div className="space-y-2">
                {Object.entries(systems).map(([key, system]) => {
                  const Icon = system.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setActiveSystem(key);
                        addToTerminal('system', `ACCESSING: ${system.name}`);
                      }}
                      className={`w-full text-left p-3 rounded border transition-all duration-300 ${
                        activeSystem === key 
                          ? 'bg-green-500/20 border-green-400 text-green-400' 
                          : 'bg-gray-800/30 border-gray-600 text-gray-400 hover:border-green-500/50 hover:text-green-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <div>
                          <div className="font-bold text-sm">{system.name}</div>
                          <div className="text-xs opacity-75">{system.description}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-gray-800/50 border border-green-500/30 rounded-lg p-4">
              <h3 className="text-green-400 font-bold mb-3">SYSTEM STATUS</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">CPU Load:</span>
                  <span className="text-green-400">24%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Memory:</span>
                  <span className="text-green-400">1.2GB/4GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Uptime:</span>
                  <span className="text-green-400">2:34:16</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Security:</span>
                  <span className="text-green-400">LEVEL 3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800/50 border border-green-500/30 rounded-lg overflow-hidden">
              {/* Terminal Header */}
              <div className="bg-gray-900 border-b border-green-500/30 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-green-400 text-sm">terminal — guest@portfolio</div>
              </div>

              {/* Terminal Output */}
              <div 
                ref={terminalRef}
                className="h-96 p-4 overflow-y-auto bg-black/50 font-mono text-sm leading-relaxed"
              >
                {terminalOutput.map((line, index) => (
                  <div 
                    key={index}
                    className={`${
                      line.type === 'error' ? 'text-red-400' :
                      line.type === 'success' ? 'text-green-400' :
                      line.type === 'system' ? 'text-cyan-400' :
                      line.type === 'command' ? 'text-yellow-400' :
                      'text-green-400'
                    } ${line.type === 'prompt' ? 'animate-pulse' : ''}`}
                  >
                    {line.message}
                  </div>
                ))}
                {isProcessing && (
                  <div className="text-green-400 animate-pulse">Processing...</div>
                )}
              </div>

              {/* Command Input */}
              <div className="border-t border-green-500/30">
                <div className="flex items-center px-4 py-3 bg-gray-900/50">
                  <span className="text-green-400 mr-2">guest@portfolio:~$</span>
                  <input
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        executeCommand(command);
                      }
                    }}
                    className="flex-1 bg-transparent text-green-400 outline-none font-mono"
                    placeholder="Type command..."
                    disabled={isProcessing}
                  />
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      executeCommand(command);
                    }}
                    className="ml-2 px-3 py-1 bg-green-500 text-gray-900 rounded text-sm font-bold hover:bg-green-400 transition-colors"
                    disabled={isProcessing}
                  >
                    EXECUTE
                  </button>
                </div>
              </div>
            </div>

            {/* Active System Display */}
            <div className="mt-6 bg-gray-800/50 border border-green-500/30 rounded-lg p-6">
              <SystemDisplay 
                system={activeSystem} 
                data={data} 
                systems={systems} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// System Display Components
const SystemDisplay = ({ system, data, systems }) => {
  const SystemIcon = systems[system].icon;

  switch(system) {
    case 'core':
      return (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <SystemIcon className="w-8 h-8 text-cyan-400" />
            <div>
              <h2 className="text-2xl font-bold text-cyan-400">{systems.core.name}</h2>
              <p className="text-gray-400">Developer Profile & System Overview</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-900/50 p-4 rounded border border-cyan-500/30">
                <h3 className="text-cyan-400 font-bold mb-2">PROFILE DATA</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-400">Status:</span> <span className="text-cyan-400">ACTIVE</span></div>
                  <div><span className="text-gray-400">Specialization:</span> <span className="text-cyan-400">Full Stack Development</span></div>
                  <div><span className="text-gray-400">Experience:</span> <span className="text-cyan-400">{(data.experience || []).length}+ Years</span></div>
                </div>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded border border-green-500/30">
                <h3 className="text-green-400 font-bold mb-2">ACHIEVEMENT METRICS</h3>
                <div className="grid grid-cols-2 gap-3">
                  {(data.achievements || []).map((achievement, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xl font-bold text-green-400">{achievement.number}</div>
                      <div className="text-xs text-gray-400">{achievement.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded border border-purple-500/30">
              <h3 className="text-purple-400 font-bold mb-3">SERVICES ACTIVE</h3>
              <div className="space-y-2">
                {(data.services || []).map((service, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-800/50 rounded transition-colors">
                    <Zap className="w-4 h-4 text-purple-400" />
                    <div>
                      <div className="text-purple-400 font-bold text-sm">{service.title}</div>
                      <div className="text-gray-400 text-xs">{service.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    case 'experience':
      return (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <SystemIcon className="w-8 h-8 text-green-400" />
            <div>
              <h2 className="text-2xl font-bold text-green-400">{systems.experience.name}</h2>
              <p className="text-gray-400">Professional Career Timeline</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {(data.experience || []).map((exp, index) => (
              <div key={index} className="bg-gray-900/50 p-4 rounded border border-green-500/30">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-green-400 font-bold text-lg">{exp.role}</h3>
                    <div className="text-cyan-400">{exp.company}</div>
                    <div className="text-gray-400 text-sm">{exp.location} | {exp.period}</div>
                  </div>
                  <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded text-sm font-bold">
                    ACTIVE
                  </div>
                </div>
                
                <div className="space-y-2">
                  {(exp.achievements || []).map((achievement, i) => (
                    <div key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                      <Sparkles className="w-3 h-3 text-green-400 mt-1 flex-shrink-0" />
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'projects':
      return (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <SystemIcon className="w-8 h-8 text-purple-400" />
            <div>
              <h2 className="text-2xl font-bold text-purple-400">{systems.projects.name}</h2>
              <p className="text-gray-400">Portfolio Project Repository</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {(data.projects || []).map((project, index) => (
              <div key={index} className="bg-gray-900/50 p-4 rounded border border-purple-500/30">
                <h3 className="text-purple-400 font-bold text-lg mb-3">{project.title}</h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {(project.tech || []).map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs border border-purple-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {(project.highlights || []).map((highlight, i) => (
                    <span key={i} className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs border border-cyan-500/30 flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'skills':
      return (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <SystemIcon className="w-8 h-8 text-yellow-400" />
            <div>
              <h2 className="text-2xl font-bold text-yellow-400">{systems.skills.name}</h2>
              <p className="text-gray-400">Technical Capability Assessment</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(data.skills || {}).map(([category, skills], index) => (
              <div key={category} className="bg-gray-900/50 p-4 rounded border border-yellow-500/30">
                <h3 className="text-yellow-400 font-bold mb-3">{category.toUpperCase()}</h3>
                <div className="space-y-2">
                  {(skills || []).map((skill, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                      <span className="text-gray-300 text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'security':
      return (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <SystemIcon className="w-8 h-8 text-red-400" />
            <div>
              <h2 className="text-2xl font-bold text-red-400">{systems.security.name}</h2>
              <p className="text-gray-400">Contact & Communication Protocol</p>
            </div>
          </div>
          
          <div className="bg-gray-900/50 p-6 rounded border border-red-500/30">
            <div className="text-center mb-6">
              <div className="text-red-400 font-bold text-lg mb-2">SECURITY LEVEL 3 ACCESS REQUIRED</div>
              <div className="text-gray-400 text-sm">Encrypted communication channel established</div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <Mail className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <div className="text-red-400 font-bold">{data.contact?.email || 'email@example.com'}</div>
                <div className="text-gray-400 text-sm">Primary Channel</div>
              </div>
              <div className="text-center">
                <Cog className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <div className="text-red-400 font-bold">{data.contact?.phone || '+1234567890'}</div>
                <div className="text-gray-400 text-sm">Secure Line</div>
              </div>
              <div className="text-center">
                <Globe className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <div className="text-red-400 font-bold">{data.contact?.location || 'Location'}</div>
                <div className="text-gray-400 text-sm">Operations Base</div>
              </div>
            </div>
            
            <div className="text-center">
              <button className="px-6 py-3 bg-red-500 text-white rounded-lg font-bold hover:bg-red-400 transition-colors border border-red-400">
                INITIATE CONTACT PROTOCOL
              </button>
            </div>
          </div>
        </div>
      );

    default:
      return <div>System offline...</div>;
  }
};

export default CyberTerminalPortfolio;