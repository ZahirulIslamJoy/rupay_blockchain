import React, { createContext, useContext, useState, useEffect } from "react";
import Web3 from "web3";
import {
  CashLessContract,
  contactId,
  initializeWeb3,
} from "../web3Config/web3Config";

const MetaMaskContext = createContext();

export const MetaMaskProvider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(
    localStorage.getItem("account") || null
  );
  const [contract, setContract] = useState(null);

  const connectMetaMask = async () => {
    const result = await initializeWeb3();
    if (result?.web3Instance) {
      setWeb3(result.web3Instance);
      setAccount(result.account);
      setContract(result.contractInstance);
      localStorage.setItem("account", result.account);
      alert("MetaMask connected!");
    }
  };

  const disconnectMetaMask = () => {
    setWeb3(null);
    setAccount(null);
    setContract(null);
    localStorage.removeItem("account");
    alert("MetaMask disconnected!");
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", function (accounts) {
        // If MetaMask account changes, force reconnection
        if (accounts.length > 0) {
          disconnectMetaMask();
          connectMetaMask();
        }
      });
    }
  }, []);

  return (
    <MetaMaskContext.Provider
      value={{ web3, account, contract, connectMetaMask, disconnectMetaMask }}
    >
      {children}
    </MetaMaskContext.Provider>
  );
};

export const useMetaMask = () => useContext(MetaMaskContext);
