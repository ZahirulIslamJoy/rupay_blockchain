// SendMoney.js

import React, { useState } from 'react';
import { useMetaMask } from '../../context-api/MetaMaskContext';

const SendMoney = () => {
  const { web3, account, contract } = useMetaMask();
  const [seller, setSeller] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');


  const sendPayment = async (e) => {
    e.preventDefault();
    const phone=e.target.value.phone;
    const amount = e.target.value.amount;
    if (!web3 || !account || !contract) {
      setMessage('Please connect MetaMask.');
      return;
    }

    try {
      const weiAmount = web3.utils.toWei(amount, 'ether');
      await contract.methods.makePayment(seller, weiAmount).send({ from: account });
      setMessage('Payment successful!');
    } catch (error) {
      const errorMessage = error.message || 'An unknown error occurred';
      setMessage(`Error: ${errorMessage}`);
      console.error('Error details:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">Send Money</h2>
      <form className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Phone Number</span>
          <input
            type="text"
            name='phone'
            id='phone'
            className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter seller's mobile number"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Amount</span>
          <input
            type="number"
            name='amount'
            id='amount'
            className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter amount"
          />
        </label>
        <button
        type='submit'
          onClick={sendPayment}
          className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Send Payment
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
    </div>
  );
};

export default SendMoney;
