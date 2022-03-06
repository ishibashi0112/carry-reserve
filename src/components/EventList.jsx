import React, { useState } from "react";
import { useSnapshot } from "valtio";
import { eventsState } from "src/stores/valtioState";
import Buttons from "src/components/Buttons";
import { AiOutlineBars } from "react-icons/ai";

const EventList = () => {
  const eventsSnap = useSnapshot(eventsState);
  const [eventSwitchId, setEventSwitchId] = useState(null);

  const handleClickList = (event) => {
    const eventId = event.id;
    setEventSwitchId(eventId !== eventSwitchId ? eventId : null);
  };

  return (
    <div className="w-full">
      <ul className="dropEvents w-[600px] my-2 	">
        <li className="flex border-b text-sm font-bold text-center w-full ">
          <p className="w-12"></p>
          <p className="w-32 truncate ">行き先</p>
          <p className="w-16">時間帯</p>
          <p className="w-1/5 truncate">内容</p>
          <p className="w-1/5 truncate">備考</p>
          <p className="w-16 truncate">予約者</p>
        </li>
        {eventsSnap.dateEvents?.map((event) => (
          <div className="w-full" key={event.id}>
            <li className="flex items-center h-9  border-b ">
              <p className="w-12 ">
                <button onClick={() => handleClickList(event)}>
                  <AiOutlineBars />
                </button>
              </p>
              <p className="w-32 truncate ">{event.destination}</p>
              <p className="w-16">{event.time_zone}</p>
              <p className="w-1/5 truncate">{event.items}</p>
              <p className="w-1/5 truncate">{event.description}</p>
              <p className="w-16 truncate">{event.user_name}</p>
            </li>
            {eventSwitchId === event.id ? (
              <li className="border-b">
                <div>
                  住所:
                  <p>{`　〒${event.zipcode}`}</p>
                  <p>{`　${event.address1}${
                    event.address2 ? event.address2 : ""
                  }`}</p>
                </div>
                <p>{`内容: ${event.items}`}</p>
                <p>{`備考: ${event.description}`}</p>
              </li>
            ) : null}
          </div>
        ))}
      </ul>

      <Buttons />
    </div>
  );
};

export default EventList;
