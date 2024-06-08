import React from "react";
import { Link } from "react-router-dom";
import { useMetaMask } from "../../context-api/MetaMaskContext";

const Register = () => {
  const { account, contract } = useMetaMask();

  const createAccount = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;

    if (!contract) {
      alert("Contract not loaded");
      return;
    }

    try {
      await contract.methods.createAccount(name, phone, password).send({
        from: account,
      });
      alert("Account created successfully!");
    } catch (error) {
      console.error("Error creating account:", error);
      alert("Error creating account");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <section className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full">
            <div className="p-6 space-y-4 md:space-y-6">
              <h1 className="text-xl font-bold text-black md:text-2xl">
                Create an account
              </h1>
              <form onSubmit={createAccount} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-white border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter Your Name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Phone
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    className="bg-white border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter Your Phone Number"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-white border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-sky-600 px-6 py-2 text-white font-medium transition-all duration-300 hover:bg-sky-700"
                >
                  Register
                </button>
                <p className="text-sm font-light text-gray-500">
                  Already have an account?
                  <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:underline ml-1"
                  >
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
