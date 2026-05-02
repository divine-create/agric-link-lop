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

export default function IndividualSettings() {
  return (
    <DashboardLayout userType="individual">
      <div className="max-w-[800px] mx-auto space-y-8">
        
        <div>
          <h1 className="font-display font-extrabold text-3xl text-on-surface">Settings</h1>
          <p className="text-sm text-on-surface/60 mt-1">Manage your personal account preferences</p>
        </div>

        {/* Profile Section */}
        <Card className="p-6 md:p-8 bg-surface-low border border-outline-variant/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <User size={20} />
            </div>
            <h3 className="font-display font-bold text-lg text-on-surface">Personal Profile</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-1 block">Full Name</label>
              <input 
                type="text" 
                defaultValue="David Adebayo"
                className="w-full px-4 py-3 bg-surface-highest/50 rounded-xl border-0 focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-1 block">Email</label>
                <input 
                  type="email" 
                  defaultValue="david@example.com"
                  className="w-full px-4 py-3 bg-surface-highest/50 rounded-xl border-0 focus:ring-2 focus:ring-primary/20 text-sm"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-1 block">Phone</label>
                <input 
                  type="tel" 
                  defaultValue="+234 802 345 6789"
                  className="w-full px-4 py-3 bg-surface-highest/50 rounded-xl border-0 focus:ring-2 focus:ring-primary/20 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-1 block">Delivery Address</label>
              <textarea 
                defaultValue="15 Adeniyi Jones Street, Yaba, Lagos"
                rows={3}
                className="w-full px-4 py-3 bg-surface-highest/50 rounded-xl border-0 focus:ring-2 focus:ring-primary/20 text-sm resize-none"
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
              { channel: 'Email Notifications', desc: 'Receive delivery updates via email', enabled: true },
              { channel: 'SMS Notifications', desc: 'Receive delivery updates via SMS', enabled: true },
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

        {/* Security */}
        <Card className="p-6 md:p-8 bg-surface-low border border-outline-variant/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-display font-bold text-lg text-on-surface">Security</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm text-on-surface">Two-Factor Authentication</p>
                <p className="text-xs text-on-surface/40">Add an extra layer of security</p>
              </div>
              <Button variant="secondary" size="sm">Enable</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm text-on-surface">Change Password</p>
                <p className="text-xs text-on-surface/40">Last changed 3 months ago</p>
              </div>
              <Button variant="secondary" size="sm">Update</Button>
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
