import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';

const SettingsSection = ({ title, children }) => (
  <div className="bg-white shadow-sm rounded-lg p-6 space-y-4">
    <h2 className="text-lg font-medium text-gray-900">{title}</h2>
    {children}
  </div>
);

const SystemSettings = () => {
  // Mock data - replace with API calls
  const [generalSettings, setGeneralSettings] = useState({
    systemName: 'Shipping Management System',
    companyName: 'Your Company Name',
    supportEmail: 'support@example.com',
    supportPhone: '+1234567890',
    logo: null,
    favicon: null,
    primaryColor: '#1D4ED8',
    currency: 'USD'
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.example.com',
    smtpPort: '587',
    smtpUsername: 'smtp@example.com',
    smtpPassword: '',
    senderName: 'Shipping System',
    senderEmail: 'noreply@example.com',
    enableSSL: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    enableEmailNotifications: true,
    enableSMSNotifications: false,
    notifyOnNewOrder: true,
    notifyOnDelivery: true,
    notifyOnCancellation: true,
    notifyOnPayment: true,
    dailyReportTime: '06:00',
    adminEmailRecipients: 'admin@example.com'
  });

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload - integrate with your API
      console.log('Logo file:', file);
    }
  };

  const handleFaviconUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload - integrate with your API
      console.log('Favicon file:', file);
    }
  };

  const handleGeneralSettingsSubmit = (e) => {
    e.preventDefault();
    // Handle general settings update - integrate with your API
    console.log('General settings:', generalSettings);
  };

  const handleEmailSettingsSubmit = (e) => {
    e.preventDefault();
    // Handle email settings update - integrate with your API
    console.log('Email settings:', emailSettings);
  };

  const handleNotificationSettingsSubmit = (e) => {
    e.preventDefault();
    // Handle notification settings update - integrate with your API
    console.log('Notification settings:', notificationSettings);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">System Settings</h1>

        {/* General Settings */}
        <SettingsSection title="General Settings">
          <form onSubmit={handleGeneralSettingsSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">System Name</label>
                <input
                  type="text"
                  value={generalSettings.systemName}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, systemName: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  value={generalSettings.companyName}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, companyName: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Support Email</label>
                <input
                  type="email"
                  value={generalSettings.supportEmail}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Support Phone</label>
                <input
                  type="text"
                  value={generalSettings.supportPhone}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, supportPhone: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">System Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Favicon</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFaviconUpload}
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Primary Color</label>
                <input
                  type="color"
                  value={generalSettings.primaryColor}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, primaryColor: e.target.value })}
                  className="mt-1 block w-full h-10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Currency</label>
                <select
                  value={generalSettings.currency}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, currency: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Save General Settings
              </button>
            </div>
          </form>
        </SettingsSection>

        {/* Email Settings */}
        <SettingsSection title="Email Settings">
          <form onSubmit={handleEmailSettingsSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">SMTP Host</label>
                <input
                  type="text"
                  value={emailSettings.smtpHost}
                  onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">SMTP Port</label>
                <input
                  type="text"
                  value={emailSettings.smtpPort}
                  onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">SMTP Username</label>
                <input
                  type="text"
                  value={emailSettings.smtpUsername}
                  onChange={(e) => setEmailSettings({ ...emailSettings, smtpUsername: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">SMTP Password</label>
                <input
                  type="password"
                  value={emailSettings.smtpPassword}
                  onChange={(e) => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sender Name</label>
                <input
                  type="text"
                  value={emailSettings.senderName}
                  onChange={(e) => setEmailSettings({ ...emailSettings, senderName: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sender Email</label>
                <input
                  type="email"
                  value={emailSettings.senderEmail}
                  onChange={(e) => setEmailSettings({ ...emailSettings, senderEmail: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div className="col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={emailSettings.enableSSL}
                    onChange={(e) => setEmailSettings({ ...emailSettings, enableSSL: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Enable SSL/TLS</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Save Email Settings
              </button>
            </div>
          </form>
        </SettingsSection>

        {/* Notification Settings */}
        <SettingsSection title="Notification Settings">
          <form onSubmit={handleNotificationSettingsSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationSettings.enableEmailNotifications}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        enableEmailNotifications: e.target.checked
                      })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Enable Email Notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationSettings.enableSMSNotifications}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        enableSMSNotifications: e.target.checked
                      })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Enable SMS Notifications</span>
                  </label>
                </div>
              </div>
              <div className="col-span-2">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Notification Events</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationSettings.notifyOnNewOrder}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        notifyOnNewOrder: e.target.checked
                      })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">New Order</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationSettings.notifyOnDelivery}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        notifyOnDelivery: e.target.checked
                      })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Delivery Complete</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationSettings.notifyOnCancellation}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        notifyOnCancellation: e.target.checked
                      })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Order Cancellation</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationSettings.notifyOnPayment}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        notifyOnPayment: e.target.checked
                      })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Payment Received</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Daily Report Time</label>
                <input
                  type="time"
                  value={notificationSettings.dailyReportTime}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    dailyReportTime: e.target.value
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Admin Email Recipients</label>
                <input
                  type="text"
                  value={notificationSettings.adminEmailRecipients}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    adminEmailRecipients: e.target.value
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Comma-separated email addresses"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Save Notification Settings
              </button>
            </div>
          </form>
        </SettingsSection>
      </div>
    </AdminLayout>
  );
};

export default SystemSettings; 