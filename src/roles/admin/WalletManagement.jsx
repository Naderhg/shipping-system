import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';

const TransactionHistory = ({ transactions }) => (
  <div className="mt-4">
    <h3 className="text-lg font-medium text-gray-900 mb-4">Transaction History</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  transaction.type === 'credit' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {transaction.type === 'credit' ? 'Credit' : 'Debit'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${transaction.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${transaction.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const WalletCard = ({ title, balance, onAddFunds, onDeductFunds }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
    <div className="text-3xl font-bold text-gray-900 mb-4">
      ${balance.toFixed(2)}
    </div>
    <div className="flex space-x-4">
      <button
        onClick={onAddFunds}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Funds
      </button>
      <button
        onClick={onDeductFunds}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Deduct Funds
      </button>
    </div>
  </div>
);

const PaymentModal = ({ isOpen, onClose, type, userType, userName, onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ amount: parseFloat(amount), description });
    setAmount('');
    setDescription('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">
            {type === 'add' ? 'Add Funds' : 'Deduct Funds'} - {userType}: {userName}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">×</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              rows="3"
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
              className={`px-4 py-2 rounded-md text-white ${
                type === 'add' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const WalletManagement = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock data - replace with API calls
  const [merchants] = useState([
    { id: 1, name: 'John Doe', businessName: 'JD Enterprises', balance: 5000 },
    { id: 2, name: 'Jane Smith', businessName: 'JS Shipping', balance: 3500 },
  ]);

  const [agents] = useState([
    { id: 1, name: 'Mike Wilson', balance: 2000 },
    { id: 2, name: 'Sarah Johnson', balance: 1500 },
  ]);

  const [transactions] = useState([
    {
      id: 1,
      date: '2024-02-15',
      type: 'credit',
      description: 'Payment for deliveries',
      amount: 500,
      balance: 5000,
    },
    {
      id: 2,
      date: '2024-02-14',
      type: 'debit',
      description: 'Withdrawal request',
      amount: 200,
      balance: 4500,
    },
  ]);

  const handlePaymentAction = (user, type, userType) => {
    setSelectedUser({ ...user, type: userType });
    setModalType(type);
    setShowModal(true);
  };

  const handlePaymentSubmit = (data) => {
    // Handle payment submission - integrate with your API
    console.log('Payment submitted:', {
      user: selectedUser,
      type: modalType,
      ...data,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Wallet & Payments Management</h1>

        {/* Merchants Section */}
        <div>
          <h2 className="text-xl font-medium text-gray-900 mb-4">Merchant Wallets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {merchants.map((merchant) => (
              <WalletCard
                key={merchant.id}
                title={`${merchant.businessName} (${merchant.name})`}
                balance={merchant.balance}
                onAddFunds={() => handlePaymentAction(merchant, 'add', 'Merchant')}
                onDeductFunds={() => handlePaymentAction(merchant, 'deduct', 'Merchant')}
              />
            ))}
          </div>
        </div>

        {/* Agents Section */}
        <div>
          <h2 className="text-xl font-medium text-gray-900 mb-4">Agent Wallets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <WalletCard
                key={agent.id}
                title={agent.name}
                balance={agent.balance}
                onAddFunds={() => handlePaymentAction(agent, 'add', 'Agent')}
                onDeductFunds={() => handlePaymentAction(agent, 'deduct', 'Agent')}
              />
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <TransactionHistory transactions={transactions} />

        {/* Payment Modal */}
        <PaymentModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          type={modalType}
          userType={selectedUser?.type}
          userName={selectedUser?.name}
          onSubmit={handlePaymentSubmit}
        />
      </div>
    </AdminLayout>
  );
};

export default WalletManagement; 