import { motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Plus,
  MapPin,
  Package,
  Truck,
  Edit3,
  Trash2,
  Star,
  Check,
  X,
  Search,
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { cn } from '@/src/lib/utils';

interface DeliveryTemplate {
  id: string;
  name: string;
  pickup: string;
  delivery: string;
  category: string;
  weight: number;
  type: string;
  isDefault: boolean;
}

const templates: DeliveryTemplate[] = [
  {
    id: '1',
    name: 'Farm to Lagos Market',
    pickup: 'Agrilink Farm, Kano State',
    delivery: 'Lagos Central Market, Oyingbo',
    category: 'Perishables',
    weight: 150,
    type: 'Cold-Chain',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Warehouse to Retail',
    pickup: 'Agrilink Warehouse, Ogba',
    delivery: 'Shoprite, Victoria Island',
    category: 'Bulk Goods',
    weight: 500,
    type: 'Standard',
    isDefault: false,
  },
  {
    id: '3',
    name: 'Medical Supplies Run',
    pickup: 'MedConnect Hub, Ikeja',
    delivery: 'Lagos University Teaching Hospital',
    category: 'Medical',
    weight: 25,
    type: 'Express',
    isDefault: false,
  },
  {
    id: '4',
    name: 'E-commerce Daily',
    pickup: 'Jumia Warehouse, Lekki',
    delivery: 'Multiple Destinations',
    category: 'Parcel',
    weight: 5,
    type: 'Standard',
    isDefault: false,
  },
];

export default function BusinessTemplates() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [search, setSearch] = useState('');
  const [templatesList, setTemplatesList] = useState(templates);

  const filteredTemplates = templatesList.filter(t =>
    search === '' ||
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setTemplatesList(prev => prev.filter(t => t.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setTemplatesList(prev => prev.map(t => ({
      ...t,
      isDefault: t.id === id
    })));
  };

  return (
    <DashboardLayout userType="business">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-display font-extrabold text-3xl text-on-surface">Delivery Templates</h1>
            <p className="text-sm text-on-surface/60 mt-1">Save and reuse delivery configurations</p>
          </div>
          <Button onClick={() => setShowCreateModal(true)} className="gap-2">
            <Plus size={18} /> Create Template
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
          <input
            type="text"
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm"
          />
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template, idx) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="p-6 hover:bg-surface-container transition-colors group relative">
                {template.isDefault && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-lg">
                    <Star size={12} fill="currentColor" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Default</span>
                  </div>
                )}

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Layers size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-lg text-on-surface truncate">{template.name}</h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-surface-highest rounded text-[10px] font-bold uppercase tracking-widest text-on-surface/40">
                      {template.type}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Pickup</p>
                      <p className="text-sm font-medium text-on-surface truncate">{template.pickup}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Truck size={14} className="text-secondary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Delivery</p>
                      <p className="text-sm font-medium text-on-surface truncate">{template.delivery}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <Package size={14} className="text-on-surface/40" />
                      <span className="text-xs text-on-surface/60">{template.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck size={14} className="text-on-surface/40" />
                      <span className="text-xs text-on-surface/60">{template.weight}kg</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-outline-variant/10">
                  <Link to="/new-delivery" className="flex-1">
                    <Button size="sm" className="w-full gap-2">
                      <Check size={14} /> Use Template
                    </Button>
                  </Link>
                  <button
                    onClick={() => handleSetDefault(template.id)}
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      template.isDefault
                        ? "text-primary bg-primary/10"
                        : "text-on-surface/40 hover:text-primary hover:bg-primary/10"
                    )}
                    title="Set as default"
                  >
                    <Star size={16} fill={template.isDefault ? "currentColor" : "none"} />
                  </button>
                  <button
                    className="p-2 rounded-lg text-on-surface/40 hover:text-primary hover:bg-primary/10 transition-colors"
                    title="Edit"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(template.id)}
                    className="p-2 rounded-lg text-on-surface/40 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}

          {/* Create New Template Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: filteredTemplates.length * 0.05 }}
          >
            <button
              onClick={() => setShowCreateModal(true)}
              className="w-full h-full min-h-[280px] rounded-2xl border-2 border-dashed border-outline-variant/20 hover:border-primary/30 hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-3 group"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-highest group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                <Plus size={24} className="text-on-surface/30 group-hover:text-primary transition-colors" />
              </div>
              <span className="font-display font-bold text-sm text-on-surface/40 group-hover:text-primary transition-colors">
                Create New Template
              </span>
            </button>
          </motion.div>
        </div>

        {/* Create Template Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-surface rounded-3xl p-8 max-w-md w-full shadow-2xl border border-outline-variant/10"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-2xl text-on-surface">New Template</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 text-on-surface/40 hover:text-on-surface transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-2 block">Template Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Daily Farm Run"
                    className="w-full px-4 py-3 bg-surface-highest/50 rounded-xl border-0 focus:ring-2 focus:ring-primary/20 text-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-2 block">Pickup Address</label>
                  <input
                    type="text"
                    placeholder="Pickup location"
                    className="w-full px-4 py-3 bg-surface-highest/50 rounded-xl border-0 focus:ring-2 focus:ring-primary/20 text-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-2 block">Delivery Address</label>
                  <input
                    type="text"
                    placeholder="Delivery location"
                    className="w-full px-4 py-3 bg-surface-highest/50 rounded-xl border-0 focus:ring-2 focus:ring-primary/20 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-2 block">Category</label>
                    <select className="w-full px-4 py-3 bg-surface-highest/50 rounded-xl border-0 focus:ring-2 focus:ring-primary/20 text-sm">
                      <option>Perishables</option>
                      <option>Bulk Goods</option>
                      <option>Medical</option>
                      <option>Parcel</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-2 block">Weight (kg)</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full px-4 py-3 bg-surface-highest/50 rounded-xl border-0 focus:ring-2 focus:ring-primary/20 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 gap-2"
                  onClick={() => setShowCreateModal(false)}
                >
                  <Plus size={16} /> Create
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Info Card */}
        <Card className="p-6 bg-surface-low border border-outline-variant/5">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
              <Layers size={16} />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-on-surface mb-1">About Templates</h4>
              <p className="text-xs text-on-surface/60 leading-relaxed">
                Save frequently used delivery configurations as templates. One-click to start a new delivery with pre-filled details. Perfect for recurring routes like farm-to-market runs.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
