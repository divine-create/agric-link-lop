import * as React from 'react';
import { useState } from 'react';
import { 
  AlertTriangle, 
  Search, 
  Plus, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  FileText,
  ChevronRight
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { cn } from '@/src/lib/utils';

const disputes = [
  { id: 'DSP-102', job: 'LOP-7721', reason: 'Incorrect Payment', status: 'Under Review', date: '2025-04-20' },
  { id: 'DSP-098', job: 'LOP-6540', reason: 'Wrongful Rating', status: 'Resolved', date: '2025-04-12' },
];

export default function DisputeSubmission() {
  const [step, setStep] = useState<'list' | 'create'>('list');

  return (
    <DashboardLayout userType="provider">
      <div className="max-w-[1200px] mx-auto space-y-10 pb-12">
        
        {/* Header */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="font-display font-extrabold text-[40px] text-on-surface leading-tight">Dispute Center.</h1>
            <p className="font-sans text-on-surface/60 max-w-xl">Submit and track disputes regarding payments, ratings, or wrongful job cancellations.</p>
          </div>
          {step === 'list' && (
            <Button onClick={() => setStep('create')} className="gap-2 shadow-2xl shadow-primary/20">
               <Plus size={18} /> New Dispute
            </Button>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">
          
          <div className="space-y-8">
            {step === 'list' ? (
              <div className="space-y-6">
                <div className="flex gap-2 overflow-x-auto">
                  {['All', 'Under Review', 'Resolved', 'Rejected'].map((s) => (
                    <button
                      key={s}
                      className={cn(
                        "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                        s === 'All' ? "bg-primary text-white" : "bg-surface-high text-on-surface/40 hover:text-on-surface"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  {disputes.map((d) => (
                    <Card key={d.id} className="p-6 border-outline-variant/10 hover:bg-surface-low transition-colors group cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-6">
                          <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                            d.status === 'Resolved' ? "bg-emerald-50 text-emerald-500" : "bg-primary/5 text-primary"
                          )}>
                            <ShieldAlert size={24} />
                          </div>
                          <div>
                            <div className="flex items-center gap-3">
                              <p className="font-bold text-on-surface">{d.id}</p>
                              <span className={cn(
                                "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest",
                                d.status === 'Resolved' ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"
                              )}>{d.status}</span>
                            </div>
                            <p className="text-xs text-on-surface/40 mt-1">Job ID: {d.job} • Filed on {d.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <p className="text-sm font-bold text-on-surface/70 hidden md:block">{d.reason}</p>
                           <ChevronRight size={20} className="text-on-surface/20 group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <Card className="p-8 md:p-10 space-y-8 bg-surface-low border-outline-variant/10">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface/40">Reference Job ID</label>
                    <input 
                      type="text" 
                      placeholder="e.g. LOP-7721" 
                      className="w-full px-4 py-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface/40">Reason for Dispute</label>
                    <select className="w-full px-4 py-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm appearance-none">
                       <option>Select Reason</option>
                       <option>Incorrect Payment</option>
                       <option>Wrongful Rating</option>
                       <option>Platform Technical Issue</option>
                       <option>Business Misconduct</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface/40">Detailed Evidence</label>
                    <textarea 
                      rows={6}
                      placeholder="Describe the issue in detail. Include times, locations, and any other relevant facts."
                      className="w-full px-4 py-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="secondary" onClick={() => setStep('list')} className="flex-1 h-14">Cancel</Button>
                  <Button onClick={() => setStep('list')} className="flex-1 h-14 gap-2">Submit Dispute <ArrowRight size={20} /></Button>
                </div>
              </Card>
            )}
          </div>

          <aside className="space-y-8">
             <Card className="p-8 space-y-6 bg-on-surface text-white border-0 shadow-2xl relative overflow-hidden">
                <div className="relative z-10 space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-secondary text-white rounded-lg"><Clock size={20} /></div>
                      <h3 className="font-display font-bold text-xl">SLA Commitment</h3>
                   </div>
                   <p className="text-sm text-white/50 leading-relaxed font-sans">Disputes are reviewed by our Compliance Team within **48 business hours**. We guarantee a fair hearing for all nodes.</p>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-5">
                   <MessageSquare size={150} />
                </div>
             </Card>

             <Card className="p-8 space-y-6 border-outline-variant/10">
                <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface/40 flex items-center gap-2">
                   <HelpCircle size={14} /> Dispute Guidelines
                </h4>
                <div className="space-y-4">
                   {[
                     'Provide photographic evidence if possible.',
                     'Keep descriptions concise and factual.',
                     'Check job history before filing.',
                     'Fraudulent disputes may result in de-tiering.'
                   ].map((tip, i) => (
                     <div key={i} className="flex gap-3 text-xs leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shrink-0" />
                        <span className="text-on-surface/60 font-medium">{tip}</span>
                     </div>
                   ))}
                </div>
             </Card>
          </aside>

        </div>
      </div>
    </DashboardLayout>
  );
}
