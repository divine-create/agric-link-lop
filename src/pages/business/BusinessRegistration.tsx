import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Upload, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck,
  ChevronRight,
  AlertCircle,
  Store,
  Truck,
  Heart,
  ShoppingCart
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import Navbar from '../../components/Navbar';

const businessCategories = [
  { id: 'agriculture', label: 'Agriculture', icon: Store },
  { id: 'ecommerce', label: 'E-Commerce', icon: ShoppingCart },
  { id: 'retail', label: 'Retail', icon: Store },
  { id: 'healthcare', label: 'Healthcare', icon: Heart },
  { id: 'other', label: 'Other', icon: Building2 },
];

type Step = 'info' | 'documents' | 'category' | 'verification' | 'success';

export default function BusinessRegistration() {
  const [step, setStep] = useState<Step>('info');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    rcNumber: '',
    address: '',
    contactPerson: '',
    email: '',
    phone: '',
    category: '',
    cacFile: null as File | null,
    utilityFile: null as File | null,
    emailOtp: '',
    phoneOtp: '',
  });

  const handleSubmit = () => {
    setStep('success');
    setTimeout(() => {
      navigate('/dashboard/business');
    }, 2500);
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: 'cacFile' | 'utilityFile', file: File | null) => {
    updateField(field, file);
  };

  const renderStep = () => {
    switch(step) {
      case 'info':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h2 className="font-display font-bold text-2xl text-on-surface mb-2">Business Information</h2>
              <p className="text-sm text-on-surface/40">Tell us about your business. All fields are required.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
                <input 
                  required
                  type="text" 
                  placeholder="Business Name" 
                  value={formData.businessName}
                  onChange={(e) => updateField('businessName', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm"
                />
              </div>
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
                <input 
                  required
                  type="text" 
                  placeholder="RC Number (CAC)" 
                  value={formData.rcNumber}
                  onChange={(e) => updateField('rcNumber', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm"
                />
              </div>
            </div>

            <div className="relative">
              <MapPin className="absolute left-4 top-4 text-on-surface/30" size={18} />
              <textarea 
                required
                placeholder="Business Address" 
                value={formData.address}
                onChange={(e) => updateField('address', e.target.value)}
                rows={3}
                className="w-full pl-12 pr-4 py-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm resize-none"
              />
            </div>

            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
              <input 
                required
                type="text" 
                placeholder="Contact Person" 
                value={formData.contactPerson}
                onChange={(e) => updateField('contactPerson', e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
                <input 
                  required
                  type="email" 
                  placeholder="Email Address" 
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
                <input 
                  required
                  type="tel" 
                  placeholder="Phone Number" 
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm"
                />
              </div>
            </div>

            <Button 
              onClick={() => setStep('documents')}
              className="w-full h-14 text-base gap-3"
            >
              Continue <ArrowRight size={20} />
            </Button>
          </motion.div>
        );

      case 'documents':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h2 className="font-display font-bold text-2xl text-on-surface mb-2">Upload Documents</h2>
              <p className="text-sm text-on-surface/40">Upload required verification documents.</p>
            </div>

            {[
              { 
                field: 'cacFile' as const, 
                label: 'CAC Certificate', 
                desc: 'Upload your Corporate Affairs Commission certificate',
                file: formData.cacFile 
              },
              { 
                field: 'utilityFile' as const, 
                label: 'Proof of Address', 
                desc: 'Utility bill or bank statement (not older than 3 months)',
                file: formData.utilityFile 
              },
            ].map((doc) => (
              <Card key={doc.field} className="p-6 border-2 border-dashed border-outline-variant/20 hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    <Upload size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display font-bold text-on-surface mb-1">{doc.label}</h4>
                    <p className="text-xs text-on-surface/40 mb-3">{doc.desc}</p>
                    <label className="inline-block">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(doc.field, e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl text-sm font-bold cursor-pointer hover:bg-primary/20 transition-colors">
                        <Upload size={16} />
                        {doc.file ? doc.file.name : 'Choose File'}
                      </span>
                    </label>
                    {doc.file && (
                      <p className="text-xs text-primary mt-2 flex items-center gap-1">
                        <CheckCircle2 size={12} /> File uploaded successfully
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}

            <div className="flex gap-4">
              <Button 
                variant="secondary" 
                onClick={() => setStep('info')}
                className="flex-1 h-14 text-base gap-2"
              >
                <ArrowLeft size={20} /> Back
              </Button>
              <Button 
                onClick={() => setStep('category')}
                className="flex-1 h-14 text-base gap-3"
              >
                Continue <ArrowRight size={20} />
              </Button>
            </div>
          </motion.div>
        );

      case 'category':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h2 className="font-display font-bold text-2xl text-on-surface mb-2">Business Category</h2>
              <p className="text-sm text-on-surface/40">Select the category that best describes your business.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {businessCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => updateField('category', cat.id)}
                  className={cn(
                    "w-full text-left p-4 rounded-2xl transition-all border group flex items-center gap-4",
                    formData.category === cat.id 
                      ? "bg-primary/5 border-primary shadow-[0_0_0_1px_rgba(45,90,46,1)]" 
                      : "bg-surface-high border-outline-variant/10 hover:border-outline-variant/30"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                    formData.category === cat.id ? "bg-primary text-white scale-110" : "bg-surface-highest text-on-surface/20"
                  )}>
                    <cat.icon size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-sm text-on-surface">{cat.label}</p>
                  </div>
                  <div className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center transition-all",
                    formData.category === cat.id ? "bg-primary text-white" : "border-2 border-outline-variant/20"
                  )}>
                    {formData.category === cat.id && <CheckCircle2 size={12} />}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <Button 
                variant="secondary" 
                onClick={() => setStep('documents')}
                className="flex-1 h-14 text-base gap-2"
              >
                <ArrowLeft size={20} /> Back
              </Button>
              <Button 
                onClick={() => setStep('verification')}
                disabled={!formData.category}
                className="flex-1 h-14 text-base gap-3"
              >
                Continue <ArrowRight size={20} />
              </Button>
            </div>
          </motion.div>
        );

      case 'verification':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h2 className="font-display font-bold text-2xl text-on-surface mb-2">Verify Your Account</h2>
              <p className="text-sm text-on-surface/40">Enter the 6-digit codes sent to your email and phone.</p>
            </div>

            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="font-bold text-sm text-on-surface">Email Verification</p>
                  <p className="text-xs text-on-surface/40">Code sent to {formData.email}</p>
                </div>
              </div>
              <div className="flex gap-2 justify-center">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="w-12 h-14 text-center text-2xl font-bold bg-surface-highest/50 rounded-xl border-0 focus:ring-2 focus:ring-primary/20"
                  />
                ))}
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="font-bold text-sm text-on-surface">Phone Verification</p>
                  <p className="text-xs text-on-surface/40">Code sent to {formData.phone}</p>
                </div>
              </div>
              <div className="flex gap-2 justify-center">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="w-12 h-14 text-center text-2xl font-bold bg-surface-highest/50 rounded-xl border-0 focus:ring-2 focus:ring-primary/20"
                  />
                ))}
              </div>
            </Card>

            <div className="flex gap-4">
              <Button 
                variant="secondary" 
                onClick={() => setStep('category')}
                className="flex-1 h-14 text-base gap-2"
              >
                <ArrowLeft size={20} /> Back
              </Button>
              <Button 
                onClick={handleSubmit}
                className="flex-1 h-14 text-base gap-3"
              >
                Verify & Submit <ArrowRight size={20} />
              </Button>
            </div>
          </motion.div>
        );

      case 'success':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 py-8"
          >
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} className="text-primary" />
            </div>
            <h2 className="font-display font-bold text-3xl text-on-surface">Registration Submitted!</h2>
            <p className="text-sm text-on-surface/60 max-w-md mx-auto">
              Your application is under review. We'll notify you via email and SMS once your account is approved. This usually takes 1-2 business days.
            </p>
            <div className="pt-6 space-y-3">
              <Link to="/dashboard/business" className="block">
                <Button className="w-full h-14 text-base gap-3">
                  Go to Dashboard <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/" className="block">
                <Button variant="secondary" className="w-full h-14 text-base">
                  Back to Home
                </Button>
              </Link>
            </div>
          </motion.div>
        );
    }
  };

  const steps = [
    { id: 'info', label: 'Business Info' },
    { id: 'documents', label: 'Documents' },
    { id: 'category', label: 'Category' },
    { id: 'verification', label: 'Verification' },
  ];

  return (
    <div className="min-h-screen bg-surface selection:bg-secondary/30">
      <Navbar />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-[600px] mx-auto">
          <Link to="/login" className="inline-flex items-center gap-2 text-xs font-bold text-on-surface/40 uppercase tracking-widest hover:text-primary transition-colors mb-8">
            <ArrowLeft size={14} /> Back to Login
          </Link>

          {step !== 'success' && (
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-8">
                {steps.map((s, idx) => (
                  <React.Fragment key={s.id}>
                    <div className={cn(
                      "flex-1 h-1 rounded-full transition-all",
                      steps.findIndex(step => step.id === s.id) <= steps.findIndex(step => step.id === s.id) ? "bg-primary" : "bg-outline-variant/20"
                    )} />
                    {idx < steps.length - 1 && <ChevronRight size={14} className="text-on-surface/20" />}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex justify-between">
                {steps.map((s) => (
                  <p key={s.id} className={cn(
                    "text-[10px] font-bold uppercase tracking-widest",
                    step === s.id ? "text-primary" : "text-on-surface/30"
                  )}>
                    {s.label}
                  </p>
                ))}
              </div>
            </div>
          )}

          <Card className="p-8 md:p-10 bg-surface-low shadow-2xl border border-outline-variant/5">
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
          </Card>

          {step !== 'success' && (
            <div className="mt-8 text-center space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                <ShieldCheck size={12} /> Your data is encrypted and secure
              </p>
              <p className="text-xs text-on-surface/40">
                Already have an account?{' '}
                <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
