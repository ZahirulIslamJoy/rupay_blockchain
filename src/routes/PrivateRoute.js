import React, { Children, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context-api/AuthContext';
const PrivateRoute = ({children}) => {
  const { loginStatus } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loginStatus !== "user") {
      navigate("/login");
    }
  }, [loginStatus, navigate]);

  return loginStatus === "user" ? children : null;
};

export default PrivateRoute;
