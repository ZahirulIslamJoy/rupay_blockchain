// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMetaMask } from './MetaMaskContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { account, contract } = useMetaMask();
  const [loginStatus, setLoginStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const status = localStorage.getItem('loginStatus');
    if (status) setLoginStatus(status);
    setLoading(false);
  }, []);

  const login = async (phone, password) => {
    setLoading(true); // Set loading to true when initiating login process
    try {
      if (!contract) {
        throw new Error("Contract not initialized");
      }
      const result = await contract.methods.loginCheck(phone, password).call({ from: account });
      setLoginStatus(result);
      localStorage.setItem('loginStatus', result);
      console.log(result)
      if (result === "user" || result === "authority") {
        setLoading(false); // Set loading to false after successful login
        navigate("/dashboard");
      } else {
        setLoading(false); // Set loading to false if login fails
        alert("Invalid Account");
      }
    } catch (error) {
      setLoading(false); // Set loading to false if login encounters an error
      console.error("Error logging in:", error);
    }
  };
  

  const logout = () => {
    setLoginStatus(null);
    localStorage.removeItem('loginStatus');
    setLoading(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ loginStatus, login, loading ,logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
