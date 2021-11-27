import React, { useState } from "react";
import SvgNumber from "src/components/SvgNumber";

const StepFormBar = (props) => {
  let number = 0;
  return (
    <ul className="flex justify-center mt-4 text-lg">
      {props.steps.map((step) => {
        number = number + 1;
        return (
          <li
            key={step}
            className={
              props.currentForm === step ? "flex " : "flex opacity-50 "
            }
          >
            {/* {props.currentForm === step ? <p className></p> : } */}
            <SvgNumber number={number} color={"gray"} />
            <p className="ml-1">{step}</p>
            {!(props.steps.length === number) ? (
              <hr className="w-8 my-auto mx-3" />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
};
export default StepFormBar;
