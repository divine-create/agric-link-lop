import { motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  Zap,
  Crown,
  Check,
  ArrowRight,
  Truck,
  BarChart3,
  Users,
  Globe,
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { cn } from '@/src/lib/utils';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Pay-as-you-go for businesses just getting started',
    price: null,
    priceLabel: 'Pay per delivery',
    features: [
      'No monthly fee',
      'Standard delivery pricing',
      'Email support',
      'Basic tracking',
      'API access (100 req/day)',
    ],
    cta: 'Start Free',
    popular: false,
    color: 'border-outline-variant/20',
  },
  {
    id: 'growth',
    name: 'Growth',
    description: 'For growing businesses with regular delivery needs',
    price: 25000,
    priceLabel: '/month',
    features: [
      'Volume discounts (10-20%)',
      'Priority support',
      'Advanced analytics',
      'Bulk upload (up to 100)',
      'API access (1000 req/day)',
      'Custom delivery templates',
    ],
    cta: 'Upgrade Now',
    popular: true,
    color: 'border-primary ring-4 ring-primary/5',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Custom solutions for large-scale operations',
    price: null,
    priceLabel: 'Custom pricing',
    features: [
      'Up to 40% volume discounts',
      'Dedicated account manager',
      'Custom integrations',
      'Bulk upload (unlimited)',
      'API access (unlimited)',
      'SLA guarantee',
      'White-label options',
    ],
    cta: 'Contact Sales',
    popular: false,
    color: 'border-secondary',
  },
];

export default function BusinessSubscriptions() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [currentPlan, setCurrentPlan] = useState('growth');

  return (
    <DashboardLayout userType="business">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-display font-extrabold text-3xl text-on-surface">Subscription Plans</h1>
          <p className="text-sm text-on-surface/60 mt-1">Choose the plan that fits your delivery volume</p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-3">
          <span className={cn(
            "text-sm font-bold",
            billingCycle === 'monthly' ? "text-on-surface" : "text-on-surface/40"
          )}>
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            className="w-12 h-6 rounded-full bg-primary relative transition-colors"
          >
            <div className={cn(
              "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
              billingCycle === 'annual' ? "left-7" : "left-1"
            )} />
          </button>
          <span className={cn(
            "text-sm font-bold",
            billingCycle === 'annual' ? "text-on-surface" : "text-on-surface/40"
          )}>
            Annual
            <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-[10px] rounded-full">Save 20%</span>
          </span>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className={cn(
                "p-8 relative hover:shadow-lg transition-all",
                plan.color,
                currentPlan === plan.id && "ring-2 ring-primary"
              )}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 px-3 py-1 bg-primary text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
                      <Star size={10} fill="currentColor" /> Popular
                    </div>
                  </div>
                )}

                {currentPlan === plan.id && (
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-lg text-[10px] font-bold">
                      <Check size={10} /> Current
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-display font-bold text-2xl text-on-surface mb-2">{plan.name}</h3>
                  <p className="text-xs text-on-surface/60">{plan.description}</p>
                </div>

                <div className="mb-6">
                  {plan.price ? (
                    <div className="flex items-baseline gap-1">
                      <span className="font-display font-extrabold text-5xl text-on-surface">
                        ₦{billingCycle === 'annual' ? (plan.price * 10).toLocaleString() : plan.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-on-surface/40">{plan.priceLabel}</span>
                    </div>
                  ) : (
                    <div className="font-display font-extrabold text-3xl text-on-surface">{plan.priceLabel}</div>
                  )}
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check size={16} className="text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-on-surface/70">{feature}</span>
                    </div>
                  ))}
                </div>

                {currentPlan === plan.id ? (
                  <Button variant="secondary" className="w-full" disabled>
                    <Check size={16} /> Current Plan
                  </Button>
                ) : (
                  <Link to="/pricing" className="block">
                    <Button
                      className="w-full"
                      variant={plan.popular ? 'primary' : 'secondary'}
                    >
                      {plan.cta} <ArrowRight size={16} />
                    </Button>
                  </Link>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Usage Dashboard */}
        <Card className="p-6 bg-surface-low border border-outline-variant/5">
          <h3 className="font-display font-bold text-lg text-on-surface mb-6">Usage This Month</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Deliveries', value: '142', limit: 'Unlimited', icon: Truck },
              { label: 'API Calls', value: '2,840', limit: '10,000/day', icon: Globe },
              { label: 'Bulk Upload', value: '12', limit: 'Unlimited', icon: BarChart3 },
              { label: 'Team Members', value: '3', limit: '10', icon: Users },
            ].map((metric) => (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center gap-2">
                  <metric.icon size={14} className="text-primary" />
                  <span className="text-xs font-bold uppercase tracking-widest text-on-surface/40">{metric.label}</span>
                </div>
                <p className="font-display font-bold text-2xl text-on-surface">{metric.value}</p>
                <p className="text-[10px] text-on-surface/40">Limit: {metric.limit}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Plan Comparison */}
        <Card className="overflow-hidden bg-surface-low border border-outline-variant/5">
          <div className="p-6 border-b border-outline-variant/10">
            <h3 className="font-display font-bold text-lg text-on-surface">Feature Comparison</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-outline-variant/10">
                  <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Feature</th>
                  <th className="text-center p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Starter</th>
                  <th className="text-center p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Growth</th>
                  <th className="text-center p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Volume Discount', 'None', '10-20%', 'Up to 40%'],
                  ['Support', 'Email', 'Priority', 'Dedicated'],
                  ['API Requests/day', '100', '1,000', 'Unlimited'],
                  ['Bulk Upload', 'No', '100', 'Unlimited'],
                  ['Analytics', 'Basic', 'Advanced', 'Custom'],
                  ['SLA Guarantee', 'No', 'No', 'Yes'],
                  ['White Label', 'No', 'No', 'Yes'],
                ].map(([feature, starter, growth, enterprise]) => (
                  <tr key={feature as string} className="border-b border-outline-variant/5">
                    <td className="p-4 font-medium text-on-surface">{feature}</td>
                    <td className="p-4 text-center text-on-surface/60">{starter}</td>
                    <td className="p-4 text-center font-bold text-primary">{growth}</td>
                    <td className="p-4 text-center text-on-surface/60">{enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Upgrade CTA */}
        {currentPlan !== 'enterprise' && (
          <Card className="p-8 bg-primary-container text-white adire-texture text-center">
            <h3 className="font-display font-bold text-2xl mb-2">Ready to scale?</h3>
            <p className="text-sm opacity-60 mb-6 max-w-md mx-auto">
              Upgrade to Enterprise for custom pricing, dedicated support, and advanced features.
            </p>
            <Button className="bg-white text-primary hover:bg-white/90 gap-2">
              <Crown size={16} /> Contact Sales
            </Button>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
