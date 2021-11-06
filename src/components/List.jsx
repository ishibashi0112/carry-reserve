import React, { useState } from "react";

const List = (props) => {
  const [a, setA] = useState("確認");

  const handleClick = (e) => {
    const buttonText = e.target.innerHTML;
    const buttonEffect = buttonText === "確認" ? setA("予定") : setA("追加");
  };

  return (
    <div className="w-full h-full border-2 border-gray-500  mt-16 ">
      <div className="w-full h-7 bg-gray-300 flex border-b-2 border-gray-500  justify-between  text-center">
        <button
          className="w-1/2 border-r-2 border-gray-500 font-bold  hover:bg-gray-50 hover:opacity-60"
          onClick={handleClick}
        >
          確認
        </button>
        <button
          className="w-1/2 font-bold hover:bg-gray-100  hover:opacity-60"
          onClick={handleClick}
        >
          追加
        </button>
      </div>
      {a === "予定" ? (
        <div>{props.event ? props.event.title : "予定です"}</div>
      ) : (
        <div>追加です</div>
      )}
    </div>
  );
};

export default List;
