import { useEffect, useState } from "react";
import { useMetaMask } from "../../context-api/MetaMaskContext";
import Loader from "../../loader/Loader";

const Profile = () => {
  const { web3, account, contract } = useMetaMask();
  const [userDetails, setuserDetails] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const username = userDetails[0];

  const getBalance = async () => {
    if (!web3 || !account || !contract) {
      alert("Please connect MetaMask.");
      return;
    }
    try {
      setLoading(true);
      const result = await contract.methods
        .getBalance()
        .call({ from: account });
      const etherBalance = web3.utils.fromWei(result, "ether");

      const userInfo = await contract.methods.Details().call({ from: account });
      setuserDetails(userInfo);
      console.log(userInfo);

      setBalance(etherBalance);
      setLoading(false);
    } catch (error) {
      const errorMessage = error.message || "An unknown error occurred";
      alert(`Error: ${errorMessage}`);
      setLoading(false);
      console.error("Error details:", error);
    }
  };

  useEffect(() => {
    getBalance();
  }, [account, contract]);

  return (
    <div>
      {loading ? (
        <div>
          <Loader></Loader>
        </div>
      ) : (
        <div className="">
          <div className="flex justify-between items-center">
            <div className="relative w-48 h-48 mb-4">
              <img
                className="w-full h-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReP6JHDsdxRiXFAYe4GHM-wfUCd7EZC_-3TQ&s"
                alt="User Avatar"
              />
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-black bg-opacity-50 flex justify-center items-center">
                <label className="text-white cursor-pointer">
                  <span>Upload</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    // onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
            <div className="flex max-w-[350px] w-[192px] h-[192px] flex-col items-center justify-center space-y-4 rounded-xl bg-gray-400 p-8 shadow-lg ">
              <div className="group relative">
                <img
                  width={110}
                  height={110}
                  className="h-[60px] w-[60px] rounded-full bg-slate-500 object-cover"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReP6JHDsdxRiXFAYe4GHM-wfUCd7EZC_-3TQ&s"
                  alt="card navigate ui"
                />
                <span className="absolute bottom-3 right-0 h-5 w-5 rounded-full border-[3px] border-white bg-green-500 dark:border-[#18181B]"></span>
                <span className="absolute bottom-3 right-0 h-2 w-2 animate-ping rounded-full bg-green-500"></span>
              </div>
              <div className="space-y-1 text-black">
                <h1 className="font-semibold text-black">{username}</h1>
                <p className="font-semibold text-black">Balance:{balance}</p>
              </div>
            </div>
          </div>
          <form>
            <div className="flex justify-between gap-8">
              <div className="flex-1">
                <div className="flex flex-col">
                  <label className="font-semibold">Name</label>
                  <input
                    className="rounded-lg border mt-1  border-x-2 border-y-2 border-[#a2c3e2] bg-transparent px-4 py-2 text-black font-medium focus:outline-none"
                    type="text"
                    defaultValue={username}
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label className="font-semibold">Address</label>
                  <input
                    className="rounded-lg border mt-1  border-x-2 border-y-2  border-[#a2c3e2] bg-transparent px-4 py-2 text-black font-medium focus:outline-none"
                    type="text"
                    defaultValue={username}
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label className=" font-semibold">Nid/StudentId</label>
                  <input
                    className="rounded-lg border mt-1  border-x-2 border-y-2  border-[#a2c3e2] bg-transparent px-4 py-2 text-black font-medium focus:outline-none"
                    type="text"
                    defaultValue={username}
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col">
                  <label className="font-semibold">Bio</label>
                  <textarea
                    defaultValue={username}
                    className="w-96 h-48 mt-4 p-4 font-medium bg-transparent border-2 border-dotted border-blue-400 rounded-lg outline-none resize-none  transition duration-300"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                class="bg-custom-gradient text-white font-bold mt-4 py-2 px-6 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
