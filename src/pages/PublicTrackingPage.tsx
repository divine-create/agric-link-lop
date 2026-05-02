import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { Package, MapPin, Truck, CheckCircle2, Clock, Phone, User, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function PublicTrackingPage() {
  const { id } = useParams();
  const trackId = id || 'LOP-4421';

  const steps = [
    { label: 'Order Placed', time: 'Oct 23, 08:30 AM', status: 'completed', icon: Package },
    { label: 'Provider Assigned', time: 'Oct 23, 09:15 AM', status: 'completed', icon: Truck },
    { label: 'In Transit', time: 'Oct 23, 11:45 AM', status: 'current', icon: MapPin },
    { label: 'Out for Delivery', time: 'Expected ~2 PM', status: 'pending', icon: Clock },
    { label: 'Delivered', time: '--', status: 'pending', icon: CheckCircle2 },
  ];

  const deliveryInfo = {
    sender: 'Agrilink Ltd',
    item: 'Fresh Produce (Tomatoes, 15kg)',
    recipient: 'John Doe',
    address: '42 Marina Street, Victoria Island, Lagos',
    providerName: 'Ibrahim S.',
    providerPhoto: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=100&q=80',
    eta: '~1 hour 20 min',
    status: 'In Transit',
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-primary-container text-white sticky top-0 z-50">
        <div className="max-w-[800px] mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Truck size={24} />
            <span className="font-display font-bold text-lg">LOP Tracking</span>
          </div>
          <a
            href="https://agrilink.ng"
            className="text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
          >
            Powered by LOP
          </a>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto px-4 py-8 md:py-12 space-y-8">
        {/* Tracking ID Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary text-white rounded-2xl p-6 md:p-8 text-center"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">Tracking Number</p>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl mb-2">{trackId}</h1>
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest">{deliveryInfo.status}</span>
          </div>
        </motion.div>

        {/* ETA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-surface-low rounded-2xl p-6 border border-outline-variant/10 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-2">Estimated Delivery</p>
            <p className="font-display font-extrabold text-4xl text-on-surface mb-1">{deliveryInfo.eta}</p>
            <p className="text-sm text-on-surface/60">To {deliveryInfo.address}</p>
          </div>
        </motion.div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl overflow-hidden bg-surface-container aspect-video relative"
        >
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
            alt="Map"
            className="w-full h-full object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 flex items-center justify-between p-12">
            <div className="p-3 bg-surface rounded-2xl shadow-lg border border-outline-variant/20">
              <MapPin className="text-primary" size={24} />
            </div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="p-4 bg-primary text-white rounded-full shadow-2xl shadow-primary/40"
            >
              <Truck size={32} />
            </motion.div>
            <div className="p-3 bg-surface rounded-2xl shadow-lg border border-outline-variant/20">
              <CheckCircle2 className="text-on-surface/20" size={24} />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs font-bold text-on-surface/60">
            <span>Lagos Pickup</span>
            <span>Victoria Island Drop-off</span>
          </div>
        </motion.div>

        {/* Provider Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 bg-surface-low border border-outline-variant/10">
            <div className="flex items-center gap-4">
              <img
                src={deliveryInfo.providerPhoto}
                alt={deliveryInfo.providerName}
                className="w-14 h-14 rounded-2xl object-cover"
              />
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-1">Your Delivery Provider</p>
                <p className="font-display font-bold text-lg text-on-surface">{deliveryInfo.providerName}</p>
                <p className="text-xs text-on-surface/60">Professional Delivery Partner</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-primary justify-end">
                  <ShieldCheck size={14} />
                  <span className="text-xs font-bold">Verified</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Package Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 bg-surface-low border border-outline-variant/10">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface/40 mb-4">Package Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-1">From</p>
                <p className="font-bold text-sm text-on-surface">{deliveryInfo.sender}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-1">Item</p>
                <p className="font-bold text-sm text-on-surface">{deliveryInfo.item}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-1">Deliver To</p>
                <p className="font-bold text-sm text-on-surface">{deliveryInfo.recipient}</p>
                <p className="text-xs text-on-surface/60">{deliveryInfo.address}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-xs font-bold uppercase tracking-widest text-on-surface/40 mb-6 px-2">Delivery Timeline</h2>
          <div className="relative pl-12 space-y-10">
            <div className="absolute left-[23px] top-4 bottom-4 w-[2px] bg-outline-variant/10"></div>

            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="relative"
              >
                <div className={cn(
                  "absolute -left-[35px] w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm",
                  step.status === 'completed' ? "bg-primary text-white" :
                  step.status === 'current' ? "bg-secondary text-white ring-8 ring-secondary/10" :
                  "bg-surface-container text-on-surface/20"
                )}>
                  <step.icon size={20} />
                </div>
                <div>
                  <h4 className={cn(
                    "font-display font-bold text-lg leading-none mb-2",
                    step.status === 'pending' ? "text-on-surface/30" : "text-on-surface"
                  )}>{step.label}</h4>
                  <p className="text-xs font-sans text-on-surface/50">{step.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-surface-low rounded-2xl p-6 border border-outline-variant/10"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="text-primary shrink-0 mt-1" size={20} />
            <div>
              <h4 className="font-display font-bold text-on-surface mb-2">Need Help?</h4>
              <p className="text-xs text-on-surface/60 leading-relaxed mb-4">
                Contact support if you're experiencing issues with your delivery.
              </p>
              <div className="flex gap-3">
                <a
                  href="tel:+2348000000000"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl text-sm font-bold hover:bg-primary/20 transition-colors"
                >
                  <Phone size={16} /> Call Support
                </a>
                <a
                  href="mailto:support@agrilink.ng"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container text-on-surface rounded-xl text-sm font-bold hover:bg-surface-container/80 transition-colors"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-outline-variant/10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface/30">
            Secured by LOP Infrastructure
          </p>
        </div>
      </main>
    </div>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl ${className}`}>
      {children}
    </div>
  );
}
