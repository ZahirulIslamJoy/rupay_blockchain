import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context-api/AuthContext';
const PrivateRoute = ({children}) => {
  const { loginStatus } = useAuth();
  const navigate = useNavigate();

  console.log(loginStatus)

  useEffect(() => {
    if (loginStatus !== "user" && loginStatus !== "authority"){
      navigate("/login");
    }
  }, [loginStatus, navigate]);

  console.log(children)

  return (loginStatus === "user" || loginStatus === "authority") ? children : null;
};

export default PrivateRoute;
