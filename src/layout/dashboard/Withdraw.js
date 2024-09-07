import React, { useState } from "react";
import { useMetaMask } from "../../context-api/MetaMaskContext";
import Loader from "../../loader/Loader";
import bg from "../../assets/images/large-t-12-thailand-enhances-real-time-cross-border-qr-payment-1-32aad7a469401405e9e5098635.jpg";

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
      const result = await contract.methods
        .getBalance()
        .call({ from: account });
        const etherBalance = web3.utils.fromWei(result, "ether");
        const userInfo = await contract.methods.Details().call({ from: account });
        const data ={balance : etherBalance}
        console.log(data)
        console.log(userInfo)
        if(etherBalance && userInfo){
          const phone = userInfo[1];
          const response = await fetch(
            `http://localhost:7000/users/${phone}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data), 
            }
          );
        }
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
        <div>
          <div className="mt-10">
            <div
              style={{
                backgroundImage: `linear-gradient(155deg, rgba(48, 100, 198, 0.7) 0%, rgba(31, 64, 127, 0.7) 100%), url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn6eHLeVpKgMXOTtzwVCQaxlaxsSQu4h-T2KvdvTxusPlcbVR548Hwe8eYF2VJKHRx3Z8&usqp=CAU")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="bg-no-repeat bg-center h-[500px]"
            >
              <div className="flex items-center">
                <div className="w-[40%] flex mt-16 flex-col justify-center items-start h-full ml-8 gap-8">
                  <p className="text-gray-200 font-medium ">
                    SIMPLE AND EASY WAY TO
                  </p>
                  <p className="text-white text-5xl font-semibold ">
                    Withdraw Money Across World In Real Time With No Charge
                  </p>
                  <p></p>
                </div>
                <div className="w-[40%] mt-12 mx-auto p-8 bg-white rounded-xl shadow-md space-y-6">
                  <h2 className="text-xl font-extrabold  text-gray-900">
                    Withdraw 
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

export default Withdraw;
