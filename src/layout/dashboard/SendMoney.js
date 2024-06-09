// SendMoney.js

import React, { useState } from "react";
import { useMetaMask } from "../../context-api/MetaMaskContext";
import Loader from "../../loader/Loader";

const SendMoney = () => {
  const { web3, account, contract } = useMetaMask();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendPayment = async (e) => {
    e.preventDefault();
    const phone = e.target.phone.value;
    const amount = e.target.amount.value;

    if (!phone || !amount) {
      setMessage("Phone number and amount are required.");
      return;
    }

    if (!web3 || !account || !contract) {
      setMessage("Please connect MetaMask.");
      return;
    }

    try {
      setLoading(true);
      const weiAmount = web3.utils.toWei(amount, "ether");
      await contract.methods
        .makePayment(phone, weiAmount)
        .send({ from: account });
      setLoading(false);
      setMessage("Send Money successful!");
    } catch (error) {
      const errorMessage = error.message || "An unknown error occurred";
      setLoading(false);
      setMessage(`Error: ${errorMessage}`);
      console.error("Error details:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <div>
          <Loader></Loader>
        </div>
      ) : (
        <div className="max-w-md mt-12 mx-auto p-12 bg-white rounded-xl shadow-md space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Send Money
          </h2>
          <form onSubmit={sendPayment} className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Phone Number</span>
              <input
                type="text"
                name="phone"
                id="phone"
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter Receipent Phone number"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Amount</span>
              <input
                type="number"
                name="amount"
                id="amount"
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter amount"
              />
            </label>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send
            </button>
          </form>
          {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default SendMoney;
