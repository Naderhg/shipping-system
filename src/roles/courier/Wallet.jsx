import { useState } from 'react';
import CourierLayout from '../../layouts/CourierLayout';

const TransactionType = ({ type }) => {
  const typeColors = {
    'earning': 'bg-green-100 text-green-800',
    'withdrawal': 'bg-blue-100 text-blue-800',
    'bonus': 'bg-purple-100 text-purple-800',
    'pending': 'bg-yellow-100 text-yellow-800',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${typeColors[type]}`}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
};

const Wallet = () => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  
  const [balance] = useState('$854.32');
  const [pendingBalance] = useState('$125.00');
  const [totalEarnings] = useState('$2,450.00');
  
  const [transactions] = useState([
    {
      id: 1,
      type: 'earning',
      amount: '+$25.00',
      description: 'Delivery #DEL001 completed',
      date: '2024-02-10 14:30',
      status: 'completed',
    },
    {
      id: 2,
      type: 'withdrawal',
      amount: '-$500.00',
      description: 'Bank withdrawal',
      date: '2024-02-09 10:15',
      status: 'completed',
    },
    {
      id: 3,
      type: 'bonus',
      amount: '+$50.00',
      description: 'Weekly performance bonus',
      date: '2024-02-08 16:45',
      status: 'completed',
    },
    {
      id: 4,
      type: 'pending',
      amount: '+$125.00',
      description: 'Pending deliveries earnings',
      date: '2024-02-10 09:20',
      status: 'pending',
    },
  ]);

  const [banks] = useState([
    { id: 'bank1', name: 'Bank of America', accountNumber: '****1234' },
    { id: 'bank2', name: 'Chase', accountNumber: '****5678' },
    { id: 'bank3', name: 'Wells Fargo', accountNumber: '****9012' },
  ]);

  const handleWithdraw = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to process the withdrawal
    console.log('Processing withdrawal:', { amount: withdrawAmount, bankId: selectedBank });
    setShowWithdrawModal(false);
    setWithdrawAmount('');
    setSelectedBank('');
  };

  return (
    <CourierLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Wallet</h1>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Available Balance */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-sm font-medium text-gray-500">Available Balance</h2>
            <p className="text-3xl font-bold text-gray-900 mt-2">{balance}</p>
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
            >
              Withdraw
            </button>
          </div>

          {/* Pending Balance */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-sm font-medium text-gray-500">Pending Balance</h2>
            <p className="text-3xl font-bold text-gray-900 mt-2">{pendingBalance}</p>
            <p className="mt-4 text-sm text-gray-500">
              Will be available after delivery confirmation
            </p>
          </div>

          {/* Total Earnings */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-sm font-medium text-gray-500">Total Earnings</h2>
            <p className="text-3xl font-bold text-gray-900 mt-2">{totalEarnings}</p>
            <p className="mt-4 text-sm text-gray-500">
              Lifetime earnings
            </p>
          </div>
        </div>

        {/* Weekly Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Weekly Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Deliveries</p>
              <p className="text-xl font-semibold text-gray-900">24</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Earnings</p>
              <p className="text-xl font-semibold text-gray-900">$320.00</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tips</p>
              <p className="text-xl font-semibold text-gray-900">$45.00</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Bonus</p>
              <p className="text-xl font-semibold text-gray-900">$50.00</p>
            </div>
          </div>
        </div>

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
                      transaction.amount.startsWith('+') ? 'text-green-600' : 'text-blue-600'
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

        {/* Withdraw Modal */}
        {showWithdrawModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Withdraw Funds</h2>
              <form onSubmit={handleWithdraw} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="pl-7 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Select Bank Account</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  >
                    <option value="">Select a bank account</option>
                    {banks.map(bank => (
                      <option key={bank.id} value={bank.id}>
                        {bank.name} ({bank.accountNumber})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowWithdrawModal(false)}
                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
                  >
                    Withdraw
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

export default Wallet; 