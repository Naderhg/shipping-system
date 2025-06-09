import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';

const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MODERATOR: 'moderator'
};

const PERMISSIONS = {
  MANAGE_ADMINS: 'manage_admins',
  MANAGE_MERCHANTS: 'manage_merchants',
  MANAGE_AGENTS: 'manage_agents',
  MANAGE_SHIPMENTS: 'manage_shipments',
  MANAGE_ORDERS: 'manage_orders',
  MANAGE_WALLETS: 'manage_wallets',
  MANAGE_ZONES: 'manage_zones',
  VIEW_REPORTS: 'view_reports',
  MANAGE_SETTINGS: 'manage_settings'
};

const DEFAULT_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
  [ROLES.ADMIN]: [
    PERMISSIONS.MANAGE_MERCHANTS,
    PERMISSIONS.MANAGE_AGENTS,
    PERMISSIONS.MANAGE_SHIPMENTS,
    PERMISSIONS.MANAGE_ORDERS,
    PERMISSIONS.VIEW_REPORTS
  ],
  [ROLES.MODERATOR]: [
    PERMISSIONS.VIEW_REPORTS
  ]
};

const AdminModal = ({ isOpen, onClose, admin, onSubmit }) => {
  const [formData, setFormData] = useState(
    admin || {
      name: '',
      email: '',
      role: ROLES.ADMIN,
      password: '',
      confirmPassword: '',
      customPermissions: []
    }
  );

  const [useCustomPermissions, setUseCustomPermissions] = useState(
    admin ? !Object.values(ROLES).includes(admin.role) : false
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">
            {admin ? 'Edit Admin User' : 'Add New Admin User'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">×</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          {!admin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required={!admin}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required={!admin}
                />
              </div>
            </>
          )}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={useCustomPermissions}
                  onChange={(e) => setUseCustomPermissions(e.target.checked)}
                  className="mr-2"
                />
                Custom Permissions
              </label>
            </div>
            {!useCustomPermissions ? (
              <select
                value={formData.role}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  role: e.target.value,
                  customPermissions: DEFAULT_PERMISSIONS[e.target.value]
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              >
                {Object.entries(ROLES).map(([key, value]) => (
                  <option key={value} value={value}>
                    {key.replace('_', ' ')}
                  </option>
                ))}
              </select>
            ) : (
              <div className="mt-2 space-y-2">
                {Object.entries(PERMISSIONS).map(([key, value]) => (
                  <label key={value} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.customPermissions.includes(value)}
                      onChange={(e) => {
                        const newPermissions = e.target.checked
                          ? [...formData.customPermissions, value]
                          : formData.customPermissions.filter(p => p !== value);
                        setFormData({
                          ...formData,
                          role: 'custom',
                          customPermissions: newPermissions
                        });
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">
                      {key.replace('_', ' ')}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {admin ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminUserManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with API calls
  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: 'John Admin',
      email: 'john@admin.com',
      role: ROLES.SUPER_ADMIN,
      lastLogin: '2024-02-15 10:30 AM',
      status: 'active'
    },
    {
      id: 2,
      name: 'Jane Moderator',
      email: 'jane@admin.com',
      role: ROLES.MODERATOR,
      lastLogin: '2024-02-14 03:45 PM',
      status: 'active'
    },
  ]);

  const handleAddAdmin = () => {
    setSelectedAdmin(null);
    setShowModal(true);
  };

  const handleEditAdmin = (admin) => {
    setSelectedAdmin(admin);
    setShowModal(true);
  };

  const handleDeleteAdmin = (adminId) => {
    if (window.confirm('Are you sure you want to delete this admin user?')) {
      setAdmins(admins.filter(admin => admin.id !== adminId));
    }
  };

  const handleSubmit = (formData) => {
    if (selectedAdmin) {
      // Update existing admin
      setAdmins(admins.map(admin =>
        admin.id === selectedAdmin.id ? { ...formData, id: admin.id } : admin
      ));
    } else {
      // Add new admin
      setAdmins([...admins, { ...formData, id: admins.length + 1, status: 'active' }]);
    }
  };

  const toggleAdminStatus = (adminId) => {
    setAdmins(admins.map(admin =>
      admin.id === adminId
        ? { ...admin, status: admin.status === 'active' ? 'inactive' : 'active' }
        : admin
    ));
  };

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Admin Users Management</h1>
          <button
            onClick={handleAddAdmin}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add New Admin
          </button>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl">
          <input
            type="text"
            placeholder="Search admins by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Admins Table */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAdmins.map((admin) => (
                  <tr key={admin.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                      <div className="text-sm text-gray-500">{admin.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {admin.role.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {admin.lastLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        admin.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {admin.status.charAt(0).toUpperCase() + admin.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEditAdmin(admin)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => toggleAdminStatus(admin.id)}
                        className={`${
                          admin.status === 'active'
                            ? 'text-red-600 hover:text-red-900'
                            : 'text-green-600 hover:text-green-900'
                        }`}
                      >
                        {admin.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDeleteAdmin(admin.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Admin Modal */}
        <AdminModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          admin={selectedAdmin}
          onSubmit={handleSubmit}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminUserManagement; 