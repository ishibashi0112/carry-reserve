import React from "react";
import { useSnapshot } from "valtio";
import { eventsState, mapState, routeListState } from "src/stores/valtioState";
import EventList from "src/components/EventList";
import Map from "src/components/Map";
import DndArea from "src/components/DndArea";
import RouteList from "src/components/RouteList";

const PlanList = () => {
  const eventsSnap = useSnapshot(eventsState);
  const dateEventsLength = eventsSnap.dateEvents.length;
  const routeListSnap = useSnapshot(routeListState);
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

  return (
    <div className="w-full">
      <div className={`${mapSnap.show ? "flex" : null}`}>
        {routeListSnap.switching === "保存" ? <Map /> : null}
        {routeListSnap.switching === "保存" ? <RouteList /> : null}
      </div>

      {routeListSnap.switching === "保存" ? <DndArea /> : null}

      {isConfirm ? (
        <div className={`${mapSnap.show ? "flex" : null}`}>
          <Map />
          <RouteList />
        </div>
      ) : null}
      {routeListSnap.switching === "編集" ? <EventList /> : null}
    </div>
  );
};

export default PlanList;

// if (switchSnap === "編集") {
//   return (
//     <div className="w-full">
//       {console.log("1")}
//       <Map />
//       <EventList />
//     </div>
//   );
// }

// if (switchSnap === "保存") {
//   return (
//     <div className="w-full">
//       {console.log("2")}
//       <div className={`${mapSnap.show ? "flex" : null}`}>
//         <Map />
//         <RouteList />
//       </div>

//       <DndArea />
//     </div>
//   );
// }
