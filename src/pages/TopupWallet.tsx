import * as React from 'react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  ArrowLeft, 
  CreditCard, 
  Banknote, 
  ShieldCheck, 
  Zap, 
  Info,
  ChevronRight,
  Wallet,
  CheckCircle2
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { cn } from '@/src/lib/utils';

export default function TopupWallet() {
  const [amount, setAmount] = useState('50000');
  const [selectedMethod, setSelectedMethod] = useState('card');
  const navigate = useNavigate();

  const presets = ['10000', '25000', '50000', '100000', '250000'];

  const paymentMethods = [
    { id: 'card', label: 'Debit / Credit Card', icon: CreditCard, sub: 'Visa, Mastercard, Verve' },
    { id: 'transfer', label: 'Bank Transfer', icon: Banknote, sub: 'Instant account generation' },
    { id: 'ussd', label: 'USSD Code', icon: Zap, sub: 'Dial a code to pay' },
  ];

  const handleTopup = () => {
    // Simulate successful payment
    alert('Payment successful! Your infrastructure wallet has been credited.');
    navigate('/wallet');
  };

  return (
    <DashboardLayout userType="business">
      <div className="max-w-[1000px] mx-auto space-y-10">
        
        {/* Header Section */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <Link to="/wallet" className="inline-flex items-center gap-2 text-on-surface/40 hover:text-primary transition-colors mb-6 group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Back to Wallet</span>
            </Link>
            <h1 className="font-display font-extrabold text-[40px] text-on-surface leading-tight mb-2">Refill Liquidity.</h1>
            <p className="font-sans text-on-surface/60">Inject funds into your orchestration wallet for uninterrupted dispatch operations.</p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">
          
          <div className="space-y-10">
            {/* Amount Selection */}
            <section className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-[10px] font-bold text-on-surface/40 uppercase tracking-[0.2em]">Select Settlement Amount</h3>
                <span className="text-[10px] font-bold text-primary uppercase">NGN (₦)</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {presets.map((p) => (
                  <button
                    key={p}
                    onClick={() => setAmount(p)}
                    className={cn(
                      "py-4 rounded-2xl font-display font-bold text-lg transition-all border",
                      amount === p 
                        ? "bg-primary text-white border-primary shadow-xl shadow-primary/20" 
                        : "bg-surface-low border-outline-variant/10 text-on-surface/60 hover:bg-surface-container"
                    )}
                  >
                    ₦{Number(p).toLocaleString()}
                  </button>
                ))}
                <div className="relative group col-span-2 sm:col-span-1">
                   <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30 font-bold">₦</div>
                   <input 
                    type="number"
                    placeholder="Other"
                    value={presets.includes(amount) ? '' : amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-4 bg-surface-low border border-outline-variant/10 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary font-display font-bold text-lg text-on-surface"
                   />
                </div>
              </div>
            </section>

            {/* Payment Method Selection */}
            <section className="space-y-6">
               <h3 className="text-[10px] font-bold text-on-surface/40 uppercase tracking-[0.2em] px-2">Payment Infrastructure</h3>
               <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <Card 
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={cn(
                        "p-6 cursor-pointer transition-all border flex items-center gap-6 group",
                        selectedMethod === method.id 
                          ? "bg-surface-highest border-primary ring-1 ring-primary shadow-lg" 
                          : "bg-surface-low border-outline-variant/5 hover:border-outline-variant/20"
                      )}
                    >
                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors shadow-sm",
                        selectedMethod === method.id ? "bg-primary text-white" : "bg-surface-container text-on-surface/30 group-hover:text-primary"
                      )}>
                        <method.icon size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-display font-bold text-lg text-on-surface">{method.label}</h4>
                        <p className="text-xs text-on-surface/40 font-medium">{method.sub}</p>
                      </div>
                      {selectedMethod === method.id && (
                        <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center">
                          <CheckCircle2 size={14} />
                        </div>
                      )}
                    </Card>
                  ))}
               </div>
            </section>

            {/* Extra Info */}
            <Card className="bg-primary/5 border border-primary/10 p-6 flex gap-4 items-start">
               <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0"><ShieldCheck size={20} /></div>
               <div className="space-y-1">
                 <h4 className="text-sm font-bold text-primary uppercase tracking-widest">Secured Orchestration</h4>
                 <p className="text-xs text-on-surface/60 font-medium leading-relaxed">
                   All transactions are encrypted using AES-256 infrastructure bank-level security. We do not store your direct card details locally on our nodes.
                 </p>
               </div>
            </Card>
          </div>

          {/* Checkout Sidebar */}
          <aside className="sticky top-32 space-y-6">
             <Card className="p-8 space-y-8 bg-surface-high border border-outline-variant/10 shadow-xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 opacity-5 text-on-surface pointer-events-none">
                   <Wallet size={200} />
                </div>
                
                <h3 className="font-display font-bold text-xl relative z-10">Settlement Review</h3>
                
                <div className="space-y-4 relative z-10">
                   <div className="flex justify-between items-center px-1">
                      <span className="text-xs font-bold text-on-surface/40 uppercase tracking-widest">Injection Amount</span>
                      <span className="font-display font-bold text-on-surface">₦{Number(amount || 0).toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between items-center px-1">
                      <span className="text-xs font-bold text-on-surface/40 uppercase tracking-widest">Service Fee (0%)</span>
                      <span className="font-display font-bold text-emerald-600">₦0.00</span>
                   </div>
                   <div className="pt-6 border-t border-outline-variant/10 flex justify-between items-end px-1">
                      <div>
                        <p className="text-[9px] font-bold text-on-surface/30 uppercase tracking-[0.2em] mb-1">Total Payout</p>
                        <p className="text-[10px] font-bold text-primary uppercase leading-none">Net Liquidity</p>
                      </div>
                      <p className="font-display font-extrabold text-3xl text-on-surface">₦{Number(amount || 0).toLocaleString()}</p>
                   </div>
                </div>

                <div className="space-y-4 relative z-10 pt-4">
                  <Button onClick={handleTopup} size="lg" className="w-full gap-3 shadow-2xl shadow-primary/20">
                    Proceed to Payment <ChevronRight size={18} />
                  </Button>
                  <div className="flex items-start gap-3 px-1">
                    <Info size={14} className="text-on-surface/30 mt-0.5 shrink-0" />
                    <p className="text-[9px] text-on-surface/40 leading-relaxed font-bold uppercase tracking-wider">
                      Funds will be instantly available in your wallet upon successful node settlement.
                    </p>
                  </div>
                </div>
             </Card>

             <Card className="p-6 bg-primary-container text-white adire-texture overflow-hidden relative border-0">
                <div className="relative z-10 flex items-center gap-4">
                   <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm"><Zap size={20} /></div>
                   <div>
                     <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Upcoming Feature</p>
                     <p className="text-sm font-display font-bold">Auto-injection Refill</p>
                   </div>
                </div>
             </Card>
          </aside>

        </div>

      </div>
    </DashboardLayout>
  );
}
