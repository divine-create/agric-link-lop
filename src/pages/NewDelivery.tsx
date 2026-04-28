import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Box, 
  MapPin, 
  Package, 
  Truck, 
  ArrowRight, 
  ArrowLeft, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Thermometer, 
  ShieldAlert, 
  Camera, 
  ChevronRight,
  Layers,
  ShoppingBag,
  Stethoscope,
  Cpu,
  GlassWater,
  Navigation,
  Star,
  ShieldCheck
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { cn } from '@/src/lib/utils';
import Navbar from '../components/Navbar';

type Step = 1 | 2 | 3 | 4;

export default function NewDelivery() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('Bulk Goods');
  const [dimensionUnit, setDimensionUnit] = useState<'cm' | 'inches'>('cm');
  const [selectedCarrier, setSelectedCarrier] = useState<string>('GIG Logistics');
  const [carrierSort, setCarrierSort] = useState<'price' | 'rating' | 'speed'>('rating');
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep((prev) => (prev + 1) as Step);
    else navigate('/confirm-dispatch');
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => (prev - 1) as Step);
    else navigate(-1);
  };

  const categories = [
    { title: 'Parcel', icon: Box },
    { title: 'Bulk Goods', icon: Layers },
    { title: 'Perishables', icon: GlassWater },
    { title: 'Documents', icon: Package },
    { title: 'Fragile', icon: AlertCircle },
    { title: 'Livestock', icon: ShoppingBag },
    { title: 'Medical', icon: Stethoscope },
    { title: 'Electronics', icon: Cpu },
  ];

  const packageSpecs = [
    { label: 'Refrigeration Required', desc: 'Requires temperature-controlled environment', icon: Thermometer, enabled: false },
    { label: 'Fragile Handling', desc: 'High-sensitivity or easily breakable items', icon: AlertCircle, enabled: true },
    { label: 'Hazardous Material', desc: 'Flammable, corrosive, or chemical assets', icon: ShieldAlert, enabled: false },
  ];

  const carriers = [
    { 
      name: 'GIG Logistics', 
      speed: 'Express', 
      rating: 4.8, 
      price: 12400, 
      logo: 'GIG', 
      reliability: '98%', 
      capacity: 'High', 
      tag: 'Fastest',
      nodeCount: 142
    },
    { 
      name: 'Maersk Air', 
      speed: 'Superfast', 
      rating: 4.9, 
      price: 18200, 
      logo: 'MR', 
      reliability: '99.9%', 
      capacity: 'Limited', 
      tag: 'Premium',
      nodeCount: 42
    },
    { 
      name: 'Local Fleet Node', 
      speed: 'Economic', 
      rating: 4.5, 
      price: 4500, 
      logo: 'LF', 
      reliability: '92%', 
      capacity: 'High', 
      tag: 'Eco-Choice',
      nodeCount: 890
    },
    { 
      name: 'Red Star Express', 
      speed: 'Standard', 
      rating: 4.7, 
      price: 8400, 
      logo: 'RS', 
      reliability: '96%', 
      capacity: 'Moderate', 
      tag: 'Reliable',
      nodeCount: 210
    },
  ];

  const sortedCarriers = [...carriers].sort((a, b) => {
    if (carrierSort === 'price') return a.price - b.price;
    if (carrierSort === 'rating') return b.rating - a.rating;
    return 0; // Speed sort would need duration logic, let's stick to these two for now
  });

  const steps = [
    { id: 1, title: 'Route & Destination', icon: MapPin },
    { id: 2, title: 'Package Details', icon: Box },
    { id: 3, title: 'Carrier Selection', icon: Truck },
    { id: 4, title: 'Confirm & Dispatch', icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-surface selection:bg-secondary/30">
      <Navbar />

      <main className="pt-24 md:pt-32 pb-16 md:pb-20 px-4 md:px-6 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 lg:gap-16 items-start">
          
          {/* Progress Sidebar */}
          <aside className="space-y-12">
            <div>
              <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-[0.2em] mb-4 px-1">Step 0{currentStep} / 04</p>
              <h1 className="font-display font-extrabold text-[48px] leading-[1] text-on-surface mb-6">
                {steps[currentStep - 1].title}.
              </h1>
              <p className="font-sans text-on-surface/60 leading-relaxed text-sm">
                Precision is the bedrock of our logistics engine. Provide accurate specifications to ensure optimal routing and handling.
              </p>
            </div>

            <div className="relative space-y-6">
              <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-outline-variant/10"></div>
              {steps.map((step) => (
                <div key={step.id} className="relative pl-12 flex items-center group">
                  <div className={cn(
                    "absolute left-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                    step.id < currentStep ? "bg-primary text-white" :
                    step.id === currentStep ? "bg-secondary text-white shadow-lg shadow-secondary/20" :
                    "bg-surface-highest text-on-surface/20"
                  )}>
                    {step.id < currentStep ? <CheckCircle2 size={16} /> : <step.icon size={16} />}
                  </div>
                  <div>
                    <h4 className={cn(
                      "text-[10px] uppercase font-bold tracking-widest leading-none mb-1",
                      step.id === currentStep ? "text-secondary" : "text-on-surface/30"
                    )}>
                      {step.id < currentStep ? 'Completed' : step.id === currentStep ? 'Current' : 'Upcoming'}
                    </h4>
                    <p className={cn(
                      "font-display font-bold text-sm",
                      step.id > currentStep ? "text-on-surface/20" : "text-on-surface"
                    )}>{step.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Form Content */}
          <div className="space-y-16">
            
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  {/* Origin Well */}
                  <section className="space-y-6">
                    <h2 className="font-display font-bold text-2xl px-1">Pickup Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-4">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface/40 px-1">Pickup Address</label>
                          <div className="input-well flex items-center gap-4">
                             <MapPin size={20} className="text-primary shrink-0" />
                             <input 
                                type="text" 
                                placeholder="Street, Building, Hub" 
                                className="bg-transparent border-0 font-display font-bold text-xl w-full focus:ring-0 placeholder:text-on-surface/20"
                             />
                          </div>
                       </div>
                       <div className="space-y-4">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface/40 px-1">Sender Phone</label>
                          <div className="input-well">
                             <input 
                                type="tel" 
                                placeholder="+234 ..." 
                                className="bg-transparent border-0 font-display font-bold text-xl w-full focus:ring-0 placeholder:text-on-surface/20"
                             />
                          </div>
                       </div>
                    </div>
                  </section>

                  {/* Destination Well */}
                  <section className="space-y-6">
                    <h2 className="font-display font-bold text-2xl px-1">Destination Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-4">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface/40 px-1">Delivery Address</label>
                          <div className="input-well flex items-center gap-4">
                             <Navigation size={20} className="text-secondary shrink-0" />
                             <input 
                                type="text" 
                                placeholder="Final destination node" 
                                className="bg-transparent border-0 font-display font-bold text-xl w-full focus:ring-0 placeholder:text-on-surface/20"
                             />
                          </div>
                       </div>
                       <div className="space-y-4">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface/40 px-1">Recipient Phone</label>
                          <div className="input-well">
                             <input 
                                type="tel" 
                                placeholder="+234 ..." 
                                className="bg-transparent border-0 font-display font-bold text-xl w-full focus:ring-0 placeholder:text-on-surface/20"
                             />
                          </div>
                       </div>
                    </div>
                  </section>

                  {/* Quick Corridor Selection */}
                  <section className="space-y-6">
                    <h2 className="font-display font-bold text-lg md:text-xl px-1 opacity-40">Saved Hubs & Corridors</h2>
                    <div className="flex flex-wrap gap-3">
                       {['Lagos Central Hub', 'Abuja Transit Node', 'Kano Corridor A', 'Port Harcourt Hub'].map(hub => (
                         <button key={hub} className="px-6 py-3 bg-surface-low border border-outline-variant/10 rounded-xl text-xs font-bold uppercase tracking-widest hover:border-primary transition-all">
                           {hub}
                         </button>
                       ))}
                    </div>
                  </section>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-16"
                >
                  {/* Category Selection */}
                  <section className="space-y-8">
                    <h2 className="font-display font-bold text-2xl px-1">Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                      {categories.map((cat) => (
                        <button
                          key={cat.title}
                          onClick={() => setSelectedCategory(cat.title)}
                          className={cn(
                            "flex flex-col items-center gap-4 p-8 rounded-2xl transition-all duration-300 group",
                            selectedCategory === cat.title 
                              ? "bg-primary-container text-white adire-texture shadow-xl" 
                              : "bg-surface-highest text-on-surface/60 hover:bg-surface-container-high"
                          )}
                        >
                          <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                            selectedCategory === cat.title ? "bg-white/10" : "bg-surface-container"
                          )}>
                            <cat.icon size={20} className={cn(
                              selectedCategory === cat.title ? "text-white" : "group-hover:text-primary"
                            )} />
                          </div>
                          <span className="font-sans font-bold text-[13px] uppercase tracking-widest leading-none">{cat.title}</span>
                        </button>
                      ))}
                    </div>
                  </section>

                  {/* Input Wells */}
                  <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface/40 px-1">Package Weight</label>
                      <div className="input-well flex items-center justify-between">
                        <input type="text" placeholder="0.00" className="bg-transparent border-0 font-display font-bold text-2xl w-full focus:ring-0 placeholder:text-on-surface/20" />
                        <div className="flex gap-2">
                          <span className="px-2 py-1 bg-primary text-white text-[10px] font-bold rounded uppercase">kg</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface/40 px-1">Estimated Value</label>
                      <div className="input-well flex items-center">
                        <span className="font-display font-bold text-2xl text-on-surface/40 mr-2">₦</span>
                        <input type="text" placeholder="Enter amount" className="bg-transparent border-0 font-display font-bold text-2xl w-full focus:ring-0 placeholder:text-on-surface/20" />
                      </div>
                    </div>
                  </section>

                  {/* Package Dimensions */}
                  <section className="space-y-8">
                    <div className="flex items-center justify-between px-1">
                      <h2 className="font-display font-bold text-2xl">Package Dimensions</h2>
                      <div className="flex bg-surface-highest p-1 rounded-xl">
                        {['cm', 'inches'].map((unit) => (
                          <button
                            key={unit}
                            onClick={() => setDimensionUnit(unit as 'cm' | 'inches')}
                            className={cn(
                              "px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                              dimensionUnit === unit ? "bg-primary text-white shadow-md" : "text-on-surface/40 hover:text-on-surface"
                            )}
                          >
                            {unit}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface/40 px-1">Length</label>
                        <div className="input-well">
                          <input type="number" placeholder="0" className="bg-transparent border-0 font-display font-bold text-2xl w-full focus:ring-0 placeholder:text-on-surface/20" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface/40 px-1">Width</label>
                        <div className="input-well">
                          <input type="number" placeholder="0" className="bg-transparent border-0 font-display font-bold text-2xl w-full focus:ring-0 placeholder:text-on-surface/20" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface/40 px-1">Height</label>
                        <div className="input-well">
                          <input type="number" placeholder="0" className="bg-transparent border-0 font-display font-bold text-2xl w-full focus:ring-0 placeholder:text-on-surface/20" />
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Special Handling */}
                  <section className="space-y-6">
                    <h2 className="font-display font-bold text-2xl px-1">Special Handling</h2>
                    <div className="space-y-3">
                      {packageSpecs.map((spec, idx) => (
                        <div 
                          key={idx}
                          className="p-6 rounded-2xl flex items-center justify-between bg-surface-low hover:bg-surface-container-high transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-xl bg-surface-highest text-on-surface/30 group-hover:text-primary flex items-center justify-center transition-colors">
                              <spec.icon size={20} />
                            </div>
                            <div>
                              <h4 className="font-display font-bold text-lg leading-none mb-1 text-on-surface">{spec.label}</h4>
                              <p className="text-xs text-on-surface/40 font-sans">{spec.desc}</p>
                            </div>
                          </div>
                          <div className="w-6 h-6 rounded-md border-2 border-outline-variant/30 transition-all flex items-center justify-center">
                            {spec.enabled && <CheckCircle2 size={16} className="text-primary" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Visuals */}
                  <section className="space-y-6">
                    <h2 className="font-display font-bold text-xl md:text-2xl px-1">Package Visuals</h2>
                    <div className="border-2 border-dashed border-outline-variant/30 rounded-3xl p-8 md:p-16 flex flex-col items-center justify-center text-center gap-4 md:gap-6 bg-surface-low hover:bg-surface-high transition-colors group cursor-pointer">
                      <div className="w-20 h-20 bg-surface-highest rounded-full flex items-center justify-center text-on-surface/30 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                        <Camera size={32} />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-xl mb-2">Upload Package Photos</h3>
                        <p className="text-xs text-on-surface/40 font-sans">Drag and drop or click to browse (MAX 10MB)</p>
                      </div>
                    </div>
                  </section>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <h2 className="font-display font-bold text-2xl px-1">Carrier Network Selection</h2>
                    <div className="flex items-center gap-3 bg-surface-highest p-1 rounded-xl">
                       {[
                         { id: 'rating', label: 'Recommended' },
                         { id: 'price', label: 'Lowest Price' }
                       ].map((sort) => (
                         <button
                           key={sort.id}
                           onClick={() => setCarrierSort(sort.id as 'price' | 'rating')}
                           className={cn(
                             "px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                             carrierSort === sort.id ? "bg-primary text-white shadow-md" : "text-on-surface/40 hover:text-on-surface"
                           )}
                         >
                           {sort.label}
                         </button>
                       ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {sortedCarriers.map((carrier, i) => (
                      <Card 
                        key={i} 
                        onClick={() => setSelectedCarrier(carrier.name)}
                        className={cn(
                          "p-8 flex flex-col md:flex-row items-center justify-between gap-8 transition-all cursor-pointer group",
                          selectedCarrier === carrier.name 
                            ? "bg-surface-high border-2 border-primary shadow-xl ring-4 ring-primary/5" 
                            : "bg-surface-low border border-outline-variant/10 hover:bg-surface-high"
                        )}
                      >
                        <div className="flex items-center gap-8 w-full">
                          <div className={cn(
                            "w-20 h-20 rounded-2xl flex items-center justify-center font-display font-black text-2xl transition-all shadow-sm shrink-0",
                            selectedCarrier === carrier.name ? "bg-primary text-white" : "bg-surface-highest text-primary/30 group-hover:bg-primary group-hover:text-white"
                          )}>
                            {carrier.logo}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                              <h3 className="font-display font-bold text-2xl group-hover:text-primary transition-colors">{carrier.name}</h3>
                              <span className="px-2 py-0.5 bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-widest rounded-full">{carrier.tag}</span>
                            </div>
                            <div className="flex flex-wrap gap-x-6 gap-y-3 text-[11px] font-bold text-on-surface/40 uppercase tracking-widest">
                               <div className="flex items-center gap-2">
                                  <Truck size={14} className="text-primary/40" />
                                  <span className="text-on-surface">{carrier.speed} Delivery</span>
                               </div>
                               <div className="flex items-center gap-2">
                                  <Star size={14} className="text-secondary" fill="currentColor" />
                                  <span className="text-on-surface">{carrier.rating} rating</span>
                               </div>
                               <div className="flex items-center gap-2">
                                  <ShieldCheck size={14} className="text-primary/40" />
                                  <span className="text-on-surface">{carrier.reliability} Reliability</span>
                               </div>
                               <div className="hidden sm:flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                                  <span>{carrier.nodeCount} Active Nodes</span>
                               </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right w-full md:w-auto pt-6 md:pt-0 border-t md:border-0 border-outline-variant/10">
                           <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest mb-1">Total Orchestration</p>
                           <p className="font-display font-black text-4xl text-on-surface tracking-tighter">₦{carrier.price.toLocaleString()}</p>
                           <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mt-1">SLA Guaranteed</p>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <Card className="p-8 bg-surface-highest/50 border-dashed border-2 border-outline-variant/20 flex flex-col md:flex-row items-center justify-between gap-8">
                     <div className="flex-1">
                        <h4 className="font-display font-bold text-lg mb-1">Custom Infrastructure Quote?</h4>
                        <p className="text-sm text-on-surface/50 max-w-sm">Need a dedicated node fleet or higher insurance limits? Speak with our network architects.</p>
                     </div>
                     <Button variant="secondary">Request Enterprise Tier</Button>
                  </Card>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <h2 className="font-display font-bold text-2xl px-1">Review & Dispatch</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Summary Cards */}
                    <Card className="p-8 space-y-6 bg-surface-low border-outline-variant/10">
                      <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/10">
                        <MapPin className="text-primary" size={20} />
                        <h3 className="font-display font-bold text-lg">Route Architecture</h3>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-[10px] font-bold text-on-surface/30 uppercase tracking-widest mb-1">Origination</p>
                          <p className="text-sm font-bold text-on-surface">12 Admiralty Way, Lekki, Lagos</p>
                        </div>
                        <div className="w-px h-4 bg-outline-variant/20 ml-2"></div>
                        <div>
                          <p className="text-[10px] font-bold text-on-surface/30 uppercase tracking-widest mb-1">Termination</p>
                          <p className="text-sm font-bold text-on-surface">45 Aminu Kano Cres, Wuse 2, Abuja</p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-8 space-y-6 bg-surface-low border-outline-variant/10">
                      <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/10">
                        <Box className="text-secondary" size={20} />
                        <h3 className="font-display font-bold text-lg">Payload Analysis</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-[10px] font-bold text-on-surface/30 uppercase tracking-widest mb-1">Category</p>
                          <p className="text-sm font-bold text-on-surface">{selectedCategory}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-on-surface/30 uppercase tracking-widest mb-1">Weight</p>
                          <p className="text-sm font-bold text-on-surface">1.2 Tons</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-on-surface/30 uppercase tracking-widest mb-1">Value</p>
                          <p className="text-sm font-bold text-on-surface">₦4,200,000</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-on-surface/30 uppercase tracking-widest mb-1">Special Handling</p>
                          <p className="text-xs font-bold text-primary">Fragile Active</p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <Card className="p-8 bg-primary/5 border-primary/20 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center font-display font-black text-2xl shadow-lg">
                        {carriers.find(c => c.name === selectedCarrier)?.logo || 'GIG'}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Selected Carrier</p>
                        <h3 className="font-display font-bold text-2xl text-on-surface">{selectedCarrier}</h3>
                        <p className="text-xs text-on-surface/50 font-sans">Reliability Level: {carriers.find(c => c.name === selectedCarrier)?.reliability}</p>
                      </div>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest mb-1">Total Settlement</p>
                       <p className="font-display font-black text-4xl text-primary tracking-tighter">
                          ₦{carriers.find(c => c.name === selectedCarrier)?.price.toLocaleString()}
                       </p>
                    </div>
                  </Card>

                  <div className="space-y-6 pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded border-2 border-outline-variant/30 mt-0.5 flex items-center justify-center cursor-pointer hover:border-primary transition-all">
                        <CheckCircle2 size={14} className="text-primary" />
                      </div>
                      <p className="text-xs text-on-surface/50 leading-relaxed font-sans max-w-2xl">
                        I confirm that all package specifications are accurate and that the cargo does not contain any prohibited items. I accept the <span className="text-primary font-bold underline cursor-pointer">Logistics Orchestration Terms of Service</span> and the carrier's SLA.
                      </p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded border-2 border-outline-variant/30 mt-0.5 flex items-center justify-center cursor-pointer hover:border-primary transition-all">
                        <CheckCircle2 size={14} className="text-primary" />
                      </div>
                      <p className="text-xs text-on-surface/50 leading-relaxed font-sans max-w-2xl">
                        Activate **Full-Value Asset Insurance** for this haul (₦12,500 additional fee).
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer Navigation */}
            <footer className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-8">
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-xs font-bold text-on-surface/40 uppercase tracking-widest hover:text-primary hover:gap-3 transition-all"
              >
                <ArrowLeft size={16} /> {currentStep === 1 ? 'Cancel Dispatch' : 'Back'}
              </button>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button variant="ghost" className="hidden sm:inline-flex">Save Draft</Button>
                <Button onClick={handleNext} size="lg" className="gap-3">
                  {currentStep === 4 ? 'Confirm & Deploy Haul' : currentStep === 3 ? 'Review Dispatch' : 'Continue'} <ChevronRight size={20} />
                </Button>
              </div>
            </footer>

          </div>
        </div>
      </main>
    </div>
  );
}
