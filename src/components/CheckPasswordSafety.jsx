import React, { useEffect, useRef, useState } from "react";
import { Progress } from "@mantine/core";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

export const CheckPasswordSafety = (props) => {
  const [strength, setStrength] = useState(0);
  const requirements = [
    { re: "", label: "Includes at least 6 characters" },
    { re: /[0-9]/, label: "Includes number" },
    { re: /[a-z]/, label: "Includes lowercase letter" },
    { re: /[A-Z]/, label: "Includes uppercase letter" },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
  ];

  const checkedRequirements = requirements.map((requirement, i) => {
    if (i === 0) {
      return (
        <li
          className={`${
            props.value.length > 5 ? "text-green-500" : "text-red-500"
          } flex text-sm`}
          key={requirement.label}
        >
          <p className="flex items-center mr-1">
            {props.value.length > 5 ? <AiOutlineCheck /> : <AiOutlineClose />}
          </p>
          <p>{requirement.label}</p>
        </li>
      );
    }
    return (
      <li
        className={`${
          requirement.re.test(props.value) ? "text-green-500" : "text-red-500"
        } flex p-[2px] text-sm`}
        key={requirement.label}
      >
        <p className="flex items-center mr-1">
          {requirement.re.test(props.value) ? (
            <AiOutlineCheck />
          ) : (
            <AiOutlineClose />
          )}
        </p>
        <p>{requirement.label}</p>
      </li>
    );
  });

  const increment = useRef(0);
  useEffect(() => {
    increment.current = 0;
    requirements.map((requirement, i) => {
      if (i === 0) {
        if (props.value.length > 5) {
          increment.current += 20;
        }
      } else {
        if (requirement.re.test(props.value)) {
          increment.current += 20;
        }
      }
    });
    setStrength(increment.current);
  }, [props.value]);

  return (
    <>
      <Progress
        size="sm"
        color={strength === 100 ? "teal" : strength > 50 ? "yellow" : "red"}
        value={strength}
      />
      <ul className="mt-2">{checkedRequirements}</ul>
    </>
  );
};
