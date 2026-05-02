import { motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Download,
  Calendar,
  DollarSign,
  Building2,
  MapPin,
  Package,
  Printer,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { cn } from '@/src/lib/utils';

const invoices = [
  { id: 'INV-2026-001', date: 'Oct 01, 2026', dueDate: 'Oct 31, 2026', amount: 420000, vat: 31500, total: 451500, status: 'paid', deliveries: 142 },
  { id: 'INV-2026-002', date: 'Oct 15, 2026', dueDate: 'Nov 14, 2026', amount: 580000, vat: 43500, total: 623500, status: 'pending', deliveries: 198 },
  { id: 'INV-2026-003', date: 'Sep 01, 2026', dueDate: 'Sep 30, 2026', amount: 380000, vat: 28500, total: 408500, status: 'paid', deliveries: 128 },
  { id: 'INV-2026-004', date: 'Aug 01, 2026', dueDate: 'Aug 31, 2026', amount: 295000, vat: 22125, total: 317125, status: 'paid', deliveries: 95 },
];

const businessInfo = {
  name: 'Agrilink Nigeria Ltd',
  rcNumber: 'RC 123456',
  address: '12 Admiralty Way, Lekki Phase 1, Lagos',
  email: 'billing@agrilink.ng',
  phone: '+234 801 234 5678',
};

export default function BusinessInvoices() {
  const [selectedPeriod, setSelectedPeriod] = useState('october-2026');
  const [vatRate] = useState(7.5); // 7.5% VAT in Nigeria

  const selectedInvoice = invoices.find(inv => inv.status === 'pending');

  return (
    <DashboardLayout userType="business">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-display font-extrabold text-3xl text-on-surface">Invoices</h1>
            <p className="text-sm text-on-surface/60 mt-1">Generate and download your invoices</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="gap-2">
              <Download size={16} /> Bulk Download
            </Button>
            <Button className="gap-2">
              <FileText size={16} /> Generate New
            </Button>
          </div>
        </div>

        {/* Invoice Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'This Month', value: '₦623,500', icon: DollarSign, color: 'text-primary' },
            { label: 'VAT (7.5%)', value: '₦43,500', icon: FileText, color: 'text-secondary' },
            { label: 'Pending', value: '1 Invoice', icon: CheckCircle2, color: 'text-orange-600' },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-6 hover:bg-surface-container transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className={cn("p-2 rounded-lg bg-opacity-10", stat.color.replace('text-', 'bg-'))}>
                    <stat.icon size={16} className={stat.color} />
                  </div>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-1">{stat.label}</p>
                <p className="font-display font-extrabold text-2xl text-on-surface">{stat.value}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Invoice Preview (if pending) */}
        {selectedInvoice && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-8 bg-white border border-outline-variant/20">
              {/* Invoice Header */}
              <div className="flex flex-col md:flex-row justify-between items-start mb-8 pb-8 border-b-2 border-gray-100">
                <div>
                  <h2 className="font-display font-extrabold text-4xl text-gray-900 mb-2">INVOICE</h2>
                  <p className="text-sm text-gray-500">{selectedInvoice.id}</p>
                </div>
                <div className="text-left md:text-right mt-4 md:mt-0">
                  <p className="font-bold text-gray-900">{businessInfo.name}</p>
                  <p className="text-sm text-gray-500">{businessInfo.address}</p>
                  <p className="text-sm text-gray-500">{businessInfo.email}</p>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Invoice Date</p>
                  <p className="font-bold text-gray-900">{selectedInvoice.date}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Due Date</p>
                  <p className="font-bold text-gray-900">{selectedInvoice.dueDate}</p>
                </div>
              </div>

              {/* Invoice Table */}
              <div className="mb-8">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-100">
                      <th className="text-left p-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Description</th>
                      <th className="text-right p-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Deliveries</th>
                      <th className="text-right p-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-50">
                      <td className="p-3 text-gray-900">LOP Delivery Services - {selectedPeriod}</td>
                      <td className="p-3 text-right text-gray-600">{selectedInvoice.deliveries}</td>
                      <td className="p-3 text-right font-bold text-gray-900">₦{selectedInvoice.amount.toLocaleString()}</td>
                    </tr>
                    <tr className="border-b border-gray-50">
                      <td className="p-3 text-gray-600">VAT ({vatRate}%)</td>
                      <td className="p-3"></td>
                      <td className="p-3 text-right font-bold text-gray-600">₦{selectedInvoice.vat.toLocaleString()}</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-3 font-bold text-gray-900">TOTAL</td>
                      <td className="p-3"></td>
                      <td className="p-3 text-right font-display font-extrabold text-xl text-gray-900">₦{selectedInvoice.total.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Button className="gap-2">
                  <Download size={16} /> Download PDF
                </Button>
                <Button variant="secondary" className="gap-2">
                  <Mail size={16} /> Email Invoice
                </Button>
                <Button variant="secondary" className="gap-2">
                  <Printer size={16} /> Print
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Invoice History */}
        <div>
          <h2 className="font-display font-bold text-xl text-on-surface mb-6">Invoice History</h2>
          <div className="space-y-3">
            {invoices.map((invoice, idx) => (
              <motion.div
                key={invoice.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="p-4 md:p-6 hover:bg-surface-container transition-colors">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "p-3 rounded-xl",
                        invoice.status === 'paid' ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                      )}>
                        <FileText size={16} />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-on-surface">{invoice.id}</p>
                        <p className="text-xs text-on-surface/40">{invoice.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-display font-bold text-on-surface">₦{invoice.total.toLocaleString()}</p>
                        <p className="text-[10px] text-on-surface/40">VAT: ₦{invoice.vat.toLocaleString()}</p>
                      </div>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold",
                        invoice.status === 'paid' ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                      )}>
                        {invoice.status}
                      </span>
                      <Button variant="secondary" size="sm" className="gap-2">
                        <Download size={14} /> PDF
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* VAT Info */}
        <Card className="p-6 bg-surface-low border border-outline-variant/5">
          <div className="flex items-start gap-3">
            <FileText className="text-primary shrink-0 mt-1" size={16} />
            <div>
              <h4 className="font-display font-bold text-sm text-on-surface mb-1">VAT Information</h4>
              <p className="text-xs text-on-surface/60 leading-relaxed">
                All invoices include 7.5% VAT as required by Nigerian tax law. VAT registration number is available upon request for compliance purposes.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
