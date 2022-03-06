import { deleteDoc, doc } from "@firebase/firestore";
import React, { useCallback, useState } from "react";
import EventForm from "src/components/EventFrom";
import { db } from "src/firebase/firebase";
import PlanList from "src/components/PlanList";
import { eventsState, headerState } from "src/stores/valtioState";
import { useSnapshot } from "valtio";

const List = () => {
  const headerSnap = useSnapshot(headerState);

  return (
    <div className="flex-1 h-[650px] border-[0.5px] border-gray-500 ">
      {headerSnap.addEventForm ? <EventForm /> : <PlanList />}
    </div>
  );
};

export default List;
