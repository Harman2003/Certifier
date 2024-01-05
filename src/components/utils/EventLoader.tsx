import React from "react";
import Skeleton from "react-loading-skeleton";

const EventLoader = () => {
  return (
    <div className="w-[348px] bg-white shadow-md shadow-black/5 rounded-[20px]">
      <Skeleton className="rounded-t-[20px] h-[190px] p-2" />
      <div className="flex flex-col p-3 h-[160px]">
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
      </div>
    </div>
  );
};

export default EventLoader;
