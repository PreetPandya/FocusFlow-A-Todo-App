import React from "react";

const Headers = () => {
  return (
    <div className="mt-16 mb-8 sm:m-10  grid grid-cols-1 place-items-center">
      <div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[100px] font-bold text-center">
          FocusFlow
        </h1>
      </div>

      <div>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl opacity-70 tracking-wide text-center mt-2">
          Empowering Your Productivity Journey
        </p>
      </div>
    </div>
  );
};

export default Headers;
