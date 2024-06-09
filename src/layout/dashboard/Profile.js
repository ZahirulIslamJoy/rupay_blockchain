import { useEffect, useState } from "react";
import { useMetaMask } from "../../context-api/MetaMaskContext";
import Loader from "../../loader/Loader";

const Profile = () => {
  const { web3, account, contract } = useMetaMask();
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const getBalance = async () => {
    if (!web3 || !account || !contract) {
      alert("Please connect MetaMask.");
      return;
    }
    try {
      setLoading(true);
      const result = await contract.methods
        .getBalance()
        .call({ from: account });
      console.log("Raw Balance from Contract:", result);
      console.log(typeof result);
      const etherBalance = web3.utils.fromWei(result, "ether");
      console.log("Converted Balance in Ether:", etherBalance);
      setBalance(etherBalance);
      setLoading(false);
    } catch (error) {
      const errorMessage = error.message || "An unknown error occurred";
      alert(`Error: ${errorMessage}`);
      setLoading(false);
      console.error("Error details:", error);
    }
  };

  useEffect(() => {
    getBalance();
  }, [account, contract]);

  return (
    <div>
      {loading ? (
        <div>
          <Loader></Loader>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Profile;
