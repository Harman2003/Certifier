import React from "react";
import Signin from "@/components/auth/Signin";
import Signup from "@/components/auth/Signup";
import { Routes, Route } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="h-full grid grid-rows-[80px,150px,1fr,80px]">
      <div className="h-full bg-blue-gradient "></div>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
      </Routes>
      <div className="h-full text-center md:px-[420px] py-2 text-gray-500 overflow-hidden text-sm border-t-[1px]">
        <div>
          Certify empowers organizations to create secure certificates using
          blockchain technology, while enabling users to maintain a digital
          locker for securely storing their certificates. Our blockchain-powered
          platform allows anyone to validate certificates at any time.
        </div>
        <div>Certify - © Copyright 2023</div>
      </div>
    </div>
  );
};

export default HomePage;
