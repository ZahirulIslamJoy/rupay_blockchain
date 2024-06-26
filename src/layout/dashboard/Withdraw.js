import React, { useState } from "react";
import { useMetaMask } from "../../context-api/MetaMaskContext";
import Loader from "../../loader/Loader";

const Withdraw = () => {
  const { web3, account, contract } = useMetaMask();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const withdraw = async (e) => {
    console.log(e.target);
    e.preventDefault();
    const amount = e.target.amount.value;
    console.log(amount);

    if (!amount) {
      setMessage("Please enter the amount to withdraw.");
      return;
    }

    if (!web3 || !account || !contract) {
      setMessage("Please connect MetaMask.");
      return;
    }

    try {
      setLoading(true);
      const weiAmount = web3.utils.toWei(amount, "ether");
      await contract.methods.withDraw(weiAmount).send({ from: account });
      setLoading(false);
      setMessage("Withdrawal successful!");
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
        <div className="max-w-md mt-12 mx-auto p-8 bg-white rounded-xl shadow-md space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Withdraw Money
          </h2>
          <form onSubmit={withdraw} className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Amount</span>
              <input
                type="number"
                id="amount"
                name="amount"
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
      )}
    </div>
  );
};

export default Withdraw;
