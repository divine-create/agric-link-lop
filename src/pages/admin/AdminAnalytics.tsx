import * as React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  TrendingUp, 
  Map, 
  Zap, 
  CheckCircle2, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  Calendar,
  Activity,
  Globe
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import DashboardLayout from '../../components/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { cn } from '@/src/lib/utils';

const platformGMV = [
  { name: 'Week 1', gmv: 24.5, commission: 3.6 },
  { name: 'Week 2', gmv: 32.1, commission: 4.8 },
  { name: 'Week 3', gmv: 28.4, commission: 4.2 },
  { name: 'Week 4', gmv: 42.8, commission: 6.4 },
];

const providerDensity = [
  { zone: 'Lagos', count: 1240 },
  { zone: 'Abuja', count: 840 },
  { zone: 'Ibadan', count: 450 },
  { zone: 'Kano', count: 320 },
  { zone: 'PH', count: 280 },
];

export default function AdminAnalytics() {
  return (
    <DashboardLayout userType="admin">
      <div className="max-w-[1400px] mx-auto space-y-10 pb-12">
        {/* Header Section */}
        <section className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="font-display font-extrabold text-[40px] text-on-surface leading-tight">System Intel.</h1>
            <p className="font-sans text-on-surface/60 max-w-xl text-lg">Platform-wide performance orchestration, GMV tracking, and node density analytics.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="gap-2">
              <Download size={18} /> Export Platform Report
            </Button>
          </div>
        </section>

        {/* High-Level KPIs */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { label: 'Platform GMV', val: '₦142.8M', change: '+18%', icon: BarChart3 },
             { label: 'Total Commission', val: '₦21.4M', change: '+12%', icon: TrendingUp, color: 'text-emerald-500' },
             { label: 'Active Nodes', val: '4,102', change: '+4.2%', icon: Activity },
             { label: 'System Uptime', val: '99.98%', change: 'Nominal', icon: Globe, color: 'text-primary' },
           ].map((stat, i) => (
             <Card key={i} className="p-8 border-outline-variant/10">
                <div className="flex items-center justify-between mb-4">
                   <div className={cn("p-3 bg-surface-highest rounded-xl", stat.color || "text-primary")}>
                      <stat.icon size={24} />
                   </div>
                   <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{stat.change}</span>
                </div>
                <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="font-display font-black text-3xl text-on-surface tracking-tighter">{stat.val}</h3>
             </Card>
           ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
           {/* Revenue Flow */}
           <Card className="p-8 space-y-8">
              <div className="flex items-center justify-between">
                 <h3 className="font-display font-bold text-xl">Revenue Flow (Millions)</h3>
                 <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-primary"></div> GMV</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-secondary"></div> Commission</div>
                 </div>
              </div>
              <div className="h-[350px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={platformGMV}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                       <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                       <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                       <Tooltip 
                         contentStyle={{ border: 'none', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                       />
                       <Area type="monotone" dataKey="gmv" stroke="#2D5A2E" fill="#2D5A2E" fillOpacity={0.1} strokeWidth={3} />
                       <Area type="monotone" dataKey="commission" stroke="#E07A5F" fill="#E07A5F" fillOpacity={0.1} strokeWidth={3} />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </Card>

           {/* Provider Density */}
           <Card className="p-8 space-y-8">
              <h3 className="font-display font-bold text-xl">Carrier Node Density</h3>
              <div className="h-[350px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={providerDensity} layout="vertical">
                       <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                       <XAxis type="number" hide />
                       <YAxis dataKey="zone" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} width={80} />
                       <Tooltip 
                          cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                          contentStyle={{ border: 'none', borderRadius: '12px' }}
                       />
                       <Bar dataKey="count" fill="#2D5A2E" radius={[0, 4, 4, 0]} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
