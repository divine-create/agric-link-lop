import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { motion } from 'motion/react';
import { TrendingUp, Truck, CheckCircle2, Wallet, Plus, ArrowUpRight, MapPin, AlertCircle, Zap, Box } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export default function BusinessDashboard() {
  const stats = [
    { label: 'Active Shipments', value: '142', change: '+12%', icon: Truck, color: 'text-primary' },
    { label: 'Delivery Success', value: '99.4%', change: '+0.2%', icon: CheckCircle2, color: 'text-primary' },
    { label: 'Platform Spend', value: '₦4.2M', change: '+18.4%', icon: Wallet, color: 'text-secondary' },
  ];

  const recentDeliveries = [
    { id: 'LOP-4421', destination: 'Lagos → Abuja', customer: 'Agrilink Ltd', status: 'In Transit', type: 'Agriculture', price: '₦12,400' },
    { id: 'LOP-4419', destination: 'Victoria Island → Lekki', customer: 'Fresh Foods', status: 'Delivered', type: 'Retail', price: '₦3,200' },
    { id: 'LOP-4412', destination: 'Kano → Kaduna', customer: 'MedConnect', status: 'Processing', type: 'Medical', price: '₦45,000' },
  ];

  return (
    <DashboardLayout userType="business">
      <div className="max-w-[1100px] mx-auto space-y-10">
        
        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="font-display font-extrabold text-[40px] text-on-surface leading-none mb-4">Infrastructure.</h1>
            <p className="font-sans text-on-surface/60 max-w-sm">Manage your global logistics pipeline. Monitoring 142 active nodes across Nigeria.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="secondary" size="md">Bulk Upload</Button>
            <Link to="/new-delivery">
              <Button size="md" className="gap-2"><Plus size={20} /> New Dispatch</Button>
            </Link>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <Card key={idx} className="p-8 group hover:bg-surface-container transition-colors">
              <div className="flex justify-between items-start mb-6">
                <div className={cn("p-3 rounded-xl bg-surface-container shadow-inner", stat.color)}>
                  <stat.icon size={24} />
                </div>
                <div className="flex items-center gap-1 text-primary text-[10px] font-bold uppercase tracking-widest bg-primary/10 px-2 py-1 rounded-full">
                  <ArrowUpRight size={12} /> {stat.change}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface/40 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                <p className="text-4xl font-display font-extrabold text-on-surface">{stat.value}</p>
              </div>
            </Card>
          ))}
        </section>

        {/* Main Content Layout (Editorial 65/35) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-10">
          
          {/* Recent Deliveries */}
          <section className="space-y-6">
            <div className="flex justify-between items-center px-2">
              <h2 className="font-display font-bold text-2xl">Recent Infrastructure Activity</h2>
              <button className="text-xs font-bold text-primary uppercase tracking-[0.1em] hover:tracking-[0.2em] transition-all">View All Activity</button>
            </div>
            
            <div className="space-y-4">
              {recentDeliveries.map((delivery, idx) => (
                <Card key={idx} className="p-6 bg-surface-low hover:bg-surface-container-high transition-colors flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-16 h-16 bg-surface-highest rounded-2xl flex items-center justify-center text-primary shadow-sm">
                    <Box size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                        {delivery.id}
                      </span>
                      <span className="text-xs font-bold text-on-surface/40 uppercase tracking-widest">
                        {delivery.type}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-xl mb-1">{delivery.destination}</h3>
                    <p className="text-sm text-on-surface/60 font-sans">{delivery.customer} • Expected Tuesday</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-extrabold text-lg mb-2">{delivery.price}</p>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                      delivery.status === 'Delivered' ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                    )}>
                      {delivery.status}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Network Insights (Sidebar) */}
          <aside className="space-y-8">
             <Card className="bg-primary-container text-white p-8 adire-texture overflow-hidden relative">
               <div className="relative z-10">
                 <h3 className="font-display font-bold text-xl mb-4">Network Health</h3>
                 <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-on-primary-container w-[94%]"></div>
                    </div>
                    <span className="text-sm font-bold">94%</span>
                 </div>
                 <p className="text-xs opacity-70 mb-6">The Lagos-Ibadan corridor is seeing high volume. Route optimization active in 12 nodes.</p>
                 <Button variant="primary" className="bg-white text-primary-container w-full py-3">View Detailed Logs</Button>
               </div>
             </Card>

             <div className="space-y-6">
                <h3 className="text-xs font-bold text-on-surface/40 uppercase tracking-[0.2em] px-2">Network Insights</h3>
                {[
                  { icon: Zap, title: "New Route Optimized", desc: "The Ibadan corridor is seeing 15% lower rates this week.", color: "text-primary" },
                  { icon: AlertCircle, title: "Weather Alert", desc: "Heavy rain in Port Harcourt may delay coastal deliveries by 4h.", color: "text-secondary" },
                ].map((insight, idx) => (
                  <div key={idx} className="flex gap-4 p-2 group cursor-default">
                    <div className={cn("p-3 bg-surface-container rounded-xl h-fit", insight.color)}>
                      <insight.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm mb-1 group-hover:text-primary transition-colors">{insight.title}</h4>
                      <p className="text-xs text-on-surface/50 leading-relaxed">{insight.desc}</p>
                    </div>
                  </div>
                ))}
             </div>

             <Card className="bg-surface-high p-8">
               <p className="text-xs font-bold text-on-surface/40 uppercase tracking-[0.2em] mb-4">Active Providers</p>
               <div className="flex -space-x-3 mb-6">
                 {[1,2,3,4,5].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full border-4 border-surface-high bg-surface-container overflow-hidden">
                     <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Rider" />
                   </div>
                 ))}
                 <div className="w-10 h-10 rounded-full border-4 border-surface-high bg-primary text-white flex items-center justify-center text-xs font-bold">+89</div>
               </div>
               <p className="text-sm font-sans font-medium text-on-surface">1,102 vetted riders currently on active dispatch routes.</p>
             </Card>
          </aside>

        </div>
      </div>
    </DashboardLayout>
  );
}
