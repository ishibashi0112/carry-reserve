import React, { useCallback } from "react";

import { useSnapshot } from "valtio";
import { eventsState, mapState } from "src/stores/valtioState";

const RouteList = () => {
  const eventsSnap = useSnapshot(eventsState);
  const mapSnap = useSnapshot(mapState);

  const initialDate = new Date(2022, 1, 1, 8, 0, 0);
  const dateToString = useCallback((date, addValue) => {
    const prevUnixTime = date.getTime();
    const upUnixTime = prevUnixTime + addValue * 1000;
    const newUnixTime = addValue ? upUnixTime : prevUnixTime;
    const newDate = new Date(newUnixTime);
    const dateStr = newDate.toLocaleTimeString().slice(0, -3);

    return { dateStr, newDate };
  }, []);

  const convertedDirectionResult = mapSnap.distanceAndTimes.reduce(
    (prev, current, i) => {
      const currentIndex = mapSnap.distanceAndTimes.length - 1;
      const distanceStr = current.distance.text;
      const durationStr = current.duration.text;
      const durationValue = current.duration.value;
      const prevDateOb = i === 0 ? initialDate : prev[i - 1].date;
      const { dateStr: newArrivalDateStr, newDate: newArrivalDateOb } =
        dateToString(prevDateOb, durationValue);
      const { dateStr: newDepartureDateStr, newDate: newDepartureDateOb } =
        dateToString(newArrivalDateOb, 600);
      const arrivalStr = `着 : ${newArrivalDateStr}`;
      const departureStr = `発 : ${newDepartureDateStr}`;

      const events = eventsSnap.editEvents.length
        ? eventsSnap.editEvents[i]
        : eventsSnap.dateEvents[i];

      const result = {
        distance: distanceStr,
        duration: durationStr,
        departure: departureStr,
        arrival: arrivalStr,
        departure: currentIndex !== i ? departureStr : null,
        date: newDepartureDateOb,
        events,
      };

      return [...prev, result];
    },
    []
  );

  return (
    <div>
      {mapSnap.show ? (
        <ul className="flex flex-col items-center h-[350px] w-[200px] pt-2 mx-auto overflow-scroll">
          <li className="flex">
            <p className="mr-3">{"発 : 8:00"}</p>
            <p>自社</p>
          </li>

          {convertedDirectionResult.map((direction, i) => {
            return (
              <li key={i.toString()} className="mt-3">
                <div className="text-center ">
                  <div className="flex justify-center">
                    <div className="">⬇︎</div>
                    <div>
                      <p className=" text-sm">{direction.distance}</p>
                      <p className=" text-sm">{direction.duration}</p>
                    </div>
                  </div>
                </div>
                <div className="flex text-center mt-3">
                  <div className="mr-3">
                    <p>{direction.arrival}</p>
                    <p>{direction.departure}</p>
                  </div>
                  <p className="my-auto">
                    {direction?.events ? direction.events.destination : "自社"}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <ul className="flex justify-around w-5/6 mx-auto">
          <li>
            <p>自社</p>
            <p>{`発 : 8:00`}</p>
          </li>

          {convertedDirectionResult.map((direction, i) => {
            return (
              <li key={i.toString()} className="flex">
                <div className="text-center mr-4">
                  <p>➡︎</p>
                  <p className="text-sm">{direction.distance}</p>
                  <p className="text-sm">{direction.duration}</p>
                </div>
                <div className="text-center">
                  <p>
                    {direction?.events ? direction.events.destination : "自社"}
                  </p>
                  <p>{direction.arrival}</p>
                  <p>{direction.departure}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default RouteList;
