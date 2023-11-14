import React from "react";
import { Route, Routes } from "react-router-dom";
import CertficateData from "./components/CertificateData";
import AddCertificate from "./components/AddCertificate";

const Main = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CertficateData />} />
        <Route path="/add" element={<AddCertificate />} />
      </Routes>
    </div>
  );
};

export default Main;
