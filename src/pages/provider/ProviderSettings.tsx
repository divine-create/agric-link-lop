import DashboardLayout from '../../components/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  User, 
  Bell, 
  ShieldCheck, 
  CreditCard, 
  MapPin, 
  LogOut,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Link } from 'react-router-dom';

export default function ProviderSettings() {
  return (
    <DashboardLayout userType="provider">
      <div className="max-w-[800px] mx-auto space-y-8">
        
        <div>
          <h1 className="font-display font-extrabold text-3xl text-on-surface">Provider Settings</h1>
          <p className="text-sm text-on-surface/60 mt-1">Manage your profile and preferences</p>
        </div>

        {/* Profile Section */}
        <Card className="p-6 md:p-8 bg-surface-low border border-outline-variant/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <User size={20} />
            </div>
            <h3 className="font-display font-bold text-lg text-on-surface">Provider Profile</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-1 block">Full Name</label>
              <input 
                type="text" 
                defaultValue="Ibrahim Sanusi"
                className="w-full px-4 py-3 bg-surface-highest/50 rounded-xl border-0 focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-1 block">Phone Number</label>
              <input 
                type="tel" 
                defaultValue="+234 801 234 5678"
                className="w-full px-4 py-3 bg-surface-highest/50 rounded-xl border-0 focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-1 block">Vehicle Type</label>
              <select className="w-full px-4 py-3 bg-surface-highest/50 rounded-xl border-0 focus:ring-2 focus:ring-primary/20 text-sm">
                <option>Bike</option>
                <option selected>Van</option>
                <option>Truck</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-1 block">Plate Number</label>
              <input 
                type="text" 
                defaultValue="LAG-123-XY"
                className="w-full px-4 py-3 bg-surface-highest/50 rounded-xl border-0 focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-outline-variant/10">
            <Button>Save Changes</Button>
          </div>
        </Card>

        {/* Notification Preferences */}
        <Card className="p-6 md:p-8 bg-surface-low border border-outline-variant/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Bell size={20} />
            </div>
            <h3 className="font-display font-bold text-lg text-on-surface">Notification Preferences</h3>
          </div>
          
          <div className="space-y-4">
            {[
              { channel: 'Email Notifications', desc: 'Receive job offers via email', enabled: true },
              { channel: 'SMS Notifications', desc: 'Receive job offers via SMS', enabled: true },
              { channel: 'In-App Notifications', desc: 'Show notifications in dashboard', enabled: true },
            ].map((ch, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 border-b border-outline-variant/5 last:border-0">
                <div>
                  <p className="font-bold text-sm text-on-surface">{ch.channel}</p>
                  <p className="text-xs text-on-surface/40">{ch.desc}</p>
                </div>
                <button className={cn(
                  "w-10 h-6 rounded-full transition-colors relative",
                  ch.enabled ? "bg-primary" : "bg-outline-variant/30"
                )}>
                  <div className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                    ch.enabled ? "left-5" : "left-1"
                  )} />
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Availability */}
        <Card className="p-6 md:p-8 bg-surface-low border border-outline-variant/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <MapPin size={20} />
            </div>
            <h3 className="font-display font-bold text-lg text-on-surface">Availability</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm text-on-surface">Online Status</p>
                <p className="text-xs text-on-surface/40">Toggle to receive job offers</p>
              </div>
              <button className="w-10 h-6 rounded-full bg-primary relative">
                <div className="absolute top-1 left-5 w-4 h-4 rounded-full bg-white" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm text-on-surface">Auto-Accept</p>
                <p className="text-xs text-on-surface/40">Automatically accept matching jobs</p>
              </div>
              <button className="w-10 h-6 rounded-full bg-outline-variant/30 relative">
                <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white" />
              </button>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 md:p-8 bg-surface-low border border-red-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-100 text-red-600 rounded-lg">
              <LogOut size={20} />
            </div>
            <h3 className="font-display font-bold text-lg text-red-600">Danger Zone</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm text-on-surface">Log Out</p>
                <p className="text-xs text-on-surface/40">Sign out of your account</p>
              </div>
              <Button variant="secondary" size="sm">Log Out</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm text-red-600">Delete Account</p>
                <p className="text-xs text-on-surface/40">Permanently delete your account and data</p>
              </div>
              <Button variant="secondary" size="sm" className="text-red-600 border-red-200">Delete</Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
