import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Check, Shield, Zap, Globe, Package } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function PricingPage() {
  const plans = [
    {
      name: 'Emerging',
      price: '₦25,000',
      period: '/mo',
      desc: 'Perfect for SMEs and local digital shops starting their delivery journey.',
      features: ['Up to 500 dispatches/mo', 'Email & SMS alerts', 'Standard Support', 'Core API Access'],
      icon: Package,
      primary: false
    },
    {
      name: 'Orchestrator',
      price: '₦120,000',
      period: '/mo',
      desc: 'For high-volume platforms requiring intelligent routing and priority support.',
      features: ['Unlimited dispatches', 'Real-time telemetry', 'Priority Dispatching', 'Full SDK Suite', 'Custom Webhooks', 'Account Manager'],
      icon: Zap,
      primary: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      desc: 'Dedicated infrastructure for national logistics companies and massive fleets.',
      features: ['White-label solutions', 'On-premise deployments', '24/7 dedicated support', 'Strategic fleet consulting'],
      icon: Globe,
      primary: false
    }
  ];

  return (
    <div className="min-h-screen bg-surface selection:bg-secondary/30">
      <Navbar />
      
      <main className="pt-32 md:pt-40 pb-16 md:pb-20 px-4 md:px-6 max-w-[1200px] mx-auto text-center">
        <div className="max-w-3xl mx-auto mb-16 md:mb-20">
          <h1 className="font-display font-extrabold text-[36px] sm:text-[52px] md:text-[72px] leading-tight text-on-surface mb-6 md:mb-8">
            Infrastructure Pricing for <span className="text-primary italic">Scale</span>.
          </h1>
          <p className="text-lg md:text-xl text-on-surface/60 leading-relaxed max-w-xl mx-auto">
            Transparent tiers designed for businesses and providers at every stage of growth. No hidden coordination fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch px-2 md:px-0">
          {plans.map((plan, idx) => (
            <Card 
               key={idx} 
               className={cn(
                 "p-8 md:p-10 flex flex-col text-left transition-all duration-500",
                 plan.primary ? "bg-primary-container text-white adire-texture md:scale-105 shadow-2xl relative z-10" : "bg-surface-low text-on-surface"
               )}
            >
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center mb-8",
                 plan.primary ? "bg-white text-primary-container" : "bg-surface-container text-primary"
              )}>
                <plan.icon size={28} />
              </div>
              
              <h3 className="font-display font-extrabold text-3xl mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-[40px] font-display font-extrabold leading-none">{plan.price}</span>
                <span className={cn("text-sm font-bold uppercase tracking-widest", plan.primary ? "opacity-60" : "text-on-surface/40")}>{plan.period}</span>
              </div>
              
              <p className={cn("text-sm leading-relaxed mb-10", plan.primary ? "opacity-70" : "text-on-surface/60")}>
                {plan.desc}
              </p>

              <div className="space-y-4 mb-12 flex-1">
                 {plan.features.map((feature, fIdx) => (
                   <div key={fIdx} className="flex items-start gap-3">
                     <Check size={18} className={cn("mt-0.5 shrink-0", plan.primary ? "text-on-primary-container" : "text-secondary")} />
                     <span className="text-sm font-medium">{feature}</span>
                   </div>
                 ))}
              </div>

              <Button 
                variant={plan.primary ? 'primary' : 'secondary'} 
                className={cn(
                  "w-full py-5 text-lg",
                  plan.primary ? "bg-white text-primary-container hover:bg-surface-container" : ""
                )}
              >
                Choose {plan.name}
              </Button>
            </Card>
          ))}
        </div>

        <section className="mt-24 md:mt-32 p-8 md:p-12 bg-surface-container rounded-[2rem] flex flex-col md:flex-row items-center gap-8 md:gap-12 text-left">
           <div className="p-8 md:p-10 bg-primary/10 rounded-full text-primary shrink-0">
              <Shield size={48} className="md:w-16 md:h-16" />
           </div>
           <div>
             <h3 className="font-display font-bold text-2xl md:text-3xl mb-3 md:mb-4">Security as standard.</h3>
             <p className="text-on-surface/60 max-w-xl leading-relaxed text-sm md:text-base">
               All plans include 256-bit encryption, SOC2 Type II compliance readiness, and our proprietary high-fidelity tracking engine. We protect your data as much as your cargo.
             </p>
           </div>
           <div className="w-full md:w-auto md:ml-auto">
             <Button variant="secondary" className="w-full">View Security Compliance</Button>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
