import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Code, Terminal, Key, Database, Zap, ArrowRight, Copy } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function ApiDocs() {
  const endpoints = [
    { method: 'POST', path: '/v1/shipments/create', desc: 'Initialize a new coordinated shipment.' },
    { method: 'GET', path: '/v1/shipments/{id}/track', desc: 'Retrieve high-fidelity telemetry for a dispatch.' },
    { method: 'POST', path: '/v1/riders/optimize', desc: 'Find the highest-success-probability provider.' },
  ];

  return (
    <div className="min-h-screen bg-surface selection:bg-secondary/30">
      <Navbar />
      
      <main className="pt-24 md:pt-32 pb-16 md:pb-20 px-4 md:px-6 max-w-[1200px] mx-auto">
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          
          {/* Sidebar Nav */}
          <aside className="space-y-10 md:space-y-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full mb-6">
                <Terminal size={14} />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest leading-none">Developer Engine</span>
              </div>
              <h1 className="font-display font-extrabold text-[36px] md:text-[48px] leading-tight text-on-surface mb-6">API Core.</h1>
              <p className="text-on-surface/60 leading-relaxed font-sans text-sm md:text-base">
                Our infrastructure is built API-first. Integrate LOP directly into your supply chain management with our robust SDKs and RESTful endpoints.
              </p>
            </div>

            <nav className="flex flex-row lg:flex-col gap-2 md:gap-4 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-hide">
              <h3 className="hidden lg:block text-xs font-bold text-on-surface/40 uppercase tracking-[0.2em] mb-2 px-2">Fundamentals</h3>
              {[
                { label: 'Authentication', active: true },
                { label: 'Platform Errors', active: false },
                { label: 'Webhooks', active: false },
                { label: 'Rate Limits', active: false },
              ].map((item, idx) => (
                <button 
                   key={idx} 
                   className={cn(
                     "whitespace-nowrap flex-shrink-0 text-left px-4 py-3 rounded-xl font-sans font-bold text-sm transition-all",
                     item.active ? "bg-primary text-white shadow-lg" : "text-on-surface/60 hover:bg-surface-container"
                   )}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Docs Content */}
          <div className="space-y-16">
            
            <section className="space-y-8">
              <h2 className="font-display font-bold text-3xl">Quick Authentication</h2>
              <p className="text-on-surface/60 max-w-2xl">
                Every request to the LOP Engine must be authenticated using your platform API Key. Authenticators must be used in the `Authorization` header as a Bearer token.
              </p>
              
              <Card className="bg-primary-container p-0 overflow-hidden border-0">
                <div className="bg-white/5 px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                  </div>
                  <button className="text-white/40 hover:text-white transition-colors"><Copy size={16} /></button>
                </div>
                <pre className="p-8 text-on-primary-container font-mono text-sm leading-relaxed overflow-x-auto">
                  <code>
                    {`# Example Authentication Header\nAuthorization: Bearer lop_live_83921...`}
                  </code>
                </pre>
              </Card>
            </section>

            <section className="space-y-10">
              <h2 className="font-display font-bold text-3xl">Critical Endpoints</h2>
              <div className="space-y-6">
                 {endpoints.map((ep, idx) => (
                   <Card key={idx} className="p-8 group hover:bg-surface-container transition-colors border border-outline-variant/10">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
                        <div className="flex items-center gap-4">
                          <span className="px-3 py-1 bg-primary text-white text-[10px] font-extrabold rounded-md shadow-sm">{ep.method}</span>
                          <span className="font-mono text-primary font-bold">{ep.path}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-2">View Params <ArrowRight size={14} /></Button>
                      </div>
                      <p className="text-on-surface/60 text-sm leading-relaxed">{ep.desc}</p>
                   </Card>
                 ))}
              </div>
            </section>

            <section className="pt-10 border-t border-outline-variant/10">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <Card className="bg-surface-low p-8 md:p-10 flex flex-col items-start gap-6">
                    <div className="p-4 bg-primary/10 rounded-2xl text-primary"><Database size={32} /></div>
                    <h3 className="font-display font-bold text-xl md:text-2xl leading-tight">SDK Libraries</h3>
                    <p className="text-sm text-on-surface/50 leading-relaxed">Official libraries for Python, Go, Node.js and Flutter to accelerate your build.</p>
                    <Button variant="secondary" className="mt-auto w-full md:w-auto">Explore GitHub Repo</Button>
                  </Card>
                  <Card className="bg-surface-low p-8 md:p-10 flex flex-col items-start gap-6">
                    <div className="p-4 bg-secondary/10 rounded-2xl text-secondary"><Zap size={32} /></div>
                    <h3 className="font-display font-bold text-xl md:text-2xl leading-tight">Sandbox Access</h3>
                    <p className="text-sm text-on-surface/50 leading-relaxed">Test your core logistics integration in a risk-free staging environment.</p>
                    <Button variant="secondary" className="mt-auto w-full md:w-auto">Generate Test Key</Button>
                  </Card>
               </div>
            </section>

          </div>

        </section>
      </main>
      <Footer />
    </div>
  );
}
