import React from "react";

const ProfilePic = ({ first, last }:{first:string, last:string}) => {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 460 460"
      style={{
        width: "460px",
        height: "460px",
        backgroundColor: "#3498db", // Blue background color
      }}
    >
      <text
        x="50%"
        y="50%"
        style={{
          fontFamily: "Arial",
          fontSize: "48px",
          fontWeight: "bold",
          fill: "#ffffff", // White text color
          dominantBaseline: "middle",
          textAnchor: "middle",
        }}
      >
        {first}
        {last}
      </text>
    </svg>
  );
};

export default ProfilePic;
