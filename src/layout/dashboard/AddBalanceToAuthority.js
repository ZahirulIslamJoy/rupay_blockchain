import { useEffect, useState } from "react";
import { useMetaMask } from "../../context-api/MetaMaskContext";

const  AddBalanceToAuthority= () => {
  const { web3, account, contract } = useMetaMask();
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(1); // Default to 1 ETH for testing

  // Function to fetch the authority balance
  const getBalance = async () => {
    if (!web3 || !account || !contract) {
      alert("Please connect MetaMask.");
      return;
    }
    try {
      const result = await contract.methods.getBalance().call({ from: account });
      const etherBalance = web3.utils.fromWei(result, "ether");
      setBalance(etherBalance);
    } catch (error) {
      const errorMessage = error.message || "An unknown error occurred";
      alert(`Error: ${errorMessage}`);
      console.error("Error details:", error);
    }
  };

  // Function to add money to the authority
  const addMoneyToAuthority = async () => {
    if (!web3 || !account || !contract) {
      alert("Please connect MetaMask.");
      return;
    }
    try {
      const weiAmount = web3.utils.toWei(amount.toString(), "ether");
      await contract.methods.addMoneyToAuthority(weiAmount).send({ from: account });
      alert("Money added to authority successfully!");
      getBalance(); // Update balance after adding money
    } catch (error) {
      const errorMessage = error.message || "An unknown error occurred";
      alert(`Error: ${errorMessage}`);
      console.error("Error details:", error);
    }
  };

  useEffect(() => {
    if (account && contract) {
      getBalance();
    }
  }, [account, contract]);

  return (
    <div className="container mx-auto p-4">

      <div className="bg-white shadow-md rounded p-4 mb-4">
        <h2 className="text-lg font-bold mb-4">Add Money to Authority</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <button
          onClick={addMoneyToAuthority}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Money
        </button>
      </div>
    </div>
  );
};

export default AddBalanceToAuthority;
