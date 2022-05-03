import React from "react";
import EventForm from "src/components/EventFrom";
import PlanList from "src/components/PlanList";
import { headerState } from "src/stores/valtioState";
import { useSnapshot } from "valtio";

const List = () => {
  const headerSnap = useSnapshot(headerState);

  return (
    <div className="flex-1 h-[650px] border-[0.5px] border-gray-500 mr-2 my-2 rounded-md shadow-md z-10  ">
      {headerSnap.addEventForm ? <EventForm /> : <PlanList />}
    </div>
  );
};

export default List;
