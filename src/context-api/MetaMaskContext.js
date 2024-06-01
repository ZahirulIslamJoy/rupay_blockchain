import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initializeWeb3 } from "../web3Config/web3Config";

const MetaMaskContext = createContext();

export const MetaMaskProvider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(localStorage.getItem("account") || null);
  const [contract, setContract] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedContractAddress = localStorage.getItem("contractAddress");
    const storedContractABI = localStorage.getItem("contractABI");

    if (storedContractAddress && storedContractABI && web3) {
      const contractInstance = new web3.eth.Contract(
        JSON.parse(storedContractABI),
        storedContractAddress
      );
      setContract(contractInstance);
    }
  }, [web3]);

  const connectMetaMask = async () => {
    const result = await initializeWeb3();
    if (result?.web3Instance) {
      setWeb3(result.web3Instance);
      setAccount(result.account);
      setContract(result.contractInstance);

      localStorage.setItem("account", result.account);
      localStorage.setItem("contractAddress", result.contractInstance.options.address);
      localStorage.setItem("contractABI", JSON.stringify(result.contractInstance.options.jsonInterface));
      
      alert("MetaMask connected!");
    }
  };

  const disconnectMetaMask = () => {
    setWeb3(null);
    setAccount(null);
    setContract(null);
    localStorage.removeItem("account");
    localStorage.removeItem("contractAddress");
    localStorage.removeItem("contractABI");
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", function (accounts) {
        if (accounts.length !== 0) {
          initializeWeb3().then((result) => {
            setWeb3(result.web3Instance);
            setAccount(result.account);
            setContract(result.contractInstance);

            localStorage.setItem("account", result.account);
            localStorage.setItem("contractAddress", result.contractInstance.options.address);
            localStorage.setItem("contractABI", JSON.stringify(result.contractInstance.options.jsonInterface));
          });
        } else {
          setAccount(null);
          setContract(null);
          localStorage.removeItem("account");
          localStorage.removeItem("contractAddress");
          localStorage.removeItem("contractABI");
        }
        navigate("/"); // Navigate to home page on account change
      });
    }
  }, [navigate]);

  return (
    <MetaMaskContext.Provider
      value={{ web3, account, contract, connectMetaMask, disconnectMetaMask }}
    >
      {children}
    </MetaMaskContext.Provider>
  );
};

export const useMetaMask = () => useContext(MetaMaskContext);
