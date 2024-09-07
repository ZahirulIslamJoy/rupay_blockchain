import React, { useState } from "react";

const TestFileUpload = () => {
  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {
    console.log("File input changed");
    const file = event.target.files[0];
    console.log("Selected file:", file);
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div>
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
  
    </div>
  );
};

export default TestFileUpload;
