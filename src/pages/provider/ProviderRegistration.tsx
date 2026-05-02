import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  Truck,
  User,
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
  CreditCard,
  Calendar,
  Building2,
  Car,
  Bike,
  Users
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import Navbar from '../../components/Navbar';

type ProviderType = 'individual' | 'fleet' | 'corporate';
type Step = 'type' | 'personal' | 'vehicle' | 'documents' | 'bank' | 'guarantor' | 'consent' | 'success';

const providerTypes = [
  { id: 'individual' as ProviderType, label: 'Individual Rider', icon: Bike, desc: 'Sole operator with own vehicle' },
  { id: 'fleet' as ProviderType, label: 'Fleet Owner', icon: Car, desc: 'Own and manage multiple vehicles' },
  { id: 'corporate' as ProviderType, label: 'Corporate Courier', icon: Building2, desc: 'Registered courier company' },
];

export default function ProviderRegistration() {
  const [step, setStep] = useState<Step>('type');
  const navigate = useNavigate();

  useEffect(() => {
    if (step === 'success') {
      const timer = setTimeout(() => {
        navigate('/dashboard/provider');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step, navigate]);
  const [formData, setFormData] = useState({
    providerType: '' as ProviderType,
    fullName: '',
    nin: '',
    dateOfBirth: '',
    address: '',
    email: '',
    phone: '',
    vehicleType: '',
    plateNumber: '',
    vehicleModel: '',
    vehicleYear: '',
    loadCapacity: '',
    idFile: null as File | null,
    vehiclePapers: null as File | null,
    driversLicense: null as File | null,
    passportPhoto: null as File | null,
    accountNumber: '',
    bankName: '',
    accountName: '',
    guarantorName: '',
    guarantorPhone: '',
    guarantorAddress: '',
    backgroundCheckConsent: false,
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    updateField(field, file);
  };

  const renderStep = () => {
    switch(step) {
      case 'type':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h2 className="font-display font-bold text-2xl text-on-surface mb-2">Provider Type</h2>
              <p className="text-sm text-on-surface/40">Select your provider category.</p>
            </div>

            <div className="space-y-3">
              {providerTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => updateField('providerType', type.id)}
                  className={cn(
                    "w-full text-left p-4 rounded-2xl transition-all border group flex items-center gap-4",
                    formData.providerType === type.id
                      ? "bg-primary/5 border-primary shadow-[0_0_0_1px_rgba(45,90,46,1)]"
                      : "bg-surface-high border-outline-variant/10 hover:border-outline-variant/30"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                    formData.providerType === type.id ? "bg-primary text-white scale-110" : "bg-surface-highest text-on-surface/20"
                  )}>
                    <type.icon size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-sm text-on-surface mb-0.5">{type.label}</p>
                    <p className="text-[10px] text-on-surface/40 font-bold uppercase tracking-widest">{type.desc}</p>
                  </div>
                  <div className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center transition-all",
                    formData.providerType === type.id ? "bg-primary text-white" : "border-2 border-outline-variant/20"
                  )}>
                    {formData.providerType === type.id && <CheckCircle2 size={12} />}
                  </div>
                </button>
              ))}
            </div>

            <Button
              onClick={() => setStep('personal')}
              disabled={!formData.providerType}
              className="w-full h-14 text-base gap-3"
            >
              Continue <ArrowRight size={20} />
            </Button>
          </motion.div>
        );

      case 'personal':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h2 className="font-display font-bold text-2xl text-on-surface mb-2">Personal Information</h2>
              <p className="text-sm text-on-surface/40">Tell us about yourself.</p>
            </div>

            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
              <input
                required
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
                <input
                  required
                  type="text"
                  placeholder="NIN (National ID)"
                  value={formData.nin}
                  onChange={(e) => updateField('nin', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
                <input
                  required
                  type="date"
                  placeholder="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateField('dateOfBirth', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm"
                />
              </div>
            </div>

            <div className="relative">
              <MapPin className="absolute left-4 top-4 text-on-surface/30" size={18} />
              <textarea
                required
                placeholder="Home Address"
                value={formData.address}
                onChange={(e) => updateField('address', e.target.value)}
                rows={3}
                className="w-full pl-12 pr-4 py-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm resize-none"
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

            <div className="flex gap-4">
              <Button
                variant="secondary"
                onClick={() => setStep('type')}
                className="flex-1 h-14 text-base gap-2"
              >
                <ArrowLeft size={20} /> Back
              </Button>
              <Button
                onClick={() => setStep('vehicle')}
                className="flex-1 h-14 text-base gap-3"
              >
                Continue <ArrowRight size={20} />
              </Button>
            </div>
          </motion.div>
        );

      case 'vehicle':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h2 className="font-display font-bold text-2xl text-on-surface mb-2">Vehicle Information</h2>
              <p className="text-sm text-on-surface/40">Details about your vehicle(s).</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Truck className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
                <select
                  required
                  value={formData.vehicleType}
                  onChange={(e) => updateField('vehicleType', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm appearance-none"
                >
                  <option value="">Vehicle Type</option>
                  <option value="bike">Motorcycle/Bike</option>
                  <option value="van">Van</option>
                  <option value="truck">Truck</option>
                  <option value="car">Car/Sedan</option>
                </select>
              </div>
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
                <input
                  required
                  type="text"
                  placeholder="Plate Number"
                  value={formData.plateNumber}
                  onChange={(e) => updateField('plateNumber', e.target.value.toUpperCase())}
                  className="w-full pl-12 pr-4 py-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Car className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
                <input
                  required
                  type="text"
                  placeholder="Model (e.g. Honda)"
                  value={formData.vehicleModel}
                  onChange={(e) => updateField('vehicleModel', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
                <input
                  required
                  type="number"
                  placeholder="Year"
                  value={formData.vehicleYear}
                  onChange={(e) => updateField('vehicleYear', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm"
                />
              </div>
              <div className="relative">
                <Truck className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
                <input
                  required
                  type="number"
                  placeholder="Load (kg)"
                  value={formData.loadCapacity}
                  onChange={(e) => updateField('loadCapacity', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="secondary"
                onClick={() => setStep('personal')}
                className="flex-1 h-14 text-base gap-2"
              >
                <ArrowLeft size={20} /> Back
              </Button>
              <Button
                onClick={() => setStep('documents')}
                className="flex-1 h-14 text-base gap-3"
              >
                Continue <ArrowRight size={20} />
              </Button>
            </div>
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
              { field: 'idFile', label: 'Government ID', desc: 'National ID, PVC, or Passport' },
              { field: 'vehiclePapers', label: 'Vehicle Papers', desc: 'Proof of vehicle registration' },
              { field: 'driversLicense', label: 'Driver\'s License', desc: 'Valid driver\'s license' },
              { field: 'passportPhoto', label: 'Passport Photo', desc: 'Recent passport-sized photograph' },
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
                        {formData[doc.field as keyof typeof formData] ? (formData[doc.field as keyof typeof formData] as File)?.name : 'Choose File'}
                      </span>
                    </label>
                    {formData[doc.field as keyof typeof formData] && (
                      <p className="text-xs text-primary mt-2 flex items-center gap-1">
                        <CheckCircle2 size={12} /> Uploaded
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}

            <div className="flex gap-4">
              <Button
                variant="secondary"
                onClick={() => setStep('vehicle')}
                className="flex-1 h-14 text-base gap-2"
              >
                <ArrowLeft size={20} /> Back
              </Button>
              <Button
                onClick={() => setStep('bank')}
                className="flex-1 h-14 text-base gap-3"
              >
                Continue <ArrowRight size={20} />
              </Button>
            </div>
          </motion.div>
        );

      case 'bank':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h2 className="font-display font-bold text-2xl text-on-surface mb-2">Bank Details</h2>
              <p className="text-sm text-on-surface/40">For payouts and earnings withdrawal.</p>
            </div>

            <div className="relative">
              <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
              <input
                required
                type="text"
                placeholder="Account Number"
                value={formData.accountNumber}
                onChange={(e) => updateField('accountNumber', e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
                <input
                  required
                  type="text"
                  placeholder="Bank Name"
                  value={formData.bankName}
                  onChange={(e) => updateField('bankName', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm"
                />
              </div>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
                <input
                  required
                  type="text"
                  placeholder="Account Name"
                  value={formData.accountName}
                  onChange={(e) => updateField('accountName', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm"
                />
              </div>
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
                onClick={() => setStep('guarantor')}
                className="flex-1 h-14 text-base gap-3"
              >
                Continue <ArrowRight size={20} />
              </Button>
            </div>
          </motion.div>
        );

      case 'guarantor':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h2 className="font-display font-bold text-2xl text-on-surface mb-2">Guarantor Information</h2>
              <p className="text-sm text-on-surface/40">Required for individual riders only.</p>
            </div>

            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
              <input
                required
                type="text"
                placeholder="Guarantor Full Name"
                value={formData.guarantorName}
                onChange={(e) => updateField('guarantorName', e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm"
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
              <input
                required
                type="tel"
                placeholder="Guarantor Phone Number"
                value={formData.guarantorPhone}
                onChange={(e) => updateField('guarantorPhone', e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm"
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-4 top-4 text-on-surface/30" size={18} />
              <textarea
                required
                placeholder="Guarantor Address"
                value={formData.guarantorAddress}
                onChange={(e) => updateField('guarantorAddress', e.target.value)}
                rows={3}
                className="w-full pl-12 pr-4 py-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm resize-none"
              />
            </div>

            <div className="flex gap-4">
              <Button
                variant="secondary"
                onClick={() => setStep('bank')}
                className="flex-1 h-14 text-base gap-2"
              >
                <ArrowLeft size={20} /> Back
              </Button>
              <Button
                onClick={() => setStep('consent')}
                className="flex-1 h-14 text-base gap-3"
              >
                Continue <ArrowRight size={20} />
              </Button>
            </div>
          </motion.div>
        );

      case 'consent':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h2 className="font-display font-bold text-2xl text-on-surface mb-2">Background Check</h2>
              <p className="text-sm text-on-surface/40">Consent to verification process.</p>
            </div>

            <Card className="p-6 bg-surface-highest/30">
              <div className="flex items-start gap-4">
                <ShieldCheck className="text-primary shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-display font-bold text-on-surface mb-2">Background Verification</h4>
                  <p className="text-xs text-on-surface/60 leading-relaxed">
                    By proceeding, you consent to LOP conducting a background check using your NIN
                    and provided documents. This includes identity verification and criminal record screening
                    through third-party verification services. The process typically takes 24-48 hours.
                  </p>
                </div>
              </div>
            </Card>

            <button
              onClick={() => updateField('backgroundCheckConsent', !formData.backgroundCheckConsent)}
              className="w-full flex items-center gap-3 p-4 rounded-2xl bg-surface-highest/30 hover:bg-surface-highest/50 transition-colors"
            >
              <div className={cn(
                "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                formData.backgroundCheckConsent ? "bg-primary border-primary" : "border-outline-variant/30"
              )}>
                {formData.backgroundCheckConsent && <CheckCircle2 size={16} className="text-white" />}
              </div>
              <span className="text-sm font-bold text-on-surface text-left">
                I consent to background verification and data processing
              </span>
            </button>

            <div className="flex gap-4">
              <Button
                variant="secondary"
                onClick={() => setStep('guarantor')}
                className="flex-1 h-14 text-base gap-2"
              >
                <ArrowLeft size={20} /> Back
              </Button>
              <Button
                onClick={() => setStep('success')}
                disabled={!formData.backgroundCheckConsent}
                className="flex-1 h-14 text-base gap-3"
              >
                Submit Application <ArrowRight size={20} />
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
            <h2 className="font-display font-bold text-3xl text-on-surface">Application Submitted!</h2>
            <p className="text-sm text-on-surface/60 max-w-md mx-auto">
              Your application is under review. You'll receive email and SMS notifications
              about your approval status. Background checks typically take 24-48 hours.
            </p>
            <p className="text-xs text-on-surface/40 animate-pulse">
              Redirecting to dashboard...
            </p>
          </motion.div>
        );
    }
  };

  const steps = [
    { id: 'type', label: 'Type' },
    { id: 'personal', label: 'Personal' },
    { id: 'vehicle', label: 'Vehicle' },
    { id: 'documents', label: 'Docs' },
    { id: 'bank', label: 'Bank' },
    { id: 'guarantor', label: 'Guarantor' },
    { id: 'consent', label: 'Consent' },
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
              <div className="flex items-center gap-1 mb-4 overflow-x-auto pb-2">
                {steps.map((s, idx) => (
                  <React.Fragment key={s.id}>
                    <div className={cn(
                      "flex-1 h-1 rounded-full transition-all min-w-[30px]",
                      steps.findIndex(step => step.id === s.id) <= steps.findIndex(step => step.id === s.id) ? "bg-primary" : "bg-outline-variant/20"
                    )} />
                    {idx < steps.length - 1 && <div className="w-1" />}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                {steps.map((s) => (
                  <p key={s.id} className={cn(
                    "transition-colors",
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
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface/30 flex items-center justify-center gap-2">
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
