import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-[1100px] z-50">
      <div className="glass-nav px-6 md:px-8 py-3 rounded-xl flex items-center justify-between border-0 shadow-none relative">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display font-extrabold text-2xl tracking-tighter text-on-surface">LOP.</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/pricing" className="text-sm font-sans font-medium text-on-surface hover:text-primary transition-colors">Pricing</Link>
          <Link to="/docs" className="text-sm font-sans font-medium text-on-surface hover:text-primary transition-colors">API Docs</Link>
          <Link to="/track/DEMO" className="text-sm font-sans font-medium text-on-surface hover:text-primary transition-colors">Tracking</Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/login" className="hidden sm:inline-flex">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link to="/register/business">
            <Button size="sm">Get Started</Button>
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-on-surface/60 hover:text-primary transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 mt-4 p-6 glass-nav rounded-2xl flex flex-col gap-4 md:hidden"
            >
              <Link to="/pricing" onClick={() => setIsOpen(false)} className="text-lg font-display font-bold text-on-surface px-4 py-2 hover:bg-surface-highest rounded-xl transition-colors">Pricing</Link>
              <Link to="/docs" onClick={() => setIsOpen(false)} className="text-lg font-display font-bold text-on-surface px-4 py-2 hover:bg-surface-highest rounded-xl transition-colors">API Docs</Link>
              <Link to="/track/DEMO" onClick={() => setIsOpen(false)} className="text-lg font-display font-bold text-on-surface px-4 py-2 hover:bg-surface-highest rounded-xl transition-colors">Tracking</Link>
              <hr className="border-outline-variant/10" />
              <Link to="/register/business" onClick={() => setIsOpen(false)}>
                <Button className="w-full justify-start text-lg h-14">Get Started</Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
