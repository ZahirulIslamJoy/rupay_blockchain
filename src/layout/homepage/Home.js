import React from "react";

const Home = () => {
  return (
    <div>
      {/* Banner Section Started */}
      <div className="bg-[#1F407F] rounded-md mt-12">
        <div className="flex justify-center items-center p-8">
          <div>
            <h1 className="text-[#F9A61A] mt-10 text-4xl">Payment Gateway</h1>
            <h1 className="text-white text-8xl mt-6">Make Life Simpler With RuPay</h1>
            <p className="text-white text-lg mt-6">
              Nibh odio si tristique suscipit turpis. Mauris enim ridiculus
              vehicula efficitur venenatis porttitor aliquet urna. Aenean
              ridiculus bibendum turpis porta litora consectetuer nulla tortor.
            </p>
          
          <div>
          <button className="bg-[#3c8eb4] mt-6 flex items-center justify-center text-white font-bold text-lg overflow-hidden group"><span className="inline-block bg-sky-900  px-[10px] py-4 after:content-['U'] after:absolute after:inset-0 relative after:flex after:justify-center after:items-center after:-translate-y-full group-hover:translate-y-full duration-500">E</span><span className="inline-block bg-sky-900 px-[10px] py-4 after:content-['N'] after:bg-sky-400 after:absolute after:inset-0 relative after:flex after:justify-center after:items-center after:translate-y-full group-hover:-translate-y-full duration-500">X</span><span className="inline-block bg-sky-900 px-[10px] py-4 after:content-['I'] after:absolute after:inset-0 relative after:flex after:justify-center after:items-center after:-translate-y-full group-hover:translate-y-full duration-500">P</span><span className="inline-block bg-sky-900 px-[10px] py-4 after:content-['F'] after:bg-sky-400 after:absolute after:inset-0 relative after:flex after:justify-center after:items-center after:translate-y-full group-hover:-translate-y-full duration-500">L</span><span className="inline-block bg-sky-900 px-[10px] py-4 after:content-['Y'] after:absolute after:inset-0 relative after:flex after:justify-center after:items-center after:-translate-y-full group-hover:translate-y-full duration-500">O</span><span className="inline-block bg-sky-900 px-[10px] py-4 after:content-['U'] after:bg-sky-400 after:absolute after:inset-0 relative after:flex after:justify-center after:items-center after:translate-y-full group-hover:-translate-y-full duration-500">R</span><span className="inline-block bg-sky-900 px-[10px] py-4 after:content-['I'] after:absolute after:inset-0 relative after:flex after:justify-center after:items-center after:-translate-y-full group-hover:translate-y-full duration-500">E</span></button>
          </div>
          </div>
          <div>
            <img
              alt="Banner Img"
              src="https://tebewebe.online/kenepay/wp-content/uploads/sites/89/2024/02/horizontal-shot-of-optimisitc-joyful-couple-chat-w-2023-11-27-05-19-16-utc.png"
            ></img>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Home;
