import { useEffect, useState } from "react";
import { useMetaMask } from "../../context-api/MetaMaskContext";
import Loader from "../../loader/Loader";
import axios from "axios";

const Profile = () => {
  const { web3, account, contract } = useMetaMask();
  const [userDetails, setUserDetails] = useState([]); // Initialize as an empty array
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const username = userDetails[0];
  const phone = userDetails[1];

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
      setUserDetails(userInfo); // Set the userDetails array
      setBalance(etherBalance);
      setLoading(false);
    } catch (error) {
      const errorMessage = error.message || "An unknown error occurred";
      alert(`Error: ${errorMessage}`);
      setLoading(false);
      console.error("Error details:", error);
    }
  };

  // Fetch user data from the backend using the phone number
  const fetchUserData = async () => {
    if (!phone) return; // Ensure phone exists before making API call
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:7000/users/${phone}`);
      if (!response.ok) {
        throw new Error("Error in getting phone number");
      }
      const data = await response.json();
      setUserData(data);
      setLoading(false);
    } catch (err) {
      alert(err.message);
      setLoading(false);
    }
  };

  const handleFileChange = async (event) => {
    console.log("File input changed");
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    } 
    const formData = new FormData();
    formData.append("image", file);
      const response1 = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          params: {
            key: "9c888d75077660bbcc23f9773276a901",
          },
        }
      );
      const imageUrl = response1.data.data.url;
      setImageURL(imageUrl)
}

  const handleUpdate = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const id = e.target.id.value;
    const address = e.target.address.value;
    const bio = e.target.bio.value;
    let imageURLs = userData?.imageURL;
    if (imageURL) {
      console.log(imageURL);
      imageURLs = imageURL;
    }
    const data = { name, id, address, bio, imageURL: imageURLs };
    console.log(data);
    const response = await fetch(
      `http://localhost:7000/users/${userData?.phone}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Send the updated user data
      }
    );
    if (response.ok) {
      const result = await response.json();
      fetchUserData();
      alert("Profile updated successfully!");
      console.log(result);
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update profile");
    }
  };

  useEffect(() => {
    getBalance();
  }, [account, contract]);

  useEffect(() => {
    if (phone) {
      fetchUserData(); // Fetch user data only when phone is updated
    }
  }, [phone]);

  console.log(userData);

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
                src={userData?.imageURL}
                alt="User Avatar"
              />
              <div className="absolute bottom-0 left-0 right-0 h-12 flex justify-center items-center">
                <label className="text-white cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    capture="camera"
                    className="bg-gray-400 border border-gray-300 text-black sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    onChange={handleFileChange}
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
                  src={userData?.imageURL}
                />
                <span className="absolute bottom-3 right-0 h-5 w-5 rounded-full border-[3px] border-white bg-green-500 dark:border-[#18181B]"></span>
                <span className="absolute bottom-3 right-0 h-2 w-2 animate-ping rounded-full bg-green-500"></span>
              </div>
              <div className="space-y-1 text-black">
                <h1 className="font-semibold text-black">{userData?.name}</h1>
                <p className="font-semibold text-black">Balance:{balance}</p>
              </div>
            </div>
          </div>
          <form onSubmit={handleUpdate}>
            <div className="flex justify-between gap-8">
              <div className="flex-1">
                <div className="flex flex-col">
                  <label className="font-semibold">Name</label>
                  <input
                    className="rounded-lg border mt-1  border-x-2 border-y-2 border-[#a2c3e2] bg-transparent px-4 py-2 text-black font-medium focus:outline-none"
                    type="text"
                    name="name"
                    defaultValue={userData?.name}
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label className="font-semibold">Address</label>
                  <input
                    className="rounded-lg border mt-1  border-x-2 border-y-2  border-[#a2c3e2] bg-transparent px-4 py-2 text-black font-medium focus:outline-none"
                    type="text"
                    name="address"
                    defaultValue={userData?.address}
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label className=" font-semibold">Nid/StudentId</label>
                  <input
                    className="rounded-lg border mt-1  border-x-2 border-y-2  border-[#a2c3e2] bg-transparent px-4 py-2 text-black font-medium focus:outline-none"
                    type="text"
                    name="id"
                    defaultValue={userData?.id}
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col">
                  <label className="font-semibold">Bio</label>
                  <textarea
                    name="bio"
                    defaultValue={userData?.bio}
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
