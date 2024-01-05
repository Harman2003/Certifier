import React from "react";
import { Route, Routes } from "react-router-dom";
import EventData from "./components/EventsData";
import AddEvent from "./components/AddEvent";
import UpdateEvent from "./components/UpdateEvent";

const Main = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<EventData />} />
        <Route path="/add" element={<AddEvent />} />
        <Route path="/edit/:id" element={<UpdateEvent />} />
      </Routes>
    </div>
  );
};

export default Main;
