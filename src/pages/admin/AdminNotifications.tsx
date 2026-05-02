import { motion } from 'motion/react';
import { Bell, Activity, AlertTriangle, ShieldCheck } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export default function AdminNotifications() {
  const systemAlerts = [
    { id: '1', type: 'error', title: 'API Node Degradation', message: 'Region Lagos-West reporting high latency (>500ms).', time: '10 min ago' },
    { id: '2', type: 'warning', title: 'KYB Queue Growth', message: 'Pending business approvals exceeded threshold (12).', time: '1 hour ago' },
  ];

  return (
    <DashboardLayout userType="admin">
      <div className="max-w-[1200px] mx-auto space-y-10">
        <h1 className="font-display font-extrabold text-[40px] text-on-surface leading-tight">System Pulse.</h1>
        <div className="space-y-4">
          {systemAlerts.map(alert => (
            <Card key={alert.id} className="p-8 border-l-4 border-secondary bg-surface-low">
              <div className="flex gap-6">
                 <div className="p-3 bg-secondary/10 text-secondary rounded-xl h-fit">
                    <Activity size={24} />
                 </div>
                 <div>
                    <h3 className="font-display font-bold text-xl">{alert.title}</h3>
                    <p className="text-on-surface/60 mt-1">{alert.message}</p>
                    <p className="text-xs text-on-surface/30 mt-4 uppercase font-bold tracking-widest">{alert.time}</p>
                 </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
