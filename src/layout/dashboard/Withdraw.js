import React, { useState } from 'react';
import { useMetaMask } from '../../context-api/MetaMaskContext';

const Withdraw = () => {
  const { web3, account, contract } = useMetaMask();
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const withdraw = async (e) => {
    e.preventDefault();

    if (!amount) {
      setMessage('Please enter the amount to withdraw.');
      return;
    }

    if (!web3 || !account || !contract) {
      setMessage('Please connect MetaMask.');
      return;
    }

    try {
      const weiAmount = web3.utils.toWei(amount, 'ether');
      await contract.methods.withDraw(weiAmount).send({ from: account });
      setMessage('Withdrawal successful!');
    } catch (error) {
      const errorMessage = error.message || 'An unknown error occurred';
      setMessage(`Error: ${errorMessage}`);
      console.error('Error details:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">Withdraw Money</h2>
      <form className="space-y-4">
        <label onSubmit={withdraw} className="block">
          <span className="text-gray-700">Amount</span>
          <input
            type="number"
            id='amount'
            name='amount'
            className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter amount to withdraw"
          />
        </label>
        <button
          type="submit"
          className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Withdraw
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
    </div>
  );
};

export default Withdraw;
