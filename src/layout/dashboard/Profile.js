import { useEffect, useState } from "react";
import { useMetaMask } from "../../context-api/MetaMaskContext";

const Profile = () => {
  const { web3, account, contract } = useMetaMask();
  const [balance, setBalance] = useState(0);

  const getBalance = async () => {
    if (!web3 || !account || !contract) {
      alert("Please connect MetaMask.");
      return;
    }
    try {
      const result = await contract.methods.getBalance().call({ from: account });
      console.log("Raw Balance from Contract:", result);
      console.log(typeof result)
      const etherBalance = web3.utils.fromWei(result, "ether");
      console.log("Converted Balance in Ether:", etherBalance);
      setBalance(etherBalance);
    } catch (error) {
      const errorMessage = error.message || "An unknown error occurred";
      alert(`Error: ${errorMessage}`);
      console.error("Error details:", error);
    }
  };

  const addTokens = async (_mobile, _amount) => {
    if (!web3 || !account || !contract) {
      alert("Please connect MetaMask.");
      return;
    }
    try {
      const weiAmount = web3.utils.toWei(_amount.toString(), "ether");
      await contract.methods.setBalanceToUser(_mobile, weiAmount).send({ from: account });
      alert("Tokens added successfully!");
      getBalance();
    } catch (error) {
      const errorMessage = error.message || "An unknown error occurred";
      alert(`Error: ${errorMessage}`);
      console.error("Error details:", error);
    }
  };

  useEffect(() => {
    getBalance();
  }, [account, contract]);

  return (
    <div>
      <div className="bg-white shadow-md rounded p-4 mb-4">
        <h1 className="text-xl font-bold mb-4">Profile</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Balance:</label>
          <p className="text-lg">{balance}</p>
        </div>
        <button
          onClick={getBalance}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Refresh Balance
        </button>
      </div>
    </div>
  );
};

export default Profile;
