import { motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Package,
  DollarSign,
  Settings,
  Trash2,
  CheckCheck,
  Truck
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { cn } from '@/src/lib/utils';

const notifications = [
  { id: '1', type: 'job', title: 'New Job Available', message: 'Ikeja → Lekki (₦4,200). 5km from your location.', time: 'Just now', read: false, actionUrl: '/dashboard/provider' },
  { id: '2', type: 'payment', title: 'Earnings Processed', message: 'Settlement for job LOP-4421 has been credited to your wallet.', time: '1 hour ago', read: false, actionUrl: '/provider/wallet' },
];

const notificationConfig = {
  job: { icon: Truck, color: 'text-primary', bg: 'bg-primary/10' },
  payment: { icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
  alert: { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100' },
};

export default function ProviderNotifications() {
  const [readStatus, setReadStatus] = useState<Record<string, boolean>>({'1': false, '2': false});

  return (
    <DashboardLayout userType="provider">
      <div className="max-w-[1000px] mx-auto space-y-8">
        <h1 className="font-display font-extrabold text-3xl text-on-surface">Carrier Alerts</h1>
        <div className="space-y-3">
          {notifications.map((n) => (
            <Card key={n.id} className="p-6">
              <div className="flex gap-4">
                <div className={cn("p-3 rounded-xl", (notificationConfig as any)[n.type].bg, (notificationConfig as any)[n.type].color)}>
                  <Truck size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">{n.title}</h4>
                  <p className="text-sm text-on-surface/60">{n.message}</p>
                  <p className="text-xs text-on-surface/40 mt-2">{n.time}</p>
                </div>
                <Link to={n.actionUrl}><Button variant="secondary" size="sm">View</Button></Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
