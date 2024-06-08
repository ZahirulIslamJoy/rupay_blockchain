import React, { useEffect, useState } from 'react';
import { useMetaMask } from '../../context-api/MetaMaskContext';

const History = () => {
  const { web3, account, contract } = useMetaMask();
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState('');

  const fetchTransactionHistory = async () => {
    if (!web3 || !account || !contract) {
      setMessage('Please connect MetaMask.');
      return;
    }

    try {
      const result = await contract.methods.getTransactionHistory().call({ from: account });
      setTransactions(result);
    } catch (error) {
      const errorMessage = error.message || 'An unknown error occurred';
      setMessage(`Error: ${errorMessage}`);
      console.error('Error details:', error);
    }
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, [account, contract]);

  console.log(transactions)

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">Transaction History</h2>
      {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">From</th>
            <th className="py-2">To</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{tx.from === "01733850321" ? " Ru Authority" : tx.from}</td>
              <td className="border px-4 py-2">{tx.to === "01733850321" ? "Ru Authority" : tx.to}</td>
              <td className="border px-4 py-2">{web3.utils.fromWei(tx.amount.toString(), 'ether')} ETH</td>
              <td className="border px-4 py-2">{new Date(Number(tx.timestamp) * 1000).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
