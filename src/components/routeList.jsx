import React, { useState } from "react";
import { useSnapshot } from "valtio";
import { eventsState, mapState, routeListState } from "src/stores/valtioState";
import DndArea from "src/components/DndArea";

const RouteList = () => {
  const eventsSnap = useSnapshot(eventsState);
  const routeListSnap = useSnapshot(routeListState);
    ? eventsSnap.dateEvents[0].isConfirm
    ? eventsSnap.dateEvents[0].isConfirm

  return (
            <p>内容</p>
            <p>予約者</p>
          </li>
          {eventsSnap.dateEvents?.map((event) => (
            <li className="flex justify-around border-b" key={event.id}>
      {isConfirm ? (
        "確定済み"
      ) : routeListSnap.switching === "編集" ? (
        <button className="" onClick={routeListState.handleClickButton}>
          {routeListSnap.switching}
              <p>{event.items}</p>
      ) : null}

      {routeListSnap.switching === "編集" ? (
            </li>
          ))}
        </ul>
      ) : (
        <DndArea />
      )}
    </div>
  );
};
              <p> {event.destination}</p>
              <p>{event.time_zone}</p>
              <p>{event.items}</p>
              <p>{event.description}</p>
        <DndArea />
