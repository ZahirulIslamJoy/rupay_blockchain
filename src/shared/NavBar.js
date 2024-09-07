import React from "react";
import { Link } from "react-router-dom";
import { useMetaMask } from "../context-api/MetaMaskContext";
import { useAuth } from "../context-api/AuthContext";
import bg from "../assets/images/Ru_Pay_logo_final-removebg-preview.png";

const Navbar = () => {
  const { account, contract, connectMetaMask, disconnectMetaMask } =
    useMetaMask();
  const { logout, loginStatus } = useAuth();

  return (
    <nav className="bg-[#1F407F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-white text-2xl font-semibold">
            {/* <div className="bg-white rounded-lg p-1">
          <span className="text-red-600">
          Ru
          </span>
          <span className="text-black">
          Pay
          </span>
          </div>
             */}
           <div className="h-16 w-32 flex items-center bg-white">
           <img className="" src={bg} />
           </div>
          </Link>
          <div className="flex items-center">
            <Link
              to="/"
              className="text-gray-300 ml-8 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-300 ml-8 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Services
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-300 ml-8 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              About Us
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-300 ml-8 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact Us
            </Link>
            <Link
              to="/dashboard/profile"
              className="text-gray-300 ml-8 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </Link>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              {loginStatus !== "user" && loginStatus !== "authority" ? (
                <Link
                  to="/login"
                  className="rounded-md  bg-[#3c8eb4]  ml-8 px-6 py-1 text-white transition-all duration-300 hover:scale-90"
                >
                  Login
                </Link>
              ) : (
                <button
                  onClick={logout}
                  className="rounded-md  bg-[#3c8eb4]  ml-8 px-6 py-1 text-white transition-all duration-300 hover:scale-90"
                >
                  Log Out
                </button>
              )}
              {!loginStatus && (
                <Link
                  to="/register"
                  className="rounded-md bg-[#3c8eb4] ml-8 px-6 py-1 text-white transition-all duration-300 hover:scale-90"
                >
                  Sign Up
                </Link>
              )}
              {account && contract ? (
                <>
                  <button
                    onClick={disconnectMetaMask}
                    className="rounded-md bg-[#3c8eb4] ml-8 px-6 py-1 text-white transition-all duration-300 hover:scale-90"
                  >
                    Connected
                  </button>
                </>
              ) : (
                <Link
                  onClick={connectMetaMask}
                  className="rounded-md bg-red-500 ml-8 px-6 py-1 text-white transition-all duration-300 hover:scale-90"
                >
                  Connect
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
