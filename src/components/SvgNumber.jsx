import React from "react";

const SvgNumber = (props) => {
  return (
    <svg className="my-auto" width="20" height="20" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="10" fill={props.color} />
      <text x="10" y="14" textAnchor="middle" fontSize="13" fill="white">
        {props.number}
      </text>
    </svg>
  );
};
export default SvgNumber;
