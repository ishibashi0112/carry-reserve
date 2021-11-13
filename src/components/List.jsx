import { deleteDoc, doc } from "@firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import EventForm from "src/components/EventFrom";
import { db } from "src/firebase/firebase";

const List = (props) => {
  const [view, setView] = useState("確認");
  const eventId = props.selectEvent ? props.selectEvent.id : null;

  const handleClick = useCallback((e) => {
    const buttonText = e.target.innerHTML;
    if (buttonText === "確認") {
      setView("確認");
      return;
    }
    setView("追加");
  }, []);

  const handleClickDelete = async () => {
    await deleteDoc(doc(db, "events", eventId));
  };

  return (
    <div className="w-full h-full border-2 border-gray-500  mt-16 ">
      <div className="w-full h-7 bg-gray-300 flex border-b-2 border-gray-500  justify-between  text-center">
        <button
          className="w-1/2 border-r-2 border-gray-500 font-bold  hover:bg-gray-50 hover:opacity-60 focus:bg-blue-200"
          onClick={handleClick}
        >
          確認
        </button>
        <button
          className="w-1/2 font-bold hover:bg-gray-100  hover:opacity-60 focus:bg-blue-200"
          onClick={handleClick}
        >
          追加
        </button>
      </div>
      {view === "確認" ? (
        <div>
          {props.selectEvent ? (
            <div>
              <p>{props.selectEvent.title}</p>
              <p>{props.selectEvent.id}</p>
              <button className="block" onClick={handleClickDelete}>
                削除
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <EventForm />
      )}
    </div>
  );
};

export default List;
