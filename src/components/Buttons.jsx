import React, { useCallback } from "react";
import { BsCheckLg } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";
import { useSnapshot } from "valtio";
import { eventsState, mapState, routeListState } from "src/stores/valtioState";

const Buttons = (props) => {
  const events = props.events;
  const setEvents = props.setEvents;
  const eventsSnap = useSnapshot(eventsState);
  const mapSnap = useSnapshot(mapState);
  const routeListSnap = useSnapshot(routeListState);
  const isConfirm = eventsSnap.dateEvents[0]
    ? eventsSnap.dateEvents[0].isConfirm
    : null;

  const handleClickAddHome = useCallback(() => {
    //⬇︎⬇︎自社の数に応じてIDを作成
    const createId = () => {
      const CheckedArray = events.filter(
        (event) => event.destination === "自社"
      );
      const id = CheckedArray.length.toString();
      return id;
    };
    //⬇︎⬇︎選択中の他イベントと同じdateを作成
    const createDate = () => {
      const check = eventsSnap.dateEvents.filter(
        (event) => event.destination !== "自社"
      );
      const date = check[0] ? check[0].date : null;
      return date;
    };

    const homeData = {
      id: createId(),
      date: createDate(),
      zipcode: "2700213",
      address1: "千葉県野田市桐ヶ作210",
      address2: null,
      destination: "自社",
      phone_number: "0471030606",
      isConfirm: false,
      isDone: false,
      route_order: null,
      items: null,
      key_person: null,
      time_zone: null,
      user_id: null,
      description: null,
    };
    const addHomeToArray = [...events, homeData];

    setEvents(addHomeToArray);
  }, [events, eventsSnap.dateEvents]);

  const handleClickBack = useCallback(() => {
    eventsState.editEvents = [];
    routeListState.switching = "編集";
  }, []);

  const handleClickMapUpdate = useCallback(() => {
    eventsState.editEvents = events;
  }, [events]);

  const handleclickShowMap = useCallback(() => {
    mapState.show = mapState.show ? false : true;
  }, []);

  if (isConfirm) {
    return (
      <div>
        <div className="flex">
          <div className="flex items-center p-1 m-1 border rounded-md text-sm text-white font-bold bg-gray-400   ">
            <BsCheckLg color="red" /> 確定済
          </div>

          <button
            className="block p-1 m-1 border rounded-md text-sm text-white bg-gray-600 transition hover:bg-blue-400 hover:border-blue-400 hover:transition active:bg-blue-200 active:border-blue-200"
            onClick={handleclickShowMap}
          >
            {mapSnap.show ? "地図を閉じる" : "地図表示"}
          </button>
        </div>
      </div>
    );
  }

  if (routeListSnap.switching === "編集") {
    return (
      <div className="flex">
        <button
          className="block p-1 m-1 border rounded-md text-sm text-white bg-gray-600  transition  hover:bg-blue-400 hover:border-blue-400 hover:transition active:bg-blue-200 active:border-blue-200"
          onClick={routeListState.handleClickButton}
        >
          {routeListSnap.switching}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between mt-3 mx-4">
        <div className="flex">
          <button
            className=" p-1 m-1 border rounded-md text-sm text-white bg-gray-600  transition  hover:bg-blue-400 hover:border-blue-400 hover:transition active:bg-blue-200 active:border-blue-200"
            onClick={handleClickBack}
          >
            戻る
          </button>
          <button
            className=" p-1 m-1 border rounded-md text-sm text-white bg-gray-600  transition  hover:bg-blue-400 hover:border-blue-400 hover:transition active:bg-blue-200 active:border-blue-200"
            onClick={handleClickAddHome}
          >
            自社追加
          </button>

          <button
            className=" p-1 m-1 border rounded-md text-sm text-white bg-gray-600 transition hover:bg-blue-400 hover:border-blue-400 hover:transition active:bg-blue-200 active:border-blue-200"
            onClick={handleclickShowMap}
          >
            {mapSnap.show ? "地図を閉じる" : "地図表示"}
          </button>
          <button
            className="block p-1 m-1  rounded-md text-sm   transition  hover:bg-blue-400  hover:transition active:bg-blue-200 "
            onClick={handleClickMapUpdate}
          >
            <GrUpdate color={"#ffffff"} />
          </button>
        </div>

        <div>
          <button
            className="block p-1 m-1 border rounded-md text-sm text-white bg-gray-600  transition  hover:bg-blue-400 hover:border-blue-400 hover:transition active:bg-blue-200 active:border-blue-200"
            onClick={() => routeListState.handleClickButton(events)}
          >
            保存する
          </button>
        </div>
      </div>
    </div>
  );
};

export default Buttons;
