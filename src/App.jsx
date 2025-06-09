import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Login from './pages/Login';

// Admin
import AdminDashboard from './roles/admin/Dashboard';
import MerchantManagement from './roles/admin/MerchantManagement';
import AgentManagement from './roles/admin/AgentManagement';
import ShipmentManagement from './roles/admin/ShipmentManagement';
import OrderManagement from './roles/admin/OrderManagement';
import WalletManagement from './roles/admin/WalletManagement';
import ZoneManagement from './roles/admin/ZoneManagement';
import AdminUserManagement from './roles/admin/AdminUserManagement';
import SystemSettings from './roles/admin/SystemSettings';
import ActivityLogs from './roles/admin/ActivityLogs';

// Merchant
import MerchantDashboard from './roles/merchant/Dashboard';
import CreateShipment from './roles/merchant/CreateShipment';
import MyShipments from './roles/merchant/MyShipments';
import MerchantWallet from './roles/merchant/Wallet';
import MerchantProfile from './roles/merchant/Profile';

// Courier
import CourierDashboard from './roles/courier/Dashboard';
import MyDeliveries from './roles/courier/MyDeliveries';
import CourierWallet from './roles/courier/Wallet';
import CourierProfile from './roles/courier/Profile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute roles={['admin']}>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="merchants" element={<MerchantManagement />} />
                  <Route path="agents" element={<AgentManagement />} />
                  <Route path="shipments" element={<ShipmentManagement />} />
                  <Route path="orders" element={<OrderManagement />} />
                  <Route path="wallets" element={<WalletManagement />} />
                  <Route path="zones" element={<ZoneManagement />} />
                  <Route path="users" element={<AdminUserManagement />} />
                  <Route path="settings" element={<SystemSettings />} />
                  <Route path="logs" element={<ActivityLogs />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </ProtectedRoute>
            }
          />

          {/* Merchant Routes */}
          <Route
            path="/merchant/*"
            element={
              <ProtectedRoute roles={['merchant']}>
                <Routes>
                  <Route path="dashboard" element={<MerchantDashboard />} />
                  <Route path="create-shipment" element={<CreateShipment />} />
                  <Route path="my-shipments" element={<MyShipments />} />
                  <Route path="wallet" element={<MerchantWallet />} />
                  <Route path="profile" element={<MerchantProfile />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </ProtectedRoute>
            }
          />

          {/* Courier Routes */}
          <Route
            path="/courier/*"
            element={
              <ProtectedRoute roles={['courier']}>
                <Routes>
                  <Route path="dashboard" element={<CourierDashboard />} />
                  <Route path="my-deliveries" element={<MyDeliveries />} />
                  <Route path="wallet" element={<CourierWallet />} />
                  <Route path="profile" element={<CourierProfile />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </ProtectedRoute>
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App; 