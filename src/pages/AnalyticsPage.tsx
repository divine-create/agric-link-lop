import * as React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Map, 
  Zap, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  Calendar
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
  Cell,
  PieChart, 
  Pie 
} from 'recharts';
import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { cn } from '@/src/lib/utils';

const volumeData = [
  { name: 'Mon', volume: 120, success: 118 },
  { name: 'Tue', volume: 154, success: 150 },
  { name: 'Wed', volume: 132, success: 130 },
  { name: 'Thu', volume: 180, success: 175 },
  { name: 'Fri', volume: 210, success: 202 },
  { name: 'Sat', volume: 160, success: 158 },
  { name: 'Sun', volume: 90, success: 88 },
];

const routeData = [
  { corridor: 'Lagos-Abuja', volume: 450, efficiency: 94 },
  { corridor: 'Ibadan-Lagos', volume: 380, efficiency: 91 },
  { corridor: 'Kano-Kaduna', volume: 220, efficiency: 88 },
  { corridor: 'PH-Enugu', volume: 190, efficiency: 85 },
  { corridor: 'Benin-Lagos', volume: 150, efficiency: 92 },
];

const categoryData = [
  { name: 'Agriculture', value: 400, color: '#2D5A2E' },
  { name: 'Medical', value: 300, color: '#E07A5F' },
  { name: 'Retail', value: 200, color: '#3D405B' },
  { name: 'Manufacturing', value: 100, color: '#81B29A' },
];

export default function AnalyticsPage() {
  const userType = window.location.pathname.includes('metrics') ? 'provider' : 'business';

  return (
    <DashboardLayout userType={userType}>
      <div className="max-w-[1200px] mx-auto space-y-10">
        
        {/* Header Section */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full mb-4">
              <BarChart3 size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Intelligence Engine</span>
            </div>
            <h1 className="font-display font-extrabold text-[40px] text-on-surface leading-tight mb-2">Network Telemetry.</h1>
            <p className="font-sans text-on-surface/60 max-w-xl">Deep insights into your logistics pipeline. Monitoring 142 active nodes across Nigeria.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button variant="secondary" className="flex-1 md:flex-none gap-2">
              <Calendar size={18} /> Last 30 Days
            </Button>
            <Button className="flex-1 md:flex-none gap-2">
              <Download size={18} /> Download Intel
            </Button>
          </div>
        </section>

        {/* Global KPIs */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Dispatch Volume', value: '1,240', change: '+12.5%', trend: 'up', icon: TrendingUp },
            { label: 'Network Efficiency', value: '94.2%', change: '+0.8%', trend: 'up', icon: Zap },
            { label: 'Active Corridors', value: '42', change: 'Stable', trend: 'neutral', icon: Map },
            { label: 'Success Probability', value: '99.4%', change: '-0.2%', trend: 'down', icon: CheckCircle2 },
          ].map((kpi, idx) => (
            <Card key={idx} className="p-6 space-y-4 hover:bg-surface-container transition-colors group border-0 shadow-sm">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-surface-highest rounded-xl text-primary shrink-0 group-hover:scale-110 transition-transform">
                  <kpi.icon size={20} />
                </div>
                {kpi.trend !== 'neutral' && (
                  <div className={cn(
                    "flex items-center gap-0.5 text-[10px] font-bold px-2 py-1 rounded-full",
                    kpi.trend === 'up' ? "bg-emerald-500/10 text-emerald-600" : "bg-secondary/10 text-secondary"
                  )}>
                    {kpi.trend === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                    {kpi.change}
                  </div>
                )}
              </div>
              <div>
                <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest mb-1">{kpi.label}</p>
                <h3 className="font-display font-extrabold text-3xl text-on-surface">{kpi.value}</h3>
              </div>
            </Card>
          ))}
        </section>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Main Volume Chart */}
          <Card className="p-8 space-y-8 bg-surface-low border-0 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-xl mb-1">Infrastructure Load</h3>
                <p className="text-xs text-on-surface/40 font-medium">Daily dispatch volume vs delivery success.</p>
              </div>
              <Filter size={18} className="text-on-surface/20" />
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={volumeData}>
                  <defs>
                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2D5A2E" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2D5A2E" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8E8D8" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fbfbe2', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="volume" stroke="#2D5A2E" strokeWidth={3} fillOpacity={1} fill="url(#colorVolume)" />
                  <Area type="monotone" dataKey="success" stroke="#3D405B" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Corridor Efficiency */}
          <Card className="p-8 space-y-8 bg-surface-low border-0 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-xl mb-1">Corridor Utilization</h3>
                <p className="text-xs text-on-surface/40 font-medium">Performance metrics across major geographical nodes.</p>
              </div>
              <TrendingUp size={18} className="text-on-surface/20" />
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={routeData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E8E8D8" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="corridor" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#2D5A2E' }} width={80} />
                  <Tooltip 
                     cursor={{ fill: 'rgba(45, 90, 46, 0.05)' }}
                     contentStyle={{ backgroundColor: '#fbfbe2', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="volume" fill="#2D5A2E" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

        </div>

        {/* Bottom Tier (Insights & Distribution) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
           
           <section className="space-y-6">
              <h2 className="font-display font-bold text-2xl px-2">Operational Insights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'Corridor Congestion', desc: 'Lagos-Abuja route is seeing a 15% increase in transit time due to construction. Recommend shifting to night tiers.', type: 'warning', icon: AlertCircle },
                  { title: 'Cost Optimization', desc: 'Consolidating agricultural dispatches on Tuesdays can reduce infrastructure overhead by ₦42,000/week.', type: 'success', icon: Zap },
                ].map((insight, idx) => (
                  <Card key={idx} className={cn(
                    "p-8 border-l-4",
                    insight.type === 'warning' ? "border-secondary bg-surface-low" : "border-primary bg-surface-low"
                  )}>
                    <div className="flex gap-6">
                      <div className={cn(
                        "p-3 rounded-xl h-fit",
                        insight.type === 'warning' ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"
                      )}>
                        <insight.icon size={24} />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-display font-bold text-lg leading-tight">{insight.title}</h4>
                        <p className="text-sm text-on-surface/50 leading-relaxed font-sans">{insight.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
           </section>

           <Card className="p-8 space-y-8 bg-surface-high border-0 shadow-sm">
             <h3 className="font-display font-bold text-xl">Payload Distribution</h3>
             <div className="h-[240px] w-full flex items-center justify-center">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={categoryData}
                     cx="50%"
                     cy="50%"
                     innerRadius={60}
                     outerRadius={80}
                     paddingAngle={8}
                     dataKey="value"
                   >
                     {categoryData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                   </Pie>
                   <Tooltip 
                     contentStyle={{ backgroundColor: '#fbfbe2', border: 'none', borderRadius: '12px' }}
                   />
                 </PieChart>
               </ResponsiveContainer>
             </div>
             <div className="space-y-3">
                {categoryData.map((cat, idx) => (
                  <div key={idx} className="flex justify-between items-center px-2">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                      <span className="text-sm font-sans font-bold text-on-surface/60">{cat.name}</span>
                    </div>
                    <span className="text-sm font-display font-bold">{Math.round((cat.value / 1000) * 100)}%</span>
                  </div>
                ))}
             </div>
           </Card>

        </div>

      </div>
    </DashboardLayout>
  );
}
