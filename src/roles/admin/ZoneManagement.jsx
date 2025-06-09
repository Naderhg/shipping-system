import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';

const ZoneModal = ({ isOpen, onClose, zone, onSubmit }) => {
  const [formData, setFormData] = useState(
    zone || {
      name: '',
      governorate: '',
      cities: '',
      basePrice: '',
      pricePerKg: '',
      estimatedDays: '',
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">
            {zone ? 'Edit Zone' : 'Add New Zone'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">×</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Zone Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Governorate</label>
            <input
              type="text"
              value={formData.governorate}
              onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cities (comma-separated)</label>
            <textarea
              value={formData.cities}
              onChange={(e) => setFormData({ ...formData, cities: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              rows="3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Base Price ($)</label>
            <input
              type="number"
              step="0.01"
              value={formData.basePrice}
              onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price per KG ($)</label>
            <input
              type="number"
              step="0.01"
              value={formData.pricePerKg}
              onChange={(e) => setFormData({ ...formData, pricePerKg: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Estimated Delivery Days</label>
            <input
              type="number"
              value={formData.estimatedDays}
              onChange={(e) => setFormData({ ...formData, estimatedDays: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
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
              {zone ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ZoneManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with API calls
  const [zones, setZones] = useState([
    {
      id: 1,
      name: 'Zone A',
      governorate: 'Cairo',
      cities: 'Maadi, Nasr City, Heliopolis',
      basePrice: 10.00,
      pricePerKg: 2.00,
      estimatedDays: 1,
    },
    {
      id: 2,
      name: 'Zone B',
      governorate: 'Alexandria',
      cities: 'Miami, Montazah, Sidi Gaber',
      basePrice: 15.00,
      pricePerKg: 2.50,
      estimatedDays: 2,
    },
  ]);

  const handleAddZone = () => {
    setSelectedZone(null);
    setShowModal(true);
  };

  const handleEditZone = (zone) => {
    setSelectedZone(zone);
    setShowModal(true);
  };

  const handleDeleteZone = (zoneId) => {
    if (window.confirm('Are you sure you want to delete this zone?')) {
      setZones(zones.filter(zone => zone.id !== zoneId));
    }
  };

  const handleSubmit = (formData) => {
    if (selectedZone) {
      // Update existing zone
      setZones(zones.map(zone =>
        zone.id === selectedZone.id ? { ...formData, id: zone.id } : zone
      ));
    } else {
      // Add new zone
      setZones([...zones, { ...formData, id: zones.length + 1 }]);
    }
  };

  const filteredZones = zones.filter(zone =>
    zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    zone.governorate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    zone.cities.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Zones Management</h1>
          <button
            onClick={handleAddZone}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add New Zone
          </button>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl">
          <input
            type="text"
            placeholder="Search zones by name, governorate, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Zones Table */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cities</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pricing</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredZones.map((zone) => (
                  <tr key={zone.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{zone.name}</div>
                      <div className="text-sm text-gray-500">{zone.governorate}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{zone.cities}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Base: ${zone.basePrice}</div>
                      <div className="text-sm text-gray-500">Per KG: ${zone.pricePerKg}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{zone.estimatedDays} day(s)</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEditZone(zone)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteZone(zone.id)}
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

        {/* Zone Modal */}
        <ZoneModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          zone={selectedZone}
          onSubmit={handleSubmit}
        />
      </div>
    </AdminLayout>
  );
};

export default ZoneManagement; 