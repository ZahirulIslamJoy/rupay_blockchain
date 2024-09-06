import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMetaMask } from "../../context-api/MetaMaskContext";
import axios from "axios";

const Register = () => {
  const { account, contract } = useMetaMask();
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');


  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const createAccount = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;
    const id = e.target.password.value;
    const address=e.target.address.value;
    const bio = e.target.bio.value;
    const email = e.target.email.value;

    console.log(phone)

      console.log(phone)

    if (!contract) {
      alert("Contract not loaded");
      return;
    }

    try {
      await contract.methods.createAccount(name, phone, password).send({
        from: account,
      });
      const formData = new FormData();
      formData.append('image', image);
  
      const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
        params: {
          key: '9c888d75077660bbcc23f9773276a901',
        },
      });
  
      const imageUrl = response.data.data.url;
      setImageURL(imageUrl);
  
      try {
        const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
          params: {
            key: '9c888d75077660bbcc23f9773276a901',
          },
        });
        const imageUrl = response.data.data.url;
        setImageURL(imageUrl);
    
        const data = { name, phone, id, bio, address, account, imageURL: imageUrl, balance: 0, email };
  
        console.log(data)
        const res = await fetch('http://localhost:7000/users', {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        if(result.message){
          return alert(result.message)
        }
        if (result.upsertedCount > 0) {
          alert("Account created successfully!");
        }
      } catch (error) {
        console.error("Something went wrong:", error);
        alert("Something went wrong while creating the account");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      alert("Something went wrong while creating the account");
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
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id=""
                    className="bg-white border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter Your Email Address"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="id"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Id/StudentId
                  </label>
                  <input
                    type="number"
                    name="id"
                    id="id"
                    className="bg-white border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter Your Phone Number"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="id"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="id"
                    className="bg-white border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter Your Phone Number"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-black">
                    Upload Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    capture="camera"
                    className="bg-white border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    onChange={handleFileChange}
                  />
                </div>
                <div>
                <div>
                  <label
                    htmlFor="id"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                   Bio
                  </label>
                  <input
                    type="text"
                    name="bio"
                    id="id"
                    className="bg-white border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter Your Bio"
                    required
                  />
                </div>
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
