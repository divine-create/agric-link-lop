/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BusinessDashboard from './pages/BusinessDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import AdminDashboard from './pages/AdminDashboard';
import DeliveryTracking from './pages/DeliveryTracking';
import ApiDocs from './pages/ApiDocs';
import PricingPage from './pages/PricingPage';
import NewDelivery from './pages/NewDelivery';
import DispatchConfirmation from './pages/DispatchConfirmation';
import DeliveryComplete from './pages/DeliveryComplete';
import DeliveriesPage from './pages/DeliveriesPage';
import SettingsDashboard from './pages/SettingsDashboard';
import WalletDashboard from './pages/WalletDashboard';
import AnalyticsPage from './pages/AnalyticsPage';
import TopupWallet from './pages/TopupWallet';
import IndividualDashboard from './pages/IndividualDashboard';
import LoginPage from './pages/LoginPage';
import AcceptHaul from './pages/AcceptHaul';
import LiveDispatch from './pages/LiveDispatch';
import RouteManagement from './pages/RouteManagement';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard/business" element={<BusinessDashboard />} />
        <Route path="/dashboard/provider" element={<ProviderDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/routes" element={<RouteManagement />} />
        <Route path="/accept-haul/:id" element={<AcceptHaul />} />
        <Route path="/live-dispatch/:id" element={<LiveDispatch />} />
        <Route path="/dashboard/individual" element={<IndividualDashboard />} />
        <Route path="/new-delivery" element={<NewDelivery />} />
        <Route path="/confirm-dispatch" element={<DispatchConfirmation />} />
        <Route path="/delivery-complete/:id" element={<DeliveryComplete />} />
        <Route path="/deliveries" element={<DeliveriesPage />} />
        <Route path="/settings" element={<SettingsDashboard />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/metrics" element={<AnalyticsPage />} />
        <Route path="/wallet" element={<WalletDashboard />} />
        <Route path="/topup" element={<TopupWallet />} />
        <Route path="/earnings" element={<WalletDashboard />} />
        <Route path="/track/:id" element={<DeliveryTracking />} />
        <Route path="/docs" element={<ApiDocs />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
