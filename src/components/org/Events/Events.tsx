import React from "react";
import { Route, Routes } from "react-router-dom";
import EventData from "./components/EventsData";
import AddEvent from "./components/AddEvent";

const Main = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<EventData />} />
        <Route path="/add" element={<AddEvent />} />
      </Routes>
    </div>
  );
};

export default Main;
