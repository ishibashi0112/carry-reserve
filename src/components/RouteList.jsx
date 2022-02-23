import React, { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { eventsState, mapState } from "src/stores/valtioState";
import DndZone from "src/components/DndZone";

const RouteList = () => {
  const eventsSnap = useSnapshot(eventsState);
  const [eventsArray, setEventsArray] = useState(eventsSnap.dateEvents);
  const [switching, setSwitching] = useState("ルートを確定する");
  const isConfirm = eventsSnap.dateEvents[0]
    ? eventsSnap.dateEvents[0].extendedProps.isConfirm
    : null;

  console.log(eventsSnap.dateEvents);

  const handleClickSwitchingButton = () => {
    switch (switching) {
      case "ルートを確定する":
        setSwitching("保存する");
        break;
      case "保存する":
        const a = eventsArray;
        setSwitching("確定済み");
        break;
      case "確定済み":
        setSwitching("確定済み");
        break;
    }
  };

  return (
    <div>
      <p>ルート情報</p>
      {/* <button onClick={mapState.clickEventOptimize}>Optimizeボタン</button> */}

      <button className="" onClick={handleClickSwitchingButton}>
        {isConfirm ? "確定済み" : switching}
      </button>
      {switching === "ルートを確定する" ? (
        <ul className="dropEvents">
          <li className="flex justify-around border-b text-gray-400 text-sm font-bold">
            <p>行き先</p>
            <p>時間帯</p>
            <p>内容</p>
            <p>予約者</p>
          </li>
          {eventsSnap.dateEvents?.map((event) => (
            <li className="flex justify-around border-b" key={event.id}>
              <p> {event.extendedProps.destination}</p>
              <p>{event.extendedProps.time_zone}</p>
              <p>{event.extendedProps.items}</p>
              <p>{event.extendedProps.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <DndZone />
      )}
    </div>
  );
};

export default RouteList;
