import React from "react";
import Signin from "@/components/auth/Signin";
import Signup from "@/components/auth/Signup";
import { Routes, Route } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="h-full grid grid-rows-[80px,150px,1fr,80px]">
      <div className="h-full bg-blue-gradient flex justify-center items-center">
        <div className="text-white text-4xl flex gap-3 items-center justify-center">
          <svg
            fill="none"
            height="200px"
            viewBox="0 0 24 24"
            width="200px"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[100%] w-[100%] md:h-[15%] md:w-[15%]"
          >
            <path
              opacity="0.16"
              d="M7.242 11.083c.449-1.674 2.17-3.394 3.843-3.843l10.434-2.796c1.673-.448 2.666.545 2.218 2.218L20.94 17.096c-.449 1.674-2.17 3.394-3.843 3.843L6.664 23.735c-1.673.448-2.666-.545-2.218-2.218l2.796-10.434Z"
              fill="#edb76f"
            ></path>
            <path
              d="M3.06 6.9c.448-1.674 2.168-3.394 3.842-3.843L17.336.261c1.673-.448 2.667.545 2.218 2.218l-2.796 10.434c-.449 1.674-2.169 3.394-3.843 3.843L2.481 19.552C.808 20-.185 19.007.263 17.334L3.06 6.9Z"
              fill="#edb76f"
            ></path>
          </svg>
          <div className="tracking-wider font-Poppins italic font-semibold">
            CERTIFY
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
      </Routes>
      <div className="h-full text-center md:px-[420px] py-2 text-gray-500 overflow-hidden text-sm border-t-[1px]">
        <div>
          Certify empowers organizations to create and validate secure certificates using
          blockchain technology, while enabling users to maintain a digital
          locker for securely storing their certificates.
        </div>
        <div>Certify - © Copyright 2023</div>
      </div>
    </div>
  );
};

export default HomePage;
