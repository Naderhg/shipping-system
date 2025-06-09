import { useState } from 'react';
import CourierLayout from '../../layouts/CourierLayout';

const DeliveryStatus = ({ status }) => {
  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'picked-up': 'bg-blue-100 text-blue-800',
    'in-transit': 'bg-purple-100 text-purple-800',
    'delivered': 'bg-green-100 text-green-800',
    'failed': 'bg-red-100 text-red-800',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${statusColors[status]}`}>
      {status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
    </span>
  );
};

const MyDeliveries = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [updateStatus, setUpdateStatus] = useState('');
  const [updateNotes, setUpdateNotes] = useState('');

  const [deliveries] = useState([
    {
      id: 'DEL001',
      trackingNumber: 'TRK123456789',
      pickupAddress: '123 Sender St, New York, NY 10001',
      deliveryAddress: '456 Receiver Ave, Brooklyn, NY 11201',
      status: 'pending',
      estimatedDelivery: '2024-02-12',
      customerName: 'John Smith',
      customerPhone: '+1 (555) 123-4567',
      packageDetails: 'Medium box, 5kg',
      amount: '$15.00',
      date: '2024-02-10',
    },
    {
      id: 'DEL002',
      trackingNumber: 'TRK987654321',
      pickupAddress: '789 Business Rd, Manhattan, NY 10013',
      deliveryAddress: '321 Home Ln, Queens, NY 11101',
      status: 'in-transit',
      estimatedDelivery: '2024-02-11',
      customerName: 'Jane Doe',
      customerPhone: '+1 (555) 987-6543',
      packageDetails: 'Small package, 2kg',
      amount: '$12.00',
      date: '2024-02-10',
    },
    {
      id: 'DEL003',
      trackingNumber: 'TRK456789123',
      pickupAddress: '159 Shop St, Staten Island, NY 10301',
      deliveryAddress: '753 Residence Rd, Bronx, NY 10451',
      status: 'delivered',
      estimatedDelivery: '2024-02-10',
      customerName: 'Mike Johnson',
      customerPhone: '+1 (555) 456-7890',
      packageDetails: 'Large box, 10kg',
      amount: '$25.00',
      date: '2024-02-09',
    },
  ]);

  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = 
      delivery.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter;
    
    const matchesDate = dateFilter === 'all' || (() => {
      const today = new Date();
      const deliveryDate = new Date(delivery.date);
      switch (dateFilter) {
        case 'today':
          return deliveryDate.toDateString() === today.toDateString();
        case 'week':
          const weekAgo = new Date(today.setDate(today.getDate() - 7));
          return deliveryDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(today.setMonth(today.getMonth() - 1));
          return deliveryDate >= monthAgo;
        default:
          return true;
      }
    })();

    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleUpdateDelivery = (delivery) => {
    setSelectedDelivery(delivery);
    setUpdateStatus(delivery.status);
    setUpdateNotes('');
    setShowUpdateModal(true);
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update the delivery status
    console.log('Update delivery:', {
      deliveryId: selectedDelivery.id,
      status: updateStatus,
      notes: updateNotes,
    });
    setShowUpdateModal(false);
  };

  return (
    <CourierLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">My Deliveries</h1>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                placeholder="Search by tracking number, customer, or address"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="picked-up">Picked Up</option>
                <option value="in-transit">In Transit</option>
                <option value="delivered">Delivered</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <div>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Deliveries List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tracking Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delivery Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Est. Delivery
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDeliveries.map((delivery) => (
                  <tr key={delivery.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      {delivery.trackingNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{delivery.customerName}</div>
                      <div className="text-sm text-gray-500">{delivery.customerPhone}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {delivery.deliveryAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <DeliveryStatus status={delivery.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {delivery.estimatedDelivery}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {delivery.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleUpdateDelivery(delivery)}
                        className="text-green-600 hover:text-green-800"
                      >
                        Update Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Update Status Modal */}
        {showUpdateModal && selectedDelivery && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Update Delivery Status
              </h2>
              <form onSubmit={handleSubmitUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tracking Number
                  </label>
                  <input
                    type="text"
                    value={selectedDelivery.trackingNumber}
                    disabled
                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    value={updateStatus}
                    onChange={(e) => setUpdateStatus(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="picked-up">Picked Up</option>
                    <option value="in-transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <textarea
                    value={updateNotes}
                    onChange={(e) => setUpdateNotes(e.target.value)}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    placeholder="Add any additional notes about the delivery status..."
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowUpdateModal(false)}
                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
                  >
                    Update Status
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </CourierLayout>
  );
};

export default MyDeliveries; 