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
      <h1>Balance: {balance} ETH</h1>
      <button onClick={() => addTokens("01733850322", 1)}>Add 1 ETH</button>
    </div>
  );
};

export default Profile;
