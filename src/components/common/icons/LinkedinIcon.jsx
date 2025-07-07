"use client";
import React, { useState } from "react";

const LinkedinIcon = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <svg
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 537.3 539"
      width="45"
      height="45"
      className="social-icon"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <g>
        <path
          fill="none"
          stroke={isHovered ? "#e5431f" : "#2E272D"}
          strokeWidth="11"
          d="M268.6,502.9L268.6,502.9c-128.9,0-233.4-104.6-233.3-233.5l0,0C35.3,140.5,139.8,36,268.7,36.1l0,0
		c128.9,0,233.4,104.6,233.3,233.5l0,0C502,398.5,397.5,503,268.6,502.9z"
        />
        <g>
          <rect
            x="168.3"
            y="233.9"
            fill={isHovered ? "#e5431f" : "#2E272D"}
            width="43.4"
            height="138.4"
          />
          <path
            fill={isHovered ? "#e5431f" : "#2E272D"}
            d="M329.1,230.9c-1.6-0.2-3.3-0.3-5-0.4c-24.3-1-38,13.4-42.8,19.6c-1.3,1.7-1.9,2.7-1.9,2.7v-18.5h-41.5
			l-0.1,138.4h41.5h1.9c0-14.1,0-28.1,0-42.2c0-7.6,0-15.2,0-22.8c0-9.4-0.7-19.4,4-28c4-7.2,11.2-10.8,19.3-10.8
			c24,0,24.5,21.7,24.5,23.8c0,0.1,0,0.2,0,0.2v80.5h43.4v-90.3C372.5,252.2,356.8,233.9,329.1,230.9z"
          />
          <ellipse
            fill={isHovered ? "#e5431f" : "#2E272D"}
            cx="190"
            cy="190.8"
            rx="25.2"
            ry="25.2"
          />
        </g>
      </g>
    </svg>
  );
};
export default LinkedinIcon;
