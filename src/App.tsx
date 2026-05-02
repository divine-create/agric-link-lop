/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

// Dashboards
import AdminDashboard from './pages/AdminDashboard';
import BusinessDashboard from './pages/business/BusinessDashboard';
import ProviderDashboard from './pages/provider/ProviderDashboard';
import IndividualDashboard from './pages/individual/IndividualDashboard';

// Business Persona Pages
import BusinessRegistration from './pages/business/BusinessRegistration';
import BusinessDeliveries from './pages/business/BusinessDeliveries';
import BusinessSettings from './pages/business/BusinessSettings';
import BusinessWallet from './pages/business/BusinessWallet';
import BusinessAnalytics from './pages/business/BusinessAnalytics';
import BusinessNotifications from './pages/business/BusinessNotifications';
import BusinessCOD from './pages/business/BusinessCOD';
import BusinessTemplates from './pages/business/BusinessTemplates';
import BusinessSubscriptions from './pages/business/BusinessSubscriptions';
import BusinessInvoices from './pages/business/BusinessInvoices';
import BusinessRoutes from './pages/business/BusinessRoutes';
import BulkUpload from './pages/business/BulkUpload';
import ApiSettings from './pages/business/ApiSettings';

// Provider Persona Pages
import ProviderRegistration from './pages/provider/ProviderRegistration';
import ProviderDeliveries from './pages/provider/ProviderDeliveries';
import ProviderSettings from './pages/provider/ProviderSettings';
import ProviderWallet from './pages/provider/ProviderWallet';
import ProviderNotifications from './pages/provider/ProviderNotifications';
import ProviderPerformance from './pages/provider/ProviderPerformance';
import FleetManagement from './pages/provider/FleetManagement';
import DisputeSubmission from './pages/provider/DisputeSubmission';

// Individual Persona Pages
import IndividualDeliveries from './pages/individual/IndividualDeliveries';
import IndividualSettings from './pages/individual/IndividualSettings';
import IndividualWallet from './pages/individual/IndividualWallet';
import IndividualNotifications from './pages/individual/IndividualNotifications';

// Admin Sub-pages
import AdminBusinesses from './pages/admin/AdminBusinesses';
import AdminProviders from './pages/admin/AdminProviders';
import AdminDeliveries from './pages/admin/AdminDeliveries';
import AdminPricing from './pages/admin/AdminPricing';
import AdminFinance from './pages/admin/AdminFinance';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminNotifications from './pages/admin/AdminNotifications';
import AdminRoutes from './pages/admin/AdminRoutes';

// Common Feature Contexts
import AcceptHaul from './pages/AcceptHaul';
import LiveDispatch from './pages/LiveDispatch';
import NewDelivery from './pages/NewDelivery';
import DispatchConfirmation from './pages/DispatchConfirmation';
import DeliveryComplete from './pages/DeliveryComplete';
import DeliveryTracking from './pages/DeliveryTracking';
import PublicTrackingPage from './pages/PublicTrackingPage';
import ApiDocs from './pages/ApiDocs';
import PricingPage from './pages/PricingPage';
import TopupWallet from './pages/TopupWallet';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Dashboards */}
        <Route path="/dashboard/business" element={<BusinessDashboard />} />
        <Route path="/dashboard/provider" element={<ProviderDashboard />} />
        <Route path="/dashboard/individual" element={<IndividualDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        
        {/* Business Routes */}
        <Route path="/register/business" element={<BusinessRegistration />} />
        <Route path="/business/deliveries" element={<BusinessDeliveries />} />
        <Route path="/business/settings" element={<BusinessSettings />} />
        <Route path="/business/wallet" element={<BusinessWallet />} />
        <Route path="/business/analytics" element={<BusinessAnalytics />} />
        <Route path="/business/notifications" element={<BusinessNotifications />} />
        <Route path="/business/cod" element={<BusinessCOD />} />
        <Route path="/business/templates" element={<BusinessTemplates />} />
        <Route path="/business/subscriptions" element={<BusinessSubscriptions />} />
        <Route path="/business/invoices" element={<BusinessInvoices />} />
        <Route path="/business/routes" element={<BusinessRoutes />} />
        <Route path="/business/bulk-upload" element={<BulkUpload />} />
        <Route path="/business/api-settings" element={<ApiSettings />} />

        {/* Provider Routes */}
        <Route path="/register/provider" element={<ProviderRegistration />} />
        <Route path="/provider/deliveries" element={<ProviderDeliveries />} />
        <Route path="/provider/settings" element={<ProviderSettings />} />
        <Route path="/provider/wallet" element={<ProviderWallet />} />
        <Route path="/provider/notifications" element={<ProviderNotifications />} />
        <Route path="/provider/performance" element={<ProviderPerformance />} />
        <Route path="/provider/fleet" element={<FleetManagement />} />
        <Route path="/fleet" element={<FleetManagement />} />
        <Route path="/provider/disputes" element={<DisputeSubmission />} />

        {/* Individual Routes */}
        <Route path="/individual/deliveries" element={<IndividualDeliveries />} />
        <Route path="/individual/settings" element={<IndividualSettings />} />
        <Route path="/individual/wallet" element={<IndividualWallet />} />
        <Route path="/individual/notifications" element={<IndividualNotifications />} />

        {/* Admin Sub-pages */}
        <Route path="/admin/businesses" element={<AdminBusinesses />} />
        <Route path="/admin/providers" element={<AdminProviders />} />
        <Route path="/admin/deliveries" element={<AdminDeliveries />} />
        <Route path="/admin/pricing" element={<AdminPricing />} />
        <Route path="/admin/finance" element={<AdminFinance />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/notifications" element={<AdminNotifications />} />
        <Route path="/admin/routes" element={<AdminRoutes />} />

        {/* Common Path Aliases (Redirecting to Business versions by default) */}
        <Route path="/analytics" element={<BusinessAnalytics />} />
        <Route path="/wallet" element={<BusinessWallet />} />
        <Route path="/notifications" element={<BusinessNotifications />} />
        <Route path="/cod" element={<BusinessCOD />} />
        <Route path="/templates" element={<BusinessTemplates />} />
        <Route path="/subscriptions" element={<BusinessSubscriptions />} />
        <Route path="/invoices" element={<BusinessInvoices />} />
        <Route path="/deliveries" element={<BusinessDeliveries />} />
        <Route path="/settings" element={<BusinessSettings />} />
        
        {/* Action Pages */}
        <Route path="/accept-haul/:id" element={<AcceptHaul />} />
        <Route path="/live-dispatch/:id" element={<LiveDispatch />} />
        <Route path="/new-delivery" element={<NewDelivery />} />
        <Route path="/confirm-dispatch" element={<DispatchConfirmation />} />
        <Route path="/delivery-complete/:id" element={<DeliveryComplete />} />
        <Route path="/track/:id" element={<DeliveryTracking />} />
        <Route path="/public-track/:id" element={<PublicTrackingPage />} />
        <Route path="/docs" element={<ApiDocs />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/topup" element={<TopupWallet />} />
      </Routes>
    </BrowserRouter>
  );
}
