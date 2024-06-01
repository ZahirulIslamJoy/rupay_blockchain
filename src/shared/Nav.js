import React from "react";
import { useMetaMask } from "../context-api/MetaMaskContext";
import { Link } from "react-router-dom";

const Nav = () => {
  const { account,contract, connectMetaMask, disconnectMetaMask } = useMetaMask();


  
  

  


  return (
    <nav className="flex items-center justify-between bg-[#393E46] px-4 py-2 text-white">
      <div className="scale-100 cursor-pointer rounded-2xl px-3 py-2 text-xl font-semibold text-white transition-all duration-200 hover:scale-110">
        <h2>Logo</h2>
      </div>
      <div className="flex items-center justify-between gap-16">
        <ul className="flex items-center justify-between gap-10">
          <li className="group flex  cursor-pointer flex-col">
            Home{" "}
            <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className="group flex  cursor-pointer flex-col">
            About{" "}
            <span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className="group flex  cursor-pointer flex-col">
            Contract{" "}
            <span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
          </li>
        </ul>
        <div className="flex items-center justify-between gap-5">
          {account  && contract ? (
            <>
              <button
                onClick={disconnectMetaMask}
                className="rounded-full bg-red-500 px-6 py-1 text-white transition-all duration-300 hover:scale-90"
              >
                Disconnect
              </button>
            </>
          ) : (
            <button
              onClick={connectMetaMask}
              className="rounded-full bg-sky-600 px-6 py-1 text-white transition-all duration-300 hover:scale-90"
            >
              Connect
            </button>
          )}
          <Link to="/login">
          <button className="rounded-full bg-sky-600 px-6 py-1 text-white transition-all duration-300 hover:scale-90">
            Log In
          </button>
          </Link>
          <Link to="/register">
            <button className="rounded-full bg-sky-600 px-6 py-1 text-white transition-all duration-300 hover:scale-90">
              Register
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
