import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, 
  Binary, 
  Network, 
  Shield,
  Lock,
  Terminal,
  Code2,
  Database,
  Cloud,
  Zap,
  Eye,
  Key,
  Scan,
  Bug,
  Server,
  Wifi,
  Download,
  Mail,
  MapPin,
  ExternalLink
} from 'lucide-react';

const CyberGridPortfolio = ({data = {}}) => {
  const [activeSystem, setActiveSystem] = useState('main');
  const [accessLevel, setAccessLevel] = useState('LEVEL_1');
  const [isScanning, setIsScanning] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState([]);
  const gridRef = useRef(null);
  const scanLineRef = useRef(null);

  // Animated grid background
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const animateGrid = () => {
      const time = Date.now() * 0.001;
      grid.style.backgroundPosition = `${time * 20}px ${time * 10}px`;
      requestAnimationFrame(animateGrid);
    };
    animateGrid();
  }, []);

  // Scanning animation
  useEffect(() => {
    const scanLine = scanLineRef.current;
    if (!scanLine) return;

    if (isScanning) {
      scanLine.style.animation = 'scan 2s linear infinite';
    } else {
      scanLine.style.animation = 'none';
    }
  }, [isScanning]);

  // Initialize terminal
  useEffect(() => {
    setTerminalOutput([
      'SYSTEM BOOT: CYBER_PORTFOLIO v3.1.4',
      'SECURITY: ENCRYPTION ACTIVE',
      'ACCESS: ' + accessLevel,
      'READY FOR QUERY...'
    ]);
  }, [accessLevel]);

  // Transform data to cyber format
  const systems = (data?.projects || []).map((project, index) => ({
    id: index + 1,
    name: project?.title || 'SYSTEM_' + (index + 1),
    description: project?.description || 'No description available',
    tech: project?.tech || [],
    status: 'ONLINE',
    security: ['HIGH', 'MEDIUM', 'CRITICAL'][index % 3],
    icon: [Server, Database, Cloud, Network, Cpu, Terminal][index] || Server,
    threats: project?.highlights || [],
    ports: [3000 + index, 8080 + index, 5432 + index]
  }));

  const modules = (data?.services || []).map((service, index) => ({
    id: index + 1,
    name: service?.title || 'MODULE_' + (index + 1),
    description: service?.desc || 'Module description',
    status: 'ACTIVE',
    icon: [Shield, Lock, Key, Scan, Bug, Zap][index] || Shield
  }));

  const stats = (data?.achievements || []).map((stat, index) => ({
    number: stat?.number || '0',
    label: stat?.label || 'Stat',
    unit: ['UNITS', 'POINTS', 'NODES', 'ZONES'][index] || 'UNITS'
  }));

  const skills = data?.skills ? Object.entries(data.skills) : [];

  const initiateScan = () => {
    setIsScanning(true);
    setTerminalOutput(prev => [
      ...prev,
      'INITIATING SYSTEM SCAN...',
      'SCANNING PORTS: 3000-3010',
      'ENCRYPTION: AES-256 ACTIVE',
      'THREAT LEVEL: LOW',
      'SCAN COMPLETE - SYSTEMS SECURE'
    ]);
    setTimeout(() => setIsScanning(false), 2000);
  };

  const elevateAccess = () => {
    const levels = ['LEVEL_1', 'LEVEL_2', 'LEVEL_3', 'ADMIN'];
    const currentIndex = levels.indexOf(accessLevel);
    const nextLevel = levels[(currentIndex + 1) % levels.length];
    setAccessLevel(nextLevel);
    setTerminalOutput(prev => [
      ...prev,
      `ACCESS ELEVATED: ${nextLevel}`,
      `PRIVILEGES: ${nextLevel === 'ADMIN' ? 'FULL' : 'PARTIAL'}`,
      'SYSTEMS: UNLOCKED'
    ]);
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-x-hidden">
      {/* Animated Grid Background */}
      <div 
        ref={gridRef}
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 0, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 0, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Scan Line */}
      <div 
        ref={scanLineRef}
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 255, 0, 0.3) 50%, transparent 100%)',
          height: '2px'
        }}
      />

      {/* Header */}
      <header className="sticky top-0 w-full z-50 bg-black/90 backdrop-blur-lg border-b border-green-400/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border-2 border-green-400 rounded-lg flex items-center justify-center">
                <Cpu className="text-green-400" size={20} />
              </div>
              <div>
                <div className="text-lg font-bold tracking-wider">CYBER_SYSTEMS</div>
                <div className="text-green-400/60 text-xs">ACCESS: {accessLevel}</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={initiateScan}
                className="px-4 py-2 border border-green-400 text-green-400 hover:bg-green-400/10 transition-all text-sm font-bold"
              >
                <Scan className="inline w-4 h-4 mr-2" />
                SCAN
              </button>
              <button 
                onClick={elevateAccess}
                className="px-4 py-2 bg-green-400 text-black hover:bg-green-300 transition-all text-sm font-bold"
              >
                <Key className="inline w-4 h-4 mr-2" />
                ELEVATE
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="pt-24 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="mb-16 text-center">
            <div className="border-2 border-green-400 p-8 relative">
              <div className="absolute -top-3 left-6 bg-black px-4 text-green-400 text-sm font-bold">
                SYSTEM_STATUS
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">
                <span className="text-green-400">CYBER</span>
                <span className="text-white">GRID</span>
              </h1>
              
              <p className="text-green-400/80 mb-6 text-lg tracking-wide">
                SECURE DIGITAL INFRASTRUCTURE & SYSTEMS DEVELOPMENT
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="border border-green-400/30 p-4 hover:border-green-400 transition-colors">
                    <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-green-400/60 text-xs">{stat.unit}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Systems Grid */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Server className="text-green-400" />
              ACTIVE_SYSTEMS
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {systems.map((system) => {
                const SystemIcon = system.icon;
                return (
                  <div
                    key={system.id}
                    className="border-2 border-green-400/30 bg-black/50 backdrop-blur-sm hover:border-green-400 transition-all duration-300 group"
                    onMouseEnter={() => setActiveSystem(system.name)}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <SystemIcon className="text-green-400" size={20} />
                          <h3 className="text-white font-bold">{system.name}</h3>
                        </div>
                        <div className={`text-xs font-bold px-2 py-1 ${
                          system.security === 'HIGH' ? 'bg-red-400/20 text-red-400' :
                          system.security === 'CRITICAL' ? 'bg-red-400 text-white' :
                          'bg-green-400/20 text-green-400'
                        }`}>
                          {system.security}
                        </div>
                      </div>

                      <p className="text-green-400/80 text-sm mb-4 leading-relaxed">
                        {system.description}
                      </p>

                      <div className="space-y-3">
                        {system.tech && system.tech.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {system.tech.slice(0, 3).map((tech, idx) => (
                              <span 
                                key={idx}
                                className="px-2 py-1 bg-green-400/10 border border-green-400/30 text-green-400 text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                        {system.threats && system.threats.length > 0 && (
                          <div className="space-y-2">
                            {system.threats.slice(0, 2).map((threat, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs">
                                <div className="w-2 h-2 bg-green-400 animate-pulse" />
                                <span className="text-green-400/70">{threat}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-green-400/60">
                          <span>PORTS: {system.ports.join(',')}</span>
                          <span className="text-green-400">{system.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Modules Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Shield className="text-green-400" />
              SECURITY_MODULES
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => {
                const ModuleIcon = module.icon;
                return (
                  <div
                    key={module.id}
                    className="border-2 border-green-400/30 bg-black/50 backdrop-blur-sm p-6 hover:border-green-400 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <ModuleIcon className="text-green-400" size={24} />
                      <h3 className="text-white font-bold">{module.name}</h3>
                    </div>
                    
                    <p className="text-green-400/80 text-sm mb-4 leading-relaxed">
                      {module.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 text-xs">{module.status}</span>
                      <button className="text-green-400 hover:text-white transition-colors text-xs font-bold">
                        ACTIVATE →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Skills Matrix */}
          {skills.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Network className="text-green-400" />
                SKILLS_MATRIX
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {skills.map(([category, skillList], index) => (
                  <div
                    key={category}
                    className="border-2 border-green-400/30 bg-black/50 backdrop-blur-sm p-6"
                  >
                    <h3 className="text-green-400 font-bold mb-4 text-lg">{category}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {(skillList || []).map((skill, idx) => (
                        <div
                          key={idx}
                          className="p-3 border border-green-400/20 hover:border-green-400 transition-colors text-center group"
                        >
                          <span className="text-green-400 text-sm font-bold group-hover:text-white">
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Terminal Output */}
          <section className="border-2 border-green-400 bg-black/80 backdrop-blur-sm">
            <div className="border-b border-green-400/30 px-6 py-3">
              <div className="flex items-center gap-3">
                <Terminal className="text-green-400" size={16} />
                <span className="text-green-400 font-bold">SYSTEM_TERMINAL</span>
              </div>
            </div>
            
            <div className="p-6 h-48 overflow-y-auto">
              {terminalOutput.map((line, index) => (
                <div key={index} className="text-green-400 text-sm font-mono mb-1">
                  {`> ${line}`}
                </div>
              ))}
              <div className="text-green-400 text-sm font-mono">
                {`> _`}
                <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1"></span>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-green-400/30 bg-black/80 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-green-400/60 text-sm mb-4">
            {data?.footer?.text || '© 2025 All rights reserved'}
          </div>
          <div className="text-green-400/40 text-xs">
            CYBER SECURITY • SYSTEM ARCHITECTURE • DIGITAL INFRASTRUCTURE
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
};

export default CyberGridPortfolio;