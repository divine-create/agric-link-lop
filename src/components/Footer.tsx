import { Link } from 'react-router-dom';
import { 
  Truck, 
  MapPin, 
  Box, 
  Twitter, 
  Linkedin, 
  Github, 
  ArrowRight,
  Mail,
  Phone,
  ShieldCheck,
  Zap,
  Clock
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    enterprise: [
      { name: 'Corridor Mesh', path: '/dashboard/routes' },
      { name: 'Node Registry', path: '/docs' },
      { name: 'SLA Benchmarks', path: '/pricing' },
      { name: 'Infrastructure Wallet', path: '/wallet' },
    ],
    developers: [
      { name: 'API Reference', path: '/docs' },
      { name: 'Webhooks', path: '/docs' },
      { name: 'Orchestration SDK', path: '/docs' },
      { name: 'System Status', path: '#' },
    ],
    company: [
      { name: 'Mission', path: '/' },
      { name: 'Network Analytics', path: '/analytics' },
      { name: 'Privacy Protocol', path: '#' },
      { name: 'Terms of Orchestration', path: '#' },
    ],
  };

  return (
    <footer className="bg-on-surface text-white pt-24 pb-12 overflow-hidden relative">
      {/* Background Mesh Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-5 space-y-8">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-display font-black text-4xl tracking-tighter text-white">LOP.</span>
            </Link>
            <p className="font-sans text-white/50 text-lg leading-relaxed max-w-md">
              We are building the sovereign logistics infrastructure for the West African corridor. Orchestrating mobility, verified by code.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary transition-all">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary transition-all">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary transition-all">
                <Github size={20} />
              </a>
            </div>
            
            <div className="pt-8 grid grid-cols-2 gap-4">
               <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">Network Status</h4>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                     <span className="text-sm font-bold">142 Active Nodes</span>
                  </div>
               </div>
               <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">Daily Throughput</h4>
                  <p className="text-sm font-bold">428.5 Tons</p>
               </div>
            </div>
          </div>

          {/* Nav groups */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-8">Infrastructure</h4>
              <ul className="space-y-4">
                {links.enterprise.map(item => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-sm font-bold text-white/60 hover:text-white transition-all">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-8">Developer Hub</h4>
              <ul className="space-y-4">
                {links.developers.map(item => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-sm font-bold text-white/60 hover:text-white transition-all">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-8">Protocol</h4>
              <ul className="space-y-4">
                {links.company.map(item => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-sm font-bold text-white/60 hover:text-white transition-all">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Global Hub Connect */}
        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row items-center justify-between gap-8 text-white/40">
           <div className="flex flex-col md:flex-row items-center gap-8 text-[11px] font-bold uppercase tracking-widest">
              <span>© {currentYear} Logistics Orchestration Platform</span>
              <div className="w-1 h-1 bg-white/10 rounded-full hidden md:block"></div>
              <span>Lagos • Abuja • Accra • Abidjan</span>
           </div>
           
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                 <Mail size={14} className="opacity-40" />
                 <span className="text-[11px] font-bold uppercase">ops@lop.infrastructure</span>
              </div>
              <div className="flex items-center gap-2">
                 <Phone size={14} className="opacity-40" />
                 <span className="text-[11px] font-bold uppercase">+234 (0) 800 PROTOCOL</span>
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
}
