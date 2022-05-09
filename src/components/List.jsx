import React from "react";
import { EventForm } from "src/components/EventFrom";
import { PlanList } from "src/components/PlanList";
import { ProgressList } from "src/components/ProgressList";
import { listState, sideBarState } from "src/stores/valtioState";
import { useSnapshot } from "valtio";

export const List = () => {
  const sideBarSnap = useSnapshot(sideBarState);
  const ListSnap = useSnapshot(listState);

  return (
    <div className="flex-1 h-[650px] mr-2 my-2 rounded-md shadow-md z-10 bg-white ">
      {sideBarSnap.isEventFormOpened ? (
        <EventForm />
      ) : ListSnap.isProgressOpened ? (
        <ProgressList />
      ) : (
        <PlanList />
      )}
    </div>
  );
};
