import React from "react";
import { Route, Routes } from "react-router-dom";
import Events from "./components/EventsData";
import AddEvent from "./components/AddEvent";

const Main = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/add" element={<AddEvent />} />
      </Routes>
    </div>
  );
};

export default Main;
