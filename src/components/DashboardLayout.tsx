import * as React from 'react';
import { LayoutGrid, Truck, BarChart3, Wallet, Settings, Bell, Search, Plus, MapPin, Package, ClipboardCheck, ArrowRight, Star, ExternalLink, Menu, X, Activity, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: 'business' | 'provider' | 'admin' | 'individual';
}

export default function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const businessLinks = [
    { name: 'Dashboard', icon: LayoutGrid, path: '/dashboard/business' },
    { name: 'Deliveries', icon: Truck, path: '/deliveries' },
    { name: 'Routes', icon: MapPin, path: '/dashboard/routes' },
    { name: 'Analytics', icon: BarChart3, path: '/analytics' },
    { name: 'Wallet', icon: Wallet, path: '/wallet' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  const providerLinks = [
    { name: 'Job Feed', icon: ClipboardCheck, path: '/dashboard/provider' },
    { name: 'Deliveries', icon: Truck, path: '/deliveries' },
    { name: 'Earnings', icon: Wallet, path: '/earnings' },
    { name: 'Metrics', icon: BarChart3, path: '/metrics' },
  ];

  const individualLinks = [
    { name: 'Dashboard', icon: LayoutGrid, path: '/dashboard/individual' },
    { name: 'My Deliveries', icon: Truck, path: '/deliveries' },
    { name: 'Wallet', icon: Wallet, path: '/wallet' },
    { name: 'Track Parcel', icon: Search, path: '/track/DEMO' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  const adminLinks = [
    { name: 'System Pulse', icon: Activity, path: '/dashboard/admin' },
    { name: 'Corridor Mesh', icon: MapPin, path: '/dashboard/routes' },
    { name: 'Entity Registry', icon: Users, path: '/dashboard/admin' },
    { name: 'Dispatch Flow', icon: BarChart3, path: '/analytics' },
    { name: 'Financial Core', icon: Wallet, path: '/dashboard/admin' },
  ];

  const links = 
    userType === 'business' ? businessLinks : 
    userType === 'provider' ? providerLinks : 
    userType === 'admin' ? adminLinks : 
    individualLinks;

  const SidebarContent = ({ mobile = false }) => (
    <>
      <div className="p-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display font-extrabold text-2xl tracking-tighter text-on-surface">
            {(!mobile && !isSidebarOpen) ? 'L.' : 'LOP.'}
          </span>
        </Link>
        {mobile && (
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-on-surface/60">
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={() => mobile && setIsMobileMenuOpen(false)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
              location.pathname === link.path 
                ? "bg-surface-highest text-primary" 
                : "text-on-surface hover:bg-surface-container"
            )}
          >
            <link.icon size={20} />
            {(mobile || isSidebarOpen) && <span className="font-sans font-medium">{link.name}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className={cn(
          "rounded-2xl p-4 flex items-center gap-3",
          userType === 'business' ? "bg-primary text-white" : "bg-primary-container text-white"
        )}>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-display font-bold shrink-0">
            {userType[0].toUpperCase()}
          </div>
          {(mobile || isSidebarOpen) && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Premium Tier</p>
              <p className="text-xs opacity-70 truncate">{userType} console</p>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar - Desktop */}
      <aside className={cn(
        "hidden lg:flex bg-surface-low border-r border-outline-variant/10 transition-all duration-300 flex-col sticky top-0 h-screen",
        isSidebarOpen ? "w-64" : "w-20"
      )}>
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.aside
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-surface-low z-[70] flex flex-col shadow-2xl lg:hidden"
            >
              <SidebarContent mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-outline-variant/10 flex items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => window.innerWidth > 1024 ? setIsSidebarOpen(!isSidebarOpen) : setIsMobileMenuOpen(true)}
              className="p-2 text-on-surface/60 hover:text-primary transition-colors"
            >
              <Menu size={20} />
            </button>
            <div className="relative w-full max-w-xs md:max-w-md hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface/40" size={18} />
              <input 
                type="text" 
                placeholder="Search infrastructure..." 
                className="w-full pl-10 pr-4 py-2 bg-surface-highest rounded-lg border-0 focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            <button className="relative p-2 text-on-surface/60 hover:text-primary transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full border border-surface"></span>
            </button>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden md:block">
                <p className="text-xs text-on-surface/60 font-medium">Good morning,</p>
                <p className="text-sm font-bold text-on-surface">Emeka Onu</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-surface-container border border-outline-variant/20 overflow-hidden shrink-0">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
