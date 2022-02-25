import React from "react";
import { useSnapshot } from "valtio";
import { eventsState, mapState, routeListState } from "src/stores/valtioState";
import DndArea from "src/components/DndArea";

const RouteList = () => {
  const eventsSnap = useSnapshot(eventsState);
  const routeListSnap = useSnapshot(routeListState);
  const isConfirm = eventsSnap.dateEvents[0]
    ? eventsSnap.dateEvents[0].isConfirm
    : null;

  return (
    <div>
      <p>ルート情報</p>
      {/* <button onClick={mapState.clickEventOptimize}>Optimizeボタン</button> */}

      {isConfirm ? (
        "確定済み"
      ) : routeListSnap.switching === "編集" ? (
        <button className="" onClick={routeListState.handleClickButton}>
          {routeListSnap.switching}
        </button>
      ) : null}

      {routeListSnap.switching === "編集" ? (
        <ul className="dropEvents">
          <li className="flex justify-around border-b text-gray-400 text-sm font-bold">
            <p>行き先</p>
            <p>時間帯</p>
            <p>内容</p>
            <p>予約者</p>
          </li>
          {eventsSnap.dateEvents?.map((event) => (
            <li className="flex justify-around border-b" key={event.id}>
              <p> {event.destination}</p>
              <p>{event.time_zone}</p>
              <p>{event.items}</p>
              <p>{event.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <DndArea />
      )}
    </div>
  );
};

export default RouteList;
