import { motion } from 'motion/react';
import { useState } from 'react';
import {
  Star,
  TrendingUp,
  Truck,
  Clock,
  CheckCircle2,
  Award,
  ArrowLeft,
  Download,
  Filter,
  ChevronRight,
  ThumbsUp,
  Zap,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { cn } from '@/src/lib/utils';

const performanceStats = {
  overallScore: 96.8,
  completionRate: 98.2,
  avgSpeed: 42,
  avgRating: 4.8,
  totalDeliveries: 284,
};

const metrics = [
  { label: 'Completion Rate', value: '98.2%', weight: '40%', trend: 'up', icon: CheckCircle2 },
  { label: 'Speed Score', value: '94/100', weight: '30%', trend: 'up', icon: Zap },
  { label: 'Customer Rating', value: '4.8/5', weight: '30%', trend: 'stable', icon: Star },
];

const badges = [
  { name: '100 Deliveries', description: 'Completed 100 deliveries', icon: Truck, earned: true, date: 'Oct 15, 2026' },
  { name: '30-Day Streak', description: '30 consecutive days active', icon: Award, earned: true, date: 'Oct 20, 2026' },
  { name: '5-Star Week', description: 'Maintained 5-star rating for 7 days', icon: Star, earned: true, date: 'Oct 18, 2026' },
  { name: '500 Deliveries', description: 'Completed 500 deliveries', icon: Truck, earned: false, progress: 284 },
  { name: 'Speed Demon', description: 'Average delivery under 30 min', icon: Zap, earned: false, progress: 42 },
  { name: '1000 Club', description: 'Completed 1000 deliveries', icon: Award, earned: false, progress: 284 },
];

const ratingBreakdown = [
  { stars: 5, count: 156, percentage: 70 },
  { stars: 4, count: 45, percentage: 20 },
  { stars: 3, count: 15, percentage: 7 },
  { stars: 2, count: 5, percentage: 2 },
  { stars: 1, count: 2, percentage: 1 },
];

const recentReviews = [
  { id: '1', rating: 5, comment: 'Very professional and fast delivery!', customer: 'Agrilink Ltd', date: '2 days ago', deliveryId: 'LOP-4421' },
  { id: '2', rating: 5, comment: 'Package arrived in perfect condition.', customer: 'Fresh Foods', date: '3 days ago', deliveryId: 'LOP-4419' },
  { id: '3', rating: 4, comment: 'Good service, arrived 10 min late.', customer: 'TechHub', date: '5 days ago', deliveryId: 'LOP-4412' },
  { id: '4', rating: 5, comment: 'Excellent as always!', customer: 'Zest Fashion', date: '1 week ago', deliveryId: 'LOP-4405' },
];

const tierInfo = {
  current: 'Gold',
  next: 'Platinum',
  progress: 72,
  benefits: ['Priority job assignment', 'Higher base pay', 'Exclusive delivery zones', '24/7 priority support'],
};

export default function ProviderPerformance() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display font-extrabold text-3xl text-on-surface">Performance</h1>
          <p className="text-sm text-on-surface/60 mt-1">Track your ratings, metrics, and achievements</p>
        </div>
        <div className="flex gap-3">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                timeRange === range
                  ? "bg-primary text-white"
                  : "bg-surface-high text-on-surface/40 hover:text-on-surface"
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Overall Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-8 bg-primary-container text-white adire-texture">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-center">
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">Overall Score</p>
              <p className="font-display font-extrabold text-6xl">{performanceStats.overallScore}</p>
              <p className="text-xs opacity-60 mt-2">out of 100</p>
              <div className="inline-flex items-center gap-2 mt-4 px-4 py-1 bg-white/20 rounded-full">
                <TrendingUp size={14} />
                <span className="text-xs font-bold">Gold Tier</span>
              </div>
            </div>

            <div className="space-y-4">
              {metrics.map((metric, idx) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="p-2 bg-white/10 rounded-lg">
                    <metric.icon size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-bold uppercase tracking-widest opacity-60">{metric.label}</span>
                      <span className="text-xs opacity-60">Weight: {metric.weight}</span>
                    </div>
                    <p className="font-display font-bold text-lg">{metric.value}</p>
                  </div>
                  <div className={cn(
                    "px-2 py-1 rounded-full text-[10px] font-bold",
                    metric.trend === 'up' ? "bg-green-500/20 text-green-300" :
                    metric.trend === 'down' ? "bg-red-500/20 text-red-300" :
                    "bg-white/10 text-white/60"
                  )}>
                    {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'} {metric.trend}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Deliveries', value: performanceStats.totalDeliveries, icon: Truck },
          { label: 'Avg Rating', value: performanceStats.avgRating, suffix: '/5', icon: Star },
          { label: 'Completion', value: performanceStats.completionRate, suffix: '%', icon: CheckCircle2 },
          { label: 'Avg Speed', value: performanceStats.avgSpeed, suffix: 'min', icon: Clock },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="p-6 hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <stat.icon size={16} />
                </div>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-1">{stat.label}</p>
              <p className="font-display font-extrabold text-2xl text-on-surface">
                {stat.value}{stat.suffix}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tier Progress */}
      <Card className="p-6 bg-surface-low border border-outline-variant/5">
        <div className="flex items-center gap-3 mb-6">
          <Award className="text-primary" size={20} />
          <h3 className="font-display font-bold text-lg text-on-surface">Tier Progress</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">Gold</div>
              <span className="text-xs text-on-surface/40">Current Tier</span>
            </div>
            <ChevronRight size={16} className="text-on-surface/30" />
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">Platinum</div>
              <span className="text-xs text-on-surface/40">Next Tier</span>
            </div>
          </div>

          <div className="relative h-3 bg-surface-highest rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${tierInfo.progress}%` }}
              transition={{ duration: 1 }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
            />
          </div>
          <p className="text-xs text-on-surface/60 text-center">{tierInfo.progress}% to Platinum</p>

          <div className="pt-4 border-t border-outline-variant/10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-3">Tier Benefits</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tierInfo.benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-primary shrink-0" />
                  <span className="text-xs text-on-surface/60">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Badges */}
      <div>
        <h2 className="font-display font-bold text-xl text-on-surface mb-6">Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((badge, idx) => (
            <motion.div
              key={badge.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className={cn(
                "p-6 text-center transition-all",
                badge.earned ? "hover:bg-surface-container" : "opacity-40 grayscale"
              )}>
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3",
                  badge.earned ? "bg-primary/10 text-primary" : "bg-surface-highest text-on-surface/20"
                )}>
                  <badge.icon size={24} />
                </div>
                <h4 className="font-display font-bold text-sm text-on-surface mb-1">{badge.name}</h4>
                <p className="text-[10px] text-on-surface/40">{badge.description}</p>
                {badge.earned ? (
                  <div className="flex items-center justify-center gap-1 mt-2 text-xs text-primary">
                    <CheckCircle2 size={12} /> Earned {badge.date}
                  </div>
                ) : (
                  <div className="mt-2">
                    <div className="h-1 bg-surface-highest rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(badge.progress / (badge.name.includes('500') ? 500 : badge.name.includes('1000') ? 1000 : 30)) * 100}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-on-surface/40 mt-1">
                      {badge.progress} / {badge.name.includes('500') ? '500' : badge.name.includes('1000') ? '1000' : '30'}
                    </p>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Rating Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6 bg-surface-low border border-outline-variant/5">
          <h3 className="font-display font-bold text-lg text-on-surface mb-6">Rating Breakdown</h3>
          <div className="space-y-3">
            {ratingBreakdown.map((rating) => (
              <div key={rating.stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-xs font-bold">{rating.stars}</span>
                  <Star size={12} className="text-secondary" fill="currentColor" />
                </div>
                <div className="flex-1 h-2 bg-surface-highest rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${rating.percentage}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-secondary rounded-full"
                  />
                </div>
                <span className="text-xs text-on-surface/40 w-16 text-right">{rating.count} ({rating.percentage}%)</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-surface-low border border-outline-variant/5">
          <h3 className="font-display font-bold text-lg text-on-surface mb-6">Recent Reviews</h3>
          <div className="space-y-4">
            {recentReviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pb-4 border-b border-outline-variant/5 last:border-0 last:pb-0"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < review.rating ? "text-secondary" : "text-on-surface/20"}
                          fill={i < review.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-on-surface/40">• {review.date}</span>
                  </div>
                  <span className="text-[10px] text-on-surface/40">{review.deliveryId}</span>
                </div>
                <p className="text-sm text-on-surface/60 mb-1">"{review.comment}"</p>
                <p className="text-[10px] text-on-surface/40">— {review.customer}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Improvement Tips */}
      <Card className="p-6 bg-surface-low border border-outline-variant/5">
        <div className="flex items-center gap-3 mb-4">
          <ThumbsUp className="text-primary" size={20} />
          <h3 className="font-display font-bold text-lg text-on-surface">Performance Tips</h3>
        </div>
        <div className="space-y-3">
          {[
            'Maintain a clean vehicle for higher customer ratings',
            'Respond to job offers within 30 seconds to boost acceptance rate',
            'Use in-app navigation for optimal routing and speed scores',
            'Take a photo of package condition at pickup to avoid disputes',
          ].map((tip, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[10px] font-bold">{idx + 1}</span>
              </div>
              <p className="text-sm text-on-surface/60">{tip}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
