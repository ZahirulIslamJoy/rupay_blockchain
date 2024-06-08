// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMetaMask } from './MetaMaskContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { account, contract } = useMetaMask();
  const [loginStatus, setLoginStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const status = localStorage.getItem('loginStatus');
    if (status) setLoginStatus(status);
  }, []);

  const login = async (phone, password) => {
    try {
      if (!contract) {
        throw new Error("Contract not initialized");
      }
      const result = await contract.methods.loginCheck(phone, password).call({ from: account });
      setLoginStatus(result);
      localStorage.setItem('loginStatus', result);
      if (result === "user") {
        navigate("/dashboard");
      } else {
        alert("Please Create An Account First");
        navigate("/registration")
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = () => {
    setLoginStatus(null);
    localStorage.removeItem('loginStatus');
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ loginStatus, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
