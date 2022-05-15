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
    <div className="flex-1 max-w-[800px] h-[650px] my-2 mr-2  rounded-md shadow-md bg-white xs:z-10">
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
