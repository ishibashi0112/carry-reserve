import { deleteDoc, doc } from "@firebase/firestore";
import React, { useCallback, useState } from "react";
import EventForm from "src/components/EventFrom";
import { db } from "src/firebase/firebase";
import PlanList from "src/components/PlanList";
import { eventsState } from "src/stores/valtioState";
import { useSnapshot } from "valtio";

const List = () => {
  const eventsSnap = useSnapshot(eventsState);
  const [view, setView] = useState("予定");
  const eventId = eventsSnap.selectEvent ? eventsSnap.selectEvent.id : null;
  console.log(eventsState.dateEvents);
  const handleClickTab = useCallback((e) => {
    const buttonText = e.target.innerHTML;

    switch (buttonText) {
      case "予定":
        setView("予定");
        break;
      case "追加":
        setView("追加");
        break;
    }
  }, []);

  const handleClickDelete = useCallback(async () => {
    await deleteDoc(doc(db, "events", eventId));
  }, [eventId]);

  return (
    <div className="flex-1 h-[650px] border-[0.5px] border-gray-500 ">
      <div className="w-full h-7 bg-gray-200 flex justify-between  text-center ">
        <button
          className={
            view === "予定"
              ? "w-1/2 bg-white  font-bold underline "
              : "w-1/2 border-gray-500 border-b-[0.5px] border-r-[0.5px]  border-l-[0.5px] font-bold text-gray-400  hover:bg-gray-50 hover:opacity-80 active:opacity-40"
          }
          onClick={handleClickTab}
        >
          予定
        </button>
        <button
          className={
            view === "追加"
              ? "w-1/2 bg-white  font-bold underline "
              : "w-1/2 border-gray-500 border-b-[0.5px] border-l-[0.5px] font-bold text-gray-400  hover:bg-gray-50 hover:opacity-80 active:opacity-40 "
          }
          onClick={handleClickTab}
        >
          追加
        </button>
      </div>

      {view === "予定" ? <PlanList /> : <EventForm />}
    </div>
  );
};

export default List;
