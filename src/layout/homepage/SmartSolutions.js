import React from "react";
import EasyPayment from "./EasyPayment";

const SmartSolutions = () => {
  return (
    <div className="mt-16 pb-16 p-6 bg-[#edf4f9]">
      <div className="flex pt-12 flex-col items-center">
        <h1 className="text-4xl font-semibold">
          Smart Solution for Your Payment
        </h1>
        <p className="font-medium text-[#666666] mt-4">
          Et dignissim nostra per ac scelerisque nullam fermentum.
        </p>
      </div>
      <div>
        <div className="grid  grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-8">
            <div className="flex justify-between items-center bg-[#edf4f9] p-4 rounded-md">
              <h1 className="text-xl font-semibold">Payment Methods</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  color="blue"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                />
              </svg>
            </div>
            <p className="mt-4 text-[#666666] font-medium ">
              Consectetur sem proin mollis mauris ornare facilisi si netus.
              Egestas iaculis erat dui ornare hendrerit conubia convallis dolor
              ut sociosqu quis. Urna platea ligula leo auctor morbi libero
              interdum hendrerit.
            </p>
            <button class="bg-custom-gradient   hover:bg-custom-gradient-hover  text-white font-bold w-full mt-4 py-2 px-4 rounded">
              Learn More
            </button>
          </div>
          <div className="bg-white p-8">
            <div className="flex justify-between items-center bg-[#edf4f9] p-4 rounded-md">
              <h1 className="text-xl font-semibold">Report And Anaytics</h1>
              <svg
                color="blue"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                />
              </svg>
            </div>
            <p className="mt-4 text-[#666666] font-medium ">
              Consectetur sem proin mollis mauris ornare facilisi si netus.
              Egestas iaculis erat dui ornare hendrerit conubia convallis dolor
              ut sociosqu quis. Urna platea ligula leo auctor morbi libero
              interdum hendrerit.
            </p>
            <button class="bg-custom-gradient text-white font-bold w-full mt-4 py-2 px-4 rounded">
              Learn More
            </button>
          </div>
          <div className="bg-white p-8">
            <div className="flex justify-between items-center bg-[#edf4f9] p-4 rounded-md">
              <h1 className="text-xl font-semibold">Secure Payments</h1>
              <svg
              color="blue"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
            </div>
            <p className="mt-4 text-[#666666] font-medium ">
              Consectetur sem proin mollis mauris ornare facilisi si netus.
              Egestas iaculis erat dui ornare hendrerit conubia convallis dolor
              ut sociosqu quis. Urna platea ligula leo auctor morbi libero
              interdum hendrerit.
            </p>
            <button class="bg-custom-gradient text-white font-bold w-full mt-4 py-2 px-4 rounded">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartSolutions;
