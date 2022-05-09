import React from "react";
import { useSnapshot } from "valtio";
import { eventsState, mapState, listState } from "src/stores/valtioState";
import { EventList } from "src/components/EventList";
import Map from "src/components/Map";
import { DndArea } from "src/components/DndArea";
import { RouteList } from "src/components/RouteList";
import { FloatingTooltip, Overlay } from "@mantine/core";

export const PlanList = () => {
  const eventsSnap = useSnapshot(eventsState);
  const dateEventsLength = eventsSnap.dateEvents.length;
  const listSnap = useSnapshot(listState);
  const mapSnap = useSnapshot(mapState);

  const isConfirm = eventsSnap.dateEvents[0]
    ? eventsSnap.dateEvents[0].isConfirm
    : null;

  if (dateEventsLength === 0) {
    return (
      <div className="flex h-full justify-center items-center">
        当日の予定はありません
      </div>
    );
  }

  if (isConfirm) {
    return (
      <div className="w-full h-full bg-white rounded-md">
        <div className={`${mapSnap.show ? "flex" : null}`}>
          <Map />
          <RouteList />
        </div>
        <EventList />
      </div>
    );
  }

  if (listSnap.editMode) {
    return (
      <div className="w-full h-full rounded-md bg-white">
        <div className="p-2">
          <div className={`${mapSnap.show ? "flex" : null} `}>
            <Map />
            <RouteList />
          </div>
          <DndArea />

          <FloatingTooltip
            className="absolute top-0 left-0 z-[-1]"
            label="編集中は他の操作ができません"
          >
            <Overlay
              className="w-screen  h-screen absolute top-0 left-0"
              opacity={0.6}
              color="#000"
            />
          </FloatingTooltip>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white rounded-md">
      <EventList />
    </div>
  );
};
