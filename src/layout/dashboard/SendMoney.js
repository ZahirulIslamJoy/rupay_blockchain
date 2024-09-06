// SendMoney.js

import React, { useState } from "react";
import { useMetaMask } from "../../context-api/MetaMaskContext";
import Loader from "../../loader/Loader";
import bg from "../../assets/images/large-t-12-thailand-enhances-real-time-cross-border-qr-payment-1-32aad7a469401405e9e5098635.jpg";

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
        <div>
          <div className="mt-10">
            <div
              style={{
                backgroundImage: `linear-gradient(155deg, rgba(48, 100, 198, 0.7) 0%, rgba(31, 64, 127, 0.7) 100%), url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="bg-no-repeat bg-center h-[500px]"
            >
              <div className="flex items-center">
                <div className="w-[40%] flex flex-col justify-center items-start h-full ml-8 gap-8">
                  <p className="text-gray-200 font-medium ">
                    SIMPLE AND EASY WAY TO
                  </p>
                  <p className="text-white text-5xl font-semibold ">
                    Transfer Money Across World In Real Time With No Charge
                  </p>
                  <p></p>
                </div>
                <div className="w-[40%]  mt-12 mx-auto p-8 bg-white rounded-xl shadow-lg space-y-6 border border-gray-200">
                  <h2 className="text-xl font-extrabold  text-gray-900">
                    Send Money
                  </h2>
                  <form onSubmit={sendPayment}>
                    <label className="block">
                      <span className="text-gray-800 text-sm font-medium">
                        Phone Number
                      </span>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        className="mt-1 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter Recipient Phone Number"
                      />
                    </label>
                    <label className="block mt-2">
                      <span className="text-gray-800 text-sm font-medium">
                        Amount
                      </span>
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        className="mt-1 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter Amount"
                      />
                    </label>
                    <button
                      type="submit"
                      className="w-full mt-6 py-3 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
                    >
                      Send
                    </button>
                  </form>
                  {message && (
                    <p className="mt-4 text-sm text-red-600">{message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendMoney;
