import { motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Package, CheckCircle2, Clock } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export default function IndividualNotifications() {
  return (
    <DashboardLayout userType="individual">
      <div className="max-w-[1000px] mx-auto space-y-8">
        <h1 className="font-display font-extrabold text-3xl text-on-surface">My Alerts</h1>
        <Card className="p-12 text-center border-outline-variant/10">
           <Bell size={48} className="text-on-surface/20 mx-auto mb-4" />
           <p className="font-bold text-on-surface/40">No new alerts. Your shipments are on track.</p>
        </Card>
      </div>
    </DashboardLayout>
  );
}
