import React from "react";
import bg from "../../assets/images/payment.jpg";

const Enjoy = () => {
  return (
    <div className="mt-10">
      <div
        style={{
          backgroundImage: `linear-gradient(155deg, rgba(48, 100, 198, 0.7) 0%, rgba(31, 64, 127, 0.7) 100%), url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="bg-no-repeat bg-center h-[500px]"
      >
        <div className="w-[40%] flex flex-col justify-center items-start h-full ml-8 gap-8">
          <p className="text-white text-5xl font-semibold ">
            Enjoy the Convenience of Online Payments
          </p>
          <p className="text-gray-200 font-medium ">
            Non rutrum enim class nibh platea ad. Integer velit arcu leo iaculis ligula bibendum penatibus. Aliquet morbi dui sed nulla lorem elit sociosqu quisque proin mus purus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Enjoy;
