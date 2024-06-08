import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context-api/AuthContext";

const PrivateRoute = ({ children }) => {
  const { loading } = useAuth();
  const [loginStatus, setLoginStatus] = useState(() => {
    const status = localStorage.getItem("loginStatus");
    return status ? status : "guest"; // Assuming "guest" as the default value
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      const status = localStorage.getItem("loginStatus");
      if (status) setLoginStatus(status);
    }
  }, [loading]);

  console.log(loginStatus);

  useEffect(() => {
    if (loginStatus !== "user" && loginStatus !== "authority") {
      navigate("/login");
    }
  }, [loginStatus, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Render loading indicator
  }

  return loginStatus === "user" || loginStatus === "authority"
    ? children
    : null;
};

export default PrivateRoute;
