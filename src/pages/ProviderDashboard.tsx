import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { motion } from 'motion/react';
import { Star, Wallet, Package, MapPin, ArrowRight, TrendingUp, Clock, ShieldCheck, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export default function ProviderDashboard() {
  const earningsData = {
    total: '₦450,200',
    today: '₦12,400',
    week: '₦84,500',
    month: '₦312,000'
  };

  const activeJobs = [
    { id: 'JOB-9021', destination: 'Lagos Island → Lekki Phase 1', sender: 'Agrilink Ltd', item: 'Medical Supplies', weight: '2.5kg', reward: '₦4,500', urgency: 'High', pickup: '14:00 Today' },
    { id: 'JOB-9024', destination: 'Ikeja → Surulere', sender: 'Zest Fashion', item: 'Organic Produce', weight: '15.0kg', reward: '₦8,200', urgency: 'Normal', pickup: '15:30 Today' },
    { id: 'JOB-9030', destination: 'Yaba → Maryland', sender: 'TechHub', item: 'Server Components', weight: '45.2kg', reward: '₦12,000', urgency: 'Critical', pickup: 'Immediate' },
  ];

  return (
    <DashboardLayout userType="provider">
      <div className="max-w-[1100px] mx-auto space-y-10">
        
        {/* Statistics Banner */}
        <section className="relative overflow-hidden rounded-[2rem] bg-primary-container text-white p-6 md:p-12 adire-texture">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-last md:order-first">
              <div className="flex items-center gap-3 mb-4 opacity-60">
                 <Wallet size={16} />
                 <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">Withdrawable Settlement</p>
              </div>
              <h1 className="font-display font-extrabold text-[40px] sm:text-[56px] leading-tight mb-8">
                {earningsData.total}
                <span className="block text-xs font-sans font-bold opacity-50 tracking-normal mt-2">Nigeria Naira (NGN) • Tier 2 Verification</span>
              </h1>
              <div className="grid grid-cols-3 gap-4 md:gap-10">
                <div>
                  <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1">Today's Take</p>
                  <p className="font-display font-bold text-base md:text-xl">{earningsData.today}</p>
                </div>
                <div>
                  <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1">Active Slots</p>
                  <p className="font-display font-bold text-base md:text-xl">4 / 10</p>
                </div>
                <div>
                  <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1">Success Score</p>
                  <p className="font-display font-bold text-base md:text-xl">99.8%</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <Card className="bg-white/10 backdrop-blur-md text-white p-6 md:p-8 w-full max-w-[320px] md:max-w-[280px] border-0 shadow-none">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                      <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={251.2} strokeDashoffset={251.2 * (1 - 0.85)} className="text-white" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display font-extrabold text-2xl">85%</span>
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">Efficiency Rating</h3>
                  <p className="text-xs opacity-60 mb-6">Dispatch nodes are highly optimized. Unlock **Silver Tier** in 4 more hauls.</p>
                  <Button size="sm" className="w-full bg-white text-primary-container hover:bg-surface-container font-bold">Withdraw Funds</Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Action Tiers (65/35) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-10 items-start">
          
          {/* Active Job Feed */}
          <section className="space-y-6">
            <div className="flex justify-between items-center px-4">
              <div className="space-y-1">
                <h2 className="font-display font-bold text-2xl text-on-surface">Opportunities Hub</h2>
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Pre-vetted infrastructure dispatches</p>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-on-surface/40 uppercase tracking-widest">
                <Filter size={14} /> Filter Corridors
              </div>
            </div>

            <div className="space-y-4">
              {activeJobs.map((job, idx) => (
                <Card key={idx} className="p-0 overflow-hidden hover:bg-surface-container transition-all group border-0 shadow-sm hover:shadow-xl">
                  <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-outline-variant/10">
                    
                    {/* Visual Segment */}
                    <div className="w-full sm:w-[120px] bg-surface-highest flex flex-col items-center justify-center p-6 gap-2 shrink-0">
                       <div className={cn(
                         "w-12 h-12 rounded-xl flex items-center justify-center shadow-sm",
                         job.urgency === 'Critical' ? "bg-secondary text-white" : "bg-primary text-white"
                       )}>
                          <Package size={24} />
                       </div>
                       <p className="text-[10px] font-extrabold font-display leading-none mt-1">{job.weight}</p>
                    </div>

                    {/* Information Segment */}
                    <div className="flex-1 p-6 md:p-8 space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                         <span className="px-2 py-0.5 bg-surface-highest rounded-full text-[10px] font-bold text-on-surface/50 tracking-tighter">{job.id}</span>
                         <span className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest">• {job.sender}</span>
                         <span className={cn(
                           "ml-auto text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full",
                           job.urgency === 'Critical' ? "bg-secondary/10 text-secondary" :
                           job.urgency === 'High' ? "bg-primary/10 text-primary font-bold" :
                           "bg-surface-container text-on-surface/40"
                         )}>
                           {job.urgency} Urgency
                         </span>
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="font-display font-bold text-2xl group-hover:text-primary transition-colors">{job.destination}</h3>
                        <p className="text-sm font-sans text-on-surface/50 font-medium">{job.item} • Ready for pickup at {job.pickup}</p>
                      </div>

                      <div className="flex items-center gap-6 pt-2">
                        <div className="flex items-center gap-2 text-xs text-on-surface/40 font-medium">
                          <MapPin size={14} className="text-primary/40" /> 12.4km away
                        </div>
                        <div className="flex items-center gap-2 text-xs text-on-surface/40 font-medium">
                          <Clock size={14} className="text-secondary/40" /> {job.urgency === 'Critical' ? 'Immediate' : 'Next 2 hours'}
                        </div>
                      </div>
                    </div>

                    {/* Reward Segment */}
                    <div className="w-full sm:w-[180px] p-6 md:p-8 bg-surface-low flex flex-col justify-center items-center sm:items-end gap-4 shrink-0">
                       <div className="text-center sm:text-right">
                         <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest leading-none mb-2">Net Settlement</p>
                         <p className="font-display font-extrabold text-3xl text-on-surface">{job.reward}</p>
                       </div>
                       <Link to={`/accept-haul/${job.id}`} className="w-full sm:w-auto">
                        <Button size="sm" className={cn(
                          "w-full sm:w-auto",
                          job.urgency === 'Critical' ? "bg-secondary hover:bg-secondary/90" : ""
                        )}>Accept Haul</Button>
                       </Link>
                    </div>

                  </div>
                </Card>
              ))}
            </div>
            
            <div className="text-center pt-8">
               <Button variant="ghost" className="text-on-surface/40 gap-2">View All Network Opportunities <ArrowRight size={16} /></Button>
            </div>
          </section>

          {/* Sidebar: Metrics & Accomplishments */}
          <aside className="space-y-8">
            <h3 className="text-xs font-bold text-on-surface/40 uppercase tracking-[0.2em] px-2">Service Excellence</h3>
            <Card className="p-8 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-[48px] font-display font-extrabold text-on-surface leading-none">4.8</h4>
                  <div className="flex text-secondary mt-2">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-on-surface/40 uppercase tracking-widest">Global Rank</p>
                  <p className="font-display font-extrabold text-xl">Top 1%</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Punctuality', value: '98%', icon: Clock },
                  { label: 'Safety Score', value: '99.2%', icon: ShieldCheck },
                  { label: 'Total Hauls', value: '1,240', icon: TrendingUp },
                ].map((metric, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="p-2 bg-surface-container rounded-lg text-primary">
                      <metric.icon size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-on-surface/60">{metric.label}</span>
                        <span className="text-xs font-bold">{metric.value}</span>
                      </div>
                      <div className="h-1 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: metric.value.includes('%') ? metric.value : '100%' }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-surface-container-high p-8 flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                <Star size={32} />
              </div>
              <h3 className="font-display font-bold text-lg">Elite Tier Provider</h3>
              <p className="text-xs text-on-surface/50">Unlocked premium high-value routes and priority settlement.</p>
              <Button variant="ghost" size="sm" className="text-primary gap-2">View Achievement History <ArrowRight size={14} /></Button>
            </Card>
          </aside>

        </div>
      </div>
    </DashboardLayout>
  );
}
