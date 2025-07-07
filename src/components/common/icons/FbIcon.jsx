"use client";
import React, { useState } from "react";

const FbIcon = ({ hover }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <svg
      version="1.1"
      id="_x2014_ÎÓÈ_x5F_1"
      x="0px"
      y="0px"
      viewBox="0 0 537.3 539"
      width="45px"
      height="45px"
      className="social-icon"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <g>
        <path
          fill="none"
          stroke={isHovered ? "#e5431f" : "#2E272D"}
          strokeWidth="11"
          d="M268.6,502.9L268.6,502.9c-128.9,0-233.4-104.6-233.4-233.5v0C35.3,140.5,139.8,36,268.7,36.1h0
   c128.9,0,233.4,104.6,233.4,233.5v0C502,398.5,397.5,503,268.6,502.9z"
        />
        <g>
          <path
            d="M286.8,291.5l0,113.2l-52.1,0l0-113.2l-43.2,0l0-45.9l43.2,0l0-16.8c0-62,25.9-94.6,80.7-94.6c16.8,0,21,2.7,30.2,4.9
     l0,45.4c-10.3-1.8-13.2-2.8-23.9-2.8c-12.7,0-19.5,3.6-25.7,10.7c-6.2,7.1-9.3,19.4-9.3,37l0,16.2l58.9,0l-15.8,45.9L286.8,291.5z
     "
          />
        </g>
      </g>
    </svg>
  );
};
export default FbIcon;
