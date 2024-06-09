import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initializeWeb3 } from "../web3Config/web3Config";
import Loader from "../loader/Loader";

const MetaMaskContext = createContext();

export const MetaMaskProvider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(
    localStorage.getItem("account") || null
  );
  const [contract, setContract] = useState(null);
  //const [loading, setLoading] = useState(true); // Initialize as true
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const result = await initializeWeb3();
      if (result?.web3Instance) {
        setWeb3(result.web3Instance);
        setAccount(result.account);
        setContract(result.contractInstance);

        localStorage.setItem("account", result.account);
        localStorage.setItem(
          "contractAddress",
          result.contractInstance.options.address
        );
        localStorage.setItem(
          "contractABI",
          JSON.stringify(result.contractInstance.options.jsonInterface)
        );
        //setLoading(false); // Set loading to false after initialization
        // alert("MetaMask connected!");
      }
    };

    init();
  }, []); // Only run once on component mount
  useEffect(() => {
    if (contract) {
      localStorage.setItem("contractAddress", contract.options.address);
      localStorage.setItem(
        "contractABI",
        JSON.stringify(contract.options.jsonInterface)
      );
    }
  }, [contract]);

  const connectMetaMask = async () => {
    //setLoading(true);
    const result = await initializeWeb3();
    if (result?.web3Instance) {
      setWeb3(result.web3Instance);
      setAccount(result.account);
      setContract(result.contractInstance);

      localStorage.setItem("account", result.account);
      localStorage.setItem(
        "contractAddress",
        result.contractInstance.options.address
      );
      localStorage.setItem(
        "contractABI",
        JSON.stringify(result.contractInstance.options.jsonInterface)
      );
      //setLoading(false);

      // alert("MetaMask connected!");
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
            localStorage.setItem(
              "contractAddress",
              result.contractInstance.options.address
            );
            localStorage.setItem(
              "contractABI",
              JSON.stringify(result.contractInstance.options.jsonInterface)
            );
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

  // if (loading) {
  //   return <div><Loader></Loader></div>; // Render loading indicator while initializing
  // }

  return (
    <MetaMaskContext.Provider
      value={{ web3, account, contract, connectMetaMask, disconnectMetaMask }}
    >
      {children}
    </MetaMaskContext.Provider>
  );
};

export const useMetaMask = () => useContext(MetaMaskContext);
