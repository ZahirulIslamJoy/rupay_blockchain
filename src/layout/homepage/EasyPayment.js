import React from "react";
import bg from "../../assets/images/large-t-12-thailand-enhances-real-time-cross-border-qr-payment-1-32aad7a469401405e9e5098635.jpg";

const EasyPayment = () => {
  return (
    <div className="pt-16 bg-white">
      <div className="lg:flex items-center p-6 gap-6">
        <div className="flex-1">
          <img className="rounded-xl h-[420px]" src={bg} />
        </div>
        <div className="flex-1">
          <p className="text-5xl font-semibold mt-2">
            Our Roadmap To Reach Your Easy Payment Solution
          </p>
          <p className="font-medium text-[#666666] mt-4">
            Torquent phasellus sapien arcu inceptos porttitor ex odio montes
            vitae elit. Orci massa platea quisque duis sed tempus fusce
            himenaeos luctus. Mi mattis suscipit nascetur pretium convallis si
            viverra.
          </p>
          <hr className="mt-4"></hr>
          <div className="flex mt-4  justify-between">
            <p className="font-medium">Success Payment</p>
            <p className="text-[#3064c6]" >98%</p>
          </div>
          <div className="w-full mt-2 bg-gray-300 rounded-lg h-3">
            <div
              className="bg-[#3064c6] text-white text-sm font-bold h-full rounded-lg flex items-center justify-start pl-2"
              style={{ width: "98%" }}
            ></div>
          </div>
          <div className="flex mt-4  justify-between">
            <p className="font-medium">Positive Reviews</p>
            <p className="text-[#3064c6]" >95%</p>
          </div>
          <div className="w-full mt-2 bg-gray-300 rounded-lg h-3">
            <div
              className="bg-[#3064c6] text-white text-sm font-bold h-full rounded-lg flex items-center justify-start pl-2"
              style={{ width: "95%" }}
            ></div>
          </div>
          <div className="flex mt-4  justify-between">
            <p className="font-medium">Secure Transaction</p>
            <p className="text-[#3064c6]" >99%</p>
          </div>
          <div className="w-full mt-2 bg-gray-300 rounded-lg h-3">
            <div
              className="bg-[#3064c6] text-white text-sm font-bold h-full rounded-lg flex items-center justify-start pl-2"
              style={{ width: "99%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EasyPayment;
