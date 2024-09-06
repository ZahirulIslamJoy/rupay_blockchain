import { Link } from 'react-router-dom';
import { useMetaMask } from '../../context-api/MetaMaskContext';
import { useAuth } from '../../context-api/AuthContext';

const Login = () => {
  const { account } = useMetaMask();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const phone = e.target.phone.value;
    const password = e.target.password.value;

    try {
      await login(phone, password);
    } catch (error) {
      alert("Error logging in: " + error.message);
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#edf4f9]">
      <section className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full">
            <div className="p-6 space-y-4 md:space-y-6">
              <h1 className="text-xl font-bold text-black md:text-2xl">
                Login Into Your Account
              </h1>
              <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Account No
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-white border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    defaultValue={account}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Phone No
                  </label>
                  <input
                    type="phone"
                    name="phone"
                    id="phone"
                    className="bg-white border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter Your Phone No"
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
                  Login
                </button>
                <p className="text-sm font-light text-gray-500">
                  Don’t have an account yet?
                  <Link
                    to="/register"
                    className="font-medium text-primary-600 hover:underline ml-1"
                  >
                    Sign Up
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

export default Login;
