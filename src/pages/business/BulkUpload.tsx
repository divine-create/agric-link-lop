import * as React from 'react';
import { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ChevronRight, 
  ArrowRight,
  RefreshCw,
  Box
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { cn } from '@/src/lib/utils';

export default function BulkUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'parsing' | 'preview' | 'processing' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (!selected.name.endsWith('.csv') && !selected.name.endsWith('.xlsx')) {
        setError('Please upload a valid CSV or Excel file.');
        return;
      }
      setFile(selected);
      setError(null);
      setStatus('parsing');
      
      // Simulate parsing
      setTimeout(() => setStatus('preview'), 2000);
    }
  };

  const mockParsedData = [
    { id: 1, recipient: 'John Doe', phone: '08012345678', address: '123 Ikeja Way, Lagos', weight: '2kg', status: 'valid' },
    { id: 2, recipient: 'Jane Smith', phone: '09087654321', address: '45 Lekki Phase 1', weight: '5kg', status: 'valid' },
    { id: 3, recipient: 'Invalid User', phone: '123', address: 'No Address', weight: '0kg', status: 'error' },
  ];

  return (
    <DashboardLayout userType="business">
      <div className="max-w-[1200px] mx-auto space-y-10 pb-12">
        
        {/* Header */}
        <header className="space-y-4">
          <h1 className="font-display font-extrabold text-[40px] text-on-surface leading-tight">Bulk Orchestration.</h1>
          <p className="font-sans text-on-surface/60 max-w-2xl text-lg">Upload up to 500 delivery requests in a single batch. Use our standardized template for seamless network integration.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-10 items-start">
          
          <div className="space-y-8">
            {/* Upload Area */}
            {status === 'idle' && (
              <Card className="p-16 border-2 border-dashed border-outline-variant/20 hover:border-primary/30 transition-all flex flex-col items-center justify-center text-center space-y-6 bg-surface-low shadow-none">
                <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                  <Upload size={40} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-2xl">Drop your payload here</h3>
                  <p className="text-sm text-on-surface/40">CSV or Excel files supported. Maximum 500 rows per batch.</p>
                </div>
                <label className="cursor-pointer">
                  <input type="file" className="hidden" onChange={handleFileChange} accept=".csv,.xlsx" />
                  <Button size="lg" className="px-10 h-14">Select Local File</Button>
                </label>
                {error && (
                  <div className="flex items-center gap-2 text-secondary text-sm font-bold bg-secondary/5 px-4 py-2 rounded-lg">
                    <AlertCircle size={16} /> {error}
                  </div>
                )}
              </Card>
            )}

            {/* Parsing State */}
            {status === 'parsing' && (
              <Card className="p-20 flex flex-col items-center justify-center text-center space-y-8 bg-on-surface text-white border-0 adire-texture">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-primary">
                    <RefreshCw size={32} />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-3xl uppercase tracking-tight text-white">Parsing Infrastructure...</h3>
                  <p className="text-white/40 font-mono text-xs uppercase tracking-widest">Validating nodes and corridor routing</p>
                </div>
              </Card>
            )}

            {/* Preview State */}
            {status === 'preview' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center px-2">
                  <h3 className="text-xs font-bold text-on-surface/40 uppercase tracking-[0.2em]">Batch Preview (3 Rows Detected)</h3>
                  <Button variant="ghost" size="sm" onClick={() => setStatus('idle')} className="text-secondary gap-2 hover:bg-secondary/5">
                    <X size={16} /> Clear & Restart
                  </Button>
                </div>
                <Card className="overflow-hidden border-outline-variant/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-outline-variant/10 bg-surface-highest/30">
                        <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Recipient</th>
                        <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Destination Node</th>
                        <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Payload</th>
                        <th className="text-right p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/5">
                      {mockParsedData.map((row) => (
                        <tr key={row.id} className={cn(
                          "hover:bg-surface-low transition-colors",
                          row.status === 'error' && "bg-secondary/[0.02]"
                        )}>
                          <td className="p-6">
                            <p className="font-bold text-on-surface">{row.recipient}</p>
                            <p className="text-xs text-on-surface/40">{row.phone}</p>
                          </td>
                          <td className="p-6 text-xs text-on-surface/70 font-medium">{row.address}</td>
                          <td className="p-6 text-xs font-bold text-on-surface">{row.weight}</td>
                          <td className="p-6 text-right">
                            <span className={cn(
                              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                              row.status === 'valid' ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                            )}>
                              {row.status === 'valid' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="p-8 bg-surface-highest/30 flex justify-between items-center">
                    <p className="text-sm text-on-surface/60 italic">Please resolve errors in your local file before final deployment.</p>
                    <Button 
                      size="lg" 
                      className="gap-3 shadow-xl shadow-primary/20"
                      onClick={() => setStatus('success')}
                    >
                      Deploy Validated Batch <ArrowRight size={20} />
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {/* Success State */}
            {status === 'success' && (
              <Card className="p-16 text-center space-y-8 border-primary/20 bg-primary/[0.02]">
                <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center mx-auto shadow-2xl shadow-primary/20">
                  <CheckCircle2 size={48} />
                </div>
                <div className="space-y-4">
                  <h2 className="font-display font-black text-5xl tracking-tighter text-on-surface uppercase">Batch Propagated.</h2>
                  <p className="text-on-surface/60 text-lg max-w-md mx-auto">Your orchestration payload has been successfully integrated into the corridor mesh. Initializing carrier matching...</p>
                </div>
                <div className="flex gap-4 justify-center">
                  <Button size="lg" className="px-10">Track Batch Progress</Button>
                  <Button variant="secondary" size="lg" onClick={() => setStatus('idle')}>Upload New Batch</Button>
                </div>
              </Card>
            )}
          </div>

          <aside className="space-y-8">
            <Card className="p-8 space-y-6">
              <h3 className="text-xs font-bold text-on-surface/40 uppercase tracking-[0.2em] flex items-center gap-2">
                <FileText size={16} /> Technical Spec
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Template Version', val: 'v2.4 (2025)' },
                  { label: 'Row Limit', val: '500 entries' },
                  { label: 'Encoding', val: 'UTF-8' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-sm text-on-surface/60">{item.label}</span>
                    <span className="text-sm font-bold text-on-surface">{item.val}</span>
                  </div>
                ))}
              </div>
              <hr className="border-outline-variant/10" />
              <Button variant="secondary" className="w-full gap-2 h-14 bg-surface-highest">
                <Download size={18} /> Download Template
              </Button>
            </Card>

            <Card className="p-8 bg-on-surface text-white space-y-6 border-0 shadow-xl overflow-hidden relative">
               <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3">
                     <Box className="text-primary" size={24} />
                     <h4 className="font-display font-bold text-lg">Auto-Assignment</h4>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed">
                     Orchestration engine will automatically match providers based on proximity, reliability score, and vehicle capacity.
                  </p>
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                     <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                     Engine Active
                  </div>
               </div>
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <RefreshCw size={120} />
               </div>
            </Card>
          </aside>

        </div>
      </div>
    </DashboardLayout>
  );
}
