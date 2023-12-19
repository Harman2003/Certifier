import React from "react";
import Signin from "@/components/auth/Signin";
import Signup from "@/components/auth/Signup";
import { Routes, Route } from "react-router-dom";
import {logo} from "@/assets"
const HomePage = () => {
  return (
    <div className="h-full grid grid-rows-[80px,130px,1fr,80px]">
      <div className="h-full bg-black-gradient flex justify-center items-center">
        <img src={logo} alt="certify" className="w-[164px]" />
      </div>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
      </Routes>
      <div className="h-full text-center md:px-[420px] py-2 text-gray-500 overflow-hidden text-sm border-t-[1px]">
        <div>
          Certify empowers organizations to create and validate secure
          certificates using blockchain technology, while enabling users to
          maintain a digital locker for securely storing their certificates.
        </div>
        <div>Certify - © Copyright 2023</div>
      </div>
    </div>
  );
};

export default HomePage;
