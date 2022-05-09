import React from "react";
import { useSnapshot } from "valtio";
import { eventsState } from "src/stores/valtioState";
import Map from "src/components/Map";
import { ProgressForm } from "src/components/ProgressForm";

export const ProgressList = () => {
  const eventsSnap = useSnapshot(eventsState);
  const isConfirm = eventsSnap.dateEvents[0]
    ? eventsSnap.dateEvents[0].isConfirm
    : null;

  if (isConfirm) {
    return (
      <div className="w-full h-full bg-white rounded-md">
        <Map />
        <ProgressForm />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-white rounded-md">
      当日の予定がないか、予定が確定されておりません。
    </div>
  );
};
