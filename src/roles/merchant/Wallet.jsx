import { useState } from 'react';
import MerchantLayout from '../../layouts/MerchantLayout';

const TransactionType = ({ type }) => {
  const typeColors = {
    'credit': 'bg-green-100 text-green-800',
    'debit': 'bg-red-100 text-red-800',
    'pending': 'bg-yellow-100 text-yellow-800',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${typeColors[type]}`}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
};

const Wallet = () => {
  const [balance] = useState('$1,234.56');
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [amount, setAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit-card');

  const [transactions] = useState([
    {
      id: 1,
      type: 'debit',
      amount: '-$120.00',
      description: 'Shipment #SH001',
      date: '2024-02-10 14:30',
      status: 'completed',
    },
    {
      id: 2,
      type: 'credit',
      amount: '+$500.00',
      description: 'Wallet Top-up',
      date: '2024-02-09 10:15',
      status: 'completed',
    },
    {
      id: 3,
      type: 'debit',
      amount: '-$150.00',
      description: 'Shipment #SH002',
      date: '2024-02-08 16:45',
      status: 'completed',
    },
    {
      id: 4,
      type: 'pending',
      amount: '+$200.00',
      description: 'Pending Top-up',
      date: '2024-02-10 09:20',
      status: 'pending',
    },
  ]);

  const handleAddFunds = (e) => {
    e.preventDefault();
    // Here you would typically integrate with a payment gateway
    console.log('Adding funds:', { amount, selectedPaymentMethod });
    setShowAddFunds(false);
    setAmount('');
  };

  return (
    <MerchantLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Wallet</h1>

        {/* Balance Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Available Balance</h2>
              <p className="text-3xl font-bold text-gray-900 mt-2">{balance}</p>
              <button
                onClick={() => setShowAddFunds(true)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Add Funds
              </button>
            </div>
            <div className="border-t md:border-l md:border-t-0 pt-4 md:pt-0 md:pl-6">
              <h2 className="text-sm font-medium text-gray-500">Quick Stats</h2>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">This Month</p>
                  <p className="text-lg font-semibold text-gray-900">$890.00</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Month</p>
                  <p className="text-lg font-semibold text-gray-900">$1,230.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Funds Modal */}
        {showAddFunds && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Funds</h2>
              <form onSubmit={handleAddFunds}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                    <select
                      value={selectedPaymentMethod}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="credit-card">Credit Card</option>
                      <option value="debit-card">Debit Card</option>
                      <option value="bank-transfer">Bank Transfer</option>
                    </select>
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowAddFunds(false)}
                      className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 transition duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                      Add Funds
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Transactions */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Transactions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <TransactionType type={transaction.type} />
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      transaction.type === 'credit' ? 'text-green-600' : 
                      transaction.type === 'debit' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {transaction.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MerchantLayout>
  );
};

export default Wallet; 