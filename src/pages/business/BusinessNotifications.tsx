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
  Mail,
  Phone,
  Trash2,
  CheckCheck
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { cn } from '@/src/lib/utils';

type NotificationType = 'delivery' | 'system' | 'payment' | 'alert';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionUrl?: string;
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'delivery',
    title: 'Package Delivered',
    message: 'LOP-4421 to Victoria Island has been successfully delivered.',
    time: '2 min ago',
    read: false,
    actionUrl: '/track/LOP-4421',
  },
  {
    id: '2',
    type: 'delivery',
    title: 'Provider Assigned',
    message: 'Ibrahim S. has been assigned to LOP-4424 (Lagos → Abuja).',
    time: '15 min ago',
    read: false,
    actionUrl: '/track/LOP-4424',
  },
  {
    id: '3',
    type: 'payment',
    title: 'Wallet Funded',
    message: 'Your wallet has been credited with ₦50,000 via Paystack.',
    time: '1 hour ago',
    read: false,
    actionUrl: '/wallet',
  },
];

const notificationConfig = {
  delivery: { icon: Package, color: 'text-primary', bg: 'bg-primary/10' },
  system: { icon: Settings, color: 'text-secondary', bg: 'bg-secondary/10' },
  payment: { icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
  alert: { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100' },
};

export default function BusinessNotifications() {
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const [readStatus, setReadStatus] = useState<Record<string, boolean>>(
    Object.fromEntries(notifications.map(n => [n.id, n.read]))
  );

  const toggleRead = (id: string) => {
    setReadStatus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const markAllRead = () => {
    setReadStatus(Object.fromEntries(notifications.map(n => [n.id, true])));
  };

  const deleteNotification = (id: string) => {
    setReadStatus(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'unread') return !readStatus[n.id];
    return true;
  });

  const unreadCount = notifications.filter(n => !readStatus[n.id]).length;

  return (
    <DashboardLayout userType="business">
      <div className="max-w-[1000px] mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-display font-extrabold text-3xl text-on-surface">Notifications</h1>
            <p className="text-sm text-on-surface/60 mt-1">
              {unreadCount} unread notification{unreadCount !== 1 && 's'}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={markAllRead}
              className="gap-2"
            >
              <CheckCheck size={16} /> Mark All Read
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-outline-variant/10">
          {(['all', 'unread'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-3 font-bold text-sm border-b-2 transition-colors",
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-on-surface/40 hover:text-on-surface"
              )}
            >
              {tab === 'all' ? 'All' : 'Unread'} ({tab === 'all' ? notifications.length : unreadCount})
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <Card className="p-12 text-center">
              <Bell size={48} className="text-on-surface/20 mx-auto mb-4" />
              <p className="font-bold text-on-surface/40">No notifications to display</p>
            </Card>
          ) : (
            filteredNotifications.map((notification, idx) => {
              const config = notificationConfig[notification.type];
              const Icon = config.icon;
              const isRead = readStatus[notification.id];

              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className={cn(
                    "p-4 md:p-6 transition-all hover:bg-surface-high group",
                    !isRead && "bg-primary/5 border-primary/20"
                  )}>
                    <div className="flex items-start gap-4">
                      <div className={cn("p-3 rounded-xl shrink-0", config.bg, config.color)}>
                        <Icon size={20} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h4 className={cn(
                              "font-bold text-sm",
                              !isRead ? "text-on-surface" : "text-on-surface/70"
                            )}>
                              {notification.title}
                            </h4>
                            <p className="text-sm text-on-surface/60 mt-1 leading-relaxed">
                              {notification.message}
                            </p>
                          </div>
                          {!isRead && (
                            <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-on-surface/40">{notification.time}</span>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {notification.actionUrl && (
                              <Link to={notification.actionUrl}>
                                <Button variant="secondary" size="sm" className="text-xs h-7">
                                  View
                                </Button>
                              </Link>
                            )}
                            <button
                              onClick={() => toggleRead(notification.id)}
                              className="p-1.5 text-on-surface/40 hover:text-primary transition-colors"
                            >
                              <CheckCircle2 size={14} />
                            </button>
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="p-1.5 text-on-surface/40 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
