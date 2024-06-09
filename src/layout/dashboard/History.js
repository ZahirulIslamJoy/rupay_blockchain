import React, { useEffect, useState } from "react";
import { useMetaMask } from "../../context-api/MetaMaskContext";

const History = () => {
  const { web3, account, contract } = useMetaMask();
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState("");

  const fetchTransactionHistory = async () => {
    if (!web3 || !account || !contract) {
      setMessage("Please connect MetaMask.");
      return;
    }

    try {
      const result = await contract.methods
        .getTransactionHistory()
        .call({ from: account });
      const sortedTransactions = result.sort((a, b) => {
        return Number(b.timestamp) - Number(a.timestamp);
      });
      setTransactions(sortedTransactions);
    } catch (error) {
      const errorMessage = error.message || "An unknown error occurred";
      setMessage(`Error: ${errorMessage}`);
      console.error("Error details:", error);
    }
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, [account, contract]);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Transaction History
      </h2>
      {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b-2 border-gray-300 bg-blue-400 text-left text-sm font-semibold text-white">
                From
              </th>
              <th className="py-3 px-4 border-b-2 border-gray-300 bg-blue-400 text-left text-sm font-semibold text-white">
                To
              </th>
              <th className="py-3 px-4 border-b-2 border-gray-300 bg-blue-400 text-left text-sm font-semibold text-white">
                Amount
              </th>
              <th className="py-3 px-4 border-b-2 border-gray-300 bg-blue-400 text-left text-sm font-semibold text-white">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-blue-50" : "bg-green-50"
                }`}
              >
                <td className="border-t px-4 py-2">
                  {tx.from === "01733850321" ? "Ru Authority" : tx.from}
                </td>
                <td className="border-t px-4 py-2">
                  {tx.to === "01733850321" ? "Ru Authority" : tx.to}
                </td>
                <td className="border-t px-4 py-2">
                  {web3.utils.fromWei(tx.amount.toString(), "ether")}
                </td>
                <td className="border-t px-4 py-2">
                  {new Date(Number(tx.timestamp) * 1000).toLocaleString()}
                </td>{" "}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
